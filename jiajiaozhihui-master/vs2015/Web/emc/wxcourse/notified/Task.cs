using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;

namespace SfSoft.web.emc.wxcourse.notified
{
    public class Task
    {
        public Task(Action job,Action<Schedule> schedule)
        {
            JobManager.AddJob(job, schedule);
        }
    }
}