using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.timer.lib.state
{
    public interface IBaseState
    {
        DateTime StartDate { get; set; }
        DateTime EndDate { get; set; }
        void Run();
    }
}