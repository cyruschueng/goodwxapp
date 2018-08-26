using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Helper
{
    public class LikeProvide
    {
        public static bool IsExist(string appId, string openId, int readFileId)
        {
            SfSoft.BLL.WX_Yuedu_Like bll = new SfSoft.BLL.WX_Yuedu_Like();
            var count = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and ReadFileId=" + readFileId).Count;
            return count > 0 ? true : false;
        }
        public static void Add(SfSoft.Model.WX_Yuedu_Like entity)
        {
            SfSoft.BLL.WX_Yuedu_Like bll = new SfSoft.BLL.WX_Yuedu_Like();
            SfSoft.Model.WX_Yuedu_Like model = new SfSoft.Model.WX_Yuedu_Like();
            model.AppId = entity.AppId;
            model.CreateDate = DateTime.Now;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.ReadFileId = entity.ReadFileId;
            bll.Add(model);
            UpdateLikeNumber(entity.ReadFileId??0);
        }
        private static void UpdateLikeNumber(int fileId)
        {
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            SfSoft.Model.WX_Yuedu_File model = bll.GetModel(fileId);
            if (model != null)
            {
                model.LikeNumber = (model.LikeNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}