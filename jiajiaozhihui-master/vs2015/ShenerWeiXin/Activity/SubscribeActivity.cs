using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;

namespace ShenerWeiXin.Activity
{
    public class SubscribeActivity : ISubscribeActivity
    {
        /// <summary>
        /// 建立分享者与朋友关系数据
        /// </summary>
        /// <param name="shareID"></param>
        /// <param name="friendID"></param>
        /// <returns></returns>
        public int Add(string shareID, string friendID)
        {
            SfSoft.BLL.WX_SubscribeActivity bll = new SfSoft.BLL.WX_SubscribeActivity();
            SfSoft.Model.WX_SubscribeActivity model = new SfSoft.Model.WX_SubscribeActivity();
            model.ShareID = shareID;
            model.FriendID = friendID;
            model.IsSubscribe = 0;
            return bll.Add(model);
        }
        /// <summary>
        ///  确认是否关注
        /// </summary>
        /// <param name="openid">本订阅号openid</param>
        /// <returns></returns>
        public bool ConfirmByOpenID(string openid)
        {

            //SfSoft.BLL.WX_SubscribeActivity bll = new SfSoft.BLL.WX_SubscribeActivity();
            //SfSoft.Model.WX_SubscribeActivity model =bll.GetModel(openid);
            //bool IsExist = bll.Exists(openid);
            //if (IsExist == true) {
            //    SfSoft.BLL.WX_HomeCard homeBll = new SfSoft.BLL.WX_HomeCard();
            //    SfSoft.Model.WX_HomeCard homeModel = homeBll.GetModelByAgentId(openid);

            //    model.HeadimgUrl = homeModel.HeadimgUrl;
            //    model.NickName = homeModel.NickName;
            //    model.Subscribe_Time = DateTime.Now;
            //    model.IsSubscribe = 1;
            //    return bll.Update(model);
            //}
            //return false;
            SfSoft.BLL.WX_SubscribeActivity bll = new SfSoft.BLL.WX_SubscribeActivity();
            if (bll.IsRelationByOpenid(openid))
            {
                SfSoft.BLL.WX_HomeCard homeBll = new SfSoft.BLL.WX_HomeCard();
                SfSoft.Model.WX_HomeCard homeModel = homeBll.GetModel(openid);
                SfSoft.Model.WX_SubscribeActivity model = bll.GetModel(homeModel.OpenId);

                model.HeadimgUrl = homeModel.HeadimgUrl;
                model.NickName = homeModel.NickName;
                model.Subscribe_Time = DateTime.Now;
                model.IsSubscribe = 1;
                bll.Update(model);

                return true;
            }
            else {
                return false;
            }

        }
        /// <summary>
        /// 确认是否关注
        /// </summary>
        /// <param name="openid">代理的服务号openid</param>
        /// <returns></returns>
        public bool ConfirmByAgentOpenID(string openid)
        {
            SfSoft.BLL.WX_SubscribeActivity bll = new SfSoft.BLL.WX_SubscribeActivity();
            SfSoft.Model.WX_SubscribeActivity model = bll.GetModel(openid);
            if (bll.IsRelationByAgentOpenid(openid))
            {
                SfSoft.BLL.WX_HomeCard homeBll = new SfSoft.BLL.WX_HomeCard();
                SfSoft.Model.WX_HomeCard homeModel = homeBll.GetModelByAgentId(openid);

                model.HeadimgUrl = homeModel.HeadimgUrl;
                model.NickName = homeModel.NickName;
                model.Subscribe_Time = DateTime.Now;
                model.IsSubscribe = 1;

                bll.Update(model);

                return true;
            }
            else {
                return false;
            }
        }
        /// <summary>
        /// 是否已关注
        /// </summary>
        /// <param name="openid"></param>
        /// <returns>True:已关注 False:没有关注</returns>
        public bool IsSubscribe(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            bool IsExist = bll.ExistsByAgentId(openid);
            if (IsExist == true)
            {
                return true;
            }
            else {
                return false;
            }
        }
        /// <summary>
        /// 是否被邀请参加活动
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsInvite(string openid)
        {
            SfSoft.BLL.WX_HomeCard bllCard = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard modelCard = bllCard.GetModelByAgentId(openid);
            if (modelCard != null)
            {
                return true;
            }
            else {
                SfSoft.BLL.WX_SubscribeActivity bll = new SfSoft.BLL.WX_SubscribeActivity();
                return bll.Exists(openid);
            }
        }

        public bool Confirm(string openid)
        {
            throw new NotImplementedException();
        }
    }
}
