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
namespace SfSoft.web.emc.exchange.order
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();
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
            hfMID.Value = "emc.exchange.order";
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
            
            sb.AppendLine(" select * from (");
            sb.AppendLine("     select a.ID,a.OpenID,a.GoodID,a.Name,a.Address,a.TelePhone,a.Remark,a.OrderDate,a.GoodsType,a.IsSend,a.Post,a.Logistics,a.OddNumber,a.Payment,a.SendDate,");
            sb.AppendLine("         a.Paymode,a.Price,a.PayNumber,a.ActivityID,a.Tradeno,a.IsPay,a.District,b.Name as GoodName,a.province as ProvinceName,a.city as CityName,a.Unit ");
            sb.AppendLine("     from WX_PublicOrder a");
            sb.AppendLine("         left join WX_Product_Exchange b on a.goodid=b.id ");
            sb.AppendLine(  ")a where "+strWhere);

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
            string strWhere = " 1=1 ";
            if (ddlOrderType.SelectedItem != null && ddlOrderType.SelectedValue != "") { 
                strWhere += " and  goodstype=" + ddlOrderType.SelectedValue;
            }
            if (ddlIsSend.SelectedItem != null && ddlIsSend.SelectedValue!="") {
                strWhere += " and  isnull(IsSend,0)=" + ddlIsSend.SelectedValue;
            }
            if (txtSendDate.Text != "") {
                strWhere += " and convert(varchar(10),SendDate,120)=convert(varchar(10),'"+txtSendDate.Text+"',120)";
            }
            if (txtName.Text != "") {
                strWhere += " and Name like '%" + txtName.Text + "%'";
            }
            if (txtTelephone.Text != "") {
                strWhere += " and Telephone = '" + txtTelephone.Text + "'";
            }
            if (txtAddress.Text != "")
            {
                strWhere += " and Address like '" + txtAddress.Text + "%'";
            }
            if (txtOrderDate.Text != "")
            {
                strWhere += " and convert(varchar(10),OrderDate,120)=convert(varchar(10),'" + txtOrderDate.Text + "',120)";
            }
            strWhere += " order by id desc";
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
                if (string.IsNullOrEmpty(e.Row.Cells[7].Text) || e.Row.Cells[7].Text == "0" || e.Row.Cells[7].Text == "&nbsp;")
                {
                    e.Row.Cells[7].Text = "货到付款";
                }
                else if (e.Row.Cells[7].Text=="1")
                {
                    e.Row.Cells[7].Text = "微支付";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
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

        protected void btnVoid_Click(object sender, EventArgs e)
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
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
        protected void btn_export_Click(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine(" select  Name as 收货人,TelePhone as 联系号码,GoodName as 兑换品名称,ProvinceName as 省,CityName as 市,District as 区, Address as 详细地址,");
            sb.AppendLine("     PostCode as  邮政编码,PayNumber as 订购数量,Price as 单价,OrderDate as 订购时间,Remark as 备注");
            sb.AppendLine(" from (");
            sb.AppendLine("     select a.ID, a.GoodsType,a.GoodID,isnull(a.IsSend,0) as IsSend,isnull(PayMode,0) as PayMode,isnull(IsPay,0) as IsPay, a.Tradeno, a.Name,a.TelePhone,b.Name as GoodName,a.Province as ProvinceName ,a.city as CityName,");
            sb.AppendLine("         a.District, ltrim(replace(replace(replace(a.Address,a.Province,''),a.city,''),a.District,''))as Address,a.post as PostCode,isnull(a.PayNumber,0) as PayNumber,a.Remark ,isnull(a.OrderDate,'') as OrderDate,isnull(a.Price,0) as Price");
            sb.AppendLine("     from WX_PublicOrder a ");
            sb.AppendLine("         left join WX_Product_Exchange b on a.goodid=b.id)a");
            sb.AppendLine(" where "+GetWhere());

            DataSet ds = DbHelperSQL.Query(sb.ToString());
            ExcelHelper helper = new ExcelHelper();
            string fileName = "亲子书法兑换订单("+string.Format("{0:yyyyMMdd}", DateTime.Now)+").xls";
            helper.DtToExcel(ds, "ds", true, fileName);
        }
        protected void btnVip_Click(object sender, EventArgs e)
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }

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
                modelMsn.IsSend = 11;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
        }

        private string checkform()
        {
            string strErr = "";

            if (this.txtDate.Text == "")
            {
                strErr += "设置有效的标志日期！\\n";
            }
            return strErr;
        }
        private void InitDropDownList()
        {
            var orderTypes = Enum.GetValues(typeof(ShenerWeiXin.EnumExchangeOrderType));
            ddlOrderType.Items.Clear();
            int index=0;
            foreach (var orderType in orderTypes) {
                ddlOrderType.Items.Insert(index, new ListItem() { 
                     Value=((int)orderType).ToString(),
                    Text=Enum.GetName(typeof(ShenerWeiXin.EnumExchangeOrderType),orderType)
                });
                index++;
            }
        }
    }
}


