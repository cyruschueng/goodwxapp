using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxOAuth
{
    public class WxOAuthException:Exception
    {
        public WxOAuthException(string msg) 
            : base(msg)
        { 
            
        }
    }
}
