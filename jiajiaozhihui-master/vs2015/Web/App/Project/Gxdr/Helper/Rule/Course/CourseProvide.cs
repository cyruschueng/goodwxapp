using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper.Rule
{
    public class CourseProvide:BaseRule
    {
        string openId = "";
        int activeid = 0;

        public CourseProvide(string openId, int activeId, Models.QueryString.QueerStringInfo info)
            : base(openId, activeId, info)
        {
            this.openId = openId;
            this.activeid = activeId;
        }

        public override Models.AnswerResult.ResultInfo Run()
        {
            DoRight();
            UpdateQuestionItemScore(true);
            UpdateQuestionItemScore(() => {
                BLL.Wx_TestQuestion_Item_Ranking bll = new BLL.Wx_TestQuestion_Item_Ranking();
                var date=DateTime.Now;
                var model = bll.GetModel(this.openId, this.activeid,date.Year,date.Month);
                if (model == null)
                {
                    var m = new Model.Wx_TestQuestion_Item_Ranking()
                    {
                        ActiveId = this.activeid,
                        OpenId = this.openId,
                        Year = date.Year,
                        Month = date.Month,
                        Score = this.TotalScore ?? 0,
                        UsingTime = this.TotalTime ?? 0
                    };
                    bll.Add(m);
                }
                else {
                    model.Score = this.TotalScore ?? 0;
                    model.UsingTime=this.TotalTime??0;
                    bll.Update(model);
                }
            }, true);
            return GetResultInfo();
        }
        private void DoRight()
        {
            var list = Params.Detail;
            foreach (var m in list)
            {
                TotalScore = (TotalScore ?? 0) + m.Score;
                TotalTime = (TotalTime ?? 0) + m.Score == 0 ? 0 : m.UsingTime;
            }
        }
        
    }
}