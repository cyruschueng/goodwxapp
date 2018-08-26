using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace ShenerWeiXin.Interface
{
    /// <summary>
    /// 定义分享接口
    /// </summary>
    public interface IShareContent
    {
        /// <summary>
        /// 获取浏览者的信息
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        OAuthUserInfo AuthUserInfo(string code);
        /// <summary>
        ///  给分享者加积分
        /// </summary>
        /// <param name="openid">分享者openid</param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        void TakeScore(string openid, string scoreItem, int score, string order = "");
        /// <summary>
        ///  给分享者加积分
        /// </summary>
        /// <param name="openid">分享者openid</param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        void TakeScore(string openid, string scoreItem, string order = "");
        /// <summary>
        /// 是否课程已报名
        /// </summary>
        /// <param name="openid">浏览者openid</param>
        /// <param name="id">项目ID</param>
        /// <returns></returns>
        bool IsCourseSignIn(string openid, string id);
        /// <summary>
        /// 公益品订单是否提交
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        bool IsPublicGoodsSignIn(string openid, string id);
        /// <summary>
        /// 设置定公益品单参数
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="goodid"></param>
        /// <param name="name"></param>
        /// <param name="address"></param>
        /// <param name="telephone"></param>
        /// <param name="province"></param>
        /// <param name="city"></param>
        /// <param name="goodstype"></param>
        /// <returns></returns>
        SfSoft.Model.WX_PublicOrder  SetGoodsOrderModel(string openid, string goodid, string name, string address, string telephone, string province, string city, string goodstype,string number,string price,string remark);
        /// <summary>
        /// 设置课程参数
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="coursesid"></param>
        /// <param name="name"></param>
        /// <param name="nickname"></param>
        /// <param name="telephone"></param>
        /// <returns></returns>
        SfSoft.Model.WX_CoursOrder SetCourseOrderModel(string openid, string coursesid, string name, string nickname, string telephone);
    }
}
