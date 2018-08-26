using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using System.IO;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// answer 的摘要说明
    /// </summary>
    public class answer : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method = context.Request["method"].ToString();
            context.Response.ContentType = "text/plain";
            switch (method) { 
                case "setscore":
                    result=SetScore(context);
                    break;
                case "getquesstion":
                    result=GetQuestionData(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string GetQuestionData(HttpContext context)
        {
            string id = context.Request["id"].ToString();
            string openid = context.Request["openid"].ToString();

            var list= game.brainsexpert.Provide.QuestionProvide.GetQuestion(int.Parse(id), openid);
            return Newtonsoft.Json.JsonConvert.SerializeObject(list);

        }
        private string SetScore(HttpContext context)
        {
            int index = 0;
            string jsonscroe = context.Request["json"].ToString();
            if (jsonscroe == "")
            {
                return "";
            }
            MyQuestionResult = InitPrams(jsonscroe);
            for (int i = 0; i < MyQuestionResult.Detail.Count; ++i)
            {
                Newtonsoft.Json.Linq.JObject tempo = Newtonsoft.Json.Linq.JObject.Parse(MyQuestionResult.Detail[i].ToString());
                DoRight(tempo);
            }
            DoZxs();
            UpdatePlayer();
            UpdateGold();

            if (NewResults.Length != 0)
            {
                NewResults = NewResults.Substring(0, NewResults.Length - 1);
            }
            var result = "{\"openid\":\"" + MyQuestionResult.OpenId + "\",\"id\":\"" + index + "\",\"score\":" + MyScore ?? 0 + ",\"upgrade\":\"" + MyUpgrade + "\",\"isgetgold\":" + MyGold ?? 0 + ",\"detail\":\"" + NewResults + "\"}";
            return result;

        }
        private void DoRight(Newtonsoft.Json.Linq.JObject model)
        {
            MyScore = MyScore ?? 0 + int.Parse(model["score"].ToString());
            MyTimeTamp = MyTimeTamp ?? 0 + int.Parse(model["usingtime"].ToString());
            if (MyQuestionResult.ZxsType.ToLower() != "month") {
                AnswerRecold(MyQuestionResult.QuestionActiveId.ToString(), MyQuestionResult.OpenId, model["testquestion"].ToString(), 1, model["select"].ToString(), int.Parse(model["score"].ToString()), int.Parse(model["usingtime"].ToString()));
            }
        }
        /// <summary>
        /// 更新金币
        /// </summary>
        private void UpdateGold()
        {
            MyGold = GetGoldByScore(MyScore??0);
            if ((MyGold??0) != 0)
            {
                AddGold(MyQuestionResult.OpenId, MyQuestionResult.QuestionActiveId, MyScore ?? 0, MyGold??0);
            }
        }
        /// <summary>
        /// 更新活动主题获得的分数
        /// </summary>
        private void UpdateQuestionItemScore()
        {
            if (string.IsNullOrEmpty(MyQuestionResult.ZxsType.ToLower())) {
                BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
                Model.WX_TestQuestion_Item_Score modelScore = bllScore.GetModel(MyQuestionResult.OpenId, MyQuestionResult.QuestionActiveId);
                if (modelScore == null)
                {
                    var model = SetQuestionItemScore();
                    bllScore.Add(model);
                    MyUpgrade = IsUpgrade(MyScore ?? 0, 0);
                }
                else
                {
                    var model = SetQuestionItemScore(modelScore);
                    bllScore.Update(model);
                    MyUpgrade = IsUpgrade((MyScore ?? 0), (int)modelScore.Score);
                }
            }
        }
        /// <summary>
        /// 处理知行社
        /// </summary>
        private void DoZxs()
        {
            if (!string.IsNullOrEmpty(MyQuestionResult.ZxsType.ToLower()))
            {
                BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
                Model.WX_TestQuestion_Item_Score modelScore = bllScore.GetModel(MyQuestionResult.OpenId, MyQuestionResult.QuestionActiveId);

                if (MyQuestionResult.ZxsType.ToLower() == "week")
                {
                    //用于知行社统计测试次数
                    AddRecord(MyQuestionResult.QuestionActiveId.ToString(), MyScore ?? 0, MyTimeTamp ?? 0);
                }
                else if (MyQuestionResult.ZxsType.ToLower() == "month")
                {
                    if (modelScore == null)
                    {
                        var model = SetQuestionItemScore();
                        bllScore.Add(model);
                    }
                    else
                    {
                        if ((modelScore.Score ?? 0) < (MyScore ?? 0))
                        {
                            var model = SetQuestionItemScore();
                            bllScore.Update(model);
                        }
                    }
                }   
            }
        }
        private Model.WX_TestQuestion_Item_Score  SetQuestionItemScore()
        {
            return new Model.WX_TestQuestion_Item_Score
            {
                Item = MyQuestionResult.QuestionActiveId,
                OpenId = MyQuestionResult.OpenId,
                Score = MyScore ?? 0,
                UsingTime = MyTimeTamp ?? 0
            };
        }
        private Model.WX_TestQuestion_Item_Score SetQuestionItemScore(Model.WX_TestQuestion_Item_Score model)
        {
            return new Model.WX_TestQuestion_Item_Score
            {
                Item = model.Item,
                OpenId = model.OpenId,
                UsingTime = (model.UsingTime ?? 0) + (MyTimeTamp ?? 0),
                Score = (model.Score ?? 0) + (MyScore ?? 0)
            };
        }
        private void UpdatePlayer()
        {
            BLL.WX_TestQuestion_Player bllPlayer = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player modelPlayer = bllPlayer.GetModeByServiceOpenID(MyQuestionResult.OpenId);
            modelPlayer.Score = (modelPlayer.Score ?? 0) + (MyScore ?? 0);
            modelPlayer.UsingTime = (modelPlayer.UsingTime ?? 0) + (MyTimeTamp ?? 0);
            bllPlayer.Update(modelPlayer);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="prams">答题结果</param>
        /// <returns></returns>
        private SfSoft.web.game.brainsexpert.Models.QuestionResult InitPrams(string prams)
        {
            Newtonsoft.Json.Linq.JObject scoreJson = Newtonsoft.Json.Linq.JObject.Parse(prams);
            var result = new brainsexpert.Models.QuestionResult
            {
                OpenId = scoreJson["openid"].ToString(),
                QuestionActiveId = int.Parse(scoreJson["questionactiveid"].ToString()),
                Detail = Newtonsoft.Json.Linq.JArray.Parse(scoreJson["detail"].ToString()),
                ZxsType=GetZxsType( scoreJson["questionactiveid"].ToString())
            };
            return result;
        }
        /// <summary>
        /// 是否升级
        /// </summary>
        /// <returns></returns>
        private string IsUpgrade(int newscore,int totalscore)
        {
            int grade = 0;
            int newgrade = 0;
            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds=bll.GetList(1, totalscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                grade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            ds= bll.GetList(1, totalscore+newscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                newgrade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            if (newgrade > grade) {
                return "true";
            }else{
                return "false";
            }
        }
        /// <summary>
        /// 答题满分可以获取金币
        /// </summary>
        /// <param name="score"></param>
        /// <param name="activeID"></param>
        /// <returns></returns>
        private string IsGetgold(int score,int activeID)
        {
            int all_score = 0;
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(activeID);
            string allocation = model.Allocation;
            string[] configs = allocation.Split(new string[] { "\r\n" }, StringSplitOptions.None);
            foreach (string config in configs) {
                string[] gs = config.Split(new string[] { "|" }, StringSplitOptions.None);
                all_score += int.Parse(gs[2].ToString())*int.Parse(gs[1].ToString());
            }
            if (all_score > 0 && score>0 && score == all_score)
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
        private void AnswerRecold(string activeid, string openid, string testquestionid,int rightorerror,string answer,int score,int time)
        {
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            var list = bll.GetModelList("OpenId='" + openid + "' and QuestionActiveID=" + activeid);
            if (!IsExistRecord(list, int.Parse(testquestionid))) {
                var model = new Model.WX_TestQuestion_Answer_Record
                {
                    OpenID = openid,
                    QuestionActiveID =int.Parse(activeid),
                    RightOrError = rightorerror,
                    TestQuestionID = int.Parse(testquestionid),
                    SelectAnswer = answer,
                    Score = score,
                    UsingTime = time
                };
                int index = bll.Add(model);
                NewResults += index.ToString() + ",";
            }
        }
        private bool IsExistRecord(List<Model.WX_TestQuestion_Answer_Record> records,int questionId)
        {
            return records.Exists(e => e.TestQuestionID == questionId);
        }

        private void AddGold(string openid,int questionActiveID,int score,int gold)
        {
            BLL.WX_TestQuestion_Gold goldBll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold goldModel = null;
            goldModel = goldBll.GetModelByOpenID(openid);
            if (goldModel!=null)
            {
                goldModel.LastDate = DateTime.Now;
                //goldModel.Gold += 10;
                goldModel.Gold += gold;
                goldBll.Update(goldModel);
            }
            else {
                goldModel = new Model.WX_TestQuestion_Gold();
                //goldModel.Gold = 10;
                goldModel.Gold = gold;
                goldModel.LastDate = DateTime.Now;
                goldModel.OpenID = openid;
                int row=goldBll.Add(goldModel);
            }
            AddGoldDetail(openid, questionActiveID, score,gold);
        }
        private void AddGoldDetail(string openid,int questionActiveID,int score,int gold)
        {
            BLL.WX_TestQuestion_Gold_Detail bll = new BLL.WX_TestQuestion_Gold_Detail();
            Model.WX_TestQuestion_Gold_Detail model = new Model.WX_TestQuestion_Gold_Detail();
            model.CreateDate = DateTime.Now;
            model.Gold = gold;
            model.OpenID = openid;
            model.QuestionActiveID = questionActiveID;
            model.Status = 1; //得分
            model.Remark = "答题奖励";
            int index= bll.Add(model);
        }
        private int GetGoldByScore(int score)
        {
            int result = 0;
            BLL.WX_TestQuestion_Gold_Grade bll = new BLL.WX_TestQuestion_Gold_Grade();
            DataSet ds = bll.GetList(""+score.ToString()+" between score_lower_limit  and score_upper_limit");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result =int.Parse(ds.Tables[0].Rows[0]["Gold"].ToString());
            }
            return result;
        }
        private string  GetZxsType(string  questionActiveID)
        {
            string src = HttpContext.Current.Server.MapPath("~/game/js/zxs_data.js");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                var results= Newtonsoft.Json.Linq.JObject.Parse(json);
                foreach (var info in results["info"])
                {
                    if (info["id"].ToString() == questionActiveID)
                    {
                        return info["type"].ToString();
                    }
                }
                return "";
            }
        }
        private void AddRecord(string questionactiveid, int score, int timetamp)
        {
            BLL.WX_TestQuestion_Score bll = new BLL.WX_TestQuestion_Score();
            Model.WX_TestQuestion_Score model = new Model.WX_TestQuestion_Score();
            model.CreateDate = DateTime.Now;
            model.OpenID = MyQuestionResult.OpenId;
            model.QuestionActiveID = int.Parse(questionactiveid);
            model.Score = score;
            model.UsingTime = timetamp;
            bll.Add(model).ToString();
        }
        /// <summary>
        /// 答题所有取得的分数
        /// </summary>
        private int? MyScore { get; set; }
        /// <summary>
        /// 答题所有用的时间
        /// </summary>
        private int? MyTimeTamp { get; set; }
        /// <summary>
        /// 答题结果
        /// </summary>
        private brainsexpert.Models.QuestionResult MyQuestionResult { get; set; }
        /// <summary>
        /// false:没有升级  true:升级
        /// </summary>
        private string MyUpgrade { get; set; }
        /// <summary>
        /// 新生成的记录Id
        /// </summary>
        private string NewResults { get; set; }
        /// <summary>
        /// 获取钻石
        /// </summary>
        private int? MyGold { get; set; }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}