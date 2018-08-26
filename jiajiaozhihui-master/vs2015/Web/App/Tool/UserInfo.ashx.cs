using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Tool
{
    /// <summary>
    /// UserInfo 的摘要说明
    /// </summary>
    public class UserInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            GetUserInfo(context);
        }

        public void GetUserInfo(HttpContext context)
        {
            string code = context.Request["code"];
            string save = context.Request["save"];

            var accessToken= Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret, code);
            var userInfo= Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accessToken.access_token, accessToken.openid);
            if (!string.IsNullOrEmpty(save))
            {
                AddUserInfo(userInfo);
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(userInfo));
        }
        private void AddUserInfo(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            if (bll.Exists(userInfo.openid)==false) {
                var model = new Model.WX_UserInfo() {
                    City = userInfo.city,
                    EditeDate = DateTime.Now,
                    HeadImgUrl = userInfo.headimgurl,
                    RegistDate = DateTime.Now,
                    IsSubscibe = 0,
                    NickName = userInfo.nickname,
                    OpenId = userInfo.openid,
                    Province = userInfo.province,
                    Sex = userInfo.sex.ToString()
                };
                bll.Add(model);
            }
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