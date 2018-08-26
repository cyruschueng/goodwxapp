using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Helper
{
    public class LoginProvide
    {
        public Model.WX_SGroup Login(string accounts, string password)
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var list = bll.GetModelList("Accounts='" + accounts + "' and PassWord='" + password + "'");
            if (list.Count > 0)
            {
                return list.First();
            }
            return null;
        }
    }
}