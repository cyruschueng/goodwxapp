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
using System.IO;
namespace SfSoft.web.emc.activity.publicgoodsorder
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();
                SetProvice();
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
            hfMID.Value = "emc.activity.publicgoodsorder";
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
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_PublicOrder modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.goodname,c.areaname as provincename,d.areaname as cityname,e.refvalue as PostName,f.refvalue as LogisticsName  from dbo.WX_PublicOrder a ");
            sb.Append("left join WX_PublicGood b on a.goodid=b.id ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=1) c on a.province=c.areaid ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=2) d on a.city=d.areaid ");
            sb.Append("left join (select * from Pub_BaseData where refobj='weixin.post') e on a.post=e.refvaluecode ");
            sb.Append("left join (select * from Pub_BaseData where refobj='emc.drp.Logistics.Logistics') f on a.Logistics=f.refvaluecode ");
            sb.Append("where "+strWhere);
            DataSet ds= DbHelperSQL.Query(sb.ToString()); 
            
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
            string strWhere = "1=1  and a.goodstype=1";
            if (txtGoodsName.Text.Trim() != "") {
                strWhere += " and b.goodname like '%"+txtGoodsName.Text+"%'";
            }
            if (ddlIsSend.SelectedItem != null) {
                if (ddlIsSend.SelectedValue == "1") {
                    strWhere += " and  isnull(IsSend,0)=1";
                }
                else if (ddlIsSend.SelectedValue == "0") {
                    strWhere += " and  isnull(IsSend,0)=0";
                }
                else if (ddlIsSend.SelectedValue == "-1")
                {
                    strWhere += " and  isnull(IsSend,0)=-1";
                }
            }
            if (txtSendDate.Text != "") {
                strWhere += " and convert(varchar(10),SendDate,120)=convert(varchar(10),'"+txtSendDate.Text+"',120)";
            }
            if (txtName.Text != "") {
                strWhere += " and a.Name like '%" + txtName.Text + "%'";
            }
            if (txtTelephone.Text != "") {
                strWhere += " and a.Telephone = '" + txtTelephone.Text + "'";
            }
            if (ddlProvince.SelectedItem != null && ddlProvince.SelectedValue!="") {
                strWhere += " and c.areaid = '" + ddlProvince.SelectedValue + "'";
            }
            if (ddlCity.SelectedItem != null && ddlCity.SelectedValue != "")
            {
                strWhere += " and d.areaid = '" + ddlCity.SelectedValue + "'";
            }
            if (txtOrderDate.Text != "")
            {
                strWhere += " and convert(varchar(10),OrderDate,120)=convert(varchar(10),'" + txtOrderDate.Text + "',120)";
            }
            if (ddlPaymode.SelectedItem != null && ddlPaymode.SelectedValue!="") {
                strWhere += " and Paymode="+ddlPaymode.SelectedValue;
            }
            strWhere += " order by a.id desc";
            return strWhere;
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                //string url = "update.aspx?mode=update&Id=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString();
                //e.Row.Cells[1].Text = "<a href =" + url + "><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";
                BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
                DropDownList ddlPost = (DropDownList)e.Row.FindControl("ddlPost");
                if (ddlPost != null)
                {
                    string strWhere = "RefObj = 'weixin.post' and isAct='1'";
                    DataSet ds = bll.GetList(strWhere);
                    EmcCommon.SetBaseDataDropDownList(ddlPost, "weixin.post", ds);
                    ddlPost.Items.Add(new ListItem { Text="", Value="" });
                }
                DropDownList ddlLogistics = (DropDownList)e.Row.FindControl("ddlLogistics");
                if (ddlPost != null)
                {
                    string strWhere = "RefObj = 'emc.drp.Logistics.Logistics' and isAct='1'";
                    DataSet ds = bll.GetList(strWhere);
                    EmcCommon.SetBaseDataDropDownList(ddlLogistics, "emc.drp.Logistics.Logistics", ds);
                    ddlLogistics.Items.Add(new ListItem { Text = "", Value = "" });
                }
                if (e.Row.RowIndex == GridView1.EditIndex)
                {
                    ddlPost = (DropDownList)e.Row.FindControl("ddlPost");
                    ddlPost.Items.FindByValue(((Label)e.Row.FindControl("lblPost")).Text).Selected = true;
                    ddlLogistics = (DropDownList)e.Row.FindControl("ddlLogistics");
                    ddlLogistics.Items.FindByValue(((Label)e.Row.FindControl("lblLogistics")).Text).Selected = true;
                }
            }
            
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void SetProvice()
        {
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds = bll.GetList("areatype=1");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                ddlProvince.DataTextField = "areaname";
                ddlProvince.DataValueField = "areaid";
                ddlProvince.DataSource = ds;
                ddlProvince.DataBind();
                ListItem li = new ListItem();
                li.Text = "";
                li.Value = "";
                ddlProvince.Items.Insert(0, li);
            }
        }

        protected void ddlProvince_SelectedIndexChanged(object sender, EventArgs e)
        {
            string areaid = ddlProvince.SelectedValue;
            if (areaid != "")
            {
                ddlCity.Items.Clear();
                BLL.Pub_Areas bll = new BLL.Pub_Areas();
                DataSet ds = bll.GetList("areatype=2 and pid=" + areaid);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    ddlCity.DataTextField = "areaname";
                    ddlCity.DataValueField = "areaid";
                    ddlCity.DataSource = ds;
                    ddlCity.DataBind();
                    ListItem li = new ListItem();
                    li.Text = "";
                    li.Value = "";
                    ddlCity.Items.Insert(0, li);
                }
            }
            else
            {
                ddlCity.Items.Clear();
            }
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_PublicOrder modelMsn = bll.GetModel(id);
                modelMsn.IsSend = 1;
                modelMsn.SendDate = DateTime.Parse(txtDate.Text);
                bll.Update(modelMsn);
            }
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
            TextBox txtOddNumber = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtOddNumber"));
            TextBox txtPayment = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtPayment"));

            DropDownList ddlPost = (DropDownList)(GridView1.Rows[e.RowIndex].FindControl("ddlPost"));
            DropDownList ddlLogistics = (DropDownList)(GridView1.Rows[e.RowIndex].FindControl("ddlLogistics"));

            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            BLL.WX_PublicOrder bllorder = new BLL.WX_PublicOrder();
            model = bllorder.GetModel(RefID);

            if (model != null)
            {
                model.Post = ddlPost.SelectedItem.Value;
                model.Logistics = ddlLogistics.SelectedItem.Value;
                model.OddNumber = txtOddNumber.Text;
                if (txtPayment.Text != "") {
                    model.Payment =float.Parse(txtPayment.Text);
                }
            }
            bllorder.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
        private void InitDropDownList()
        {

            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='emc.drp.Receives.Payment'");
            EmcCommon.SetBaseDataDropDownList(ddlPaymode, "emc.drp.Receives.Payment", ds);
            ListItem li = new ListItem();
            li.Text = "";
            li.Value = "";
            ddlPaymode.Items.Insert(0, li);

        }

        protected void btnVoid_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_PublicOrder modelMsn = bll.GetModel(id);
                modelMsn.IsSend = -1;
                modelMsn.SendDate = DateTime.Parse(txtDate.Text);
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
        }

        protected void btnWebPrint_Click(object sender, EventArgs e)
        {

        }

        protected void btnFinancePrint_Click(object sender, EventArgs e)
        {

        }

        protected void btn_export_Click(object sender, EventArgs e)
        {
            //toExcelClk();

            StringBuilder sb = new StringBuilder();
            sb.Append("select a.Name as 收货人,a.TelePhone as 联系号码,b.goodname as 公益品名称,c.areaname as 省份,d.areaname as 城市,a.address as 详细地址,d.AreaCode as 邮政编码,isnull(a.PayNumber,0) as 订购数量,a.Remark as 备注  from dbo.WX_PublicOrder a ");
            sb.Append("left join WX_PublicGood b on a.goodid=b.id ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=1) c on a.province=c.areaid ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=2) d on a.city=d.areaid ");
            sb.Append("left join (select * from Pub_BaseData where refobj='weixin.post') e on a.post=e.refvaluecode ");
            sb.Append("left join (select * from Pub_BaseData where refobj='emc.drp.Logistics.Logistics') f on a.Logistics=f.refvaluecode ");
            sb.Append("where " + GetWhere());

            DataSet ds = DbHelperSQL.Query(sb.ToString());
            ExcelHelper helper = new ExcelHelper();
            string fileName = "粉丝福利("+string.Format("{0:yyyyMMdd}", DateTime.Now)+").xls";
            helper.DtToExcel(ds, "ds", true, fileName);
        }
        private void toExcelClk()
        {
            GridView1.AllowPaging = false;
            GridView1.AllowSorting = false;
            BindData(GetWhere());
            Export("Excel:application/ms-excel", "销售订单" + DateTime.Now.ToShortDateString() + ".xls");

            GridView1.AllowPaging = true;
            GridView1.AllowSorting = true;
            BindData(GetWhere());
        }
        private void Export(string FileType, string FileName)
        {
            Response.Charset = "GB2312";
            Response.ContentEncoding = System.Text.Encoding.UTF8;//注意编码
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(FileName, Encoding.UTF8).ToString().Trim() + ".xls");
            Response.ContentType = FileType;
            this.EnableViewState = false;
            StringWriter tw = new StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(tw);
            GridView1.RenderControl(hw);
            Response.Write(tw.ToString());
            Response.End();
        }
    }
}


