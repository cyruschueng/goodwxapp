using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Controller
{
    /// <summary>
    /// WxShareController 的摘要说明
    /// </summary>
    public class WxShareController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            AddShare(context);
        }
        private void AddShare(HttpContext context)
        {
            var openid = context.Request["openid"];
            var bookid = context.Request["bookid"];
            Helper.WxShareProvide provide = new Helper.WxShareProvide();
            provide.AddShare(openid, int.Parse(bookid));
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}