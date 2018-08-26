using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.JiajiaoCloud.Exception
{
    public class DataException: System.Exception
    {
        private string message;// 错误消息
        public DataException(string Message) : base()
        {
            message = Message;
        }
        public override string ToString() // 重写ToString方法,请看下面override说明
        {
            return message;
        }
    }
}