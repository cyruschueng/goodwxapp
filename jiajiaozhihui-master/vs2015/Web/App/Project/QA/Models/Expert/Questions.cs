using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Expert
{
    public class Questions
    {
        public string Question { get; set; }
        public string Questioner { get; set; }
        public string NickName { get; set; }
        public DateTime? CreateDate { get; set; }
        public Answers HotAns { get; set; }
        public List<Answers> Ans { get; set; }
    }
}