using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxpay.Activity315.Code
{
    public class Price: IPrice
    {
        public int GetPrice(int number, EnumActivity315 enumActivity315)
        {
            decimal price = 0M;
            switch (enumActivity315) { 
                case EnumActivity315.Activity315:
                    price = 3.15M;
                    break;
                case EnumActivity315.Activity9900:
                    price = 99.00M;
                    break;
                case EnumActivity315.Activity11900:
                    price = 119.00M;
                    break;
                default:
                    price = 119.00M;
                    break;
            }
            return Convert.ToInt32(Convert.ToInt32(number) * Convert.ToDecimal(price) * 100);
        }
    }
}