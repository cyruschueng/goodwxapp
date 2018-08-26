using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Read.Controller
{
    /// <summary>
    /// TaskController 的摘要说明
    /// </summary>
    public class TaskController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request.QueryString["method"];
            switch (method)
            {
                case "task":
                    GetTask(context);
                    break;
            }
        }

        private void GetTask(HttpContext context)
        {
            SfSoft.BLL.WX_Read_Plan bll = new BLL.WX_Read_Plan();
            var model = bll.GetModelList("IsAct=1").OrderByDescending(e=>e.Id).FirstOrDefault();
            if (model != null)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else {
                model = new Model.WX_Read_Plan();
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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