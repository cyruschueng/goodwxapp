using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxJs;
using Newtonsoft.Json;
using System.Threading;
using System.Text;

namespace SfSoft.web.wxpay.jsapi
{
    public partial class pay : System.Web.UI.Page
    {
        public string wxJsPayApiParam { get; private set; }
        private string OpenId { get; set; }
        private string accessToken = "";
        private static string absoluteUri = "";
        private SynchronizationContext _syncContext = null;
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack) {
                if (Request.QueryString["number"] != null)
                {
                    payNumber.InnerText = Request.QueryString["number"].ToString();
                }
                Session["myaccesstoken"] = "aaaaaaaaaaaaaaaaaaaa";
                _syncContext = SynchronizationContext.Current;
                //InitOAuth();
                OutTradeno();
                GetGoods();
                string host =this.Page.Request.Url.Host;

                ThreedWxJSDK jsSdk = new ThreedWxJSDK(this.Page, JSSDKCallBack);
                jsSdk.AddressConfig = true;
                jsSdk.PayConfig = false;
                jsSdk.Rights = new EnumJsRight[] { EnumJsRight.editAddress, EnumJsRight.getLatestAddress, EnumJsRight.chooseWXPay };
                jsSdk.Debug = true;
                jsSdk.OpenId = "oc6zzs1y_A_7RgGi6EGLBUrPCfRk";
                jsSdk.AccessToken = Session["myaccesstoken"].ToString();
                jsSdk.PayData = new WxJsPayData() { Attach = "家教智慧", Body = "国学经典书法教材", BuyNumber = 1, goodsTag = "", Price = 3.15M, Tradeno = hfTradeno.Value };
                jsSdk.AbsoluteUri = this.Page.Request.Url.AbsoluteUri;
                jsSdk.Host = this.Page.Request.Url.Host;
                jsSdk.Path = this.Page.Request.Path;
                jsSdk.QueryString = this.Page.Request.Url.Query;
                Thread thread = new Thread(jsSdk.Run);
                thread.IsBackground = true;
                thread.Start();
                AddressCallBack("");
            }
            
            /*
            ThreedPay pay = new ThreedPay(OpenId, 1, 3.15M, hfTradeno.Value, PayCallBack);
            Thread threadPay = new Thread(pay.InitPay);
            threadPay.Start();
            ThreedAddress address = new ThreedAddress(this.Page, Session["myaccesstoken"].ToString(), AddressCallBack);
            Thread threadAddress = new Thread(address.InitAddress);
            threadAddress.Start();
            
            StringBuilder sb=new StringBuilder();
            sb.AppendLine("<script>");
            sb.AppendLine("     $(document).on('click', '#myinput', function () { ");
            sb.AppendLine("             $('#txtLog').val(new Date().getMilliseconds()); ");
            sb.AppendLine("     })");
            sb.AppendLine("</script>");
            this.Page.ClientScript.RegisterStartupScript(this.Page.GetType(), "weixinjssdk",sb.ToString());
             * */

            
        }
        private void PayCallBack(string message)
        {
            
        }
        private void AddressCallBack(object message)
        {
            hfWxBaseConfig.Value = message.ToString();
        }
        private void JSSDKCallBack(JsSDKConfigResult result)
        {
            hfWxBaseConfig.Value = result.WxBaseConfig;
            
            //hfWxPayConfig.Value = result.WxPayConfig;
            //hfWxAddressConfig.Value = result.WxAddressConfig;
            
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<script>");
            sb.AppendLine(" var baseConfig="+result.WxBaseConfig+";");
            sb.AppendLine(" var payConfig=" + result.WxPayConfig + ";");
            sb.AppendLine(" var addressConfig=" + result.WxAddressConfig + ";");
            sb.AppendLine("</script>");
            try
            {
                _syncContext.Post(AddressCallBack, sb.ToString());
            }
            catch (Exception ex) {
                string m = ex.Message;
            }
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
        /// <summary>
        /// 创建预付订单
        /// </summary>
        private void OutTradeno()
        {
            hfTradeno.Value = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
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
        /// <summary>
        /// 初始jssdk
        /// </summary>
        [System.Web.Services.WebMethod]
        public static string  InitJs(string url)
        {
            try
            {
                ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2 jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2(url, false, EnumJsRight.chooseWXPay, EnumJsRight.getLatestAddress, EnumJsRight.editAddress);
                WXJsBaseConfig wxConfig = jsapi.RegisterWeiXinJsApi();
                string result=  JsonConvert.SerializeObject(wxConfig);
                return result;
            }
            catch (Exception ex) {
                string s = ex.Message;
                return s;
            }
        }
    }
}

