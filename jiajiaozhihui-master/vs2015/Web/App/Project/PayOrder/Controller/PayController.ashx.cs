using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.PayOrder.Controller
{
    /// <summary>
    /// PayController 的摘要说明
    /// </summary>
    public class PayController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "pay":
                    PostPaySign(context);
                    break;
            }
        }
        
        private void PostPaySign(HttpContext context)
        {
            var orderId = context.Request["orderId"];
            Helper.PayProvide provide = new Helper.PayProvide();
            var parameter= provide.GetUnifiedorderData(int.Parse(orderId));

            //创建支付应答对象
            Senparc.Weixin.MP.TenPayLibV3.RequestHandler packageReqHandler = new Senparc.Weixin.MP.TenPayLibV3.RequestHandler(null);
            //初始化
            packageReqHandler.Init();

            //设置package订单参数
            packageReqHandler.SetParameter("appid", parameter.AppId);
            packageReqHandler.SetParameter("mch_id", parameter.MchId);
            packageReqHandler.SetParameter("nonce_str", parameter.NonceStr);
            packageReqHandler.SetParameter("body", parameter.Body);
            packageReqHandler.SetParameter("out_trade_no", parameter.OutTradeNo);
            packageReqHandler.SetParameter("total_fee", parameter.TotalFee.ToString());
            packageReqHandler.SetParameter("spbill_create_ip", HttpContext.Current.Request.UserHostAddress);
            packageReqHandler.SetParameter("notify_url", parameter.NotifyUrl);
            packageReqHandler.SetParameter("trade_type", parameter.TradeType);
            packageReqHandler.SetParameter("openid", parameter.OpenId);
            packageReqHandler.SetParameter("attach", parameter.Attach);

            //App.Helper.Log.WriteNode(Newtonsoft.Json.JsonConvert.SerializeObject(packageReqHandler));

            string sign = packageReqHandler.CreateMd5Sign("key", App.Helper.WxPayConfig.KEY);

            packageReqHandler.SetParameter("sign", sign);

            string data = packageReqHandler.ParseXML();
            //App.Helper.Log.WriteNode(data);

            var result = Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Unifiedorder(data);

            var res = System.Xml.Linq.XDocument.Parse(result);
            //App.Helper.Log.WriteNode(result);

            string prepayId = res.Element("xml").Element("prepay_id").Value;

            var timeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp();
            var nonceStr = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr();

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

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(paysignReqHandler.GetAllParameters(), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
       
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}