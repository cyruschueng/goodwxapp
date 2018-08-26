using BaseDatabase.Entities.ShareLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.ShareLogs
{
    public interface IShareInfoService
    {
        void Insert(ShareInfo entity);

        void Update(ShareInfoModel model);

        void Delete(int id);

        ShareInfoModel GetById(int id);

        void RemoveAll();

        ShareInfoModel GetLast();
    }
}
