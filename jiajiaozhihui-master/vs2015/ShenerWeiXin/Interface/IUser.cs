using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SfSoft;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace ShenerWeiXin.Interface
{
    /// <summary>
    /// 会员卡用户接口
    /// </summary>
    public interface  IUser
    {
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        SfSoft.Model.WX_HomeCard  GetUser(int id);
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="openid">用户唯一标识</param>
        /// <returns></returns>
        SfSoft.Model.WX_HomeCard GetUser(string openid);
        /// <summary>
        /// 增加用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        int Add(SfSoft.Model.WX_HomeCard user);
        /// <summary>
        /// 增加用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        int Add(OAuthUserInfo user,string openid);
        /// <summary>
        /// 修修用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        bool Update(SfSoft.Model.WX_HomeCard user);
        /// <summary>
        /// 删除用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        bool Delete(int id);
        bool Delete(string openid);
        /// <summary>
        /// 判断用户信息是否存在
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool IsExist(int id);
        /// <summary>
        /// 判断用户信息是否存在
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsExist(string openid);
        /// <summary>
        /// 电话号码
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string TelePhone(string openid);
        /// <summary>
        /// 头像
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string HeadimgUrl(string openid);
        /// <summary>
        /// 真实姓名
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string Name(string openid);
        /// <summary>
        /// 用户呢称
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string NickName(string openid);
        
    }
}
