using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Apply
{
    public class ApplyInfoDetail
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public int CompletedNumber { get; set; }
        public int FailNumber { get; set; }
        public int SuccessNumber { get; set; }
        public int CheckingNumber { get; set; }
    }
}