using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// exchange 的摘要说明
    /// </summary>
    public class exchange : IHttpHandler
    {
        static string ENCRYPTKEY = "shenerxm";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            try
            {
                result = order(context);
            }
            catch (Exception ex) {
                ShenerWeiXin.WXHelper.WriteNode(ex.Message, "exchange.txt");
            }
            
            context.Response.Write(result);
        }
        private string order(HttpContext context) 
        {
            string result = "{}";
            string openid = context.Request["openid"].ToString();
            string productid = context.Request["productid"].ToString();
            string _openid = openid;
            BLL.WX_TestQuestion_Gold bll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold model = bll.GetModelByOpenID(_openid);
            int myGold = 0;
            if (model!=null) {
                myGold =(int)model.Gold;
            }
            BLL.WX_PublicGood bllGood = new BLL.WX_PublicGood();
            Model.WX_PublicGood modelGood = bllGood.GetModel(int.Parse(productid));
            int usingGold = 0;
            if (modelGood!=null && modelGood.Exchange!="")
            {
                usingGold =int.Parse(modelGood.Exchange);
            }
            //金币不足
            if (myGold < usingGold)
            {
                result = "{\"status\":\"false\",\"msg\":\"金币不足，无法兑换！\"}";
            }
            else { 
                string recipients = context.Request["recipients"].ToString();
                string province = context.Request["province"].ToString();
                string city = context.Request["city"].ToString();
                string address = context.Request["address"].ToString();
                string postcode = context.Request["postcode"].ToString();
                string mobile = context.Request["mobile"].ToString();
                try
                {
                    //生成订单
                    if (Trade(address, city, productid, recipients, _openid, postcode, province, mobile) == true)
                    {
                        AddGoldDetail(usingGold, _openid, int.Parse(productid)); // 兑换明细
                        model.Gold = (int)model.Gold - int.Parse(modelGood.Exchange);//更新金币表
                        model.LastDate = DateTime.Now;
                        bll.Update(model);

                        result = "{\"status\":\"true\",\"msg\":\"兑换完成\",\"gold\":"+model.Gold+"}";
                    }else{
                        result = "{\"status\":\"false\",\"msg\":\"兑换出错\"}";
                    }
                }
                catch (Exception ex) {
                    result = "{\"status\":\"false\",\"msg\":\"兑换出错\"}";
                }
            }
            return result;
        }
        /// <summary>
        /// 开始交易
        /// </summary>
        /// <returns></returns>
        private bool Trade(string address, string city, string productid, string recipients, string openid, string postcode, string province, string mobile)
        {
            
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            model.Address = address;
            model.City = city;
            model.GoodID = int.Parse(productid);
            model.GoodsType = 7;
            model.IsSend = 0;
            model.Name = recipients;
            model.OpenID = openid;
            model.OrderDate = DateTime.Now;
            model.PayNumber = 1;
            model.Post = postcode;
            model.Province = province;
            model.TelePhone = mobile;
            try
            {
                bll.Add(model);
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }
        private void AddGoldDetail(int gold, string openid, int productid)
        { 
            //添加兑换明细
            Model.WX_TestQuestion_Gold_Detail model = new Model.WX_TestQuestion_Gold_Detail();
            model.CreateDate = DateTime.Now;
            model.Gold = gold;
            model.OpenID = openid;
            model.QuestionActiveID = productid;
            model.Remark = "兑换";
            model.Status = -1;
            BLL.WX_TestQuestion_Gold_Detail bll = new BLL.WX_TestQuestion_Gold_Detail();
            bll.Add(model);
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