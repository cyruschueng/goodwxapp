using Autofac;
using Autofac.Integration.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Infrastructure;

namespace Web.InstanceMangers
{
    public class InstanceManger
    {
        private static IContainer container;

        public static void RegisterType()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<CurrentWebContext>().InstancePerLifetimeScope();
            container = builder.Build();
        }

        public static CurrentWebContext GetCurrentWebContext()
        {
            return container.Resolve<CurrentWebContext>();
        }
    }
}