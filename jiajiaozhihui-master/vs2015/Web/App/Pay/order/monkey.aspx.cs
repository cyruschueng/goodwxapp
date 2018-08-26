using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.web.weixinconfig;
using System.Data;

namespace SfSoft.web.wxpay.order
{
    public partial class monkey : System.Web.UI.Page
    {
        public string HtmlCaption = string.Empty;
        public string HtmlPrice = string.Empty;
        public string HtmlImage = string.Empty;
        public string HtmlIntro = string.Empty;
        private sale.Product MonkeyProduct;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                WxConfigHelper helper = new WxConfigHelper(this.Page);
                helper.Init();
                int id =int.Parse(Request.QueryString["id"]);
                sale.Products products = new sale.Products();
                MonkeyProduct = products.ProductsList[id];
                hfType.Value = MonkeyProduct.Text;
                if (Session["mymonkey"] != null && Session["myopenid"] != null)
                {
                    hfOpenId.Value = Session["myopenid"].ToString();
                    GetData(Session["mymonkey"].ToString());
                    if (MonkeyInfo == null)
                    {
                        Response.Redirect("../result/404.html");
                    }
                    PublicHtml();
                    hfUpdataModel.Value = "save";
                    SetPayData();
                }
            }
        }
        private void GetData(string monkeyId)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(int.Parse(monkeyId));
            MonkeyInfo = model;
        }
        private void SetPayData()
        {
            WxJsPayData pay = new WxJsPayData();
            pay.Attach = "monkey";
            pay.Body = MonkeyInfo.GoodName;
            pay.BuyNumber = 1;
            pay.GoodsTag = "家教知慧";
            pay.Price = Convert.ToDecimal(ConvertPrice(MonkeyProduct.Price) * 100);
            pay.Tradeno = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
            pay.OpenId = Session["myopenid"].ToString();
            Session["WXJSPAYDATA"] = pay;
        }
        private void PublicHtml()
        {
            HtmlCaption = MonkeyInfo.GoodName;
            HtmlPrice = string.Format("{0:F2}", MonkeyProduct.Price);
            HtmlImage = MonkeyInfo.ImgURL;
            HtmlIntro = MonkeyInfo.InfoDesc;
        }
        private decimal ConvertPrice(string price)
        {
            decimal p = 0;
            if (price != "") {
                p = Convert.ToDecimal(price);
            }
            return p;
        }
        private Model.WX_PublicGood MonkeyInfo { get; set; }
    }
}
