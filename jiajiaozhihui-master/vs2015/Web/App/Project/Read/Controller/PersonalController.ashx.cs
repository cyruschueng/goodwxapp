using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.Read.Controller
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
            personal.ReadUser = Helper.PersonalProvide.GetReadUser(appId, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(personal, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 获取挑战者的数量
        /// </summary>
        /// <param name="appId"></param>
        /// <returns></returns>
        public void GetCount(HttpContext context)
        {
            string appId = context.Request["appId"];
            context.Response.Write(Helper.PersonalProvide.GetReadCountCount(appId));
        }
        public void Update(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            string  age = context.Request["age"];
            string tel = context.Request["tel"];
            string sex = context.Request["sex"];

            SfSoft.BLL.WX_Read_User bll = new SfSoft.BLL.WX_Read_User();
            SfSoft.Model.WX_Read_User model = new SfSoft.Model.WX_Read_User();
            if (Helper.PersonalProvide.IsExist(appId, openId))
            {
                model = bll.GetModel(appId, openId);
                if (!string.IsNullOrEmpty(age))
                {
                    model.ChildAge =int.Parse(age);
                    model.BorthDay = DateTime.Now.AddYears(-int.Parse(age));
                }
                else {
                    model.ChildAge = 0;
                    model.BorthDay = DateTime.Now.AddYears(-0);
                }
                model.Telephone = tel;
                model.Sex = sex;
                bll.Update(model);
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        public void Add(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Personal.PersonalBase entity = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Personal.PersonalBase>(strJson);

            SfSoft.BLL.WX_Read_User bll = new SfSoft.BLL.WX_Read_User();
            SfSoft.Model.WX_Read_User model = bll.GetModel(entity.AppId, entity.OpenId);
            if (model == null)
            {
                model = new SfSoft.Model.WX_Read_User();
                model.AppId = entity.AppId;
                model.BorthDay = DateTime.Now.AddYears(-(entity.ChildAge ?? 0));
                model.ChildAge = entity.ChildAge ?? 0;
                model.OpenId = entity.OpenId;
                model.UserType = entity.UserType;
                model.RegionDate = DateTime.Now;
                model.IsAct = 1;
                bll.Add(model);

                //更新数量
                Helper.PersonalProvide.UpdateNumber(model.AppId);
            }
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