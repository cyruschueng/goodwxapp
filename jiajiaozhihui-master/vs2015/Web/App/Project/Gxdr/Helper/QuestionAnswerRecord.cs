using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionAnswerRecord
    {
        /// <summary>
        /// 记录每次答题数据
        /// </summary>
        /// <param name="activeid">活动主题ID</param>
        /// <param name="openid">用户ID</param>
        /// <param name="questionid">库题ID</param>
        public static int AddAnswerRecold(Models.QueryString.QueryStringDetails result, string openId, int activeId) 
        {
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            var list = bll.GetModelList("OpenId='" + openId + "' and QuestionActiveID=" + activeId);
            if (!IsExistRecord(list, result.QuestionId))
            {
                var model = new Model.WX_TestQuestion_Answer_Record
                {
                    OpenID = openId,
                    QuestionActiveID = activeId,
                    RightOrError = result.IsRight??0,
                    TestQuestionID = result.QuestionId,
                    SelectAnswer =result.Answer,
                    Score =result.Score??0,
                    UsingTime =result.UsingTime??0
                };
                return bll.Add(model);
            }
            return 0;
        }
        private static bool IsExistRecord(List<Model.WX_TestQuestion_Answer_Record> records, int questionId)
        {
            return records.Exists(e => e.TestQuestionID == questionId);
        }
        public static List<Model.WX_TestQuestion_Answer_Record> GetRightAnswerRecord(string openId,int activeId)
        {
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            return  bll.GetModelList("OpenId='" + openId + "' and QuestionActiveID=" + activeId + " and RightOrError=1");
        }

        #region 分库分表操作

        /// <summary>
        /// 枙子会练习测试记录
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="activeId"></param>
        /// <param name="answer"></param>
        public static void AddApp001Record(string appId,string openId,int activeId,string answer)
        {
            Task task = new Task(() =>
            {
                var answers = answer.Split(',');
                App.Helper.WeiXinBgDbTestQuestionAnswerRecordProvide provide = new App.Helper.WeiXinBgDbTestQuestionAnswerRecordProvide();
                foreach (var m in answers)
                {
                    var record = new App.Helper.Model.TestQuestionAnswerRecord()
                    {
                        AppId = appId,
                        OpenID = openId,
                        QuestionActiveID = activeId,
                        TestQuestionID = int.Parse(m),
                    };
                    provide.Add(record);
                }
            });
            task.Start();
        }
        #endregion
    }
}