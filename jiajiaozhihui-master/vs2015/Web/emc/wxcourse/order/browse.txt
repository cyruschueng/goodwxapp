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
namespace SfSoft.web.emc.wxcourse.order
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
            hfMID.Value = "emc.wxcourse.order";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
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
            //BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            //string[] arrID = ID.Split(',');
            //for (int i = 0; i < arrID.Length; i++)
            //{
            //    int id = Common.Common.stringToInt(arrID[i].ToString());
            //    Model.WX_Course_Order modelMsn = bll.GetModel();
                
            //    bll.Delete(id);
            //}
            //BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {

            string sql = "select * from (" +
                            " select a.*,b.Name as CourseName from WX_Course_Order a" +
                            " left join WX_Course b on a.CourseId=b.Id" +
                            " )a where "+strWhere;
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
            string strWhere = "1=1 and isnull(Tradeno,'')<>'' ";
            if (txtCourseName.Text.Trim() != "") {
                strWhere += " and CourseName like '" + txtCourseName.Text.Trim() + "'";
            }
            if (txtName.Text.Trim() != "") {
                strWhere += " and Name like '%"+ txtName.Text+"%'";
            }
            if (txtTelephone.Text.Trim() != "") { 
                strWhere+=" and Telephone like '%"+txtTelephone.Text+"%'";
            }
            if (txtOrderDateTime.Text.Trim() != "") {
                strWhere += " and  convert(nvarchar(10),'" + txtOrderDateTime.Text + "',120)=convert(nvarchar(10),OrderDateTime,120)";
            }
            if (ddlSalesPlatform.SelectedItem != null && ddlSalesPlatform.SelectedValue != "")
            {
                strWhere += " and SalesPlatform=" + ddlSalesPlatform.SelectedValue;
            }
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "")
            {
                strWhere += " and IsPay=" + ddlIsAct.SelectedValue;
            }
            strWhere += " order by OrderDateTime desc";
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
                string url = "update.aspx?Id=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";

                if (e.Row.Cells[9].Text == "0") {
                    e.Row.Cells[9].Text = "家教智慧订阅号";
                }else if(e.Row.Cells[9].Text=="1"){
                    e.Row.Cells[9].Text = "家教智慧服务号";
                }else if(e.Row.Cells[9].Text=="2"){
                    e.Row.Cells[9].Text = "顾问平台";
                }else if(e.Row.Cells[9].Text=="3"){
                    e.Row.Cells[9].Text = "其它";
                }else{
                    e.Row.Cells[9].Text = "";
                }
                

                if (e.Row.Cells[11].Text == "0") {
                    e.Row.Cells[11].Text = "未支付";
                }
                else if (e.Row.Cells[11].Text == "1") {
                    e.Row.Cells[11].Text = "已支付";
                }
                else if (e.Row.Cells[11].Text == "2")
                {
                    e.Row.Cells[11].Text = "已退款";
                }
                else 
                {
                    e.Row.Cells[11].Text = "";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


