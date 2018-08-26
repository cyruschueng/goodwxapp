using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// personalController 的摘要说明
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
            personal.zxsPlayer = Helper.PersonalProvide.GetZxsPlayer(appId, openId);
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
            context.Response.Write(Helper.PersonalProvide.GetPlayerCount(appId));
        }
        public void Update(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            string  age =context.Request["age"];
            string tel = context.Request["tel"];
            string sex = context.Request["sex"];

            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = new SfSoft.Model.WX_ZXS_Players();
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
                model.Sex = sex;
                model.Telephone = tel;
                
                bll.Update(model);
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        
        public void Add(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Personal.PersonalBase entity = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Personal.PersonalBase>(strJson);

            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = bll.GetModel(entity.AppId, entity.OpenId);
            if (model == null)
            {
                model = new SfSoft.Model.WX_ZXS_Players();
                model.AppId = entity.AppId;
                model.BorthDay = DateTime.Now.AddYears(-(entity.ChildAge ?? 0));
                model.ChildAge = entity.ChildAge ?? 0;
                model.OpenId = entity.OpenId;
                model.PlayerType = entity.PlayerType;
                model.RegionDate = DateTime.Now;
                model.Sex = entity.Sex;
                model.Telephone = entity.Telephone;
                /*好学者加入后直接激活*/
                if (entity.PlayerType == 2)
                {
                    model.State = 1;
                    model.StartDate = Helper.PersonalProvide.GetPlayStartDate();
                    model.EndDate = model.StartDate.Value.AddYears(1);
                }
                else {
                    model.State = 0;
                }
                bll.Add(model);

                //更新数量
                Helper.PersonalProvide.UpdateJoinNumber(model.AppId, model.PlayerType);
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