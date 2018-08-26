using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Group.Helper
{
    public class GroupProvide
    {
        public static Model.WX_SGroup GetSGrop(int groupId)
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            return bll.GetModel(groupId);
        }
        public static Model.WX_SGroup_Content GetSGroupContent (int type,string catalogue)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list= bll.GetModelList("Group_type=" + type + " and is_act=1 and catalogue="+ catalogue);
            if (list.Count > 0) {
                var model=list[0];
                return model;
            } 
            return new Model.WX_SGroup_Content();
        }
        public static Model.WX_SGroup_Content GetSGroupContentById(int contentId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model = bll.GetModel(contentId);
            if (model!=null)
            {
                return model;
            }
            return new Model.WX_SGroup_Content();
        }
        /// <summary>
        /// 更新群成员数量
        /// </summary>
        /// <param name="model"></param>
        public static void SetGroupQuantity(Model.WX_SGroup_Content model)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            model.Quantity = (model.Quantity ?? 0) + 1;
            bll.Update(model);
        }
        /// <summary>
        /// 当前激活的群名称
        /// </summary>
        /// <returns></returns>
        public static string CurrGroupName(string groupType,string catalogue)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list = bll.GetModelList("group_type=" + groupType + " and is_act=1 and catalogue="+ catalogue);
            if (list.Count > 0)
            {
                return list[0].title;
            }
            else {
                return "";
            }
        }
    }
}