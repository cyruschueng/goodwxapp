using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Models.QuestionBank
{
    public class Theme
    {
        public string Title { get; set; }
        public string RightAnswers { get; set; }
        public Answers Answers { get; set; }
    }
}