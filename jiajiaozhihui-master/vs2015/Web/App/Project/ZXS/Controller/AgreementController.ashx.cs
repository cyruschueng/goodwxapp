using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// AgreementController 的摘要说明
    /// </summary>
    public class AgreementController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "agreement":
                    Get(context);
                    break;
            }
        }
        private  void Get(HttpContext context)
        {
            string result = "";
            int id=int.Parse(context.Request["id"]);
            SfSoft.BLL.WX_Article_Release bll = new SfSoft.BLL.WX_Article_Release();
            SfSoft.Model.WX_Article_Release model = bll.GetModel(id);
            if (model != null)
            {
                result= model.Detail;
            }
            context.Response.Write(result);
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