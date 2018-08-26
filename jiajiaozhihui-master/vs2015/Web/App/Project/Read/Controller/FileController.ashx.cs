using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;

namespace SfSoft.web.Read.Controller
{
    /// <summary>
    /// FileController 的摘要说明
    /// </summary>
    public class FileController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "upload":
                    Post(context);
                    break;
                case "get":
                    Get();
                    break;
            }
        }
        public void Post(HttpContext context)
        {
            try
            {
                StreamReader reader = new StreamReader(context.Request.InputStream);
                String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
                Models.File.FileMedia fileMedia = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.File.FileMedia>(strJson);
                string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                Helper.FileProvide provide = new Helper.FileProvide(fileMedia);
                var t = new Task<int>(provide.AddFileMedia);
                t.Start();
                context.Response.Write(t.Result);
            }
            catch (Exception ex)
            {
                context.Response.Write(0);
            }
        }
        public void Get()
        {
            Models.File.FileMedia task = new Models.File.FileMedia();
            task.AppId = "app001";
            task.Comment = "ddddddddddddddddd";
            task.ImageMediaId = "cltVG7SFXBqyLYyZuZrF3rnMOrw7Qduv8ILcHbKsnhLt";
            //task.VoiceMediaId = "1237378768e7q8e7r8qwesafdasdfasdfaxss111";
            task.OpenId = "oqmjZjh55_7kJKBAZOjwhPUiGEjc";
            task.VoiceMediaId = "";

            Helper.FileProvide provide = new Helper.FileProvide(task);

            var t = new Task<int>(provide.AddFileMedia);
            t.Start();
            t.Wait();
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