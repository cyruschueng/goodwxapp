using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/learn")]
    public class LearnRecorderController : ApiController
    {
        [HttpPost]
        [Route("record/{courseid}/add")]
        public IHttpActionResult AddRecord(int courseid, dynamic obj)
        {
            try
            {
                var learner = Convert.ToString(obj.learner);
                Provide.LearnRecorderProvide provide = new Provide.LearnRecorderProvide();
                provide.AddLearnRecorder(courseid, learner);
                return Ok(new { success = true });
            }
            catch (Exception ex) {
                return Ok(new { success = false });
            }
        }

        [HttpGet]
        [Route("rank/{classno}")]
        public IHttpActionResult GetLearnRank(string classno)
        {
            try
            {
                Provide.LearnRecorderProvide provide = new Provide.LearnRecorderProvide();
                var list= provide.GetLearnRecordRank(classno);
                return Json(new
                {
                    success=true,
                    list=list
                });
            }
            catch (Exception ex) {
                return Json(new
                {
                    success = false,
                    msg=ex.Message
                });
            }
        }
    }
}
