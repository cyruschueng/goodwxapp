using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.resouce.set
{
    public partial class source_list :  SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                hfClassID.Value = ClassID;
                
                BindData(GetWhere());
            }
            SetTabName();
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.resouce.set";
            hfClassID.Value = Request.Params["ClassID"].Trim();
        }

        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            tsbtnNew.OnClientClick = "Add_CousetForm("+ hfClassID.Value + ");return false;";
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion

        private void SetTabName()
        {
            BLL.wx_source bllBdc = new BLL.wx_source();
            var model = bllBdc.GetModel(int.Parse(hfClassID.Value));
            string tabname = "基础数据列表";
            if (model != null)
            {
                tabname = "[" + model.title + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.wx_source_list bll = new BLL.wx_source_list();
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

        private string GetWhere()
        {
            string strWhere= " ";
            strWhere = "source_id= "+ hfClassID.Value;
            if (txtFileTitle.Text != "") {
                strWhere += " and file_title like '%" + txtFileTitle.Text + "%'";
            }
            return strWhere;
        }

        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "source_update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&classId="+hfClassID.Value+"&mode=update";
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";
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