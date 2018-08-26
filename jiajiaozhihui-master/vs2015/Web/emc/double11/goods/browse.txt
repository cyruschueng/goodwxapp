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
namespace SfSoft.web.emc.double11.goods
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindData(GetWhere());
                InitDropDownList();
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.double11.goods";
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
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_PublicGood modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
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
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1 and GoodsType=11 ";
            if (txtGoodsName.Text.Trim() != "")
            {
                strWhere += " and GoodName like '%" + txtGoodsName.Text.Trim() + "%'";
            }
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "")
            {
                strWhere += " and IsAct=" + ddlIsAct.SelectedValue;
            }
            if (cbIsOnlinePayment.Checked == true) {
                strWhere += " and IsOnlinePayment=1";
            }
            if (cbIsRecommend.Checked == true) {
                strWhere += " and IsRecommend=1";
            }
            if (cbIsRosebery.Checked == true)
            {
                strWhere += " and IsRosebery=1";
            }
            strWhere += " and isnull(goodstype,0)<>4 and  isnull(goodstype,0)<>-1";
            strWhere += " order by isnull(orderby,1) , id desc";
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
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
                string GoodsPrice = e.Row.Cells[6].Text;
                if (GoodsPrice == "" || GoodsPrice=="0")
                {
                    string MarkPrice = e.Row.Cells[3].Text.Replace("&nbsp;", "0") == "" ? "0" : e.Row.Cells[3].Text.Replace("&nbsp;", "0");
                    string Depreciate = e.Row.Cells[4].Text.Replace("&nbsp;", "0") == "" ? "0" : e.Row.Cells[4].Text.Replace("&nbsp;", "0");
                    string Discount = e.Row.Cells[5].Text.Replace("&nbsp;", "0") == "" ? "0" : e.Row.Cells[5].Text.Replace("&nbsp;", "0");
                    e.Row.Cells[6].Text = string.Format("{0:0.00}", (decimal.Parse(MarkPrice) - decimal.Parse(Depreciate)) * decimal.Parse(Discount));
                }
                else {
                    e.Row.Cells[4].Text ="";
                    e.Row.Cells[5].Text ="";
                }
                string IsRosebery = e.Row.Cells[8].Text;
                if (IsRosebery == "1")
                {
                    e.Row.Cells[8].Text = "是";
                }
                else {
                    e.Row.Cells[8].Text = "";
                }
                string IsOnlinePayment = e.Row.Cells[9].Text;
                if (IsOnlinePayment == "1")
                {
                    e.Row.Cells[9].Text = "是";
                }
                else {
                    e.Row.Cells[9].Text = "";
                }
                string IsRecommend = e.Row.Cells[10].Text;
                if (IsRecommend == "1")
                {
                    e.Row.Cells[10].Text = "是";
                }
                else {
                    e.Row.Cells[10].Text = "";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.activity.type' and isnull(IsAct,0)=1");
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
            TextBox txtOrderBy = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtOrderBy"));

            Model.WX_PublicGood model = new Model.WX_PublicGood();
            BLL.WX_PublicGood bllorder = new BLL.WX_PublicGood();
            model = bllorder.GetModel(RefID);
            if (model != null)
            {
                if (txtOrderBy.Text != "")
                {
                    model.OrderBy = int.Parse(txtOrderBy.Text);
                }
            }
            bllorder.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
    }
}


