using BaseDatabase.Entities.UserInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.UserInfos
{
    public interface IUserInfoService
    {
        void Insert(UserInfo entity);

        void Update(UserInfoModel model);

        void Delete(int id);

        UserInfoModel GetById(int id);

        void RemoveAll();

        UserInfoModel GetLast();

        UserInfoModel GetByOpenId(string openId);
    }
}
