using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class LearnCardProvide
    {
        public static Model.WX_Course_SetBag  GetCardCoast(int bagId)
        {
            var model = BagsProvide.GetBagInfo(bagId);
            return model;
        }
    }
}