using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

namespace SfSoft.web.game.doublenovemberII
{
    public  class Adminstrator
    {
        private static List<Dictionary<string,string>> _adminList=new List<Dictionary<string,string>>();
         static Adminstrator()
        {
            XmlDocument xml = new XmlDocument();
            xml.Load(System.Web.HttpContext.Current.Server.MapPath("sysdata/admin.xml"));
            XmlNode xns = xml.SelectSingleNode("admins");
            Dictionary<string, string> dic = null;
            foreach (XmlNode xn in xns)
            {
                XmlElement xe = (XmlElement)xn;
                string value=xe.GetAttribute("value");
                dic = new Dictionary<string, string>();
                dic.Add(value, value);
                _adminList.Add(dic);
            }
        }
        public static bool IsRight(string openid)
        {
            if (_adminList.Count > 0)
            {
                foreach (Dictionary<string, string> dic in _adminList)
                {
                    if(dic.ContainsKey(openid)){
                        return true;
                    }
                }
            }
            return false;
        }
    }
}