using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class WitnessProvide
    {
        public static List<SfSoft.Model.WX_ZXS_Witness> GetWitnessList(string appId, string openId, int themeId)
        {
            SfSoft.BLL.WX_ZXS_Witness bll = new SfSoft.BLL.WX_ZXS_Witness();
            return bll.GetModelList("AppId='" + appId + "' and openId='" + openId + "' and ThemeId=" + themeId);
        }
        public static List<SfSoft.Model.WX_ZXS_Witness> Add(Models.Witness.WitnessInfo entity)
        {
            if (!IsExist(entity.AppId, entity.OpenId, entity.ThemeId, entity.Witness))
            {
                SfSoft.BLL.WX_ZXS_Witness bll = new SfSoft.BLL.WX_ZXS_Witness();
                SfSoft.Model.WX_ZXS_Witness model = new SfSoft.Model.WX_ZXS_Witness();
                model.AppId = entity.AppId;
                model.CreateDate = DateTime.Now;
                model.HeadImgUrl = entity.HeadImgUrl;
                model.NickName = entity.NickName;
                model.OpenId = entity.OpenId;
                model.ThemeId = entity.ThemeId;
                model.Witness = entity.Witness;
                bll.Add(model);
            }
            return GetWitnessList(entity.AppId, entity.OpenId, entity.ThemeId);
        }
        private static bool IsExist(string appId, string openId, int themeId, string witness)
        {
            SfSoft.BLL.WX_ZXS_Witness bll = new SfSoft.BLL.WX_ZXS_Witness();
            int row = bll.GetModelList("AppId='" + appId + "' and openId='" + openId + "' and ThemeId=" + themeId + " and Witness='" + witness + "'").Count;
            return row > 0 ? true : false;
        }
    }
}