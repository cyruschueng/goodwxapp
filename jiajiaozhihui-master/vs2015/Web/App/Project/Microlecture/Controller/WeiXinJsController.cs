using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/wx")]
    public class WeiXinJsController : ApiController
    {
        [HttpPost]
        [Route("jsconfig")]
        public async Task<IHttpActionResult> GetWeiXinJsConfig(dynamic obj)
        {
            try
            {
                string url = Convert.ToString(obj.url);
                Provide.WeiXinJsProvide provide = new Provide.WeiXinJsProvide();
                var result = await provide.GetWeixinJsConfig(url);

                return Json(new { success= true, config=result});
            }
            catch (Exception ex) {
                return Json(new { success = false});
            }
        }
    }
}
