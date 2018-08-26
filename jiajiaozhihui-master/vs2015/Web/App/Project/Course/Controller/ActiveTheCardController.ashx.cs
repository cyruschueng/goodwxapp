using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// ActiveTheCardController 的摘要说明
    /// </summary>
    public class ActiveTheCardController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "info":
                    GetCardInfo(context);
                    break;
                case "active":
                    ActiveCard(context);
                    break;
                case "check":
                    CheckCode(context);
                    break;
                case "freeallege":
                    FreeAllege(context);//容错直接注册，多人共用一个cardId
                    break;
                case "registallege":
                    RegistAllege(context); //容错，多人共用一个cardId ,当需要申核
                    break;
                case "checkallege":
                    CheckAllege(context); //容错，申述申核处理
                    break;
                case "showallege":
                    ShowAllege(context);
                    break;
            }
        }

        private void ShowAllege(HttpContext context)
        {
            string cardId=context.Request["cardid"];
            var list= Helper.ActiveTheCardProvide.GetAllege(int.Parse(cardId));
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var card = bll.GetModel(int.Parse(cardId));
            list.Insert(0, new Models.ActiveCard.AllegeInfo { 
                AgreeDate=null,
                CardId=card.Id,
                CardNo=card.CardNo,
                CardType=card.CardId??0,
                Id=0,
                IpAddress=card.IpAddress,
                IsAct=1,
                IsAgree=1,
                OpenId=card.OpenId,
                RegistDate=card.RegistDate.Value
            });
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void FreeAllege(HttpContext context)
        {
            string openId = context.Request["openid"];
            int cardId = int.Parse(context.Request["cardid"]);
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var card = bll.GetModel(cardId);
            var model = new Models.ActiveCard.AllegeInfo
            {
                AgreeDate = DateTime.Now,
                CardId = cardId,
                CardNo = card.CardNo,
                CardType = card.CardId ?? 0,
                IpAddress = context.Request.UserHostAddress,
                IsAct = 1,
                IsAgree = 1,
                OpenId = openId,
                RegistDate = DateTime.Now
            };
            var index = Helper.ActiveTheCardProvide.FreeAllege(model);
            context.Response.Write(index);
        }
        private void CheckAllege(HttpContext context)
        {
            string errorId=context.Request["errorId"];
            string openId = context.Request["openId"];
            var model= Helper.ActiveTheCardProvide.CheckAllege(int.Parse(errorId));
            Action action = () =>
            {
                Helper.TemplateProvide provide = new Helper.TemplateProvide();

                provide.MessageNotifyToUser(openId, 2, "http://courses.jiajiaozhihui.cn/link/parents_course.html");
            };
            action.BeginInvoke(null, null);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void RegistAllege(HttpContext context)
        {
            string openId = context.Request["openid"];
            int cardId = int.Parse(context.Request["cardid"]);
            BLL.WX_Course_Card_Detail bll=new BLL.WX_Course_Card_Detail();
            var card=bll.GetModel(cardId);
            var model = new Models.ActiveCard.AllegeInfo { 
                AgreeDate=null,
                CardId=cardId,
                CardNo=card.CardNo,
                CardType=card.CardId??0,
                IpAddress=context.Request.UserHostAddress,
                IsAct=1,
                IsAgree=0,
                OpenId=openId,
                RegistDate=DateTime.Now
            };
            var index = Helper.ActiveTheCardProvide.RegistAllege(model);
            Action action = () => {
                Helper.TemplateProvide provide = new Helper.TemplateProvide();
                //var url = @App.Helper.WxBaseConfig.WebSite + "app/appstart/course/baseinfo.ashx?redirect_url="+App.Url.CourseUrl.ClientUrl+"app/default.html&state={\"appid\":\"app001\",\"hash\":\"fault\",\"cid\":\""+cardId+"\" }";

                var url = @App.Helper.WxBaseConfig.WebSite + "app/appstart/coursev2/baseinfo.ashx?redirect_url=" + App.Url.CourseUrl.ClientUrl + "app/default.html?r=a=app001|h=fault|r={\"cid\":\""+cardId+"\"}";
                //var receiver = Helper.ActiveTheCardProvide.GetReceiver();
                provide.MessageNotifyToJJZH("oc6zzs_emomoApBvoBMG_OPpZOUw", 3, url, model.OpenId);
            };
            action.BeginInvoke(null, null);
            context.Response.Write(index);
        }

        private void CheckCode(HttpContext context)
        {
            var cid=context.Request["cid"];
            var code=context.Request["code"];
            var result= Helper.ActiveTheCardProvide.CheckCode(int.Parse( cid), code);
            context.Response.Write(result);
        }

        private void ActiveCard(HttpContext context)
        {
            var cardId=context.Request["cardId"];
            var openId=context.Request["openId"];

            var value = Helper.ActiveTheCardProvide.ActiveCard(int.Parse(cardId), openId, context.Request.UserHostAddress);

            context.Response.Write(value);
        }
        private void GetCardInfo(HttpContext context)
        {
            var cardId = context.Request["cardId"];
            var openId = context.Request["openId"];
            var info= Helper.ActiveTheCardProvide.GetCardDetailInfo(int.Parse(cardId),openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}