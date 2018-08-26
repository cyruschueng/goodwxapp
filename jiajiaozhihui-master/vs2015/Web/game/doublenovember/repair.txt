using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovember
{
    public partial class repair : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            if (!userAgent.ToLower().Contains("micromessenger"))
            {
                //Response.Redirect( WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
            }
            if (!IsPostBack) {
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }

                #region 返回链接
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey) + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey);
                HTMLReturnUrl = "/game/doublenovember/index.aspx?state=" + backUrl;
                #endregion

            }
        }
    }
}
