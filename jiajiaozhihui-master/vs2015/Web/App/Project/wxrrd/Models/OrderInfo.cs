using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxrrd.Models
{
    public class OrderInfo
    {
        public string OpenId{get;set;}
        public int  GoodId{get;set;}
        public string Name{get;set;}
        public string Province{get;set;}
        public string City{get;set;}
        public string District{get;set;}
        public string Address{get;set;}
        public string Telephone{get;set;}
        public DateTime OrderDate{get;set;}
        public int GoodsType { get; set; }
    }
}