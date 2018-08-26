using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// WxPaySignController 的摘要说明
    /// </summary>
    public class WxPaySignController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "config":
                    GetPayConfig(context);
                    break;
                case "pay":
                    PostPaySign(context);
                    break;
            }
        }
        public void GetPayConfig(HttpContext context)
        {
            string appId=context.Request["appId"];
            string openid=context.Request["openid"];
            string page = context.Request["page"];

            var url = App.Url.ZXSUrl.ServiceUrl+"app/pay/" + page + "?appid=" + appId + "&openid=" + openid;
            var result= WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxPayConfig.APPID, App.Helper.WxPayConfig.APPSECRET);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void PostPaySign(HttpContext context)
        {
            string paydata = context.Request["data"];
            Models.WxPay.WxPayInfo info = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.WxPay.WxPayInfo>(paydata);

            string timeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp();
            string nonceStr = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr();
            string body = info.Body;//商品或支付单简要描述
            string out_trade_no = info.OutTradeNo;//商户系统内部的订单号，32个字符内，可包含字母，其他说明见商户订单号
            int total_fee =150000;//订单总金额，只能是整数。
            string spbill_create_ip = HttpContext.Current.Request.UserHostAddress;//APP和网页支付提交用户端IP，Native支付填调用微信支付API的机器IP Request.UserHostAddress
            string notify_url =App.Url.ZXSUrl.ServiceUrl+"app/pay/paynotice/"+info.NotifyPage;//接收微信支付异步通知回调地址
            string trade_type = "JSAPI";//JSAPI,NATIVE,APP,WAP
            string openid = info.Openid;//trade_type=JSAPI,此参数必传，用户在商户appid下的唯一标识。必传，这里需要将去获取openid赋值上去


            //创建支付应答对象
            Senparc.Weixin.MP.TenPayLibV3.RequestHandler packageReqHandler = new Senparc.Weixin.MP.TenPayLibV3.RequestHandler(null);
            //初始化
            packageReqHandler.Init();

            //设置package订单参数
            packageReqHandler.SetParameter("appid", App.Helper.WxPayConfig.APPID);
            packageReqHandler.SetParameter("mch_id", App.Helper.WxPayConfig.MCHID);
            packageReqHandler.SetParameter("nonce_str", nonceStr);
            packageReqHandler.SetParameter("body", body);
            packageReqHandler.SetParameter("out_trade_no", out_trade_no);
            packageReqHandler.SetParameter("total_fee", total_fee.ToString());
            packageReqHandler.SetParameter("spbill_create_ip", spbill_create_ip);
            packageReqHandler.SetParameter("notify_url", notify_url);
            packageReqHandler.SetParameter("trade_type", trade_type);
            packageReqHandler.SetParameter("openid", openid);
            packageReqHandler.SetParameter("attach", info.AppId);

            //App.Helper.Log.WriteNode(Newtonsoft.Json.JsonConvert.SerializeObject(packageReqHandler));

            string sign = packageReqHandler.CreateMd5Sign("key", App.Helper.WxPayConfig.KEY);

            packageReqHandler.SetParameter("sign", sign);

            string data = packageReqHandler.ParseXML();
            //App.Helper.Log.WriteNode(data);
            
            var result = Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Unifiedorder(data);
            
            var res = System.Xml.Linq.XDocument.Parse(result);
            //App.Helper.Log.WriteNode(result);

            string prepayId = res.Element("xml").Element("prepay_id").Value;

            timeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp();
            nonceStr = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr();

            Senparc.Weixin.MP.TenPayLibV3.RequestHandler paysignReqHandler = new Senparc.Weixin.MP.TenPayLibV3.RequestHandler(null);

            paysignReqHandler.Init();

            //设置支付参数
            paysignReqHandler.SetParameter("appId", App.Helper.WxPayConfig.APPID);
            paysignReqHandler.SetParameter("timeStamp", timeStamp);
            paysignReqHandler.SetParameter("nonceStr", nonceStr);
            paysignReqHandler.SetParameter("package", string.Format("prepay_id={0}", prepayId));
            paysignReqHandler.SetParameter("signType", "MD5");

            string paysign = paysignReqHandler.CreateMd5Sign("key", App.Helper.WxPayConfig.KEY);

            paysignReqHandler.SetParameter("paySign", paysign);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(paysignReqHandler.GetAllParameters(), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver()}));
        }
        //public string PostPayAddress(Models.WxPay.Address address)
        //{
        //    string parameter = "";
        //    try
        //    {
        //        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult aouthAccessTokenResult =
        //        Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(PayConfig.APPID, PayConfig.APPSECRET, address.code);

        //        //构造需要用SHA1算法加密的数据
        //        WxPayData signData = new WxPayData();
        //        signData.SetValue("appid", PayConfig.APPID);
        //        signData.SetValue("url", address.url);
        //        signData.SetValue("timestamp", Senparc.Weixin.MP.Helpers.JSSDKHelper.GetTimestamp());
        //        signData.SetValue("noncestr", Senparc.Weixin.MP.Helpers.JSSDKHelper.GetNoncestr());
        //        signData.SetValue("accesstoken", aouthAccessTokenResult.access_token);
        //        string param = signData.ToUrl();
        //        //SHA1加密
        //        string addrSign = FormsAuthentication.HashPasswordForStoringInConfigFile(param, "SHA1");

        //        //获取收货地址js函数入口参数
        //        WxPayData afterData = new WxPayData();
        //        afterData.SetValue("appId", PayConfig.APPID);
        //        afterData.SetValue("scope", "jsapi_address");
        //        afterData.SetValue("signType", "sha1");
        //        afterData.SetValue("addrSign", addrSign);
        //        afterData.SetValue("timeStamp", signData.GetValue("timestamp"));
        //        afterData.SetValue("nonceStr", signData.GetValue("noncestr"));

        //        //转为json格式
        //        parameter = afterData.ToJson();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new WxPayException(ex.ToString());
        //    }
        //    return parameter;
        //}
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}