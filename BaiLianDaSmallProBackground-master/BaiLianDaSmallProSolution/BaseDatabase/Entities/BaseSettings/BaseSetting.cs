using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.BaseSettings
{
    public class BaseSetting
    {
        public int Id { get; set; }

        public string AppId { get; set; }

        public string AppSecret { get; set; }

        public string AccessToken { get; set; }

        public DateTime? AccessTokenExpireTime { get; set; }
    }
}
