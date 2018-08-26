using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Script.Serialization;
using SfSoft.Common.DEncrypt;
using System.Net;
using System.ComponentModel;
using SfSoft.Common.QCloud.Api;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler
    {
        const int APP_ID = 10010590; //家教智慧
        const string SECRET_ID = "AKID9cADvko08CVsbnncZMa8IFh27J2U7elh";
        const string SECRET_KEY = "WkdGcUZzqNsoJRskEAccjsaaVcMcehQh";
        const string BUCKET_NAME = "doublenove";

        //const int APP_ID = 10010645;
        //const string SECRET_ID = "AKIDuHoiM9A3jxSSiTOnFVqgKJ8enJItHAL2";
        //const string SECRET_KEY = "lHvQdEJASOpaJJhGsqEIqY57YjFyegNB";
        //const string BUCKET_NAME = "image";

        private string JsonResult = "{\"code\":\"0\",\"msg\":\"上传成功\"}";
        private string LocalPath = "";
        private string FolderName = "";
        private Dictionary<String, Object> dicParameter = new Dictionary<string, object>();
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            UploadImg(context);
            context.Response.Write(JsonResult);
        }
        /// <summary>
        /// 上传图片
        /// </summary>
        /// <param name="context"></param>
        public void UploadImg(HttpContext context)
        {
            dicParameter = GetParameter(context);
            string base64 = dicParameter["base64"].ToString();//base64编码
            int size = Convert.ToInt32(dicParameter["size"].ToString());//base64大小
            string filename = dicParameter["name"].ToString();//原文件名
            string fileType = filename.Substring(filename.LastIndexOf("."));//文件类型
            base64 = base64.Replace(" ", "+");//修复base64将+转为空格
            string newfilename = System.Guid.NewGuid().ToString() + fileType;
            LocalPath = HttpContext.Current.Server.MapPath("/game/doublenovember/resource/") + newfilename;
            Base64StringToImage(base64.Substring(base64.LastIndexOf(",") + 1), LocalPath);
        }
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private Dictionary<String, Object> GetParameter(HttpContext context)
        {
            try
            {
                StreamReader reader = new StreamReader(context.Request.InputStream);
                JavaScriptSerializer jss = new JavaScriptSerializer();
                String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
                //将json字符串反序列化成一个Dictionary对象
                //Dictionary<String, Object> dicParameter = jss.Deserialize<Dictionary<String, Object>>(strJson);
                Dictionary<string, Object> dicParameter = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, Object>>(strJson);
                return dicParameter;
            }
            catch (Exception ex)
            {
                string e = ex.Message;
                return null;
            }
        }
        protected void Base64StringToImage(string strbase64, string filepath)
        {
            try
            {
                byte[] arr = Convert.FromBase64String(strbase64);
                WebClient wc = new WebClient();
                Uri uri = new Uri(filepath);
                wc.UploadDataCompleted += new UploadDataCompletedEventHandler(wc_UploadDataCompleted);
                wc.UploadDataAsync(uri, arr);
            }
            catch (Exception ex)
            {
                JsonResult = "{\"code\":\"1\",\"msg\":\"上传服务器失败\"}";
                WXHelper.WriteNode(HttpContext.Current.Request.Url.AbsoluteUri + "(上传服务器失败)", "yun.txt");
            }
        }
        public void wc_UploadDataCompleted(object sender, AsyncCompletedEventArgs e)
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
                if (dicParameter.ContainsKey("resume"))
                {
                    resume = dicParameter["resume"].ToString();
                }
                string owner = "";
                if (dicParameter.ContainsKey("owner"))
                {
                    owner = dicParameter["owner"].ToString();
                }
                string bookName = "";
                if (dicParameter.ContainsKey("bookname"))
                {
                    bookName = dicParameter["bookname"].ToString();
                }
                string bookNumber = "";
                if (dicParameter.ContainsKey("pagenumber"))
                {
                    bookNumber = dicParameter["pagenumber"].ToString();
                }
                if (dicParameter.ContainsKey("folder"))
                {
                    FolderName = dicParameter["folder"].ToString();
                }
                //AddFile(url, fileid, resume, owner, bookName, bookNumber);
            }
            else
            {
                JsonResult = "{\"code\":\"" + entity["code"] + "\",\"message\":\"" + entity["message"].ToString() + "\"}";
                WXHelper.WriteNode(HttpContext.Current.Request.Url.AbsoluteUri + "上传腾讯云服务器失败：" + entity["code"].ToString() + entity["message"].ToString() + " openid=" + FolderName + " 路径：" + LocalPath, "yun.txt");
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
                model.OpenID = DEncrypt.Decrypt(FolderName.ConvertBase64TocChars(), WXConfig.EncryptKey);
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
                JsonResult = "{\"code\":\"2\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode(HttpContext.Current.Request.Url.AbsoluteUri + "(作品写入数据库出错FolderName:" + FolderName + ")" + ex.Message, "yun.txt");
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
                JsonResult = "{\"code\":\"3\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode(HttpContext.Current.Request.Url.AbsoluteUri + "(上传作品成功后获取积分与金币)" + ex.Message, "yun.txt");
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
                JsonResult = "{\"code\":\"-1\",\"message\":\"" + ex.Message + "\"}";
                WXHelper.WriteNode(HttpContext.Current.Request.Url.AbsoluteUri + "时间更新失败", "yun.txt");
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