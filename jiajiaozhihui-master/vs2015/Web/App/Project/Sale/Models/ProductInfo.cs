using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Sale.Models
{
    public class ProductInfo
    {
        public int ProductId{get;set;}
        public string ProductName{get;set;}
        public decimal MarketPrice{get;set;}
        public decimal Price{get;set;}
        public int Number{get;set;}
        public string DescInfo{get;set;}
        public string IntroInfo{get;set;}
        public string ProductType{get;set;}
        public string ImgUrl { get; set; }
    }
}