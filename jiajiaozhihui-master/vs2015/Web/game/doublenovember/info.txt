#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovember
{
    public partial class info : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "";
        public string HTMLRepairUrl = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            if (!userAgent.ToLower().Contains("micromessenger"))
            {
                Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
            }
            if (!IsPostBack) {
                if (Request.QueryString["openid"]!=null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["id"] != null) {
                    hfProductID.Value = Request.QueryString["id"].ToString();
                }
                try
                {
                    #region 返回链接
                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLReturnUrl = "/game/doublenovember/index.aspx?state=" + backUrl;
                    #endregion
                    HTMLRepairUrl = "http://weixin.jiajiaozhihui.cn/game/doublenovember/repair.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "";
                    
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.info.aspx:"+ex.Message);
                }
            }
        }
    }
}
