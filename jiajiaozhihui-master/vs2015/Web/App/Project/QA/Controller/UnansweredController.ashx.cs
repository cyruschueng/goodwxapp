using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// UnansweredController 的摘要说明
    /// </summary>
    public class UnansweredController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request.QueryString["method"];
            switch (method)
            {
                case "all":
                    Get(context);
                    break;
            }
        }
        private void Get(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            var expert = GetExpert(openId);
            int pageIndex = int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);
            Helper.HomeProvide provide = new Helper.HomeProvide(appId, openId);
            string where = "Expert="+expert.Id.ToString()+" and IsNew=1 and Status=1 and Expert<>'' and Expert<>0";
            string orderBy = "Sn asc,CreateDate desc";
            var list=provide.GetFile(where, pageSize, pageIndex, orderBy);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private Model.WX_JJZH_Expert GetExpert(string openId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModelList("openId='" + openId + "'").FirstOrDefault();
            if (model != null)
            {
                return model;
            }
            else
            {
                return new Model.WX_JJZH_Expert();
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