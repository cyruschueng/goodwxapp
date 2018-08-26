using BaseDatabase;
using BaseDatabase.AutoMaps;
using BaseDatabase.BaseDbInstanceMangers;
using BaseDatabase.Entities.ShareLogs;
using BaseDatabase.Services.ShareLogs;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDataBaseTest.SmallPros.ShareLogs
{
    [TestClass]
    public class ShareInfoUnitTest
    {
        private readonly IShareInfoService _ShareInfoService;
        public ShareInfoUnitTest()
        {
            _ShareInfoService = BaseDbInstanceManger.GetShareInfoService();
        }

        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDbInstanceManger.RegisterType();
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void InsertShareInfo()
        {
            _ShareInfoService.Insert(new ShareInfo()
            {
                ShareUserInfoId = 1,
                ShareType = ShareType.Index,
                ShareName = "首页",
            });
        }

        [TestMethod]
        public void UpdateShareInfo()
        {
            var model = _ShareInfoService.GetLast();
            model.ShareUserInfoId = 4;
            _ShareInfoService.Update(model);
        }

        [TestMethod]
        public void RemoveShareInfo()
        {
            _ShareInfoService.RemoveAll();
        }

        [TestMethod]
        public void DeleteByShareInfoId()
        {
            var model = _ShareInfoService.GetLast();
            if (model != null)
            {
                _ShareInfoService.Delete(model.Id);
            }
        }
    }
}
