using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxJs
{
    public class WxJsException:Exception
    {
        public WxJsException(string msg)
            : base(msg)
        { 
            
        }
    }
}
