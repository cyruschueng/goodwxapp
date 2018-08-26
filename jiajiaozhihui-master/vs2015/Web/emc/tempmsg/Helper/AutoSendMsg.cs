using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;

namespace SfSoft.web.emc.tempmsg.Helper
{
    public class AutoSendMsg : Registry 
    {
        public AutoSendMsg()
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var list = bll.GetModelList("IsAct=1");
            foreach (var model in list)
            {
                WxMsg msg = new WxMsg(model.Id);
                Schedule(() => { msg.Run(); }).ToRunOnceAt(model.SendDate);
            }
        }
    }
}