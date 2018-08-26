using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Net;

namespace SfSoft.web
{
    public class AccessTokenProvide
    {
        public static string GetAccessToken()
        {
            string serverUrl = ConfigurationManager.AppSettings["AccessTokenServer"] + "AccessToken";
            Uri uri = new Uri(serverUrl);
            WebClient webClient = new WebClient();

            string accessToken = webClient.DownloadString(uri);
            return accessToken.Replace("\"","");
        }
    }
}