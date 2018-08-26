using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Order
{
    public class NewOrder
    {
        public int  CourseId{get;set;} 
        public string OpenId{get;set;} 
        public decimal Price{get;set;} 
        public string Tradeno{get;set;}
        public int CourseType { get; set; }
    }
}