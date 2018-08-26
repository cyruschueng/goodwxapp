using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using Weixin.Service.Order.Entity;
using Weixin.Service.Entity;

namespace Weixin.Service.Helper
{
    public class CommHelper
    {
        /// <summary>
        /// 获取不同的微信公众号信息
        /// </summary>
        /// <param name="weixinid"></param>
        /// <returns></returns>
        public static SfSoft.Model.WX_WeiXinAccounts GetWeiXinAccounts(string weixinid)
        {
            SfSoft.BLL.WX_WeiXinAccounts bll = new SfSoft.BLL.WX_WeiXinAccounts();
            SfSoft.Model.WX_WeiXinAccounts model = bll.GetModelByWeiXinID(weixinid);
            if (model != null)
            {
                return model;
            }
            else
            {
                model = new SfSoft.Model.WX_WeiXinAccounts();
                model.AppID = WXConfig.appId;
                model.AppSect = WXConfig.appSecret;
                model.WeiXinID = WXConfig.WeiXinID;
                model.WeiXinName = "家教智慧";
                return model;
            }
        }
        /// <summary>
        /// 检查Reflesh有没有过期
        /// </summary>
        /// <param name="weixinid"></param>
        /// <returns>如果返回值是空的就已失效，如果不是就是有效</returns>
        public static string  GetAuthExpires(string weixinid)
        {
            AuthExpires(weixinid);
            int spantime = DateTime.Now.Subtract(_refleshAuth.GetTokenDate).Seconds;
            if (spantime > _refleshAuth.ExpireshIn)
            {
                return "";
            }
            else
            {
                return _refleshAuth.RefreshToken;
            }
        }
        private static RefleshAuth _refleshAuth = null;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="weixinid"></param>
        /// <param name="refresh"></param>
        /// <returns></returns>
        private static RefleshAuth  AuthExpires(string weixinid)
        {
            SfSoft.BLL.WX_WeiXinAccounts bll = new SfSoft.BLL.WX_WeiXinAccounts();
            SfSoft.Model.WX_WeiXinAccounts model = bll.GetModelByWeiXinID(weixinid);
            if (model != null)
            {
                _refleshAuth = new RefleshAuth();
                _refleshAuth.ExpireshIn = (int)model.ExpiresIn;
                _refleshAuth.RefreshToken = model.Refresh_token;
                _refleshAuth.WeiXinId = model.WeiXinID;
                _refleshAuth.GetTokenDate = (DateTime)model.GetTokenDate;
            }
            return _refleshAuth;
        }
        /// <summary>
        /// 更新RefleshAuth
        /// </summary>
        /// <param name="weixinId"></param>
        public static  void UpDateRefleshAuth(string weixinId,string refreshToken)
        { 
             SfSoft.BLL.WX_WeiXinAccounts bll = new SfSoft.BLL.WX_WeiXinAccounts();
             SfSoft.Model.WX_WeiXinAccounts model = bll.GetModelByWeiXinID(weixinId);
            if (model != null) {
                model.GetTokenDate = DateTime.Now;
                model.Refresh_token = refreshToken;
                model.ExpiresIn = 2592000;
                bll.Update(model);
            }
        }
    }
}