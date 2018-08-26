using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper.Rule
{
    public class CommonProvide:BaseRule
    {
        string openId = "";
        int activeid = 0;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="activeId"></param>
        /// <param name="param"></param>
        public CommonProvide(string openId, int activeId, Models.QueryString.QueerStringInfo info)
            : base(openId, activeId, info)
        {
            this.openId = openId;
            this.activeid = activeid;
        }
        /// <summary>
        /// 普通活动
        /// </summary>
        /// <returns></returns>
        public override Models.AnswerResult.ResultInfo Run()
        {
            DoRight();
            GetGold();
            GetGradeStatus();
            UpdateQuestionItemScore();

            UpdatePlayer();
            UpdateGold();

            return GetResultInfo();
        }
        
        private void DoRight()
        {
            var list = Params.Detail;

            foreach (var m in list)
            {
                TotalScore = (TotalScore ?? 0) + m.Score;
                TotalTime = (TotalTime ?? 0) + m.Score == 0 ? 0 : m.UsingTime;
                int index = QuestionAnswerRecord.AddAnswerRecold(m, openId, activeid);
                if (index != 0) NewRecords.Add(index);
            }
        }
    }
}