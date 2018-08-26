using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.AppStart.Enums;

namespace SfSoft.web.AppStart.Model
{
    public class ResolverData
    {
        public EnumOAuthState Code { get; set; }
        public string Msg { get; set; }
        public WXParamsII Info { get; set; }
    }
}