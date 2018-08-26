using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Serialization;
using SfSoft.web.App.Helper;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// ZxsHomeController 的摘要说明
    /// </summary>
    public class ZxsHomeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method=context.Request.QueryString["method"];
            var result = "";
            switch (method) { 
                case "all":
                    GetAllTask(context);
                    break;
                case "personal":
                    GetPersonalTask(context);
                    break;
                case "top":
                    GetTop(context);
                    break;
                case "del":
                    Delete(context);
                    break;
            }
        }
        /// <summary>
        /// 按页获取上传的数据
        /// </summary>
        /// <param name="context"></param>
        private void GetAllTask(HttpContext context)
        {
            string appId=context.Request["appId"];
            string openId=context.Request["openId"];
            int isTop=int.Parse(context.Request["isTop"]);
            int pageIndex=int.Parse(context.Request["pageIndex"]);
            int pageSize=int.Parse(context.Request["pageSize"]);

            Helper.ZxsHomeProvide provide = new Helper.ZxsHomeProvide(appId, openId);
            string where = "AppId='" + appId + "' and Status=1";
            string orderBy = " CreateDate desc";
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetTaks(where, pageSize, pageIndex, orderBy), new Newtonsoft.Json.JsonSerializerSettings() {  ContractResolver=new UnderlineSplitContractResolver()}));
        }
        /// <summary>
        /// 获取个人的某个任务的数据
        /// </summary>
        /// <param name="context"></param>
        private void GetPersonalTask(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            int playerTaskId = int.Parse(context.Request["playerTaskId"]);

            Helper.ZxsHomeProvide provide = new Helper.ZxsHomeProvide(appId, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetTask(playerTaskId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new UnderlineSplitContractResolver() }));
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

            Helper.ZxsHomeProvide provide = new Helper.ZxsHomeProvide(appId, openId);
            string where = "AppId='" + appId + "' and Status=1 and isnull(IsTop,0)=1";
            string orderBy = " CreateDate desc";
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetTaks(where, pageSize, pageIndex, orderBy), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 假删除
        /// </summary>
        /// <param name="context"></param>
        private void Delete(HttpContext context)
        {
            int playerTaskId = int.Parse(context.Request["playerTaskId"]);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(Helper.ZxsHomeProvide.Delete(playerTaskId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new UnderlineSplitContractResolver() }));
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