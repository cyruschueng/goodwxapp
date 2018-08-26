using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Senparc.Weixin.MP.Helpers;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.november
{
    public partial class partin : System.Web.UI.Page
    {
        public string HTMLAuthUrl = "";
        public string HTMLAppid = "";
        public string HTMLNoncestr = "";
        public string HTMLTimestamp = "";
        public string HTMLTicket = "";
        public string HTMLSignature = "";
        public string HTMLShareLink = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                #region 分享
                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WXConfig.appId;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);
                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                HTMLShareLink = "";
                #endregion
            }
        }
    }
}
