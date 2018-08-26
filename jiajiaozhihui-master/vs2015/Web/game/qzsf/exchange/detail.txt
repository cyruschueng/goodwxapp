using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.qzsf.exchange
{
    public partial class detail : System.Web.UI.Page
    {
        public string HTMLQuantity = string.Empty;
        public string HTMLQetails = string.Empty;
        public string HTMLImage = string.Empty;
        public string HTMLLink ="javascript:void(0)";
        private string type = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) { 
                string id= Request.QueryString["id"];
                GetData(id);
                string openid = Session["myopenid"].ToString();
                HTMLLink = "buy.aspx?id=" + id;
                if (Store == false) {
                    exchange.Attributes["class"] += " weui_btn_disabled";
                    exchange.Attributes.Add("href", "javascript:void(0)");
                    exchange.InnerText ="库存不足";
                }else if (Check(openid, id) == false)
                {
                    exchange.Attributes["class"] += " weui_btn_disabled";
                    exchange.Attributes.Add("href", "javascript:void(0)");
                    exchange.InnerText = type + "不足";
                }
                else {
                    exchange.Attributes.Add("href", HTMLLink);
                }
            }
        }
        private bool Store { get; set; }
        private void GetData(string id)
        {
            BLL.WX_Product_Exchange bll = new BLL.WX_Product_Exchange();
            Model.WX_Product_Exchange model = bll.GetModel(Convert.ToInt32(id));
            if (model != null) {
                HTMLQuantity = (model.Quantity ?? 0).ToString()+model.Type;
                HTMLQetails = model.Details;
                HTMLImage = model.Image;
                if (model.Store == 0 || model.Store < 0)
                {
                    Store = false;
                }
                else {
                    Store = true;
                }
            }
        }
        private bool Check(string openid,string id)
        {
            BLL.WX_Product_Exchange bll = new BLL.WX_Product_Exchange();
            Model.WX_Product_Exchange model = bll.GetModel(Convert.ToInt32(id));
            int total = 0;
            int quantity = 0;
            if (model != null)
            {
                quantity = model.Quantity ?? 0;
                type = model.Type;
            }
            BLL.WX_Doublenovember_Award awardBll = new BLL.WX_Doublenovember_Award();
            Model.WX_Doublenovember_Award awardModel = awardBll.GetModel(openid);
            switch (type)
            {
                case "钻石":
                    total = (awardModel.DiamondEarn ?? 0) - (awardModel.DiamondWasting ?? 0);
                    break;
                case "金币":
                    total = (awardModel.GoldEarn ?? 0) - (awardModel.GoldWasting ?? 0);
                    break;
                default:
                    total = 0;
                    break;
            }
            return total - quantity >= 0 && total > 0 ? true : false;
        }
    }
}
