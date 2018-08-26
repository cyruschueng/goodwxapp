using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Media
{
    public class PlayerTask
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int ThemeId { get; set; }
        public int Week { get; set; }
        public int TaskId { get; set; }
        public string Comment { get; set; }
        public string ImageMediaId { get; set; }
        public string VoiceMediaId { get; set; }
        public int UrlType { get; set; }
    }
}