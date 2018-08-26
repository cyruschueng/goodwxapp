using MyUntil;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web.Models.Tests;

namespace Web.Controllers
{
    public class TestController : ApiController
    {
        public IHttpActionResult Get([FromUri]FirstTestParamModel paramModel)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(paramModel.Id.ToString());

            return Json(model);
        }

        public IHttpActionResult Get(string type1, [FromUri]SecondTestParaModel paramModel)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("Id:{0},Name:{1}", paramModel.Id, paramModel.Name));

            return Json(model);
        }

        public IHttpActionResult Get(string type2, [FromUri]ThirdTestParaModel paramModel)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("Id:{0},Name:{1},Birth:{2}", paramModel.Id, paramModel.Name, paramModel.Birth));

            return Json(model);
        }

        [Route("api/Test/Hello")]
        [HttpPost]
        public IHttpActionResult Hello(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }

        [Route("api/Test/World")]
        [HttpPost]
        public IHttpActionResult World(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }

        //http://localhost:51193/api/Test/PutHello
        //Content-Type: application/json; charset=utf-8
        //{id:1,Name:"张三",birth:"2017-01-01"}
        [Route("api/Test/PutHello")]
        [HttpPut]
        public IHttpActionResult PutHello(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("PUT操作 Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }

        //http://localhost:51193/api/Test/PutWorld
        //Content-Type: application/json; charset=utf-8
        //{id:1,Name:"张三",birth:"2017-01-01"}
        [Route("api/Test/PutWorld")]
        [HttpPut]
        public IHttpActionResult PutWorld(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("PUT操作 Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }

        //http://localhost:51193/api/test/DeleteHello?id=1&name=张三&birth=2017-01-01
        [Route("api/Test/DeleteHello")]
        [HttpDelete]
        public IHttpActionResult DeleteHello(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("删除操作 Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }

        //http://localhost:51193/api/test/DeleteWorld?id=1&name=张三&birth=2017-01-01
        [Route("api/Test/DeleteWorld")]
        [HttpDelete]
        public IHttpActionResult DeleteWorld(dynamic obj)
        {
            var model = new TestModel();

            WebLogHelper.WebLog(string.Format("删除操作 Id:{0},Name:{1},Birth:{2}", obj.Id, obj.Name, obj.Birth));

            return Json(model);
        }
    }
}
