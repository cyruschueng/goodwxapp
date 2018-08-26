using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Recite
{
    public class ReciteInfo
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int? ThemeId { get; set; }
        public string ThemeName { get; set; }
        public int? TaskId { get; set; }
        public string TaskName { get; set; }
        public int? State { get; set; }
        public string StateName { get; set; }
        public string Checker { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? CheckDate { get; set; }
    }
}