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
namespace SfSoft.web.emc.double11.unscramble
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Doublenovember_File_unscramble modelArts = new SfSoft.Model.WX_Doublenovember_File_unscramble();
        BLL.WX_Doublenovember_File_unscramble bllArts = new BLL.WX_Doublenovember_File_unscramble();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.double11.unscramble";

                //新建
                if (hfMode.Value == "add")
                {
                    rblIsAct.Items.FindByValue("0").Selected = true;
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
            hfMID.Value = "emc.double11.unscramble";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Doublenovember_File_unscramble model)
        {
            txtMainWords.Text = model.MainWords;
            txtPageIndex.Text = model.PageIndex.ToString();
            txtTranslation.Value = model.Translation;
            if (model.BookName != null) {
                ddlBookName.Items.FindByValue(model.BookName).Selected = true;
            }
            if (model.IsAct != null && model.IsAct.ToString()!="") {
                rblIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
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
            Model.WX_Doublenovember_File_unscramble model = new Model.WX_Doublenovember_File_unscramble();
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

        private Model.WX_Doublenovember_File_unscramble SetModelValue(Model.WX_Doublenovember_File_unscramble model)
        {
            if (ddlBookName.SelectedItem != null && ddlBookName.SelectedValue != "") {
                model.BookName = ddlBookName.SelectedValue;
            }
            model.MainWords = txtMainWords.Text;
            model.PageIndex = int.Parse(txtPageIndex.Text);
            model.Translation = txtTranslation.Value;
            if (rblIsAct.SelectedItem != null && rblIsAct.SelectedValue != "") {
                model.IsAct =int.Parse( rblIsAct.SelectedValue);
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if ( txtMainWords.Text=="")
            {
                strErr += "名句不能为空！\\n";
            }
            if (txtPageIndex.Text=="" || SfSoft.Common.PageValidate.IsNumber1(txtPageIndex.Text)==false)
            {
                strErr += "请正确填写页码，不能为空且是数字！\\n";
            }
            if ( txtTranslation.Value=="") {
                strErr += "译文不能为空！\\n";
            }
            if ( ddlBookName.SelectedItem==null || ddlBookName.SelectedValue=="") {
                strErr += "请选择书名！\\n";
            }
            return strErr;
        }
    }
}


