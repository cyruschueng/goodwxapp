using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// MediaController 的摘要说明
    /// </summary>
    public class MediaController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "image":
                    AddImage(context);
                    break;
                case "voice":
                    AddVoice(context);
                    break;
                case "get":
                    Get();
                    break;
            }
        }
        private void AddImage(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Media.MediaInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Media.MediaInfo>(strJson);
            Helper.MediaProvide provide = new Helper.MediaProvide(model);
            provide.AddImageMedia();
        }
        private void AddVoice(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            App.Helper.Log.WriteNode("voice");
            App.Helper.Log.WriteNode(strJson);
            Models.Media.MediaInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Media.MediaInfo>(strJson);
            Helper.MediaProvide provide = new Helper.MediaProvide(model);
            provide.AddVoiceMedia();
        }
        private void Get()
        { 
            //{"appId":"app001","qaFileId":"4","mediaId":"pJnuyjlEqBNJ-UADoPg_fELmLlWWlhIpnzsjcELehfmGbiQWl1srwneNxSQ1RVef"}
            Models.Media.MediaInfo info = new Models.Media.MediaInfo();
            info.AppId = "app001";
            info.QAFileId = 4;
            info.MediaId = "pJnuyjlEqBNJ-UADoPg_fELmLlWWlhIpnzsjcELehfmGbiQWl1srwneNxSQ1RVef";
            Helper.MediaProvide provide = new Helper.MediaProvide(info);
            provide.AddImageMedia();
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