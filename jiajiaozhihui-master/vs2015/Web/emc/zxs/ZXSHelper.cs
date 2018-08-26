using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.zxs
{
    public class ZXSHelper
    {
        public static string HZName(string value)
        {
            string result = "";
            switch (value) { 
                case "1":
                    result = "每天";
                    break;
                case "2":
                    result = "每周";
                    break;
                case "3":
                    result = "每月";
                    break;
            }
            return result;
        }
        public static string TaskTypeName(string value)
        {
            string result = "";
            switch (value)
            {
                case "1":
                    result = "上传图片";
                    break;
                case "2":
                    result = "上传音频";
                    break;
                case "3":
                    result = "上传视频";
                    break;
                case "4":
                    result = "见证";
                    break;
                case "5":
                    result = "签到";
                    break;
                case "6":
                    result = "国学练习";
                    break;
                case "7":
                    result = "背诵考核";
                    break;
                case "8":
                    result = "测试考核";
                    break;
                case "":
                    result = "无";
                    break;
            }
            return result;
        }
    }
}