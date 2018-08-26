using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase
{
    public partial class BaseDatabaseContext : DbContext
    {
        public DbSet<AdminUserInfo> AdminUserInfos { get; set; }

        public DbSet<AdvertisingSpaceInfo> AdvertisingSpaceInfos { get; set; }

        public DbSet<AdvContentInfo> AdvContentInfos { get; set; }
    }
}
