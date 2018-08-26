using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;
using SfSoft.web.Course.Helper;

namespace SfSoft.web.App.Pay.PayNotice
{
    /// <summary>
    /// Course 的摘要说明
    /// </summary>
    public class Course : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";


            Senparc.Weixin.MP.TenPayLibV3.ResponseHandler payNotifyRepHandler = new Senparc.Weixin.MP.TenPayLibV3.ResponseHandler(null);

            payNotifyRepHandler.SetKey(WxPayConfig.KEY);

            string return_code = payNotifyRepHandler.GetParameter("return_code");//返回状态码
            string return_msg = payNotifyRepHandler.GetParameter("return_msg");//返回信息
            string xml = string.Format(@"", return_code, return_msg);

            //支付失败直接返回
            if (return_code.ToUpper() != "SUCCESS")
            {
                Helper.Log.WriteNode("支付失败", "pay.txt");
            }
            //因为微信服务器会多次推送通知到这里，所以需要在这里判断订单是否已经完成支付，如果完成，则不进行下面操作

            string out_trade_no = payNotifyRepHandler.GetParameter("out_trade_no");//商户订单号
            string openId = payNotifyRepHandler.GetParameter("openid");
            string orderType = payNotifyRepHandler.GetParameter("attach");

            //验证请求是否从微信发过来（安全）
            if (payNotifyRepHandler.IsTenpaySign())
            {
                try
                {
                    //正确的订单处理
                    SfSoft.BLL.WX_Course_Order bll = new SfSoft.BLL.WX_Course_Order();
                    SfSoft.Model.WX_Course_Order model = bll.GetModelByTradeno(out_trade_no);
                    model.IsPay = 1;
                    model.IsAct = 1;
                    bll.Update(model);

                    if (model.OrderType == 1) {
                        web.Course.Helper.CourseProvide.Add(model.CourseId, model.OpenId);
                    }
                    else if (model.OrderType == 2) {
                        web.Course.Helper.CourseProvide.AddBag(model.CourseId, model.OpenId);
                    }
                    string url = "";
                    if (IsCard(model.CourseId) == true)
                    {
                        url =App.Helper.WxBaseConfig.CourseRedirectBaseInfoUrl+ "?redirect_url="+App.Url.CourseUrl.ClientUrl+"app/default.html&state={\"appid\":\"app001\",\"hash\":\"card\"}";
                    }
                    else {
                        url = App.Helper.WxBaseConfig.CourseRedirectBaseInfoUrl + "?redirect_url=" + App.Url.CourseUrl.ClientUrl + "app/index.html&state={\"appid\":\"app001\",\"hash\":\"empty\",\"courseId\":\"" + model.CourseId + "\",\"path\":\"viewcourse\"}";
                    }

                    context.Response.Redirect(url);
                    
                }
                catch (Exception ex)
                {
                    Helper.Log.WriteNode("支付失败：OpenId=" + openId);
                }
            }
            else
            {
                //错误的订单处理
            }
        }
        /// <summary>
        /// 是不是学习卡
        /// </summary>
        /// <returns></returns>
        private bool IsCard(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            var model= bll.GetModel(courseId);
            if (model != null) { 
                var theme=model.Theme??0;
                if (theme != 1 && theme != 2 && theme != 3)
                {
                    return true;
                }
                return false;
            }
            return false;
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