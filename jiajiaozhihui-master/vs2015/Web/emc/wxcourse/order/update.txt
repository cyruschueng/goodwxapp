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
namespace SfSoft.web.emc.wxcourse.order
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Course_Order modelArts = new SfSoft.Model.WX_Course_Order();
        BLL.WX_Course_Order bllArts = new BLL.WX_Course_Order();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                
                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.order";

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
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.order";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course_Order model)
        {
            lbBuyNumber.Text = model.BuyNumber.ToString();
            lbName.Text = model.Name;
            lbOrderDateTime.Text = model.OrderDateTime.ToString();
            lbPrice.Text = model.Price.ToString();
            lbTelephone.Text = model.Telephone;
            lbTradeno.Text = model.Tradeno;
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
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
            Model.WX_Course_Order model = new Model.WX_Course_Order();
            model = bllArts.GetModel(int.Parse(hfID.Value));
            model = this.SetModelValue(model);
            bllArts.Update(model);
        }

        private Model.WX_Course_Order SetModelValue(Model.WX_Course_Order model)
        {
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "") {
                model.IsAct = int.Parse(ddlIsAct.SelectedValue);
            }
            
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (ddlIsAct.SelectedItem == null || ddlIsAct.SelectedValue == "")
            {
                strErr += "请选择订单状态！\\n";
            }
            return strErr;
        }
    }
}


