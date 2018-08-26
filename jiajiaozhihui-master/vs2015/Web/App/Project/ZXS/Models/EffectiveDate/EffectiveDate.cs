using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.EffectiveDate
{
    public class EffectiveDate
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}