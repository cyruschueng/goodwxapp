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
    public class AdvContentInfoUnitTest
    {
        private readonly IAdvContentInfoService _advContentInfoService;
        public AdvContentInfoUnitTest()
        {
            _advContentInfoService = new AdvContentInfoService();
        }

        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void InsertAdvContent()
        {
            var now = DateTime.Now;
            _advContentInfoService.Insert(new AdvContentInfo()
            {
                AdvertisingSpaceInfoSign = "e5ff2033c4724b0aa3829045f06c7161",
                Title = "测试广告内容三",
                CreateOn = DateTime.Now
            });
        }

        [TestMethod]
        public void UpdateAdvContent()
        {
            var model = _advContentInfoService.GetLast();
            model.Title = "ddddd";
            _advContentInfoService.Update(model);
        }

        [TestMethod]
        public void RemoveAdvContent()
        {
            _advContentInfoService.RemoveAll();
        }

        [TestMethod]
        public void DeleteByAdvContentId()
        {
            var model = _advContentInfoService.GetLast();
            if (model != null)
            {
                _advContentInfoService.Delete(model.Id);
            }
        }
    }
}
