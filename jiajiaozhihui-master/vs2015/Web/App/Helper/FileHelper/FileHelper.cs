using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace SfSoft.web.App.Helper
{
    public class FileHelper
    {
        public static Newtonsoft.Json.Linq.JObject getJson(string path)
        {
            //string path = System.Web.HttpContext.Current.Server.MapPath("~/App/Project/QA/SysData/admin.json");
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                return Newtonsoft.Json.Linq.JObject.Parse(json);
            }
        }
    }
}