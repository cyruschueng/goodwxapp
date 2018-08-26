using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// index 的摘要说明
    /// </summary>
    public class index : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request.QueryString["method"];
            string result = "";
            switch (method) { 
                case "ad":
                    result = GetAd();
                    break;
                default:
                    result = Share();
                    break;
            }
            context.Response.Write(result);
        }
        private string  Share()
        {
            BLL.WX_ActivityManage bll = new BLL.WX_ActivityManage();
            Model.WX_ActivityManage model = bll.GetModel(2);
            if (model != null) {
                if (model.ShareNumber == null)
                {
                    model.ShareNumber = 1;
                }
                else {
                    model.ShareNumber += 1;
                }
                bll.Update(model);
            }
            return "true";
        }

        private string GetAd()
        {
            SfSoft.BLL.WX_Advertisement bll = new BLL.WX_Advertisement();
            var list = bll.GetModelList("own='emc.brainsexpert' and IsAct=1");
            if (list != null) {
                return Newtonsoft.Json.JsonConvert.SerializeObject(list.OrderByDescending(e => e.CreateDate).FirstOrDefault());
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(new SfSoft.Model.WX_Advertisement());
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