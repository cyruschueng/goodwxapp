using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;
using System.Web.Services;
using System.Collections.Generic;
using FluentScheduler;
using SfSoft.web.emc.wxcourse.notified;
namespace SfSoft.web.emc.tempmsg.wx
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        public string RecordNumber;
        protected void Page_Load(object sender, EventArgs e)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            hfRecordNumber.Value = bll.GetRecordCount("openid  like 'oc6zz%' and IsSubscibe=1").ToString();
            //hfRecordNumber.Value = bll.GetRecordCount("openid  like 'oqmj%' and IsSubscibe=1 and isnull(nickname,'')='' ").ToString();
            RecordNumber = hfRecordNumber.Value;
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.course";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        
    }
}


