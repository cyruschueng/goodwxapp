using Newtonsoft.Json.Linq;
using Senparc.Weixin.WxOpen.Containers;
using Senparc.Weixin.WxOpen.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    /// <summary>
    /// 用户登录
    /// </summary>
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("api/login/{code}/{session_id=0}")]
        public IHttpActionResult GetJs(string code, string session_id)
        {
            var result = Senparc.Weixin.WxOpen.AdvancedAPIs.Sns.SnsApi.JsCode2Json("wx4f61727571bee0a2", "caaa0a3ccfe0b91cfcf31f955f48ad0d", code);
            string key = session_id;
            var bag = new SessionBag();
            

            if (key == "0" || key == "")
            {
                bag = SessionContainer.UpdateSession("", result.openid, result.session_key);
                key = Guid.NewGuid().ToString("N");
            }
            else 
            {
                if (SessionContainer.CheckRegistered(key)) {

                }
                bag = SessionContainer.UpdateSession(key, result.openid, result.session_key);
            }
            return Json<dynamic>(new { key = key, openid = result.openid, expireTime = bag.ExpireTime });
        }
        [HttpPost]
        [Route("api/login")]
        public IHttpActionResult Login(JObject obj /*dynamic obj*/)
        {
            var code = Convert.ToString(obj["code"]);

            var result = Senparc.Weixin.WxOpen.AdvancedAPIs.Sns.SnsApi.JsCode2Json("wx4f61727571bee0a2", "caaa0a3ccfe0b91cfcf31f955f48ad0d", code);
            if (result.errcode == Senparc.Weixin.ReturnCode.请求成功)
            {
                var sessionBag = SessionContainer.UpdateSession(null, result.openid, result.session_key);
                return Json(new { success = true, msg = "OK", sessionId = sessionBag.Key });
            }
            else {
                return Json(new { success = false, msg = result.errmsg });
            }
        }
        [HttpPost]
        [Route("api/login/check")]
        public IHttpActionResult CheckWxOpenSignature(dynamic obj)
        {
            try
            {
                var sessionId = Convert.ToString(obj.sessionId);
                var rawData = Convert.ToString(obj.rawData);
                var signature = Convert.ToString(obj.signature);

                var checkSuccess = Senparc.Weixin.WxOpen.Helpers.EncryptHelper.CheckSignature(sessionId, rawData, signature);
                return Json(new { success = checkSuccess, msg = checkSuccess ? "签名校验成功" : "签名校验失败" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }
        [HttpPost]
        [Route("api/login/decode/userinof")]
        public IHttpActionResult DecodeEncryptedData(dynamic obj)
        {
            try
            {
                var sessionId = Convert.ToString(obj.sessionId);
                var encryptedData = Convert.ToString(obj.encryptedData);
                var iv = Convert.ToString(obj.iv);
                var userInfo = Senparc.Weixin.WxOpen.Helpers.EncryptHelper.DecodeUserInfoBySessionId(
                        sessionId,
                        encryptedData, iv);

                var model = new Model.WX_UserInfo()
                {
                    City = userInfo.city,
                    EditeDate = DateTime.Now,
                    HeadImgUrl = userInfo.avatarUrl,
                    NickName = userInfo.nickName,
                    OpenId = userInfo.openId,
                    Province = userInfo.province,
                    RegistDate = DateTime.Now,
                    Sex = userInfo.gender.ToString(),
                    AppId= "wx4f61727571bee0a2"
                };
                Provide.Habit.UserInfo provide = new Provide.Habit.UserInfo();
                provide.AddUser(model);
                return Json(new { success = true, msg = "OK" });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message });
            }
        }
    }
}
