using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class LikeProvide
    {
        public static bool IsExist(string appId, string openId, int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_Like bll = new SfSoft.BLL.WX_ZXS_Like();
            var count = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and PlayerTaskId=" + playerTaskId).Count;
            return count > 0 ? true : false;
        }
        public static void Add(SfSoft.Model.WX_ZXS_Like entity)
        {
            SfSoft.BLL.WX_ZXS_Like bll = new SfSoft.BLL.WX_ZXS_Like();
            SfSoft.Model.WX_ZXS_Like model = new SfSoft.Model.WX_ZXS_Like();
            model.AppId = entity.AppId;
            model.CreateDate = DateTime.Now;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.PlayerTaskId = entity.PlayerTaskId;
            bll.Add(model);
            UpdateLikeNumber(entity.PlayerTaskId);
        }
        private static void UpdateLikeNumber(int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            SfSoft.Model.WX_ZXS_PlayerTask model = bll.GetModel(playerTaskId);
            if (model != null)
            {
                model.LikeNumber = (model.LikeNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}