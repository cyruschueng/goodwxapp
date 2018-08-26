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
using WxPayAPI;
namespace SfSoft.web.emc.pay.native
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
            hfMID.Value = "emc.pay.native";
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
            BLL.WX_NativePay bll = new BLL.WX_NativePay();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_NativePay modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_NativePay bll = new BLL.WX_NativePay();
            DataSet ds = bll.GetList(GetWhere());
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
            if (!string.IsNullOrEmpty(txtProductId.Text.Trim())) {
                strWhere += " and product_id='"+ txtProductId.Text.Trim() +"'";
            }
            if (!string.IsNullOrEmpty(txtProductName.Text.Trim())) {
                strWhere += " and product_name like '%" + txtProductName.Text.Trim() + "%'";
            }
            if (!string.IsNullOrEmpty(txtOutTradeNo.Text.Trim())) {
                strWhere += " and out_trade_no like '%" + txtOutTradeNo.Text.Trim() + "%'";
            }
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
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value.ToString() + "&mode=update";
                e.Row.Cells[1].Text = "<a href=" + url + "><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";
            }
        }

        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            NativePay nativePay = new NativePay();
            var values = e.CommandArgument.ToString();
            var arr=values.Split(',');

            //生成扫码支付模式一url
            string url = nativePay.GetPrePayUrl(arr[0]);
            Response.Redirect("MakeQRCode.aspx?data=" + HttpUtility.UrlEncode(url)+"&name="+arr[1]);
        }
    }
}


