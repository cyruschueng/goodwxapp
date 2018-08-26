using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Question
{
    public class QuestionInfo
    {
        public string AppId{get;set;}
        public string OpenId{get;set;}
        public string Comment{get;set;}
        public string Tag{get;set;}
        public string Title { get; set; }
        public string Expert { get; set; }
    }
}