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
namespace SfSoft.web.emc.libao.bag
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                if (Request.QueryString["mode"] != null) {
                    hfMode.Value = Request.QueryString["mode"].ToString();
                }
                if (hfMode.Value == "add")
                {
                    Panel2.Attributes.CssStyle.Add("display", "none");
                    Panel3.Attributes.CssStyle.Add("display", "none");
                    InitBagDropDownList();
                }
                else {
                    Panel2.Attributes.CssStyle.Add("display", "block");
                    Panel3.Attributes.CssStyle.Add("display", "block");
                    InitBagDropDownList();
                    if (Request.QueryString["ID"] != null) {
                        BLL.WX_Libao_Bag bll = new BLL.WX_Libao_Bag();
                        Model.WX_Libao_Bag model = bll.GetModel(int.Parse(Request.QueryString["ID"].ToString()));
                        if (model != null && model.BagID != 0) {
                            ddlBag.Items.FindByValue(model.BagID.ToString()).Selected = true;
                        }
                        hfID.Value = Request.QueryString["ID"].ToString();
                    }
                    InitDropDownList();
                    BindData("0", GridView2);
                    BindData("1", GridView1);
                    Panel1.Attributes.Add("disabled", "disabled");
                }
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
                Common.SetEmptyGridView.ResetGridView(this.GridView2);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.libao.bag";
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
            BLL.WX_Libao_Bag bll = new BLL.WX_Libao_Bag();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Libao_Bag modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
        }
        private string GetWhere()
        {
            string strWhere = "1=1 and GoodsType=6 ";
            strWhere += " order by isnull(orderby,1) , id desc";
            return strWhere;
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
            }
        }
        private void InitDropDownList()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select ID,GoodName from (select * from dbo.WX_PublicGood where goodstype=6)a ")
                .Append(" where  not exists(select productid from dbo.WX_Libao_Bag_Detail where bagid=" + ddlBag.SelectedValue + " and a.id=productid)");
            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());

            ddlDefaultProduct.DataTextField = "GoodName";
            ddlDefaultProduct.DataValueField = "ID";
            ddlDefaultProduct.DataSource = ds;
            ddlDefaultProduct.DataBind();
            ddlDefaultProduct.Items.Insert(0, new ListItem() { Text = "----请选择----", Value = "" });


            ddlOptionalProduct.DataTextField = "GoodName";
            ddlOptionalProduct.DataValueField = "ID";
            ddlOptionalProduct.DataSource = ds;
            ddlOptionalProduct.DataBind();
            ddlOptionalProduct.Items.Insert(0, new ListItem() { Text = "----请选择----", Value = "" });
        }
        private void InitBagDropDownList()
        {
            BLL.WX_Libao_Set_Class bll = new BLL.WX_Libao_Set_Class();
            DataSet ds = bll.GetList("classtype=1");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                ddlBag.DataTextField = "ClassName";
                ddlBag.DataValueField = "ID";
                ddlBag.DataSource = ds;
                ddlBag.DataBind();
                ddlBag.Items.Insert(0, new ListItem() { Text = "---请选择---", Value = "" });
            }
        }
        
        

        protected void btnAddOptionalProduct_Click(object sender, EventArgs e)
        {
            if (ddlBag.SelectedItem != null && ddlBag.SelectedValue != "" && ddlOptionalProduct.SelectedItem != null && ddlOptionalProduct.SelectedValue != "")
            {
                Model.WX_Libao_Bag_Detail model = new Model.WX_Libao_Bag_Detail();
                BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
                if (!IsExistProductInBags(ddlOptionalProduct.SelectedValue))
                {
                    model.BagID = int.Parse(ddlBag.SelectedValue);
                    model.ProductID = int.Parse(ddlOptionalProduct.SelectedValue);
                    model.ProductType = 0;
                    model.ID = int.Parse(hfID.Value);
                    bll.Add(model);
                    InitDropDownList();
                    BindData("0", GridView2);
                }
            }
        }

        protected void btnAddDefaultProduct_Click(object sender, EventArgs e)
        {
            if (ddlBag.SelectedItem != null && ddlBag.SelectedValue != "" && ddlDefaultProduct.SelectedItem != null && ddlDefaultProduct.SelectedValue != "")
            {
                Model.WX_Libao_Bag_Detail model = new Model.WX_Libao_Bag_Detail();
                BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
                if (!IsExistProductInBags(ddlDefaultProduct.SelectedValue))
                {
                    model.BagID = int.Parse(ddlBag.SelectedValue);
                    model.ProductID = int.Parse(ddlDefaultProduct.SelectedValue);
                    model.ProductType = 1;
                    model.ID = int.Parse(hfID.Value);
                    bll.Add(model);
                    InitDropDownList();
                    Panel3.Attributes.CssStyle.Add("display", "block");
                    BindData("1", GridView1);
                }
            }
        }
        private bool IsExistProductInBags(string id)
        {
            BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
            DataSet ds = bll.GetList("ProductID=" + id + " and BagID=" + ddlBag.SelectedValue);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            return false;
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            if (ddlBag.SelectedItem != null && ddlBag.SelectedValue != "") {
                BLL.WX_Libao_Bag bll = new BLL.WX_Libao_Bag();
                Model.WX_Libao_Bag model = new Model.WX_Libao_Bag();
                model.BagID = int.Parse(ddlBag.SelectedValue);
                model.BagName = ddlBag.SelectedItem.Text;
                hfID.Value = bll.Add(model).ToString();
                InitDropDownList();
                Panel2.Attributes.CssStyle.Add("display", "block");
            }
        }
        private void BindData(string ProductType,YYControls.SmartGridView grid)
        {
            BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
            DataSet ds = bll.GetList("ProductType=" + ProductType + " and BagID=" + ddlBag.SelectedValue);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                string ids = "";
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ids += dr["ProductID"].ToString() + ",";
                }
                if (ids != "")
                {
                    ids = ids.Substring(0, ids.Length - 1);

                    BLL.WX_PublicGood productBll = new BLL.WX_PublicGood();
                    ds = productBll.GetList(" ID in (" + ids + ")");

                    if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    {
                        grid.DataSource = ds;
                        grid.DataBind();
                    }
                    else
                    {
                        Common.SetEmptyGridView.GridViewDataBind(grid, ds.Tables[0]);
                    }
                }
            }
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            GridViewRow drv = ((GridViewRow)(((LinkButton)(e.CommandSource)).Parent.Parent));
            int id = drv.RowIndex;
            CheckBox cb = (CheckBox)GridView1.Rows[id].Cells[0].FindControl("item");
            if (cb != null && cb.Checked == true)
            {
                string argument = e.CommandArgument.ToString();
                string name = e.CommandName;
                if (name.ToLower() == "delete")
                {
                    BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
                    bll.DeleteByProductID(int.Parse(argument));
                    BindData("1", GridView1);
                    InitDropDownList();
                }
            }
            else {
                MessageBox.Show(this, "请选择要删除的行");
            }
        }

        protected void GridView2_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            GridViewRow drv = ((GridViewRow)(((LinkButton)(e.CommandSource)).Parent.Parent));
            int id = drv.RowIndex;
            CheckBox cb = (CheckBox)GridView2.Rows[id].Cells[0].FindControl("item");
            if (cb != null && cb.Checked == true)
            {
                string argument = e.CommandArgument.ToString();
                string name = e.CommandName;
                if (name.ToLower() == "delete")
                {
                    BLL.WX_Libao_Bag_Detail bll = new BLL.WX_Libao_Bag_Detail();
                    bll.DeleteByProductID(int.Parse(argument));
                    BindData("0", GridView2);
                    InitDropDownList();
                }
            }
            else {
                MessageBox.Show(this, "请选择要删除的行");
            }
        }

        protected void GridView2_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

        }

        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

        }
    }
}


