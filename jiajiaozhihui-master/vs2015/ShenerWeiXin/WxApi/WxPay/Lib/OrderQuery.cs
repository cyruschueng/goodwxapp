using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxPay
{
    public class OrderQuery
    {
        public static string Run(string transaction_id, string out_trade_no)
        {
            Log.WriteNode("OrderQuery is processing...", "orderquery.txt");

           PayData data = new PayData();
            if (!string.IsNullOrEmpty(transaction_id))//如果微信订单号存在，则以微信订单号为准
            {
                data.SetValue("transaction_id", transaction_id);
            }
            else//微信订单号不存在，才根据商户订单号去查单
            {
                data.SetValue("out_trade_no", out_trade_no);
            }
            PayData result = PayApi.OrderQuery(data);//提交订单查询请求给API，接收返回数据

            Log.WriteNode("OrderQuery process complete, result : " + result.ToXml(),"orderquery.txt");
            return result.ToPrintStr();
        }
    }
}
