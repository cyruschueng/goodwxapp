using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.SfEmc
{
    public class EbsBaseMasterWebPage : System.Web.UI.MasterPage
    {
        public string StopCopyStr1 = "";
        public string StopCopyStr2 = "";

        protected virtual void Page_Init(object sender, EventArgs e)
        {
            if (Application["IsSiteCopy"].ToString() != "1")
            {
                StopCopyStr1 = " oncontextmenu=\"self.event.returnValue=false\"  ondragstart=\"return false\" onselectstart =\"return false\" onselect=\"document.selection.empty()\" oncopy=\"document.selection.empty()\" onbeforecopy=\"return false\" onmouseup=\"document.selection.empty()\"";
                StopCopyStr2 = "<noscript><iframe src=\" * \"></iframe></noscript>";
            }
            else
            {
                StopCopyStr1 = "";
                StopCopyStr2 = "";
            }
        }
    }
}
