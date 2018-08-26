using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// PersonalController 的摘要说明
    /// </summary>
    public class PersonalController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "info":
                    Get(context);
                    break;
                case "count":
                    GetCount(context);
                    break;
                case "update":
                    Update(context);
                    break;
                case "add":
                    Add(context);
                    break;
            }
        }

        public void Get(HttpContext context)
        {
            string openId = context.Request["openId"];
            string appId = context.Request["appId"];
            Models.Personal.Personal personal = new Models.Personal.Personal();
            personal.WxUserInfo = Helper.PersonalProvide.GetWxUserInfo(openId);
            personal.CourseUser = Helper.PersonalProvide.GetCourseUser(openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(personal, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 获取会员数量
        /// </summary>
        /// <param name="appId"></param>
        /// <returns></returns>
        public void GetCount(HttpContext context)
        {
            string appId = context.Request["appId"];
            context.Response.Write(Helper.PersonalProvide.GetCourseUserCount());
        }
        public void Update(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Personal.UserInfo entity = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Personal.UserInfo>(strJson);
            var model = Helper.PersonalProvide.Update(entity);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        public void Add(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Personal.UserInfo entity = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Personal.UserInfo>(strJson);

            Helper.PersonalProvide.Add(entity);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(entity, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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