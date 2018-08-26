using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class BagsProvide
    {
        public static List<Models.Course.Details> GetBags(int bagId)
        {
            BLL.WX_Course_Bag bll = new BLL.WX_Course_Bag();
            var bags = bll.GetModelList("BagId="+bagId.ToString());
            List<Models.Course.Details> list = new List<Models.Course.Details>();
            foreach (var bag in bags) { 
                var deails=Helper.HomeProvide.GetCourse(bag.CourseId,"");
                list.Add(deails);
            }
            return list;
        }
        public static void SetViewNumber(int bagId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model= bll.GetModel(bagId);
            if (model != null) {
                model.ReadNumber = (model.ReadNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
        public static Model.WX_Course_SetBag GetBagInfo(int bagId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model= bll.GetModel(bagId);
            if (model == null) return new Model.WX_Course_SetBag();
            return model;
        }
    }
}