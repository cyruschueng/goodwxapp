using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.brainsexpert.competition.provide
{
    /// <summary>
    /// answer 的摘要说明
    /// </summary>
    public class answer : IHttpHandler
    {

        static string ENCRYPTKEY = "shenerxm";
        string answerjson = "";
        private string _openid = "";//解密码的openid
        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method = context.Request["method"].ToString();
            context.Response.ContentType = "text/plain";
            switch (method)
            {
                case "setscore":
                    result = SetScore(context);
                    break;
                case "getquesstion":
                    result = GetQuestionData(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string GetQuestionData(HttpContext context)
        {
            string result = "{}";
            string id = context.Request["id"].ToString();
            string openid = context.Request["openid"].ToString();
            _openid = openid;

            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(int.Parse(id));
            string usingdata = model.UsingData;
            string allocation = model.Allocation;
            string[] configs = allocation.Split(new string[] { "\r\n" }, StringSplitOptions.None);

            

            int simple_number = 0; /*简单题个数*/
            int medium_number = 0; /*中等题个数*/
            int hard_number = 0; /*因难题个数*/
            int simple_score = 0; /*简单题每题分数*/
            int medium_score = 0; /*简单题每题分数*/
            int hard_score = 0; /*简单题每题分数*/
            int activeid = int.Parse(id);  /*活动主题ID*/


            foreach (string config in configs)
            {
                string[] gs = config.Split(new string[] { "|" }, StringSplitOptions.None);
                if (gs[0] == "易")
                {
                    simple_number = int.Parse(gs[1].ToString());
                    simple_score = int.Parse(gs[2].ToString());
                }
                else if (gs[0] == "中")
                {
                    medium_number = int.Parse(gs[1].ToString());
                    medium_score = int.Parse(gs[2].ToString());
                }
                else if (gs[0] == "难")
                {
                    hard_number = int.Parse(gs[1].ToString());
                    hard_score = int.Parse(gs[2].ToString());
                }
            }
            BLL.WX_TestQuestion questionBll = new BLL.WX_TestQuestion();
            DataSet ds = questionBll.GetList(simple_number, medium_number, hard_number, simple_score, medium_score, hard_score, _openid, activeid);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }
        private string SetScore(HttpContext context)
        {
            string result = "{}";
            string index = "";
            string upgrade = "false";
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe == "")
            {
                return result;
            }
            Newtonsoft.Json.Linq.JObject scoreJson = Newtonsoft.Json.Linq.JObject.Parse(jsonscroe);
            string openid = scoreJson["openid"].ToString();
            _openid = scoreJson["openid"].ToString();
            string questionactiveid = scoreJson["questionactiveid"].ToString();
            Newtonsoft.Json.Linq.JArray jlist = Newtonsoft.Json.Linq.JArray.Parse(scoreJson["detail"].ToString());
            int score = 0;
            int t = 0;
            int timetamp = 0;
            int rightorerror = 0;
            for (int i = 0; i < jlist.Count; ++i)
            {
                rightorerror = 0;
                Newtonsoft.Json.Linq.JObject tempo = Newtonsoft.Json.Linq.JObject.Parse(jlist[i].ToString());

                t = int.Parse(tempo["usingtime"].ToString());
                timetamp += t;

                if (tempo["right"].ToString() == "1")
                {
                    rightorerror = 1;
                    int s = int.Parse(tempo["score"].ToString());
                    score += s;
                    AnswerRecold(questionactiveid, _openid, tempo["testquestion"].ToString(), rightorerror, tempo["select"].ToString(), int.Parse(tempo["score"].ToString()), int.Parse(tempo["usingtime"].ToString()));
                }
                else
                {
                    AnswerRecold(questionactiveid, _openid, tempo["testquestion"].ToString(), rightorerror, tempo["select"].ToString(), 0, int.Parse(tempo["usingtime"].ToString()));
                }
                ///答题记录
            }
            try
            {
                //活动结束，将重定向
                GameOver(questionactiveid);
                BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
                Model.WX_TestQuestion_Item_Score modelScore = bllScore.GetModel(_openid, int.Parse(questionactiveid));
                if (modelScore == null)
                {
                    modelScore = new Model.WX_TestQuestion_Item_Score();
                    modelScore.Item = int.Parse(questionactiveid);
                    modelScore.OpenId = _openid;
                    modelScore.Score = score;
                    modelScore.UsingTime = t;
                    bllScore.Add(modelScore);
                    upgrade = IsUpgrade(score, 0);
                }
                else
                {
                    //每人只能完一次，如果继续玩，将重定向
                    context.Response.Redirect(ShenerWeiXin.WXConfig.AuthURL + "game/brainsexpert/competition/alert.html?status=1");
                }
                /*
                BLL.WX_TestQuestion_Score bll = new BLL.WX_TestQuestion_Score();
                Model.WX_TestQuestion_Score model = new Model.WX_TestQuestion_Score();

                model.CreateDate = DateTime.Now;
                model.OpenID = _openid;
                model.QuestionActiveID = int.Parse(questionactiveid);
                model.Score = score;
                model.UsingTime = timetamp;
                index = bll.Add(model).ToString();
                */

                BLL.WX_TestQuestion_Player bllPlayer = new BLL.WX_TestQuestion_Player();
                Model.WX_TestQuestion_Player modelPlayer = bllPlayer.GetModeByServiceOpenID(_openid);
                modelPlayer.Score = (modelPlayer.Score ?? 0) + score;
                modelPlayer.UsingTime = (modelPlayer.UsingTime ?? 0) + t;
                bllPlayer.Update(modelPlayer);

                int getgold = 5;
                AddGold(_openid, int.Parse(questionactiveid), 0, getgold);
                string _answerjson = "";
                if (answerjson.Length != 0)
                {
                    _answerjson = answerjson.Substring(0, answerjson.Length - 1);
                }
                result = "{\"openid\":\"" + openid + "\",\"id\":\"" + index + "\",\"score\":" + score + ",\"upgrade\":\"" + upgrade + "\",\"isgetgold\":" + getgold + ",\"detail\":\"" + _answerjson + "\"}";
            }
            catch (Exception ex)
            {
                result = "{}";
            }
            return result;
        }
        /// <summary>
        /// 是否升级
        /// </summary>
        /// <returns></returns>
        private string IsUpgrade(int newscore, int totalscore)
        {
            int grade = 0;
            int newgrade = 0;
            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds = bll.GetList(1, totalscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                grade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            ds = bll.GetList(1, totalscore + newscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                newgrade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            if (newgrade > grade)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }
        /// <summary>
        /// 答题满分
        /// </summary>
        /// <param name="score"></param>
        /// <param name="activeID"></param>
        /// <returns></returns>
        private string IsGetgold(int score, int activeID)
        {
            int all_score = 0;
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(activeID);
            string allocation = model.Allocation;
            string[] configs = allocation.Split(new string[] { "\r\n" }, StringSplitOptions.None);
            foreach (string config in configs)
            {
                string[] gs = config.Split(new string[] { "|" }, StringSplitOptions.None);
                all_score += int.Parse(gs[2].ToString()) * int.Parse(gs[1].ToString());
            }
            if (all_score > 0 && score > 0 && score == all_score)
            {
                return "true";
            }
            return "false";
        }
        /// <summary>
        /// 记录每次答题数据
        /// </summary>
        /// <param name="activeid">活动主题ID</param>
        /// <param name="openid">用户ID</param>
        /// <param name="questionid">库题ID</param>
        private void AnswerRecold(string activeid, string openid, string testquestionid, int rightorerror, string answer, int score, int time)
        {
            
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            Model.WX_TestQuestion_Answer_Record model = new Model.WX_TestQuestion_Answer_Record();
            model.OpenID = openid;
            model.QuestionActiveID = int.Parse(activeid);
            model.RightOrError = rightorerror;
            model.TestQuestionID = int.Parse(testquestionid);
            model.SelectAnswer = answer;
            model.Score = score;
            model.UsingTime = time;
            int index = bll.Add(model);
            answerjson += index.ToString() + ",";
        }
        private void AddGold(string openid, int questionActiveID, int score, int gold)
        {
            BLL.WX_TestQuestion_Gold goldBll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold goldModel = null;
            goldModel = goldBll.GetModelByOpenID(openid);
            if (goldModel != null)
            {
                goldModel.LastDate = DateTime.Now;
                goldModel.Gold += gold;
                goldBll.Update(goldModel);
            }
            else
            {
                goldModel = new Model.WX_TestQuestion_Gold();
                goldModel.Gold = gold;
                goldModel.LastDate = DateTime.Now;
                goldModel.OpenID = openid;
                int row = goldBll.Add(goldModel);
            }
            AddGoldDetail(openid, questionActiveID, score, gold);
        }
        private void AddGoldDetail(string openid, int questionActiveID, int score, int gold)
        {
            BLL.WX_TestQuestion_Gold_Detail bll = new BLL.WX_TestQuestion_Gold_Detail();
            Model.WX_TestQuestion_Gold_Detail model = new Model.WX_TestQuestion_Gold_Detail();
            model.CreateDate = DateTime.Now;
            model.Gold = gold;
            model.OpenID = openid;
            model.QuestionActiveID = questionActiveID;
            model.Status = 1; //得分
            model.Remark = "擂台赛";
            int index = bll.Add(model);
        }
        private int GetGoldByScore(int score)
        {
            int result = 0;
            BLL.WX_TestQuestion_Gold_Grade bll = new BLL.WX_TestQuestion_Gold_Grade();
            DataSet ds = bll.GetList("" + score.ToString() + " between score_lower_limit  and score_upper_limit");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = int.Parse(ds.Tables[0].Rows[0]["Gold"].ToString());
            }
            return result;
        }
        /// <summary>
        /// 活动结束
        /// </summary>
        private void GameOver(string activityID)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(int.Parse(activityID));
            if (model != null)
            {
                if (model.EndDate != null)
                {
                    DateTime d = (DateTime)model.EndDate;
                    TimeSpan span = DateTime.Now.Subtract(d);
                    if (span.Seconds > 0)
                    {
                        HttpContext.Current.Response.Redirect(ShenerWeiXin.WXConfig.AuthURL + "game/brainsexpert/competition/alert.html?status=2");
                    }
                }
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}