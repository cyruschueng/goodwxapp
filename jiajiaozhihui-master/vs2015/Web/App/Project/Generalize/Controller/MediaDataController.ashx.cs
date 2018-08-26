using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// MediaDataController 的摘要说明
    /// </summary>
    public class MediaDataController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            UploadIng(context);
        }

        private  void UploadIng(HttpContext context)
        {
            try
            {
                var imageMediaId = context.Request["imageMediaId"];
                var openId = context.Request["openid"];

                //SfSoft.Common.LogHelper.WriteLog("文件上传："+imageMediaId);

                if (!string.IsNullOrEmpty(imageMediaId) && !string.IsNullOrEmpty(openId))
                {
                    Helper.MediaDataProvide provide = new Helper.MediaDataProvide(openId);
                    string path= provide.UploadImg(imageMediaId);
                    if (path != "") {
                        path = path.Replace(System.AppDomain.CurrentDomain.BaseDirectory, "");
                        path="/"+path.Replace("\\","/");

                        var date = context.Request["validdate"];
                        var groupType = context.Request["grouptype"];
                        var title = context.Request["title"];
                        var catalogue = context.Request["catalogue"];
                        var classname = context.Request["classname"];
                        //添加新群
                        provide.AddGroupInfo(DateTime.Parse(date),int.Parse( groupType),path,title, catalogue, classname);
                    }
                    context.Response.Write("ok");
                }
            }
            catch (Exception ex) {
                SfSoft.Common.LogHelper.ErrorLog("文件上传",ex);
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