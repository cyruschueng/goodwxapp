using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class HelperProvide
    {
        public Model.WX_Article_Release GetArticle(int id)
        {
            BLL.WX_Article_Release bll = new BLL.WX_Article_Release();
            return bll.GetModel(id);
        }
    }
}