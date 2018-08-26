using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;
using ShenerWeiXin.User;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace ShenerWeiXin.Share
{
    public  class ShareContent:IShareContent
    {
        /// <summary>
        /// 获取浏览者的信息
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public OAuthUserInfo AuthUserInfo(string code)
        {
            WXHelper helper = new WXHelper();
            return helper.AuthUserInfo(code);
        }
        /// <summary>
        /// 为分享者加积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        public void TakeScore(string openid, string scoreItem, int score, string order = "")
        {
            Follower follower = new Follower();
            follower.TakeScore(openid, scoreItem, score, order);
        }
        /// <summary>
        /// 为分享者加积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        public void TakeScore(string openid, string scoreItem, string order = "")
        {
            Follower follower = new Follower();
            follower.TakeScore(openid, scoreItem, order);
        }

        public bool IsCourseSignIn(string openid, string id)
        {
            WXHelper helper = new WXHelper();
            return helper.SignInOnCourses(openid, int.Parse(id));
        }
        public bool IsPublicGoodsSignIn(string openid, string id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 设置公益品定单参数 
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
        public SfSoft.Model.WX_PublicOrder SetGoodsOrderModel(string openid, string goodid, string name, string address, string telephone, string province, string city, string goodstype="1",string number="1",string price="0",string remark="")
        {
            SfSoft.Model.WX_PublicOrder model = new SfSoft.Model.WX_PublicOrder();
            model.OpenID = openid;
            model.GoodID = int.Parse(goodid);
            model.Name = name;
            model.Address = address;
            model.TelePhone = telephone;
            model.Province = province;
            model.City = city;
            model.OrderDate = DateTime.Now;
            model.GoodsType = int.Parse(goodstype);
            model.PayNumber = int.Parse(number);
            model.Price = decimal.Parse(price);
            model.Remark = remark;
            return model;
        }

        /// <summary>
        /// 设置课程表参数 
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="coursesid"></param>
        /// <param name="name"></param>
        /// <param name="nickname"></param>
        /// <param name="telephone"></param>
        /// <returns></returns>
        public SfSoft.Model.WX_CoursOrder SetCourseOrderModel(string openid, string coursesid, string name, string nickname, string telephone)
        {
            SfSoft.Model.WX_CoursOrder model = new SfSoft.Model.WX_CoursOrder();
            model.CoursID =int.Parse(coursesid);
            model.CreateDate = DateTime.Now;
            model.Entrant = name;
            model.Name = nickname;
            model.OpenID = openid;
            model.Telephone = telephone;
            return model;
        }
    }
}
