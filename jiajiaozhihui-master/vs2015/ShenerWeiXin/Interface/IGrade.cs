using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.Interface
{
    public interface IGrade
    {
        string GetTitle(string openid);
        string GetCardName(string openid);
    }
}
