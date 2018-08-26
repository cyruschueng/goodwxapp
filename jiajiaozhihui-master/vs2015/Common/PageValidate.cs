using System;
using System.Globalization;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Data;

namespace SfSoft.Common
{
    /// <summary>
    /// 页面数据校验类


    /// 李天平


    /// 2004.8
    /// </summary>
    public class PageValidate
    {
        private static Regex RegNumber = new Regex("^[0-9]+$");
        private static Regex RegNumberSign = new Regex("^[+-]?[0-9]+$");
        private static Regex RegDecimal = new Regex("^[0-9]+[.]?[0-9]+$");//"^(-?[0-9]*[.]*[0-9]{0,3})$
        private static Regex RegDecimalSign = new Regex("^[+-]?[0-9]+[.]?[0-9]+$"); //等价于^[+-]?\d+[.]?\d+$
        private static Regex RegEmail = new Regex("^[\\w-]+@[\\w-]+\\.(com|net|org|edu|mil|tv|biz|info)$");//w 英文字母或数字的字符串，和 [a-zA-Z0-9] 语法一样 
        private static Regex RegCHZN = new Regex("[\u4e00-\u9fa5]");

        public static string DT_LDATE = "yyyy-MM-dd HH:mm";
        public static string DT_SDATE = "yyyy-MM-dd";
        public static string DT_FDATE = "yyyy-MM-dd HH:mm:ss";

        public PageValidate()
        {
        }


        #region 数字字符串检查



        /// <summary>
        /// 检查Request查询字符串的键值，是否是数字，最大长度限制


        /// </summary>
        /// <param name="req">Request</param>
        /// <param name="inputKey">Request的键值</param>
        /// <param name="maxLen">最大长度</param>
        /// <returns>返回Request查询字符串</returns>
        public static string FetchInputDigit(HttpRequest req, string inputKey, int maxLen)
        {
            string retVal = string.Empty;
            if (inputKey != null && inputKey != string.Empty)
            {
                retVal = req.QueryString[inputKey];
                if (null == retVal)
                    retVal = req.Form[inputKey];
                if (null != retVal)
                {
                    retVal = SqlText(retVal, maxLen);
                    if (!IsNumber(retVal))
                        retVal = string.Empty;
                }
            }
            if (retVal == null)
                retVal = string.Empty;
            return retVal;
        }

        public static bool IsNum(String str)
        {
            for (int i = 0; i < str.Length; i++)
            {
                if (str[i] <= '0' || str[i] >= '9')
                    return false;
            }
            return true;
        }

