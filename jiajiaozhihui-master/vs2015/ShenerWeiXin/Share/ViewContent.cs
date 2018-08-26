using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;

namespace ShenerWeiXin.Share
{
    public class ViewContent:IViewContent
    {
        /// <summary>
        /// 设置按钮无效
        /// </summary>
        /// <param name="control"></param>
        /// <param name="name"></param>
        public void DisabledControl(System.Web.UI.HtmlControls.HtmlControl control, string name = "")
        {
            WXHelper helper = new WXHelper();
            helper.DisabledControl(control, name);
        }
        /// <summary>
        /// 设置按钮无效
        /// </summary>
        /// <param name="control"></param>
        /// <param name="name"></param>
        public void DisabledControl(System.Web.UI.WebControls.WebControl control, string name = "")
        {
            WXHelper helper = new WXHelper();
            helper.DisabledControl(control, name);
        }
    }
}
