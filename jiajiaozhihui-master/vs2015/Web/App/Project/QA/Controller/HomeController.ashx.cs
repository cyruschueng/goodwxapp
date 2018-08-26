using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// HomeController 的摘要说明
    /// </summary>
    public class HomeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "all":
                    GetAllFile(context);
                    break;
                case "personal":
                    GetPersonalFile(context);
                    break;
                case "top":
                    GetTop(context);
                    break;
                case "del":
                    Delete(context);
                    break;
                case "browse":
                    Browse(context);
                    break;
            }
        }
        /// <summary>
        /// 按页获取上传的数据
        /// </summary>
        /// <param name="context"></param>
        private void GetAllFile(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            //int isTop = int.Parse(context.Request["isTop"]);
            int pageIndex = int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);

            Helper.HomeProvide provide = new Helper.HomeProvide(appId, openId);
            string where = "AppId='" + appId + "' and Status=1";
            string orderBy = " CreateDate desc";
            var model=provide.GetFile(where, pageSize, pageIndex, orderBy);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 获取个人的某个任务的数据
        /// </summary>
        /// <param name="context"></param>
        private void GetPersonalFile(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            int fileId = int.Parse(context.Request["fileId"]);

            Helper.HomeProvide provide = new Helper.HomeProvide(appId, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetFile(fileId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 设置精华
        /// </summary>
        /// <param name="context"></param>
        private void GetTop(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            int pageIndex = int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);

            Helper.HomeProvide provide = new Helper.HomeProvide(appId, openId);
            string where = "AppId='" + appId + "' and Status=1 and isnull(IsTop,0)=1";
            string orderBy = " CreateDate desc";
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetFile(where, pageSize, pageIndex, orderBy), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 假删除
        /// </summary>
        /// <param name="context"></param>
        private void Delete(HttpContext context)
        {
            int fileId = int.Parse(context.Request["fileId"]);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(Helper.HomeProvide.Delete(fileId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void Award(HttpContext context)
        {
            string openId = context.Request["openId"];
            /*获取积分*/
            Award.AwardItem awardItem = new Award.AwardItem(openId);

        }
        private void Browse(HttpContext context)
        { 
            var fileid=context.Request["id"];
            var number= Helper.HomeProvide.SetBrowserNumber(int.Parse(fileid));
            context.Response.Write(number);
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