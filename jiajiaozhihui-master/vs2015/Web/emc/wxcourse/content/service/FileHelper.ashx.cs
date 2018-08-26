using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.content.service
{
    /// <summary>
    /// FileHelper 的摘要说明
    /// </summary>
    public class FileHelper : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            SetDuration(context);
        }
        public void SetDuration(HttpContext context)
        {
            try
            {
                string mp3Id = context.Request["mp3Id"];
                string duration = context.Request["duration"];
                BLL.WX_Course_Content bll = new BLL.WX_Course_Content();
                var model = bll.GetModel(int.Parse(mp3Id));
                double d = Convert.ToDouble(duration);
                int c = Convert.ToInt32(d);
                model.Duration = Convert.ToInt32(c);
                bll.Update(model);
            }
            catch (Exception ex)
            {

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