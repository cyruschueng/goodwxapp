using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MyUntil
{
    public class WebLogHelper
    {
        private static readonly string _logUrl = ConfigurationManager.AppSettings["LogUrl"];


        public static void WebLog(string userCode = "000001", string userName = "Admin", string loginIp = "127.0.0.1"
            , int type = 1, string operation = "普通操作", string remark = "")
        {
            try
            {
                var dic = new Dictionary<string, string>();
                dic.Add("UserCode", userCode);
                dic.Add("UserName", userName);
                dic.Add("LoginIP", loginIp);
                dic.Add("Type", type.ToString());
                dic.Add("Operation", operation);
                dic.Add("Remark", remark);
                dic.Add("DateTime", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

                var queryStr = GetQueryStr(dic);

                var response = CreatePostHttpResponse(_logUrl, queryStr, Encoding.UTF8);
                if (response != null)
                {
                    var stream = response.GetResponseStream(); //获取响应的字符串流
                    if (stream != null)
                    {
                        var sr = new StreamReader(stream); //创建一个stream读取流  
                        var str = sr.ReadToEnd();
                    }
                }
            }
            catch
            {
                
            }
        }

        public static void WebErrorLog(string msg, Exception ex = null)
        {
            var message = string.Empty;
            if (ex != null)
            {
                message = msg;

                if (ex.InnerException == null)
                {
                    message += ex.Message;
                    message += ex.StackTrace;
                    message += ex.Source;
                }

                while (ex.InnerException != null)
                {
                    ex = ex.InnerException;
                    message += "|" + ex.Message;
                }
            }
            else
            {
                message = msg;
            }
            WebLog(operation:"记录异常",remark: message);
        }

        public static void WebLog(string msg)
        {
            try
            {
                var dic = new Dictionary<string, string>();
                dic.Add("Remark", msg);
                var queryStr = GetQueryStr(dic);
                var response = CreatePostHttpResponse(_logUrl, queryStr, Encoding.UTF8);
                if (response != null)
                {
                    var stream = response.GetResponseStream(); //获取响应的字符串流
                    if (stream != null)
                    {
                        var sr = new StreamReader(stream); //创建一个stream读取流  
                        var str = sr.ReadToEnd();
                    }
                }
            }
            catch
            {
                
            }
        }

        public static string GetWebLog(int pageIndex = 0, int pageSize = 10)
        {
            var result = "";
            try
            {
                var dic = new Dictionary<string, string>();
                dic.Add("pageIndex", pageIndex.ToString());
                dic.Add("pageSize", pageSize.ToString());
                var queryStr = GetQueryStr(dic);
                result = HttpGet(_logUrl + "?" + queryStr, Encoding.UTF8);
            }
            catch
            {
                
            }
            return result;
        }

        private static string HttpGet(string url, Encoding encoding = null)
        {
            var wc = new WebClient();
            wc.Encoding = encoding ?? Encoding.UTF8;
            return wc.DownloadString(url);
        }

        private static string GetQueryStr(Dictionary<string, string> dic)
        {
            var secretDic = dic;
            secretDic.Add("timestamp", GetTimestamp());
            secretDic.Add("salt", "4454b7e8b23146c6b4f273c579aef2dd");
            var secretSourceStr = DicOrderByKeyToQueryStr(secretDic);
            var secretStr = Sha1(secretSourceStr);
            dic.Add("appKey", secretStr);
            dic.Remove("salt");
            return DicToQueryStr(dic);
        }

        private static string DicOrderByKeyToQueryStr(Dictionary<string, string> dictionary)
        {
            var list = new List<string>();
            foreach (var dic in dictionary.OrderBy(q => q.Key))
            {
                list.Add(dic.Key + "=" + dic.Value);
            }

            return string.Join("&", list);
        }

        private static HttpWebResponse CreatePostHttpResponse(string url, string datas, Encoding charset)
        {
            HttpWebRequest request = null;

            request = WebRequest.Create(url) as HttpWebRequest;
            if (request != null)
            {
                request.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)";
                request.Method = "POST";
                byte[] data = charset.GetBytes(datas);
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;
                using (Stream reqStream = request.GetRequestStream())
                {
                    reqStream.Write(data, 0, data.Length);
                    reqStream.Close();
                }
                return request.GetResponse() as HttpWebResponse;
            }
            else
            {
                return null;
            }
        }

        private static string DicToQueryStr(Dictionary<string, string> dictionary)
        {
            var list = new List<string>();
            foreach (var dic in dictionary)
            {
                list.Add(dic.Key + "=" + System.Web.HttpUtility.UrlEncode(dic.Value, Encoding.UTF8));
            }

            return string.Join("&", list);
        }

        private static string Sha1(string content)
        {
            try
            {
                SHA1 sha1 = new SHA1CryptoServiceProvider();
                byte[] bytes_in = Encoding.UTF8.GetBytes(content);
                byte[] bytes_out = sha1.ComputeHash(bytes_in);
                sha1.Dispose();
                string result = BitConverter.ToString(bytes_out);
                result = result.Replace("-", "");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("SHA1加密出错：" + ex.Message);
            }
        }

        private static string GetTimestamp()
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }
    }
}
