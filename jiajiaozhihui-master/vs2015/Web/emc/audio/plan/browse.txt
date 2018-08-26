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
namespace SfSoft.web.emc.audio.plan
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
        private void BindAudioData(string strWhere)
        {
            
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.plan";
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
            
        }
        private void BindData(string strWhere)
        {

            BLL.WX_Audio_Plan bll = new BLL.WX_Audio_Plan();

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
            string strWhere = "1=1 ";
            return strWhere;
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            string strErr = "";
            if (txtPlanName.Text.Trim() == "") {
                strErr += "计划名称不能为空";
            }
            if (txtStartDate.Text == "") {
                strErr += "开始日期不能为空"; 
            }
            if (txtEndDate.Text == "") {
                strErr += "结束日期不能为空"; 
            }

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }

            Model.WX_Audio_Plan model = new Model.WX_Audio_Plan();
            model.CreateDate = DateTime.Now;
            model.EndDate =DateTime.Parse(txtEndDate.Text);
            model.IsAct = 1;
            model.PlanName = txtPlanName.Text;
            model.StartDate = DateTime.Parse(txtStartDate.Text);
            BLL.WX_Audio_Plan bll = new BLL.WX_Audio_Plan();
            bll.Add(model);

            BindData(GetWhere());
            txtPlanName.Text = "";
            txtStartDate.Text = "";
            txtEndDate.Text = "";
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?Id=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                string tip = e.Row.Cells[1].Text;
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";
                if (e.Row.RowState == DataControlRowState.Edit) {
                    

                    HiddenField hfIsAct= e.Row.Cells[4].FindControl("hfIsAct") as HiddenField;
                    DropDownList ddlGIsAct= e.Row.Cells[4].FindControl("ddlGIsAct") as DropDownList;
                    ddlGIsAct.Items.FindByValue(hfIsAct.Value).Selected = true;
                }
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[7].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + tip + "\"吗?')");
                }
            }
        }
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_Audio_Plan bllbd = new BLL.WX_Audio_Plan();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Audio_Plan model = new Model.WX_Audio_Plan();
            BLL.WX_Audio_Plan bll = new BLL.WX_Audio_Plan();

            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            model = bll.GetModel(RefID);

            string startDate=(GridView1.Rows[e.RowIndex].FindControl("gStartDate") as TextBox).Text;
            model.StartDate = DateTime.Parse(startDate);
            string endDate = (GridView1.Rows[e.RowIndex].FindControl("gEndDate") as TextBox).Text;
            model.EndDate = DateTime.Parse(endDate);
            DropDownList ddlIsAct = GridView1.Rows[e.RowIndex].FindControl("ddlGIsAct") as DropDownList;
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "") {
                model.IsAct = int.Parse(ddlIsAct.SelectedValue);
            }

            bll.Update(model);

            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
    }
}


