using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf.start
{
    public partial class orderII : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                /*
                string address = Request.UserHostAddress;
                if (address == "113.91.72.228" || address == "14.17.37.145" || address == "127.0.0.1")
                {

                }
                else
                {
                    Response.Redirect("../../maintenance.html");
                }
                */

                ShenerWeiXin.WxApi.WxOAuth.BaseOAuth baseOauth = new ShenerWeiXin.WxApi.WxOAuth.BaseOAuth(this.Page);
                baseOauth.GetOAuthUserInfo();
                if (baseOauth.OAuthResult.Code == OAuthCodeEnum.error.ToString())
                {
                    baseOauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/orderII.aspx";
                    baseOauth.Redirect();
                }
                else
                {
                    string openid = baseOauth.OAuthResult.UserInfo.openid;
                    BLL.WX_Items_User bll = new BLL.WX_Items_User();
                    Model.WX_Items_User model = bll.GetModel(openid, 1);
                    if (model != null)
                    {
                        string url = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/orderII.aspx?mode=database&id=76";
                        Response.Redirect(url);
                    }
                    else
                    {
                        ShenerWeiXin.WxApi.WxOAuth.UserInfoOAuth userinfoOauth = new UserInfoOAuth(this.Page);
                        if (userinfoOauth.CheckAccessToken() == true)
                        {
                            string url = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/orderII.aspx?mode=reflesh&id=76";
                            Response.Redirect(url);
                        }
                        else
                        {
                            //如果无效，则重新授权
                            baseOauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/orderII.aspx";
                            baseOauth.Redirect();
                        }
                    }
                }
            }
        }
        private string FormatUrl(string url)
        {
            if (Request.QueryString["f"] != null)
            {
                string parameter = Request.QueryString["f"];
                int index = url.LastIndexOf("?");
                if (index > -1)
                {
                    url += "&f=" + parameter;
                }
                else
                {
                    url += "?f=" + parameter;
                }
            }
            return url;
        }
    }
}
