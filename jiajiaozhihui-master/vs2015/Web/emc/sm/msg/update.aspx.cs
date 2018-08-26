using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.SfEmc;
using System.Data;
using SfSoft.Common;
using SfSoft.DBUtility;

namespace SfSoft.web.emc.sm.msg
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hfID.Value = "0"; 
                if (Request.QueryString["Id"] != null && Request.QueryString["Id"].ToString() != "")
                {
                    hfID.Value = Request.QueryString["Id"].Trim();
                }   
                hfMID.Value = "emc.sm.msg";
                Model.Emc_Msg_Interface modelsp = new Model.Emc_Msg_Interface();
                BLL.Emc_Msg_Interface bllsp = new BLL.Emc_Msg_Interface();
                modelsp = bllsp.GetModel(int.Parse(hfID.Value));
                if (modelsp != null)
                {
                    ShowInfo(modelsp);
                    hfMode.Value = "update";
                }
                else
                {
                    hfMode.Value = "add";
                }
            }
        }
      
        protected void Page_Init(object sender, EventArgs e)
        {
            base.Page_Init(sender, e);
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.msg";
        }

        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        protected override void VtSave()
        {
            string mode = hfMode.Value;
            string strErr = "";
            strErr = this.checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            BLL.Emc_Msg_Interface bllsp = new BLL.Emc_Msg_Interface();
            Model.Emc_Msg_Interface model = this.setInfo(); 
            if (mode == "add")
            {
                bllsp.Add(model);
                hfMode.Value = "update"; 
                ClearData();
            }
            if (mode == "update")
            { 
                model.ID = int.Parse(hfID.Value);
                bllsp.Update(model);
            }
            Response.Write("<script>document.location='browse.aspx?state=browse'</script>");
        }
        private Model.Emc_Msg_Interface setInfo()
        {
            Model.Emc_Msg_Interface model = new Model.Emc_Msg_Interface();
            model.backstatus = txtreturnmark.Text;
            model.balanceurl = txtblaurl.Text;
            model.bremark = txtblamark.Text;
            model.cId = txtvid.Text;
            model.editurl = txtpwdurl.Text;
            model.eremark = txtpwdmark.Text;
            if (cbxdefault.Checked)
            {
                model.isdefault = 1;
            }
            else { model.isdefault = 0; }
            if (cbxlist.Checked)
            {
                model.IsList = 1;
            }
            else { model.IsList = 0; }
            model.lname = txtvlname.Text;
            model.maxcount = int.Parse(txtmaxcnt.Text);
            model.msglength = int.Parse(txtlength.Text);
            model.parmcId = txtpid.Text;
            model.parmcontent = txtpcontent.Text;
            model.parmlname = txtplname.Text;
            model.parmpwd = txtppwd.Text;
            model.parmtel = txtptel.Text;
            model.pwd = DESEncrypt.Encrypt(txtvpwd.Text);
            model.remark = txtsendmark.Text;
            model.resulmark = txtstatusmark.Text;
            model.sendurl = txtsendurl.Text; 
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (this.txtsendurl.Text == "")
            {
                strErr += "短信发送url不能为空！\\n";
            }
            if (this.txtpwdurl.Text == "")
            {
                strErr += "修改密码url不能为空！\\n";
            }
            if (this.txtblaurl.Text == "")
            {
                strErr += "查询余额url不能为空！\\n";
            }
            if (this.txtmaxcnt.Text=="")
            {
                strErr += "最大发送量不能为空！\\n";
            }
            if (this.txtpcontent.Text == "")
            {
                strErr += "内容参数名不能为空！\\n";
            }
            if (this.txtplname.Text == "")
            {
                strErr += "帐号参数名不能为空！\\n";
            }
            if (this.txtppwd.Text == "")
            {
                strErr += "密码参数名不能为空！\\n";
            }
            if (this.txtptel.Text == "")
            {
                strErr += "手机参数名不能为空！\\n";
            }
            if (this.txtvlname.Text == "")
            {
                strErr += "帐号参数值不能为空！\\n";
            }
            if (this.txtvpwd.Text == "")
            {
                strErr += "密码参数值不能为空！\\n";
            }
            if (this.txtlength.Text == "")
            {
                strErr += "短信长度不能为空！\\n";
            } 
            return strErr;
        }
        private void ShowInfo(Model.Emc_Msg_Interface model)
        {
            txtreturnmark.Text = model.backstatus;
            txtblaurl.Text = model.balanceurl;
            txtblamark.Text = model.bremark; ;
            txtvid.Text = model.cId;
            txtpwdurl.Text = model.editurl;
            txtpwdmark.Text = model.eremark;
            if (model.IsList == 1)
            {
                cbxlist.Checked = true;
            }
            else { cbxlist.Checked = false; }
            if (model.isdefault == 1)
            {
                cbxdefault.Checked = true;
            }
            else { cbxdefault.Checked = false; }
            txtplname.Text = model.parmlname;
            txtmaxcnt.Text = model.maxcount.ToString();
            txtlength.Text = model.msglength.ToString();
            txtpid.Text = model.parmcId;
            txtpcontent.Text = model.parmcontent;
            txtvlname.Text = model.lname;
            txtppwd.Text = model.parmpwd;
            txtptel.Text = model.parmtel;
            txtvpwd.Text = DESEncrypt.Decrypt(model.pwd);
            txtsendmark.Text = model.remark;
            txtstatusmark.Text = model.resulmark;
            txtsendurl.Text = model.sendurl;
        }


        public void ClearData()
        {
            txtsendmark.Text = ""; txtreturnmark.Text = ""; txtblaurl.Text = ""; txtblamark.Text = ""; cbxlist.Checked = false;
            txtvid.Text = ""; txtpwdurl.Text = ""; txtpwdmark.Text = ""; txtplname.Text = ""; txtsendurl.Text = "";
            txtmaxcnt.Text = "0"; txtlength.Text = "70"; txtpid.Text = ""; txtpcontent.Text = ""; txtstatusmark.Text = "";
            hfMode.Value = "add"; txtplname.Text = ""; txtppwd.Text = ""; txtptel.Text = ""; txtvpwd.Text = ""; 
        }
    }
}

