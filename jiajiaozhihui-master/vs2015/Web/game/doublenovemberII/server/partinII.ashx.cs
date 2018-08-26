using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// partinII 的摘要说明
    /// </summary>
    public class partinII : IHttpHandler
    {

        private string ResultMsg = "{}";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //这里直接用用户的open作为目录
            //处理安全考虑，对open进行加密码
            SaveFileWorks(context);
            context.Response.Write(ResultMsg);
        }
        private void SaveFileWorks(HttpContext context )
        {
            string openid = "";
            if (context.Request["folder"] != null)
            {
                openid = context.Request["folder"].ToString();
            }
            string url = "";
            if (context.Request["url"] != null)
            {
                url = context.Request["url"].ToString();
            }
            string fileid = "";
            if (context.Request["fileid"] != null)
            {
                fileid = context.Request["fileid"].ToString();
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
            AddFile(openid,url, fileid, resume, owner, bookName, bookNumber);
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
                model.OpenID = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
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
                WXHelper.WriteNode("game/doublenovemberII/server/partinII.ashx" + ex.Message);
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
                WXHelper.WriteNode("game/doublenovemberII/server/partinII.ashx(上传作品成功后获取积分与金币)" + ex.Message);
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