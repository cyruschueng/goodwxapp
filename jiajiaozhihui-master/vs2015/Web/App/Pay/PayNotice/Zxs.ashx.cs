using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.App.Pay.PayNotice
{
    /// <summary>
    /// Zxs 的摘要说明
    /// </summary>
    public class Zxs : IHttpHandler
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
            string appId = payNotifyRepHandler.GetParameter("attach");

            //验证请求是否从微信发过来（安全）
            if (payNotifyRepHandler.IsTenpaySign())
            {
                try
                {
                    //正确的订单处理
                    SfSoft.BLL.WX_PublicOrder bll = new SfSoft.BLL.WX_PublicOrder();
                    SfSoft.Model.WX_PublicOrder model = bll.GetModelByTradeno(out_trade_no);
                    model.IsPay = 1;
                    bll.Update(model);

                    Regist(appId, openId);
                    //更新加入人数
                    UpdateJoinNumber(appId, 1);
                }
                catch (Exception ex)
                {
                    Helper.Log.WriteNode("支付失败：AppId=" + appId + "   OpenId=" + openId);
                }
            }
            else
            {
                //错误的订单处理
            }
        }
        private void Regist(string appId, string oppenId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = new SfSoft.Model.WX_ZXS_Players();
            model.AppId = appId;
            model.OpenId = oppenId;
            model.PlayerType = 1;
            model.RegionDate = DateTime.Now;
            model.State = 0;
            bll.Add(model);
        }
        private void UpdateJoinNumber(string appId, int? playType)
        {
            SfSoft.BLL.WX_ZXS_Info bll = new SfSoft.BLL.WX_ZXS_Info();
            SfSoft.Model.WX_ZXS_Info model = bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
            if (playType == 1)
            {
                model.PothuntNumber = (model.PothuntNumber ?? 0) + 1;
            }
            else if (playType == 2)
            {
                model.JoinNumber = (model.JoinNumber ?? 0) + 1;
            }
            bll.Update(model);
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