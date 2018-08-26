using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using SfSoft.Common.CosCloud;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;
using System.Threading;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// uploadII 的摘要说明
    /// </summary>
    public class uploadII : IHttpHandler
    {
        string FolderName = "";
        string ResultMsg = "{}";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            FolderName = context.Request["folder"].ToString();
            System.Web.HttpFileCollection _file = context.Request.Files;
            if (_file.Count > 0)
            {
                try
                {
                    //文件名
                    string name = _file[0].FileName;
                    //文件格式
                    string ext = System.IO.Path.GetExtension(name);
                    if (ext.ToLower() == ".jpg" || ext.ToLower() == ".jpeg" || ext.ToLower() == ".gif" || ext.ToLower() == ".png")
                    {
                        string newFileName = System.Guid.NewGuid().ToString();
                        string fileOriginalPath = HttpContext.Current.Server.MapPath("/game/doublenovember/resource/") + newFileName+ext;
                        string fileThumbnailPath = HttpContext.Current.Server.MapPath("/game/doublenovember/resource/thumbnail/") + newFileName+"_t"+ext;
                        //保存原图
                        _file[0].SaveAs(fileOriginalPath);
                        //生成缩略图
                        ImgThumbnail.MakeThumbnail(fileOriginalPath, fileThumbnailPath, 300, 0, "W");
                        //从服务器上传文件到腾讯云
                        MyUpload myUpload = new MyUpload(newFileName, fileOriginalPath,"image");
                        Thread t=new Thread(myUpload.Upload);
                        t.IsBackground = true;
                        t.Start();
                        
                        MyUpload myUpload1 = new MyUpload(newFileName, fileThumbnailPath, "thumbnail");
                        myUpload1.ThumbnailUpload();
                        JObject fileUploadThumbnailJsonResult = (JObject)JsonConvert.DeserializeObject(myUpload1.LoadUpResult);
                        if (fileUploadThumbnailJsonResult["code"].ToString() == "0")
                        {
                            string fileid = fileUploadThumbnailJsonResult["data"]["fileid"].ToString();
                            string url = fileUploadThumbnailJsonResult["data"]["download_url"].ToString();
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
                        else {
                            FileUploadResult("101", "上传腾讯云失败");
                            return;
                        }
                    }
                    else {
                        FileUploadResult("100", "上传文件格式不正确，只能上传(jpg,jpeg,gif,png)");
                        return;   
                    }
                }
                catch (Exception ex) {
                    FileUploadResult("-1", ex.Message);
                }
            }
            context.Response.Write(ResultMsg);
        }
        private  void AddFile(string imgUrl, string fileid, string resume, string owner, string bookName, string pageNumber)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
            try
            {
                model.Create_Date = DateTime.Now;
                model.ImgUrl = imgUrl;
                model.Last_Date = DateTime.Now;
                model.OpenID = DEncrypt.Decrypt(FolderName, WXConfig.EncryptKey);
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
                FileUploadResult("1003", ex.Message);
                WXHelper.WriteNode("game/doublenovemberII/server/partinII.ashx(FolderName:" + FolderName + ")" + ex.Message);
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
                WXHelper.WriteNode("game/doublenovemberII/server/partin.ashx(上传作品成功后获取积分与金币)" + ex.Message);
            }
            EditFirstWorksDate(model.OpenID);
        }
        private void FileUploadResult(string code,string msg)
        { 
            ResultMsg= "{\"code\":\""+code+"\",\"msg\":\""+msg+"\"}";
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
    public class MyUpload
    {
        const int APP_ID = 10010645;
        const string SECRET_ID = "AKIDZSwHzB8GhjdzyTvgWsbtMJmxrhjbe52K";
        const string SECRET_KEY = "ct6ciEl0wjkyf2jaH2Ra5h6xiaRPYdSK";
        string BUCKET_NAME;
        string newFileName;
        string filePath;
        public string LoadUpResult;
        public MyUpload(string newFileName, string filePath,string bucket)
        {
            this.newFileName=newFileName;
            this.filePath = filePath;
            this.BUCKET_NAME = bucket;
        }
        public  void Upload()
        {
            SfSoft.Common.QCloud.Api.Cloud cloud = new Common.QCloud.Api.Cloud(APP_ID, SECRET_ID, SECRET_KEY);
            LoadUpResult = cloud.Upload(BUCKET_NAME, filePath, newFileName);
            
        }
        public void ThumbnailUpload()
        {
            SfSoft.Common.QCloud.Api.Cloud cloud = new Common.QCloud.Api.Cloud(APP_ID, SECRET_ID, SECRET_KEY);
            LoadUpResult = cloud.Upload(BUCKET_NAME, filePath, newFileName);
        }
    }
}