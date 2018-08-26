using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.PayOrder.Helper
{
    public class PayProvide
    {
        public Models.Order.UnifiedorderData GetUnifiedorderData(int orderId)
        {
            var order = new Helper.OrderProvide().GetPayOrder(orderId);

            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            var good = bll.GetModel(order.GoodId??0);
            
            return new Models.Order.UnifiedorderData()
            {
                AppId = App.Helper.WxPayConfig.APPID,
                Attach = (order.OrderType??0).ToString(),
                Body = good.GoodName,
                MchId = App.Helper.WxPayConfig.MCHID,
                NonceStr = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr(),
                TimeStamp = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetTimestamp(),
                TotalFee =Convert.ToInt32((good.PublicPrice??0)*100),
                TradeType = "JSAPI",
                OutTradeNo = order.Tradeno,
                NotifyUrl =new App.Helper.WxPayConfig().NOTIFY_URL
            };
        }
        
    }
}