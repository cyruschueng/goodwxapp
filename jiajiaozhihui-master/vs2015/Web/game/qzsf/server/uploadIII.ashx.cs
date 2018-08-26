using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing;
using SfSoft.Common.QCloud;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data;
using ShenerWeiXin;
using SfSoft.Common;

namespace SfSoft.web.game.qzsf.server
{
    public delegate string  ImageMediaDownEventHandler(string mediaId,int fileId);
    public delegate string AudioMediaDownEventHandler(string mediaId, int fileId);
    public delegate void AddMediaCompleteEventHandler(string openId);
    /// <summary>
    /// uploadIII 的摘要说明
    /// </summary>
    public class uploadIII : IHttpHandler
    {
        string FolderName = "";
        string ResultMsg = "{}";
        string _ImagePath = "";
        string _AudioPath = "";
        string _Mp3ServicePath = "";
        string _accessToken = "";
        
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            _ImagePath = HttpContext.Current.Server.MapPath(@"~/game/doublenovember/resource/Images/");
            _AudioPath = HttpContext.Current.Server.MapPath(@"~/game/doublenovember/resource/Audios/");
            _Mp3ServicePath = System.Web.HttpContext.Current.Server.MapPath("~/ffmpeg/bin");
            //_accessToken = Senparc.Weixin.MP.CommonAPIs.AccessTokenContainer.TryGetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret);
            //_accessToken = WeiXinApi.WeiXinAccessTokenProvide.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret);
            _accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret);
            AddMedia(context);
            
