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
using System.Collections.Generic;
namespace SfSoft.web.emc.QA.apply
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
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
            hfMID.Value = "emc.qa.apply";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_QA_Info bll = new BLL.WX_QA_Info();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_QA_Info modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_QA_ExpertApplication bll = new BLL.WX_QA_ExpertApplication();
            DataSet ds = bll.GetList(strWhere);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                AspNetPager1.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager1.PageSize;
                GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1";
            if (txtName.Text.Trim() != "") {
                strWhere += " and CName like '%" + txtName.Text.Trim() + "%'";
            }
            if (txtNickName.Text.Trim() != "") {
                strWhere += " and NickName like '%" + txtNickName.Text.Trim() + "%'";
            }
            string strCheck = "";
            if (cbIsAct0.Checked == true) {
                strCheck += "IsAct=0 ";
            }
            if (cbIsAct1.Checked == true) {
                strCheck += "or  IsAct=1 ";
            }
            if (cbIsAct2.Checked == true)
            {
                strCheck += "or  IsAct=2 ";
            }
            if (strCheck.Length != 0)
            {
                if (strCheck.StartsWith("or"))
                {
                    strCheck = strCheck.Substring(2);
                }
                strWhere +=" and ("+ strCheck+")";
            }
            strWhere += " order by Id desc";
            return strWhere;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?ID=" + e.Row.Cells[1].Text + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
                if (e.Row.Cells[7].Text == "0") {
                    e.Row.Cells[7].Text = "<font color=#00f>审核中</font>";
                }
                else if (e.Row.Cells[7].Text == "1")
                {
                    e.Row.Cells[7].Text = "<font color=#0f0>审核通过</font>";
                }
                else if (e.Row.Cells[7].Text == "2")
                {
                    e.Row.Cells[7].Text = "<font color=#f00>审核失败</font>";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void btnFind_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


