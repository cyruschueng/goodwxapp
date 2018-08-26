using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Models.File
{
    public class FileMedia
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public string Comment { get; set; }
        public string ImageMediaId { get; set; }
        public string VoiceMediaId { get; set; }
        public int FileType { get; set; }
    }
}