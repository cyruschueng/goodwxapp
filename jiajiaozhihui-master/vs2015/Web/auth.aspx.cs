using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;

namespace SfSoft.web
{
    public partial class auth1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                
            }
        }
        private void Redirect()
        {
            string name = Request.QueryString["name"].ToString();
            string _weixinid = Request.QueryString["weixinid"].ToString();
            switch (name)
            {
                case "guoxuedaren":
                    Response.Redirect(GetUrl("game/brainsexpert/default.aspx", _weixinid));
                    break;
            }
        }
        private string GetUrl(string path, string weixinid, string scope = "snsapi_userinfo", string state = "1")
        {
            if (HttpContext.Current.Session["openid"] != null)
            {
                return WXConfig.AuthURL + path + "?openid=" + HttpContext.Current.Session["openid"].ToString() + "&weixinid=" + weixinid + "&from=localhost";
            }
            else
            {
                return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WXConfig.AgentAppID + "&redirect_uri=" + WXConfig.AuthURL + path + "&response_type=code&scope=" + scope + "&state=weixinid=" + weixinid + "#wechat_redirect";
            }
        }

        protected void btnOK_Click(object sender, EventArgs e)
        {
            Redirect();
        }
    }
}
