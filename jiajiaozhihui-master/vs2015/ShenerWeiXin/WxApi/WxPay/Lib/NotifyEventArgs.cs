using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxPay
{
    public class NotifyEventArgs:EventArgs
    {
        public PayData Data { get; private set; }
        public NotifyEventArgs(PayData data)
        {
            Data = data;
        }
    }
}
