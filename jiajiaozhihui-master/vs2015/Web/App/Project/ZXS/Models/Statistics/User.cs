using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Statistics
{
    public class User
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int State { get; set; }
        public int ThemeNumber { get; set; }
        public string ThemeName { get; set; }
        public int UnOpenNumber { get; set; }
        public UserTaskClass UserTaskClass { get; set; }
    }
}