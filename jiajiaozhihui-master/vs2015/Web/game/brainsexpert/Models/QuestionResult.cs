using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.brainsexpert.Models
{
    public class QuestionResult
    {
        public string OpenId { get; set; }
        public int QuestionActiveId { get; set; }
        public Newtonsoft.Json.Linq.JArray Detail { get; set; }
        public string ZxsType { get; set; }
    }
}