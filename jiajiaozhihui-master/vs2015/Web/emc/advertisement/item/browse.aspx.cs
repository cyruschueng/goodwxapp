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
using System.Web.UI.MobileControls;
using System.Collections.Generic;
namespace SfSoft.web.emc.advertisement.item
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        Dictionary<string, string> ModeDic = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetModel();
                BindData(GetWhere());
            }
            else
            {
                GetModel();
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.advertisement.item";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
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
            BLL.WX_Advertisement bll = new BLL.WX_Advertisement();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Advertisement modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_Advertisement bll = new BLL.WX_Advertisement();
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
            if (txtName.Text != "") {
                strWhere += " and name like '" + txtName.Text + "'";
            }
            if (ddlOwn.SelectedItem != null && ddlOwn.SelectedValue != "") {
                strWhere += "and Own='"+ddlOwn.SelectedValue+"'";
            }
            strWhere += " order by id desc";
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
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
                if (ModeDic.ContainsKey(e.Row.Cells[4].Text))
                {
                    e.Row.Cells[4].Text = ModeDic[e.Row.Cells[4].Text].ToString();
                }
                e.Row.Cells[6].Text = e.Row.Cells[6].Text == "1" ? "启用" : "禁用";
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected void btnSearch_Click1(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void GetModel()
        {
            ModeDic = new Dictionary<string, string>();
            BLL.Pub_Modules bll = new BLL.Pub_Modules();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                ModeDic.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    ModeDic.Add(dr["ModulesID"].ToString(), dr["ModulesName"].ToString());
                }
            }
        }
    }
}


