using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// ResultV2Controller 的摘要说明
    /// </summary>
    public class ResultV2Controller : IHttpHandler
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
                case "match": 
                    //擂台赛
                    DoMatch(context);
                    break;
                case "zxsmonth":
                    //知行社月考核
                    DoZxsMonth(context);
                    break;
                case "zxsweek":
                    //知行社周练习
                    DoZxsWeek(context);
                    break;
                case "course":
                    //课程练习
                    DoCourse(context);
                    break;
            }
        }

        private void DoCourse(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.Rule.CourseProvide provide = new Helper.Rule.CourseProvide(param.OpenId, param.QuestionActiveId, param);
                var info = provide.Run();
                result = Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            context.Response.Write(result);
        }

        private void DoZxsWeek(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.Rule.WeeksProvide provide = new Helper.Rule.WeeksProvide(param.OpenId, param.QuestionActiveId, param);
                var info = provide.Run();
                result = Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            context.Response.Write(result);
        }

        private void DoZxsMonth(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.Rule.MonthProvide provide = new Helper.Rule.MonthProvide(param.OpenId, param.QuestionActiveId, param);
                var info = provide.Run();
                result = Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            context.Response.Write(result);
        }
        private void DoMatch(HttpContext context)
        {
            string result = "";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe != "")
            {
                Helper.ConvertParamsProvide paramsProvide = new Helper.ConvertParamsProvide(jsonscroe);
                var param = paramsProvide.Params;
                Helper.Rule.MatchProvide provide = new Helper.Rule.MatchProvide(param.OpenId, param.QuestionActiveId, param);
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
                Helper.Rule.CommonProvide provide = new Helper.Rule.CommonProvide(param.OpenId, param.QuestionActiveId, param);
                var info = provide.Run();
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