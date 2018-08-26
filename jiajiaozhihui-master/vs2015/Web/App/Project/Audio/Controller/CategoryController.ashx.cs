using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// CategoryController 的摘要说明
    /// </summary>
    public class CategoryController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetCategoryRelation(context);
                    break;
            }
        }

        

        private void GetCategoryRelation(HttpContext context)
        {
            var list= Helper.CategoryProvide.GetCategoryRelation();

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