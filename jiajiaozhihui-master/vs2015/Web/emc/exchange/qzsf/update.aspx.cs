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
namespace SfSoft.web.emc.exchange.qzsf
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Product_Exchange modelArts = new SfSoft.Model.WX_Product_Exchange();
        BLL.WX_Product_Exchange bllArts = new BLL.WX_Product_Exchange();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.exchange.qzsf";
                InitDropDownList();
                //新建
                if (hfMode.Value == "add")
                {
                    rblAct.Items.FindByValue("1").Selected = true;
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
            hfMID.Value = "emc.exchange.qzsf";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Product_Exchange model)
        {
            txtName.Text = model.Name;
            txtDescribe.Text = model.Describe;
            txtDetails.Value = model.Details;
            txtQuantity.Text = String.IsNullOrEmpty(model.Quantity.ToString()) ? "" : model.Quantity.ToString();
            txtStore.Text = String.IsNullOrEmpty(model.Store.ToString()) ? "" : model.Store.ToString();
            ddlItem.Items.FindByText(model.Item).Selected = true;
            ddlType.Items.FindByText(model.Type).Selected=true;
            rblAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;

            if (model.Image != "")
            {
                imgUrl.ImageUrl = model.Image;
                imgUrl.Visible = true;
                btnDelPic.Visible = true;
            }
            else
            {
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
            
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
            Model.WX_Product_Exchange model = new Model.WX_Product_Exchange();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                
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

        private Model.WX_Product_Exchange SetModelValue(Model.WX_Product_Exchange model)
        {
            model.Name = txtName.Text;
            model.Describe = txtDescribe.Text;
            model.Details = txtDetails.Value;
            model.IsAct = Convert.ToInt32(rblAct.SelectedValue);
            if (ddlItem.SelectedItem != null && ddlItem.SelectedValue != "") {
                model.Item = ddlItem.SelectedItem.Text;
            }
            if (ddlType.SelectedItem != null && ddlType.SelectedValue != "") {
                model.Type = ddlType.SelectedItem.Text;
            }
            if(!String.IsNullOrEmpty(txtQuantity.Text)){
                model.Quantity = Convert.ToInt32(txtQuantity.Text);
            }
            if(!String.IsNullOrEmpty(txtStore.Text)){
                model.Store = Convert.ToInt32(txtStore.Text);
            }
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "upload/";
            if (fuImgUrl.FileName != "")
            {
                if (model.Image != "")
                {
                    FileUpLoadCommon.DeleteFile(model.Image);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fuImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.Image = FilePath;
                imgUrl.Visible = true;
                imgUrl.ImageUrl = model.Image;
                btnDelPic.Visible = true;

            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtName.Text == "")
            {
                strErr += "产品名称不能为空！\\n";
            }
            if (ddlType.SelectedItem==null || ddlType.SelectedValue=="")
            {
                strErr += "兑换类型不能为空！\\n";
            }
            if (this.ddlItem.SelectedItem==null || ddlItem.SelectedValue==""){
                strErr += "使用范围不能为空！\\n";
            }
            if (txtQuantity.Text=="") {
                strErr += "兑换条件不能为空！\\n";
            }
            return strErr;
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {

            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.Image != "" || modelArts.Image != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.Image);
                modelArts.Image = "";
                bllArts.Update(modelArts);
                imgUrl.ImageUrl = "";
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }
        private void InitDropDownList()
        {
            /*兑换类型*/
            Array typeArray = Enum.GetValues(typeof(ShenerWeiXin.EnumExchange));
            int i = 0;
            foreach (var t in typeArray)
            {
                var name = Enum.GetName(typeof(ShenerWeiXin.EnumExchange), t);
                ddlType.Items.Insert(i, name);
                i++;
            }
            ddlType.Items.Insert(0, "");
            i = 0;
            /*使用范围*/
            typeArray = Enum.GetValues(typeof(ShenerWeiXin.ItemObject));
            foreach (var t in typeArray)
            {
                var name = Enum.GetName(typeof(ShenerWeiXin.ItemObject), t);
                ddlItem.Items.Insert(i, name);
            }
            ddlItem.Items.Insert(0, "");
        }
    }
}


