using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

namespace SfSoft.web.game.brainsexpert.Provide
{
    public class QuestionProvide
    {
        public static IEnumerable<Models.MyQuestion> GetQuestion(int activeId,string openId)
        {
            // 活动信息
            var activeInfo = GetQuestionActive(activeId);
            //是不是国学知行社
            IsZxs = activeInfo.Pid == 113 ? true : false;
            //答题记录并且答对的
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            var records = bll.GetModelList("OpenId='" + openId + "' and QuestionActiveID=" + activeId + " and RightOrError=1");

            //当前活动下的库库
            var questions=GetQuestionByActive(activeInfo.UsingData);

            #region 求出各答题库等级合用情况
            var list = from r in records
                       join qs in questions on r.TestQuestionID equals qs.ID into temp
                       from tt in temp.DefaultIfEmpty()
                       select new
                       {
                           OpenId=r.OpenID,
                           QuestionId=r.TestQuestionID,
                           Grade= tt.Grade
                       };
            //易 已答
            //var simpleRecord = list.Where(e => e.Grade == "1").Select(e=>e.QuestionId).ToList(); //
            var simpleRecord = list.Where(e => e.Grade == "1").Select(e => e.QuestionId);

            //中 已答
            //var mediumRecord = list.Where(e => e.Grade == "2").Select(e=>e.QuestionId).ToList(); //
            var mediumRecord = list.Where(e => e.Grade == "2").Select(e => e.QuestionId); //

            //难 已答
            //var hardRecord = list.Where(e => e.Grade == "3").Select(e=>e.QuestionId).ToList();//

            var hardRecord = list.Where(e => e.Grade == "3").Select(e => e.QuestionId);//
            #endregion

            #region 求出未使用的题库
            //未使用的简单题库
            //var simple= questions.Where(e=>!simpleRecord.Exists(x=>x.Value==e.ID) && e.Grade=="1").ToList(); //

            var simple = questions.Where(e => !simpleRecord.Contains(e.ID) && e.Grade=="1");

            //未使用的中等难题库
            //var medium = questions.Where(e => !mediumRecord.Exists(x => x.Value == e.ID) && e.Grade == "2").ToList(); //

            var medium = questions.Where(e => !mediumRecord.Contains(e.ID) && e.Grade == "2"); //

            //未使用的难题库
            //var hard = questions.Where(e => !hardRecord.Exists(x => x.Value == e.ID) && e.Grade == "3").ToList();//

            var hard = questions.Where(e => !hardRecord.Contains(e.ID) && e.Grade == "3");//

            #endregion

            //题库分配情况
            var configs = AnalysisConfig(activeInfo.Allocation);
            //获取重新分配置的题库
            //var newSimpleQuestions = AllocationQuestion(configs.Find(e => e.Type == "易"), simple, questions.Where(e => e.Grade == "1").ToList()); //
            //var newMediumQuestions = AllocationQuestion(configs.Find(e => e.Type == "中"), medium, questions.Where(e => e.Grade == "2").ToList()); //
            //var newHardQuestions = AllocationQuestion(configs.Find(e => e.Type == "难"), hard, questions.Where(e => e.Grade == "3").ToList()); //

            var newSimpleQuestions = AllocationQuestion(configs.Find(e => e.Type == "易"), simple, questions.Where(e => e.Grade == "1")); 
            var newMediumQuestions = AllocationQuestion(configs.Find(e => e.Type == "中"), medium, questions.Where(e => e.Grade == "2")); 
            var newHardQuestions = AllocationQuestion(configs.Find(e => e.Type == "难"), hard, questions.Where(e => e.Grade == "3")); 

            //合并易中难
            var newQuestions= newSimpleQuestions.Union(newMediumQuestions).Union(newHardQuestions);
            return newQuestions;


        }
        /// <summary>
        /// 重亲分配题库
        /// </summary>
        /// <param name="config">库题分配设置</param>
        /// <param name="unUsings">未使用的题库</param>
        /// <param name="questions">所有题库</param>
        //private static List<Models.MyQuestion> AllocationQuestion(Models.LocationConfig config, List<Model.WX_TestQuestion> unUsings, List<Model.WX_TestQuestion> questions)
        private static List<Models.MyQuestion> AllocationQuestion(Models.LocationConfig config, IEnumerable<Model.WX_TestQuestion> unUsings, IEnumerable<Model.WX_TestQuestion> questions)
        {
            var questionsCount = questions.Count();
            var Quantity = new
            {
                Config = questionsCount >= config.Quantity ? config.Quantity : questionsCount,
                //UNUsings=unUsings.Count, //
                UNUsings=unUsings.Count(),
                //Questions=questions.Count //
                Questions = questionsCount
            };

            var list = new List<Models.MyQuestion>();
            if (unUsings.Count() == 0)
            {
                //未使用的题库等于0
                var rad= CreateRandom(Quantity.Questions,Quantity.Config);
                foreach (var key in rad.Keys) {
                    //var m = SetMyQuestion(questions[(int)key], 0);//
                    var score = IsZxs == true ? config.Score : 0;
                    var m = SetMyQuestion(questions.ElementAt<Model.WX_TestQuestion>((int)key), score);
                    list.Add(m);
                }
            }
            else if (Quantity.UNUsings> 0 && Quantity.UNUsings< Quantity.Config) {
                //未使用的题库大于0 但是小于配置设置的题库数量
                /*取出未使用的题库*/
                foreach (var m in unUsings) {
                    list.Add(SetMyQuestion(m,config.Score));
                };
                /*从题库（已使用的题库）选择实差*/
                var differenceQuestions = questions.Except(unUsings).ToList(); //差集
                var rad = CreateRandom(differenceQuestions.Count(), Quantity.Config-Quantity.UNUsings);
                foreach (var key in rad.Keys)
                {
                    var score = IsZxs == true ? config.Score : 0;
                    list.Add(SetMyQuestion(differenceQuestions[(int)key], score));
                }
            }
            else if (Quantity.UNUsings> 0 && Quantity.UNUsings>=Quantity.Config)
            {
                var rad = CreateRandom(Quantity.UNUsings,Quantity.Config);
                foreach (var key in rad.Keys)
                {
                    //list.Add(SetMyQuestion(unUsings[(int)key],config.Score));//
                    list.Add(SetMyQuestion(unUsings.ElementAt<Model.WX_TestQuestion>((int)key), config.Score));
                }
            }
            return list;
        }
        public static Models.MyQuestion SetMyQuestion(Model.WX_TestQuestion model,int score)
        {
            var m = new Models.MyQuestion();
            m.AccessoryUrl = model.AccessoryUrl;
            m.Answer1 = model.Answer1;
            m.Answer2 = model.Answer2;
            m.Answer3 = model.Answer3;
            m.Answer4 = model.Answer4;
            m.ClassID = model.ClassID;
            m.CreateDate = model.CreateDate;
            m.Grade = model.Grade;
            m.ID = model.ID;
            m.IsAct = model.IsAct??0;
            m.PID = model.PID;
            m.QuestionType = model.QuestionType;
            m.RightAnswer = model.RightAnswer;
            m.Score =score;
            m.SPID = model.SPID;
            m.TestQuestion = model.TestQuestion;
            m.Track_V1 = model.Track_V1;
            m.Track_V2 = model.Track_V2;
            m.Track_V3 = model.Track_V3;
            return m;
        }
        public static List<Model.WX_TestQuestion> GetQuestionByActive(string  questionType)
        {
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            var list = bll.GetModelList("ClassId='" + questionType + "'");
            return list;
        }

        public static Model.WX_TestQuestion_Activity GetQuestionActive(int activeId)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            var model = bll.GetModel(activeId);
            if (model == null) {
                return new Model.WX_TestQuestion_Activity();
            }
            return model;
        }
        public static List<Models.LocationConfig> AnalysisConfig(string config)
        {
            List<Models.LocationConfig> list = new List<Models.LocationConfig>();
            string[] configs = config.Split(new string[] { "\r\n" }, StringSplitOptions.None);
            foreach (string m in configs)
            {
                if (!string.IsNullOrEmpty(m)) {
                    string[] gs = m.Split(new string[] { "|" }, StringSplitOptions.None);
                    list.Add(new Models.LocationConfig
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
        /// <summary>
        /// 是不是国学知行社
        /// 国学知行社的题库，做过的且对的，下次出次同样计分
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        private static void ExistZXS(Model.WX_TestQuestion_Activity model)
        {
            if (model.Pid==113)
            {
                IsZxs = true;
            }
            else {
                IsZxs = false;
            }
            
            
        }
        private static bool IsZxs { get; set; }
    }
}