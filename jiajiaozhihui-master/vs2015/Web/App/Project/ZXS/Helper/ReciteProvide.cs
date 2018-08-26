using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class ReciteProvide
    {
        public static List<Models.Recite.ReciteInfo> GetRecites(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_ApplyRecite bll = new SfSoft.BLL.WX_ZXS_ApplyRecite();
            var list = bll.GetModelList("AppId='" + appId + "' and openId='" + openId + "'");
            List<Models.Recite.ReciteInfo> reciteInfos = new List<Models.Recite.ReciteInfo>();
            foreach (var model in list)
            {
                reciteInfos.Add(new Models.Recite.ReciteInfo()
                {
                    AppId = model.AppId,
                    OpenId = model.OpenId,
                    CheckDate = model.CheckDate,
                    Checker = model.Checker,
                    CreateDate = model.CreateDate,
                    State = model.State,
                    StateName = GetStateName(model.State),
                    TaskId = model.TaskId,
                    TaskName = GetTaskName(model.TaskId),
                    ThemeId = model.ThemeId,
                    ThemeName = GetThemeName(model.ThemeId)
                });
            }
            return reciteInfos;
        }
        public static SfSoft.Model.WX_ZXS_ApplyRecite Add(SfSoft.Model.WX_ZXS_ApplyRecite info)
        {
            if (IsExistUndo(info) == false)
            {
                SfSoft.BLL.WX_ZXS_ApplyRecite bll = new SfSoft.BLL.WX_ZXS_ApplyRecite();
                SfSoft.Model.WX_ZXS_ApplyRecite model = new SfSoft.Model.WX_ZXS_ApplyRecite();
                model.AppId = info.AppId;
                model.CreateDate = DateTime.Now;
                model.OpenId = info.OpenId;
                model.State = 0;
                model.TaskId = info.TaskId;
                model.ThemeId = info.ThemeId;
                bll.Add(model);
                return model;
            }
            return new SfSoft.Model.WX_ZXS_ApplyRecite();
        }
        private static string GetStateName(int? state)
        {
            string result = "";
            switch (state)
            {
                case 0:
                    result = "正在审核中";
                    break;
                case 1:
                    result = "审核通过";
                    break;
                case 2:
                    result = "审核未通过";
                    break;
            }
            return result;
        }
        private static string GetTaskName(int? taskId)
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            SfSoft.Model.WX_ZXS_Task model = bll.GetModel(taskId ?? 0);
            if (model != null && model.Title != null)
            {
                return model.Title;
            }
            return "";
        }
        private static string GetThemeName(int? themeId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            SfSoft.Model.WX_ZXS_Theme model = bll.GetModel(themeId ?? 0);
            if (model != null && model.Title != null)
            {
                return model.Title;
            }
            return "";
        }
        private static bool IsExistUndo(SfSoft.Model.WX_ZXS_ApplyRecite model)
        {
            SfSoft.BLL.WX_ZXS_ApplyRecite bll = new SfSoft.BLL.WX_ZXS_ApplyRecite();
            var list = bll.GetModelList("AppId='" + model.AppId + "' and openId='" + model.OpenId + "' and ThemeId=" + model.ThemeId + " and TaskId=" + model.TaskId + "");
            return list.Where(e => e.State == 0).Count() > 0 ? true : false;
        }
    }
}