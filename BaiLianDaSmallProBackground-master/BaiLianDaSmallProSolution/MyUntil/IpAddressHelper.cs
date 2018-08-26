using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MyUntil
{
    public class IpAddressHelper
    {
        public static string GetIp()
        {
            var result = "";
            try
            {
                var forwardedHttpHeader = "X-FORWARDED-FOR";
                string xff = HttpContext.Current.Request.Headers.AllKeys
                    .Where(x => forwardedHttpHeader.Equals(x, StringComparison.InvariantCultureIgnoreCase))
                    .Select(k => HttpContext.Current.Request.Headers[k])
                    .FirstOrDefault();

                if (!String.IsNullOrEmpty(xff))
                {
                    string lastIp = xff.Split(new char[] { ',' }).FirstOrDefault();
                    result = lastIp;
                }

                if (String.IsNullOrEmpty(result) && HttpContext.Current.Request.UserHostAddress != null)
                {
                    result = HttpContext.Current.Request.UserHostAddress;
                }

                //some validation
                if (result == "::1")
                    result = "127.0.0.1";
                //remove port
                if (!String.IsNullOrEmpty(result))
                {
                    int index = result.IndexOf(":", StringComparison.InvariantCultureIgnoreCase);
                    if (index > 0)
                        result = result.Substring(0, index);
                }
            }
            catch
            {
            }

            return result;
        }
    }
}
