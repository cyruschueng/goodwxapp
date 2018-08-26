using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Helper
{
    public class SessionKeyProvide
    {
        public static  string GetOpenIdBySessionId(string sessionKey)
        {

            if (!string.IsNullOrEmpty(sessionKey))
            {
                var bag = Senparc.Weixin.WxOpen.Containers.SessionContainer.GetSession(sessionKey);
                if (bag == null)
                {
                    throw new Helper.SessionKeyException("sessionKey 无效");
                }
                else
                {
                    return bag.OpenId;
                }
            }
            else {
                throw new Helper.SessionKeyException("sessionKey 为空");
            }
        }
    }
}