using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WxPayAPI;

namespace SfSoft.web.Test
{
    public partial class ResultNotifyPayTest : System.Web.UI.Page
    {
        Dictionary<string, string> DicParams = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            SfSoft.BLL.WX_Bills sssss = new BLL.WX_Bills();

            SfSoft.BLL.WX_PayOrder xx = new BLL.WX_PayOrder();

            SfSoft.BLL.WX_Bill cc = new BLL.WX_Bill();

            SfSoft.BLL.WX_Course bll1 = new SfSoft.BLL.WX_Course();

            //因为微信服务器会多次推送通知到这里，所以需要在这里判断订单是否已经完成支付，如果完成，则不进行下面操作

            string out_trade_no = "2016121920170515202003480";//商户订单号
            string openId = "oc6zzs1y_A_7RgGi6EGLBUrPCfRk";
            string attach = "{\"OpenId\":\"oc6zzsyvjlmcVFeSaHlms9fhvj0k\",\"ProductId\":\"104\",\"OrderType\":\"20161219\"}";
            string price = "200";
            string mchId = "1229673702";

            
            /*
             
             <xml><result_code><![CDATA[SUCCESS]]></result_code><fee_type><![CDATA[CNY]]></fee_type><return_code><![CDATA[SUCCESS]]></return_code><total_fee><![CDATA[200]]></total_fee><mch_id><![CDATA[1229673702]]></mch_id><cash_fee><![CDATA[200]]></cash_fee><openid><![CDATA[oc6zzs1y_A_7RgGi6EGLBUrPCfRk]]></openid><transaction_id><![CDATA[4001522001201705150986509916]]></transaction_id><sign><![CDATA[7F97BBEC264AD4C19BC8BD7EB95A32AF]]></sign><bank_type><![CDATA[CEB_DEBIT]]></bank_type><appid><![CDATA[wxa0f624ad8cdb46c4]]></appid><time_end><![CDATA[20170515202011]]></time_end><trade_type><![CDATA[JSAPI]]></trade_type><nonce_str><![CDATA[6EA2EF7311B482724A9B7B0BC0DD85C6]]></nonce_str><is_subscribe><![CDATA[Y]]></is_subscribe><attach><![CDATA[{"OpenId":"oc6zzsyvjlmcVFeSaHlms9fhvj0k","ProductId":"104","OrderType":"20161219"}]]></attach><out_trade_no><![CDATA[2016121920170515202003480]]></out_trade_no></xml> <BR>
             
             
             */


            
            var attachParams = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.web.App.Pay.Attach>(attach);


            //验证请求是否从微信发过来（安全）
            if (true)
            {

                if (attachParams.OrderType == "20161216")
                {
                    SfSoft.web.PayOrder.Helper.OrderProvide provide = new SfSoft.web.PayOrder.Helper.OrderProvide();
                    if (provide.ExistPayOrder(out_trade_no) == true)
                    {
                        provide.UpdateOrder(out_trade_no, null, null, null);
                    }
                }
                else if (attachParams.OrderType == "20161219")　//打赏
                {
                    string productId = attachParams.ProductId;/*产品Id*/
                    string toOpenid = attachParams.Other; /*要打赏的人*/

                    PayNotice.QA qa = new PayNotice.QA(productId, out_trade_no);
                    //分转元
                    var amount = decimal.Parse(price) / 100;
                    if (qa.Exists() == false)
                    {
                        qa.AddBill(openId, mchId, "", amount, BillTypeEnum.QA, PayTypeEnum.Entry, "用户打赏");//新增帐单
                        #region 企业转帐
                        if (!string.IsNullOrEmpty(toOpenid))
                        {
                            var ipAddress = Request.ServerVariables.Get("Local_Addr").ToString();
                            SfSoft.BLL.WX_PublicGood bll = new SfSoft.BLL.WX_PublicGood();
                            var discount = qa.ReadDiscount(qa.IsExpert(toOpenid));//分点
                            amount = (decimal.Parse(price) / 100) * discount;
                            if (amount <= 1) amount = 1m;
                            var result = qa.Transfer(ipAddress, amount, "家教问答用户打赏", toOpenid);
                            #endregion
                            if (result.result_code == "SUCCESS" && result.return_code == "SUCCESS")
                            {
                                //转帐成功,增加帐单
                                qa.AddBill(toOpenid, mchId, result.payment_no, amount, BillTypeEnum.QA, PayTypeEnum.Charge, "用户打赏奖励给专家");
                            }
                        }
                    }
                }
            }
        }
    }
}
