using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Pay.Model
{
    public class UserAddress
    {
        public WxAddress Address {get;set;}
        public string OpenId { get; set; }
    }
}