using BaseDatabase.Entities.ShareLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.ShareLogs
{
    public interface IShareLogInfoService
    {
        void Insert(ShareLogInfo entity);

        void Update(ShareLogInfoModel model);

        void Delete(int id);

        ShareLogInfoModel GetById(int id);

        void RemoveAll();

        ShareLogInfoModel GetLast();

        string GetShareNickNameById(int id);

        bool IsExists(int shareUserInfoId, int targetUserInfoId, int shareType);
    }
}
