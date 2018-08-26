using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class Unify
    {
        public static string GetPlayerTypeName(int type)
        {
            string result = "";
            switch (type)
            {
                case 1:
                    result = "挑战者";
                    break;
                case 2:
                    result = "好学者";
                    break;
            }
            return result;
        }
    }
}