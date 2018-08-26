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
namespace SfSoft.web.emc.wxcourse.course
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        Dictionary<string, string> DicLecturer = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();
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
            hfMID.Value = "emc.wxcourse.course";
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
            BLL.WX_Course bll = new BLL.WX_Course();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Course modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            string sql = "select * from ( " +
                                " select a.*,b.Name as ProviderName ,b.LinkMan,b.Mobile,b.QQ  from WX_Course a" +
                                " left join WX_Course_Provider b on a.ProviderId=b.Id)a "+
                                " where "+strWhere;

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
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1 ";
            if (txtName.Text.Trim() != "") {
                strWhere += " and Name like '%"+txtName.Text.Trim()+"%'";
            }
            if (txtLecturer.Text.Trim() != "") {
                strWhere += " and Lecturer like '%" + txtLecturer.Text.Trim() + "%'";
            }
            if (ddlSaleState.SelectedItem != null && ddlSaleState.SelectedValue != "") {
                strWhere += " and SaleState="+ddlSaleState.SelectedValue;
            }
            if (ddlLearnState.SelectedItem != null && ddlLearnState.SelectedValue != "")
            {
                strWhere += " and LearnState=" + ddlLearnState.SelectedValue;
            }
            if (txtLinkMan.Text.Trim() != "") {
                strWhere += " and LinkMan like '%"+txtLinkMan.Text.Trim()+"%'";
            }
            if (txtMobile.Text.Trim() != "") {
                strWhere += " and Mobile like '%" + txtMobile.Text.Trim() + "%'";
            }
            if (txtQQ.Text.Trim() != "")
            {
                strWhere += " and QQ like '%" + txtQQ.Text.Trim() + "%'";
            }
            if (txtProviderName.Text.Trim() != "") {
                strWhere += " and ProviderName like '%" + txtProviderName .Text + "%'";
            }
            if (ddlTheme.SelectedItem != null && ddlTheme.SelectedValue != "") {
                strWhere += " and Theme="+ddlTheme.SelectedValue;
            }
            if (ddlMediaType.SelectedItem != null && ddlMediaType.SelectedValue != "") {
                strWhere += " and MediaType="+ddlMediaType.SelectedValue;
            }
            if (cbBag.Checked == true)
            {
                strWhere += " and IsBags=1";
            }
            else {
                strWhere += " and isnull(IsBags,0)=0";
            }
            if (ddlCourseType.SelectedItem != null && ddlCourseType.SelectedValue!="") {
                strWhere += " and isnull(CourseType,0)=" + ddlCourseType.SelectedValue;
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
                RowIndex = GridView1.DataKeys[e.Row.RowIndex].Value.ToString();
                string url = "update.aspx?ID=" + RowIndex + "&mode=update";
                string name = e.Row.Cells[2].Text;
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";
                
                if(DicLecturer.ContainsKey(e.Row.Cells[4].ToString())){
                    e.Row.Cells[4].Text=DicLecturer[e.Row.Cells[4].ToString()];
                }else{
                    e.Row.Cells[4].Text="";
                }

                if (e.Row.Cells[7].Text == "1") {
                    e.Row.Cells[7].Text = "上架";
                }
                else if (e.Row.Cells[7].Text == "2")
                {
                    e.Row.Cells[7].Text = "下架";
                }
                else {
                    e.Row.Cells[7].Text = "";     
                }

                if (e.Row.Cells[8].Text == "1") {
                    e.Row.Cells[8].Text = "开课";
                }
                else if (e.Row.Cells[8].Text == "2")
                {
                    e.Row.Cells[8].Text = "休课";
                }
                else {
                    e.Row.Cells[8].Text = "";
                }

                
                int cell=0;
            }
        }
        
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void GetLecturer()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            BLL.WX_Course_Lecturer bll = new BLL.WX_Course_Lecturer();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    dic.Add(dr["Id"].ToString(), dr["Name"].ToString());
                }
            }
            DicLecturer = dic;
        }
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds= bll.GetList("");
            EmcCommon.SetBaseDataDropDownList(ddlTheme, "weixin.wxcourse.theme", ds);
            ddlTheme.Items.Insert(0, new ListItem() { Text="",Value="" });

            Helper.Helper helper = new Helper.Helper();
            var list= helper.InitCourseType();
            foreach (var m in list) {
                ddlCourseType.Items.Add(new ListItem() { Text = m.Name, Value = m.Value.ToString() });
            }
        }
        private string RowIndex { get; set; }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            TextBox txtExercisesId = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtExercisesId"));

            Model.WX_Course model = new Model.WX_Course();
            BLL.WX_Course bll = new BLL.WX_Course();

            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (txtExercisesId.Text != "")
                {
                    model.ExercisesId = txtExercisesId.Text;
                }
            }
            bll.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
    }
}


