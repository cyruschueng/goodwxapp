using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using BaseDatabase.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.Admins.AdvertisingSpaces
{
    public interface IAdvertisingSpaceService
    {
        void Insert(AdvertisingSpaceInfo entity);

        void Update(AdvertisingSpaceInfoModel model);

        void Delete(int id);

        AdvertisingSpaceInfoModel GetById(int id);

        void RemoveAll();

        AdvertisingSpaceInfoModel GetLast();

        IPageList<AdvertisingSpaceInfo> GetPageList(int page, int size, string title);

        IList<AdvertisingSpaceInfo> GetList();

        IList<AdvertisingSpaceInfo> GetListByKeys(List<string> signs);
    }
}
