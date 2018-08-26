using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class ResultProvide
    {
        private string OpenId { get; set; }
        private int ActiveId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="activeId"></param>
        /// <param name="param"></param>
        public ResultProvide(string openId, int activeId,Models.QueryString.QueerStringInfo info )
        { 
            this.OpenId = openId;
            this.ActiveId = activeId;
            this.Params=info;
            Init();
        }
        /// <summary>
        /// 擂台赛
        /// </summary>
        /// <returns></returns>
        public Models.AnswerResult.ResultInfo Math()
        {
            DoRight();
            GetGold();
            GetGradeStatus();
            Action action = () =>
            {
                UpdatePlayer();
                UpdateGold();
            };
            action.BeginInvoke(null, null);
            return GetResultInfo();
        }
        /// <summary>
        /// 普通活动
        /// </summary>
        /// <returns></returns>
        public Models.AnswerResult.ResultInfo Run()
        {
            DoRight();
            GetGold();
            GetGradeStatus();
            UpdateQuestionItemScore();
            /*
            Action action = () =>
            {
                DoZxs();
                UpdatePlayer();
                UpdateGold();
            };
            action.BeginInvoke(null, null);
            */
            DoZxs();
            UpdatePlayer();
            UpdateGold();

            return GetResultInfo();
        }
        private void Init()
        {
            QuestionItemScoreProvide scoreProvide = new QuestionItemScoreProvide(OpenId, ActiveId);
            CurrResultInfo = scoreProvide.GetQuestionItemInfo();
            NewRecords = new List<int>();
        }
        private void DoRight()
        {
            var list = Params.Detail;

            foreach (var m in list) {
                TotalScore = (TotalScore ?? 0) + m.Score;
                TotalTime = (TotalTime ?? 0) + m.Score==0?0:m.UsingTime;
                if (Params.ZxsType.ToLower() != "month")
                {
                     int index= QuestionAnswerRecord.AddAnswerRecold(m, OpenId, ActiveId);
                     if (index != 0) NewRecords.Add(index);
                }
            }
        }
        /// <summary>
        /// 更新活动主题获得的分数
        /// </summary>
        private void UpdateQuestionItemScore()
        {
            Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(OpenId, ActiveId);
            var model = GetResultInfo();
            provide.UpdateQuestionItemScore(model, Params.ZxsType);
        }
        private void DoZxs()
        {
            var model = GetResultInfo();
            Helper.ZxsProvide prvide = new ZxsProvide(Params.ZxsType, model);
            prvide.DoZxs();
        }
        private void UpdatePlayer()
        {
            var model = GetResultInfo();
            Helper.QuestionPlayerProvide.UpdatePlayer(model);
        }
        private Models.AnswerResult.ResultInfo GetResultInfo()
        {
            var model = new Models.AnswerResult.ResultInfo
            {
                ActiveId = Params.QuestionActiveId,
                OpenId = Params.OpenId,
                Score = TotalScore ?? 0,
                UsingTime = TotalTime ?? 0,
                Detail = ConvertListToString(NewRecords),
                Gold=TotalGold??0,
                Grade=GradeStatus
            };
            return model;
        }
        private void GetGold()
        {
            TotalGold = Helper.QuestionGoldProvide.GetGoldByScore(TotalScore ?? 0);
        }
        /// <summary>
        /// 更新金币
        /// </summary>
        private void UpdateGold()
        {
            if ((TotalGold ?? 0) != 0)
            {
                var model = GetResultInfo();
                Helper.QuestionGoldProvide.AddGold(model);
            }
        }
        private void GetGradeStatus()
        {
            Helper.QuestionGradeProvide provide=new QuestionGradeProvide(OpenId,ActiveId);
            GradeStatus = provide.GetGradeStatus(TotalScore ?? 0);
        }
        private string ConvertListToString(List<int> list)
        {
            string result = "";
            foreach (var m in list) {
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
        private Models.QueryString.QueerStringInfo Params { get; set; }
        /// <summary>
        /// 答题总分数
        /// </summary>
        private int? TotalScore { get; set; }
        /// <summary>
        /// 答题总用时间
        /// </summary>
        private int? TotalTime { get; set; }
        /// <summary>
        /// 金币
        /// </summary>
        private int? TotalGold { get; set; }
        /// <summary>
        /// 新答题记录
        /// </summary>
        private List<int> NewRecords { get; set; }
        /// <summary>
        /// 升级标识 true：升级 false：未升级
        /// </summary>
        private string GradeStatus { get; set; }
    }
}