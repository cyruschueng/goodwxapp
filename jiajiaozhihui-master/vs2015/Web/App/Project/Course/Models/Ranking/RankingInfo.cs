using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Ranking
{
    public class RankingInfo
    {
        public int  IsAct {get;set;}
        public int  CourseId  {get;set;}
        public string  Doc {get;set;}
        public int  GxdrId  {get;set;}
        public string  GxdrName {get;set;}
        public string  OpenId {get;set;}
        public List<Models.Prize.Gxdr>Rule {get;set;}
        public Gxdr.Models.Rank.MyRanking Ranking { get; set; }
        public int  Top  {get;set;}
    }
}