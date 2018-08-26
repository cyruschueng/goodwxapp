using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.Common;
using System.IO;
using ShenerWeiXin;
using System.ComponentModel;
using System.Net;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SfSoft.Common.DEncrypt;
using SfSoft.Common.QCloud.Api;

namespace SfSoft.web.game.doublenovember.server
{
    /// <summary>
    /// partin 的摘要说明
    /// </summary>
    public class partin : IHttpHandler
    {
        const int APP_ID = 10010590;
        const string SECRET_ID = "AKID9cADvko08CVsbnncZMa8IFh27J2U7elh";
        const string SECRET_KEY = "WkdGcUZzqNsoJRskEAccjsaaVcMcehQh";
        const string BUCKET_NAME = "doublenove";
        private string FolderName = ""; //这个是值是openid 并经过加密的，作为每个用户的文件夹
        private string FileName = "";
        private string LocalPath = "";
        private string MediUrl = "http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //这里直接用用户的open作为目录
            //处理安全考虑，对open进行加密码
            FolderName = context.Request["folder"].ToString();
            string result = "";
            try
            {
                result = AsyncDownFile(context);
            }
            catch (Exception ex) {
                WXHelper.WriteNode("game/doublenovember/server/partin.ashx(1FolderName:" + FolderName + ")"+ex.Message);
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 异步下载数据到服务器
        /// </summary>
        /// <param name="context"></param>
        private string AsyncDownFile(HttpContext context)
        {
            string result = "";
            try
            {

                string accessToken =Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(WXConfig.appId, WXConfig.appSecret);
                //string accessToken = Senparc.Weixin.MP.CommonAPIs.AccessTokenContainer.TryGetToken("wxbdfeec07c229b636", "299d0bc1512040847b4dee7ee197bc0c");
                string mediaId = context.Request["mediaId"].ToString();
                var url = string.Format(MediUrl, accessToken, mediaId);
                Uri uri = new Uri(url);

                WebClient wc = new WebClient();
                wc.DownloadFileCompleted += new System.ComponentModel.AsyncCompletedEventHandler(wc_DownloadFileCompleted);
                FileName = System.Guid.NewGuid().ToString() + ".jpg";
                LocalPath = HttpContext.Current.Server.MapPath("/game/doublenovember/resource/") + FileName;
                
                wc.DownloadFileAsync(uri, LocalPath);
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("game/doublenovember/server/partin.ashx.AsyncDownFile" + ex.Message);
                result = ex.Message;
            }
            return result;
        }
        
        /// <summary>
        /// 从微信下载数据后的回调函数
        /// 上传到腾讯云服务器
        /// 删除本服务器上传的数据
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void wc_DownloadFileCompleted(object sender, AsyncCompletedEventArgs e)
        {
            string result = "";
            Cloud cloud = new Cloud(APP_ID, SECRET_ID, SECRET_KEY);
            result = cloud.Upload(BUCKET_NAME, LocalPath);
            JObject entity = (JObject)JsonConvert.DeserializeObject(result);
            if (entity["code"].ToString() == "0") {
                string url = entity["data"]["download_url"].ToString();
                string fileid = entity["data"]["fileid"].ToString();
                string resume = "";
                if (HttpContext.Current.Request["resume"] != null) {
                    resume = HttpContext.Current.Request["resume"].ToString();
                }
                string owner = "";
                if (HttpContext.Current.Request["owner"] != null)
                {
                    owner = HttpContext.Current.Request["owner"].ToString();
                }
                AddFile(url,fileid,resume,owner);
            }
        }
        private void AddFile(string imgUrl, string fileid, string resume,string owner)
        {
            try
            {
                BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
                model.Create_Date = DateTime.Now;
                model.ImgUrl = imgUrl;
                model.Last_Date = DateTime.Now;
                model.OpenID = DEncrypt.Decrypt(FolderName.ConvertBase64TocChars(), WXConfig.EncryptKey);
                model.Resume = resume;
                model.Fileid = fileid;
                model.Owner = owner;
                bll.Add(model);
            }
            catch (Exception ex) {
                WXHelper.WriteNode("game/doublenovember/server/partin.ashx(FolderName:" + FolderName + ")" + ex.Message);
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