using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App
{
    public class Url
    {
        static Url() {
            var serviceUrl="http://weixin.jiajiaozhihui.cn/";
            CourseUrl = new Models.Url.Course
            {
                ClientUrl = "http://courses.jiajiaozhihui.cn/",
                ServiceUrl = serviceUrl
            };
            QAUrl = new Models.Url.QA
            {
                ClientUrl = "http://qa.jiajiaozhihui.cn/",
                ServiceUrl = serviceUrl
            };
            ZXSUrl = new Models.Url.ZXS
            {
                ClientUrl = "http://zxs.jiajiaozhihui.cn/",
                ServiceUrl = serviceUrl
            };
            ParentsGTTTUrl = new Models.Url.ParentsGTTT
            {
                ClientUrl = "http://courses.jiajiaozhihui.cn/",
                ServiceUrl = serviceUrl
            };
            ServerUrl = serviceUrl;
        }
        public static string ServerUrl { get; private set; }
        /// <summary>
        /// 在线课程服务端与客户 
        /// 结尾带“/”
        /// </summary>
        public static Models.Url.Course CourseUrl { get; private set; }
        /// <summary>
        /// 专家问答服务端与客户 
        /// 结尾带“/”
        /// </summary>
        public static  Models.Url.QA QAUrl { get; private set; }
        /// <summary>
        /// 知行社服务端与客户 
        /// 结尾带“/”
        /// </summary>
        public static Models.Url.ZXS ZXSUrl { get; private set; }
        /// <summary>
        /// 父母特训营服务端与客户 
        /// 结尾带“/”
        /// </summary>
        public static Models.Url.ParentsGTTT ParentsGTTTUrl { get; private set; }
        /// <summary>
        /// 返回后面不带斜杠的Url;
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url"></param>
        /// <returns></returns>
        public static T CutUrlSlash<T>(T url) where T :Models.Url.BaseUrl
        {
            var clientUrl = url.ClientUrl;
            if (!string.IsNullOrEmpty(clientUrl)) {
                clientUrl = url.ClientUrl.Substring(0, url.ClientUrl.Length - 1);
                url.ClientUrl = clientUrl;
            }
            var serviceUrl = url.ServiceUrl;
            if (!string.IsNullOrEmpty(serviceUrl))
            {
                serviceUrl = url.ServiceUrl.Substring(0, url.ServiceUrl.Length - 1);
                url.ServiceUrl = serviceUrl;
            }
            return url;
        }
    }
}