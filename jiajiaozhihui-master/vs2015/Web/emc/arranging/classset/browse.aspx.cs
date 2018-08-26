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
using System.Collections.Generic;

namespace SfSoft.web.emc.arranging.classset
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                BindData(GetWhere());
            }
            else
            {
                SetEmptyGridView.ResetGridView(this.GridView1);
            }
            
        }
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.arranging.classset";
        }
        private void BindData(string strWhere)
        {
            BLL.wx_class bll = new BLL.wx_class();
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
        private string GetClassNo(string prx)
        {
            var d = DateTime.Now;
            var classNo = prx+string.Format("{0:yyyyMMddhhmmss}", DateTime.Now);
            return classNo;
        }
        
        
        private string GetWhere()
        {
            string strWhere= "1=1 ";
            
            return strWhere;
        }
        
        
        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                var title = e.Row.Cells[1].Text;
                var id = e.Row.Cells[0].Text;
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";


                ((HyperLink)e.Row.Cells[4].FindControl("HyperLink1")).NavigateUrl = "javascript: onclick =parent.addTab('" + title + "', '/emc/arranging/classset/courses_list.aspx?ClassID=" + id + "&mode=update', 'subNav')";


                
            }
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            

            if (this.txtClassName.Text == "")
            {
                strErr += "排课名称不能为空！\\n";
            }

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            
            Model.wx_class model = new Model.wx_class();
            model.class_name = txtClassName.Text;
            model.class_area = "";
            model.class_no = "";
            model.create_date = DateTime.Now;
            model.is_act = 1;

            BLL.wx_class bll = new BLL.wx_class();
            bll.Add(model);

            this.txtClassName.Text = "";
            BindData(GetWhere());
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


