using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// TopController 的摘要说明
    /// </summary>
    public class TopController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "top":
                    Post(context);
                    break;
            }
        }
        private void Post(HttpContext context)
        {
            int fileId =int.Parse(context.Request["fileId"]);
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            SfSoft.Model.WX_ZXS_PlayerTask model = bll.GetModel(fileId);
            if (model != null)
            {
                if ((model.IsTop ?? 0) == 0)
                {
                    model.IsTop = 1;
                }
                else
                {
                    model.IsTop = 0;
                }
                bll.Update(model);
            }
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