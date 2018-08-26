using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Models.Rank
{
    public class Ranking
    {
        public int Index { get; set; }
        public string  OpenId{get;set;}
        public string NickName{get;set;}
        public string HeaderImgUrl{get;set;}
        public int? Score{get;set;}
        public int? UsingTime{get;set;}
        public string Province{get;set;}
        public string City{get;set;}
        public string District{get;set;}
        public string Street{get;set;}
    }
}