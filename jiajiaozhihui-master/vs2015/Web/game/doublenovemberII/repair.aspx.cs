using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class repair : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                #region 返回链接
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value+ "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey);
                HTMLReturnUrl = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                #endregion

            }
        }
    }
}
