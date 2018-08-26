using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class ResourceProvide
    {
        public Model.wx_source GetResource(int resourceId)
        {
            BLL.wx_source bll = new BLL.wx_source();
            return bll.GetModel(resourceId);
        }

        public List<Model.wx_source_list> GetResourceDetail(int sourceId)
        {
            BLL.wx_source_list bll = new BLL.wx_source_list();
            return  bll.GetModelList("source_id=" + sourceId);
        }
    }
    
}