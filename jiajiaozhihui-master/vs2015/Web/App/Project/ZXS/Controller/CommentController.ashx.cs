using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// CommentController 的摘要说明
    /// </summary>
    public class CommentController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    AddCommont(context);
                    break;
            }
        }
        public void AddCommont(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());

            SfSoft.Model.WX_ZXS_Comment model = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_ZXS_Comment>(strJson);
            Helper.CommentProvide.Add(model);
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