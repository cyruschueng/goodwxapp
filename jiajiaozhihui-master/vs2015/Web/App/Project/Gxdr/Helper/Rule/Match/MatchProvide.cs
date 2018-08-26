using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper.Rule
{
    public class MatchProvide:BaseRule
    {
        string openId = "";
        int activeid = 0;

        public MatchProvide(string openId, int activeId, Models.QueryString.QueerStringInfo info)
            : base(openId, activeId, info)
        {
            this.openId = openId;
            this.activeid = activeId;
        }
        public override Models.AnswerResult.ResultInfo Run()
        {
            DoRight();
            GetGold();
            GetGradeStatus();
            UpdateQuestionItemScore(true);
            Action action = () =>
            {
                UpdatePlayer();
                UpdateGold();
            };
            action.BeginInvoke(null, null);
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