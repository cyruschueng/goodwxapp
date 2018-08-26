using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace SfSoft.web.Course.Helper
{
    public class TaskProvide
    {
        private int CourseId { get; set; }
        private List<Models.DataSourse.TaskInfo> TaskInfoList { get; set; }
        public TaskProvide(int courseId)
        {
            this.CourseId = courseId;
            var configs = ReadConfig();
            this.TaskInfoList = configs;

        }
        public Models.DataSourse.TaskInfo GetConfig()
        {
            var model = TaskInfoList.Find(e => e.CourseId == this.CourseId);
            if (model == null) return new Models.DataSourse.TaskInfo();
            return model;
        }
        private List<Models.DataSourse.TaskInfo> ReadConfig()
        {
            string src = HttpContext.Current.Server.MapPath("~/App/Project/Course/DataSourse/config.js");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                var taskInfo = JsonConvert.DeserializeObject<List<Models.DataSourse.TaskInfo>>(json);
                return taskInfo;
            }
        }
    }
}