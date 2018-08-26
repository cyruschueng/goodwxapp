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
namespace SfSoft.web.emc.activity.double11
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_PublicGood modelArts = new SfSoft.Model.WX_PublicGood();
        BLL.WX_PublicGood bllArts = new BLL.WX_PublicGood();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.activity.double11";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    cbIsRosebery.Checked = true;
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(ID));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.activity.double11";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_PublicGood model)
        {
            txtPublicGoods.Text = model.GoodName;
            txtMarketPrice.Text = model.MarketPrice.ToString();
            txtPublicPrice.Text= model.PublicPrice.ToString();
            txtNumber.Text = model.Number.ToString();
            txtDesc.Value = model.Desc.ToString();
            txtScore.Text = model.Score.ToString();
            if(model.StartDate!=null){
                txtStartDate.Text = string.Format("{0:yyyy-MM-dd}", model.StartDate);
            }
            if (model.EndDate != null)
            {
                txtEndDate.Text = string.Format("{0:yyyy-MM-dd}", model.EndDate);
            }
            if (model.Discount != null) {
                txtDiscount.Text = string.Format("{0:f}", model.Discount);
            }
            if (model.Depreciate != null)
            {
                txtDepreciate.Text = string.Format("{0:f}", model.Depreciate);
            }
            if(model.ValidityDate!=null){
                txtValidityDate.Text = string.Format("{0:yyyy-MM-dd}", model.ValidityDate);
            }
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            if (model.IsRosebery != null && model.IsRosebery == 1) {
                cbIsRosebery.Checked = true;
            }
            if (model.IsRecommend != null && model.IsRecommend == 1) {
                cbIsRecommend.Checked = true;
            }
            if (model.IsOnlinePayment != null && model.IsOnlinePayment == 1) {
                cbIsOnlinePayment.Checked = true;
            }
            if (model.ImgURL != "")
            {
                imgUrl.ImageUrl = model.ImgURL;
                imgUrl.Visible = true;
                btnDelPic.Visible = true;
            }
            else
            {
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }

            txtInfoDesc.Value = model.InfoDesc;
            txtGoodsLink.Text = model.GoodsLink;
        }
        protected override void VtSave()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.WX_PublicGood model = new Model.WX_PublicGood();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.Creator = Session["CnName"].ToString();
                model.GoodsType = 11;
                
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);                
                bllArts.Update(model);
            }
        }

        private Model.WX_PublicGood SetModelValue(Model.WX_PublicGood model)
        {
            model.GoodName = txtPublicGoods.Text;
            model.MarketPrice = decimal.Parse(txtMarketPrice.Text);
            if (txtPublicPrice.Text != "")
            {
                model.PublicPrice = decimal.Parse(txtPublicPrice.Text);
            }
            else {
                model.PublicPrice = null;
            }
            model.Number = int.Parse(txtNumber.Text);
            model.Desc = txtDesc.Value;
            model.InfoDesc = txtInfoDesc.Value;
            if (txtScore.Text != "") {
                model.Score =int.Parse(txtScore.Text);
            }
            if (ddlIsAct.SelectedItem != null) {
                model.IsAct =int.Parse( ddlIsAct.SelectedValue);
            }
            if (txtValidityDate.Text != "") {
                model.ValidityDate = DateTime.Parse(txtValidityDate.Text);
            }
            if (txtStartDate.Text != "") {
                model.StartDate = DateTime.Parse(txtStartDate.Text);
            }
            if (txtEndDate.Text != "") {
                model.EndDate = DateTime.Parse(txtEndDate.Text);
            }
            if (txtDiscount.Text != "") {
                model.Discount = decimal.Parse(txtDiscount.Text);
            }
            if (txtDepreciate.Text != "") {
                model.Depreciate = decimal.Parse(txtDepreciate.Text);
            }
            if (cbIsRecommend.Checked == true)
            {
                model.IsRecommend = 1;
            }
            else {
                model.IsRecommend = 0;
            }
            if (cbIsOnlinePayment.Checked == true)
            {
                model.IsOnlinePayment = 1;
            }
            else {
                model.IsOnlinePayment = 0;
            }
            if (cbIsRosebery.Checked == true)
            {
                model.IsRosebery = 1;
            }
            else {
                model.IsRosebery = 0;
            }
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "upload/";
            if (fuImgUrl.FileName != "")
            {
                if (model.ImgURL != "")
                {
                    FileUpLoadCommon.DeleteFile(model.ImgURL);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fuImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.ImgURL = FilePath;
                imgUrl.Visible = true;
                imgUrl.ImageUrl = model.ImgURL;
                btnDelPic.Visible = true;

            }
            model.GoodsLink = txtGoodsLink.Text;
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtPublicGoods.Text == "")
            {
                strErr += "福利品名称不能为空！\\n";
            }
            if (txtPublicPrice.Text == "" && txtMarketPrice.Text == "")
            {
                strErr += "福利价格与市场价不能同时为空！\\n";
            }
            else
            {
                if (this.txtPublicPrice.Text != "")
                {
                    if (PageValidate.IsDecimal(txtPublicPrice.Text) == false)
                    {
                        strErr += "福利品价格格式不对！\\n";
                    }
                }
                if (this.txtMarketPrice.Text != "")
                {
                    if (PageValidate.IsDecimal(txtMarketPrice.Text) == false)
                    {
                        strErr += "市场价格格式不对！\\n";
                    }
                }
            }
            if (this.txtNumber.Text == "")
            {
                strErr += "数量不能为空！\\n";
            }
            else if (PageValidate.IsDecimal(txtNumber.Text) == false)
            {
                strErr += "数量格式不对！\\n";
            }
            if (txtDepreciate.Text != "") {
                if (PageValidate.IsDecimal(this.txtDepreciate.Text) == false)
                {
                    strErr += "降价格式不对！\\n";
                }
            }
            if (txtDiscount.Text != "") {
                if (PageValidate.IsDecimal(this.txtDiscount.Text) == false)
                {
                    strErr += "折扣率格式不对！\\n";
                }
                else if (decimal.Parse(txtDiscount.Text) > 1)
                {
                    strErr += "折扣率不能大于1！\\n";
                }
            }
            
            if (this.cbIsOnlinePayment.Checked == false && this.cbIsRosebery.Checked == false)
            {
                strErr += "请选择一种支付方式！\\n";
            }
            else {
                if (this.cbIsOnlinePayment.Checked == true)
                {
                    if (txtGoodsLink.Text == "")
                    {
                        strErr += "在线支付链接不能为空！\\n";
                    }
                }
            }
            if (txtScore.Text != "") {
                if (PageValidate.IsDecimal(this.txtScore.Text) == false)
                {
                    strErr += "可兑换积分格式不对！\\n";
                }
            }
            if (this.txtValidityDate.Text == "")
            {
                strErr += "有效期不能为空！\\n";
            }
            return strErr;
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {

            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.ImgURL != "" || modelArts.ImgURL != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.ImgURL);
                modelArts.ImgURL = "";
                bllArts.Update(modelArts);
                imgUrl.ImageUrl = "";
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }
    }
}


