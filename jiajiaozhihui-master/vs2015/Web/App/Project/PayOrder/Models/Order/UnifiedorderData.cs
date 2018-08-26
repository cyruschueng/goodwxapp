using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.PayOrder.Models.Order
{
    public class UnifiedorderData
    {
        public string  Body{get;set;}
        public string  OutTradeNo{get;set;}
        public string  OpenId{get;set;}
        public string  Attach{get;set;}
        public string  TimeStamp{get;set;}
        public string  NonceStr{get;set;}
        public int  TotalFee{get;set;}
        public string  TradeType{get;set;}
        public string  AppId{get;set;}
        public string MchId { get; set; }
        public string NotifyUrl { get; set; }
        public string GoodsTag { get; set; }
        public string SpbillCreateIp { get; set; }
        public string ProductId { get; set; }
    }
}