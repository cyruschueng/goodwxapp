using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper.Rule
{
    public class BaseRule
    {
        private string OpenId { get; set; }
        private int ActiveId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="activeId"></param>
        /// <param name="param"></param>
        public BaseRule(string openId, int activeId, Models.QueryString.QueerStringInfo info)
        { 
            this.OpenId = openId;
            this.ActiveId = activeId;
            this.Params=info;
            Init();
        }
        private void Init()
        {
            QuestionItemScoreProvide scoreProvide = new QuestionItemScoreProvide(OpenId, ActiveId);
            CurrResultInfo = scoreProvide.GetQuestionItemInfo();
            NewRecords = new List<int>();
        }
        public virtual Models.AnswerResult.ResultInfo Run()
        {
            return null;
        }
        /// <summary>
        /// 更新活动主题获得的分数与所用时间
        /// </summary>
        /// <param name="over">如果True 将重写分数与时间</param>
        /// <param name="ismax">如果over:True,ismax:True 将以最高分覆盖当前数据</param>
        public void UpdateQuestionItemScore(bool over=false,bool ismax=false)
        {
            Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(OpenId, ActiveId);
            var model = GetResultInfo();
            if (over == false)
            {
                provide.UpdateQuestionItemScore(model);
            }
            else {
                if (ismax == true)
                {
                    provide.UpdateMaxQuestionItemScore(model);
                }
                else {
                    provide.UpdateOverQuestionItemScore(model);   
                }
            }
        }
        /// <summary>
        /// 更新活动主题获得的分数与所用时间,带有回调
        /// </summary>
        /// <param name="over">如果True 将重写分数与时间</param>
        /// <param name="ismax">如果over:True,ismax:True 将以最高分覆盖当前数据</param>
        public void UpdateQuestionItemScore(Action  action, bool over = false, bool ismax = false)
        {
            UpdateQuestionItemScore(over, ismax);
            action.BeginInvoke(null, null);
        }

        /// <summary>
        /// 更新用户信息
        /// </summary>
        public void UpdatePlayer()
        {
            var model = GetResultInfo();
            Helper.QuestionPlayerProvide.UpdatePlayer(model);
        }
        /// <summary>
        /// 获取更新结果
        /// </summary>
        /// <returns></returns>
        public  Models.AnswerResult.ResultInfo GetResultInfo()
        {
            var model = new Models.AnswerResult.ResultInfo
            {
                ActiveId = Params.QuestionActiveId,
                OpenId = Params.OpenId,
                Score = TotalScore ?? 0,
                UsingTime = TotalTime ?? 0,
                Detail = ConvertListToString(NewRecords),
                Gold = TotalGold ?? 0,
                Grade = GradeStatus
            };
            return model;
        }
        /// <summary>
        /// 更新金币
        /// </summary>
        public void UpdateGold()
        {
            if ((TotalGold ?? 0) != 0)
            {
                var model = GetResultInfo();
                Helper.QuestionGoldProvide.AddGold(model);
            }
        }
        /// <summary>
        /// 获取等级状态
        /// </summary>
        public void GetGradeStatus()
        {
            Helper.QuestionGradeProvide provide = new QuestionGradeProvide(OpenId, ActiveId);
            GradeStatus = provide.GetGradeStatus(TotalScore ?? 0);
        }
        public  void GetGold()
        {
            TotalGold = Helper.QuestionGoldProvide.GetGoldByScore(TotalScore ?? 0);
        }
        private string ConvertListToString(List<int> list)
        {
            string result = "";
            foreach (var m in list)
            {
                result += "," + m.ToString();
            }
            if (result.Length != 0) result = result.Substring(1);
            return result;
        }
        /// <summary>
        /// 当前活动结果情况
        /// </summary>
        private Models.QuestionItemScore.ResultInfo CurrResultInfo { get; set; }
        /// <summary>
        /// 前端返回的参数 
        /// </summary>
        public  Models.QueryString.QueerStringInfo Params { get; set; }
        /// <summary>
        /// 答题总分数
        /// </summary>
        public int? TotalScore { get; set; }
        /// <summary>
        /// 答题总用时间
        /// </summary>
        public int? TotalTime { get; set; }
        /// <summary>
        /// 金币
        /// </summary>
        public int? TotalGold { get; set; }
        /// <summary>
        /// 新答题记录
        /// </summary>
        public List<int> NewRecords { get; set; }
        /// <summary>
        /// 升级标识 true：升级 false：未升级
        /// </summary>
        private string GradeStatus { get; set; }
    }
}