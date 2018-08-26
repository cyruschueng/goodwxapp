using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace SfSoft.web.App.JiajiaoCloud
{
    public class DataSdkClient
    {
        private string Appid;
        private string Appsecret;
        private string Path;
        private string Hostname;

        private string Openid="";
        private string Oappsecret="";

        private long time;

        public DataSdkClient(string appid,string appsecret, string  path, string hostname)
        {
            Appid = appid.Trim();
            Appsecret = appsecret.Trim();
            Path = path.Trim();
            Hostname = hostname.Trim();

            if (string.IsNullOrEmpty(Appid))
            {
                throw new  Exception.DataException("access key id is empty");
            }
            if (string.IsNullOrEmpty(Appsecret))
            {
                throw new Exception.DataException("access key secret is empty");
            }
            if (string.IsNullOrEmpty(Path))
            {
                throw new Exception.DataException("Token save path are't set");
            }
            if (string.IsNullOrEmpty(Hostname))
                throw new Exception.DataException("Host name set error");
        }

        /// <summary>
        /// 设置用户
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="appsecret"></param>
        /// <returns></returns>
        public bool SetUserOpenidAndAppsecret(string openid, string appsecret)
        {
            if (string.IsNullOrEmpty(openid) || string.IsNullOrEmpty(appsecret))
                throw new Exception.DataException("openid and appsecret is empty");
            this.Openid = openid;
            this.Oappsecret = appsecret;
            return true;
        }
        /// <summary>
        /// 平台用户注册
        /// </summary>
        /// <param name="account"></param>
        public void  UserRegister( string account)
        {
            
            account = account.Trim();
            if (string.IsNullOrEmpty(account))
                throw new Exception.DataException("account is empty");

            Dictionary<string,object> dic = new Dictionary<string, object>();
            Dictionary<string, string> argement = new Dictionary<string, string>();

            this.time = Senparc.Weixin.Helpers.DateTimeHelper.GetWeixinDateTime(DateTime.Now);
            dic.Add("request_url", this.Hostname + "/oauth/user/register");
            argement.Add("Account", account);
            argement.Add("Appid", this.Appid);
            argement.Add("Sign", Senparc.Weixin.Helpers.EncryptHelper.GetMD5(this.Appid + this.Appsecret + this.time));
            argement.Add("Time",DateTime.FromFileTime(this.time).ToString());
            dic.Add("argement", argement);
            var res = Auth(dic);
            
            /*
            $params['request_url'] = $this->Hostname.'/oauth/user/register';
            $this->time = time();
            $params['argement'] = [
                'Account'=>$account,
                'Appid'=>$this->Appid,
                'Sign'=>md5($this->Appid.$this->Appsecret.$this->time),
                'Time'=>date('Y-m-d H:i:s',$this->time)
            ];
            $res = $this->auth($params);

            if (isset($res->Code) && $res->Code == 100){
                $this->setUserOpenidAndAppsecret($res->User->Openid,$res->User->Appsecret);
            }
            */
        }
        private string GetAccessToken()
        {
            if (string.IsNullOrEmpty(this.Openid))
                return "";
            var file = this.Path + Senparc.Weixin.Helpers.EncryptHelper.GetMD5(this.Appid+string.Format("yyyy-MM-dd",DateTime.Now));
            if (File.Exists(file))
            {
                var data = GetFileContents(file);
                var jobject = JObject.Parse(data);
                var t = jobject["expire_in"].ToObject<DateTime>().Subtract(DateTime.Now).Seconds;
                if (t < 30 && t > 0)
                {
                    var res = UserTokenRefresh(Openid, jobject["token"].ToObject<string>(), jobject["refresh_token"].ToObject<string>());
                    return GetAccessToken();
                }
                else if (t < 0)
                {
                    var res = GetUserToken();
                    if (jobject["Code"] != null && jobject["Code"].ToObject<int>() == 100)
                    {
                        return GetAccessToken();
                    }
                    else
                    {
                        throw new Exception.DataException("token expire");
                    }
                }
                return jobject["token"].ToObject<string>();
            }
            else
            {
                var res =UserLoginAndGetToken();
                if (res["Code"] != null && res["Code"].ToObject<int>() == 100)
                    return GetAccessToken();
            }
            throw new Exception.DataException("token are't existed");
        }
        private JObject UserTokenRefresh(string openid,string token, string refresh_token)
        {
            if ( string.IsNullOrEmpty(openid) || string.IsNullOrEmpty(token) || string.IsNullOrEmpty(refresh_token))
                throw new Exception.DataException("openid or token or refresh_token is empty");

            Dictionary<string, object> dic = new Dictionary<string, object>();
            Dictionary<string, string> argement = new Dictionary<string, string>();

            dic.Add("request_url", this.Hostname + "/oauth/user/refresh");
            argement.Add("Refresh_token", refresh_token);
            argement.Add("Sign", Senparc.Weixin.Helpers.EncryptHelper.GetMD5(openid+token+this.time));
            argement.Add("Time",DateTime.FromFileTime(this.time).ToString());
            dic.Add("argement", argement);
            var res = Auth(dic);
            if (res["Code"]!=null && res["Code"].ToObject<int>()==100){
                SetAccessToken(Openid,res["Token"].ToObject<string>(), res["Refresh_token"].ToObject<string>(), res["Expire_in"].ToObject<string>());
            }
            return res;
        }
        private bool SetAccessToken(string openid,string token,string refresh_token, string expire)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("token", token);
            dic.Add("refresh_token", refresh_token);
            dic.Add("expire_in", expire);

            if (string.IsNullOrEmpty(openid) || string.IsNullOrEmpty(token) || string.IsNullOrEmpty(refresh_token) || string.IsNullOrEmpty(expire))
                return false;

            var file = Path+ Senparc.Weixin.Helpers.EncryptHelper.GetMD5(openid+ string.Format("{0,yyyy-MM-dd}",DateTime.Now));

            StreamWriter sWriter = null;
            try
            {
                FileStream fileStream = new FileStream(file, FileMode.Create, FileAccess.Write);
                sWriter = new StreamWriter(fileStream);
                sWriter.Write((new JavaScriptSerializer()).Serialize(dic));
            }finally
            {
                if (sWriter != null)
                    sWriter.Close();
            }
            return true;
        }
        public JObject GetUserToken()
        {
            if (string.IsNullOrEmpty(Openid))
                throw new Exception.DataException("openid is empty");
            Dictionary<string, object> dic = new Dictionary<string, object>();
            Dictionary<string, string> argement = new Dictionary<string, string>();
            dic.Add("request_url", this.Hostname + "/oauth/user/token");
            argement.Add("Openid", Openid);
            argement.Add("Sign", Senparc.Weixin.Helpers.EncryptHelper.GetMD5(Openid+Oappsecret+time));
            argement.Add("Time", DateTime.FromFileTime(this.time).ToString());
            dic.Add("argement", argement);
            var res = Auth(dic);
            if (res["Code"]!=null  && res["Code"].ToObject<int>() == 100){
                SetAccessToken(Openid, res["Token"]["Token"].ToObject<string>(), res["Token"]["Refresh_token"].ToObject<string>(), res["Token"]["Expire_in"].ToObject<string>());
            }
            return res;

        }
        private JObject Auth(Dictionary<string, object> dic)
        {
            var request_url = dic.ContainsKey("request_url") ? dic["request_url"].ToString() : "";
            var argement = dic.ContainsKey("argement") ? dic["argement"] as Dictionary<string, string> : new Dictionary<string, string>();

            if (string.IsNullOrEmpty(request_url))
            {
                throw new Exception.DataException("request url is empty");
            }
            var result= Senparc.Weixin.HttpUtility.Post.PostFileGetJsonAsync<string>(request_url,null,null,argement);

            return JObject.Parse(result.Result);
        }

        private string GetFileContents(string url)
        {
            var fileStream= Senparc.Weixin.Helpers.FileHelper.GetFileStream(url);
            StreamReader reader = new StreamReader(fileStream);
            return reader.ReadToEnd();
        }
        public JObject UserLoginAndGetToken()
        {
            if (string.IsNullOrEmpty(Openid) || string.IsNullOrEmpty(Oappsecret))
                throw new Exception.DataException("openid is empty");
            this.time = Senparc.Weixin.Helpers.DateTimeHelper.GetWeixinDateTime(DateTime.Now);
            Dictionary<string, object> dic = new Dictionary<string, object>();
            Dictionary<string, string> argement = new Dictionary<string, string>();
            dic.Add("request_url", this.Hostname + "/oauth/user/login");
            argement.Add("Openid", Openid);
            argement.Add("Sign", Senparc.Weixin.Helpers.EncryptHelper.GetMD5(Openid + Oappsecret + time));
            argement.Add("Time", DateTime.FromFileTime(this.time).ToString());
            dic.Add("argement", argement);
            var res = Auth(dic);
            if (res["Code"] != null && res["Code"].ToObject<int>() == 100)
            {
                if (!SetAccessToken(Openid, res["Token"]["Token"].ToObject<string>(), res["Token"]["Refresh_token"].ToObject<string>(), res["Token"]["Expire_in"].ToObject<string>())) ;
                throw new Exception.DataException("write token file failed;");
            }
            return res;
        }
    }
}