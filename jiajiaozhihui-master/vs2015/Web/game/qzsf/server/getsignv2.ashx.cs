using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.Common.QCloud.Api;
using SfSoft.Common.QCloud;
using System.Security.Cryptography;
using System.Text;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// getsignv2 的摘要说明
    /// </summary>
    public class getsignv2 : IHttpHandler
    {
        const int APP_ID = 10010645;
        const string SECRET_ID = "AKIDZSwHzB8GhjdzyTvgWsbtMJmxrhjbe52K";
        const string SECRET_KEY = "ct6ciEl0wjkyf2jaH2Ra5h6xiaRPYdSK";
        const string BUCKET_NAME = "images";
        const string PICAPI_CGI_URL = "http://web.image.myqcloud.com/photos/v2/";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string sign_type = "";
            string returnResult = "";
            var expired = DateTime.Now.ToUnixTime() / 1000 + 2592000;
            string type = "";
            if (context.Request["type"] != null)
            {
                type = context.Request["type"].ToString();
            }
            string fileId = "";
            if (context.Request["fileid"] != null)
            {
                fileId = context.Request["fileid"].ToString();
            }
            switch (type)
            {
                case "sign":
                    string sign = Sign.Signature(APP_ID, SECRET_ID, SECRET_KEY, expired, BUCKET_NAME);
                    returnResult = FormatResult("0", "成功", sign, APP_ID.ToString(), BUCKET_NAME);
                    break;
                case "singone":
                    string singone = Sign.SignatureOnce(APP_ID, SECRET_ID, SECRET_KEY, BUCKET_NAME, fileId);
                    returnResult = FormatResult("0", "成功", singone, APP_ID.ToString(), BUCKET_NAME);
                    break;
            }
            context.Response.Write(returnResult);
        }
        private string FormatResult(string code, string message, string sign, string appId, string bucket)
        {
            return "{\"code\":\"" + code + "\",\"message\":\"" + message + "\",\"sign\":\"" + sign + "\",\"appid\":\"" + appId + "\",\"bucket\":\"" + bucket + "\"}";
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