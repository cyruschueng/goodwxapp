using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Shares
{
    public class ShareInfoAESModel
    {
        public string openGId { get; set; }

        public Watermark watermark { get; set; }
    }

    public class Watermark
    {
        public string appid { get; set; }
        public string timestamp { get; set; }
    }
}