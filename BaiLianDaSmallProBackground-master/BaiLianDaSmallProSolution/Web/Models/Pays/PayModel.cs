using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Pays
{
    public class PayModel : BaseReturnModel
    {
        public string TimeStamp { get; set; }

        public string NonceStr { get; set; }

        public string Package { get; set; }

        public string SignType { get; set; }

        public string PaySign { get; set; }
    }
}