using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using System.Text;

namespace Weixin.Service.Helper
{
    public class WeiXinJSSDK : System.Web.UI.Page
    {
        private string _signature = string.Empty;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="weixinId"></param>
        /// <param name="url">当前页面的绝对路径</param>
        public WeiXinJSSDK(string weixinId,string url)
        {
            SfSoft.Model.WX_WeiXinAccounts WeiXinAccounts = CommHelper.GetWeiXinAccounts(weixinId); //获取微信信息
            string appId = WeiXinAccounts.AppID;
            string noncestr = JSSDKHelper.GetNoncestr();
            string timesTamp = JSSDKHelper.GetTimestamp();
            string ticket =Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);
            _signature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(ticket, noncestr, timesTamp, url);

            ClientScript.RegisterStartupScript(this.GetType(), "weixinjssdk", "");
        }
        public string Signature 
        {
            get { return _signature; }
        }
        //private string Javascript()
        //{
        //    StringBuilder sb = new StringBuilder();
        //    sb.Append("<>");
        //    sb.Append("<script>");
        //    sb.Append("     <");
        //    sb.Append("</scirpt>");
        //}
    }
}