        /// <summary>
        /// 是否日期字符串


        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsDateTime(string strInput)
        {
            if (strInput == null || strInput.Trim() == "")
            {
                return true;
            }
            string datestr = strInput;
            string year, month, day;
            string[] c ={ "/", "-", "." };
            string cs = "";
            for (int i = 0; i < c.Length; i++)
            {
                if (datestr.IndexOf(c[i]) > 0)
                {
                    cs = c[i];
                    break;
                }

            };

            if (cs != "")
            {
                year = datestr.Substring(0, datestr.IndexOf(cs));
                if (year.Length != 4) { return false; };
                datestr = datestr.Substring(datestr.IndexOf(cs) + 1);

                month = datestr.Substring(0, datestr.IndexOf(cs));
                if ((month.Length != 2) || (Convert.ToInt16(month) > 12))
                { return false; };
                datestr = datestr.Substring(datestr.IndexOf(cs) + 1);

                day = datestr;
                if ((day.Length != 2) || (Convert.ToInt16(day) > 31)) { return false; };

                return checkDatePart(year, month, day);
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 检查年月日是否合法
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="part"></param>
        /// <returns></returns>
        private static bool checkDatePart(string year, string month, string day)
        {
            int iyear = Convert.ToInt16(year);
            int imonth = Convert.ToInt16(month);
            int iday = Convert.ToInt16(day);
            if (iyear > 2099 || iyear < 1900) { return false; }
            if (imonth > 12 || imonth < 1) { return false; }
            if (iday > DateUtil.GetDaysOfMonth(iyear, imonth) || iday < 1) { return false; };
            return true;


        }
        public static string FormatSmallDate(DateTime? dt)
        {
            if (dt == null || dt.ToString () == "")
            {
                return "";
            }

            DateTime dt1 = (DateTime)dt;
            if (dt1 != null && dt1.ToString() != "")
            {
 
                if (dt1 == DateTime.MinValue)
                {
                    return "";
                }
                else
                {
                    string yy = dt1.Year.ToString();
                    string mm = "01";
                    string dd = "01";
                    int m = dt1.Month;
                    if (m < 10)
                    {
                        mm = "0" + m.ToString();
                    }
                    else
                    {
                        mm = m.ToString();
                    }
                    int d = dt1.Day;
                    if (d < 10)
                    {
                        dd = "0" + d.ToString();
                    }
                    else
                    {
                        dd = d.ToString();
                    }
                    return yy + "-" + mm + "-" + dd;
                }
            }
            else
            {
                return "";
            }
        }

        public static string FormatDate(DateTime? dt,string strFormat)
        {
            if (dt == null)
            {
                return "";
            }
            else {
                return ((DateTime)dt).ToString(strFormat);
            }
            
        }



        public static string FormatSmallDate(string  dt)
        {
            if (dt == null || dt == "")
            {
                return "";
            }

            DateTime dt1 = (DateTime)StringToDatetime(dt);
            if (dt1 != null && dt1.ToString() != "")
            {

                if (dt1 == DateTime.MinValue)
                {
                    return "";
                }
                else
                {
                    string yy = dt1.Year.ToString();
                    string mm = "01";
                    string dd = "01";
                    int m = dt1.Month;
                    if (m < 10)
                    {
                        mm = "0" + m.ToString();
                    }
                    else
                    {
                        mm = m.ToString();
                    }
                    int d = dt1.Day;
                    if (d < 10)
                    {
                        dd = "0" + d.ToString();
                    }
                    else
                    {
                        dd = d.ToString();
                    }
                    return yy + "-" + mm + "-" + dd;
                }
            }
            else
            {
                return "";
            }
        }

        public static string FormatDateToMMDD(string dt)
        {
            if (dt == null || dt == "")
            {
                return "";
            }

            DateTime dt1 = (DateTime)StringToDatetime(dt);
            if (dt1 != null && dt1.ToString() != "")
            {

                if (dt1 == DateTime.MinValue)
                {
                    return "";
                }
                else
                {
                    string yy = dt1.Year.ToString();
                    string mm = "01";
                    string dd = "01";
                    int m = dt1.Month;
                    if (m < 10)
                    {
                        mm = "0" + m.ToString();
                    }
                    else
                    {
                        mm = m.ToString();
                    }
                    int d = dt1.Day;
                    if (d < 10)
                    {
                        dd = "0" + d.ToString();
                    }
                    else
                    {
                        dd = d.ToString();
                    }
                    return  mm + "-" + dd;
                }
            }
            else
            {
                return "";
            }
        }
        /// <summary>
        /// 字符转为日期
        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static DateTime? StringToDatetime(string inputData)
        {
            if (inputData != null && inputData.Trim() != "")
            {
                return DateTime.Parse(inputData);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 字符转为数字
        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static int? StringToInt(string inputData)
        {
            if (inputData != null && inputData.Trim() != "")
            {
                return int.Parse(inputData);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 字符转为数字
        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static decimal? StringToDecimal(string inputData)
        {
            if (inputData != null && inputData.Trim() != "")
            {
                return decimal.Parse(inputData);
            }
            else
            {
                return null;
            }
        }

         /// <summary>
        /// 是否数字字符串


        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsNumber1(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            Match m = RegNumber.Match(inputData);
            return m.Success;
        }
        public static bool IsNumber(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            try
            {
                Decimal.Parse(inputData);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }


        /// <summary>
        /// 是否数字字符串 可带正负号


        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsNumberSign(string inputData)
        {
            Match m = RegNumberSign.Match(inputData);
            return m.Success;
        }
        /// <summary>
        /// 是否是浮点数
        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsDecimal1(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            Match m = RegDecimal.Match(inputData);
            return m.Success;
        }

        public static bool IsDecimal(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            try
            {
                Decimal.Parse(inputData);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }
        /// <summary>
        /// 是否是浮点数 可带正负号


        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsDecimalSign(string inputData)
        {
            Match m = RegDecimalSign.Match(inputData);
            return m.Success;
        }

        #endregion

        #region 中文检测



        /// <summary>
        /// 检测是否有中文字符
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static bool IsHasCHZN(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            Match m = RegCHZN.Match(inputData);
            return m.Success;
        }

        #endregion

        #region 邮件地址
        /// <summary>
        /// 是否是浮点数 可带正负号


        /// </summary>
        /// <param name="inputData">输入字符串</param>
        /// <returns></returns>
        public static bool IsEmail(string inputData)
        {
            if (inputData == null || inputData.Trim() == "")
            {
                return true;
            }
            Match m = RegEmail.Match(inputData);
            return m.Success;
        }

        #endregion

        #region 其他

        /// <summary>
        /// 检查字符串最大长度，返回指定长度的串
        /// </summary>
        /// <param name="sqlInput">输入字符串</param>
        /// <param name="maxLength">最大长度</param>
        /// <returns></returns>			
        public static string SqlText(string sqlInput, int maxLength)
        {
            if (sqlInput != null && sqlInput != string.Empty)
            {
                sqlInput = sqlInput.Trim();
                if (sqlInput.Length > maxLength)//按最大长度截取字符串
                    sqlInput = sqlInput.Substring(0, maxLength);
            }
            return sqlInput;
        }
        /// <summary>
        /// 字符串编码


        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static string HtmlEncode(string inputData)
        {
            return HttpUtility.HtmlEncode(inputData);
        }
        /// <summary>
        /// 设置Label显示Encode的字符串
        /// </summary>
        /// <param name="lbl"></param>
        /// <param name="txtInput"></param>
        public static void SetLabel(Label lbl, string txtInput)
        {
            lbl.Text = HtmlEncode(txtInput);
        }
        public static void SetLabel(Label lbl, object inputObj)
        {
            SetLabel(lbl, inputObj.ToString());
        }
        //字符串清理


        public static string InputText(string inputString, int maxLength)
        {
            StringBuilder retVal = new StringBuilder();

            // 检查是否为空


            if ((inputString != null) && (inputString != String.Empty))
            {
                inputString = inputString.Trim();

                //检查长度


                if (inputString.Length > maxLength)
                    inputString = inputString.Substring(0, maxLength);

                //替换危险字符
                for (int i = 0; i < inputString.Length; i++)
                {
                    switch (inputString[i])
                    {
                        case '"':
                            retVal.Append("&quot;");
                            break;
                        case '<':
                            retVal.Append("&lt;");
                            break;
                        case '>':
                            retVal.Append("&gt;");
                            break;
                        default:
                            retVal.Append(inputString[i]);
                            break;
                    }
                }
                retVal.Replace("'", " ");// 替换单引号


            }
            return retVal.ToString();

        }
        /// <summary>
        /// 转换成 HTML code
        /// </summary>
        /// <param name="str">string</param>
        /// <returns>string</returns>
        public static string Encode(string str)
        {
            str = str.Replace("&", "&amp;");
            str = str.Replace("'", "''");
            str = str.Replace("\"", "&quot;");
            str = str.Replace(" ", "&nbsp;");
            str = str.Replace("<", "&lt;");
            str = str.Replace(">", "&gt;");
            str = str.Replace("\n", "<br>");
            return str;
        }
        /// <summary>
        ///解析html成 普通文本


        /// </summary>
        /// <param name="str">string</param>
        /// <returns>string</returns>
        public static string Decode(string str)
        {
            str = str.Replace("<br>", "\n");
            str = str.Replace("&gt;", ">");
            str = str.Replace("&lt;", "<");
            str = str.Replace("&nbsp;", " ");
            str = str.Replace("&quot;", "\"");
            return str;
        }

        #endregion

        public static string SafeLongFilter(string text, long defaultValue, char split = ',')
        {
            if (text.Trim().Length < 1)
                return defaultValue.ToString(CultureInfo.InvariantCulture);
            string[] tmpSplit = text.Split(new[] { split }, StringSplitOptions.RemoveEmptyEntries);
            if (tmpSplit.Length < 1)
                return defaultValue.ToString(CultureInfo.InvariantCulture);

            long tmp;
            for (int i = 0; i < tmpSplit.Length; i++)
            {
                if (long.TryParse(tmpSplit[i], out tmp))
                    tmpSplit[i] = tmp.ToString(CultureInfo.InvariantCulture);
                else
                    tmpSplit[i] = defaultValue.ToString(CultureInfo.InvariantCulture);
            }
            return string.Join(split.ToString(CultureInfo.InvariantCulture), tmpSplit);
        }
    }
}
