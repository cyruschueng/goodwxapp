using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class updateaDDRESS : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void btnStart_Click(object sender, EventArgs e)
        {
            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            var list= bll.GetModelList("");
            foreach (var m in list)
            {
                BLL.WX_PayOrder order = new BLL.WX_PayOrder();
                var query= order.GetModelList("UserName='" + m.Name + "' and Province='" + m.Province + "' and City='" + m.City + "' and Address='" + m.Address + "' and Telephone='" + m.Mobile + "' and OpenId='"+m.OpenId+"'");
                foreach (var x in query) {
                    x.District = m.District;
                    order.Update(x);
                }
            }
        }
    }
}




