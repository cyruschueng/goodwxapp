using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Service.Helper.Entity.JinHua
{
    public class JinHuanInfo
    {
        public string Title { get; set; }
        public string ArticleUrl { get; set; }
        public string ImgUrl { get; set; }
        public int? Sn { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? IsHead { get; set; }
        public string Detail { get; set; }
        public int? ArticleType { get; set; }
        public DateTime? ReleaseDate { get; set; }
    }
}