using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.qzsf
{
    public partial class Test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                Diamond d = new Diamond("oc6zzs1y_A_7RgGi6EGLBUrPCfRk", EnumDiamond.邀请好友成功, EnumComputeMode.按次数计算);
                d.RunUpdateAward();
            }
        }
    }
}
