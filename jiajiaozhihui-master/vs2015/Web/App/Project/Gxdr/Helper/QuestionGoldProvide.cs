using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionGoldProvide
    {
        public static void AddGold(Models.AnswerResult.ResultInfo info) 
        {
            BLL.WX_TestQuestion_Gold goldBll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold goldModel = null;
            goldModel = goldBll.GetModelByOpenID(info.OpenId);
            if (goldModel != null)
            {
                goldModel.LastDate = DateTime.Now;
                //goldModel.Gold += 10;
                goldModel.Gold += info.Gold;
                goldBll.Update(goldModel);
            }
            else
            {
                goldModel = new Model.WX_TestQuestion_Gold();
                //goldModel.Gold = 10;
                goldModel.Gold =info.Gold;
                goldModel.LastDate = DateTime.Now;
                goldModel.OpenID = info.OpenId;
                int row = goldBll.Add(goldModel);
            }
            AddGoldDetail( info.OpenId,info.ActiveId,info.Score,info.Gold);
        }
        private static void AddGoldDetail(string openid, int questionActiveID, int score, int gold)
        {
            BLL.WX_TestQuestion_Gold_Detail bll = new BLL.WX_TestQuestion_Gold_Detail();
            Model.WX_TestQuestion_Gold_Detail model = new Model.WX_TestQuestion_Gold_Detail();
            model.CreateDate = DateTime.Now;
            model.Gold = gold;
            model.OpenID = openid;
            model.QuestionActiveID = questionActiveID;
            model.Status = 1; //得分
            model.Remark = "答题奖励";
            int index = bll.Add(model);
        }
        public static int GetGoldByScore(int score)
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
    }
}