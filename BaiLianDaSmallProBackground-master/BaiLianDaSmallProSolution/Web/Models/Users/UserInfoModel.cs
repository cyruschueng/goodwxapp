using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Users
{
    public class UpdateUserInfoParamModel
    {
        public string NickName { get; set; }

        public string AvatarUrl { get; set; }

        public string OpenId { get; set; }

        public string FormId { get; set; }

        public string Mobile { get; set; }
    }

    public class UpdateUserInfoModel : BaseReturnModel
    {
        public string NickName { get; set; }

        public string AvatarUrl { get; set; }

        public string OpenId { get; set; }

        public string FormId { get; set; }

        public string FormIdExpireTime { get; set; }

        public string Mobile { get; set; }

        public int UserInfoId { get; set; }
    }
}