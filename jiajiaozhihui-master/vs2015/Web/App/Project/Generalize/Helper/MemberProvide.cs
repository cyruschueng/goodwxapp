using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Helper
{
    public class MemberProvide
    {
        public List<Model.wx_gardenia_user> GetList(int classId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("class_id="+ classId);
            return list;
        }

        public void Modify(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openId='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First();
                if (model.is_act == 0 || model.is_act==null ) { model.is_act = 1; } else { model.is_act = 0; }
                bll.Update(model);
            }
        }

        public void  Delete(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openId='" + openId + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                bll.Delete(model.id);
            }
        }
        public dynamic GetClassList(int groupId)
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            List<dynamic> values = new List<dynamic>();
            BLL.WX_SGroup_Content bllContent = new BLL.WX_SGroup_Content();
            var results = bllContent.GetModelList("group_type=" + groupId);
            foreach (var m in results)
            {
                values.Add(new
                {
                    classId = m.id,
                    className = m.title
                });
            }
            return values;
        }
    }
}