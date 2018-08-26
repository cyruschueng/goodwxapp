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
namespace SfSoft.web.emc.life.exchange
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
                hfMID.Value = "emc.life.exchange";

                InitDropDownList();

                //新建
                if (hfMode.Value == "add")
                {
                    ddlGoodsType.Items.FindByValue("-1").Selected = true;
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
            hfMID.Value = "emc.life.exchange";
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
            txtScore.Text = model.Score.ToString();
            txtValidityDate.Text = model.ValidityDate.ToString();
            if(model.OrderBy!=null){
                txtOrderBy.Text = model.OrderBy.ToString();
            }
            if (model.GoodsType.ToString() != "" && model.GoodsType != null) {
                ddlGoodsType.Items.FindByValue(model.GoodsType.ToString()).Selected = true;
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

            txtNumber.Text = model.Number.ToString();
            txtDesc.Value = model.Desc.ToString();
            txtInfoDesc.Value = model.InfoDesc;
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
                model.IsAct = 1;
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
            model.Score = int.Parse(txtScore.Text);
            if (txtValidityDate.Text.Trim() != "") {
                model.ValidityDate = DateTime.Parse(txtValidityDate.Text);    
            }
            model.Number = int.Parse(txtNumber.Text);
            model.Desc = txtDesc.Value;
            model.InfoDesc = txtInfoDesc.Value;
            if (txtOrderBy.Text != "") {
                model.OrderBy = int.Parse(txtOrderBy.Text);
            }
            if (ddlGoodsType.SelectedItem != null) {
                model.GoodsType =int.Parse(ddlGoodsType.SelectedValue);
            }

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "upload/";
            if (fuImgUrl.FileName != "")
            {
                if (model.ImgURL != "")
                {
                    FileUpLoadCommon.DeleteFile(model.ImgURL);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fuImgUrl);
                string FilePath = UploadFilesPath+newfname;

                model.ImgURL = FilePath;
                imgUrl.Visible = true;
                imgUrl.ImageUrl = model.ImgURL;
                btnDelPic.Visible = true;

            }

            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtPublicGoods.Text == "")
            {
                strErr += "公益产品名称不能为空！\\n";
            }
            if (this.txtScore.Text == "")
            {
                strErr += "换取积分不能为空！\\n";
            }
            if (this.txtNumber.Text == "")
            {
                strErr += "数量不能为空！\\n";
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
        /// <summary>
        /// 活动类型
        /// </summary>
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.activity.type' and isnull(IsAct,0)=0");
            EmcCommon.SetBaseDataDropDownList(ddlGoodsType, "weixin.activity.type", ds);
        }
    }
}


