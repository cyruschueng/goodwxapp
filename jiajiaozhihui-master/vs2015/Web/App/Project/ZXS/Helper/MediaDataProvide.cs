using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Net;
using System.Configuration;

namespace SfSoft.web.ZXS.Helper
{
    public class MediaDataProvide
    {
        private Models.Media.PlayerTask _task;
        private int _taskId;
        private string _imagePath;
        private string _voicePath;
        private string _ffmpegPath;

        private static string ImageDomainName = ConfigurationManager.AppSettings["ImageDomainName"];
        private static string VoiceDomainName = ConfigurationManager.AppSettings["VoiceDomainName"];
        private static string VoiceDomainNameMp3 = ConfigurationManager.AppSettings["VoiceDomainNameMp3"];

        private delegate string  ZXSMediaAddEventHandle(Models.Media.PlayerTask task,int taskId);

        public MediaDataProvide(Models.Media.PlayerTask task,int taskType)
        {
            this._task = task;
            this._imagePath = StorePath(1);
            this._voicePath = StorePath(2);
            this._ffmpegPath = System.Web.HttpContext.Current.Server.MapPath("~/ffmpeg/bin");
        }
        public int TaskId
        {
            get { return _taskId; }
            set { _taskId = value; }
        }
        public void  AddPlayTask()
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            SfSoft.Model.WX_ZXS_PlayerTask model = new SfSoft.Model.WX_ZXS_PlayerTask();
            model.AppId = _task.AppId;
            model.CreateDate = DateTime.Now;
            model.OpenId = _task.OpenId;
            model.Status = 1;
            model.TaskId = _task.TaskId;
            model.ThemeId = _task.ThemeId;
            model.Week = _task.Week;
            model.Comment = _task.Comment;
            _taskId = bll.Add(model);

            ZXSMediaAddEventHandle zxsMediaAddEventHandle=new ZXSMediaAddEventHandle(AddMediaData);
            zxsMediaAddEventHandle.BeginInvoke(_task, _taskId, new AsyncCallback(CallBackZxsMediaAdd), zxsMediaAddEventHandle);
        }
        private void CallBackZxsMediaAdd(IAsyncResult ar)
        {
            ZXSMediaAddEventHandle dlgt= (ZXSMediaAddEventHandle)ar.AsyncState;
            string res= dlgt.EndInvoke(ar);

            var obj= Newtonsoft.Json.Linq.JObject.Parse(res);
            string ImageId = obj["ImageId"].ToString();
            string VoiceId = obj["VoiceId"].ToString();
            if(!string.IsNullOrEmpty(ImageId) && ImageId!=""){
                DownImageAsync(int.Parse(ImageId));
            }
            if(!string.IsNullOrEmpty(VoiceId) && VoiceId!="0" ){
                DownVoiceAsync(int.Parse(VoiceId));
            }
        }

