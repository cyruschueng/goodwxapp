using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Areas.LayUI.Models
{
    public class ListSearch
    {
        public int page { get; set; }

        public int limit { get; set; }

        public int pageIndex
        {
            get
            {
                return page - 1;
            }
        }
    }
}