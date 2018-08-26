using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class ExpertProvide
    {
        public Model.WX_JJZH_Expert GetExpert(int expertId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            return bll.GetModel(expertId);
        }
    }
}