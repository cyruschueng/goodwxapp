using BaseDatabase.Entities.UserInfos;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.ShareLogs
{
    public class ShareLogInfo
    {
        public ShareLogInfo()
        {
            CreateOn = DateTime.Now;
        }

        public int Id { get; set; }

        public int ShareUserInfoId { get; set; }

        public virtual UserInfo ShareUserInfo { get; set; }

        public int TargetUserInfoId { get; set; }

        public virtual UserInfo TargetUserInfo { get; set; }

        public ShareType ShareType { get; set; }

        public string ShareName { get; set; }

        public string OpenGId { get; set; }

        public DateTime CreateOn { get; set; }
    }

    public enum ShareType
    {
        [Description("未知")]
        Undefined = -1,
        [Description("首页")]
        Index = 1
    }
}
