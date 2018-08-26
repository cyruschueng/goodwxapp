using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.QA.Helper
{
    /// <summary>
    /// QAProvide 的摘要说明
    /// </summary>
    public class QAProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request["method"];
            switch (method) { 
                case "like":
                    Like(context);
                    break;
                case "top":
                    Top(context);
                    break;
            }
        }

        private void Top(HttpContext context)
        {
            var id = context.Request["id"];
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            var model= bll.GetModel(int.Parse(id));
            model.IsTop = model.IsTop == 1 ? 0 : 1;
            bll.Update(model);
            context.Response.Write(model.IsTop);
        }

        private void Like(HttpContext context)
        {
            var id = context.Request["id"];
            var number = context.Request["number"];
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            var model= bll.GetModel(int.Parse(id));
            model.LikeNumber = (model.LikeNumber ?? 0) + int.Parse(number);
            bll.Update(model);
            context.Response.Write(model.LikeNumber);
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