using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.ActiveCard
{
    public class AllegeInfo
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public int CardType{get;set;}
        public string CardNo{get;set;}
        public string OpenId{get;set;}
        public string IpAddress{get;set;}
        public DateTime RegistDate { get; set; }
        public int IsAct { get; set; }
        public int IsAgree { get; set; }
        public DateTime? AgreeDate { get; set; }
    }
}