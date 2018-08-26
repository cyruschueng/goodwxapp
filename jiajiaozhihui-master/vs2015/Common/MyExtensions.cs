using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SfSoft.Common
{
    public static class MyExtensions
    {
        //关皱字回复
        public static bool ContainsTags(this System.String target, string o)
        {
            target=target.Replace("，", ",");
            string[] tags = target.Split(',');
            return tags.Contains<string>(o);
        }

        public static bool FuzzySearch(this System.String target, string o)
        {
            bool result = false;
            target = target.Replace("，", ",");
            string[] tags = target.Split(',');
            foreach (string tag in tags) {
                int index=o.IndexOf(tag);
                if (target == "" || tag =="") {
                    index = -1;
                }
                if (index!=-1) {
                    result = true;
                    break; 
                }
            }
            return result;
        }
        /// <summary>
        /// 转码后会出现"+"要把“+”转成Base64编辑码
        /// </summary>
        /// <param name="target"></param>
        /// <param name="o"></param>
        public static string  ConvertEncryptToBase64(this System.String target)
        {
            string result="";
            if(target!=""){
                result=target.Replace("+","%2B");
            }
            return result;
        }
        public static string ConvertBase64TocChars(this System.String target)
        {
            string result = "";
            if (target != "")
            {
                result = target.Replace("%2B", "+").Replace("%2F","/");
            }
            return result;
        }
        /// <summary>
        /// 是不是正形
        /// </summary>
        /// <param name="target"></param>
        /// <returns></returns>
        public static bool IsInteger(this System.String target)
        {
            int a = 0;
            return int.TryParse(target, out a);
        }
        
        /// <summary>
        /// 是不是数字
        /// </summary>
        /// <param name="target"></param>
        /// <returns></returns>
        public static bool IsNumber(this System.String target)
        {
            System.Text.RegularExpressions.Regex rex = new System.Text.RegularExpressions.Regex(@"^-?\d+$");
            if (rex.IsMatch(target))
            {
                return true;
            }
            else
                return false;
        }
        public static bool Isdecimals(this System.String target)
        {
            System.Text.RegularExpressions.Regex rex = new System.Text.RegularExpressions.Regex(@"^([0-9]{1,}[.][0-9]*)$");
            if (rex.IsMatch(target))
            {
                return true;
            }
            else
                return false;
        }
    }
    public class Comparers : IEqualityComparer<string>
    {
        public Comparers(string s1, string s2)
        { 
            
        }
        public bool Equals(string  s1, string  s2)
        {
            if (s1=="1")
            {
                return true;
            }
            return false;
        }

        public int GetHashCode(string  obj)
        {
            throw new NotImplementedException();
        }
    }
}
