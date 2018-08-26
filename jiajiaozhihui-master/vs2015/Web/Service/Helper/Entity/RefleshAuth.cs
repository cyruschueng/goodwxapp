using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Entity
{
    public class RefleshAuth
    {
        public string WeiXinId { get; set; }
        public int ExpireshIn { get; set; }
        public DateTime GetTokenDate { get; set; }
        public string RefreshToken { get; set; }
    }
}