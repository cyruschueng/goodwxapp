using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Infrastructure;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiHomeController : BaseAdminWebController
    {
        // GET: LayUI/LayUiHome
        public ActionResult Index()
        {
            return View();
        }
    }
}