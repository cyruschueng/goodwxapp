using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Filters;

namespace Web.Infrastructure
{
    [AdminAuthorize]
    public class BaseAdminWebController: Controller
    {

    }
}