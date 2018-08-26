using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Controller
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
            int fileId = int.Parse(context.Request["fileId"]);
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            SfSoft.Model.WX_Yuedu_File model = bll.GetModel(fileId);
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