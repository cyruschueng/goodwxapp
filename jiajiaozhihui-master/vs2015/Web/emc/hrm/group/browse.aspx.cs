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

namespace SfSoft.web.emc.hrm.group
{
    public partial class browse : SfSoft.SfEmc.EmcListBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.gtm.bbs";
        }
        //页面权限
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.hrm.group.browse,emc.hrm.group.mgt");
        }

        protected override void VtInitSearchToolsBars()
        {

        }
        protected override void VtInitToolbars()
        {

        }
        protected override void VtInitOthersToolbars()
        {
            NewTsbtnNextCat();
            tsbtnNextCat.OnClientClick = "addNext_onClick();return false;";
            tsbtnNextCat.Text = "新增下级部门";
            phToolBars.Controls.Add(tsbtnNextCat);
            NewTsbtnCurCat();
            tsbtnCurCat.OnClientClick = "addCur_onClick();return false;";
            tsbtnCurCat.Text = "新增本级部门";
            phToolBars.Controls.Add(tsbtnCurCat);
            NewTsbtnDelete();
            tsbtnDelete.OnClientClick = "delete_onClick();return false;";
            phToolBars.Controls.Add(tsbtnDelete);
            tsbtnNextCat.Enabled = SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], "emc.hrm.group.mgt");
            tsbtnCurCat.Enabled = tsbtnNextCat.Enabled;
            tsbtnDelete.Enabled = tsbtnNextCat.Enabled;
        }
    }
}


