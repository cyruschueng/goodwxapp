using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.UserInfos
{
    public class UserInfoModel
    {
        public int Id { get; set; }

        public string NickName { get; set; }

        public string AvatarUrl { get; set; }

        public string OpenId { get; set; }

        public string Mobile { get; set; }

        public string FormId { get; set; }

        public DateTime? FormIdExpireTime { get; set; }
    }
}
