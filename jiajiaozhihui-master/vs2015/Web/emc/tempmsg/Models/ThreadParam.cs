using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.tempmsg.Models
{
    public class ThreadParam
    {
        public string ThreadName { get; set; }
        public int Quantity { get; set; }
        public object  TempData { get; set; }
        public string Url { get; set; }
        public string TempId { get; set; }
    }
}