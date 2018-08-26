using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace SfSoft.web.common
{
    public class UserOAuth
    {
        public OAuthUserInfo UserInfo = null;
        public UserOAuth(string code, string appId, string appSecret)
        {
            OAuthAccessTokenResult oauth = OAuth.GetAccessToken(appId, appSecret, code);
            UserInfo = OAuth.GetUserInfo(oauth.access_token, oauth.openid);
        }
        public UserOAuth() { }
        //public void WriteOAuthSession(OAuthUserInfo userinfo)
        //{
        //    AuthSessionItem authSessionItem = new AuthSessionItem();
        //    authSessionItem.OpenID = userinfo.openid;
        //    authSessionItem.NickNam = userinfo.nickname;
        //    authSessionItem.Sex = userinfo.sex;
        //    authSessionItem.Headimgurl = userinfo.headimgurl;

        //    SessionItem sessionItem = new SessionItem();
        //    sessionItem.Oper = Operation.Auth;
        //    sessionItem.Data = authSessionItem;
        //    WXSession.Set(userinfo.openid, sessionItem);
        //}
        //public void WriteOAuthSession(string openid)
        //{
        //    BLL.WX_HomeCard bll=new BLL.WX_HomeCard();
        //    DataSet ds=bll.GetList("openid='"+openid+"'");
        //    if(ds!=null && ds.Tables[0]!=null && ds.Tables[0].Rows.Count>0){
        //        DataRow dr = ds.Tables[0].Rows[0];
        //        AuthSessionItem authSessionItem = new AuthSessionItem();
        //        authSessionItem.OpenID = dr["OpenId"].ToString();
        //        authSessionItem.NickNam = dr["mode.NickName"].ToString();
        //        authSessionItem.Sex =int.Parse(dr["mode.Sex"].ToString());
        //        authSessionItem.Headimgurl = dr["HeadimgUrl"].ToString();

        //        SessionItem sessionItem = new SessionItem();
        //        sessionItem.Oper = Operation.Auth;
        //        sessionItem.Data = authSessionItem;
        //        WXSession.Set(openid, sessionItem);
        //    }
        //}
        //public bool IsExistOauthSession(string openid)
        //{
        //    bool result = false;
        //    SessionItem sessionItem = WXSession.Get(openid) as SessionItem;
        //    if (sessionItem != null) {
        //        result = true;
        //    }
        //    return result;
        //}

        public bool IsExistOauthDataBase(string openid)
        {
            bool result = false;
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            DataSet ds = bll.GetList("openid='" + openid + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = true;
            }
            return result;
        }

        public void Insert(OAuthUserInfo userinfo)
        {
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            Model.WX_HomeCard model = new Model.WX_HomeCard();
            model.OpenId = userinfo.openid;
            model.NickName = userinfo.nickname;
            model.Sex = userinfo.sex;
            model.CreateDate = DateTime.Now;
            model.HeadimgUrl = userinfo.headimgurl;
            model.Integral = 1500;
            model.CardId = CreateCardID();
            int row=bll.Add(model);

            //注册用户增加积分
            if (row > 0) {
                WXHelper helper = new WXHelper();
                helper.SetIntegral("register", userinfo.openid);
            }
        }
        public string CreateCardID()
        {
            string result = "";
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            DataSet ds = bll.GetList(1, "convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120)", "ID desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                string value = ds.Tables[0].Rows[0]["CardId"].ToString();
                value = value.Substring(6);
                int maxvalue = int.Parse(value) + 1;
                value = maxvalue.ToString().PadLeft(5, '0');
                result = DateTime.Now.ToString("yyMMdd") + value;
            }
            else
            {
                result = DateTime.Now.ToString("yyMMdd") + "00001";
            }
            return result;
        }
    }
    
}