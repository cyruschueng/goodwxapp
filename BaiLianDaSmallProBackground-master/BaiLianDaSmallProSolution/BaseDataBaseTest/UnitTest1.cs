using System;
using System.Data.Entity.Infrastructure;
using BaseDatabase;
using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.BaseSettings;
using BaseDatabase.Entities.PayInfos;
using BaseDatabase.Entities.UserInfos;
using BaseDatabase.Services.BaseSettings;
using BaseDatabase.Services.PayInfos;
using BaseDatabase.Services.PaySettings;
using BaseDatabase.Services.UserInfos;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BaseDataBaseTest
{
    [TestClass]
    public class UnitTest1
    {
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext) {
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }


        [TestInitialize()]
         public void MyTestInitialize()
        {
           
        }

        #region UserInfo

        [TestMethod]
        public void InsertUserInfo()
        {
            var service = new UserInfoService();

            service.Insert(new UserInfo());
        }

        [TestMethod]
        public void UpdateUserInfo()
        {
            var service = new UserInfoService();
            var userinfoModel = service.GetLast();

            userinfoModel.NickName = "aaaa";

            service.Update(userinfoModel);
        }

        [TestMethod]
        public void RemoveAllUserInfo()
        {
            var service = new UserInfoService();

            service.RemoveAll();
        }

        #endregion

        #region PayInfo

        [TestMethod]
        public void InsertPayInfo()
        {
            var service = new PayInfoService();

            var userService = new UserInfoService();

            var model = userService.GetLast();

            if (model != null)
            {
                service.Insert(new PayInfo()
                {
                    UserInfoId = model.Id,
                    IsPay = false,
                    CreateOn = DateTime.Now
                });
            }
        }

        [TestMethod]
        public void UpdatePayInfo()
        {
            var service = new PayInfoService();

            var model = service.GetLast();
            model.TradeNo = "ddddd";
            service.Update(model);
        }

        [TestMethod]
        public void RemoveAllPayInfo()
        {
            var service = new PayInfoService();

            service.RemoveAll();
        }

        [TestMethod]
        public void DeleteById()
        {
            var service = new PayInfoService();
            var model = service.GetLast();
            if (model != null)
            {
                service.Delete(model.Id);
            }
        }

        #endregion

        #region BaseSetting

        [TestMethod]
        public void InsertBaseSetting()
        {
            var service = new BaseSettingService();
            service.Insert(new BaseSetting()
            { 

            });
        }

        [TestMethod]
        public void UpdateBaseSetting()
        {
            var service = new BaseSettingService();

            var model = service.GetLast();
            model.AppId = "ddddd";
            service.Update(model);
        }

        [TestMethod]
        public void RemoveBaseSetting()
        {
            var service = new BaseSettingService();

            service.RemoveAll();
        }

        [TestMethod]
        public void DeleteByBaseSettingId()
        {
            var service = new BaseSettingService();
            var model = service.GetLast();
            if (model != null)
            {
                service.Delete(model.Id);
            }
        }

        #endregion


        #region PaySetting

        [TestMethod]
        public void InsertPaySetting()
        {
            var service = new PaySettingService();
            service.Insert(new PaySetting()
            {

            });
        }

        [TestMethod]
        public void UpdatePaySetting()
        {
            var service = new PaySettingService();

            var model = service.GetLast();
            model.MchId = "ddddd";
            service.Update(model);
        }

        [TestMethod]
        public void RemovePaySetting()
        {
            var service = new PaySettingService();

            service.RemoveAll();
        }

        [TestMethod]
        public void DeleteByPaySettingId()
        {
            var service = new PaySettingService();
            var model = service.GetLast();
            if (model != null)
            {
                service.Delete(model.Id);
            }
        }

        #endregion
    }
}
