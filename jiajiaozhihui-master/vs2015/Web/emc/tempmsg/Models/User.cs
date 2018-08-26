using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.tempmsg.Models
{
    public class User
    {
        public int total { get; set; }
        public int count { get; set; }
        public string next_openid { get; set; }
        public List<string> openids { get; set; }
    }
}