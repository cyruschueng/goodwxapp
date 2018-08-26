using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using WxPayAPI;

namespace PayNotice
{
    public class QA
    {
        private string _productId;
        private string _tradeNo;
        public QA(string productId,string tradeNo)
        {
            this._productId = productId;
            this._tradeNo = tradeNo;
        }
        /// <summary>
        /// 支付成功后填加帐单
        /// </summary>
        public void AddBill(string openId, string machId,string orderId,decimal amount, BillTypeEnum billType, PayTypeEnum payType,string remark="")
        {
            var model = new SfSoft.Model.WX_Bill()
            {
                Amount = amount,
                BillType = (int)billType,
                CreateDate = DateTime.Now,
                MchId = machId,
                OrderId = orderId,
                PaymentTime = DateTime.Now,
                PayType = (int)payType,
                TradeNo = this._tradeNo,
                Remark = remark,
                OpenId=openId
            };
            SfSoft.BLL.WX_Bill bll = new SfSoft.BLL.WX_Bill();
            bll.Add(model);
        }
        /// <summary>
        /// 帐单是不是存在
        /// </summary>
        /// <returns></returns>
        public bool Exists()
        {
            SfSoft.BLL.WX_Bill bll = new SfSoft.BLL.WX_Bill();
            var list= bll.GetModelList("TradeNo='" + this._tradeNo + "'");
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 是不是专家
        /// </summary>
        /// <returns></returns>
        public bool IsExpert(string openId)
        {
            SfSoft.BLL.WX_JJZH_Expert expertBll = new SfSoft.BLL.WX_JJZH_Expert();
            var list = expertBll.GetModelList("OpenId='" + openId + "'");
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 折扣
        /// </summary>
        /// <param name="isExpert"></param>
        /// <returns></returns>
        public decimal ReadDiscount(bool isExpert=true)
        {
            string src = HttpContext.Current.Server.MapPath("~/App/pay/paynotice/config/qa.json");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();

                Newtonsoft.Json.Linq.JObject obj = Newtonsoft.Json.Linq.JObject.Parse(json);
                if (isExpert == true)
                {
                    var value= obj["expert"]["discount"].ToString();
                    decimal disount = 0m;
                    var result= decimal.TryParse(value, out disount);
                    return result == true ? disount : 1m;
                    
                }
                else {
                    var value = obj["general"]["discount"].ToString();
                    decimal disount = 0m;
                    var result = decimal.TryParse(value, out disount);
                    return result == true ? disount : 1m;
                }
            }
        }
        /// <summary>
        /// 企业转帐
        /// </summary>
        public Senparc.Weixin.MP.TenPayLibV3.TransfersResult Transfer(string ipAddress,decimal price,string descInfo,string openId)
        {

            try
            {
                var mch_appid = SfSoft.web.App.Helper.WxPayConfig.APPID;
                var mchid = SfSoft.web.App.Helper.WxPayConfig.MCHID;
                var device_info = "";
                var nonce_str = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr();
                var partner_trade_no = WxPayAPI.WxPayApi.GenerateOutTradeNo();
                var openid = openId;
                var key = "ygelwgjty32whpbtwfykwcqytflwgjty";
                var check_name = "NO_CHECK";
                var re_user_name = "";
                var amount = price;
                var desc = descInfo;
                var spbill_create_ip = ipAddress;
                var path = "c:\\cert\\apiclient_cert.p12";
                var pass = "1229673702";

                var data = new Senparc.Weixin.MP.TenPayLibV3.TenPayV3TransfersRequestData(mch_appid, mchid, null, nonce_str, partner_trade_no, openid, key, check_name, re_user_name, amount, desc, spbill_create_ip);
                var msg= Senparc.Weixin.MP.TenPayLibV3.TenPayV3.TransfersAsync(data, path, pass).Result;
                //var msg = Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Transfers(data);
                return msg;
            }
            catch (Exception ex) {
                SfSoft.Common.LogHelper.ErrorLog("企业转帐出错", ex);
                return null;
            }
        }
    }
}