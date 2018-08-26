using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class productdetail : System.Web.UI.Page
    {
        public string HTMLProvince = "";
        public string HTMLTitle = "";
        public string HTMLImgUrl = "";
        public string HTMLExchange = "";
        public string HTMLDesc = "";
        public string HTMLAllExchange = "";
        public string HTMLEnable = "disabled";
        public string HTMLButtonName = "立即兑换";
        public string HTMLButtonStyle = "";
        static string ENCRYPTKEY = "shenerxm";
       
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["productid"] != null)
                {
                    hfProductID.Value = Request.QueryString["productid"].ToString();
                }
                GetProduct(hfProductID.Value);
            }
        }
        private void GetProduct(string id)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(int.Parse(id));
            if (model != null)
            {
                HTMLTitle = model.GoodName;
                HTMLImgUrl = model.ImgURL;
                HTMLExchange = model.Exchange;
                HTMLDesc = model.Desc;
            }
        }
    }
}
