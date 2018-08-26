using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Bases
{
    public class UpdateBaseInfoModel : BaseReturnModel
    {
        public string AppId { get; set; }

        public string AppSecret { get; set; }

        public string AccessToken { get; set; }

        public string AccessTokenExpireTime { get; set; }
    }
}