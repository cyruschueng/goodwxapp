using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;

namespace SfSoft.web.emc.wxcourse.notified
{
    public class SendMsg:IJob
    {
        public string _teacher;
        public Model.WX_Course _course;
        public SendMsg(Model.WX_Course course,string teacher)
        {
            this._teacher = teacher;
            this._course = course;
        }
        public void Send()
        { 
            var msgInfo = new MsgInfo();
            msgInfo.CourseName = _course.Name;
            msgInfo.Intro = _course.Intro;
            msgInfo.SchoolTime = _course.Start ?? DateTime.Now;
            msgInfo.Teacher =_teacher;
            msgInfo.Remark = "";
            msgInfo.CourseId = _course.Id;
            TemplateMsg msg = new TemplateMsg(msgInfo);
            msg.SendMsg();
        }

        void IJob.Execute()
        { 
            
        }
    }
}