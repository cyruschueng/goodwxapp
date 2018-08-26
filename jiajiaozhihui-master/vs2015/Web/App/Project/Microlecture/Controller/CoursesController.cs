using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture")]
    public class CoursesController : ApiController
    {
        [HttpPost]
        [Route("courses")]
        public IHttpActionResult GetCourse(dynamic obj)
        {
            try
            {
                var resourceType = Convert.ToInt32(obj.resourceType);
                Provide.CourseProvide provide = new Provide.CourseProvide();
                var result = provide.GetCorses(resourceType);
                return Json(new { success = true, task = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }
        [HttpPost]
        [Route("courses/{id}")]
        public IHttpActionResult GetCourseDetail(int id, dynamic obj)
        {
            try
            {
                var resourceType = Convert.ToInt32(obj.resourceType);
                var openId = Convert.ToString(obj.openid);
                Provide.CourseProvide provide = new Provide.CourseProvide();
                var result = provide.GetCoursesDetail(resourceType,openId,id);
                return Json(new { success = true, task = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }

        [HttpPost]
        [Route("task")]
        public IHttpActionResult GetTask(dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                Provide.CourseProvide provide = new Provide.CourseProvide();
                var result = provide.GetTask(openId);
                return Json(new { success = true, task = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }
        //[HttpPost]
        //[Route("task/courses")]
        //public IHttpActionResult GetCourse(dynamic obj)
        //{
        //    try
        //    {
        //        var courseId = Convert.ToString(obj.courseid);
        //        var openId = Convert.ToString(obj.openid);
        //        var model = Course.Helper.HomeProvide.GetCourse(int.Parse(courseId), openId);
        //        Action<int> view = Course.Helper.CourseProvide.SetViewNumber;
        //        view.BeginInvoke(int.Parse(courseId), null, null);
        //        return Json(new { success = true, data = model });
        //    }
        //    catch (Exception ex) {
        //        return Json(new { success = false, msg=ex.Message });
        //    }
        //}
        [HttpGet]
        [Route("task/history/{classid}")]
        public IHttpActionResult GetHistoryTask(int classid)
        {
            try
            {
                Provide.CourseProvide provide = new Provide.CourseProvide();
                var list = provide.GetHistoryEveryDayData(classid);
                return Json(new { success = true, data = list });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }

        }
    }
}
