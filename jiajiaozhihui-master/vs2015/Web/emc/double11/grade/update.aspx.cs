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
using System.IO;
namespace SfSoft.web.emc.double11.grade
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Doublenovember_Grade modelArts = new SfSoft.Model.WX_Doublenovember_Grade();
        BLL.WX_Doublenovember_Grade bllArts = new BLL.WX_Doublenovember_Grade();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["mode"] != null) {
                    hfMode.Value = Request.QueryString["mode"].ToString();
                }
                if (Request.QueryString["ID"] != null) {
                    hfID.Value = Request.QueryString["ID"].ToString();
                }
                hfMID.Value = "emc.double11.grade";

                if (hfMode.Value == "add")
                {
                    
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfID.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.double11.activity";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
            tsbtnSave.Attributes.Remove("onmouseover");
            tsbtnSave.Attributes.Remove("onmouseout");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();

            tsbtnPrint.Attributes.Remove("onmouseover");
            tsbtnPrint.Attributes.Remove("onmouseout");
            tsbtnFresh.Attributes.Remove("onmouseover");
            tsbtnFresh.Attributes.Remove("onmouseout");
            tsbtnReturn.Attributes.Remove("onmouseover");
            tsbtnReturn.Attributes.Remove("onmouseout");
            tsbtnClose.Attributes.Remove("onmouseover");
            tsbtnClose.Attributes.Remove("onmouseout");
            tsbtnHelp.Attributes.Remove("onmouseover");
            tsbtnHelp.Attributes.Remove("onmouseout");
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
            Model.WX_Doublenovember_Grade model = new Model.WX_Doublenovember_Grade();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                int index = bllArts.Add(model);
                hfID.Value = index.ToString();
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

        private void ShowInfo(Model.WX_Doublenovember_Grade model)
        {
            txtGradeName.Text = model.GradeName;
            txtLowerLimit.Text = model.LowerLimit.ToString();
            txtUpperLimit.Text = model.UpperLimit.ToString();
            ddlGrade.Items.FindByValue(model.Grade.ToString()).Selected = true;
        }
        private Model.WX_Doublenovember_Grade SetModelValue(Model.WX_Doublenovember_Grade model)
        {
            model.GradeName = txtGradeName.Text;
            model.LowerLimit = int.Parse(txtLowerLimit.Text.ToString());
            model.UpperLimit = int.Parse(txtUpperLimit.Text.ToString());
            if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "") {
                model.Grade = int.Parse(ddlGrade.SelectedValue);
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtGradeName.Text == "") {
                strErr += "等级名称不能为空！\\n";
            }
            if (txtLowerLimit.Text == "" || PageValidate.IsNumber1(txtLowerLimit.Text) == false)
            {
                strErr += "下线不能不能为空，并且只能是数字！\\n";
            }
            if (txtUpperLimit.Text == "" || PageValidate.IsNumber1(txtUpperLimit.Text) == false)
            {
                strErr += "上线不能不能为空，并且只能是数字！\\n";
            }
            if (ddlGrade.SelectedItem == null || ddlGrade.SelectedValue == "") {
                strErr += "选择等级！\\n";
            }
            return strErr;
        }
    }
}


