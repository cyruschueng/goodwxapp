using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.PayOrder.Models.Order
{
    public class NewOrder
    {
        public int GoodId { get; set; }
        public  string  OpenId{get;set;}
        public  int  BuyNumber{get;set;}
        public  decimal?  Price{get;set;}
        public  string  UserName{get;set;}
        public  string  Telephone{get;set;}
        public  string  Province{get;set;}
        public  string  City{get;set;}
        public  string  District{get;set;}
        public  string  Address{get;set;}
        public  int  OrderType{get;set;}
        public string Remark { get; set; }
        public string Tradeno { get; set; }
    }
}