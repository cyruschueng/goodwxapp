using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Pay.Service
{
    /// <summary>
    /// UnifiedOrderController 的摘要说明
    /// 统一下单
    /// </summary>
    public class UnifiedOrderController : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            UnifiedOrder(context);
        }

        private void UnifiedOrder(HttpContext context)
        {
            string msg = "";

            var productId = context.Request["product_id"];  
            var number = context.Request["number"];
            var openId=context.Request["openId"];
            var other= context.Request["to"];

            //App.Helper.Log.WriteNode("productId=" + productId + "number=" + number + "openId="+openId,"testp.txt");

            if (string.IsNullOrEmpty(productId)) {
                context.Response.Write("无效的产品Id");
                return;
            }
            if (string.IsNullOrEmpty(number))
            {
                context.Response.Write("购买数量无效");
                return;
            }
            if (string.IsNullOrEmpty(openId))
            {
                context.Response.Write("无效的用户");
                return;
            }

            if (!string.IsNullOrEmpty(productId)) {
                //产品
                SfSoft.web.Product.Helper.ProductProvide provide = new SfSoft.web.Product.Helper.ProductProvide(int.Parse(productId));
                var productInfo = provide.GetProductInfo();
                //购买数量
                var buyNumber = int.Parse(number);
                //订单号
                var tradeno=SfSoft.web.PayOrder.Helper.OrderProvide.GenerateOutTradeNo(productInfo.ProductType);
                //产品价格
                var totalFree = Convert.ToInt32(productInfo.Price * 100);
                //Attach参数 有效字符中长为128个符
                Attach attach = new Attach() {
                    OrderType = productInfo.ProductType.ToString(),
                    ProductId = productId,
                    Other = other
                };
                
                var orderData = new SfSoft.web.PayOrder.Models.Order.UnifiedorderData()
                {
                    AppId = App.Helper.WxPayConfig.APPID,
                    Attach =Newtonsoft.Json.JsonConvert.SerializeObject(attach),
                    Body = productInfo.ProductName,
                    MchId = App.Helper.WxPayConfig.MCHID,
                    NonceStr = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr(),
                    OpenId = openId,
                    OutTradeNo = tradeno,
                    TimeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp(),
                    TotalFee = totalFree * buyNumber,
                    TradeType = "JSAPI",
                    SpbillCreateIp=HttpContext.Current.Request.UserHostAddress,
                    NotifyUrl = "http://weixin.jiajiaozhihui.cn/app/pay/paynotice/ResultNotifyPage.aspx",
                };

                //创建支付应答对象
                Senparc.Weixin.MP.TenPayLibV3.RequestHandler packageReqHandler = new Senparc.Weixin.MP.TenPayLibV3.RequestHandler(null);
                //初始化
                packageReqHandler.Init();

                //设置package订单参数
                packageReqHandler.SetParameter("appid", orderData.AppId);
                packageReqHandler.SetParameter("mch_id", orderData.MchId);
                packageReqHandler.SetParameter("nonce_str", orderData.NonceStr);
                packageReqHandler.SetParameter("body", orderData.Body);
                packageReqHandler.SetParameter("out_trade_no", orderData.OutTradeNo);
                packageReqHandler.SetParameter("total_fee", orderData.TotalFee.ToString());
                packageReqHandler.SetParameter("spbill_create_ip", orderData.SpbillCreateIp);
                packageReqHandler.SetParameter("notify_url", orderData.NotifyUrl);
                packageReqHandler.SetParameter("trade_type", orderData.TradeType);
                packageReqHandler.SetParameter("openid", orderData.OpenId);
                packageReqHandler.SetParameter("attach", orderData.Attach);
                packageReqHandler.SetParameter("product_id", orderData.ProductId);

                string sign = packageReqHandler.CreateMd5Sign("key", App.Helper.WxPayConfig.KEY);

                packageReqHandler.SetParameter("sign", sign);

                string data = packageReqHandler.ParseXML();
                //App.Helper.Log.WriteNode(data);
                /*
                Senparc.Weixin.MP.TenPayLibV3.TenPayV3UnifiedorderRequestData x = new Senparc.Weixin.MP.TenPayLibV3.TenPayV3UnifiedorderRequestData(
                    orderData.AppId,
                    orderData.MchId,
                    orderData.Body,
                    orderData.OutTradeNo,
                    orderData.TotalFee,
                    orderData.SpbillCreateIp,
                    orderData.NotifyUrl,
                    Senparc.Weixin.MP.TenPayV3Type.JSAPI,
                    orderData.OpenId,
                    App.Helper.WxPayConfig.KEY,
                    orderData.NonceStr, null, null, null, null, orderData.Attach, "CNY", null, null, false);

                */

                //var result = Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Unifiedorder(x);

                var result = Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Unifiedorder(data);

                var res = System.Xml.Linq.XDocument.Parse(result);
                //App.Helper.Log.WriteNode(result);

                string prepayId = res.Element("xml").Element("prepay_id").Value;

                var  timeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp();
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

                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(
                    new {
                        OutTradeNo=orderData.OutTradeNo,
                        PayParameters=paysignReqHandler.GetAllParameters()
                    },
                    new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
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