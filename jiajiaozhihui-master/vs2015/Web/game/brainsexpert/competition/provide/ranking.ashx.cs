using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;

namespace SfSoft.web.game.brainsexpert.competition.provide
{
    /// <summary>
    /// ranking 的摘要说明
    /// </summary>
    public class ranking : IHttpHandler
    {

        static string ENCRYPTKEY = "shenerxm";
        private string _openid = "";//解密码的openid
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            
            string result = Ranking(context);
            context.Response.Write(result);
        }
        private string Ranking(HttpContext context)
        {
            string result = "";
            string method = context.Request["method"];
            switch (method)
            {
                case "city":
                    result = GetCityRanking(context);
                    break;
                case "province":
                    result = GetProvinceRanking(context);
                        break;
                default:
                    result = GetNationwideRanking(context);
                    break;
            }
            return result;
        }
        /// <summary>
        /// 全国排名
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetNationwideRanking(HttpContext context)
        {
            string result = "{}";
            _openid =context.Request["openid"].ToString();
            int activityid = 0;
            if (context.Request["activityid"] != null && context.Request["activityid"].ToString() != "")
            {
                activityid =Int32.Parse(context.Request["activityid"].ToString());
            }
            lib.Ranking ranking = new lib.Ranking(_openid,activityid, "", "", 50);
            result=ranking.ReturnRankingJson();
            return result;
        }
        /// <summary>
        /// 全省排名
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetProvinceRanking(HttpContext context)
        {
            string result = "{}";
            _openid = context.Request["openid"].ToString();
            int activityid = 0;
            if (context.Request["activityid"] != null && context.Request["activityid"].ToString() != "")
            {
                activityid = Int32.Parse(context.Request["activityid"].ToString());
            }
            var province = context.Request["province"];
            lib.Ranking ranking = new lib.Ranking(_openid, activityid, province, "", 50);
            result = ranking.ReturnRankingJson();
            return result;
        }
        /// <summary>
        /// 全市排名
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetCityRanking(HttpContext context)
        {
            string result = "{}";
            _openid =context.Request["openid"].ToString();
            int activityid = 0;
            if (context.Request["activityid"] != null && context.Request["activityid"].ToString() != "")
            {
                activityid = Int32.Parse(context.Request["activityid"].ToString());
            }
            var province = context.Request["province"];
            var city = context.Request["city"];

            lib.Ranking ranking = new lib.Ranking(_openid, activityid, province, city, 50);
            result = ranking.ReturnRankingJson();
            return result;
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