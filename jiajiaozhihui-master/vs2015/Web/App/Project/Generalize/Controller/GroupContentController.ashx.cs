using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// GroupContentController 的摘要说明
    /// </summary>
    public class GroupContentController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "init":
                    InitCreate(context);
                    break;
                case "update":
                    UpdateGroupContent(context);
                    break;
                case "changetpl":
                    ChangeTpl(context);
                    break;
            }
        }

        private void ChangeTpl(HttpContext context)
        {
            Helper.MediaDataProvide provide = new Helper.MediaDataProvide("");
            var list=  provide.GetGroupTpl();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void InitCreate(HttpContext context)
        {
            var groupType = context.Request["grouptype"];
            var classList= Helper.GroupContentProvide.GetClassName(groupType);
            var latelyGroupName = Helper.GroupContentProvide.GetLatelyGroupName(groupType);
            var data = new
            {
                classList = classList,
                groupName = latelyGroupName
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void UpdateGroupContent(HttpContext context)
        {
            try
            {
                var id = context.Request["id"];
                var title = context.Request["title"];
                var catalogue = context.Request["catalogue"];
                var classname = context.Request["classname"];
                var validdate =DateTime.Parse( context.Request["validdate"]);
                var serverId = context.Request["serverid"];
                Helper.GroupContentProvide.UpdateGroupContent(int.Parse(id), catalogue, classname, validdate, serverId);
                context.Response.Write("ok");
            }
            catch (Exception ex) {
                context.Response.Write("error");
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