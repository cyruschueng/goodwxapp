using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.ShareLogs
{
    public class ShareInfoModel
    {
        public ShareInfoModel()
        {
            CreateOn = new DateTime();
        }

        public int Id { get; set; }

        public int ShareUserInfoId { get; set; }

        public ShareType ShareType { get; set; }

        public string ShareName { get; set; }

        public string OpenGId { get; set; }

        public DateTime CreateOn { get; set; }
    }
}
