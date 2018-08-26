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
namespace SfSoft.web.emc.double11.comment
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
            hfMID.Value = "emc.double11.comment";
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
            BLL.WX_Doublenovember_Comment bll = new BLL.WX_Doublenovember_Comment();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" select a.*, case when b.IsAlias=1 then  b.Alias else c.NickName end as NickName from dbo.WX_Doublenovember_Comment a")
                .Append(" left join dbo.WX_Doublenovember_Children b on a.openid=b.openid ")
                .Append(" left join (select distinct Openid,NickName from dbo.WX_HomeCard)c on a.openid=c.openid")
                .Append( " where "+strWhere);

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
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
            string strWhere="1=1";
            if (txtNickName.Text != "") {
                strWhere += " and ( Alias = '" + txtNickName.Text + "' or NickName = '"+txtNickName.Text +"')";
            }
            if (txtContent.Text != "") { 
                strWhere+=" and a.Content like '%"+txtContent.Text+"%'";
            }
            strWhere += " order by  a.id desc";
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
                //string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                //e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
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
    }
}


