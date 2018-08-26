using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.game.qzsf.server
{
    public delegate string AgreementDownEventHandler(string mediaId, int fileId);
    public delegate void AgreementCompleteEventHandler(string openId);

    /// <summary>
    /// agreement 的摘要说明
    /// </summary>
    public class agreement : IHttpHandler
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
            _ImagePath = HttpContext.Current.Server.MapPath(@"~/game/doublenovember/resource/Agreement/");
            _accessToken =Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret);
            AddMedia(context);
            context.Response.Write(ResultMsg);
        }
        private string DownImageFromWx(string mediaId, int fileId)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                Senparc.Weixin.MP.AdvancedAPIs.MediaApi.Get(_accessToken, mediaId, ms);
                string newName = System.Guid.NewGuid().ToString() + ".jpg";
                string localPath = _ImagePath + newName;
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
                var result = new MediaInfo()
                {
                    fileId = fileId,
                    mediaPath = @"/game/doublenovember/resource/agreement/" + newName
                };
                return Newtonsoft.Json.JsonConvert.SerializeObject(result);
            }
        }
        
        private void AddMedia(HttpContext context)
        {
            int index = 0;
            string openId = context.Request["openId"];
            string name = context.Request["name"];
            string telephone = context.Request["telephone"];
            string imageMediaId = context.Request["imageMediaId"];
            string voiceMediaId = context.Request["voiceMediaId"];

            if (string.IsNullOrEmpty(openId))
            {
                FileUploadResult("-1", "上传失败");
                return;
            }
            try
            {
                SfSoft.BLL.WX_Doublenovember_Agreement bll = new BLL.WX_Doublenovember_Agreement();
                SfSoft.Model.WX_Doublenovember_Agreement model = new Model.WX_Doublenovember_Agreement();
                model.CreateDate = DateTime.Now;
                model.IsAct = 1;
                model.OpenId = openId;
                model.Name = name;
                model.Telephone = telephone;
                model.MedialId = imageMediaId;

                index = bll.Add(model);
                FileUploadResult("0", "上传成功");
            }
            catch (Exception ex)
            {
                FileUploadResult("-1", "上传失败");
                return;
            }
            //下载图片
            if (!string.IsNullOrEmpty(imageMediaId))
            {
                AgreementDownEventHandler imageHandler = new AgreementDownEventHandler(DownImageFromWx);
                IAsyncResult arImage = imageHandler.BeginInvoke(imageMediaId, index, new AsyncCallback(CallBackDownImageFromWx), imageHandler);
            }
        }
        private void CallBackDownImageFromWx(IAsyncResult ar)
        {
            AgreementDownEventHandler dlgt = (AgreementDownEventHandler)ar.AsyncState;
            string res = dlgt.EndInvoke(ar);
            var obj = Newtonsoft.Json.Linq.JObject.Parse(res);
            string fileId = obj["fileId"].ToString();
            string mediaPath = obj["mediaPath"].ToString();

            SfSoft.BLL.WX_Doublenovember_Agreement bll = new BLL.WX_Doublenovember_Agreement();
            SfSoft.Model.WX_Doublenovember_Agreement model = bll.GetModel(int.Parse(fileId));
            if (model != null)
            {
                model.LocalImgUrl = mediaPath;
                bll.Update(model);
            }
        }
        private void FileUploadResult(string code, string msg)
        {
            ResultMsg = "{\"code\":\"" + code + "\",\"msg\":\"" + msg + "\"}";
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