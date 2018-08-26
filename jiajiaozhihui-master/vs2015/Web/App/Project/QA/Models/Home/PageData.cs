using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Home
{
    public class PageData
    {
        public int? PageTotal { get; set; }
        public List<UserFile> UserFileList { get; set; }
    }
}