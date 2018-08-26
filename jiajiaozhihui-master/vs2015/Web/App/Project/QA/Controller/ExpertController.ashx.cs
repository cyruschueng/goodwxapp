using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// ExpertController 的摘要说明
    /// </summary>
    public class ExpertController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "list":
                    GetExpers(context);
                    break;
                case "single":
                    GetExper(context);
                    break;
                case "paging":
                    GetExpersByPaging(context);
                    break;
                case "detail":
                    GetExpertDetail(context);
                    break;
                case "like":
                    AddLike(context);
                    break;
                case "set":
                    SetExpert(context);
                    break;
            }
        }
        private void GetExpers(HttpContext context)
        {
            var list= Helper.ExpertProvide.GetExperts();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetExper(HttpContext context)
        { 
            string id=context.Request["id"];
            var mode = new Model.WX_JJZH_Expert();
            if (!string.IsNullOrEmpty(id))
            {
                mode = Helper.ExpertProvide.GetExpertList().Find(e => e.Id == int.Parse(id));
            }
            else {
                mode = Helper.ExpertProvide.GetExpertList().Find(e => e.Id ==0);
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(mode, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetExpersByPaging(HttpContext context)
        {
            int pageIndex = int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);
            string where = "IsAct=1 and IsRest=0 and IsCheck=1 and isnull(openid,'')<>''";
            string orderBy = "sn,Id ";
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var count= bll.GetRecordCount(where);
            var model = new
            {
                PageTotal = App.Helper.Common.TotalPage(count,pageSize),
                List= Helper.ExpertProvide.GetExperts(where, pageSize, pageIndex, orderBy)
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetExpertDetail(HttpContext context)
        {
            string id = context.Request["id"];
            int pageIndex =int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);
            string openId = context.Request["openId"];//当前用户
            string appId = context.Request["appId"];
            var model= Helper.ExpertProvide.GetExpertDetail(id, openId,appId,pageIndex,pageSize);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void AddLike(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            SfSoft.Model.WX_QA_ExpertLike model = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_QA_ExpertLike>(strJson);
            if (!Helper.ExpertProvide.IsExpertLikeExist(model.AppId, model.OpenId, model.ExpertId ?? 0))
            {
                Helper.ExpertProvide.AddExpertLike(model);
            }
        }
        private void SetExpert(HttpContext context)
        {
            string openId = context.Request["openId"];//当前用户
            string appId = context.Request["appId"];
            string expertId = context.Request["expertId"];
            string expertType = context.Request["expertType"];
            Helper.ExpertProvide.SetMyExpert(appId, openId, expertId, int.Parse(expertType));
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