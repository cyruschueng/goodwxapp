using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Areas.LayUI.Models.Menus
{
    public class MenuModel
    {
        public string Title { get; set; }

        public string Icon { get; set; }

        public string Href { get; set; }

        public bool Spread { get; set; }

        public int ModuleId { get; set; }

        public List<ChildrenMenuModel> Children { get; set; }
    }

    public class ChildrenMenuModel
    {
        public string Title { get; set; }

        public string Icon { get; set; }

        public string Href { get; set; }

        public bool Spread { get; set; }
    }
}