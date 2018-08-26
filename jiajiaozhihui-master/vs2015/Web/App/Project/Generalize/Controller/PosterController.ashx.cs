using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// PosterController 的摘要说明
    /// </summary>
    public class PosterController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method) {
                case "get":
                    GetPoster(context);
                    break;
                case "getbytpl":
                    GetPoster2(context);
                    break;
                default:
                    GetPoster(context);
                    break;
            }
            GetPoster(context);
        }
        private void GetPoster(HttpContext context)
        {
            try
            {
                var x = context.Request["x"];
                var y = context.Request["y"];
                var w = context.Request["w"];
                var h = context.Request["h"];
                var openId = context.Request["openid"];
                var groupType = context.Request["grouptype"];
                var size = context.Request["size"];
                int _size = 500;
                var bg = context.Request["bg"];
                var fontx = context.Request["fontx"];
                var fonty = context.Request["fonty"];
                var catalogue = context.Request["catalogue"];

                int.TryParse(size, out _size);

                if (!string.IsNullOrEmpty(x) && !string.IsNullOrEmpty(y) && !string.IsNullOrEmpty(w) && !string.IsNullOrEmpty(h) && !string.IsNullOrEmpty(openId))
                {
                    Helper.MediaDataProvide provide = new Helper.MediaDataProvide(int.Parse(x), int.Parse(y), int.Parse(w), int.Parse(h), openId,bg, int.Parse(fontx), int.Parse(fonty), catalogue, _size);
                    provide.CreatePoster(openId, groupType);
                    context.Response.Write("ok");
                }
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("文件上传", ex);
                context.Response.Write("error");
            }
        }

        private void GetPoster2(HttpContext context)
        {
            try
            {
                var tmpid = context.Request["tmpid"];
                var openId = context.Request["openid"];
                var groupType = context.Request["grouptype"];
                var size = context.Request["size"];
                int _size = 500;
                var catalogue = context.Request["catalogue"];

                int.TryParse(size, out _size);

                if (!string.IsNullOrEmpty(openId))
                {
                    Helper.MediaDataProvide provide = new Helper.MediaDataProvide(openId, catalogue, tmpid, _size);
                    provide.CreatePoster2(openId, groupType);
                    context.Response.Write("ok");
                }
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("文件上传", ex);
                context.Response.Write("error");
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