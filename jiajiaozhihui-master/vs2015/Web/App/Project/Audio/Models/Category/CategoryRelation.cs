using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Category
{
    public class CategoryRelation:CategoryInfo
    {
        public List<CategoryInfo> SubCategory { get; set; }
    }
}