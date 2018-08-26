using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.IO;
using System.Net;

namespace SfSoft.web.QA.Helper
{
    public class MediaProvide
    {
        private Models.Media.MediaInfo _fileMedia;
        private int _fileId;
        private string _imagePath;
        private string _voicePath;
        private string _ffmpegPath;

        private static string ImageDomainName = ConfigurationManager.AppSettings["QuestionAnsweringImageDomainName"];
        private static string VoiceDomainName = ConfigurationManager.AppSettings["QuestionAnsweringVoiceDomainName"];
        private static string VoiceDomainNameMp3 = ConfigurationManager.AppSettings["QuestionAnsweringVoiceDomainNameMp3"];

        private delegate int MediaAddEventHandle();

        public MediaProvide(Models.Media.MediaInfo info)
        {
            _fileMedia = info;
            this._imagePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/qa/images/"); ;
            this._voicePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/qa/voices/");
            this._ffmpegPath = System.Web.HttpContext.Current.Server.MapPath("~/ffmpeg/bin");
        }

        #region 图片处理
        public void AddImageMedia()
        {
            MediaAddEventHandle mediaAddEventHandle = new MediaAddEventHandle(() => {
                BLL.WX_QA_File_Data bll = new BLL.WX_QA_File_Data();
                Model.WX_QA_File_Data model = new Model.WX_QA_File_Data();
                model.AppId = _fileMedia.AppId;
                model.ReadFileId = _fileMedia.QAFileId;
                model.MediaId = _fileMedia.MediaId;
                model.UrlType = 1;
                return bll.Add(model);
            });
            mediaAddEventHandle.BeginInvoke(new AsyncCallback(CallBackDownImageAsync), mediaAddEventHandle);
        }
        private void CallBackDownImageAsync(IAsyncResult ar)
        {
            MediaAddEventHandle dlgt = (MediaAddEventHandle)ar.AsyncState;
            int res = dlgt.EndInvoke(ar);
            DownImageAsync(res);
        }
        private void UpdateImageData(int taskId, string pathName)
        {
            SfSoft.BLL.WX_QA_File_Data bll = new SfSoft.BLL.WX_QA_File_Data();
            SfSoft.Model.WX_QA_File_Data model = bll.GetModel(taskId);
            model.TemporaryUrl = ImageDomainName + pathName;
            bll.Update(model);
        }
        private void DownImageAsync(int imageMediaId)
        {
            string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            var url = string.Format("http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}", accessToken, _fileMedia.MediaId);
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
                        UpdateImageData(imageMediaId, newImageName);
                    }
                }
            };
            wc.DownloadDataAsync(new Uri(url));
        }
        #endregion

        #region 音频处理
        public void AddVoiceMedia()
        {
            MediaAddEventHandle mediaAddEventHandle = new MediaAddEventHandle(() => {
                BLL.WX_QA_File_Data bll = new BLL.WX_QA_File_Data();
                Model.WX_QA_File_Data model = new Model.WX_QA_File_Data();
                model.AppId = _fileMedia.AppId;
                model.ReadFileId = _fileMedia.QAFileId;
                model.MediaId = _fileMedia.MediaId;
                model.UrlType = 2;
                return bll.Add(model);
            });
            mediaAddEventHandle.BeginInvoke(new AsyncCallback(CallBackDownVoiceAsync), mediaAddEventHandle);
        }
        
        private void CallBackDownVoiceAsync(IAsyncResult ar)
        {
            MediaAddEventHandle dlgt = (MediaAddEventHandle)ar.AsyncState;
            int res = dlgt.EndInvoke(ar);
            DownVoiceAsync(res);
        }
        
        private void UpdateVoiceData(int taskId, string pathName)
        {
            SfSoft.BLL.WX_QA_File_Data bll = new SfSoft.BLL.WX_QA_File_Data();
            SfSoft.Model.WX_QA_File_Data model = bll.GetModel(taskId);
            model.TemporaryUrl = VoiceDomainNameMp3 + pathName;
            bll.Update(model);
        }
        
        private void DownVoiceAsync(int voiceMediaId)
        {
            string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            var url = string.Format("http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}", accessToken, _fileMedia.MediaId);
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
                        UpdateVoiceData(voiceMediaId, mp3File);
                    }
                }
            };
            wc.DownloadDataAsync(new Uri(url));
        }
        #endregion

        /// <summary>
        /// 将amr音频转成mp3手机音频
        /// </summary>
        /// <param name="applicationPath">ffmeg.exe文件路径</param>
        /// <param name="fileName">amr文件的路径(带文件名)</param>
        /// <param name="targetFilName">生成目前mp3文件路径（带文件名）</param>
        private void ConvertToAmr(string applicationPath, string fileName, string targetFilName)
        {
            //Helper.Log.WriteNode("applicationPath=" + applicationPath + "&fileName=" + fileName + "&targetFilName=" + targetFilName);

            //ffmpeg -i 1.mp3 -ac 1 -ar 8000 1.amr 
            //ffmpeg -i 1.mp3 -ac 1 -ar 8000 1.amr            
            string c = applicationPath + @"\ffmpeg -i " + fileName + " " + targetFilName;
            c = c.Replace("//", "\\").Replace("/", "\\");
            //string c = applicationPath + @"\ffmpeg.exe -y -i " + fileName + " -ar 8000 -ab 12.2k -ac 1 " + targetFilName;
            Cmd(c);
        }
        private void Cmd(string c)
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