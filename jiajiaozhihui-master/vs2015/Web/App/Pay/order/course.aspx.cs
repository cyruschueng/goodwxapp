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
    public partial class course : System.Web.UI.Page
    {
        public string HtmlCaption = string.Empty;
        public string HtmlPrice = string.Empty;
        public string HtmlImage = string.Empty;
        public string HtmlIntro = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                WxConfigHelper helper = new WxConfigHelper(this.Page);
                helper.Init();
                if (Session["mycourse"] != null && Session["myopenid"] != null)
                {
                    GetData(Session["mycourse"].ToString());
                    if (CourseInfo == null)
                    {
                        Response.Redirect("../result/404.html");
                    }
                    PublicHtml();
                    if (GetNonPayOrder(Session["mycourse"].ToString()) == false)
                    {
                        SetPayData();
                    }
                }
            }
        }
        private void GetData(string courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(courseId));
            CourseInfo = model;
        }
        private void SetPayData()
        {
            WxJsPayData pay = new WxJsPayData();
            pay.Attach = "course";
            pay.Body = CourseInfo.Name;
            pay.BuyNumber = 1;
            pay.GoodsTag = "家教知慧";
            pay.Price = Convert.ToDecimal((CourseInfo.PreferentialPrice??0)*100);
            pay.Tradeno = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
            pay.OpenId = Session["myopenid"].ToString();
            Session["WXJSPAYDATA"] = pay;
        }
        private void PublicHtml()
        {
            HtmlCaption = CourseInfo.Name;
            HtmlPrice = string.Format("{0:F2}", CourseInfo.PreferentialPrice);
            HtmlImage = CourseInfo.ImgUrl;
            HtmlIntro = CourseInfo.Intro;
        }
        private bool GetNonPayOrder(string courseId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            DataSet ds = bll.GetList(1, "CourseId=" + courseId + " and OpenId='" + Session["myopenid"].ToString() + "' and IsDel<>1 and IsPay=0 and Paymode=1 and Price=" + CourseInfo.PreferentialPrice, "OrderDateTime desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                WxJsPayData pay = new WxJsPayData();
                pay.Attach = "course";
                pay.Body = CourseInfo.Name;
                pay.BuyNumber = 1;
                pay.GoodsTag = "家教知慧";
                decimal price = 0;
                if (ds.Tables[0].Rows[0]["Price"] != null && ds.Tables[0].Rows[0]["Price"].ToString() != "")
                {
                    price = Convert.ToDecimal(ds.Tables[0].Rows[0]["Price"].ToString());
                }
                pay.Price = Convert.ToDecimal(price * 100);
                pay.Tradeno = ds.Tables[0].Rows[0]["Tradeno"].ToString();
                pay.OpenId = Session["myopenid"].ToString();
                Session["WXJSPAYDATA"] = pay;
                return true;
            }
            return false;
        }
        private Model.WX_Course CourseInfo { get; set; }
    }
}
