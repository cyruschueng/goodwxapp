using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.qzsf
{
    public partial class works : System.Web.UI.Page
    {
        public string HTMLReturnUrl = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void btnA_Click(object sender, EventArgs e)
        {
            AwardItem award = new AwardItem("oc6zzs1y_A_7RgGi6EGLBUrPCfRk");
            award.AwardByUploadPortfolios();
        }
    }
}
