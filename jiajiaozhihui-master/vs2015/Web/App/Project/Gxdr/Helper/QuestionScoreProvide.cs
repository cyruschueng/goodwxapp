using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    /// <summary>
    /// 分库分表
    /// </summary>
    public class QuestionScoreProvide
    {
        public static void AddApp001QuesstionScore(string appId,string openId,string activeId,string catalogue,string totalTime,string score)
        {
            Task task = new Task(()=> {
                var model = new App.Helper.Model.TestQuestionActiveScore()
                {
                    Catalogue = catalogue,
                    CreateDate = DateTime.Now,
                    OpenID = openId,
                    QuestionActiveID = int.Parse(activeId),
                    Remark = "Catalogue 这一项记录的是班级",
                    Score = string.IsNullOrEmpty(score) ? 0 : int.Parse(score),
                    UsingTime = string.IsNullOrEmpty(totalTime) ? 0 : decimal.Parse(totalTime),
                };
                App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide provide = new App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide(appId);
                provide.Add(model);
            });
            task.Start();
        }
        public static bool ExistTestQuestionActiveScore(string appId, string openId, string activeId)
        {
            App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide provide = new App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide(appId);
            var list = provide.GetModelList("openId='" + openId + "' and QuestionActiveID=" + activeId);
            return list.Count > 0 ? true : false;
        }
        public static bool ExistTestQuestionActiveScore(string appId, string openId, string activeId, string catalogue)
        {
            App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide provide = new App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide(appId);
            
            var list = provide.GetModelList("openId='" + openId + "' and QuestionActiveID=" + activeId + " and Catalogue='" + catalogue + "'");
            return list.Count > 0 ? true : false;
        }
        public static dynamic GetRank(string where,string appId,int top=20 )
        {
            App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide provide = new App.Helper.WeiXinBgDbTestQuestionActiveScoreProvide(appId);
            var list= provide.GetModelList(where);
            
            var top3List=new List<dynamic>();
            var topList = new List<dynamic>();

            var top3 = list.Take(3);
            var row = 1;
            foreach (var m in top3) {
                var user = GetUser(m.OpenID);
                top3List.Add(new
                {
                    Row = row,
                    NickName = user.NickName,
                    HeadImgUrl=user.HeadImgUrl,
                    Score = m.Score ?? 0,
                    TotalTime = string.Format("{0:0.000}", m.UsingTime / 1000),
                    ClassName = GetClassName(m.Catalogue)
                });
                row += 1;
            }
            if (list.Count > 3) {
                row = 4;
                var topOther = list.Skip(3).Take(top);
                foreach (var m in topOther) {
                    var user = GetUser(m.OpenID);
                    topList.Add(new
                    {
                        Row = row,
                        NickName = user.NickName,
                        HeadImgUrl = user.HeadImgUrl,
                        Score = m.Score ?? 0,
                        TotalTime = string.Format("{0:0.000}", m.UsingTime / 1000),
                        ClassName = GetClassName(m.Catalogue)
                    });
                    row += 1;
                }
            }
            return new
            {
                Top3= top3List,
                Top= topList
            };
        }
        private static string GetClassName(string groupId)
        {
            Generalize.Helper.GroupListProvide provide = new Generalize.Helper.GroupListProvide();
            var model= provide.GetGroupDetail(int.Parse( groupId));
            return model == null ? "" : model.title;
        }
        private static Model.WX_UserInfo GetUser(string openId)
        {
            var model= User.Helper.LocaltionUser.GetUserInfo(openId);
            return model == null ? new Model.WX_UserInfo() : model;
        } 
    }
}