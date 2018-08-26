using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.QA.provide
{
    /// <summary>
    /// Helper 的摘要说明
    /// </summary>
    public class Helper : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Dele(context);
        }
        private void Dele(HttpContext context)
        {
            string id=context.Request["id"];
            try
            {
                BLL.WX_QA_Comment bll = new BLL.WX_QA_Comment();
                bll.Delete(int.Parse(id));
            }
            catch (Exception ex) { 
                
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