using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// TakeEffectiveController 的摘要说明
    /// </summary>
    public class TakeEffectiveController : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetEffectiveDate(context);
                    break;
                case "update":
                    PostEffectiveDate(context);
                    break;
            }
        }
        public void GetEffectiveDate( HttpContext context )
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];

            Models.EffectiveDate.EffectiveDate model = new Models.EffectiveDate.EffectiveDate();
            model.AppId = appId;
            model.OpenId = openId;
            model.StartDate = Helper.PersonalProvide.GetPlayStartDate();
            model.EndDate = model.StartDate.AddYears(1);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        public void PostEffectiveDate(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];

            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = bll.GetModel(appId, openId);
            if (model != null && model.State == 0)
            {
                model.StartDate = Helper.PersonalProvide.GetPlayStartDate();
                model.EndDate = model.StartDate.Value.AddYears(1);
                model.State = 1;
                bll.Update(model);
                //更新参加人数
                //Helper.TakeEffectiveProvide.UpdateJoinNumber(appId, model.PlayerType);
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