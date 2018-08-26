using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class AdvProvide
    {
        public static IEnumerable<SfSoft.Model.WX_Advertisement> GetAdv()
        {
            SfSoft.BLL.WX_Advertisement bll = new SfSoft.BLL.WX_Advertisement();
            return bll.GetModelList("Own='emc.qa' and IsAct=1").OrderBy(e => e.Positions).Take(3);
        }
        public static SfSoft.Model.WX_Advertisement GetAdvById(int id)
        {
            SfSoft.BLL.WX_Advertisement bll = new SfSoft.BLL.WX_Advertisement();
            return bll.GetModel(id);
        }
    }
}