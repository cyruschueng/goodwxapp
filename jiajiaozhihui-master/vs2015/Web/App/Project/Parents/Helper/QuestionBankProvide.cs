using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Helper
{
    public class QuestionBankProvide
    {
        public static List<Models.QuestionBank.Theme> GetQuestionBank(int parentId, string openId)
        {
            var planModel = GetPlan(parentId);

            string[] rightAnswers = GetAlreadyAnswers("parent" + parentId.ToString(), openId);

            SfSoft.BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            /*所有题目*/
            var list = bll.GetModelList("classid='" + planModel.TestLibraryId + "'");
            /*未答的题目或未答对*/
            var unAnswerList= list.Where(e=>!rightAnswers.Contains(e.ID.ToString()));
            if (unAnswerList.Count() < (planModel.Quantity ?? 0)) { 
                //数量不足
                var number = (planModel.Quantity??0) - unAnswerList.Count();
                var alreadAnswers = list.Where(e => rightAnswers.Contains(e.ID.ToString()));
                var randomAlreadAnswers= alreadAnswers.OrderBy(e => Guid.NewGuid()).Take(number);
                return Format(randomAlreadAnswers.Union(unAnswerList));
            }
            return Format(unAnswerList.OrderBy(e => Guid.NewGuid()).Take((planModel.Quantity ?? 0)));
        }
        /// <summary>
        /// 获取已答对的题目
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        private static string[] GetAlreadyAnswers(string itemId,string openId)
        {
            SfSoft.BLL.WX_TestQuestion_TestRecord bll = new BLL.WX_TestQuestion_TestRecord();
            var model = bll.GetMode(itemId, openId);
            if (model != null) {
                string answers = model.RightAnswers;
                return answers.Split(',');
            }
            return new string[] { };
        }
        private static SfSoft.Model.WX_Parents_Plan GetPlan(int parentId)
        {
            SfSoft.BLL.WX_Parents_Plan bll = new BLL.WX_Parents_Plan();
            var model= bll.GetModel(parentId);
            if (model != null)
            {
                return model;
            }
            else {
                return new Model.WX_Parents_Plan();
            }
        }
        private static List<Models.QuestionBank.Theme> Format(IEnumerable<Model.WX_TestQuestion> list)
        {
            List<Models.QuestionBank.Theme> themeList = new List<Models.QuestionBank.Theme>();
            foreach (var model in list) {
                themeList.Add(new Models.QuestionBank.Theme()
                {
                    Title = model.TestQuestion,
                    RightAnswers = model.RightAnswer,
                    Answers = new Models.QuestionBank.Answers()
                    {
                        Answer1 = model.Answer1,
                        Answer2 = model.Answer2,
                        Answer3 = model.Answer3,
                        Answer4 = model.Answer4
                    }
                });
            }
            return themeList;
        }
    }
}