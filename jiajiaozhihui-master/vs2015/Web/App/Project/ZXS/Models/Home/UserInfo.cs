using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Home
{
    public class UserInfo
    {
        public string OpenId { get; set; }
        public string NickName { get; set; }
        public string HeadImgUrl { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
    }
}