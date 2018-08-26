using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using BaseDatabase;
using BaseDatabase.AutoMaps;
using Web.InstanceMangers;
using BaseDatabase.BaseDbInstanceMangers;

namespace Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            BaseDbInstanceManger.RegisterType();
            InstanceManger.RegisterType();
            // 在应用程序启动时运行的代码
            BaseDatabaseConfig.SetDbInfo();
            AutoMapConfig.CreateMaps();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);            
        }
    }
}