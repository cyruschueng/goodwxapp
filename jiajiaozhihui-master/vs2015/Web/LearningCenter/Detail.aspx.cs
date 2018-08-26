using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.LearningCenter
{
    public partial class Detail : System.Web.UI.Page
    {
        public string HtmlTitle = "";
        public string HtmlContent = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string id = Request.QueryString["id"];
                if (!string.IsNullOrEmpty(id)) { 
                    GetData(int.Parse(id)) ;
                }
            }
        }
        private void GetData(int id)
        {
            SfSoft.BLL.WX_JingHua bll = new BLL.WX_JingHua();
             SfSoft.Model.WX_JingHua model= bll.GetModel(id);
             if (model != null) {
                 HtmlTitle = model.Title;
                 HtmlContent = model.Detail;
             }
        }
    }
}
