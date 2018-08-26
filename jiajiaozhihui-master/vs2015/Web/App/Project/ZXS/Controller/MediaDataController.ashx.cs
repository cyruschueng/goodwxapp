using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// MediaDataController 的摘要说明
    /// </summary>
    public class MediaDataController : IHttpHandler
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
                Models.Media.PlayerTask task = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Media.PlayerTask>(strJson);
                App.Helper.Log.WriteNode("img:"+task.ImageMediaId + "&voice=" + task.VoiceMediaId);
                Helper.MediaDataProvide provide = new Helper.MediaDataProvide(task, task.UrlType);
                var t = new Task(provide.AddPlayTask);
                t.Start();
            }
            catch (Exception ex)
            {

            }
        }
        public void Get()
        {
            Models.Media.PlayerTask task = new Models.Media.PlayerTask();
            task.AppId = "app001";
            task.Comment = "ddddddddddddddddd";
            task.ImageMediaId = "FkjgSOHv3CLq25Exy6kSosZ0Iy8CgecBuKoUZOIDzRLY0sFi6_8h6E20aC0X8DpI";
            task.OpenId = "oqmjZjh55_7kJKBAZOjwhPUiGEjc";
            task.TaskId = 102;
            task.ThemeId = 1;
            task.UrlType = 1;
            task.VoiceMediaId = "";
            task.Week = 1;

            Helper.MediaDataProvide provide = new Helper.MediaDataProvide(task, task.UrlType);

            var t = new Task(provide.AddPlayTask);
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