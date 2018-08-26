using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.emc.wxcourse.comment
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindData(GetWhere());
            }
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.reward";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.emc.wxcourse.reward.browse");
        }

        private void BindData(string strWhere)
        {
            string sql = "select * from (";
            sql += " select a.*,b.Name as CourseName from dbo.WX_Course_Comment a";
            sql += " left join dbo.WX_Course b on a.CourseId=b.Id)a";
            sql += " where "+strWhere;

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

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

        private string GetWhere()
        {
            string strWhere = "1=1 ";
            if (txtCourse.Text != "") {
                strWhere += " and CourseName like '%"+txtCourse.Text+"%'";
            }
            if (txtNickName.Text != "") {
                strWhere += " and CommentName like '%" + txtNickName.Text + "%'";
            }
            if (txtComment.Text != "")
            {
                strWhere += " and Content like '%" + txtComment.Text + "%'";
            }
            if (ddlIsCheck.SelectedItem != null && ddlIsCheck.SelectedValue!="") {
                strWhere += " and IsCheck="+ddlIsCheck.SelectedValue;
            }
            string startDate = txtStartDate.Text;
            if (txtStartDate.Text == "") {
                startDate = "2016-01-01";
            }
            string endDate = txtEndDate.Text;
            if (txtEndDate.Text == "") {
                endDate = "2099-12-30";
            }
            strWhere += "and  CreateDate between '"+startDate+"' and '"+endDate+"'";

            return strWhere;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_Course_Reward bllbd = new BLL.WX_Course_Reward();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Course_Comment modelbd = new Model.WX_Course_Comment();
            BLL.WX_Course_Comment bllBd = new BLL.WX_Course_Comment();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);

            int IsAct = 1;
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsActv"))).Checked)
            {
                IsAct = 0;
            }
            modelbd.IsCheck = IsAct;
            bllBd.Update(modelbd);

            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        //取消
        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (((CheckBox)e.Row.FindControl("cbIsActv")) != null)
            {
                CheckBox cbIsActv = (CheckBox)e.Row.FindControl("cbIsActv");
                string hfIsActv = ((HiddenField)e.Row.FindControl("hfIsActv")).Value;
                if (hfIsActv == "0")
                {
                    cbIsActv.Checked = false;
                }
                else
                {
                    cbIsActv.Checked = true;
                }

            }

            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                //更新是否系统列的值

                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[7].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"记录（" + e.Row.Cells[0].Text + "\"）吗?')");
                }
            }
        }


        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}

