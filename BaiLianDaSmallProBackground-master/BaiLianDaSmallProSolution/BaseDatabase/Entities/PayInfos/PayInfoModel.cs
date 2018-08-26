using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.PayInfos
{
    public class PayInfoModel
    {
        public int Id { get; set; }

        public int UserInfoId { get; set; }

        public bool IsPay { get; set; }

        public string TradeNo { get; set; }

        public string Body { get; set; }

        public DateTime CreateOn { get; set; }
    }
}
