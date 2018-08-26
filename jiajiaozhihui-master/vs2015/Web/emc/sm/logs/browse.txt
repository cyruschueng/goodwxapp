using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Text;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;
using SfSoft.DBUtility;
using System.IO;
using System.Xml;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Serialization;
 
using System.Runtime.Serialization;
namespace SfSoft.web.emc.sm.logs
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                EmcCommon.GetFilialeIDDropDownList(ddlCompany);
                EmcCommon.GetDeptIDDropDownList(ddlDept, Session["FilialeID"].ToString());
                txtStartDate.Text = PageValidate.FormatSmallDate(DateTime.Now);
                txtEndDate.Text = PageValidate.FormatSmallDate(DateTime.Now);
                if (ddlCompany.Items != null && ddlCompany.Items.FindByValue(Session["FilialeID"].ToString()) != null)
                {
                    ddlCompany.Items.FindByValue(Session["FilialeID"].ToString()).Selected = true;
                }
                BindData(GetWhere());
 
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.logs";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.logs.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        //绑定信息列表
        private void BindData(string strWhere)
        {
            BLL.Emc_logs bll = new BLL.Emc_logs();
            DataSet ds =  bll.GetList(strWhere);

            Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
        }

        protected void ddlCompany_SelectedIndexChanged(object sender, EventArgs e)
        {
            string FilialeID = ddlCompany.SelectedItem.Value;
            if (FilialeID == "--")
            {
                ddlDept.ClearSelection();
                ddlDept.Items.FindByValue("--").Selected = true;

            }
            else
            {
                EmcCommon.GetDeptIDDropDownList(ddlDept, FilialeID);
                BindData(GetWhere());
            }
        }

        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }

        private string GetWhere()
        {
            string FilialeID = ddlCompany.SelectedItem.Value;
            string DeptID = ddlDept.SelectedItem.Value;
            string CnName = txtCnName.Text;
            string StartDate = this.txtStartDate.Text;
            string EndDate = this.txtEndDate.Text;
 
            

            StringBuilder strWhere = new StringBuilder();

            strWhere.Append("  1=1  ");
            if (CnName != "")
            {
                strWhere.Append(" and  CnName like '%" + CnName + "%' ");
            }
            if (StartDate != "")
            {

                StartDate = StartDate + " 00:00:00";
                strWhere.Append(" and  LoginTime >= '" + StartDate + "' ");
            }
            if (EndDate != "")
            {
                EndDate = EndDate + " 23:59:59";
                strWhere.Append(" and  LoginTime <= '" + EndDate + "' ");
            }
            if (DeptID != "" && DeptID != "--")
            {
                strWhere.Append(" and  DeptID = '" + DeptID + "' ");
            }
            if (FilialeID != "" && FilialeID != "--")
            {
                strWhere.Append(" and  FilialeID = '" + FilialeID + "' ");
            }
            strWhere.Append("  order by LoginTime desc,CnName,Dept ");
            return strWhere.ToString();
        }

        protected void btnClear_Click(object sender, EventArgs e)
        {
            string Months = ddlMonths.SelectedItem.Value;
            int mm = int.Parse(Months) * -1;
            DateTime dt = DateTime.Now.AddMonths(mm);
            string strSql = "delete Emc_logs where LoginTime <='" + PageValidate.FormatSmallDate(dt) + "'";
            DbHelperSQL.ExecuteSql(strSql);
            lblMsg.Text = "数据已清除";
            BindData(GetWhere());
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

 
 
    }
}


