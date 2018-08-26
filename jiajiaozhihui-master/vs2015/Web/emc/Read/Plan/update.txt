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
using System.Web.Services;
using System.Collections.Generic;
namespace SfSoft.web.emc.read.plan
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Read_Plan modelArts = new SfSoft.Model.WX_Read_Plan();
        BLL.WX_Read_Plan bllArts = new BLL.WX_Read_Plan();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.read.plan";

                //新建
                if (hfMode.Value == "add")
                {
                    rblFileType.Items.FindByValue("0").Selected = true;
                    rblIsAct.Items.FindByValue("1").Selected = true;
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
            hfMID.Value = "emc.read.plan";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Read_Plan model)
        {
            txtPlanName.Text = model.PlanName;
            txtIntro.Text = model.Intro;
            txtDetail.Value = model.Detail;
            rblIsAct.Items.FindByValue((model.IsAct ?? 0).ToString()).Selected = true;
            rblFileType.Items.FindByValue((model.FileType ?? 0).ToString()).Selected = true;
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
            Model.WX_Read_Plan model = new Model.WX_Read_Plan();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
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

        private Model.WX_Read_Plan SetModelValue(Model.WX_Read_Plan model)
        {
            model.Detail = txtDetail.Value;
            if (rblFileType.SelectedItem != null && rblFileType.SelectedValue != "") {
                model.FileType = int.Parse(rblFileType.SelectedValue);
            }
            if (rblIsAct.SelectedItem != null && rblIsAct.SelectedValue != "") {
                model.IsAct = int.Parse(rblIsAct.SelectedValue);
            }
            model.Intro = txtIntro.Text;
            model.PlanName = txtPlanName.Text;
            model.Detail = txtDetail.Value;

            return model;
        }
        
        private string checkform()
        {
            string strErr = "";
            if (txtPlanName.Text.Trim() == "") {
                strErr += "名称不能为空！\\n";
            }
            return strErr;
        }
    }
}


