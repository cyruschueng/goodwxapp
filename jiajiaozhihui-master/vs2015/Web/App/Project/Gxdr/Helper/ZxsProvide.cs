using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class ZxsProvide
    {
        private string ZxsType = "";
        private Models.AnswerResult.ResultInfo ResultInfo;
        public ZxsProvide(string zxsType,Models.AnswerResult.ResultInfo info)
        {
             this.ZxsType = zxsType.ToLower();
             this.ResultInfo = info;
        }
        public void DoZxs()
        {
            if (!string.IsNullOrEmpty(ZxsType))
            {
                BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
                Model.WX_TestQuestion_Item_Score model = bll.GetModel(ResultInfo.OpenId, ResultInfo.ActiveId);


                
                if (ZxsType == "week")
                {
                    //用于知行社统计测试次数
                    AddRecord(ResultInfo.ActiveId.ToString(), ResultInfo.Score, ResultInfo.UsingTime);
                }
                else if (ZxsType == "month")
                {
                    if (model == null)
                    {
                        Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(ResultInfo.OpenId, ResultInfo.ActiveId);
                        var m = provide.SetQuestionItemScore(ResultInfo);
                        bll.Add(m);
                    }
                    else
                    {
                        if ((model.Score ?? 0) < ResultInfo.Score)
                        {
                            Helper.QuestionItemScoreProvide provide = new QuestionItemScoreProvide(ResultInfo.OpenId, ResultInfo.ActiveId);
                            var m = provide.SetQuestionItemScore(ResultInfo);
                            bll.Update(m);
                        }
                    }
                }
            }
        }
        private void AddRecord(string questionactiveid, int score, int timetamp)
        {
            BLL.WX_TestQuestion_Score bll = new BLL.WX_TestQuestion_Score();
            Model.WX_TestQuestion_Score model = new Model.WX_TestQuestion_Score();
            model.CreateDate = DateTime.Now;
            model.OpenID = ResultInfo.OpenId;
            model.QuestionActiveID = int.Parse(questionactiveid);
            model.Score = score;
            model.UsingTime = timetamp;
            bll.Add(model).ToString();
        }
    }
}