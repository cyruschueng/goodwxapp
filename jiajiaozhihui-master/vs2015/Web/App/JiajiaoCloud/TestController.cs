using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SfSoft.web.App.JiajiaoCloud
{
    [RoutePrefix("app")]
    public class TestController : ApiController
    {
        [HttpPost]
        [Route("user/register")]
        public IHttpActionResult  Register()
        {
            var appId = "3192017s1010453514f";
            var appsecret = "4188d194d0992f97036a3b6841dea1014ff8b085";
            var d = DateTime.Now;
            var time = Senparc.Weixin.Helpers.DateTimeHelper.GetWeixinDateTime(d);
            var url = "https://data.shenercloud.com/oauth/user/register";

            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("Account", "jiajiaozhihui");
            dic.Add("Appid", appId);
            dic.Add("Sign", Senparc.Weixin.Helpers.EncryptHelper.GetMD5(appId + appsecret +time));
            dic.Add("Time", string.Format("{0:yyyy-MM-dd hh:mm:ss}",d));

            var result= Senparc.Weixin.HttpUtility.Post.PostGetJson<string>(url,null,dic);
            
            return Ok(result);
        }

        private static string MD5(string sign)
        {
            byte[] textBytes = System.Text.Encoding.Default.GetBytes(sign);
            try
            {
                System.Security.Cryptography.MD5CryptoServiceProvider cryptHandler;
                cryptHandler = new System.Security.Cryptography.MD5CryptoServiceProvider();
                byte[] hash = cryptHandler.ComputeHash(textBytes);
                string ret = "";
                foreach (byte a in hash)
                {
                    if (a < 16)
                        ret += "0" + a.ToString("x");
                    else
                        ret += a.ToString("x");
                }
                return ret;
            }
            catch
            {
                throw;
            }

        }
    }
}
