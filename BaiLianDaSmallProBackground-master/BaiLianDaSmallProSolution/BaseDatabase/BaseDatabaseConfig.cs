using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase
{
    public class BaseDatabaseConfig
    {
        public static void SetDbInfo()
        {
            Database.SetInitializer<BaseDatabaseContext>(null);
        }
    }
}
