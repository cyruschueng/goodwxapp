using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Bases
{
    public class AccessTokenModel : BaseReturnModel
    {
        public string AccessToken { get; set; }

        public string AccessTokenExpireTime { get; set; }
    }

    public class AccessTokenHttpResultModel : ErrorModel
    {
        public string access_token { get; set; }

        public int expires_in { get; set; }
    }
}