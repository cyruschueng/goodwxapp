using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Statistics
{
    public class UserTaskClassDetail
    {
        public int CompletedNumber { get; set; }
        public int SuccessNumber { get; set; }
        public int FailNumber { get; set; }
        public int CheckingNumber { get; set; }
        public int Price { get; set; }
    }
}