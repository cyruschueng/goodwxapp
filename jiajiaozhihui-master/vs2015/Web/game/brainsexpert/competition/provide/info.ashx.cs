using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.brainsexpert.competition.provide
{
    /// <summary>
    /// info 的摘要说明
    /// </summary>
    public class info : IHttpHandler
    {

        static string ENCRYPTKEY = "shenerxm";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request["method"].ToString();
            string result = "";
            switch (method) { 
                case "entity":
                    result = order(context);
                    break;
                case "virtual":
                    result = SetVirtualGold(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string order(HttpContext context)
        {
            string result = "{}";
            string openid = context.Request["openid"].ToString();
            string productid = context.Request["productid"].ToString();
            string _openid =openid;

            string recipients = context.Request["recipients"].ToString();
            string province = context.Request["province"].ToString();
            string city = context.Request["city"].ToString();
            string address = context.Request["address"].ToString();
            string postcode = context.Request["postcode"].ToString();
            string mobile = context.Request["mobile"].ToString();
            string activeid = context.Request["activeid"].ToString();
            try
            {
                //生成订单
                if (Trade(address, city, productid, recipients, _openid, postcode, province, mobile, activeid) == true)
                {
                    result = "{\"status\":\"true\",\"msg\":\"兑换完成\"}";
                }
                else
                {
                    result = "{\"status\":\"false\",\"msg\":\"兑换出错\"}";
                }
            }
            catch (Exception ex)
            {
                result = "{\"status\":\"false\",\"msg\":\"兑换出错\"}";
            }

            return result;
        }
        /// <summary>
        /// 开始交易
        /// </summary>
        /// <returns></returns>
        private bool Trade(string address, string city, string productid, string recipients, string openid, string postcode, string province, string mobile, string activeid)
        {

            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            model.Address = address;
            model.City = city;
            model.GoodID = int.Parse(productid);
            model.GoodsType = 8;
            model.IsSend = 0;
            model.Name = recipients;
            model.OpenID = openid;
            model.OrderDate = DateTime.Now;
            model.PayNumber = 1;
            model.Post = postcode;
            model.Province = province;
            model.TelePhone = mobile;
            model.ActivityID =int.Parse(activeid);
            try
            {
                bll.Add(model);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private string SetVirtualGold(HttpContext context)
        {
            string openid = context.Request["openid"].ToString();
            string _openid = openid;
            string questionactiveid = context.Request["questionactiveid"].ToString();
            string gold = context.Request["gold"].ToString();
            string productid = context.Request["productid"].ToString();

            BLL.WX_PublicOrder order = new BLL.WX_PublicOrder();
            DataSet ds = order.GetList("openid='" + _openid + "' and goodid="+productid);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return "false";
            }
            BLL.WX_TestQuestion_Gold bll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold model = bll.GetModelByOpenID(_openid);
            string sql = "";
            try
            {
                AddGoldDetail(context);
                if (model != null)
                {
                    model.Gold += int.Parse(gold);
                    model.LastDate = DateTime.Now;
                    model.OpenID = _openid;
                    bll.Update(model);
                }
                else
                {
                    model = new Model.WX_TestQuestion_Gold();
                    model.Gold = int.Parse(gold);
                    model.OpenID = _openid;
                    model.LastDate = DateTime.Now;
                    bll.Add(model);
                }
                Trade("", "", productid, "", _openid, "", "", "", questionactiveid);
                return "true";
            }
            catch (Exception ex) {
                return "false";
            }
        }
        private void AddGoldDetail(HttpContext context)
        {
            string openid = context.Request["openid"].ToString();
            string _openid =openid;
            string questionactiveid = context.Request["questionactiveid"].ToString();
            string gold = context.Request["gold"].ToString();
            BLL.WX_TestQuestion_Gold_Detail bll = new BLL.WX_TestQuestion_Gold_Detail();
            Model.WX_TestQuestion_Gold_Detail model = new Model.WX_TestQuestion_Gold_Detail();
            model.CreateDate = DateTime.Now;
            model.Gold = int.Parse(gold);
            model.OpenID = _openid;
            model.QuestionActiveID = int.Parse(questionactiveid);
            model.Status = 1;
            model.Remark = "擂台获奖";
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