            context.Response.Write(ResultMsg);
        }
        private string DownImageFromWx(string mediaId, int fileId)
        {
            using (MemoryStream ms = new MemoryStream()){
                Senparc.Weixin.MP.AdvancedAPIs.MediaApi.Get(_accessToken, mediaId, ms);

                
                string newName= System.Guid.NewGuid().ToString() + ".jpg";
                string localPath = _ImagePath + newName;
                using (FileStream fs = new FileStream(localPath, FileMode.Create)){
                    ms.Position = 0;
                    byte[] buffer = new byte[1024];
                    int bytesRead = 0;
                    while ((bytesRead = ms.Read(buffer, 0, buffer.Length)) != 0)
                    {
                        fs.Write(buffer, 0, bytesRead);
                    }
                    fs.Flush();
                }
                var result= new MediaInfo()
                {
                    fileId = fileId,
                    mediaPath = @"/game/doublenovember/resource/images/" + newName
                };
                return Newtonsoft.Json.JsonConvert.SerializeObject(result);
            }
        }
        private string DownAudioFromWx(string mediaId, int fileId)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                Senparc.Weixin.MP.AdvancedAPIs.MediaApi.Get(_accessToken, mediaId, ms);

                string name = System.Guid.NewGuid().ToString();
                string newAudioName = name + ".amr";
                string localPath = _AudioPath + newAudioName;
                using (FileStream fs = new FileStream(localPath, FileMode.Create))
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
                ConvertToAmr(_Mp3ServicePath, localPath, _AudioPath + "mp3\\" + name+".mp3");
                var result = new MediaInfo()
                {
                    fileId = fileId,
                    mediaPath = @"/game/doublenovember/resource/Audios/mp3/" + name+".mp3"
                };
                return Newtonsoft.Json.JsonConvert.SerializeObject(result);
            }
        }
        private void  AddMedia(HttpContext context)
        {
            int index = 0;
            string openId = context.Request["openId"];
            string owner= context.Request["owner"];
            string resume = context.Request["resume"];
            string imageMediaId = context.Request["imageMediaId"];
            string voiceMediaId = context.Request["voiceMediaId"];

            if (string.IsNullOrEmpty(openId)) {
                FileUploadResult("-1", "上传失败");
                return;
            } 
            try
            {
                SfSoft.BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
                SfSoft.Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
                model.Create_Date = DateTime.Now;
                model.IsAct = 1;
                model.IsTop = 0;
                model.Last_Date = DateTime.Now;
                model.OpenID = openId;
                model.Owner = owner;
                model.Resume = resume;
                model.ImgMediaId = imageMediaId;
                model.AudioMediaId = voiceMediaId;

                index = bll.Add(model);
                FileUploadResult("0", "上传成功");
            }
            catch (Exception ex) {
                FileUploadResult("-1", "上传失败");
                return;
            }
            
            
            AddMediaCompleteEventHandler completeEventHandler = new AddMediaCompleteEventHandler(AddMediaComplete);
            completeEventHandler.BeginInvoke(openId, null, null);

            //下载图片
            if (!string.IsNullOrEmpty(imageMediaId))
            {
                ImageMediaDownEventHandler imageHandler = new ImageMediaDownEventHandler(DownImageFromWx);
                IAsyncResult arImage = imageHandler.BeginInvoke(imageMediaId, index, new AsyncCallback(CallBackDownImageFromWx), imageHandler);
            }
            //下载音频
            if (!string.IsNullOrEmpty(voiceMediaId))
            {
                AudioMediaDownEventHandler audioHandler = new AudioMediaDownEventHandler(DownAudioFromWx);
                IAsyncResult arAudio = audioHandler.BeginInvoke(voiceMediaId, index, new AsyncCallback(CallBackDownAudioFromWx), audioHandler);
            }
        }
        private void CallBackDownImageFromWx(IAsyncResult ar)
        {
            ImageMediaDownEventHandler dlgt = (ImageMediaDownEventHandler)ar.AsyncState;
            string res= dlgt.EndInvoke(ar);
            var obj= Newtonsoft.Json.Linq.JObject.Parse(res);
            string fileId = obj["fileId"].ToString();
            string mediaPath = obj["mediaPath"].ToString();

            SfSoft.BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            SfSoft.Model.WX_Doublenovember_File model = bll.GetModel(int.Parse(fileId));
            if (model != null) {
                model.ImgUrl = mediaPath;
                bll.Update(model);
            }
        }
        private void CallBackDownAudioFromWx(IAsyncResult ar)
        {
            AudioMediaDownEventHandler dlgt = (AudioMediaDownEventHandler)ar.AsyncState;
            string res = dlgt.EndInvoke(ar);
            var obj = Newtonsoft.Json.Linq.JObject.Parse(res);
            string fileId = obj["fileId"].ToString();
            string mediaPath = obj["mediaPath"].ToString();

            SfSoft.BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            SfSoft.Model.WX_Doublenovember_File model = bll.GetModel(int.Parse(fileId));
            if (model != null)
            {
                model.AudioUrl = mediaPath;
                bll.Update(model);
            }
        }
        private void AddMediaComplete(string openId)
        {
            //设置第一次上传时间
            EditFirstWorksDate(openId);
            #region 上传作品成功后获取积分与金币
            AwardItem award = new AwardItem(openId);
            award.AwardByUploadPortfolios();
            #endregion
        }
        #region 删除
        /*
        /// <summary>
        /// 把base64图片保存到服务器
        /// </summary>
        /// <param name="context"></param>
        private void SaveFile(HttpContext context)
        {
            if (context.Request["imgdata"] != null)
            {
                try
                {
                    string imgdata = context.Request["imgdata"].ToString();
                    MemoryStream stream = new MemoryStream(Convert.FromBase64String(imgdata));
                    System.Drawing.Bitmap bitmap = new Bitmap(stream);
                    string localPath = HttpContext.Current.Server.MapPath("/game/doublenovember/resource/") + System.Guid.NewGuid().ToString() + ".jpeg";
                    bitmap.Save(localPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                    Common.QCloud.Api.Cloud cloud = new Common.QCloud.Api.Cloud(APP_ID, SECRET_ID, SECRET_KEY);
                    string result = cloud.Upload(BUCKET_NAME, localPath);

                    JObject entity = (JObject)JsonConvert.DeserializeObject(result);
                    if (entity["code"].ToString() == "0")
                    {
                        string fileid = entity["data"]["fileid"].ToString();
                        string url = entity["data"]["download_url"].ToString();
                        SaveWork(context, url, fileid);
                        FileUploadResult("0", "上传成功");
                    }
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode(ex.Message, "upload.txt");
                    FileUploadResult("-1", "上传失败");
                }
            }
        }

        /// <summary>
        /// 保存作品到数据库
        /// </summary>
        private void SaveWork(HttpContext context, string imgUrl, string fileId)
        {
            string openid = "";
            if (context.Request["folder"] != null)
            {
                openid = context.Request["folder"].ToString();
            }
            string resume = "";
            if (context.Request["resume"] != null)
            {
                resume = context.Request["resume"].ToString();
            }
            string owner = "";
            if (context.Request["owner"] != null)
            {
                owner = context.Request["owner"].ToString();
            }
            string bookName = "";
            if (context.Request["bookname"] != null)
            {
                bookName = context.Request["bookname"].ToString();
            }
            string bookNumber = "";
            if (context.Request["pagenumber"] != null)
            {
                bookNumber = context.Request["pagenumber"].ToString();
            }
            AddFile(openid, imgUrl, fileId, resume, owner, bookName, bookNumber);
        }
        private void AddFile(string openid, string imgUrl, string fileid, string resume, string owner, string bookName, string pageNumber)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
            try
            {
                model.Create_Date = DateTime.Now;
                model.ImgUrl = imgUrl;
                model.Last_Date = DateTime.Now;
                model.OpenID = openid;
                model.Resume = resume;
                model.Fileid = fileid;
                model.Owner = owner;
                model.BookName = bookName;
                if (pageNumber != "" && PageValidate.IsNum(pageNumber) == true)
                {
                    model.PageNumber = int.Parse(pageNumber);
                }
                bll.Add(model);
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode(ex.Message, "upload.txt");
                FileUploadResult("-1", "上传失败");
            }
            EditFirstWorksDate(model.OpenID);
            #region 上传作品成功后获取积分与金币
            AwardItem award = new AwardItem(model.OpenID);
            award.AwardByUploadPortfolios();
            #endregion

        }
         * */
        #endregion
        private void FileUploadResult(string code, string msg)
        {
            ResultMsg = "{\"code\":\"" + code + "\",\"msg\":\"" + msg + "\"}";
        }
        /// <summary>
        /// 记录第一次上传，记录下这一时间
        /// </summary>
        /// <param name="openid"></param>
        private void EditFirstWorksDate(string openid)
        {
            try
            {
                BLL.WX_Doublenovember_Children bllChildren = new BLL.WX_Doublenovember_Children();
                Model.WX_Doublenovember_Children modelChildren = bllChildren.GetModel(openid);
                if (modelChildren == null)
                {
                    modelChildren = new Model.WX_Doublenovember_Children();
                    modelChildren.OpenID = openid;
                    modelChildren.FirstWorksDateTime = DateTime.Now;
                    bllChildren.Add(modelChildren);
                }
                else
                {
                    if (modelChildren.FirstWorksDateTime == null)
                    {
                        DateTime? firstWorksDateTime = GetFirstWorksDateTime(openid);
                        if (firstWorksDateTime != null)
                        {
                            modelChildren.FirstWorksDateTime = firstWorksDateTime;
                            bllChildren.Update(modelChildren);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode(ex.Message, "upload.txt");
                FileUploadResult("-1", "上传失败");
            }
        }
        private DateTime? GetFirstWorksDateTime(string openid)
        {
            string sql = "select openid,min(Create_Date) as FirstWorksDateTime from dbo.WX_Doublenovember_File where openid='" + openid + "'  group by openid";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return DateTime.Parse(ds.Tables[0].Rows[0]["FirstWorksDateTime"].ToString());
            }
            return null;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        /// <summary>
        /// 将amr音频转成mp3手机音频
        /// </summary>
        /// <param name="applicationPath">ffmeg.exe文件路径</param>
        /// <param name="fileName">amr文件的路径(带文件名)</param>
        /// <param name="targetFilName">生成目前mp3文件路径（带文件名）</param>
        public void ConvertToAmr(string applicationPath, string fileName, string targetFilName)
        {
            ShenerWeiXin.WXHelper.WriteNode("applicationPath=" + applicationPath + "&fileName=" + fileName + "&targetFilName=" + targetFilName);
            //.WriteNode("applicationPath=" + applicationPath + "&fileName=" + fileName + "&targetFilName=" + targetFilName);
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
    public class MediaInfo
    {
        public int fileId { get; set; }
        public string mediaPath { get; set; }
    }
}