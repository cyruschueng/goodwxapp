using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class CourseProvide
    {
        private string ZxsType = "";
        private Models.AnswerResult.ResultInfo ResultInfo;
        public CourseProvide(string zxsType, Models.AnswerResult.ResultInfo info)
        {
             this.ZxsType = zxsType.ToLower();
             this.ResultInfo = info;
        }
        public void DoCourse()
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            Model.WX_TestQuestion_Item_Score model = bll.GetModel(ResultInfo.OpenId, ResultInfo.ActiveId);
            if (model == null)
            {
                Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(ResultInfo.OpenId, ResultInfo.ActiveId);
                var m = provide.SetQuestionItemScore(ResultInfo);
                bll.Add(m);
            }
            else
            {
                Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(ResultInfo.OpenId, ResultInfo.ActiveId);
                var m = provide.SetQuestionItemScore(ResultInfo);
                bll.Update(m);
            }
        }

    }
}