using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    /// <summary>
    /// 数据量太大使用分库分表
    /// </summary>
    public class QuestionV2Provide
    {
        public static IEnumerable<Models.Question.MyQuestion> GetQuestion(int activeId, string openId, Gxdr.Enum.GxdrComputeEnum compute = 0)
        {
            // 活动信息
            var activeInfo = GetQuestionActive(activeId);
            //答题记录并且答对的
            SfSoft.web.App.Helper.WeiXinBgDbTestQuestionAnswerRecordProvide provide = new App.Helper.WeiXinBgDbTestQuestionAnswerRecordProvide();
            var records = provide.GetModelList("OpenId='" + openId + "' and QuestionActiveID=" + activeId + " and RightOrError=1");

            //当前活动下的库库
            var questions = GetQuestionByActive(activeInfo.UsingData);

            #region 求出各答题库等级合用情况
            var list = from r in records
                       join qs in questions on r.TestQuestionID equals qs.ID into temp
                       from tt in temp.DefaultIfEmpty()
                       select new
                       {
                           OpenId = r.OpenID,
                           QuestionId = r.TestQuestionID,
                           Grade = tt.Grade
                       };
            //易 已答
            var simpleRecord = list.Where(e => e.Grade == "1").Select(e => e.QuestionId);

            //中 已答
            var mediumRecord = list.Where(e => e.Grade == "2").Select(e => e.QuestionId); //

            //难 已答
            var hardRecord = list.Where(e => e.Grade == "3").Select(e => e.QuestionId);//
            #endregion

            #region 求出未使用的题库
            //未使用的简单题库
            var simple = questions.Where(e => !simpleRecord.Contains(e.ID) && e.Grade == "1");

            //未使用的中等难题库
            var medium = questions.Where(e => !mediumRecord.Contains(e.ID) && e.Grade == "2"); //

            //未使用的难题库
            var hard = questions.Where(e => !hardRecord.Contains(e.ID) && e.Grade == "3");//

            #endregion

            //题库分配情况
            var configs = AnalysisConfig(activeInfo.Allocation);
            //获取重新分配置的题库
            var newSimpleQuestions = AllocationQuestion(configs.Find(e => e.Type == "易"), simple, questions.Where(e => e.Grade == "1"), compute);
            var newMediumQuestions = AllocationQuestion(configs.Find(e => e.Type == "中"), medium, questions.Where(e => e.Grade == "2"), compute);
            var newHardQuestions = AllocationQuestion(configs.Find(e => e.Type == "难"), hard, questions.Where(e => e.Grade == "3"), compute);

            //合并易中难
            var newQuestions = newSimpleQuestions.Union(newMediumQuestions).Union(newHardQuestions);
            return newQuestions;

        }
        /// <summary>
        /// 重亲分配题库
        /// </summary>
        /// <param name="config">库题分配设置</param>
        /// <param name="unUsings">未使用的题库</param>
        /// <param name="questions">所有题库</param>
        /// <param name="restatr">0:答对过的题不计算，1：重新计算分数</param>
        private static List<Models.Question.MyQuestion> AllocationQuestion(Models.Config.LocationConfig config, IEnumerable<Model.WX_TestQuestion> unUsings, IEnumerable<Model.WX_TestQuestion> questions, Gxdr.Enum.GxdrComputeEnum compute = 0)
        {
            var questionsCount = questions.Count();
            var Quantity = new
            {
                Config = questionsCount >= config.Quantity ? config.Quantity : questionsCount,
                UNUsings = unUsings.Count(),
                Questions = questionsCount
            };

            var list = new List<Models.Question.MyQuestion>();
            if (unUsings.Count() == 0)
            {
                //未使用的题库等于0
                var rad = CreateRandom(Quantity.Questions, Quantity.Config);
                foreach (var key in rad.Keys)
                {
                    var score = compute == 0 ? 0 : config.Score;
                    var m = SetMyQuestion(questions.ElementAt<Model.WX_TestQuestion>((int)key), score);
                    list.Add(m);
                }
            }
            else if (Quantity.UNUsings > 0 && Quantity.UNUsings < Quantity.Config)
            {
                //未使用的题库大于0 但是小于配置设置的题库数量
                /*取出未使用的题库*/
                foreach (var m in unUsings)
                {
                    list.Add(SetMyQuestion(m, config.Score));
                };
                /*从题库（已使用的题库）选择实差*/
                var differenceQuestions = questions.Except(unUsings).ToList(); //差集
                var rad = CreateRandom(differenceQuestions.Count(), Quantity.Config - Quantity.UNUsings);
                foreach (var key in rad.Keys)
                {
                    var score = compute == 0 ? 0 : config.Score;
                    list.Add(SetMyQuestion(differenceQuestions[(int)key], score));
                }
            }
            else if (Quantity.UNUsings > 0 && Quantity.UNUsings >= Quantity.Config)
            {
                var rad = CreateRandom(Quantity.UNUsings, Quantity.Config);
                foreach (var key in rad.Keys)
                {
                    list.Add(SetMyQuestion(unUsings.ElementAt<Model.WX_TestQuestion>((int)key), config.Score));
                }
            }
            return list;
        }
        public static Models.Question.MyQuestion SetMyQuestion(Model.WX_TestQuestion model, int score)
        {
            var m = new Models.Question.MyQuestion();
            m.AccessoryUrl = model.AccessoryUrl;
            m.Answer1 = model.Answer1;
            m.Answer2 = model.Answer2;
            m.Answer3 = model.Answer3;
            m.Answer4 = model.Answer4;
            m.ClassID = model.ClassID;
            m.CreateDate = model.CreateDate;
            m.Grade = model.Grade;
            m.ID = model.ID;
            m.IsAct = model.IsAct ?? 0;
            m.PID = model.PID;
            m.QuestionType = model.QuestionType;
            m.RightAnswer = model.RightAnswer.ToLower();
            m.Score = score;
            m.SPID = model.SPID;
            m.TestQuestion = model.TestQuestion;
            m.Track_V1 = model.Track_V1;
            m.Track_V2 = model.Track_V2;
            m.Track_V3 = model.Track_V3;
            return m;
        }
        public static List<Model.WX_TestQuestion> GetQuestionByActive(string questionType)
        {
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            var list = bll.GetModelList("ClassId='" + questionType + "'");
            return list;
        }

        public static Model.WX_TestQuestion_Activity GetQuestionActive(int activeId)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            var model = bll.GetModel(activeId);
            if (model == null)
            {
                return new Model.WX_TestQuestion_Activity();
            }
            return model;
        }
        public static List<Models.Config.LocationConfig> AnalysisConfig(string config)
        {
            List<Models.Config.LocationConfig> list = new List<Models.Config.LocationConfig>();
            string[] configs = config.Split(new string[] { "\r\n" }, StringSplitOptions.None);
            foreach (string m in configs)
            {
                if (!string.IsNullOrEmpty(m))
                {
                    string[] gs = m.Split(new string[] { "|" }, StringSplitOptions.None);
                    list.Add(new Models.Config.LocationConfig
                    {
                        Quantity = int.Parse(gs[1].ToString()),
                        Score = int.Parse(gs[2].ToString()),
                        Type = gs[0]
                    });
                }
            }
            return list;
        }
        private static Hashtable CreateRandom(int max, int quantity)
        {
            Hashtable hashtable = new Hashtable();

            Random rm = new Random();
            for (int i = 0; hashtable.Count < quantity; i++)
            {
                int nValue = rm.Next(max);
                if (!hashtable.ContainsValue(nValue))
                {
                    hashtable.Add(nValue, nValue);
                }
            }
            return hashtable;
        }
    }
}