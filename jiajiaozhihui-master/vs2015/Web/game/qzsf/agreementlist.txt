using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.qzsf
{
    public partial class agreementlist : System.Web.UI.Page
    {
        public string HtmlImgUrl = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["myopenid"] != null)
                {
                    hfOpenID.Value = Session["myopenid"].ToString();
                    GetAgreementImage(hfOpenID.Value);
                }
                else
                {
                    Response.Redirect("error.html");
                }
            }
        }
        private void GetAgreementImage(string openId)
        {
            SfSoft.BLL.WX_Doublenovember_Agreement bll = new BLL.WX_Doublenovember_Agreement();
            var list= bll.GetModelList("OpenId='" + openId + "'");
            if (list != null && list.Count>0)
            {
                var model = list.FirstOrDefault();
                HtmlImgUrl = string.IsNullOrEmpty(model.CloudImgUrl) ? model.LocalImgUrl : model.CloudImgUrl;

                rowImgArea.Attributes.Add("style", "display:block");
                rowImgAdd.Attributes.Add("style", "display:none");
            }
            else {
                rowImgArea.Attributes.Add("style", "display:none");
                rowImgAdd.Attributes.Add("style", "display:block");
            }
        }
    }
}
