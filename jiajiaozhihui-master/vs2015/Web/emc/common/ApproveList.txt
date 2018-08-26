using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using SfSoft.SfEmc;
using SfSoft.Common;

namespace SfSoft.web.emc.common
{
    public partial class ApproveList : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string ID = Request.Params["ID"].ToString();
            string MID = Request.Params["MID"].ToString();
 
            DataSet ds =DBTools .GetList ("select * from Pub_AuditRec where MID='"+MID+"' and ObjNo='"+ID+"' and (StatusFlag='S' or StatusFlag='UP') ");
            if (ds.Tables[0].Rows.Count > 0)
            {
                string AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                lblApproval.Text = "待审批人：" + AuditName;
            }
            else
            {
                lblApproval.Visible = false;
            }
            //设置审批信息
            DoAppFlow.GetAppResult(MID, ID, "App", phAppResult);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
    }
}


