using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Configuration;

namespace SfSoft.web.Service
{
    /// <summary>
    /// AccessTokenServer 的摘要说明
    /// </summary>
    public class AccessTokenServer : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result= GetAccessToken();
            context.Response.Write(result);
        }
        private string GetAccessToken()
        {
            string serverUrl = ConfigurationManager.AppSettings["AccessTokenServer"];
            Uri uri = new Uri(serverUrl);
            WebClient webClient = new WebClient();

            string accessToken = webClient.DownloadString(uri);
            return accessToken;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}