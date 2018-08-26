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
namespace SfSoft.web.emc.material.overmatter
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_JingHua modelArts = new SfSoft.Model.WX_JingHua();
        BLL.WX_JingHua bllArts = new BLL.WX_JingHua();
        BLL.Pub_BaseData baseDataBll = new BLL.Pub_BaseData();
        Model.Pub_BaseData baseDataModel = new Model.Pub_BaseData();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.material.overmatter";
                
                //新建
                if (hfMode.Value == "add")
                {
                    ddlWeek.Items.FindByValue("").Selected = true;
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
            hfMID.Value = "emc.material.overmatter";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_JingHua model)
        {
            txtTitle.Text = model.Title;
            txtArticleUrl.Text = model.ArticleUrl;
            txtImgUrl.Text = model.ImgUrl;
            if (model.Week != null)
            {
                ddlWeek.Items.FindByValue(model.Week.ToString()).Selected = true;
            }
            if (model.IsHead==1) {
                cbHead.Checked = true;
            }
            txtOrder.Text = model.Order.ToString();
            Common.DatePicker dp = new DatePicker();
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
            Model.WX_JingHua model = new Model.WX_JingHua();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.ArticleType = 1;
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

        private Model.WX_JingHua SetModelValue(Model.WX_JingHua model)
        {
            model.Title = txtTitle.Text;
            model.ArticleUrl = txtArticleUrl.Text;
            model.ImgUrl = txtImgUrl.Text;
            
            if (txtOrder.Text != "") {
                model.Order = int.Parse(txtOrder.Text);
            }
            if (ddlWeek.Items != null && ddlWeek.SelectedValue != "")
            {
                model.Week = int.Parse(ddlWeek.SelectedValue);
            }
            if (cbHead.Checked == true)
            {
                model.IsHead = 1;
            }
            else {
                model.IsHead = 0;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (ddlWeek.Items == null || ddlWeek.SelectedValue == "")
            {
                strErr += "请选择周几 \\n";
            }
            if (txtTitle.Text == "") {
                strErr += "文章标题不能为空 \\n";
            }
            if (txtArticleUrl.Text == "") {
                strErr += "文章Url不能为空 \\n";
            }
            if (txtImgUrl.Text == "") {
                strErr += "图片Url不能为空 \\n";
            }
            
            return strErr;
        }
    }
}


