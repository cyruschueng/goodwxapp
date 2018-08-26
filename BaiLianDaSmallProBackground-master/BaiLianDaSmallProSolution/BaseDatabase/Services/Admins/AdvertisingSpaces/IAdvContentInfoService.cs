using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using BaseDatabase.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.Admins.AdvertisingSpaces
{
    public interface IAdvContentInfoService
    {
        void Insert(AdvContentInfo entity);

        void Update(AdvContentInfoModel model);

        void Delete(int id);

        AdvContentInfoModel GetById(int id);

        void RemoveAll();

        AdvContentInfoModel GetLast();

        IPageList<AdvContentInfo> GetPageList(int page, int size, string contentJsonKeyword, string advertisingSpaceInfoSign);
    }
}
