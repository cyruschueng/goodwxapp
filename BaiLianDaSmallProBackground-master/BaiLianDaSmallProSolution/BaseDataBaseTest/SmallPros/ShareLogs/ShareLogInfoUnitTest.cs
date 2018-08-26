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
    public class ShareLogInfoUnitTest
    {
        private readonly IShareLogInfoService _ShareLogInfoService;
        public ShareLogInfoUnitTest()
        {
            _ShareLogInfoService = BaseDbInstanceManger.GetShareLogInfoService();
        }

        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDbInstanceManger.RegisterType(); 
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void InsertShareLogInfo()
        {
            _ShareLogInfoService.Insert(new ShareLogInfo()
            {
                ShareUserInfoId = 1,
                TargetUserInfoId = 3,
                ShareType = ShareType.Index,
                ShareName = "首页",
            });
        }

        [TestMethod]
        public void UpdateShareLogInfo()
        {
            var model = _ShareLogInfoService.GetLast();
            model.TargetUserInfoId = 4;
            _ShareLogInfoService.Update(model);
        }

        [TestMethod]
        public void RemoveShareLogInfo()
        {
            _ShareLogInfoService.RemoveAll();
        }

        [TestMethod]
        public void DeleteByShareLogInfoId()
        {
            var model = _ShareLogInfoService.GetLast();
            if (model != null)
            {
                _ShareLogInfoService.Delete(model.Id);
            }
        }

        [TestMethod]
        public void GetShareNickNameById()
        {
            var model = _ShareLogInfoService.GetLast();
            if (model != null)
            {
                var nickName = _ShareLogInfoService.GetShareNickNameById(model.Id);
            }
        }
    }
}
