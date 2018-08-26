using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// BagsController 的摘要说明
    /// </summary>
    public class BagsController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "infos":
                    GetInfos(context);
                    break;
                case "info":
                    GetInfo(context);
                    break;
            }
        }
        private void GetInfos(HttpContext context)
        {
            string bagId = context.Request["bagId"];
            var list= Helper.BagsProvide.GetBags(int.Parse(bagId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetInfo(HttpContext context)
        {
            string id = context.Request["id"];
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model = bll.GetModel(Convert.ToInt32(id));
            if (model == null) {
                model = new Model.WX_Course_SetBag();
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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