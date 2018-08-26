using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Models.QueryString
{
    public class QueerStringInfo
    {
        public string OpenId { get; set; }
        public int QuestionActiveId { get; set; }
        public List<QueryStringDetails> Detail { get; set; }
        public string ZxsType { get; set; }
    }
}