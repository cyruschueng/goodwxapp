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
using System.Threading;
using SfSoft.web.emc.double11;
namespace SfSoft.web.emc.product.order
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
            hfMID.Value = "emc.product.order";
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
            sb.AppendLine("         a.Paymode,a.Price,a.PayNumber,a.ActivityID,a.Tradeno,a.IsPay,a.District,b.GoodName,a.province as ProvinceName,a.city as CityName,a.LogisticsSN ");
            sb.AppendLine("     from(select * from WX_PublicOrder where  ISNUMERIC(province)=0 and ISNUMERIC(city)=0)a");
            sb.AppendLine("         left join WX_PublicGood b on a.goodid=b.id ");
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
            string strWhere = "1=1 and (goodstype=12 or goodstype=16618 or goodstype=160806 ) and goodstype<>7";
            if (txtGoodsName.Text.Trim() != "") {
                strWhere += " and goodname like '%"+txtGoodsName.Text+"%'";
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
                else if (ddlIsSend.SelectedValue == "11") {
                    strWhere += " and  isnull(IsSend,0)=11";
                }
            }
            if (txtSendDate.Text != "") {
                strWhere += " and convert(varchar(10),SendDate,120)=convert(varchar(10),'"+txtSendDate.Text+"',120)";
            }
            if (txtRemark.Text != "") {
                strWhere += " and Remark like '%" + txtRemark.Text + "%'";
            }
            if (txtName.Text != "") {
                strWhere += " and Name like '%" + txtName.Text + "%'";
            }
            if (txtTelephone.Text != "") {
                strWhere += " and Telephone = '" + txtTelephone.Text + "'";
            }
            if (txtAddress.Text != "")
            {
                strWhere += " and Address like '%" + txtAddress.Text + "%'";
            }
            if (txtOrderDate.Text != "")
            {
                strWhere += " and convert(varchar(10),OrderDate,120)=convert(varchar(10),'" + txtOrderDate.Text + "',120)";
            }
            if (ddlPayModel.SelectedItem != null && ddlPayModel.SelectedValue != "")
            {
                strWhere += " and isnull(Paymode,0)=" + ddlPayModel.SelectedValue;
            }
            if (ddlPay.SelectedItem != null && ddlPay.SelectedValue != "")
            {
                strWhere += " and isnull(IsPay,0)=" + ddlPay.SelectedValue;
            }
            if (txtTradeno.Text != "") {
                strWhere += " and Tradeno='"+txtTradeno.Text+"'";
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
                if (string.IsNullOrEmpty(e.Row.Cells[8].Text) || e.Row.Cells[7].Text == "0" || e.Row.Cells[8].Text == "&nbsp;")
                {
                    e.Row.Cells[8].Text = "货到付款";
                }
                else if (e.Row.Cells[8].Text=="1")
                {
                    e.Row.Cells[8].Text = "微支付";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            

            string strName = fileUpload.PostedFile.FileName;
            if (strName != "") {
                bool fileOK = false;
                int i = strName.LastIndexOf(".");//获取。的索引顺序号，在这里。代表图片名字与后缀的间隔
                string kzm = strName.Substring(i);//获取文件扩展名
                string newName = Guid.NewGuid().ToString();//生成新的文件名，保证唯一性
                string path = Server.MapPath(@"\Files\upload\");
                string newFileName = path+newName + kzm;
                if (fileUpload.HasFile) {
                    if (kzm == ".xlsx" || kzm == ".xls") {
                        fileOK = true;
                    }
                }
                if (fileOK) {
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    ThreadImport import = new ThreadImport(fileUpload, newFileName, ThreadCallBack);
                    Thread thread = new Thread(new ThreadStart(import.Import));
                    thread.Start();
                }
            }
        }
        private void UpdateOrder( object o)
        {
            DataSet ds = o as DataSet;
            foreach (DataRow dr in ds.Tables[0].Rows) {
                string a = dr["ID"].ToString();
            }
        }
        private void ThreadCallBack(string msg)
        {
            string n = msg;
        }
        private void InitDropDownList()
        {

            

        }

        protected void btnVoid_Click(object sender, EventArgs e)
        {
            
        }

        protected void btnWebPrint_Click(object sender, EventArgs e)
        {

        }

        protected void btnFinancePrint_Click(object sender, EventArgs e)
        {

        }

        protected void btn_export_Click(object sender, EventArgs e)
        {
           
            StringBuilder sb = new StringBuilder();
           
            sb.AppendLine(" select  Tradeno as 订单号,Name as 收货人,TelePhone as 联系号码,GoodName as 产品名称,ProvinceName as 省,CityName as 市,District as 区, Address as 详细地址, ");
            sb.AppendLine("     PostCode as  邮政编码,PayNumber as 订购数量,Price as 单价,OrderDate as 订购时间,Remark as 备注");
            sb.AppendLine(" from (");
            sb.AppendLine("     select a.ID, a.GoodsType,a.GoodID,isnull(a.IsSend,0) as IsSend,isnull(PayMode,0) as PayMode,isnull(IsPay,0) as IsPay, a.Tradeno, a.Name,a.TelePhone,b.GoodName,a.Province as ProvinceName ,a.city as CityName,a.SendDate,");
            sb.AppendLine("         a.District, ltrim(replace(replace(replace(a.address,a.province,''),a.city,''),a.District,'')) as Address,a.post as PostCode,isnull(a.PayNumber,0) as PayNumber,a.Remark ,isnull(a.OrderDate,'') as OrderDate,isnull(a.Price,0) as Price");
            sb.AppendLine("     from (select * from dbo.WX_PublicOrder where ISNUMERIC(province)=0 and ISNUMERIC(city)=0 ) a ");
            sb.AppendLine("         left join WX_PublicGood b on a.goodid=b.id ");
            sb.AppendLine(")a where "+GetWhere());

            DataSet ds = DbHelperSQL.Query(sb.ToString());
            ExcelHelper helper = new ExcelHelper();
            string fileName = "家教智慧("+string.Format("{0:yyyyMMdd}", DateTime.Now)+").xls";
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

        protected void btnVip_Click(object sender, EventArgs e)
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
                modelMsn.IsSend = 11;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int id = Convert.ToInt32(e.CommandArgument);
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model = bll.GetModel(id);

            if (e.CommandName == "void") {
                if (model != null) { 
                    model.IsSend = -1;
                    bll.Update(model);
                }
                BindData(GetWhere());
            }
            if (e.CommandName == "vip") {
                if (model != null)
                {
                    model.IsSend = 11;
                    bll.Update(model);
                }
                BindData(GetWhere());
            }
        }
    }
}


