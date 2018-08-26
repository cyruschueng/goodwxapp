using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionActivityProvide
    {
        public static Model.WX_TestQuestion_Activity GetQuestionActive(int activeId)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            var model = bll.GetModel(activeId);
            if (model == null)
            {
                return new Model.WX_TestQuestion_Activity();
            }
            return model;
        }
    }
}