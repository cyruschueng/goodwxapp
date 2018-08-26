using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SfSoft;

namespace ShenerWeiXin.Interface
{
    public interface IScore
    {
        /// <summary>
        /// 获取积分项目
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        SfSoft.Model.WX_Integral_Basic GetScoreBasic(string item);
        /// <summary>
        /// 获取某个项目下的积分
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        int GetScore(string item);
        /// <summary>
        /// 获取累积积分
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
        /// 新增积分明细
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        int AddScoreDetail(string openid, string scoreItem, int score, string order = "");
        /// <summary>
        /// 新增积分
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        int AddScoreTotal(string openid, int score);
        /// <summary>
        ///  赚取积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        bool UpdateScoreTotalOnTake(string openid, int score);
        /// <summary>
        ///  消费积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        bool UpdateScoreTotalOnExpense(string openid, int score);
        /// <summary>
        /// 消费时并赚取积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        bool UpdateScoreTotalOnExpenseAndTake(string openid, int score);
        /// <summary>
        ///  是否有积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsExists(string openid);
    }
    
}
