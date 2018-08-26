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
using SfSoft.DBUtility;

namespace SfSoft.web.emc.sm.computer
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage 
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
 
                //初始化下拉数据
                EmcCommon.GetUsersIDDropDownList(ddlUserID,  Session["FilialeID"].ToString());
                string sql = "select * from emc_srv_agent ";
                DataSet ds = DbHelperSQL.Query(sql);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    ListItem li =null;
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        li = new ListItem();
                        li.Text = dr["AgentName"].ToString();
                        li.Value = dr["mname"].ToString();
                        ddlUserID.Items.Add(li);
                    }
                }

                //新建
                if (hfMode.Value == "add")
                {
                    txtApproval.Text = Session["CnName"].ToString();
                    txtAppDate.Text = PageValidate.FormatSmallDate(DateTime.Now);
                    txtStatus.Text = "审批同意";
                    
                }
                //修改
                if (hfMode.Value == "update")
                {

                    //初始化单据数据

                    modelCk = bllCk.GetModel(int.Parse(ID));
                    if (modelCk != null)
                    {
                        this.ShowInfo(modelCk);
                    }
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
            VtInitEditToolbars();
            NewTsbtnCancel();
            tsbtnCancel.Text = "取消";
            tsbtnCancel.OnClientClick = "return confirm('确定要取消吗?');";
            phToolBars.Controls.Add(tsbtnCancel);
            VtInitBaseDetailToolsBars();
        }

        private void ShowInfo(Model.Pub_ComputerKey model)
        {
    
            string UserID = model.UserID.ToString();
            EmcCommon.SetDropDownListUserID(ddlUserID, UserID, model.CnName);
            this.txtRemark.Text = model.Remark;
            this.txtAppDate.Text = PageValidate.FormatSmallDate(model.AppDate);
            this.txtStatus.Text = model.Status;
            txtApproval.Text = model.Approval;
            txtAppRemark.Text = model.AppRemark;
            if (model.Status != "已取消")
            {
                tsbtnSave.Enabled = true;
                tsbtnCancel.Enabled = true;
            }
            else
            {
                tsbtnSave.Enabled = false;
                tsbtnCancel.Enabled = false;
            }
        }


        private string SaveBo()
        {
            string strErr = "";
            string DocID = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return "";
            }
            Model.Pub_ComputerKey model = new SfSoft.Model.Pub_ComputerKey();
            //保存单据
            if (hfMode.Value == "add")
            {
 
                string FilialeID = Session["FilialeID"].ToString();
                model = this.SetModelValue(model);
                model.Status = txtStatus.Text;
                
                model.FilialeID =PageValidate .StringToInt (FilialeID);
                DocID = bllCk.Add(model).ToString();
                hfID.Value = DocID;
                hfMode.Value = "update";
                tsbtnCancel.Enabled = false;
            }
            else
            {
                string ID = hfID.Value;
                DocID = ID;
                model = bllCk.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllCk.Update(model);
                //显示已有文件

            }
 

            return DocID;
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

        private Model.Pub_ComputerKey SetModelValue(Model.Pub_ComputerKey model)
        {

            string CnName = ddlUserID.SelectedItem.Text;
            string UserID = ddlUserID.SelectedItem.Value;
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            DataSet dsEmp = bllEmp.GetUsersInfoList(" b.ID='" + UserID + "' and b.zzstate='在职'");
            model.Remark = txtRemark.Text ;
            if (dsEmp.Tables[0].Rows.Count > 0)
            {
                model.UserID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["ID"].ToString());
                model.UserName = dsEmp.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = CnName;
                model.Flag = 0;
                model.AppRemark = txtAppRemark.Text ;
                model.AppDate = PageValidate.StringToDatetime(txtAppDate.Text);
                model.Approval = Session["CnName"].ToString();
                model.SubmitDate = DateTime.Now;
                model.FilialeID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["FilialeID"].ToString());
                model.DeptID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["DeptID"].ToString());
                model.DeptName = dsEmp.Tables[0].Rows[0]["DeptName"].ToString();
            }

            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (ddlUserID.SelectedItem == null || ddlUserID.SelectedItem .Value  == "--")
            {
                strErr += "姓名不能为空！\\n";
            }
            if (txtRemark.Text == "")
            {
                strErr += "非验证原因不能为空！\\n";
            }
            string UserID = ddlUserID.SelectedItem.Value;
            DataSet ds = bllCk.GetList(" Flag=0 and UserID='" + UserID + "' and status<>'已取消' and status<>'审批不同意' ");
            if (ds.Tables[0].Rows.Count > 0)
            {
                strErr += "用户授权已存在！\\n";
            }
            return strErr;
        }


        protected override void VtSave()
        {
            string DocID = SaveBo();

        }
 
    }
}


