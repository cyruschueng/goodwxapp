using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Read.Models.Personal
{
    public class Personal
    {
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public SfSoft.Model.WX_Read_User ReadUser { get; set; }
    }
}