using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WxPayAPI;

namespace WxPayAPI
{
    public partial class ResultNotifyPage : Page
    {
        Dictionary<string, string> DicParams = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            Senparc.Weixin.MP.TenPayLibV3.ResponseHandler payNotifyRepHandler = new Senparc.Weixin.MP.TenPayLibV3.ResponseHandler(null);
            payNotifyRepHandler.SetKey(WxPayConfig.KEY);

            
            string return_code = payNotifyRepHandler.GetParameter("return_code");//返回状态码
            string return_msg = payNotifyRepHandler.GetParameter("return_msg");//返回信息
            

            //支付失败直接返回
            if (return_code.ToUpper() != "SUCCESS")
            {
                string xml = string.Format(@"<xml><return_code><![CDATA[{0}]]></return_code><return_msg><![CDATA[{1}]]></return_msg></xml>", return_code, return_msg);
                SfSoft.Common.LogHelper.WriteLog(xml);
                Page.Response.Write(xml);
                Page.Response.End();
            }

            //因为微信服务器会多次推送通知到这里，所以需要在这里判断订单是否已经完成支付，如果完成，则不进行下面操作

            string out_trade_no = payNotifyRepHandler.GetParameter("out_trade_no");//商户订单号
            string openId = payNotifyRepHandler.GetParameter("openid");
            string attach = payNotifyRepHandler.GetParameter("attach");
            string price = payNotifyRepHandler.GetParameter("total_fee");
            string mchId = payNotifyRepHandler.GetParameter("mch_id");

            SfSoft.Common.LogHelper.WriteLog(payNotifyRepHandler.ParseXML());
            

            var attachParams = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.web.App.Pay.Attach>(attach);


            //验证请求是否从微信发过来（安全）
            if (payNotifyRepHandler.IsTenpaySign())
            {

                if (attachParams.OrderType == "20161216")
                {
                    SfSoft.web.PayOrder.Helper.OrderProvide provide = new SfSoft.web.PayOrder.Helper.OrderProvide();
                    if (provide.ExistPayOrder(out_trade_no) == true)
                    {
                        if (provide.IsProcessOrder(out_trade_no))
                        {
                            return;
                        }
                        else
                        {
                            provide.UpdateOrder(out_trade_no, null, null, null);
                        }
                    }
                    else
                    {
                        return;
                    }
                }
                else if (attachParams.OrderType == "20161219")　//打赏
                {
                    try
                    {
                        string productId = attachParams.ProductId;/*产品Id*/
                        string others = attachParams.Other; /*要打赏的人*/
                        string toOpenId = others.Split(',')[0];
                        string id = others.Split(',')[1];/*回答Id*/

                        PayNotice.QA qa = new PayNotice.QA(productId, out_trade_no);
                        //分转元
                        var amount = decimal.Parse(price) / 100;
                        if (qa.Exists() == false)
                        {
                            qa.AddBill(openId, mchId, id, amount, BillTypeEnum.QA, PayTypeEnum.Entry, "用户打赏");//新增帐单

                            #region 如果回答是系统后台回答的，将不进行企业转帐
                            SfSoft.BLL.WX_QA_Comment commentBll = new SfSoft.BLL.WX_QA_Comment();
                            var comment = commentBll.GetModel(int.Parse(id));
                            if ((comment.IsAgent ?? 0) == 1) return;
                            #endregion

                            #region 企业转帐
                            if (!string.IsNullOrEmpty(toOpenId))
                            {
                                var ipAddress = Request.ServerVariables.Get("Local_Addr").ToString();
                                SfSoft.BLL.WX_PublicGood bll = new SfSoft.BLL.WX_PublicGood();
                                var discount = qa.ReadDiscount(qa.IsExpert(toOpenId));//分点
                                amount = (decimal.Parse(price) / 100) * discount;
                                if (amount <= 1) amount = 1m;
                                var result = qa.Transfer(ipAddress, amount, "家教问答用户打赏", toOpenId);

                                #endregion
                                if (result.result_code == "SUCCESS" && result.return_code == "SUCCESS")
                                {
                                    //转帐成功,增加帐单
                                    qa.AddBill(toOpenId, mchId, result.payment_no, amount, BillTypeEnum.QA, PayTypeEnum.Charge, "用户打赏奖励给专家");
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        SfSoft.Common.LogHelper.ErrorLog("打赏支付出错", ex);
                    }
                }
                else if (attachParams.OrderType == "20161221")//四大名著
                {
                    SfSoft.web.PayOrder.Helper.OrderProvide provide = new SfSoft.web.PayOrder.Helper.OrderProvide();
                    if (provide.ExistPayOrder(out_trade_no) == true)
                    {
                        if (provide.IsProcessOrder(out_trade_no))
                        {
                            string xml = string.Format(@"<xml><return_code><![CDATA[{0}]]></return_code><return_msg><![CDATA[{1}]]></return_msg></xml>", "FAIL", "已处理");
                            Page.Response.Write(xml);
                            Page.Response.End();
                        }
                        else
                        {
                            provide.UpdateOrder(out_trade_no, null, null, null);
                            Action<string, string, string, string, string, string,string> action = (oid, first, keyword1, keyword2, keyword3,remark,url) =>
                            {
                                var accessToken= Senparc.Weixin.MP.Containers.AccessTokenContainer.GetAccessToken(SfSoft.web.App.Helper.WxBaseConfig.AppID);
                                
                                SfSoft.web.App.TemplateMessage.ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U message = new SfSoft.web.App.TemplateMessage.ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U(accessToken, url);
                                message.Send(oid, first, keyword1, keyword2, keyword3, remark);
                            };
                            action.BeginInvoke(openId, "亲爱的家长，您的订单已经下单成功！", "《升级版中国儿童文学四大名著》", "18.00元", "支付成功", "您的订单我们已收到，接下来我们会尽快为您安排发货，敬请关注！","",null,null);


                            string xml = string.Format(@"<xml><return_code><![CDATA[{0}]]></return_code><return_msg><![CDATA[{1}]]></return_msg></xml>", "SUCCESS", "OK");
                            Page.Response.Write(xml);
                            Page.Response.End();
                        }
                    }
                }
            }
            else {
                string xml = string.Format(@"<xml><return_code><![CDATA[{0}]]></return_code><return_msg><![CDATA[{1}]]></return_msg></xml>", "FAIL", "不安全操作");
                Page.Response.Write(xml);
                Page.Response.End();
            }
        }
    }
}
