using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionItemScoreProvide
    {
        private string OpenId { get; set; }
        private int ActiveId { get; set; }
        public QuestionItemScoreProvide(string openId, int activeId)
        {
            this.OpenId = openId;
            this.ActiveId = activeId;
        }
        public Models.QuestionItemScore.ResultInfo GetQuestionItemInfo()
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            var model= bll.GetModel(OpenId, ActiveId);
            if (model != null) {
                return new Models.QuestionItemScore.ResultInfo
                {
                    ActiveId=model.Item,
                    OpenId=model.OpenId,
                    Score=model.Score??0,
                    UsingTime=model.UsingTime??0
                };
            }
            return new Models.QuestionItemScore.ResultInfo();
        }
        public Model.WX_TestQuestion_Item_Score SetQuestionItemScore(Models.AnswerResult.ResultInfo info)
        {
            return new Model.WX_TestQuestion_Item_Score
            {
                Item = info.ActiveId,
                OpenId = info.OpenId,
                Score =info.Score,
                UsingTime =info.UsingTime
            };
        }
        public Model.WX_TestQuestion_Item_Score SetQuestionItemScore(Model.WX_TestQuestion_Item_Score model,Models.AnswerResult.ResultInfo info)
        {
            return new Model.WX_TestQuestion_Item_Score
            {
                Item = model.Item,
                OpenId = model.OpenId,
                UsingTime = (model.UsingTime ?? 0) + info.UsingTime,
                Score = (model.Score ?? 0) +info.Score
            };
        }
        /// <summary>
        /// 累积积分与所用时间
        /// </summary>
        /// <param name="info"></param>
        /// <param name="zsxType"></param>
        public void UpdateQuestionItemScore(Models.AnswerResult.ResultInfo info,string zsxType)
        {
            if (string.IsNullOrEmpty(zsxType))
            {
                BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
                Model.WX_TestQuestion_Item_Score model = bll.GetModel(OpenId, ActiveId);
                if (model == null)
                {
                    var m = SetQuestionItemScore(info);
                    bll.Add(m);
                }
                else
                {
                    var m = SetQuestionItemScore(model, info);
                    bll.Update(m);
                }
            }
        }
        /// <summary>
        /// 累积积分与所用时间
        /// </summary>
        /// <param name="info"></param>
        /// <param name="zsxType"></param>
        public void UpdateQuestionItemScore(Models.AnswerResult.ResultInfo info)
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            Model.WX_TestQuestion_Item_Score model = bll.GetModel(OpenId, ActiveId);
            if (model == null)
            {
                var m = SetQuestionItemScore(info);
                bll.Add(m);
            }
            else
            {
                var m = SetQuestionItemScore(model, info);
                bll.Update(m);
            }
        }
        /// <summary>
        /// 重写积分与所有时间
        /// </summary>
        /// <param name="info"></param>
        public void UpdateOverQuestionItemScore(Models.AnswerResult.ResultInfo info)
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            Model.WX_TestQuestion_Item_Score model = bll.GetModel(OpenId, ActiveId);
            if (model == null)
            {
                var m = SetQuestionItemScore(info);
                bll.Add(m);
            }
            else
            {
                var m = SetQuestionItemScore(info);
                bll.Update(m);
            }
        }
        /// <summary>
        /// 以最大的分数更新数据
        /// </summary>
        /// <param name="info"></param>
        public void UpdateMaxQuestionItemScore(Models.AnswerResult.ResultInfo info)
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            Model.WX_TestQuestion_Item_Score model = bll.GetModel(OpenId, ActiveId);
            if (model == null)
            {
                var m = SetQuestionItemScore(info);
                bll.Add(m);
            }
            else
            {
                if (info.Score > (model.Score ?? 0)) {
                    var m = SetQuestionItemScore(info);
                    bll.Update(m);
                }
            }
        }
    }
}