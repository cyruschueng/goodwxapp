using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// ResultController 的摘要说明
    /// </summary>
    public class ResultController : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "result":
                    DoResult(context);
                    break;
                case "math":
                    DoMath(context);
                    break;
                    
            }
        }
        private void DoMath(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.ResultProvide provide = new Helper.ResultProvide(param.OpenId, param.QuestionActiveId, param);
                var info = provide.Run();
                result = Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            context.Response.Write(result);
        }
        private void DoResult(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.ResultProvide provide = new Helper.ResultProvide(param.OpenId, param.QuestionActiveId, param);
                var info= provide.Run();
                result = Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            context.Response.Write(result);
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