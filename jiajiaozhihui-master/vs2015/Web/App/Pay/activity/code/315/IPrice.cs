using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxpay.Activity315
{
    public interface IPrice
    {
        int GetPrice(int number, EnumActivity315 enumActivity315);
    }
}