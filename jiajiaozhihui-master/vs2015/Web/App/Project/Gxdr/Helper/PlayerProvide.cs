using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class PlayerProvide
    {
        public static Model.WX_TestQuestion_Player GetPlayer(string openId)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            var list= bll.GetModelList("ServiceOpenID='"+openId+"'");
            if (list.Count > 0) return list.FirstOrDefault<Model.WX_TestQuestion_Player>();
            return new Model.WX_TestQuestion_Player();
        }
    }
}