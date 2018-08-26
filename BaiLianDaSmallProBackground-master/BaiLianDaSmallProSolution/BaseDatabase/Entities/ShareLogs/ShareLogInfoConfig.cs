using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.ShareLogs
{
    class ShareLogInfoConfig : EntityTypeConfiguration<ShareLogInfo>
    {
        public ShareLogInfoConfig()
        {
            this.HasRequired(q => q.ShareUserInfo).WithMany().HasForeignKey(q => q.ShareUserInfoId);
            this.HasRequired(q => q.TargetUserInfo).WithMany().HasForeignKey(q => q.TargetUserInfoId);
        }
    }
}
