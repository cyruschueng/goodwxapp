using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Text;
using System.Net;

namespace SfSoft.web.game.doublenovemberII.common.upload
{
    public class CloudClient
    {
        protected HttpClient mClient;
        public CloudClient() {
            mClient = new HttpClient();
        }
        public string Post(string url, Dictionary<string, string> header, Dictionary<string, object> body, byte[] data)
        {
            mClient.DefaultRequestHeaders.Add("accept", "*/*");
            mClient.DefaultRequestHeaders.Add("connection", "Keep-Alive");
            mClient.DefaultRequestHeaders.Add("user-agent", "qcloud-dotnet-sdk");
            if (header != null) {
                foreach(string key in header.Keys) {
                    mClient.DefaultRequestHeaders.Add(key, header[key]);
                }
            }
            if (header.ContainsKey("Content-Type") == false || header["Content-Type"].Equals("multipart/form-data")) {
                
                System.Net.Http.MultipartContent multipartContent = new MultipartContent();
                if (body != null) {
                    foreach (string key in body.Keys)
                    {
                        
                        HttpContent content = new FormUrlEncodedContent(new[]{new KeyValuePair<string,string>("","")});
                        content=new FormUrlEncodedContent(new[]{new KeyValuePair<string,string>("","")});
                        //MultipartRequestEntity
                        
                    }
                }
            }
            return "";
            

        }
    }
}