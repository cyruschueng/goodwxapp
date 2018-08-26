using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Helper.Model
{
    public class TestQuestionAnswerRecord
    {
        public int ID { get; set; }
        public int? QuestionActiveID { get; set; }
        public string OpenID { get; set; }
        public int? TestQuestionID { get; set; }
        public int RightOrError { get; set; }
        public string SelectAnswer { get; set; }
        public int? Score { get; set; }
        public float? UsingTime { get; set; }
        public string AppId { get; set; }
    }
}