using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace SfSoft.web.App.Helper
{
    public class WxBaseConfig
    {
        public static string AppID = ConfigurationManager.AppSettings["AgentAppID"];
        public static string AppSecret = ConfigurationManager.AppSettings["AgentAppSecret"];

        public static string GxAppID = ConfigurationManager.AppSettings["GxAppID"];
        public static string GxAppSecret = ConfigurationManager.AppSettings["GxAppSecret"];

        public static string ServerIp = ConfigurationManager.AppSettings["ServerIp"];

        public static string ZXSRedirectBaseInfoUrl = ConfigurationManager.AppSettings["ZXSRedirectBaseInfoUrl"];
        public static string ZXSRedirectUserInfoUrl = ConfigurationManager.AppSettings["ZXSRedirectUserInfoUrl"];

        public static string ReadRedirectBaseInfoUrl = ConfigurationManager.AppSettings["ReadRedirectBaseInfoUrl"];
        public static string ReadRedirectUserInfoUrl = ConfigurationManager.AppSettings["ReadRedirectUserInfoUrl"];

        public static string YueduRedirectBaseInfoUrl = ConfigurationManager.AppSettings["YueduRedirectBaseInfoUrl"];
        public static string YueduRedirectUserInfoUrl = ConfigurationManager.AppSettings["YueduRedirectUserInfoUrl"];

        public static string ParentsRedirectBaseInfoUrl = ConfigurationManager.AppSettings["ParentsRedirectBaseInfoUrl"];
        public static string ParentsRedirectUserInfoUrl = ConfigurationManager.AppSettings["ParentsRedirectUserInfoUrl"];

        public static string CourseRedirectBaseInfoUrl = ConfigurationManager.AppSettings["CourseRedirectBaseInfoUrl"];
        public static string CourseRedirectUserInfoUrl = ConfigurationManager.AppSettings["CourseRedirectUserInfoUrl"];

        public static string GCourseRedirectBaseInfoUrl = ConfigurationManager.AppSettings["GCourseRedirectBaseInfoUrl"];
        public static string GCourseRedirectUserInfoUrl = ConfigurationManager.AppSettings["GCourseRedirectUserInfoUrl"];

        public static string QuestionAnsweringRedirectBaseInfoUrl = ConfigurationManager.AppSettings["QuestionAnsweringRedirectBaseInfoUrl"];
        public static string QuestionAnsweringRedirectUserInfoUrl = ConfigurationManager.AppSettings["QuestionAnsweringRedirectUserInfoUrl"];

        public static string AudioRedirectBaseInfoUrl = ConfigurationManager.AppSettings["AudioRedirectBaseInfoUrl"];
        public static string AudioRedirectUserInfoUrl = ConfigurationManager.AppSettings["AudioRedirectUserInfoUrl"];

        /// <summary>
        /// 服务器地址
        /// </summary>
        public static string ServerUrl = ConfigurationManager.AppSettings["ServerUrl"];

        /// <summary>
        /// 服务器地址
        /// </summary>
        public static string WebSite = ConfigurationManager.AppSettings["AuthURL"];

        public static string DESEncryptKey = "shenweix";
        public static string DESEncryptIv = "18265408";

        public static string Debug = ConfigurationManager.AppSettings["debug"];
    }
}