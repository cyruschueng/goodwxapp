using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// RankingController 的摘要说明
    /// </summary>
    public class RankingController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "city":
                    CityRanking(context);
                    break;
                case "province":
                    ProvinceRanking(context);
                    break;
                case "nationwide":
                    NationwideRanking(context);
                    break;
                case "all":
                    NationwideRanking(context);
                    break;
            }
            
        }
        /// <summary>
        /// 单个活动市排名
        /// </summary>
        /// <param name="context"></param>
        private void CityRanking(HttpContext context)
        {
            string openId = context.Request["openid"];
            string city = context.Request["city"];
            string top = context.Request["top"];
            string item= context.Request["item"];


            Helper.RankingProvide provide = new Helper.RankingProvide();
            var model= provide.GetCityRanking(openId, city, top, item);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 单个活动省排名
        /// </summary>
        /// <param name="context"></param>
        private void ProvinceRanking(HttpContext context)
        {
            string openId = context.Request["openid"];
            string province = context.Request["province"];
            string top = context.Request["top"];
            string item = context.Request["item"];

            Helper.RankingProvide provide = new Helper.RankingProvide();
            var model = provide.GetProvinceRanking(openId, province, top, item);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));

        }
        /// <summary>
        /// 单个活动全国排名
        /// </summary>
        /// <param name="context"></param>
        private void NationwideRanking(HttpContext context)
        {
            string openId = context.Request["openid"];
            string top = context.Request["top"];
            string item = context.Request["item"];

            Helper.RankingProvide provide = new Helper.RankingProvide();
            var model = provide.GetNationwideRanking(openId, item, top);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 总排名
        /// </summary>
        /// <param name="context"></param>
        private void Ranking(HttpContext context)
        {
            string openId = context.Request["openid"];
            string top = context.Request["top"];

            Helper.RankingProvide provide = new Helper.RankingProvide();
            var model = provide.GetRanking(openId, top);

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