using System;
using System.Configuration;
using Newtonsoft.Json;
using System.Web;
using System.Net.Http;

namespace SfSoft.web
{
    public class JsSdkConfigProvide
    {
        public static string GetJsSdkConfig(string url)
        {
            var requestJson = JsonConvert.SerializeObject(new {  url=url});
            HttpContext httpContent = new StringContent(requestJson);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            httpContent.Handlers.
            string serverUrl = ConfigurationManager.AppSettings["AccessTokenServer"] + "JsSdkConfig";
            Uri uri = new Uri(serverUrl);
            var httpClient = new HttpClient();  
            var responseJson = httpClient.PostAsync(uri, httpContent).Result.Content.ReadAsStringAsync().Result;
            return responseJson;
        }
    }
}