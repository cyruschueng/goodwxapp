using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BaseDatabase;
using BaseDatabase.AutoMaps;
using BaseDatabase.Services.Admins.AdminUserInfos;
using BaseDatabase.Entities.Admins.AdminUserInfos;

namespace BaseDataBaseTest.Admins.AdminUserInfos
{
    /// <summary>
    /// AdminUserInfoUnitTest 的摘要说明
    /// </summary>
    [TestClass]
    public class AdminUserInfoUnitTest
    {
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void InsertAdminUserInfo()
        {
            var service = new AdminUserInfoService();
            service.Insert(new AdminUserInfo()
            {
                CreateOn = DateTime.Now
            });
        }

        [TestMethod]
        public void UpdateAdminUserInfo()
        {
            var service = new AdminUserInfoService();

            var model = service.GetLast();
            model.Password = "ddddd";
            service.Update(model);
        }

        [TestMethod]
        public void RemoveAdminUserInfo()
        {
            var service = new AdminUserInfoService();

            service.RemoveAll();
        }

        [TestMethod]
        public void DeleteByAdminUserInfoId()
        {
            var service = new AdminUserInfoService();
            var model = service.GetLast();
            if (model != null)
            {
                service.Delete(model.Id);
            }
        }
    }
}