        private  string   AddMediaData(Models.Media.PlayerTask task,int taskId)
        {
            Models.Media.MediaResult result=new Models.Media.MediaResult();
            SfSoft.BLL.WX_ZXS_MediaData bll = new SfSoft.BLL.WX_ZXS_MediaData();
            SfSoft.Model.WX_ZXS_MediaData model = new SfSoft.Model.WX_ZXS_MediaData();

            if (task.UrlType == 1) {
                model.AppId = task.AppId;
                model.MediaId = task.ImageMediaId;
                model.PlayerTaskId = taskId;
                model.UrlType = task.UrlType;
                result.ImageId = bll.Add(model);
            }
            else if (task.UrlType == 2) {
                model.AppId = task.AppId;
                model.MediaId = task.ImageMediaId;
                model.PlayerTaskId = taskId;
                model.UrlType = 1;
                result.ImageId= bll.Add(model);

                model.AppId = task.AppId;
                model.MediaId = task.VoiceMediaId;
                model.PlayerTaskId = taskId;
                model.UrlType = 2;
                result.VoiceId= bll.Add(model);
                
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(result);
        }
        private void UpdateMediaData(int taskId,string pathName,int taskType)
        {
            SfSoft.BLL.WX_ZXS_MediaData bll = new SfSoft.BLL.WX_ZXS_MediaData();
            SfSoft.Model.WX_ZXS_MediaData model = bll.GetModel(taskId);
            if (taskType == 1) {
                model.TemporaryUrl = ImageDomainName + pathName;
            }
            else if (taskType == 2) {
                model.TemporaryUrl = VoiceDomainNameMp3 + pathName;
            }
            bll.Update(model);
        }
        public void DownImageAsync(int imageMediaId)
        {
            string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID , App.Helper.WxBaseConfig.AppSecret);
            var url = string.Format("http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}", accessToken, _task.ImageMediaId);
            WebClient wc = new WebClient();
            string fileName = "";
            wc.DownloadDataCompleted += (s, e) =>
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    var data = (byte[])e.Result;
                    ms.Write(data, 0, data.Length);
                    string imageName = wc.ResponseHeaders.Get("Content-disposition").Split(';')[1].Split('=')[1].Replace("\"", "");
                    string extName = imageName.Substring(imageName.LastIndexOf("."));
                    if (ms.Length > 0)
                    {
                        //保存到文件
                        var newImageName = DateTime.Now.Ticks + extName;
                        fileName = string.Format(_imagePath + newImageName);
                        using (FileStream fs = new FileStream(fileName, FileMode.Create))
                        {
                            ms.Position = 0;
                            byte[] buffer = new byte[1024];
                            int bytesRead = 0;
                            while ((bytesRead = ms.Read(buffer, 0, buffer.Length)) != 0)
                            {
                                fs.Write(buffer, 0, bytesRead);
                            }
                            fs.Flush();
                        }
                        UpdateMediaData(imageMediaId, newImageName, 1);
                    }
                }
            };
            wc.DownloadDataAsync(new Uri(url));
        }
        public void  DownVoiceAsync(int voiceMediaId)
        {
            string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            var url = string.Format("http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}", accessToken, _task.VoiceMediaId);
            string fileName = "";
            WebClient wc = new WebClient();
            wc.DownloadDataCompleted += (s, e) =>
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    var data = e.Result;
                    ms.Write(data, 0, data.Length);

                    string voiceName = wc.ResponseHeaders.Get("Content-disposition").Split(';')[1].Split('=')[1].Replace("\"", "");
                    string extName = voiceName.Substring(voiceName.LastIndexOf("."));
                    if (ms.Length > 0)
                    {
                        //保存到文件
                        var name = DateTime.Now.Ticks;
                        var newVoiceName = name + extName;
                        fileName = string.Format(_voicePath + newVoiceName);
                        using (FileStream fs = new FileStream(fileName, FileMode.Create))
                        {
                            ms.Position = 0;
                            byte[] buffer = new byte[1024];
                            int bytesRead = 0;
                            while ((bytesRead = ms.Read(buffer, 0, buffer.Length)) != 0)
                            {
                                fs.Write(buffer, 0, bytesRead);
                            }
                            fs.Flush();
                        }
                        var mp3File = name + ".mp3";
                        ConvertToAmr(_ffmpegPath, fileName, _voicePath + "mp3\\" + name + ".mp3");
                        UpdateMediaData(voiceMediaId, mp3File, 2);
                    }
                }
            };
            wc.DownloadDataAsync(new Uri(url));
        }
        public string StorePath(int taskType)
        {
            var path = "";
            switch (taskType)
            {
                case 1:
                    path = System.Web.HttpContext.Current.Server.MapPath("~/Files/zxs/images/");
                    break;
                case 2:
                    path = System.Web.HttpContext.Current.Server.MapPath("~/Files/zxs/voices/");
                    break;
                default:
                    path = "";
                    break;
            }
            return path;
        }
        /// <summary>
        /// 将amr音频转成mp3手机音频
        /// </summary>
        /// <param name="applicationPath">ffmeg.exe文件路径</param>
        /// <param name="fileName">amr文件的路径(带文件名)</param>
        /// <param name="targetFilName">生成目前mp3文件路径（带文件名）</param>
        public  void ConvertToAmr(string applicationPath, string fileName, string targetFilName)
        {
            //Helper.Log.WriteNode("applicationPath=" + applicationPath + "&fileName=" + fileName + "&targetFilName=" + targetFilName);

            //ffmpeg -i 1.mp3 -ac 1 -ar 8000 1.amr 
            //ffmpeg -i 1.mp3 -ac 1 -ar 8000 1.amr            
            string c = applicationPath + @"\ffmpeg -i " + fileName + " " + targetFilName;
            c = c.Replace("//", "\\").Replace("/", "\\");
            //string c = applicationPath + @"\ffmpeg.exe -y -i " + fileName + " -ar 8000 -ab 12.2k -ac 1 " + targetFilName;
            Cmd(c);
        }
        private  void Cmd(string c)
        {
            try
            {
                System.Diagnostics.Process process = new System.Diagnostics.Process();
                process.StartInfo.FileName = "cmd.exe";
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardInput = true;
                process.Start();

                process.StandardInput.WriteLine(c);
                process.StandardInput.AutoFlush = true;
                process.StandardInput.WriteLine("exit");

                StreamReader reader = process.StandardOutput;//截取输出流           

                process.WaitForExit();
            }
            catch
            { }
        }
    }
}