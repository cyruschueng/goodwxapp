using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using Senparc.Weixin.MP.Helpers;

namespace ShenerWeiXin.WxApi.WxJs
{

    /// <summary>
    /// 在客户端注册js
    /// </summary>
    public class WeixXinJsAPI
    {
        public Page Page { get; set; }
        private bool _debug = false;
        public WeixXinJsAPI(Page page)
        {
            this.Page = page;
            this._debug = false;
        }
        public bool Debug
        {
            get { return _debug; }
            set { _debug = value; }
        }
        /// <summary>
        /// 注册微信JS
        /// </summary>
        public void RegisterWeiXinJsApi()
        {
            string appId = ShenerWeiXin.WXConfig.AgentAppID;
            string noncestr = JSSDKHelper.GetNoncestr();
            string timesTamp = JSSDKHelper.GetTimestamp();
            string ticket =Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret);
            Senparc.Weixin.MP.Helpers.JSSDKHelper jssdkHelper = new JSSDKHelper();
            string signature=Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(ticket, noncestr, timesTamp, this.Page.Request.Url.AbsoluteUri);
            if (RightList == "") {
                throw new WxJsException("还没有设置JS接口列表");
            }
            this.Page.ClientScript.RegisterStartupScript(this.Page.GetType(), "weixinjssdk", JavaScript(appId, timesTamp, noncestr, signature));
        }
        private string JavaScript(string appId, string timesTamp, string nonceStr, string signature)
        {
            string debug = "false";
            if (Debug == true) {
                debug = "true";
            }
            StringBuilder sb = new StringBuilder();
            sb.Append("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>\r\n");
            sb.Append("<script>\r\n");
            sb.Append("     wx.config({\r\n");
            sb.Append("         debug:"+debug+",\r\n");
            sb.Append("         appId:'" + appId + "',\r\n");
            sb.Append("         timestamp:'" + timesTamp + "',\r\n");
            sb.Append("         nonceStr:'" + nonceStr + "',\r\n");
            sb.Append("         signature:'" + signature + "',\r\n");
            sb.Append("         jsApiList:[" + RightList + "]\r\n");
            sb.Append("     });\r\n");
            sb.Append("</script>\r\n");
            return sb.ToString();
        }
        /// <summary>
        /// JS接口列表
        /// </summary>
        public string RightList { get; private set; }

        /// <summary>
        /// 设置JS接口列表
        /// </summary>
        /// <param name="rights"></param>
        public void SetRightList(params EnumJsRight[] rights)
        {
            string list = "";
            foreach (EnumJsRight right in rights)
            {
                list += "'" + right.ToString() + "',";
            }
            if (list.Length > 0)
            {
                list = list.Substring(0, list.Length - 1);
            }
            RightList = list;
        }
    }
}
