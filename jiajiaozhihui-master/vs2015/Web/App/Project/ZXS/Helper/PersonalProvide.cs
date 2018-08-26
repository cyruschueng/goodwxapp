using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class PersonalProvide
    {
        public static SfSoft.Model.WX_ZXS_Players GetZxsPlayer(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static int GetPlayerCount(string appId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            return bll.GetModelList("(State=0 or State=1) and PlayerType=1 and AppId='" + appId + "'").Count;
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }

        public static DateTime GetPlayStartDate()
        {
            DayOfWeek dw = DateTime.Now.DayOfWeek;
            int day = Day(dw);
            if (DayOfWeek.Monday == dw)
            {
                return DateTime.Now;
            }
            else
            {
                int span = ((7 - day) + 1);
                return DateTime.Now.AddDays(span);
            }
        }
        public static bool IsExist(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            return bll.Exists(appId, openId);
        }
        private static int Day(DayOfWeek dw)
        {
            int day = 0;
            switch (dw)
            {
                case DayOfWeek.Friday:
                    day = 5;
                    break;
                case DayOfWeek.Monday:
                    day = 1;
                    break;
                case DayOfWeek.Saturday:
                    day = 6;
                    break;
                case DayOfWeek.Sunday:
                    day = 7;
                    break;
                case DayOfWeek.Thursday:
                    day = 4;
                    break;
                case DayOfWeek.Tuesday:
                    day = 2;
                    break;
                case DayOfWeek.Wednesday:
                    day = 3;
                    break;
            }
            return day;
        }
        public static void UpdateJoinNumber(string appId, int? playType)
        {
            SfSoft.BLL.WX_ZXS_Info bll = new SfSoft.BLL.WX_ZXS_Info();
            SfSoft.Model.WX_ZXS_Info model = bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
            if (playType == 1)
            {
                model.PothuntNumber = (model.PothuntNumber ?? 0) + 1;
            }
            else if (playType == 2)
            {
                model.JoinNumber = (model.JoinNumber ?? 0) + 1;
            }
            bll.Update(model);
        }
    }
}