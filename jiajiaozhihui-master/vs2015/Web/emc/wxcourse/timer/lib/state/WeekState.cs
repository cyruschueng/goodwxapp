using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.timer.lib.state
{
    public class WeekState:BaseState,IBaseState
    {
        public int Interval { get; set; }
        public int StartHours { get; set; }
        public int StartMinutes { get; set; }
        public int EndHours { get; set; }
        public int EndMinutes { get; set; }
        public override void Run()
        {
            Console.WriteLine("Timer task,current time:{0}", DateTime.Now + "-----" + "day");
        }
    }
}