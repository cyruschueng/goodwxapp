using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Infrastructure;
using Web.InstanceMangers;

namespace Web.Areas.Admin.Controllers
{
    public class AdminHomeController : BaseAdminWebController
    {
        private readonly CurrentWebContext _currentWebContext;

        public AdminHomeController()
        {
            _currentWebContext = InstanceManger.GetCurrentWebContext();
        }

        public ActionResult Index()
        {
            ViewBag.UserName = _currentWebContext.LoginAdminUser.UserName;
            return View();
        }
    }
}