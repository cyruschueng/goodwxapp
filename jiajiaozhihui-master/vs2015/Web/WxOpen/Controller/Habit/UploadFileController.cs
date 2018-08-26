using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class UploadFileController : ApiController
    {
        [HttpPost]
        [Route("api/card/{id}/uploadfile")]
        public async Task<string> Post(int id)
        {
            
            if (!Request.Content.IsMimeMultipartContent("form-data")) {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            try
            {
                SfSoft.Common.LogHelper.WriteLog(id.ToString());
                
                // 设置上传目录
                var root= System.Web.HttpContext.Current.Server.MapPath("~/Files/habit"); 
                var provider = new MultipartFormDataStreamProvider(root);
                
                // 接收数据，并保存文件
                var bodyparts = await Request.Content.ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    string orfilename = file.Headers.ContentDisposition.FileName.TrimStart('"').TrimEnd('"');
                    FileInfo fileinfo = new FileInfo(file.LocalFileName);
                    if (fileinfo.Length <= 0)
                    {

                    }
                    else {
                        string fileExt = orfilename.Substring(orfilename.LastIndexOf('.'));
                        fileinfo.CopyTo(Path.Combine(root, fileinfo.Name + fileExt), true);
                        Provide.Habit.PunchCard punchCard = new Provide.Habit.PunchCard();
                        punchCard.UpdateImage(id, "/Files/habit/" + fileinfo.Name + fileExt);
                    }
                    fileinfo.Delete();//删除原文件
                }
                return "seccuess";
            }
            catch( Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("上传错误", ex);
                return "error";
            }
        }
    }
}