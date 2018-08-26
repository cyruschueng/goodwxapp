using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;
using System.Data;
using SfSoft.DBUtility;

namespace ShenerWeiXin.Score
{
    public class Score:IScore,IGrade
    {
        /// <summary>
        /// 获取某个项目下的积分，带有正负号
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public int GetScore(string item)
        {
            SfSoft.BLL.WX_Integral_Basic bll = new SfSoft.BLL.WX_Integral_Basic();
            SfSoft.Model.WX_Integral_Basic model = bll.GetModel(item);
            if (model != null) {
                if (model.ScoreType == 1)
                {
                    return (int)model.Score;
                }
                else {
                    return -(int)model.Score;
                }
            }
            return 0;
        }
        /// <summary>
        /// 获取累积积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetTotalScore(string openid)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            if (model != null) {
                return (int)model.Accumulate_Integral;
            }
            return 0;
        }
        /// <summary>
        /// 获取剩余积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetSurplusScore(string openid)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            if (model != null)
            {
                return (int)model.Usable_Integral;
            }
            return 0;
        }
        /// <summary>
        /// 获取消费积分
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int GetExpenseScore(string openid)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            if (model != null)
            {
                return (int)model.Expend_Integral;
            }
            return 0;
        }
        /// <summary>
        /// 新增积分明细
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="scoreItem"></param>
        /// <param name="score"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public int AddScoreDetail(string openid, string scoreItem, int score, string order = "")
        {
            SfSoft.BLL.WX_HomeCard bllUser = new SfSoft.BLL.WX_HomeCard();
            SfSoft.Model.WX_HomeCard modelUser = bllUser.GetModel(openid);
            if (modelUser == null) {
                return 0;
            }

            SfSoft.BLL.WX_Integral_Detail bllIntegral = new SfSoft.BLL.WX_Integral_Detail();
            SfSoft.Model.WX_Integral_Detail modelIntegral = new SfSoft.Model.WX_Integral_Detail();
            modelIntegral.CardId = modelUser.CardId;
            modelIntegral.CreateDate = DateTime.Now;
            modelIntegral.Integral_Type = scoreItem;
            modelIntegral.OpenId = openid;
            modelIntegral.OrderNo = order;
            modelIntegral.Score = score;
            return bllIntegral.Add(modelIntegral);
        }
        /// <summary>
        /// 给积份总表新增一条新数据
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public int AddScoreTotal(string openid, int score)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = new SfSoft.Model.WX_Integral();
            model.Accumulate_Integral = score;
            model.Usable_Integral = score;
            model.Expend_Integral = 0;
            model.OpenId = openid;
            return bll.Add(model);
        }
        /// <summary>
        /// 头衔
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string GetTitle(string openid)
        {
            string result = "";
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            int score = 0;
            if (model != null)
            {
                score = model.Accumulate_Integral.Value;
            }
            SfSoft.BLL.WX_Grade bllGrade = new SfSoft.BLL.WX_Grade();
            string sql = "select * from WX_Grade where " + score + ">=floor and " + score + "<=upper and type=1";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = ds.Tables[0].Rows[0]["Title"].ToString();
            }
            return result;
        }
        /// <summary>
        /// 卡等级
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public string GetCardName(string openid)
        {
            string result = "";
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            int score = 0;
            if (model != null)
            {
                score = model.Accumulate_Integral.Value;
            }
            SfSoft.BLL.WX_Grade bllGrade = new SfSoft.BLL.WX_Grade();
            string sql = "select * from WX_Grade where " + score + ">=floor and " + score + "<=upper and type=2";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = ds.Tables[0].Rows[0]["Title"].ToString();
            }
            return result;
        }
        /// <summary>
        /// 获取积分项目
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public SfSoft.Model.WX_Integral_Basic GetScoreBasic(string item)
        {
            SfSoft.BLL.WX_Integral_Basic bll = new SfSoft.BLL.WX_Integral_Basic();
            return bll.GetModel(item);
        }
        /// <summary>
        /// 赚积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        public bool UpdateScoreTotalOnTake(string openid, int score)
        {

            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            model.Accumulate_Integral += score;
            model.Usable_Integral += score;
            model.OpenId = openid;
            return bll.Update(model);
        }
        /// <summary>
        /// 消费积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        public bool UpdateScoreTotalOnExpense(string openid, int score)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            //model.Accumulate_Integral -= score;
            model.Usable_Integral -= score;
            model.OpenId = openid;
            return bll.Update(model);
        }
        /// <summary>
        ///  消费积分并赚积分时更新
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="score"></param>
        /// <returns></returns>
        public bool UpdateScoreTotalOnExpenseAndTake(string openid, int score)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            SfSoft.Model.WX_Integral model = bll.GetModel(openid);
            model.Accumulate_Integral += score;
            model.Usable_Integral += score;
            model.Expend_Integral += score;
            model.OpenId = openid;
            return bll.Update(model);
        }

        /// <summary>
        /// 是否存在
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool IsExists(string openid)
        {
            SfSoft.BLL.WX_Integral bll = new SfSoft.BLL.WX_Integral();
            return bll.Exists(openid);
        }
    }
}
