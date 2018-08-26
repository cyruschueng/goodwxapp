using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;

namespace SfSoft.web.Gxdr.Helper
{
    public class ConvertParamsProvide
    {
        public Models.QueryString.QueerStringInfo Params { get; set; }

        public ConvertParamsProvide(string prams)
        {
            Newtonsoft.Json.Linq.JObject scoreJson = Newtonsoft.Json.Linq.JObject.Parse(prams);
            var result = new  Models.QueryString.QueerStringInfo
            {
                OpenId = scoreJson["openid"].ToString(),
                QuestionActiveId = int.Parse(scoreJson["questionactiveid"].ToString()),
                Detail =GetAnswerResult(Newtonsoft.Json.Linq.JArray.Parse(scoreJson["detail"].ToString())),
                ZxsType = GetZxsType(scoreJson["questionactiveid"].ToString())
            };
            this.Params = result;
        }
        private List<Models.QueryString.QueryStringDetails> GetAnswerResult(Newtonsoft.Json.Linq.JArray list)
        {
            List<Models.QueryString.QueryStringDetails> details = new List<Models.QueryString.QueryStringDetails>();
            foreach (var m in list) {
                details.Add(new Models.QueryString.QueryStringDetails { 
                    Answer=m["select"].ToString(),
                    IsRight=int.Parse(m["right"].ToString()),
                    Score=int.Parse(m["score"].ToString()),
                    UsingTime=int.Parse(m["usingtime"].ToString()),
                    QuestionId=int.Parse(m["testquestion"].ToString())
                });
            }
            return details;
        }
        private string GetZxsType(string questionActiveID)
        {
            string src = HttpContext.Current.Server.MapPath("~/game/js/zxs_data.js");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                var results = Newtonsoft.Json.Linq.JObject.Parse(json);
                foreach (var info in results["info"])
                {
                    if (info["id"].ToString() == questionActiveID)
                    {
                        return info["type"].ToString();
                    }
                }
                return "";
            }
        }
    }
}