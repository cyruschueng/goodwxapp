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
using System.Data;

namespace SfSoft.web.game.qzsf.server
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
        private string ResultMsg = "{}";
        private string MyMediaID = "";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //这里直接用用户的open作为目录
            //处理安全考虑，对open进行加密码
            FolderName = context.Request["folder"].ToString();
            string result = "";
            result = AsyncDownFile(context);
            context.Response.Write(ResultMsg);
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
                string accessToken = Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(WXConfig.appId, WXConfig.appSecret);
                

                string mediaId = context.Request["mediaId"].ToString();
                MyMediaID = mediaId;
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
                ResultMsg = "{\"code\":\"-1\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode("(" + context.Request.RawUrl + ")" + ex.Message, "qzsf.txt");
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
            if (entity["code"].ToString() == "0")
            {
                string url = entity["data"]["download_url"].ToString();
                string fileid = entity["data"]["fileid"].ToString();
                string resume = "";
                if (HttpContext.Current.Request["resume"] != null)
                {
                    resume = HttpContext.Current.Request["resume"].ToString();
                }
                string owner = "";
                if (HttpContext.Current.Request["owner"] != null)
                {
                    owner = HttpContext.Current.Request["owner"].ToString();
                }
                string bookName = "";
                if (HttpContext.Current.Request["bookname"] != null)
                {
                    bookName = HttpContext.Current.Request["bookname"].ToString();
                }
                string bookNumber = "";
                if (HttpContext.Current.Request["pagenumber"] != null)
                {
                    bookNumber = HttpContext.Current.Request["pagenumber"].ToString();
                }
                AddFile(url, fileid, resume, owner, bookName, bookNumber);
            }
            else
            {
                ResultMsg = "{\"code\":\"" + entity["code"] + "\",\"message\":\"" + entity["message"].ToString() + "\"}";
                WXHelper.WriteNode("上传腾讯云服务器失败：" + entity["code"].ToString() + entity["message"].ToString() + " openid=" + FolderName + " MyMediaID=" + MyMediaID + "; 路径：" + LocalPath, "qzsf.txt");
            }
        }
        private void AddFile(string imgUrl, string fileid, string resume, string owner, string bookName, string pageNumber)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
            try
            {
                model.Create_Date = DateTime.Now;
                model.ImgUrl = imgUrl;
                model.Last_Date = DateTime.Now;
                model.OpenID = FolderName;
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
                ResultMsg = "{\"code\":\"-1\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode("game/qzsf/server/partin.ashx(FolderName:" + FolderName + ")" + ex.Message, "qzsf.txt");
            }
            try
            {
                #region 上传作品成功后获取积分与金币
                AwardItem award = new AwardItem(model.OpenID);
                award.AwardByUploadPortfolios();
                #endregion
            }
            catch (Exception ex)
            {
                ResultMsg = "{\"code\":\"-1\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode("game/qzsf/server/partin.ashx(上传作品成功后获取积分与金币)" + ex.Message, "qzsf.txt");
            }
            EditFirstWorksDate(model.OpenID);
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
                ResultMsg = "{\"code\":\"-1\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode("时间更新失败");
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
    }
}