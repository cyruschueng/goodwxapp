using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Habit.Helper
{
    public class Url
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="endWithBridge">后面是否带斜杠</param>
        /// <returns></returns>
        public static string Host(bool endWithBridge = true)
        {
            var website = App.Helper.WxBaseConfig.WebSite;
            if (endWithBridge == true)
            {
                if (website.EndsWith("/"))
                {
                    return website;
                }
                else
                {
                    return website + "/";
                }
            }
            else
            {
                if (website.EndsWith("/"))
                {
                    return website.Substring(0, website.Length - 1);
                }
                else
                {
                    return website;
                }
            }
        }
    }
}