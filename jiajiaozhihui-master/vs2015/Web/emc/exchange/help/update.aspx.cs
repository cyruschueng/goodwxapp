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
namespace SfSoft.web.emc.exchange.help
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Item_Help modelArts = new SfSoft.Model.WX_Item_Help();
        BLL.WX_Item_Help bllArts = new BLL.WX_Item_Help();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.material.reply";
                InitData();
                //新建
                if (hfMode.Value == "add")
                {
                    ddlHelpType.Items.FindByValue("").Selected = true;
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
            hfMID.Value = "emc.exchange.help";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Item_Help model)
        {
            txtTitle.Text = model.Title;
            if (model.HelpType != null) {
                ddlHelpType.Items.FindByValue(model.HelpType.ToString()).Selected = true;
            }
            txtDetails.Value = model.Details;
            txtSn.Text = (model.Sn ?? 999).ToString();
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
            Model.WX_Item_Help model = new Model.WX_Item_Help();
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

        private Model.WX_Item_Help SetModelValue(Model.WX_Item_Help model)
        {
            model.Title = txtTitle.Text;
            if (ddlHelpType.SelectedItem != null && ddlHelpType.SelectedValue != "") {
                model.HelpType =Convert.ToInt32(ddlHelpType.SelectedValue);
            }
            model.Details = txtDetails.Value;
            model.Sn = txtSn.Text.Trim() == "" ? 999 : Convert.ToInt32(txtSn.Text);
            model.Title = txtTitle.Text;

            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (txtTitle.Text == "")
            {
                strErr += "标题不能为空！\\n";
            }
            if (ddlHelpType.SelectedItem == null || ddlHelpType.SelectedValue == "")
            {
                strErr += "类型不能为空！\\n";
            }
            return strErr;
        }

        private void InitData()
        {
            var orderTypes = Enum.GetValues(typeof(ShenerWeiXin.EnumItemHelp));
            ddlHelpType.Items.Clear();
            int index = 0;
            foreach (var orderType in orderTypes)
            {
                ddlHelpType.Items.Insert(index, new ListItem()
                {
                    Value = ((int)orderType).ToString(),
                    Text = Enum.GetName(typeof(ShenerWeiXin.EnumItemHelp), orderType)
                });
                index++;
            }
            ddlHelpType.Items.Insert(0, new ListItem() { Value="", Text="" });
        }
    }
}


