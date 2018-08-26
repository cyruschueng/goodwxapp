using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BaseDatabase;
using BaseDatabase.AutoMaps;
using System.Data.Entity.Infrastructure;

namespace BaseDataBaseTest
{
    /// <summary>
    /// CreateScriptStrUnitTest 的摘要说明
    /// </summary>
    [TestClass]
    public class CreateScriptStrUnitTest
    {
        [ClassInitialize()]
        public static void MyClassInitialize(TestContext testContext)
        {
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
        }

        [TestMethod]
        public void TestMethod1()
        {
            var context = new BaseDatabaseContext();

            var script = ((IObjectContextAdapter)context).ObjectContext.CreateDatabaseScript();
            ///todo 3、 建表 第三步 生成数据库表
            Assert.IsTrue(!string.IsNullOrWhiteSpace(script));
        }
    }
}
