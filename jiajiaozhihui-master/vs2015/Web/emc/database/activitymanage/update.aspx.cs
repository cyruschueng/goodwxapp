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
namespace SfSoft.web.emc.database.activitymanage
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_ActivityManage modelArts = new SfSoft.Model.WX_ActivityManage();
        BLL.WX_ActivityManage bllArts = new BLL.WX_ActivityManage();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.database.activitymanage";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    lblCreateDate.Text = string.Format("{0:yyyy-MM-dd HH:mm:ss}", DateTime.Now);
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
            hfMID.Value = "emc.database.activitymanage";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_ActivityManage model)
        {
            txtActivityName.Text = model.ActivityName;
            if (model.StartDate != null) {
                txtStartDate.Text = string.Format("{0:yyyy-MM-dd HH:mm:ss}", model.StartDate);
            }
            if (model.EndDate != null)
            {
                txtEndDate.Text = string.Format("{0:yyyy-MM-dd HH:mm:ss}", model.EndDate);
            }
            if (model.CreateDate != null)
            {
                lblCreateDate.Text = string.Format("{0:yyyy-MM-dd}", model.CreateDate);
            }
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            lblLikeNumber.Text = model.LikeNumber.ToString();
            lblReadNumber.Text = model.ReadNumber.ToString();
            lblShareNumber.Text = model.ShareNumber.ToString();
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
            Model.WX_ActivityManage model = new Model.WX_ActivityManage();
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

        private Model.WX_ActivityManage SetModelValue(Model.WX_ActivityManage model)
        {
            model.ActivityName = txtActivityName.Text;
            if (txtStartDate.Text != "") {
                model.StartDate = DateTime.Parse(txtStartDate.Text);
            }
            if (txtEndDate.Text != "") {
                model.EndDate = DateTime.Parse(txtEndDate.Text);
            }
            model.IsAct = int.Parse(ddlIsAct.SelectedValue);
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtActivityName.Text == "") {
                strErr += "活动名称不能为空！";
            }
            if (txtStartDate.Text == "") {
                strErr += "活动开始时间不能为空！";
            }
            if (txtEndDate.Text == "") {
                strErr += "活动结束时间不能为空！";
            }
            return strErr;
        }
        
    }
}


