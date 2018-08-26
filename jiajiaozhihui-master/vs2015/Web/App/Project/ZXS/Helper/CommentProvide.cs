using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class CommentProvide
    {
        public static void Add(SfSoft.Model.WX_ZXS_Comment entity)
        {
            SfSoft.BLL.WX_ZXS_Comment bll = new SfSoft.BLL.WX_ZXS_Comment();
            SfSoft.Model.WX_ZXS_Comment model = new SfSoft.Model.WX_ZXS_Comment();
            model.AppId = entity.AppId;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.PlayerTaskId = entity.PlayerTaskId;
            model.Details = entity.Details;
            bll.Add(model);
            UpdateLikeNumber(entity.PlayerTaskId);
        }
        private static void UpdateLikeNumber(int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            SfSoft.Model.WX_ZXS_PlayerTask model = bll.GetModel(playerTaskId);
            if (model != null)
            {
                model.CommentNumber = (model.CommentNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}