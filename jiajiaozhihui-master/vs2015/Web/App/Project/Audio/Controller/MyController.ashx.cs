using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// MyController 的摘要说明
    /// </summary>
    public class MyController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "myfavorite":
                    GetFavorite(context);
                    break;
                case "dele":
                    DeleteFavorite(context);
                    break;
            }
        }
        private void DeleteFavorite(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            string audioId = context.Request["audioId"];
            Helper.FavoriteProvide.Delete(appId, openId, int.Parse(audioId));
        }
        private void GetFavorite(HttpContext context)
        {
            string appId=context.Request["appId"];
            string openId=context.Request["openId"];
            var list= Helper.FavoriteProvide.GetMyFavorite(appId, openId);
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