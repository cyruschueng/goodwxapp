using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class HistoryProvide
    {
        /// <summary>
        /// 每天一课历史数据
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        public List<dynamic> GetHistoryEveryDayData(int classId)
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list= bll.GetModelList("class_id=" + classId);
            var query = list.Where(e=>e.data_type== "everydata" && DateTime.Now.Subtract(DateTime.Parse(e.startup)).Days>0);
            BLL.WX_Audio audioBll = new BLL.WX_Audio();
            List<dynamic> tasks = new List<dynamic>();
            foreach (var m in query) {
                var id = GetForeignKey(m.data);
                var model= audioBll.GetModel(id);
                tasks.Add(new {
                    id = model.Id,
                    title = model.FullName,
                    source = model.SoundSource,
                    startUp= m.startup
                });
            }
            return tasks;
        }
        /// <summary>
        /// 每周一课历史数据
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        public List<dynamic> GetHistoryEveryWeekData(int classId)
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list = bll.GetModelList("class_id=" + classId);

            TimeSpan ts = DateTime.Now - Convert.ToDateTime(DateTime.Now.ToString("yyyy") + "-01-01");
            var day = Math.Floor(ts.TotalDays);
            int oneDay = (day % 7) >= 1 ? 1 : 0;//如果余数大于0 ，说明已经过了半周
            var weekOfYear = Math.Floor((day / 7)) + oneDay;
            var query = list.Where(e => e.data_type == "everyweek" && DateTime.Now.Year == e.year && weekOfYear > int.Parse(e.startup)).OrderByDescending(e=>e.startup);

            BLL.WX_Course courseBll = new BLL.WX_Course();
            List<dynamic> tasks = new List<dynamic>();
            foreach (var m in query) {
                var id = GetForeignKey(m.data);
                var model= courseBll.GetModel(id);
                tasks.Add(new {
                    id = model.Id,
                    title = model.Name,
                    intro = model.Intro,
                    year=m.year,
                    week= weekOfYear-int.Parse(m.startup),
                    exercisesId = model.ExercisesId,
                    startup=m.startup
                });
            }
            return tasks;
        }
        private int GetForeignKey(string json)
        {
            Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(json);
            var key = jobject["foreignKey"].ToString();
            return string.IsNullOrEmpty(key) ? 0 : int.Parse(key);
        }
    }
}