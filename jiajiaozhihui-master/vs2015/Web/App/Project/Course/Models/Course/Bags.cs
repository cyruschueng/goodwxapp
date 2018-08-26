using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class Bags
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        public string MiniImgUrl { get; set; }
        public int MediaType { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal PreferentialPrice { get; set; }
        public bool IsBuy { get; set; }
        public int? ReadNumber { get; set; }
        public Model.WX_JJZH_Expert Expert { get; set; }
    }
}