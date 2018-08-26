using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Areas.LayUI.Models
{
    public class BaseReturnModel
    {
        public bool IsSuccess { get; set; }

        public string ReturnMsg { get; set; }
    }
}