using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using SfSoft.BLL;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.DBUtility;
using SfSoft.Common;
using YYControls;
using System.Threading;
using System.IO;

namespace SfSoft.SfEmc
{
    public class Tools
    {
        /**
         * 初始化基础数据下拉列表的值



         * @param ddlList 
         * @param ds
         * @param dValue
         * @param dName
         * @Date:  2008-08-11
         */
        public static void fillDropDownList(DropDownList ddlList,string colValueName,string colName,
             DataSet ds,string currSelValue,bool isAddDefault)
        {
            DataView dv = new DataView(ds.Tables[0]);
            ddlList.DataSource = dv;
            ddlList.DataTextField = colName;
            ddlList.DataValueField = colValueName;
            ddlList.DataBind();
            if (isAddDefault)
            {
                ListItem defaultItem = new ListItem();
                defaultItem.Value = "-9999";
                defaultItem.Text = "全部";
                ddlList.Items.Add(defaultItem);
            }
            if (currSelValue != "")
            {
                ListItem item = ddlList.Items.FindByValue(currSelValue);
                if(item!=null){
                    item.Selected = true;
                }
            }
        }

        /**
         * 增加缺省值



         * @param strText
         * @param strValue
         * @param isSelected  是否选中
         * @Date:  2008-08-11
         */
        public static void AddDefaultItem(DropDownList ddlList, string strText,string strValue,bool isSelected)
        {
            if (ddlList.Items.FindByValue(strValue)==null)
            {
               ListItem defaultItem = new ListItem();
               defaultItem.Value = strValue;
               defaultItem.Text = strText;
               ddlList.Items.Add(defaultItem);
            }
            if (isSelected)
            {
                ddlList.Items.FindByValue(strValue).Selected = true; 
            }
        }


        /**
         * 初始化基础数据下拉列表的值



         * @param ddlList 
         * @param ds
         * @param dValue
         * @param dName
         * @Date:  2008-08-11
         */
        public static void SetDownLisSeleted(DropDownList ddlList, string sValue)
        {
            ListItem item = ddlList.Items.FindByValue(sValue);
            if (item != null)
            {
                ddlList.ClearSelection();
                item.Selected = true;
            }
        }

        /**
         * 当前日期
         * @Date:  2008-08-11
         */
        public static string GetCurrDate()
        {
            return PageValidate.FormatSmallDate(DateTime.Now);
        }
        /**
         * 当月第一天



         * @Date:  2008-08-11
         */
        public static string GetCurrMonthFristDay()
        {
            DateTime dt = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            return PageValidate.FormatSmallDate(dt);
        }

        /**
         * 计算折旧价格
         * 
         * 按原值的5%提取残值，（原值-残值）/5/12就是一月的折旧费 
         * 比如：资产是10000 残值 是500 ，月折旧金额=(10000-500)/(5年* 12 个月)
         *  每个资产的折旧年限都不一样的。



         * @Date:  2008-08-11
         */
        public static decimal CalcDepCost(decimal OrignCost,int iDepYear,decimal dRate,DateTime dUseDate)
        {
            decimal fValue = 0;
            if (dUseDate.AddYears(iDepYear) < DateTime.Now)
            {
                fValue = 0; 
            }
            else 
            {
                DateTime nowDate = DateTime.Now;
                int iDepMonth = (nowDate.Year - dUseDate.Year) * 12 + (nowDate.Month - dUseDate.Month);
                if ((nowDate.Day - dUseDate.Day)<0)
                {
                    iDepMonth = iDepMonth -1;
                }

                if (iDepMonth <= 0)
                {
                    fValue = OrignCost;
                }
                else 
                {
                    fValue = OrignCost - iDepMonth * (OrignCost - OrignCost * dRate) /(iDepYear*12);                    
                }
            }
            if (fValue < 0)
            {
                fValue = 0;
            }
            else if (fValue > OrignCost)
            {
                fValue = OrignCost;
            }
            return Math.Round(fValue, 2); 
        }

        public static bool IsDecimal(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            try {
                Decimal.Parse(inputData);
                return true;
            } catch (Exception ex)
            {
                return false;
            }
        }


        /**
         * 根据给定的长度截取


         * 2008-12-20
         */ 
        public static string FormatString(string sText,int iSize) 
        {
            if (sText.Length < iSize)
            {
                return sText;
            }
            else {
                return sText.Substring(0, iSize)+"...";
            }   
          
        }


        /**
         * 检查IP地址
         * @param IP 
         * @param isIgnoreEmp 是否忽略空 
         * 2008-12-20
         */
        public static bool CheckIPAddress(string IP,bool isIgnoreEmp)
        {
            if (isIgnoreEmp)
            {
                if (IP==null || IP=="")
                {
                    return true;
                }
            }
            string pattern = @"(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))";
            System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex(pattern);
            if (regex.Match(IP).Success)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /**
         * 返回间隔天数
         * @strBeginDate 开始日期  格式 2009-01-02
         * @strBeginTime 时间      格式  09：15
         * @strEndDate 开始日期  格式 2009-01-02
         * @strEndTime 时间      格式  09：15
         * @dHoursDay  每天工作小时数      
         * 2009-03-05
         */
        public static double CalcDays(string strBeginDate, string strBeginTime, string strEndDate, string strEndTime, double dHoursDay)
        {
             double dResult=0.0;
             double dDays =0;
             double dDayHour = 0;
             DateTime dBeginDate = Convert.ToDateTime(strBeginDate);
             DateTime dEndDate = Convert.ToDateTime(strEndDate);
             TimeSpan ts = dEndDate - dBeginDate;
             double dTemp = ts.TotalDays;
             dDays = dTemp;
            
             if (dTemp>=1)
             {
                 DateTime dTempBegin = Convert.ToDateTime(strBeginDate + " " + strBeginTime);
                 DateTime dTempEnd = Convert.ToDateTime(strBeginDate + " " + strEndTime);
                 DateTime dTempPMBegin = Convert.ToDateTime(strBeginDate + "  08:00" );
                 DateTime dTempPMEnd = Convert.ToDateTime(strBeginDate + "  18:00" );
                 TimeSpan ts1 = dTempEnd - dTempPMBegin;

                 if (dTempEnd > dTempBegin)
                 {
                     dDayHour = ts1.TotalHours / dHoursDay;
                     if (dDayHour > 1)
                     {
                         dDayHour = 1;
                     }
                  }
                 else {
                     dDayHour = 1+ts1.TotalHours / dHoursDay;
                     dDays = dDays - 1;
                 }
 
             }
             else { //按照日期相等处理
                 dBeginDate = Convert.ToDateTime(strBeginDate + " " + strBeginTime);
                 dEndDate = Convert.ToDateTime(strBeginDate + " " + strEndTime);
                 ts = dEndDate - dBeginDate;
                 double dHoures = ts.TotalHours;
                 if (dHoures >= dHoursDay)
                 {
                     dDayHour = 1;
                 }
                 else {
                     dDayHour = dHoures / dHoursDay;
                 }
             
             }
             dResult = Math.Round((dDays + dDayHour), 2); 
             return dResult;
        }

        public  static object CreateObject(object objType, string CacheKey)
        {
            object objType1 = DataCache.GetCache(CacheKey);
            if (objType1 == null)
            {
                try
                {
                   
                    DataCache.SetCache(CacheKey, objType);
                }
                catch//(System.Exception ex)
                {
                    //string str=ex.Message;//  
                }
            }
            return objType1;
        }
    }
}
