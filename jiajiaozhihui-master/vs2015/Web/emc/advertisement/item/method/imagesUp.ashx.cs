using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zyUpload.method
{
    /// <summary>
    /// imagesUp 的摘要说明
    /// </summary>
    public class imagesUp : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            //上传配置
            int size = 2;           //文件大小限制,单位MB                             //文件大小限制，单位MB
            string[] filetype = { ".gif", ".png", ".jpg", ".jpeg", ".bmp",".mp3" };         //文件允许格式


            //上传图片
            Hashtable info = new Hashtable();
            Uploader up = new Uploader();
            string path = Constant.IMAGES_UP_PATH + "advertisement/images";

            info = up.upFile(context, path + '/', filetype, size);                   //获取上传状态
            HttpContext.Current.Response.Write(info["url"]);  //向浏览器返回数据json数据
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