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

namespace SfSoft.web.emc.sm.computer
{
    public partial class view : SfSoft.SfEmc.EmcDetailPage 
    {
        Model.Pub_ComputerKey modelCk = new SfSoft.Model.Pub_ComputerKey();
        BLL.Pub_ComputerKey bllCk = new SfSoft.BLL.Pub_ComputerKey();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                string ID = Request.Params["ID"].ToString();
                string mode = Request.Params["mode"].ToString();
                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.sm.computer";

                modelCk = bllCk.GetModel(int.Parse(ID));
                if (modelCk != null)
                {
                    this.ShowInfo(modelCk);
                }
            }
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.computer";
        }
        //工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnApproveYes();
            phToolBars.Controls.Add(tsbtnApproveYes);
            NewTsbtnApproveNo();
            phToolBars.Controls.Add(tsbtnApproveNo);
            NewTsbtnCancel();
            tsbtnCancel.Text = "取消";
            tsbtnCancel.OnClientClick = "return confirm('确定要取消吗?');";
            phToolBars.Controls.Add(tsbtnCancel);
            VtInitBaseDetailToolsBars();
        }

        private void ShowInfo(Model.Pub_ComputerKey model)
        {
            hfUserID.Value = model.UserID.ToString();
            txtCnName.Text = model.CnName;
            txtComputerID.Text = model.ComputerID;
            txtComputerKind.Text = model.ComputerKind;
            txtComputerSn.Text = model.ComputerSn;
            txtComputerType.Text = model.ComputerType;
            txtDeptName.Text = model.DeptName;
            txtIDCard.Text = model.IDCard;
            txtBrand.Text = model.Brand;
            model.Remark = model.Remark;


            this.txtAppDate.Text = PageValidate.FormatSmallDate(model.AppDate);
            this.txtStatus.Text = model.Status;
            txtApproval.Text = model.Approval;
            txtAppRemark.Text = model.AppRemark;

            if (model.Status != "已取消")
            {
                if (model.Status == "未审批")
                {
                    tsbtnApproveYes.Enabled = true;
                    tsbtnApproveNo.Enabled = true;
                }
                else
                {
                    tsbtnApproveYes.Enabled = false;
                    tsbtnApproveNo.Enabled = false;
                }
                tsbtnCancel.Enabled = true;
            }
            else
            {
                tsbtnApproveYes.Enabled = false;
                tsbtnApproveNo.Enabled = false;
                tsbtnCancel.Enabled = false;
            }
            BindData();
        }
        protected override void VtCancel()
        {
            modelCk = bllCk.GetModel(int.Parse(hfID.Value));
            modelCk.Status = "已取消";
            modelCk.CancelDate = DateTime.Now;
            modelCk.Approval = Session["CnName"].ToString();
            modelCk.AppRemark = txtAppRemark.Text;
            bllCk.Update(modelCk);
            VtShowTips("取消成功", "0", "0");
        }
        protected override void VtApproveYes()
        {
            ApproveForm("审批同意");
        }
        protected override void VtApproveNo()
        {
            ApproveForm("审批不同意");
        }
        void ApproveForm(string Status)
        {
            modelCk = bllCk.GetModel(int.Parse(hfID.Value));
            modelCk.Status = Status;
            modelCk.AppDate = DateTime.Now;
            modelCk.Approval = Session["CnName"].ToString();
            modelCk.AppRemark = txtAppRemark.Text;
            bllCk.Update(modelCk);
            VtShowTips("审批成功", "0", "0");
        }
        private void BindData()
        {
            string strWhere = " Flag=1 and  UserID='" + hfUserID.Value + "' and ID<>'" + hfID.Value + "' and status='审批同意' ";
            BLL.Pub_ComputerKey bll = new BLL.Pub_ComputerKey();
            DataSet ds = bll.GetList(strWhere);
            if (ds.Tables[0].Rows.Count > 0)
            {
                PanelList.Visible = true;
            }
            else
            {
                PanelList.Visible = false;
            }
            Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);

        }
    }
}


