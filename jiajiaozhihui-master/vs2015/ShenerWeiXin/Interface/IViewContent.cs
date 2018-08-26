using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.Interface
{
    public  interface IViewContent
    {
        /// <summary>
        /// 设置控件无效
        /// </summary>
        /// <param name="button"></param>
        void DisabledControl(System.Web.UI.HtmlControls.HtmlControl control, string name = "");
        /// <summary>
        /// 设置控件无效
        /// </summary>
        /// <param name="button"></param>
        void DisabledControl(System.Web.UI.WebControls.WebControl control, string name = "");
    }
}
