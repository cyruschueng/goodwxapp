using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Project.Gxdr.Helper
{
    public class ActivityProvide
    {
        public IEnumerable<Model.WX_TestQuestion_Activity> GetActivity(string appId)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            return bll.GetModelList("AppId='"+ appId + "' and IsAct=1");
        }
    }
}