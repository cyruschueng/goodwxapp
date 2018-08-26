using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// LikeController 的摘要说明
    /// </summary>
    public class LikeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    AddLike(context);
                    break;
            }
        }
        public void AddLike(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
           
            SfSoft.Model.WX_ZXS_Like model = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_ZXS_Like>(strJson);
            if (!Helper.LikeProvide.IsExist(model.AppId, model.OpenId, model.PlayerTaskId))
            {
                Helper.LikeProvide.Add(model);
            }
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