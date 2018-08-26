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
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// uploadIII 的摘要说明
    /// </summary>
    public class uploadIII : IHttpHandler
    {
        string FolderName = "";
        string ResultMsg = "{}";
        //const int APP_ID = 10010645; //测试
        //const string SECRET_ID = "AKIDuHoiM9A3jxSSiTOnFVqgKJ8enJItHAL2";
        //const string SECRET_KEY = "lHvQdEJASOpaJJhGsqEIqY57YjFyegNB";
        //const string BUCKET_NAME = "image";

        const int APP_ID = 10010590; //家教智慧
        const string SECRET_ID = "AKID9cADvko08CVsbnncZMa8IFh27J2U7elh";
        const string SECRET_KEY = "WkdGcUZzqNsoJRskEAccjsaaVcMcehQh";
        const string BUCKET_NAME = "doublenove";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            SaveFile(context);
            context.Response.Write(ResultMsg);
        }
        /// <summary>
        /// 把base64图片保存到服务器
        /// </summary>
        /// <param name="context"></param>
        private void SaveFile(HttpContext context)
        {
            if (context.Request["imgdata"] != null) {
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
                catch (Exception ex) {
                    WXHelper.WriteNode(ex.Message, "upload.txt");
                    FileUploadResult("-1", "上传失败");
                }
            }
        }
        
        /// <summary>
        /// 保存作品到数据库
        /// </summary>
        private void SaveWork(HttpContext context,string imgUrl,string fileId)
        {
            string openid = "";
            if (context.Request["folder"] != null)
            {
                openid = context.Request["folder"].ToString();
                openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
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
            catch (Exception ex) {
                WXHelper.WriteNode(ex.Message, "upload.txt");
                FileUploadResult("-1", "上传失败");
            }
            EditFirstWorksDate(model.OpenID);
            #region 上传作品成功后获取积分与金币
            AwardItem award = new AwardItem(model.OpenID);
            award.AwardByUploadPortfolios();
            #endregion

        }
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
    }
}