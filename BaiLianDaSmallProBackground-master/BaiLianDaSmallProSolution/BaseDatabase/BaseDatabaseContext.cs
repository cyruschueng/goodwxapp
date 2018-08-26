using BaseDatabase.Entities.BaseSettings;
using BaseDatabase.Entities.PayInfos;
using BaseDatabase.Entities.ShareLogs;
using BaseDatabase.Entities.UserInfos;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase
{
    public partial class BaseDatabaseContext : DbContext
    {
        //todo:1、建表 第一步 关联表
        
        public BaseDatabaseContext() : base("baseDbConn")
        {

        }

        public DbSet<UserInfo> UserInfos { get; set; }

        public DbSet<BaseSetting> BaseSettings { get; set; }

        public DbSet<PayInfo> PayInfos { get; set; }

        public DbSet<PaySetting> PaySettings { get; set; }

        public DbSet<ShareLogInfo> ShareLogInfos { get; set; }

        public DbSet<ShareInfo> ShareInfos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Configurations.Add(new ShareLogInfoConfig());

            base.OnModelCreating(modelBuilder);
        }
    }
}
