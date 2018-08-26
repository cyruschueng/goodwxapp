using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace SfSoft.web.weixinconfig
{
    public class WxConfigHelper 
    {

        public WxConfigHelper(Page page)
        {
            this.Page = page;
        }
        private Page Page { get; set; }
        public void Init()
        {
            WxJsSdkData sdk = new WxJsSdkData();
            sdk.Uri =Page.Request.Url.AbsoluteUri;
            Page.Session["WXJSDKDATA"] = sdk;
        }
    }
}