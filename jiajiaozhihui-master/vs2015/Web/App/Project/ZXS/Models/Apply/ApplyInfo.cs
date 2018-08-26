using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Apply
{
    public class ApplyInfo
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int ApplyType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Decimal Margin { get; set; }
        public int ThemeNumber { get; set; }
        public int UnOpenNumber { get; set; }
        public string CurrTask { get; set; }
        public decimal LoseMargin { get; set; }
        public string Reason { get; set; }
        public string Feedback { get; set; }
        public Models.Apply.ApplyInfoDetail WeekApplyInfo { get; set; }
        public Models.Apply.ApplyInfoDetail MonthApplyInfo { get; set; }
    }
}