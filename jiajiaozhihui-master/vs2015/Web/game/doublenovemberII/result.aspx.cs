using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class result : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            Helper.WeiXinBrowse(Request);
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
