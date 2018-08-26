using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.Interface
{
    public interface IFollower
    {
        /// <summary>
        /// 获取总积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        int GetTotalScore(string openid);
        /// <summary>
        /// 获取剩余积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        int GetSurplusScore(string openid);
        /// <summary>
        /// 获取消费积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        int GetExpenseScore(string openid);
        /// <summary>
        /// 获取头衔
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string GetTitle(string openid);
        /// <summary>
        /// 获取卡片等级
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string GetCardName(string openid);
        /// <summary>
        /// 获取卡号
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        string GetCardNo(string openid);
        /// <summary>
        /// 赚积分
        /// </summary>
        /// <param name="openid">关注者的用户唯一标识</param>
        /// <param name="scoreItem">积分的项目</param>
        /// <param name="score">分数</param>
        /// <param name="order">相关单号</param>
        /// <returns></returns>
        void TakeScore(string openid,string scoreItem,int score, string order="");
        /// <summary>
        /// 赚积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        void TakeScore(string openid, string scoreItem, string order = "");
        /// <summary>
        ///  消费并赚积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        void ExpenseAndTakeScore(string openid, string scoreItem, int score, string order = "");
        /// <summary>
        /// 消费并赚积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        void ExpenseAndTakeScore(string openid, string scoreItem, string order = "");
        /// <summary>
        /// 积分消费（如积分兑换）
        /// </summary>
        /// <param name="openid">关注者的用户唯一标识</param>
        /// <param name="scoreItem">消费的项目</param>
        /// <param name="score">分数</param>
        /// <param name="order">相关单号</param>
        /// <returns></returns>
        void ExpenseScore(string openid,string scoreItem,int score,string order="");
        /// <summary>
        /// 积分消费（如积分兑换）
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="order"></param>
        void ExpenseScore(string openid, string scoreItem, string order = "");
        /// <summary>
        /// 今天是否已签到;
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsSigninByDay(string openid);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsCompleteRegister(string openid);

        /// <summary>
        /// 获取本订阅号的openid
        /// </summary>
        /// <param name="agentOpenid"></param>
        /// <returns></returns>
        string GetOpenid(string agentOpenid);
    }
}
