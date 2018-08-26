using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Helper
{
    public class CommentProvide
    {
        public static void Add(SfSoft.Model.WX_Yuedu_Comment entity)
        {
            SfSoft.BLL.WX_Yuedu_Comment bll = new SfSoft.BLL.WX_Yuedu_Comment();
            SfSoft.Model.WX_Yuedu_Comment model = new SfSoft.Model.WX_Yuedu_Comment();
            model.AppId = entity.AppId;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.ReadFileId = entity.ReadFileId;
            model.Details = entity.Details;
            bll.Add(model);
            UpdateLikeNumber(entity.ReadFileId??0);
        }
        private static void UpdateLikeNumber(int fileId)
        {
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            SfSoft.Model.WX_Yuedu_File model = bll.GetModel(fileId);
            if (model != null)
            {
                model.CommentNumber = (model.CommentNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}