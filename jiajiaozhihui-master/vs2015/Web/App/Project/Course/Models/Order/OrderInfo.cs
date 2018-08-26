using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Order
{
    public class OrderInfo
    {
        public int Id{get;set;}
        public string OpenId{get;set;}
        public int CourseId{get;set;}
        public string Tradeno{get;set;}
        public DateTime? OrderDateTime{get;set;}
        public int BuyNumber{get;set;}
        public decimal? Price{get;set;}
        public string Remark{get;set;}
        public int IsPay{get;set;}
        public int CourseType { get; set; }
    }
}