using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// SongController 的摘要说明
    /// </summary>
    public class SongController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "song":
                    GetSongs(context);
                    break;
            }
        }

        private void GetSongs(HttpContext context)
        {
            string categoryId = context.Request["categoryId"];
            string appId= context.Request["appId"];
            string openId = context.Request["openId"];

            var list = Helper.SongProvide.GetSongs(appId,openId,int.Parse(categoryId));

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list,
                new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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