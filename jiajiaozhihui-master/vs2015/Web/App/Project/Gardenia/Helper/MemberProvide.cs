using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class MemberProvide
    {
        public void RegistMemberAsyn(string openId,string telephone,string realName,int childAge,string childSex,string childGrade,string city,int parentAge,string profession)
        {
            Model.wx_gardenia_user user = new Model.wx_gardenia_user()
            {
                create_date = DateTime.Now,
                is_act = 0,
                openid = openId,
                real_name = realName,
                telephone = telephone,
                child_age = childAge,
                child_sex = childSex,
                child_grade = childGrade,
                city = city,
                parent_age = parentAge,
                profession = profession
            };
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            bll.Add(user);
        }
        public bool IsRegist(string telephone, string realName) {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list= bll.GetModelList("real_name='" + realName + "' and telephone='" + telephone + "'");
            return list.Count > 0 ? true : false;
        }
        public bool IsRegist(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openId='"+openId+"'");
            return list.Count > 0 ? true : false;
        }
        public Model.wx_gardenia_user GetMember(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openId='" + openId + "'");
            if (list.Count > 0) {
                return list.First();
            }
            return null;
        }
        public int JoinClassAsyn(string openId,int groupType)
        {
            var classId = 0;
            var model = GetMember(openId);
            if (model != null)
            {
                BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
                var list = bll.GetModelList("group_type=" + groupType + " and is_act=1");
                if (list.Count > 0)
                {
                    classId = list.First().id;
                    BLL.wx_gardenia_user userBll = new BLL.wx_gardenia_user();
                    model.class_id = classId;
                    userBll.Update(model);
                }
            }
            return classId;
        }
        /// <summary>
        /// 注册习惯
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="openId"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        public Task RegistHabitAsyn(int classId,string  openId, int target)
        {

            return Task.Run(() =>
            {
                BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
                var list= bll.GetModelList("class_id=" + classId + " and data_type='everymonth'");
                if (list.Count > 0) {
                    var model = list.First();
                    Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(model.data);
                    var foreignKey = jobject["foreignKey"].ToString();
                    var appId= jobject["appId"].ToString();
                    int habitId = 0;
                    int.TryParse(foreignKey,out habitId);
                    Habit.Provide.HabitMyProvide provide = new Habit.Provide.HabitMyProvide();
                    provide.AddHabitMy(habitId, openId, target, appId);
                }
            });
        }
    }
}