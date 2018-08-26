using Senparc.Weixin;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.Entities.Request;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Senparc.Weixin.WxOpen.Containers;
using Senparc.Weixin.WxOpen.Entities;
using Senparc.Weixin.WxOpen.Helpers;
using System;
using System.IO;
using System.Web.Configuration;
using System.Web.Http;


namespace SfSoft.web.WxOpen.Controller.Habit
{

    public class WxOpenController : ApiController
    {
        /// <summary>
        /// 检查sessionId 是否有效
        /// </summary>
        /// <param name="sessionid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/wxopen/checksession/{sessionid}")]
        public IHttpActionResult CheckSession(string sessionid)
        {
            var check = SessionContainer.CheckRegistered(sessionid);
            return Ok < Boolean >(check);
        }



    }
}
