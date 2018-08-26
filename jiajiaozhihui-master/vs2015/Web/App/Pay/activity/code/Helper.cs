using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;

namespace SfSoft.web.wxpay.Activity315
{
    public  class Helper
    {
        private static readonly decimal PRICE315 = 3.15M;
        private static readonly decimal PRICE9900 = 99.00M;
        private static readonly decimal PRICE11900 = 119.00M;
        public static EnumActivity315 GetBuyState()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("select * from WX_PublicOrder where DATEPART(hh,getdate())=DATEPART(hh,OrderDate) and IsPay=1 and Price=" + PRICE315.ToString());
            sb.AppendLine("select * from WX_PublicOrder where DATEPART(hh,getdate())=DATEPART(hh,OrderDate) and IsPay=1 and Price=" + PRICE9900.ToString());

            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[1] != null)
            {
                if (ds.Tables[0].Rows.Count == 0)
                {
                    return EnumActivity315.Activity315;
                }
                else if (ds.Tables[1].Rows.Count <= 100)
                {
                    return EnumActivity315.Activity9900;
                }
                else
                {
                    return EnumActivity315.Activity11900;
                }
            }
            return EnumActivity315.Activity11900;
        }
    }
}