using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;
using System.IO;
using Newtonsoft.Json;
using System.Text;

namespace SfSoft.web.Course.Helper
{
    public class ActiveTheCardProvide
    {
        public static Models.ActiveCard.CardInfo GetCardDetailInfo(int cardId,string openId=null)
        {
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var list = bll.GetModelList("Id=" + cardId.ToString());
            if (list.Count > 0) {
                var model = list.FirstOrDefault<Model.WX_Course_Card_Detail>();
                if ((model.CardId ?? 0) == 0) return new Models.ActiveCard.CardInfo();
                var card = GetCard(model.CardId ?? 0);
                var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
                return  new Models.ActiveCard.CardInfo{
                    Details=card.Detail,
                    ImgUrl = website+card.ImgUrl,
                    Remark=card.Remark,
                    IsAct=(card.IsAct??0)==0?false:true,
                    CreateDate=card.CreateDate,
                    Title=card.Title,
                    IsValide = IsCardValide(card),
                    IsActive=(model.IsUsing??0)==0?false:true,
                    OpenId = GetActiveOpenId(model.Id,model.OpenId),
                    RegistDate=model.RegistDate,
                    Qpath=model.QRPath,
                    CardId=card.BagId,
                    CardNo =model.CardNo.PadLeft(9,'0')+card.Id.ToString(),
                    AllegeList = GetAllege(cardId),
                    IsPast=DateTime.Now.Subtract(model.RegistDate?? DateTime.Now).Days>15?true:false
                };
            }
            return new Models.ActiveCard.CardInfo();
        }
        public static int ActiveCard(int cardId,string openId,string ipAddress)
        {
            try
            {
                BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
                var model = bll.GetModel(cardId);
                model.IsUsing = 1;
                model.OpenId = openId;
                model.RegistDate = DateTime.Now;
                model.IpAddress = ipAddress;
                bll.Update(model);
                Action<int, string> action = (a,b) =>
                {
                    CreateOrder(a, b);
                };
                action.BeginInvoke(model.CardId??0, openId,null,null);
                return 1;
            }
            catch (Exception ex) {
                return 0;
            }
        }
        public static string CheckCode( int id, string code)
        {
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var list= bll.GetModelList("Id=" + id );
            if (list.Count > 0) {
                var model = list[0];
                if (model.Scale.HasValue == true && model.CheckCode == code) {
                    return "ok";
                }
                else if (model.Scale.HasValue == true && model.CheckCode!=code) {
                    return "error";
                }
                else if (model.Scale.HasValue == false) {
                    return "ok";
                }
            }
            return "error";
        }
        /// <summary>
        /// 注册失败申述
        /// 审核通过后才能有资格听课程
        /// </summary>
        public static int RegistAllege(Models.ActiveCard.AllegeInfo info)
        {
            try
            {
                BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
                var model = new Model.WX_Course_Card_Detail_Error
                {
                    CardId = info.CardId,
                    CardNo =int.Parse( info.CardNo),
                    CardType = info.CardType,
                    IpAddress = info.IpAddress,
                    IsAct = 1,
                    IsAgree = 0,
                    OpenId = info.OpenId,
                    RegistDate = DateTime.Now
                };
                var index= bll.Add(model);
                return index;
            }
            catch (Exception ex) {
                return 0;
            }
        }
        /// <summary>
        /// 容错直接注册
        /// 目前由于卡有重复，除第一个人注册后其它同卡的人注册不了，现在设置可以多人共用一张卡
        /// 上方法不用申述，直接通过
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public static  int FreeAllege(Models.ActiveCard.AllegeInfo info)
        {
            try
            {
                BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
                var model = new Model.WX_Course_Card_Detail_Error
                {
                    CardId = info.CardId,
                    CardNo = int.Parse(info.CardNo),
                    CardType = info.CardType,
                    IpAddress = info.IpAddress,
                    IsAct = 1,
                    IsAgree = 1,
                    OpenId = info.OpenId,
                    RegistDate = DateTime.Now,
                    AgreeDate=DateTime.Now
                };
                var index = bll.Add(model);

                Action<int, string> action = (a, b) =>
                {
                    CreateOrder(a, b);
                };
                action.BeginInvoke(model.CardType, model.OpenId, null, null);

                return index;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        /// <summary>
        /// 申核
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="cardId"></param>
        public static Models.ActiveCard.AllegeInfo CheckAllege(int id)
        {
            BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
            var model = bll.GetModel(id);
            if (model != null) {
                model.IsAgree = 1;
                model.AgreeDate = DateTime.Now;
                
                Action<int, string, int,int> action = (a, b, c,d) =>
                {
                    //审核通过后，原持卡人将失效
                    SetCardInvalid(c,d);
                    CreateOrder(a, b);
                };
                action.BeginInvoke(model.CardType, model.OpenId, model.CardId,id, null, null);

                bll.Update(model);

                return new Models.ActiveCard.AllegeInfo()
                {
                    AgreeDate = model.AgreeDate,
                    CardId = model.CardId,
                    CardNo = model.CardNo.ToString(),
                    CardType = model.CardType,
                    Id = model.Id,
                    IpAddress = model.IpAddress,
                    IsAct = model.IsAct ?? 0,
                    IsAgree = model.IsAgree ?? 0,
                    OpenId = model.OpenId,
                    RegistDate = model.RegistDate
                };
            }
            return new Models.ActiveCard.AllegeInfo();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="cardId">学习卡</param>
        public static void CreateOrder(int cardId,string openId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            Model.WX_Course_Order model = new Model.WX_Course_Order();

            var list= bll.GetModelList("OpenId='"+openId+"' and CourseId=10");
            if (list.Count > 0)
            {
                var results = list.Where(e => e.IsAct == 1);
                if (results.Count() > 0) return;
                results = list.Where(e => e.IsAct == 0);
                if (results.Count() > 0)
                {
                    var m = results.FirstOrDefault();
                    m.IsAct = 1;
                    bll.Update(m);
                    return;
                }
            }
            else
            {
                var m = GetCard(cardId);
                model.BuyNumber = 1;
                model.CourseId = m.BagId;
                model.IsAct = 1;
                model.IsDel = 0;
                model.IsPay = 1;
                model.Name = "";
                model.OpenId = openId;
                model.OrderDateTime = DateTime.Now;
                model.OrderType = 2;
                model.Price = GetBag(m.BagId).PreferentialPrice;
                model.Remark = "课程购买.激活";
                model.Tradeno = "";
                model.SalesPlatform = 0;
                bll.Add(model);
            }
        }
        private static Model.WX_Course_SetBag GetBag(int bagId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model= bll.GetModel(bagId);
            if (model == null) {
                model = new Model.WX_Course_SetBag();
            }
            return model;
        }
        private static bool IsCardValide(Model.WX_Course_Card model)
        { 
            if(model.StartDate==null || model.EndDate==null) return true;
            var t= DateTime.Compare(DateTime.Now, model.StartDate.Value);
            var t2 = DateTime.Compare(DateTime.Now, model.EndDate.Value);
            if (t >= 0 && t2 <= 0)
            {
                return true;
            }
            else {
                return false;
            }
        }
        private static Model.WX_Course_Card GetCard(int cardId)
        {
            BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
            var model = bll.GetModel(cardId);
            if (model == null) return new Model.WX_Course_Card();
            return model;
        }
        private static Model.WX_Course_SetBag GetCourseBag(int bagId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model = bll.GetModel(bagId);
            if (model == null) return new Model.WX_Course_SetBag();
            return model;
        }
        public static List<Models.ActiveCard.AllegeInfo> GetAllege(int cardId)
        {
            BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
            List<Models.ActiveCard.AllegeInfo> infos = new List<Models.ActiveCard.AllegeInfo>();
            var list= bll.GetModelList("CardId=" + cardId+" and IsAct=1");
            foreach (var m in list) {
                infos.Add(new Models.ActiveCard.AllegeInfo
                {
                    AgreeDate=m.AgreeDate,
                    CardId=m.CardId,
                    CardNo=m.CardNo.ToString(),
                    CardType=m.CardType,
                    Id=m.Id,
                    IpAddress=m.IpAddress,
                    IsAct=m.IsAct??0,
                    IsAgree=m.IsAgree??0,
                    OpenId=m.OpenId,
                    RegistDate=m.RegistDate
                });
            }
            return infos;
        }
        public static int ActiveQuantity()
        {
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var list= bll.GetModelList("isusing=1");
            return list.Count();
        }
        /// <summary>
        /// 异常消息接受者
        /// </summary>
        /// <returns></returns>
        public static string GetReceiver()
        { 
            string src = HttpContext.Current.Server.MapPath("~/App/Project/Course/DataSourse/message.json");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                var c = JObject.Parse(json);
                return c["receiver"].ToString();
            }
        }
        public static void SetCardInvalid(int cardId,int errorId)
        {
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var model= bll.GetModel(cardId);
            if (model.OpenId != "") {
                UpdateOrderInvalid(model.OpenId);
            }
            BLL.WX_Course_Card_Detail_Error error = new BLL.WX_Course_Card_Detail_Error();
            var errorList = error.GetModelList("Id<>"+errorId+" and CardId="+cardId+" and IsAgree=1");
            foreach (var m in errorList)
            {
                m.IsAct = 0;
                error.Update(m);

                UpdateOrderInvalid(m.OpenId);
            }
        }
        private static void UpdateOrderInvalid(string openId)
        {
            BLL.WX_Course_Order order = new BLL.WX_Course_Order();
            var list = order.GetModelList("OpenId='" + openId + "' and CourseId=10 and IsAct=1 and isnull(Tradeno,'')=''");
            foreach (var m in list)
            {
                m.IsAct = 0;
                Action action = () =>
                {
                    Helper.TemplateProvide provide = new Helper.TemplateProvide();
                    var url = "";
                    provide.MessageNotifyToUser(openId, 4, url);
                };
                order.Update(m);
            }
        }
        /// <summary>
        /// 获取激活的OpenId
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="openId">首次激活的人</param>
        /// <returns></returns>
        private static string GetActiveOpenId(int cardId,string openId)
        {
            BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
            var list= bll.GetModelList("CardId=" + cardId + " and  IsAct=1");
            return list.Count > 0 ? list[0].OpenId : openId;
        }
    }
}