using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using ShenerWeiXin.WxApi.WxJs;
using System.Text;
using SfSoft.web.wxpay.Activity315.Code;

namespace SfSoft.web.wxpay.Activity315
{
    public partial class _315 : System.Web.UI.Page
    {
        public string wxJsPayApiParam { get; private set; }
        private string OpenId { get; set; }
        private string accessToken = "";
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["number"] != null)
                {
                    payNumber.InnerText = Request.QueryString["number"].ToString();
                }
                InitOAuth();
                OutTradeno();
                GetGoods();
            }
        }
        protected void Page_LoadComplete(object sender, EventArgs e)
        {
            loadingToast.Attributes.CssStyle.Add("display", "block");
            InitJs();
            InitPay();
            InitAddress();
        }
        public EnumerableRowCollection<DataRow> AreaEnumerableRow { get; private set; }
        /// <summary>
        /// json址址信息
        /// </summary>
        public string AreaJson { get; private set; }

        /// <summary>
        /// 创建预付订单
        /// </summary>
        private void OutTradeno()
        {
            hfTradeno.Value = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
        }
        /// <summary>
        /// 初始jssdk
        /// </summary>
        private void InitJs()
        {
            ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);
            jsapi.SetRightList(EnumJsRight.chooseWXPay, EnumJsRight.getLatestAddress, EnumJsRight.editAddress);
            jsapi.RegisterWeiXinJsApi();
        }
        /// <summary>
        /// 初始支付
        /// </summary>
        private void InitPay()
        {
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI pay = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(null);
            pay.openid = OpenId;
            EnumActivity315 enumActivity315 = Helper.GetBuyState();
            PriceFactory factory = new PriceFactory();
            IPrice price= factory.CreatePrice(enumActivity315);
            
            //pay.total_fee = Convert.ToInt32(Convert.ToInt32(payNumber.InnerText) * Convert.ToDecimal(GoodsInfo.PublicPrice) * 100);
            pay.total_fee = price.GetPrice(Convert.ToInt32(payNumber.InnerText), enumActivity315);
            string body = "亲子书法教材";
            ShenerWeiXin.WxApi.WxPay.PayData data = pay.GetUnifiedOrderResult(body, "在线支付", hfTradeno.Value, "goodsTag");
            wxJsPayApiParam = pay.GetJsApiParameters();
        }
        /// <summary>
        /// 获取收货地址
        /// </summary>
        private void InitAddress()
        {
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI payApi = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(this.Page);
            if (Session["myaccesstoken"] != null)
            {
                payApi.access_token = Session["myaccesstoken"].ToString();
            }
            else
            {
                Response.Redirect("/wxpay/result/error.html");
            }
            hfAddressParameters.Value = payApi.GetEditAddressParameters();
        }
        private void InitOAuth()
        {
            ShenerWeiXin.WxApi.WxOAuth.BaseOAuth oauth = new ShenerWeiXin.WxApi.WxOAuth.BaseOAuth(this.Page);
            oauth.GetOAuthUserInfo();
            if (oauth.OAuthResult.Code == ShenerWeiXin.WxApi.WxOAuth.OAuthCodeEnum.error.ToString())
            {
                oauth.RedirectUrl = Request.Url.AbsoluteUri;
                oauth.Redirect();
            }
            else
            {
                OpenId = oauth.OAuthResult.UserInfo.openid;
                hfOpenId.Value = OpenId;
            }
        }

        public Model.WX_PublicGood GoodsInfo { get; private set; }
        private void GetGoods()
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(76);
            if (model == null)
            {
                model = new Model.WX_PublicGood();
            }
            GoodsInfo = model;
        }

        
    }
}
