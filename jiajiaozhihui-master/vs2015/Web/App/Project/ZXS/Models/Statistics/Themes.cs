using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Statistics
{
    public class Themes
    {
        public int Sn { get; set; }
        public int Weeks { get; set; }
        public bool IsOpen { get; set; }
        public bool IsOver { get; set; }
        public TaskClass TaskClass { get; set; }
        public string ThemeName { get; set; }
    }
}