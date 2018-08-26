using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.ShareLogs
{
    public class ShareLogInfoModel
    {
        public int Id { get; set; }

        public int ShareUserInfoId { get; set; }

        public int TargetUserInfoId { get; set; }

        public ShareType ShareType { get; set; }

        public string ShareName { get; set; }

        public string OpenGId { get; set; }

        public DateTime CreateOn { get; set; }
    }
}
