using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.libao
{
    public partial class voice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                //大礼包进入人次
                ShenerWeiXin.WXHelper.VisitViewNumber(8);
            }
        }
    }
}
