using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class UserProvide
    {
        public void Update(string userId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list= bll.GetModelList("openid='" + userId + "'");
            if (list.Count > 0) {
                var model = list.First();
                //model.nick_name
            }
        }
        public void AddUser(string userId,int? groupRelationId = 0)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list= bll.GetModelList("openid='" + userId + "'");
            if (list.Count==0) {
                var userInfo = GetUserInfo(userId);
                var groupContent = GetGroupContentInfo(groupRelationId);
                var group = GetGroup(groupContent.group_type??0);
                var model = new Model.wx_gardenia_user
                {
                    openid = userId,
                    is_act = 1,
                    profession= group.group_name,
                    create_date = DateTime.Now,
                    learn_quantity = 0,
                    class_type = groupContent.catalogue.PadLeft(3,'0'),
                    nick_name = userInfo.NickName,
                    real_name=userInfo.NickName,
                    city = userInfo.City,
                    class_no = groupContent.id.ToString(),
                    class_name = groupContent.id.ToString()+"班",
                    class_id= groupContent.id,
                };
                bll.Add(model);
            }
        }

        public void RegistUser(string userId,string groupName, string nickName, int? groupid = 0)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openid='" + userId + "'");
            if (list.Count == 0)
            {
                var userInfo = GetUserInfo(userId);
                var model = new Model.wx_gardenia_user
                {
                    openid = userId,
                    is_act = 0,
                    profession = groupName,
                    create_date = DateTime.Now,
                    learn_quantity = 0,
                    class_type ="",
                    nick_name = nickName,
                    real_name = nickName,
                    city = userInfo.City,
                    class_no = "",
                    class_name = "",
                    class_id = groupid,
                };
                bll.Add(model);
            }
        }
        private Model.WX_UserInfo GetUserInfo(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model= bll.GetModel(openId);
            return model;
        }
        public Model.WX_SGroup_Content GetGroupContentInfo(int? groupRelationId)
        {
            if (groupRelationId == null) return new Model.WX_SGroup_Content(); 
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list= bll.GetModelList("group_type=" + groupRelationId + " and is_act=1");
            if (list.Count > 0) {
                return list.First();
            }
            return new Model.WX_SGroup_Content();
        }
        private Model.WX_SGroup GetGroup(int groupId)
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            return bll.GetModel(groupId);
        }

        /// <summary>
        /// 通过班级编号找到兄弟
        /// </summary>
        /// <param name="classId">班级编号</param>
        /// <returns></returns>
        public List<dynamic> GetGroupContentList(int classId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            List<dynamic> list = new List<dynamic>();
            var model= bll.GetModel(classId);
            if (model != null) {
                var query= bll.GetModelList("group_type=" + model.group_type);
                foreach (var m in query) {
                    list.Add(new { id = m.id, text = m.class_name });
                }
            }
            return list;
        }
    }
}