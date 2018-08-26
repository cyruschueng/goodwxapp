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
namespace SfSoft.web.emc.sgroup.tpl
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        private Dictionary<string, string> GroupTypeDictionary = new Dictionary<string, string>();
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
            hfMID.Value = "emc.zxs.info";
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
            BLL.WX_SGroup_Tpl bll = new BLL.WX_SGroup_Tpl();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_SGroup_Tpl modelMsn = bll.GetModel(id);
                modelMsn.is_act = 0;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
            
        }
        private void BindData(string strWhere)
        {
            BLL.WX_SGroup_Tpl bll = new BLL.WX_SGroup_Tpl();
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
            string strWhere = "1=1";
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
                string url = "update.aspx?ID=" + e.Row.Cells[1].Text + "&mode=update";
                string name =e.Row.Cells[1].Text;
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";

                if (e.Row.RowState == DataControlRowState.Edit)
                {
                    //TextBox txtStartUpDate = (TextBox)e.Row.Cells[3].FindControl("txtStartUpDate");
                    //txtStartUpDate.Attributes.Add("onfocus", "javascript:WdatePicker({isShowWeek:true,onpicked:function(){$dp.$('" + txtStartUpDate.ClientID + "').value=$dp.cal.getP('W','W');},errDealMode:3})");
                }
            }
            
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected void BtnSearch_Click(object sender, EventArgs e)
        {

            BindData(GetWhere());

        }
        

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Values[0].ToString());

            TextBox txtQRCodeX = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtQRCodeX"));
            TextBox txtQRCodeY = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtQRCodeY"));

            TextBox txtQRCodeW = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtQRCodeW"));
            TextBox txtQRCodeH = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtQRCodeH"));

            TextBox txtTagX = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtTagX"));
            TextBox txtTagY = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtTagY"));

            var isNumber1= SfSoft.Common.PageValidate.IsNumber(txtQRCodeX.Text);
            var isNumber2 = SfSoft.Common.PageValidate.IsNumber(txtQRCodeY.Text);
            var isNumber3 = SfSoft.Common.PageValidate.IsNumber(txtTagX.Text);
            var isNumber4 = SfSoft.Common.PageValidate.IsNumber(txtTagY.Text);

            var isNumber5 = SfSoft.Common.PageValidate.IsNumber(txtQRCodeW.Text);
            var isNumber6 = SfSoft.Common.PageValidate.IsNumber(txtQRCodeH.Text);

            if (isNumber1 == false || isNumber2 == false || isNumber3 == false || isNumber4 == false || isNumber5 ==false || isNumber6==false) {
                Response.Write("<script> alert('二维码坐标，宽高，文字坐标 是数字') </script>");
                return;
            }
            
            Model.WX_SGroup_Tpl model = new Model.WX_SGroup_Tpl();
            BLL.WX_SGroup_Tpl bll = new BLL.WX_SGroup_Tpl();

            model = bll.GetModel(RefID);
            if (model != null)
            {
                model.qrcodex = decimal.Parse(txtQRCodeX.Text);
                model.qrcodey = decimal.Parse(txtQRCodeY.Text);

                model.qrcodew = decimal.Parse(txtQRCodeW.Text);
                model.qrcodeh = decimal.Parse(txtQRCodeH.Text);

                model.tagx = decimal.Parse(txtTagX.Text);
                model.tagy = decimal.Parse(txtTagY.Text);
            }
            bll.Update(model);
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


