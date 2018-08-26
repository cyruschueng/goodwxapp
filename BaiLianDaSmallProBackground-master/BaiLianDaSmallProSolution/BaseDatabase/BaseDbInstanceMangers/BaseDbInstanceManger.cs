using Autofac;
using BaseDatabase.Services.BaseSettings;
using BaseDatabase.Services.ShareLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.BaseDbInstanceMangers
{
    public class BaseDbInstanceManger
    {
        //todo:4 、建立逻辑服务层

        private static IContainer container;

        public static void RegisterType()
        {
            var builder = new ContainerBuilder();

            #region Share

            builder.RegisterType<ShareLogInfoService>().As<IShareLogInfoService>().InstancePerLifetimeScope();

            builder.RegisterType<ShareInfoService>().As<IShareInfoService>().InstancePerLifetimeScope();

            #endregion

            #region BaseSetting

            builder.RegisterType<BaseSettingService>().As<IBaseSettingService>().InstancePerLifetimeScope();

            #endregion

            container = builder.Build();
        }

        public static IShareLogInfoService GetShareLogInfoService()
        {
            return container.Resolve<IShareLogInfoService>();
        }

        public static IBaseSettingService GetBaseSettingService()
        {
            return container.Resolve<IBaseSettingService>();
        }

        public static IShareInfoService GetShareInfoService()
        {
            return container.Resolve<IShareInfoService>();
        }

    }
}
