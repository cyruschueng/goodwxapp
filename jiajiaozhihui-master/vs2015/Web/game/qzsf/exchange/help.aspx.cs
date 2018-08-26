using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.qzsf.exchange
{
    public partial class help : System.Web.UI.Page
    {
        public string HTMLTitle = string.Empty;
        public string HTMLBody = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string id = Request.QueryString["id"];
                GetData(id);
            }
        }
        private void GetData(string id)
        {
            BLL.WX_Item_Help bll = new BLL.WX_Item_Help();
            Model.WX_Item_Help model= bll.GetModel(Convert.ToInt32(id));
            if (model != null) {
                HTMLTitle = model.Title;
                HTMLBody = model.Details;
            }
        }
    }
}
