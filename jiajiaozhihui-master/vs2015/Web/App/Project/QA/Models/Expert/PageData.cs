using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Expert
{
    public class PageData
    {
        public int PageTotal { get; set; }
        public List<Questions> QuestionsList { get; set; }
    }
}