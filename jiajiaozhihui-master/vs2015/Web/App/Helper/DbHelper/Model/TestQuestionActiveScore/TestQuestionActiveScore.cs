using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Helper.Model
{
    public class TestQuestionActiveScore
    {
        public int ID { get; set; }
        public string  OpenID { get; set; }
        public int?  QuestionActiveID { get; set; }
        public int?  Score { get; set; }
        public decimal? UsingTime { get; set; }
        public string  Catalogue { get; set; }
        public DateTime? CreateDate { get; set; }
        public string  Remark { get; set; }
    }
}