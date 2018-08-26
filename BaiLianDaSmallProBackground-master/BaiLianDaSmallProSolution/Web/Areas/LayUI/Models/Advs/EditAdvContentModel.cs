using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Areas.LayUI.Models.Advs
{
    public class EditAdvContentModel
    {
        public EditAdvContentModel()
        {
            AdvContentInfoModel = new AdvContentInfoModel();
            AdvContentPicModel = new AdvContentPicModel();
            AdvContentWordModel = new AdvContentWordModel();
        }

        public AdvContentInfoModel AdvContentInfoModel { get; set; }

        public AdvContentPicModel AdvContentPicModel { get; set; }

        public AdvContentWordModel AdvContentWordModel { get; set; }
    }
}