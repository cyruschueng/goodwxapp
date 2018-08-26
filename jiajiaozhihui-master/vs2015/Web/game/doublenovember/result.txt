using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovember
{
    public partial class result : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            if (!userAgent.ToLower().Contains("micromessenger"))
            {
                Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
            }
            if (!IsPostBack) {
                #region 解析参数
                if (Request.QueryString["id"] != null)
                {
                    
                }
                #endregion
            }
        }
    }
}
