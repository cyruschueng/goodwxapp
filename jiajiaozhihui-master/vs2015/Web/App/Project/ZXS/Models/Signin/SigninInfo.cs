using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Signin
{
    public class SigninInfo
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int ThemeId { get; set; }
        public int Week { get; set; }
        public int TaskId { get; set; }
    }
}