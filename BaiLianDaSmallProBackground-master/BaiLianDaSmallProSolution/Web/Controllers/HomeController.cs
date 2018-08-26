using BaseDatabase.Services.UserInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private IUserInfoService _userInfoService;
        public HomeController()
        {
            _userInfoService = new UserInfoService();
        }

        public ActionResult Index()
        {
            return new RedirectResult("/admin");
        }
    }
}