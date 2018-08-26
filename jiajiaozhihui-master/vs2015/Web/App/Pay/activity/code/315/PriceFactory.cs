using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxpay.Activity315.Code
{
    public class PriceFactory
    {
        public IPrice CreatePrice(EnumActivity315 enumActivity315)
        {
            IPrice iprice;
            switch (enumActivity315)
            { 
                case EnumActivity315.Activity315:
                    iprice = new Price315();
                    break;
                case EnumActivity315.Activity9900:
                    iprice = new Price9900();
                    break;
                case EnumActivity315.Activity11900:
                    iprice = new Price11900();
                    break;
                default:
                    iprice=null;
                    break;
            }
            return iprice;
        }
    }
}