using BaseDatabase;
using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using BaseDatabase.Services.Admins.AdvertisingSpaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDataBaseTest.Admins.AdvertisingSpaces
{
    [TestClass]
    public class AdvertisingSpaceInfoUnitTest
    {
        private readonly IAdvertisingSpaceService _advertisingSpaceService;
        public AdvertisingSpaceInfoUnitTest()
        {
            _advertisingSpaceService = new AdvertisingSpaceService();
        }
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void InsertAdvertisingSpace()
        {
            _advertisingSpaceService.Insert(new AdvertisingSpaceInfo()
            {
                CreateOn = DateTime.Now
            });
        }

        [TestMethod]
        public void UpdateAdvertisingSpace()
        {
            var model = _advertisingSpaceService.GetLast();
            model.Title = "ddddd";
            _advertisingSpaceService.Update(model);
        }

        [TestMethod]
        public void RemoveAdvertisingSpace()
        {
            _advertisingSpaceService.RemoveAll();
        }

        [TestMethod]
        public void DeleteByAdvertisingSpaceId()
        {
            var model = _advertisingSpaceService.GetLast();
            if (model != null)
            {
                _advertisingSpaceService.Delete(model.Id);
            }
        }

    }
}
