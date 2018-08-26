using BaseDatabase.Entities.UserInfos;
using BaseDatabase.Services.BaseSettings;
using BaseDatabase.Services.UserInfos;
using MyUntil;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Web.Models;
using Web.Models.Bases;
using Web.Models.Users;

namespace Web.Controllers
{
    public class BaseController : ApiController
    {
        private readonly IBaseSettingService _baseSettingService;
        private readonly IUserInfoService _userInfoService;

        public BaseController()
        {
            _baseSettingService = new BaseSettingService();
            _userInfoService = new UserInfoService();
        }

        #region openId
        [NonAction]
        private void SetErrorOpenIdModel(OpenIdModel model, string msg)
        {
            model.OpenId = string.Empty;
            model.SessionKey = string.Empty;
            model.UnionId = string.Empty;
            model.IsSuccess = false;
            model.ReturnMsg = msg;
        }

        [NonAction]
        private OpenIdModel GetOpenIdMethod(string code)
        {
            var model = new OpenIdModel();

            var updateBaseInfoModel = GetUpdateBaseInfo();
            if (updateBaseInfoModel.IsSuccess)
            {
                model.IsSuccess = updateBaseInfoModel.IsSuccess;
                model.ReturnMsg = updateBaseInfoModel.ReturnMsg;

                var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + updateBaseInfoModel.AppId + "&secret=" + updateBaseInfoModel.AppSecret + "&js_code=" + code + "&grant_type=authorization_code";
                try
                {
                    var result = RequestUtilityHelper.HttpGet(url, encoding: Encoding.UTF8, timeOut: 30000);
                    var returnResult = System.Web.Helpers.Json.Decode<OpenIdModelResultModel>(result);
                    if (string.IsNullOrEmpty(returnResult.errcode))
                    {
                        model.OpenId = returnResult.openid;
                        model.SessionKey = returnResult.session_key;
                        model.UnionId = returnResult.unionid;
                        model.IsSuccess = true;
                        model.ReturnMsg = "调用成功";
                    }
                    else
                    {
                        SetErrorOpenIdModel(model, "错误码：" + returnResult.errcode + ",错误信息：" + returnResult.errmsg);
                    }

                }
                catch (Exception ex)
                {
                    SetErrorOpenIdModel(model, ex.Message);
                }
            }
            else
            {
                SetErrorOpenIdModel(model, updateBaseInfoModel.ReturnMsg);
            }
            return model;
        }

        [HttpGet]
        public IHttpActionResult GetOpenId(string code)
        {
            var model = GetOpenIdMethod(code);
            return Json(model);
        }

        #endregion

        #region UpdateUserInfo

        [NonAction]
        private UpdateUserInfoModel UpdateUserInfoMethod(UpdateUserInfoParamModel paramModel)
        {
            var model = new UpdateUserInfoModel();
            try
            {
                var userInfo = _userInfoService.GetByOpenId(paramModel.OpenId);
                var userInfoId = 0;
                if (userInfo != null)
                {
                    userInfo.NickName = paramModel.NickName;
                    userInfo.AvatarUrl = paramModel.AvatarUrl;
                    userInfo.OpenId = paramModel.OpenId;
                    if (!string.IsNullOrEmpty(paramModel.FormId))
                    {
                        userInfo.FormId = paramModel.FormId;
                        userInfo.FormIdExpireTime = DateTime.Now.AddDays(7).AddMinutes(-2);
                    }
                    if (!string.IsNullOrEmpty(paramModel.Mobile))
                    {
                        userInfo.Mobile = paramModel.Mobile;
                    }
                    _userInfoService.Update(userInfo);
                    userInfoId = userInfo.Id;
                }
                else
                {
                    var newUserInfo = new UserInfo
                    {
                        NickName = paramModel.NickName,
                        AvatarUrl = paramModel.AvatarUrl,
                        OpenId = paramModel.OpenId
                    };
                    if (!string.IsNullOrEmpty(paramModel.FormId))
                    {
                        newUserInfo.FormId = paramModel.FormId;
                        newUserInfo.FormIdExpireTime = DateTime.Now.AddDays(7).AddMinutes(-2);
                    }
                    if (!string.IsNullOrEmpty(paramModel.Mobile))
                    {
                        newUserInfo.Mobile = paramModel.Mobile;
                    }
                    _userInfoService.Insert(newUserInfo);
                    userInfoId = newUserInfo.Id;
                }
                model.NickName = paramModel.NickName;
                model.AvatarUrl = paramModel.AvatarUrl;
                model.OpenId = paramModel.OpenId;
                model.Mobile = paramModel.Mobile;
                model.FormId = paramModel.FormId;
                model.FormIdExpireTime = !string.IsNullOrEmpty(model.FormId) ? DateTime.Now.AddDays(7).AddMinutes(-2).ToString("yyyy-MM-dd HH:mm:ss") : null;
                model.UserInfoId = userInfoId;
                model.IsSuccess = true;
                model.ReturnMsg = "更新成功";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return model;
        }

        [HttpGet]
        public IHttpActionResult UpdateUserInfo([FromUri]UpdateUserInfoParamModel paramModel)
        {
            var model = UpdateUserInfoMethod(paramModel);
            return Json(model);
        }

        #endregion

        #region BaseInfo

        [NonAction]
        private UpdateBaseInfoModel GetUpdateBaseInfo()
        {
            var model = new UpdateBaseInfoModel();
            try
            {
                var baseSetting = _baseSettingService.GetLast();
                if (baseSetting == null)
                {
                    throw new MyException(MyException.GetMyResponse(HttpStatusCode.NotImplemented,new StringContent("baseSetting is null"), "baseSetting is null"));
                }

                if (string.IsNullOrEmpty(baseSetting.AppId) || string.IsNullOrEmpty(baseSetting.AppSecret))
                {
                    throw new MyException(MyException.GetMyResponse(HttpStatusCode.NotImplemented, new StringContent("未设置appId或appSecret"), "未设置appId或appSecret"));
                }
                else
                {
                    if (!baseSetting.AccessTokenExpireTime.HasValue ||
                        baseSetting.AccessTokenExpireTime.Value < DateTime.Now)
                    {
                        var result =
                            RequestUtilityHelper.HttpGet(
                                "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
                                baseSetting.AppId + "&secret=" + baseSetting.AppSecret,
                                encoding: Encoding.UTF8, timeOut: 30000);

                        var returnResult = JsonConvert.DeserializeObject<AccessTokenHttpResultModel>(result);

                        if (returnResult.errcode != null)
                        {
                            throw new MyException(MyException.GetMyResponse(HttpStatusCode.NotImplemented, new StringContent(returnResult.errmsg), returnResult.errmsg));
                        }

                        baseSetting.AccessToken = returnResult.access_token;
                        baseSetting.AccessTokenExpireTime = DateTime.Now.AddHours(2).AddMinutes(-2);

                        _baseSettingService.Update(baseSetting);
                    }

                    model.AppId = baseSetting.AppId;
                    model.AppSecret = baseSetting.AppSecret;
                    model.AccessToken = baseSetting.AccessToken;
                    model.AccessTokenExpireTime = baseSetting.AccessTokenExpireTime == null
                        ? "2018-01-01 00:00:00"
                        : baseSetting.AccessTokenExpireTime.Value.ToString("yyyy-MM-dd HH:mm:ss");
                    model.IsSuccess = true;
                    model.ReturnMsg = "调用成功";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }
            return model;
        }

        #endregion


    }
}
