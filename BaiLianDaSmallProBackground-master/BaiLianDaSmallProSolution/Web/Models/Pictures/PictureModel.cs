using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Pictures
{
    public class PictureModel
    {
        public int code { get; set; }

        public string msg { get; set; }

        public PictureModelReturnData data { get; set; }
    }

    public class PictureModelReturnData
    {
        public string src { get; set; }
    }
}