using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf.start
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string address = Request.UserHostAddress;
                /*
                if (address.StartsWith("113.91") || address.StartsWith("14.17.37") || address == "127.0.0.1")
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
                    if (baseOauth.OAuthResult.Msg.Contains("api unauthorized"))
                    {
                        ShenerWeiXin.WxApi.WxOAuth.UserInfoOAuth userinfoOauth = new UserInfoOAuth(this.Page);
                        string url = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/index.aspx";
                        Response.Redirect(url);
                    }
                    else {
                        baseOauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/index.aspx";
                        baseOauth.Redirect();
                    }
                }
                else {
                    string openid = baseOauth.OAuthResult.UserInfo.openid;
                    BLL.WX_Items_User bll = new BLL.WX_Items_User();
                    Model.WX_Items_User model = bll.GetModel(openid, 1);
                    if (model != null)
                    {
                        string url = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/index.aspx?mode=database&id=76&t=123";
                        Response.Redirect(url);
                    }
                    else {
                        ShenerWeiXin.WxApi.WxOAuth.UserInfoOAuth userinfoOauth = new UserInfoOAuth(this.Page);
                        if (userinfoOauth.CheckAccessToken() == true)
                        {
                            string url = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/index.aspx?mode=reflesh&id=76&t=123";
                            Response.Redirect(url);
                        }
                        else {
                            //如果无效，则重新授权
                            ShenerWeiXin.WXHelper.WriteNode("UserInfoOAuth授权无效", "baseoauth.txt");
                            baseOauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/index.aspx";
                            baseOauth.Redirect();
                        }
                    }
                }
            }
        }
    }
}
