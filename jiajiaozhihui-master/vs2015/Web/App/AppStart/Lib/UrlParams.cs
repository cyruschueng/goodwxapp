using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Collections.Specialized;

namespace SfSoft.web.AppStart.Lib
{
    public class UrlParams
    {
        private Dictionary<string, string> _query = new Dictionary<string, string>();
        public UrlParams(string query,char split)
        {
            var items = query.Split(split);
            foreach (var item in items) {
                var v = item.Split('=');
                _query.Add(v[0],v[1]);
            }
        }
        public string GetQuery(string key) {
            var hasKey = _query.ContainsKey(key);
            if (hasKey == true)
            {
                return _query[key];
            }
            else {
                return "";
            }
        }
    }
}