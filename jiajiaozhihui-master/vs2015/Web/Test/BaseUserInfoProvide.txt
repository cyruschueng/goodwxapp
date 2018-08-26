using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class BaseUserInfoProvide : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SfSoft.web.AppStart.Lib.BaseUserInfoProvide provide = new AppStart.Lib.BaseUserInfoProvide();
            var userInfo= provide.GetUserInfo("oqmjZjh55_7kJKBAZOjwhPUiGEjc");
        }
    }
}
