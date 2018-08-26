using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;

namespace ShenerWeiXin.WxApi.WxPay
{
    public class ResultNotify : Notify
    {
        /// <summary>
        /// 支付结果
        /// </summary>

        public EventHandler<NotifyEventArgs> NotifyEvent;
        public ResultNotify(Page page)
            : base(page)
        {

        }
        public override void ProcessNotify()
        {
            PayData notifyData = GetNotifyData();
            //检查支付结果中transaction_id是否存在
            if (!notifyData.IsSet("transaction_id"))
            {
                //若transaction_id不存在，则立即返回结果给微信支付后台
                PayData res = new PayData();
                res.SetValue("return_code", "FAIL");
                res.SetValue("return_msg", "支付结果中微信订单号不存在");
                page.Response.Write(res.ToXml());
                page.Response.End();
            }

            string transaction_id = notifyData.GetValue("transaction_id").ToString();

            //查询订单，判断订单真实性
            if (!QueryOrder(transaction_id))
            {
                //若订单查询失败，则立即返回结果给微信支付后台
                PayData res = new PayData();
                res.SetValue("return_code", "FAIL");
                res.SetValue("return_msg", "订单查询失败");
                page.Response.Write(res.ToXml());
                page.Response.End();
            }
            //查询订单成功
            else
            {
                PayData res = new PayData();
                res.SetValue("return_code", "SUCCESS");
                res.SetValue("return_msg", "OK");
                
                EventHandler<NotifyEventArgs> handler = NotifyEvent;
                if (handler != null)
                {
                    handler(this,new NotifyEventArgs(notifyData));
                }
                page.Response.Write(res.ToXml());
                page.Response.End();
            }
        }
        /// <summary>
        /// 查询订单
        /// </summary>
        /// <param name="transaction_id"></param>
        /// <returns></returns>
        private bool QueryOrder(string transaction_id)
        {
            PayData req = new PayData();
            req.SetValue("transaction_id", transaction_id);
            PayData res = PayApi.OrderQuery(req);
            if (res.GetValue("return_code").ToString() == "SUCCESS" &&
                res.GetValue("result_code").ToString() == "SUCCESS")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
