using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models.Bases
{
    public class OpenIdModel : BaseReturnModel
    {
        public string OpenId { get; set; }

        public string SessionKey { get; set; }

        public string UnionId { get; set; }
    }

    public class OpenIdModelResultModel : ErrorModel
    {
        public string openid { get; set; }

        public string session_key { get; set; }

        public string unionid { get; set; }
    }
}