using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using ShenerWeiXin.WxApi.WxJs;
using Newtonsoft.Json;
using System.Text;

namespace SfSoft.web.wxpay.jsapi
{
    public delegate void CallBackWxJSDKDelegate(JsSDKConfigResult result);
    public class ThreedWxJSDK
    {
        private bool payConfig = false;
        private bool addressConfig = false;
        private bool debug = false;
        private  EnumJsRight[] rights=null;
        private CallBackWxJSDKDelegate callBackWxJsSdk = null;
        public ThreedWxJSDK(Page page,CallBackWxJSDKDelegate callback)
        {
            this.Page = page;
            this.callBackWxJsSdk = callback;
        }
        public void Run()
        {
            JsSDKConfigResult result=new JsSDKConfigResult();
            result.WxBaseConfig= InitBaseConfig();
            ShenerWeiXin.WXHelper.WriteNode(result.WxBaseConfig, "config.txt");
            if (PayConfig == true)
            {
               result.WxPayConfig= InitPayConfig();
               ShenerWeiXin.WXHelper.WriteNode(result.WxPayConfig,"config.txt");
            }
            if (AddressConfig == true)
            {
                result.WxAddressConfig= InitAddress();
                ShenerWeiXin.WXHelper.WriteNode(result.WxAddressConfig, "config.txt");
            }
            if (this.callBackWxJsSdk != null) {
                callBackWxJsSdk(result);
            }
        }
        public bool PayConfig 
        {
            get { return payConfig; }
            set { payConfig = value; }
        }
        public bool AddressConfig 
        {
            get { return addressConfig; }
            set { addressConfig = value; }
        }
        public bool Debug
        {
            get { return debug; }
            set { debug = value; }
        }
        public EnumJsRight[] Rights
        {
            get;
            set;
        }
        public Page Page
        {
            get;
            set;
        }
        public string OpenId
        {
            get;
            set;
        }
        public WxJsPayData PayData
        {
            get;
            set;
        }
        public string AccessToken { get; set; }
        public string Host { get; set; }
        public string Path { get; set; }
        public string QueryString { get; set; }
        public string AbsoluteUri { get; set; }

        private string InitBaseConfig()
        {
            if (Rights.Length == 0) {
                throw new Exception("你还没有设置权限【Rights】列表");
            }
            ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2 jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2( this.AbsoluteUri, Debug, Rights);
            WXJsBaseConfig wxConfig = jsapi.RegisterWeiXinJsApi();
            return JsonConvert.SerializeObject(wxConfig);
        }
        private string InitPayConfig()
        {
            if (OpenId == "") {
                throw new Exception("你还没有设置用户【OpenId】");
            }
            if (PayData == null) {
                throw new Exception("你还没有设置支付数据【PayData】");
            }
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI pay = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(null);
            pay.openid = OpenId;
            pay.total_fee = Convert.ToInt32(PayData.BuyNumber * PayData.Price * 100);
            ShenerWeiXin.WxApi.WxPay.PayData data = pay.GetUnifiedOrderResult(PayData.Body, PayData.Attach, PayData.Tradeno, PayData.goodsTag);
            return pay.GetJsApiParameters();
        }
        private string InitAddress()
        {
            if (AccessToken == "")
            {
                throw new Exception("你还没有设置用户【OpenId】");
            }
            try
            {
                ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI payApi = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(Page);
                payApi.access_token = AccessToken;

                return payApi.GetEditAddressParameters(this.Host,this.Path,this.QueryString);
            }
            catch (Exception ex) {
                return ex.Message;
            }
        }
    }
}