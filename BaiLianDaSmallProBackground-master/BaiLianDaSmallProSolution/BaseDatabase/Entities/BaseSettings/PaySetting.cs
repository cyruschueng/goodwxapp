using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.BaseSettings
{
    public class PaySetting
    {
        public int Id { get; set; }

        public string MchId { get; set; }

        public string PayKey { get; set; }

        public string IpAddress { get; set; }

        public string PayResulturl { get; set; }

        public string ShortName { get; set; }
    }
}
