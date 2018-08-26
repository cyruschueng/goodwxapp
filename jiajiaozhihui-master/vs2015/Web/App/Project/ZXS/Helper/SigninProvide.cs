using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class SigninProvide
    {
        public static void Add(Models.Signin.SigninInfo info)
        {
            SfSoft.BLL.WX_ZXS_Signin bll = new SfSoft.BLL.WX_ZXS_Signin();
            SfSoft.Model.WX_ZXS_Signin model = new SfSoft.Model.WX_ZXS_Signin();
            model.AppId = info.AppId;
            model.CreateDate = DateTime.Now;
            model.OpenId = info.OpenId;
            model.TaskId = info.TaskId;
            model.ThemeId = info.ThemeId;
            model.Week = info.Week;
            bll.Add(model);
        }
        public static bool IsTodayComplete(string appId, string openId, int themeId, int week, int taskId)
        {
            SfSoft.BLL.WX_ZXS_Signin bll = new SfSoft.BLL.WX_ZXS_Signin();
            int row = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and themeId=" + themeId + " and Week=" + week + " and TaskId=" + taskId + " and DATEDIFF(d,CreateDate,getdate())=0").Count;
            return row > 0 ? true : false;
        }
        public static List<SfSoft.Model.WX_ZXS_Signin> SigninList(string appId, string openId, int themeId, int week, int taskId)
        {
            SfSoft.BLL.WX_ZXS_Signin bll = new SfSoft.BLL.WX_ZXS_Signin();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and themeId=" + themeId + " and Week=" + week + " and TaskId=" + taskId);
        }
    }
}