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
namespace SfSoft.web.emc.wxcourse.mycourse
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        Dictionary<string, string> DicLecturer = new Dictionary<string, string>();
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
            hfMID.Value = "emc.wxcourse.mycourse";
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
            string sql = "select * from (" +
                                " select a.*,b.NickName,isnull(c.Quantity,0) as Quantity from WX_Course_User a" +
                                " left join dbo.WX_UserInfo b on a.openId=b.openId " +
                                " left join (select OpenId,count(1)as Quantity from WX_Course_Personal group by OpenId) c on a.openId=c.openId" +
                                ")a where "+strWhere;

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
            string strWhere = "1=1";
            if (txtNickName.Text.Trim() != "") {
                strWhere += " and NickName like '%" + txtNickName.Text + "%'";
            }
            if (txtName.Text.Trim() != "") {
                strWhere += " and UserName like '%"+txtName.Text.Trim()+"%'";
            }
            if (txtTelephone.Text.Trim() != "") {
                strWhere += " and Telephone ='"+txtTelephone.Text+"'";
            }
            if (rblSelectState.SelectedItem != null && rblSelectState.SelectedValue != "") {
                if (rblSelectState.SelectedValue == "0") {
                    strWhere += " and Quantity=0";
                }
                else if (rblSelectState.SelectedValue == "1") {
                    strWhere += " and Quantity>0";
                }
            }
            strWhere += " order by Quantity desc";
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
                string openId = GridView1.DataKeys[e.Row.RowIndex].Value.ToString();
                string url = "update.aspx?openId=" + openId + "&mode=update";
                string name = e.Row.Cells[0].Text;
                e.Row.Cells[0].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";
            }
        }
        
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


