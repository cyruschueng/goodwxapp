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
using SfSoft.DBUtility;
namespace SfSoft.web.emc.zxs.weektask
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ThemId = Request.Params["ThemId"].Trim();
                string Week = Request.Params["Week"].Trim();
                hfThemeId.Value = ThemId;
                hfWeek.Value = Week;
                BindData(GetWhere());
                BindTaskData(GetTaskWhere());
            }
            SetTabName();
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.zxs.theme";
        }
        protected override void VtPageAccess()
        {
            //CheckPageAccess("emc.zxs.theme.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_ZXS_Theme bllBdc = new BLL.WX_ZXS_Theme();
            DataSet dsbdc = bllBdc.GetList(" Id='" + hfThemeId.Value + "' ");
            string tabname = "任务";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["Title"].ToString() + " 第"+hfWeek.Value+"周]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.WX_ZXS_WeekTask bllBd = new BLL.WX_ZXS_WeekTask();
            string sql = "select a.*,b.Title as ThemeTitle,c.Title as TaskTitle,c.Time,c.TaskType,c.Remark,c.HZ,C.Unit from dbo.WX_ZXS_WeekTask a" +
                " left join WX_ZXS_Theme b on a.ThemeId=b.Id" +
                " left join WX_ZXS_Task c on a.TaskId=c.Id" +
                " where " + strWhere;
            DataSet dsbd = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();
            GetTasks(dsbd);
        }

        private string GetWhere()
        {
            return "a.ThemeId="+hfThemeId.Value+" and a.Week="+hfWeek.Value+" and a.IsAct=1";
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_ZXS_WeekTask bllbd = new BLL.WX_ZXS_WeekTask();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            Model.WX_ZXS_WeekTask model = bllbd.GetModel(RefID);
            model.IsAct = 0;
            bllbd.Update(model);
            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_ZXS_WeekTask modelbd = new Model.WX_ZXS_WeekTask();
            BLL.WX_ZXS_WeekTask bllBd = new BLL.WX_ZXS_WeekTask();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            modelbd.Hash = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[6].Controls[0])).Text.ToString().Trim();
            modelbd.Other = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[7].Controls[0])).Text.ToString().Trim();
            if (!string.IsNullOrEmpty(((TextBox)(GridView1.Rows[e.RowIndex].Cells[8].Controls[0])).Text.ToString().Trim())) {
                modelbd.Sn = Convert.ToInt32(((TextBox)(GridView1.Rows[e.RowIndex].Cells[8].Controls[0])).Text.ToString().Trim());
            }
            int IsAct =1;
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsActv"))).Checked)
            {
                IsAct = 0;
            }
            modelbd.IsAct = IsAct;

            int optional = 1;
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbOptional"))).Checked) {
                optional = 0;
            }
            modelbd.Optional = optional;
            var ddlTaskClass = ((DropDownList)GridView1.Rows[e.RowIndex].FindControl("ddlTaskClass"));
            if (ddlTaskClass.SelectedItem != null && ddlTaskClass.SelectedValue != "") {
                modelbd.TaskClass = Convert.ToInt32(ddlTaskClass.SelectedValue);   
            }
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

                CheckBox cbOptional = (CheckBox)e.Row.FindControl("cbOptional");
                string hfOptional = ((HiddenField)e.Row.FindControl("hfOptional")).Value;
                if (hfOptional == "" || hfOptional=="0")
                {
                    cbOptional.Checked = false;
                }
                else
                {
                    cbOptional.Checked = true;
                }


            }
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[13].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[1].Text+"   "+e.Row.Cells[2].Text + "\"吗?')");
                }
                e.Row.Cells[4].Text = ZXSHelper.TaskTypeName(e.Row.Cells[4].Text);
                DataRowView drv = (DataRowView)e.Row.DataItem;
                if (drv != null)
                {
                    string hz = drv.Row["HZ"].ToString();
                    string unit = drv.Row["Unit"].ToString();
                    e.Row.Cells[3].Text = ZXSHelper.HZName(hz) + e.Row.Cells[3].Text + unit;
                }
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private void BindTaskData(string strWhere)
        {
            BLL.WX_ZXS_Task bll = new BLL.WX_ZXS_Task();
            DataSet ds = bll.GetList(strWhere);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                //AspNetPager1.RecordCount = pds.Count;
                //pds.AllowPaging = true;
                //pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                //pds.PageSize = AspNetPager1.PageSize;
                //GridView2.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView2.DataSource = pds;
                this.GridView2.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView2, ds.Tables[0]);
            }
        }
        private string GetTaskWhere()
        {
            string strWhere = "1=1 and id>30 and IsAct=1 ";
            strWhere += " order by Id desc";
            return strWhere;
        }
        protected new void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                e.Row.Cells[4].Text = ZXSHelper.TaskTypeName(e.Row.Cells[4].Text);
                DataRowView drv = (DataRowView)e.Row.DataItem;
                if (drv != null)
                {
                    string hz = drv.Row["HZ"].ToString();
                    string unit = drv.Row["Unit"].ToString();
                    e.Row.Cells[3].Text = ZXSHelper.HZName(hz) + e.Row.Cells[3].Text + unit;
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            //BindTaskData(GetTaskWhere());
        }
        private void GetTasks(DataSet ds)
        {
            string items = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    items += "," + dr["TaskId"].ToString();
                }
            }
            if (items.Length > 0) {
                items = items.Substring(1);
            }
            hfTasks.Value = items;
        }
        public string GetTaskClassName(string type)
        {
            string result = "";
            switch (type) { 
                case "":
                    result = "";
                    break;
                case "0":
                    result = "小任务";
                    break;
                case "1":
                    result = "大任务";
                    break;
            }
            return result;
        }
    }
}


