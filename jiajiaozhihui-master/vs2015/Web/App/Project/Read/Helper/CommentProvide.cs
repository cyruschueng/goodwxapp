using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Read.Helper
{
    public class CommentProvide
    {
        public static void Add(SfSoft.Model.WX_Read_Comment entity)
        {
            SfSoft.BLL.WX_Read_Comment bll = new SfSoft.BLL.WX_Read_Comment();
            SfSoft.Model.WX_Read_Comment model = new SfSoft.Model.WX_Read_Comment();
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
            SfSoft.BLL.WX_Read_File bll = new SfSoft.BLL.WX_Read_File();
            SfSoft.Model.WX_Read_File model = bll.GetModel(fileId);
            if (model != null)
            {
                model.CommentNumber = (model.CommentNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}