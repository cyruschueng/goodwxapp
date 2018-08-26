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
using System.Text;
using SfSoft.DBUtility;
namespace SfSoft.web.emc.material.jinghua
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        public int Head = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitData();
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
            hfMID.Value = "emc.material.jinghua";
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
            BLL.WX_JingHua bll = new BLL.WX_JingHua();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_JingHua modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.refvalue as GName from dbo.WX_JingHua a ");
            sb.Append("left join (select * from Pub_BaseData where refobj='weixin.material.jinghua.groupname') b on a.GroupTitle=b.refvaluecode ");
            sb.Append( " where "+strWhere);
            DataSet ds=DbHelperSQL.Query(sb.ToString());
            
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
        //protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        //{
        //    GridView1.PageIndex = e.NewPageIndex;
        //    BindData(GetWhere());
        //}
        private string GetWhere()
        {
            string strWhere = "";
            string title = txtTitle.Text.Trim();
            string groupTitle = "";
            if (ddlGroupTitle.SelectedItem != null && ddlGroupTitle.SelectedValue!="" )
            {
                groupTitle = ddlGroupTitle.SelectedValue;
            }
            strWhere = "1=1";
            if (title != "")
            {
                strWhere += " and Title='%" + title + "%'";
            }
            if (groupTitle != "")
            {
                strWhere += " and GroupTitle='" + groupTitle + "'";
            }
            strWhere += " order by CreateDate desc, [order] ";
            return strWhere;
        }


        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value.ToString() + "&mode=update";
                e.Row.Cells[1].Text = "<a href=" + url + ">"+e.Row.Cells[1].Text+"</a>";

                //string groupname = e.Row.Cells[3].Text;
                //DataTable dt = (DataTable)ViewState["groupname"];
                //DataRow[] dr = dt.Select("GroupTitle='"+groupname+"'");
                //if (dr != null) {
                //    e.Row.Cells[3].Text = dr[0]["RefValue"].ToString();
                //}
            }
            if (e.Row.RowIndex == GridView1.EditIndex) {
                //TextBox txtOrder = (TextBox)e.Row.FindControl("txtOrder");
                CheckBox cbIsHead = (CheckBox)e.Row.FindControl("cbIsHead");
                HiddenField hfIsHead = (HiddenField)e.Row.FindControl("fhIsHead");
                if (cbIsHead != null && hfIsHead != null) {
                    if (hfIsHead.Value == "0")
                    {
                        cbIsHead.Checked = false;
                    }
                    else
                    {
                        cbIsHead.Checked = true;
                    }
                }
            }
        }

        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void InitData()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.material.jinghua.groupname'");
            EmcCommon.SetBaseDataDropDownList(ddlGroupTitle, "weixin.material.jinghua.groupname", ds);
            ListItem li = new ListItem();
            li.Text = "";
            li.Value = "";
            ddlGroupTitle.Items.Insert(0, li);
            ViewState["groupname"] = ds.Tables[0];
        }

        protected void btnSearch_Click1(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

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
            TextBox txtOrder = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtOrder"));
            CheckBox cbIsHead = (CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsHead"));

            Model.WX_JingHua model = new Model.WX_JingHua();
            BLL.WX_JingHua bllorder = new BLL.WX_JingHua();
            model = bllorder.GetModel(RefID);
            if (model != null)
            {
                model.IsHead = cbIsHead.Checked ? 1 : 0;
                if (txtOrder.Text != "") {
                    model.Order = int.Parse(txtOrder.Text);
                }
            }
            bllorder.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
    }
}


