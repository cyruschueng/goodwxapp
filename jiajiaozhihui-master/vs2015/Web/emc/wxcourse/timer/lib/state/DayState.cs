using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.timer.lib.state
{
    public class DayState : BaseState,IBaseState
    {
        public int Interval { get; set; }
        public override void Run()
        {
            Console.WriteLine("Timer task,current time:{0}", DateTime.Now + "-----" +"day");
        }
    }
}