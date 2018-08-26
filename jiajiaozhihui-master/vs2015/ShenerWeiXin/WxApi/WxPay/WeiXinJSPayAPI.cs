using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.Security;
using System.Web;
using Senparc.Weixin.MP.Helpers;

namespace ShenerWeiXin.WxApi.WxPay
{
    public class WeiXinJSPayAPI
    {
        /// <summary>
        /// 保存页面对象，因为要在类的方法中使用Page的Request对象
        /// </summary>
        private Page page { get; set; }

        /// <summary>
        /// openid用于调用统一下单接口
        /// </summary>
        public string openid { get; set; }

        /// <summary>
        /// access_token用于获取收货地址js函数入口参数
        /// </summary>
        public string access_token { get; set; }

        /// <summary>
        /// 商品金额，用于统一下单
        /// </summary>
        public int total_fee { get; set; }
       
        /// <summary>
        /// 统一下单接口返回结果
        /// </summary>
        public PayData unifiedOrderResult { get; set; }
        public WeiXinJSPayAPI(Page page)
        {
            this.page = page;
        }
        /**
         * 调用统一下单，获得下单结果
         * @return 统一下单结果
         * @失败时抛异常WxPayException
         */
        public PayData GetUnifiedOrderResult( string body,string attach,string outTradeNo,string goodsTag)
        {
            //统一下单
            PayData data = new PayData();
            data.SetValue("body", body);
            data.SetValue("attach", attach);
            data.SetValue("out_trade_no", outTradeNo);
            data.SetValue("total_fee", total_fee);
            data.SetValue("time_start", DateTime.Now.ToString("yyyyMMddHHmmss"));
            data.SetValue("time_expire", DateTime.Now.AddMinutes(10).ToString("yyyyMMddHHmmss"));
            data.SetValue("goods_tag", goodsTag);
            data.SetValue("trade_type", "JSAPI");
            data.SetValue("openid", openid);
            PayData result = PayApi.UnifiedOrder(data);
            if (!result.IsSet("appid") || !result.IsSet("prepay_id") || result.GetValue("prepay_id").ToString() == "")
            {
                throw new WxPayException("UnifiedOrder response error!");
            }
            unifiedOrderResult = result;
            return result;
        }
        /**
        *  
        * 从统一下单成功返回的数据中获取微信浏览器调起jsapi支付所需的参数，
        * 微信浏览器调起JSAPI时的输入参数格式如下：
        * {
        *   "appId" : "wx2421b1c4370ec43b",     //公众号名称，由商户传入 要与config传入的参数保持一致     
        *   "timeStamp":" 1395712654",         //时间戳，自1970年以来的秒数     
        *   "nonceStr" : "e61463f8efa94090b1f366cccfbbb444", //随机串     
        *   "package" : "prepay_id=u802345jgfjsdfgsdg888",     
        *   "signType" : "MD5",         //微信签名方式:    
        *   "paySign" : "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
        * }
        * @return string 微信浏览器调起JSAPI时的输入参数，json格式可以直接做参数用
        * 更详细的说明请参考网页端调起支付API：http://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7
        * 
        */
        public string GetJsApiParameters()
        {
            PayData jsApiParam = new PayData();
            jsApiParam.SetValue("appId", WxPay.WxPayConfig.APPID);
            jsApiParam.SetValue("timeStamp", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp());
            jsApiParam.SetValue("nonceStr", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr());
            jsApiParam.SetValue("package", "prepay_id=" + unifiedOrderResult.GetValue("prepay_id"));
            jsApiParam.SetValue("signType", "MD5");
            jsApiParam.SetValue("paySign", jsApiParam.MakeSign());

            string parameters = jsApiParam.ToJson();

            return parameters;
        }

        /**
	    * 
	    * 获取收货地址js函数入口参数,详情请参考收货地址共享接口：http://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_9
	    * @return string 共享收货地址js函数需要的参数，json格式可以直接做参数使用
	    */
        public string GetEditAddressParameters()
        {
            string parameter = "";
            try
            {
                string host = page.Request.Url.Host;
                string path = page.Request.Path;
                string queryString = page.Request.Url.Query;
                //这个地方要注意，参与签名的是网页授权获取用户信息时微信后台回传的完整url
                string url = "http://" + host + path + queryString;

                //构造需要用SHA1算法加密的数据
                PayData signData = new PayData();
                signData.SetValue("appid", WxPayConfig.APPID);  //WxPayConfig.APPID
                signData.SetValue("url", url); //url
                signData.SetValue("timestamp", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp()); //Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp()
                signData.SetValue("noncestr", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr()); //Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr()
                signData.SetValue("accesstoken", access_token); //access_token
                string param = signData.ToUrl();
                
                //SHA1加密
                string addrSign = SHA1UtilHelper.GetSha1(param);

                //string addrSign = FormsAuthentication.HashPasswordForStoringInConfigFile(m, "SHA1");
                
                
                if (access_token == "" || access_token == null) {
                    throw new WxPayException("access_token 未设置");
                }

                //获取收货地址js函数入口参数
                PayData afterData = new PayData();
                afterData.SetValue("appId", WxPayConfig.APPID);
                afterData.SetValue("scope", "jsapi_address");
                afterData.SetValue("signType", "sha1");
                afterData.SetValue("addrSign", addrSign);
                afterData.SetValue("timeStamp", signData.GetValue("timestamp"));
                afterData.SetValue("nonceStr", signData.GetValue("noncestr"));

                //转为json格式
                parameter = afterData.ToJson();
                
            }
            catch (Exception ex)
            {
                throw new WxPayException(ex.ToString());
            }
            return parameter;
        }

        /**
	    * 
	    * 获取收货地址js函数入口参数,详情请参考收货地址共享接口：http://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_9
	    * @return string 共享收货地址js函数需要的参数，json格式可以直接做参数使用
	    */
        public string GetEditAddressParameters(string host, string path, string queryString)
        {
            string parameter = "";
            try
            {
                //这个地方要注意，参与签名的是网页授权获取用户信息时微信后台回传的完整url
                string url = "http://" + host + path + queryString;

                //构造需要用SHA1算法加密的数据
                PayData signData = new PayData();
                signData.SetValue("appid", WxPayConfig.APPID);
                signData.SetValue("url", url);
                signData.SetValue("timestamp", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp());
                signData.SetValue("noncestr", Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr());
                signData.SetValue("accesstoken", access_token);
                string param = signData.ToUrl();

                //SHA1加密
                string addrSign = FormsAuthentication.HashPasswordForStoringInConfigFile(param, "SHA1");

                if (access_token == "" || access_token == null)
                {
                    throw new WxPayException("access_token 未设置");
                }

                //获取收货地址js函数入口参数
                PayData afterData = new PayData();
                afterData.SetValue("appId", WxPayConfig.APPID);
                afterData.SetValue("scope", "jsapi_address");
                afterData.SetValue("signType", "sha1");
                afterData.SetValue("addrSign", addrSign);
                afterData.SetValue("timeStamp", signData.GetValue("timestamp"));
                afterData.SetValue("nonceStr", signData.GetValue("noncestr"));

                //转为json格式
                parameter = afterData.ToJson();
            }
            catch (Exception ex)
            {
                throw new WxPayException(ex.ToString());
            }
            return parameter;
        }
    }
}
