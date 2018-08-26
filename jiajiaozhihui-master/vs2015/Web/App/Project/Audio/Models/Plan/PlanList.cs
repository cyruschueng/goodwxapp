using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Plan
{
    public class PlanList:Audio.AudioInfo
    {
        public int PlanId { get; set; }
        public int PPCategoryId { get; set; }
        public Models.Category.CategoryInfo CategoryInfo { get; set; }
        public bool IsFavorite { get; set; }
    }
}