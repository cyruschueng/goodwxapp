using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;
using SfSoft;
using SfSoft.DBUtility;
using System.Data;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace ShenerWeiXin.User
{
    /// <summary>
    /// 关注者
    /// </summary>
    public class Follower:IUser,IFollower
    {
        /// <summary>
        /// 获取关注者信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public SfSoft.Model.WX_HomeCard GetUser(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.GetModel(id);
        }
        /// <summary>
        /// 获取关注者信息
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public SfSoft.Model.WX_HomeCard GetUser(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll=new SfSoft.BLL.WX_HomeCard();
            return bll.GetModel(openid);
        }
        /// <summary>
        /// 新增关注者信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int Add(SfSoft.Model.WX_HomeCard user)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Add(user);
        }
        /// <summary>
        /// 新增关注者信息
        /// </summary>
        /// <param name="user">认证用户的信息</param>
        /// <param name="openid">本公众号的用户唯一标识</param>
        /// <returns></returns>
        public int Add(OAuthUserInfo user,string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = new SfSoft.Model.WX_HomeCard();

            model.OpenId = user.openid;
            model.NickName = user.nickname;
            model.Sex = user.sex;

            model.CreateDate = DateTime.Now;
            model.HeadimgUrl = user.headimgurl;
            model.CardId =WXHelper.CreateCardID();
            model.UserID = openid;

            return bll.Add(model);
        }
        /// <summary>
        /// 更新关注者信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool Update(SfSoft.Model.WX_HomeCard user)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Update(user);
        }
        /// <summary>
        /// 删除关注者信息
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool Delete(string  openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Delete(openid);
        }
        /// <summary>
        /// 删除关注者信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool Delete(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Delete(id);
        }
        /// <summary>
        /// 判断是否存该关者
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool IsExist(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Exists(id);
        }
        /// <summary>
        /// 判断是否存该关者
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsExist(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Exists(openid);
        }


        /// <summary>
        /// 获取累积积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetTotalScore(string openid)
        {
            Score.Score score = new Score.Score();
            return score.GetTotalScore(openid);
        }
        /// <summary>
        /// 获取剩余积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetSurplusScore(string openid)
        {
            Score.Score score = new Score.Score();
            return score.GetSurplusScore(openid);
        }
        /// <summary>
        /// 获取消费积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetExpenseScore(string openid)
        {
            Score.Score score = new Score.Score();
            return score.GetExpenseScore(openid);
        }
        /// <summary>
        /// 获取头衔
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string GetTitle(string openid)
        {
            Score.Score score = new Score.Score();
            return score.GetTitle(openid);
        }
        /// <summary>
        /// 获取卡的类型
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string GetCardName(string openid)
        {
            Score.Score score = new Score.Score();
            return score.GetCardName(openid);
        }
        /// <summary>
        /// 赚取积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public void TakeScore(string openid, string scoreItem, int score, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            iscore.AddScoreDetail(openid, scoreItem, score, order);
            if (iscore.IsExists(openid) == false)
            {
                iscore.AddScoreTotal(openid, score);
            }
            else {
                iscore.UpdateScoreTotalOnTake(openid, score);
            }
        }
        /// <summary>
        ///  赚取积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        public void TakeScore(string openid, string scoreItem, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            int score = iscore.GetScore(scoreItem);
            iscore.AddScoreDetail(openid, scoreItem, score, order);
            if (iscore.IsExists(openid) == false)
            {
                iscore.AddScoreTotal(openid, score);
            }
            else
            {
                iscore.UpdateScoreTotalOnTake(openid, score);
            }
        }
        /// <summary>
        /// 消费积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public void ExpenseScore(string openid, string scoreItem, int score, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            iscore.AddScoreDetail(openid, scoreItem, score, order);
            iscore.UpdateScoreTotalOnExpense(openid, score);
        }
        /// <summary>
        /// 消费积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        public void ExpenseScore(string openid, string scoreItem, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            int score = iscore.GetScore(scoreItem);
            iscore.AddScoreDetail(openid, scoreItem, score, order);
            iscore.UpdateScoreTotalOnExpense(openid, score);
        }

        /// <summary>
        /// 消费并赚取积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public void ExpenseAndTakeScore(string openid, string scoreItem, int score, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            int result=iscore.AddScoreDetail(openid, scoreItem, score, order);
            if (result != 0) {
                if (iscore.IsExists(openid) == false)
                {
                    iscore.AddScoreTotal(openid, score);
                }
                else
                {
                    iscore.UpdateScoreTotalOnExpenseAndTake(openid, score);
                }
            }
        }
        /// <summary>
        /// 消费并赚取积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        public void ExpenseAndTakeScore(string openid, string scoreItem, string order = "")
        {
            Interface.IScore iscore = new Score.Score();
            int score = iscore.GetScore(scoreItem);
            iscore.AddScoreDetail(openid, scoreItem, score, order);
            if (iscore.IsExists(openid) == false)
            {
                iscore.AddScoreTotal(openid, score);
            }
            else
            {
                iscore.UpdateScoreTotalOnExpenseAndTake(openid, score);
            }
        }

        /// <summary>
        /// 获取卡号
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string GetCardNo(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null)
            {
                return model.CardId;
            }
            else {
                return "";
            }
        }

        /// <summary>
        /// 获取联系方式
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string TelePhone(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null) {
                return model.Telephone;
            }
            return "";
        }
        /// <summary>
        /// 获取头像
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string HeadimgUrl(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null)
            {
                return model.HeadimgUrl;
            }
            return "";
        }
        /// <summary>
        /// 今天是否已签到
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsSigninByDay(string openid)
        {
            SfSoft.BLL.WX_Integral_Detail bllDetail = new SfSoft.BLL.WX_Integral_Detail();
            DataSet ds = bllDetail.GetList("openid='" + openid + "' and convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120) and integral_type='signIn'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 真实姓名
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string Name(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null)
            {
                return model.name;
            }
            return "";
        }

        /// <summary>
        /// 用户呢称
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string NickName(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModel(openid);
            if (model != null)
            {
                return model.NickName;
            }
            return "";
        }
        /// <summary>
        /// 是否完善资料
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsCompleteRegister(string openid)
        {
            SfSoft.Model.WX_HomeCard model = GetUser(openid);
            if (model != null)
            {
                if (model.ModifyDate != null)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        /// <summary>
        /// 获取本订阅号的openid
        /// </summary>
        /// <param name="agentOpenid"></param>
        /// <returns></returns>
        public string GetOpenid(string agentOpenid)
        {
            SfSoft.BLL.WX_HomeCard bll=new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard model = bll.GetModelByAgentId(agentOpenid);
            if (model != null)
            {
                return model.UserID;
            }
            else {
                return "";
            }
        }
    }
}
