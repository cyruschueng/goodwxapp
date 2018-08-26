using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Helper
{
    public class Common
    {
        public static int TotalPage(int recordNumber, int pageSize)
        {
            pageSize = pageSize == 0 ? 10 : pageSize;
            var n = recordNumber / pageSize;
            var j = recordNumber % pageSize;
            return  n + (j > 0 ? 1 : 0);
        }
    }
}