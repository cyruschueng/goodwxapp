using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.Admins.AdminUserInfos
{
    public interface IAdminUserInfoService
    {
        void Insert(AdminUserInfo entity);

        void Update(AdminUserInfoModel model);

        void Delete(int id);

        AdminUserInfoModel GetById(int id);

        void RemoveAll();

        AdminUserInfoModel GetLast();

        IPageList<AdminUserInfo> GetPageList(int page, int size,string userName);

        bool IsExistUserName(string userName);

        AdminUserInfoModel GetByUserName(string userName);

        void SetLoginInfo(string userName, string ip);
    }
}
