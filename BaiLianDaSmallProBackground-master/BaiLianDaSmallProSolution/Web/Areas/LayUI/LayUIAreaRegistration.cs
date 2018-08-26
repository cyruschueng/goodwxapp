using System.Web.Mvc;

namespace Web.Areas.LayUI
{
    public class LayUIAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "LayUI";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "adminLogin",
                "admin/login",
                new { controller = "LayUiAdminLogin", action = "Login" },
                new[] { "Web.Areas.LayUI.Controllers" }
            );

            context.MapRoute(
                "LayUI_default",
                "LayUI/{controller}/{action}/{id}",
                new { controller = "LayUiHome", action = "Index", id = UrlParameter.Optional },
                new [] { "Web.Areas.LayUI.Controllers" }
            );
        }
    }
}