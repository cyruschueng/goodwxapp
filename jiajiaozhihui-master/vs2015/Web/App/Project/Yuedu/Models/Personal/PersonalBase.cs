using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Models.Personal
{
    public class PersonalBase
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int? ChildAge { get; set; }
        public int UserType { get; set; }
    }
}