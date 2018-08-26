using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class SystemConst
    {
        public static bool EnableAdminAuth = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableAdminAuth"].ToString());
    }
}