using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Helper
{
    public class SessionKeyException:Exception
    {
        public SessionKeyException(string message)
            : base(message) {
        }
    }
}