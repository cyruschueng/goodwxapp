using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;
using System.Threading;

namespace SfSoft.web.emc.wxcourse.notified
{
    public class Run : Registry 
    {
        private int _courseId;
        private string _openId;
        public Run()
        {
            var courseList = GetCourse();
            var tearcherList = SfSoft.web.QA.Helper.ExpertProvide.GetAllExperts();
            foreach (var course in courseList) {
                var teacher = GetTeacher(tearcherList, course.Lecturer);
                if (!string.IsNullOrEmpty(teacher)) {
                    SendMsg sendMsg = new SendMsg(course, teacher);
                    if (course.Start.HasValue) {
                        Schedule(sendMsg.Send).ToRunOnceAt(course.Start.Value);
                    }
                }
            }
        }
        private void CreateMsg(List<web.QA.Models.Expert.ExpertInfo> tearcherList, List<Model.WX_Course> courseList, int index)
        {
            var teacher = GetTeacher(tearcherList, courseList[index-1].Lecturer);
            SendMsg sendMsg = new SendMsg(courseList[index-1], teacher);
            Schedule(sendMsg.Send).ToRunNow();
        }
        private string GetTeacher(List<web.QA.Models.Expert.ExpertInfo> expertInfo,string  expertId)
        {
            return expertInfo.Where(e => e.Id ==int.Parse(expertId)).FirstOrDefault<web.QA.Models.Expert.ExpertInfo>().Uname;
        }
        private List<Model.WX_Course> GetCourse()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            return bll.GetModelList("ParentId is null and IsBags is null and Start is not null and Start>getdate()");
        }
        private Model.WX_Course GetCourse(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            return bll.GetModel(courseId);
        }
        /// <summary>
        /// 课程报名
        /// </summary>
        private void Subscribe()
        { 
            
        }
    }
}