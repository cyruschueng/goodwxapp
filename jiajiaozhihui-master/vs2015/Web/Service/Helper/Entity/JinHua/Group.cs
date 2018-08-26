using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Service.Helper.Entity.JinHua
{
    public class Group
    {
        public string GroupTitle { get; set; }
        public JinHuanInfo Header { get; set; }
        public List<JinHuanInfo> Body { get; set; }

    }
}