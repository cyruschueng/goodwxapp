using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;

namespace SfSoft.web.wxpay
{
    public class Helper
    {
        /// <summary>
        /// 如果不是在微信客户端运行，将阻止运行
        /// </summary>
        /// <param name="userAgent"></param>
        public static void WeiXinBrowse(HttpRequest context)
        {
            if (context.QueryString["debug"] == null)
            {
                if (!context.UserAgent.ToLower().Contains("micromessenger"))
                {
                    System.Web.HttpContext.Current.Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
                }
            }
        }
    }
}