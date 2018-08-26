using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper.Rule
{
    /// <summary>
    /// 只记录练习次数
    /// 也不作为国学达人的总积分计算
    /// </summary>
    public class WeeksProvide:BaseRule
    {
        string openId = "";
        int activeid = 0;

        public WeeksProvide(string openId, int activeId, Models.QueryString.QueerStringInfo info):base(openId,activeId,info)
        {
            this.openId = openId;
            this.activeid = activeid;
        }
        
        public override Models.AnswerResult.ResultInfo Run()
        {
            
            DoRight();
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