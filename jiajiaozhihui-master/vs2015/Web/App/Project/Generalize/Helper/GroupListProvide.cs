using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Helper
{
    public class GroupListProvide
    {
        public List<Model.WX_SGroup_Content> GetGroupList(int groupType)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list= bll.GetModelList("group_type="+groupType+ " and isnull(isdelete,0)=0");
            //var newlist= list.OrderByDescending(e => e.is_act).ThenBy(e => e.valid_date);
            //return newlist.ToList();
            return list;
        }
        public List<dynamic> GetNewGroupList(int groupType)
        {
            var list = GetGroupList(groupType);
            List<dynamic> newList = new List<dynamic>();
            foreach (var m in list)
            {
                newList.Add(new
                {
                    id = m.id,
                    group_type = m.group_type,
                    img_url = m.img_url,
                    title = m.title,
                    is_act = m.is_act,
                    create_date = m.create_date,
                    valid_date = m.valid_date,
                    quantity = m.Quantity,
                    isdelete = m.IsDelete,
                    usingdate = m.UsingDate,
                    catalogue = m.catalogue,
                    classname = m.class_name,
                    pass = DateTime.Now.Date.Subtract(m.valid_date.Value.Date).Days > 0 ? 1 : 0
                });
            }
            return newList;
        }
        public void ChangeGroup(int groupId,int groupType,string catalogue)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list = bll.GetModelList("group_type=" + groupType+ " and is_act=1 and catalogue="+ catalogue);
            foreach (var m in list) {
                m.is_act = 0;
                bll.Update(m);
            }
            var model= bll.GetModel(groupId);
            model.is_act = 1;
            bll.Update(model);
        }
        public void DeleteGroup(int groupId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model = bll.GetModel(groupId);
            model.IsDelete = 1;
            var t = bll.Update(model);
        }
        public Model.WX_SGroup_Content GetGroupDetail(int groupId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            return bll.GetModel(groupId);
        }

        public dynamic CheckClassName(string className)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list = bll.GetModelList("class_name='"+ className + "'");
            var exist= list.Count > 1 ? true : false;

            int v = 0;
            var isnumber= int.TryParse(className, out v);


            var isvalid = (v > 9999 || v < 1101) == true ? false : true;

            return new
            {
                exist = exist,
                is_number=isnumber,
                is_valid=isvalid
            };
        }
    }
}