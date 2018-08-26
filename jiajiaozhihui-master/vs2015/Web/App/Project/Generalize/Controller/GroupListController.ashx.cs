using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// GroupListController 的摘要说明
    /// </summary>
    public class GroupListController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "list":
                    GetGroupList(context);
                    break;
                case "using":
                    UsingGroup(context);
                    break;
                case "delete":
                    DeleteGroup(context);
                    break;
                case "detail":
                    GroupDetail(context);
                    break;
                case "checkclassname":
                    CheckClassName(context);
                    break;
            }
        }

        private void CheckClassName(HttpContext context)
        {
            Helper.GroupListProvide provide = new Helper.GroupListProvide();
            var className = context.Request["classname"];
            var result= provide.CheckClassName(className);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void GroupDetail(HttpContext context)
        {
            var groupId = context.Request["groupid"];
            Helper.GroupListProvide provide = new Helper.GroupListProvide();
            var model= provide.GetGroupDetail(int.Parse( groupId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        
        private void GetGroupList(HttpContext context)
        {
            var groupType = context.Request["grouptype"];
            Helper.GroupListProvide provide = new Helper.GroupListProvide();
            var list= provide.GetNewGroupList(int.Parse(groupType));
            var data= list.OrderByDescending(e => e.is_act).OrderBy(e=>e.pass).ThenBy(e=> e.valid_date);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void UsingGroup(HttpContext context)
        {
            var groupType = context.Request["grouptype"];
            var groupId = context.Request["groupid"];
            var catalogue = context.Request["catalogue"];

            Helper.GroupListProvide provide = new Helper.GroupListProvide();
            provide.ChangeGroup(int.Parse(groupId), int.Parse(groupType), catalogue);
            var list = provide.GetGroupList(int.Parse(groupType));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void DeleteGroup(HttpContext context)
        {
            var groupId = context.Request["groupid"];
            var groupType = context.Request["grouptype"];
            Helper.GroupListProvide provide = new Helper.GroupListProvide();
            provide.DeleteGroup(int.Parse(groupId));
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