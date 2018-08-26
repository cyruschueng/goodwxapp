using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class Group
    {
        public Model.wx_habit_group GetGroup(string encryptedData,string iv,string sessionId)
        {
            var openGId = GetOpenGId(encryptedData, iv, sessionId);

            return GetGroup(openGId);

        }
        public void UpdateGroupMember(int groupId, string openId)
        {
            Task task = new Task(() =>
            {
                BLL.wx_habit_group_member bll = new BLL.wx_habit_group_member();
                var list = bll.GetModelList("openId='" + openId + "'");
                if (list.Count > 0)
                {
                    var model = list.First();
                    model.group_id = groupId;
                    bll.Update(model);
                }
                else
                {
                    var model = new Model.wx_habit_group_member()
                    {
                        group_id = groupId,
                        openid = openId
                    };
                    bll.Add(model);
                }
            });
            task.Start();
        }
        public Model.wx_habit_group GetGroup(string openGId)
        {
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var list = bll.GetModelList("group_id='" + openGId + "'");
            if (list.Count > 0)
            {
                return list.First();
            }
            return new Model.wx_habit_group();
        }
        public string GetOpenGId(string encryptedData, string iv, string sessionId)
        {
            var item = Senparc.Weixin.WxOpen.Containers.SessionContainer.TryGetItem(sessionId);
            var result = Senparc.Weixin.WxOpen.Helpers.EncryptHelper.DecodeEncryptedData(item.SessionKey, encryptedData, iv);
            

            var jobject = Newtonsoft.Json.Linq.JObject.Parse(result);
            var openGId = jobject["openGId"].ToString();

            return openGId;
        }

        public IEnumerable<Model.wx_habit_group> GetGroupList()
        {
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var list = bll.GetModelList("isnull(group_name,'')<>'' and  is_act=1");
            return list;
        }
        public IEnumerable<Model.wx_habit_group> GetGroupList(string sessionId)
        {
            var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var list = bll.GetModelList("openid='" + openId + "'");
            return list;
        }
        
        public bool ExistOpenGId(string openGId)
        {
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var row= bll.GetRecordCount("group_id='" + openGId + "'");
            return row > 0 ? true : false;
        }
        
        public void EditGroup(string encryptedData, string iv, string sessionId,string groupName )
        {
            var openGId = GetOpenGId(encryptedData, iv, sessionId);
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var list = bll.GetModelList("group_id='" + openGId + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                if (string.IsNullOrEmpty(model.group_name.Trim()))
                {
                    model.group_name = groupName;
                }
                bll.Update(model);
            }
            else
            {
                var model = new Model.wx_habit_group()
                {
                    create_date = DateTime.Now,
                    group_id = openGId,
                    group_name = groupName,
                    is_act = 1
                };
                bll.Add(model);
            }
        }
        public void AddGroup(string openGId)
        {
            var model = new Model.wx_habit_group()
            {
                create_date = DateTime.Now,
                group_id = openGId,
                group_name =string.Format("{0:群yyyyMMddhhmmss}",DateTime.Now),
                is_act = 1
            };
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            bll.Add(model);
        }
        public void UpdateGroup(int groupId,string groupName)
        {
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var model= bll.GetModel(groupId);
            model.group_name = groupName;
            bll.Update(model);
        }
        public async Task<Model.wx_habit_group> AddGroupAsync(string openGId,string sessionId)
        {
            return await Task.Run<Model.wx_habit_group>(()=> {
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                return AddGroup(openGId, openId);
            });
        }
        public Model.wx_habit_group AddGroup(string openGId, string openId)
        {
            BLL.wx_habit_group bll = new BLL.wx_habit_group();
            var list = bll.GetModelList("openid='" + openId + "' and group_id='" + openGId + "'");
            if (list.Count == 0)
            {
                var model = new Model.wx_habit_group()
                {
                    create_date = DateTime.Now,
                    group_id = openGId,
                    openid = openId,
                    group_name = string.Format("{0:群yyyyMMddhhmmss}", DateTime.Now),
                    is_act = 1
                };
                bll.Add(model);
                return model;
            }
            else {
                return list.First();
            }
        }
    }
}