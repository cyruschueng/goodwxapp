using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.App.Tool
{
    public partial class WeiXinHelper : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack) {
                if (string.IsNullOrEmpty(Request.QueryString["code"])) {
                    if(rblType.SelectedValue == "AccessToken"){
                         GetAccessToken();
                    }else if (rblType.SelectedValue == "Code"){
                        GetCode();
                    }
                }
            }
        }
        private void  GetAccessToken()
        {
            string appId = txtAppId.Text.Trim();
            string appSecret = txtAppSecret.Text.Trim();
            if (appId == "" || appSecret == "") return;
            var result= WeiXinServer.AccessTokenServer.GetAccessToken(appId, appSecret);
            lbResult.Text = result;
        }
        private void GetCode()
        {
            string code = Request.QueryString["code"];
            if (string.IsNullOrEmpty(code)) {
                var url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(App.Helper.WxBaseConfig.AppID, Request.Url.AbsoluteUri, "aaaaaa", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                Response.Redirect(url);
            }
        }
    }
}
