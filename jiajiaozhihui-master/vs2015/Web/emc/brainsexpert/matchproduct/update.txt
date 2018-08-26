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
namespace SfSoft.web.emc.brainsexpert.matchproduct
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_PublicGood modelArts = new SfSoft.Model.WX_PublicGood();
        BLL.WX_PublicGood bllArts = new BLL.WX_PublicGood();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();

                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.activity.matchproduct";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
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
            hfMID.Value = "emc.activity.matchproduct";
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
            if (model.GoodClass != null) {
                ddlGoodsClass.Items.FindByValue(model.GoodClass.ToString()).Selected = true;
            }
            txtDesc.Value = model.Desc.ToString();
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            txtScore.Text = model.Score.ToString();
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
            if (model.Exchange != null) {
                ddrExchange.Items.FindByValue(model.Exchange.ToString()).Selected = true;
            }

            txtInfoDesc.Text = model.InfoDesc;
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
                model.GoodsType = 8;
                model.OrderBy = 999;
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
            if (ddlGoodsClass.SelectedItem != null && ddlGoodsClass.SelectedValue != "") {
                model.GoodClass = int.Parse(ddlGoodsClass.SelectedValue);
            }
            model.Desc = txtDesc.Value;
            model.InfoDesc = txtInfoDesc.Text;
           
            if (ddlIsAct.SelectedItem != null) {
                model.IsAct =int.Parse( ddlIsAct.SelectedValue);
            }
            if (ddrExchange.SelectedItem != null && ddrExchange.SelectedValue != "") {
                model.Exchange = ddrExchange.SelectedValue;
            }
            if (txtScore.Text != "") {
                model.Score = int.Parse(txtScore.Text);
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
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtPublicGoods.Text == "")
            {
                strErr += "奖品不能为空！\\n";
            }
            if (this.ddrExchange.SelectedItem==null || ddrExchange.SelectedValue=="") {
                strErr += "兑换名次不能为空！\\n";
            }
            if (this.ddlGoodsClass.SelectedItem==null || ddlGoodsClass.SelectedValue=="")
            {
                strErr += "选择产品类型！\\n";
            }
            if (ddlGoodsClass.SelectedValue == "2") {
                if (txtScore.Text == "")
                {
                    strErr += "请输入金币数量！\\n";
                }
                else {
                    if (SfSoft.Common.PageValidate.IsNumber1(txtScore.Text) == false)
                    {
                        strErr += "输入的金币格式不正确，只能输入数字！\\n";
                    }
                }
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
            BLL.Pub_BaseData bll=new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.goodsclass' and isnull(IsAct,0)=1");
            ddlGoodsClass.DataSource = ds;
            ddlGoodsClass.DataTextField = "RefValue";
            ddlGoodsClass.DataValueField = "RefValueCode";
            ddlGoodsClass.DataBind();
            ddlGoodsClass.Items.Insert(0, new ListItem { Text="--请选择--", Value="" });
        }
    }
}


