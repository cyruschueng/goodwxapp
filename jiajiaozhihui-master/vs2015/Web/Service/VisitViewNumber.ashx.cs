using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Service
{
    /// <summary>
    /// VisitViewNumber 的摘要说明
    /// </summary>
    public class VisitViewNumber : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result=ViewNumber(context);
            context.Response.Write(result);
        }
        /// <summary>
        /// 使用GET方法设置浏览次数
        /// </summary>
        /// <param name="context"></param>
        private string  ViewNumber(HttpContext context)
        {
            string result = "";
            try
            {
                int ID = int.Parse(context.Request.QueryString["id"].ToString());
                SfSoft.BLL.WX_ActivityManage bll = new SfSoft.BLL.WX_ActivityManage();
                SfSoft.Model.WX_ActivityManage model = bll.GetModel(ID);
                if (model != null)
                {
                    if (model.ReadNumber != null)
                    {
                        model.ReadNumber += 1;
                    }
                    else
                    {
                        model.ReadNumber = 1;
                    }
                    bll.Update(model);
                }else{
                    return "error";
                }
                result = "ok";
            }
            catch (Exception ex)
            {
                
            }
            return result;
        }
        private void Write(string txt)
        {
            string filePath = System.Web.HttpContext.Current.Server.MapPath("/data/view.txt");
            System.IO.File.WriteAllText(filePath, txt);  
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