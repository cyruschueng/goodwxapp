using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace MyUntil
{
    public class PayHelper
    {
        public string GetUtf8Str(string str)
        {
            var buffer = Encoding.UTF8.GetBytes(str);

            str = Encoding.UTF8.GetString(buffer, 0, buffer.Length);

            return str;
        }

        public string GetRandomString(int codeCount)
        {
            var allChar = "1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,i,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            var allCharArray = allChar.Split(',');
            var randomCode = "";
            var temp = -1;
            var rand = new Random();
            for (var i = 0; i < codeCount; i++)
            {
                if (temp != -1)
                {
                    rand = new Random(temp * i * (int)DateTime.Now.Ticks);
                }
                var t = rand.Next(allCharArray.Length - 1);
                while (temp == t)
                {
                    t = rand.Next(allCharArray.Length - 1);
                }
                temp = t;
                randomCode += allCharArray[t];
            }

            return randomCode;
        }

        public string GetSignString(Dictionary<string, string> dic,string key)
        {
            //排序
            dic = dic.OrderBy(d => d.Key).ToDictionary(d => d.Key, d => d.Value);
            //连接字段  
            var sign = dic.Aggregate("", (current, d) => current + d.Key + "=" + d.Value + "&");
            sign += "key=" + key;
            //MD5  
            var md5 = MD5.Create();
            sign = BitConverter.ToString(md5.ComputeHash(Encoding.UTF8.GetBytes(sign))).Replace("-", null);
            return sign;
        }

        public HttpWebResponse CreatePostHttpResponse(string url, string datas, Encoding charset)
        {
            HttpWebRequest request = null;
            //HTTPSQ请求  
            ServicePointManager.ServerCertificateValidationCallback = CheckValidationResult;
            request = WebRequest.Create(url) as HttpWebRequest;
            if (request != null)
            {
                request.ProtocolVersion = HttpVersion.Version10;
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                var buffer = new StringBuilder();
                buffer.AppendFormat(datas);
                var data = charset.GetBytes(buffer.ToString());
                using (var stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                return request.GetResponse() as HttpWebResponse;
            }
            return null;
        }

        private bool CheckValidationResult(object sender, X509Certificate certificate, X509Chain chain,
            SslPolicyErrors errors)
        {
            return true; //总是接受     
        }

        public string GetTimeStamp()
        {
            var ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }

        public string GetInputStreamStr(Stream stream)
        {
            var intLen = Convert.ToInt32(stream.Length);
            var b = new byte[intLen];
            stream.Read(b, 0, intLen);
            return Encoding.UTF8.GetString(b);
        }
    }
}
