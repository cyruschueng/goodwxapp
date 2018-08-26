using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;

namespace SfSoft.web.emc.wxcourse.timer.lib
{
    public class CourseRegistry: Registry
    {

        public CourseRegistry()
        {
            
        }
        private void DayRegistry()
        {
            lib.state.DayState state = new lib.state.DayState();
            state.StartDate = DateTime.Now;
            state.EndDate = DateTime.Now.AddDays(1);
            Action action = new Action(state.Run);
            Schedule(action).ToRunOnceAt(state.StartDate);
            Schedule(action).ToRunOnceAt(state.EndDate);
        }

        private void WeekRegistry()
        {
            lib.state.WeekState state = new state.WeekState();
            state.StartDate = DateTime.Now;
            state.EndDate = DateTime.Now.AddDays(1);
            state.StartHours=14;
            state.StartMinutes=20;
            state.EndHours = 14;
            state.EndMinutes = 20;
            state.Interval = 1;
            Action action = new Action(state.Run);
            Schedule(action).ToRunOnceAt(state.StartDate).AndEvery(state.Interval).Weeks().At(state.StartHours, state.StartMinutes);
            Schedule(action).ToRunOnceAt(state.EndDate).AndEvery(state.Interval).Weeks().At(state.EndHours, state.EndMinutes);
        }
        private void MonthRegistry()
        {
            lib.state.WeekState state = new state.WeekState();
            state.StartDate = DateTime.Now;
            state.EndDate = DateTime.Now.AddDays(1);
            state.StartHours = 14;
            state.StartMinutes = 20;
            state.EndHours = 14;
            state.EndMinutes = 20;
            state.Interval = 1;
            Action action = new Action(state.Run);
            Schedule(action).ToRunOnceAt(state.StartDate).AndEvery(state.Interval).Months().OnTheFirst(DayOfWeek.Monday | DayOfWeek.Thursday).At(state.StartHours, state.StartMinutes);
            Schedule(action).ToRunOnceAt(state.EndDate).AndEvery(state.Interval).Months().OnTheFirst(DayOfWeek.Monday | DayOfWeek.Thursday).At(state.EndHours, state.EndMinutes);
        }
    }
}