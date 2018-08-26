﻿using System;
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
namespace SfSoft.web.emc.hrm.arc
{
    public partial class add : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            /******************************增加窗体代码********************************/


            string strErr = "";

            if (this.txtUserName.Text == "")
            {
                strErr += "用户名不能为空！\\n";
            }
            if (this.txtCnName.Text == "")
            {
                strErr += "姓名不能为空！\\n";
            }
            if (this.txtPassword.Text == "")
            {
                strErr += "密码不能为空！\\n";
            }
 

            if (this.txtDeptID.Value== "")
            {
                strErr += "部门不能为空！\\n";
            }


  
            if (this.txtEmail.Text == "")
            {
                strErr += "Email不能为空！\\n";
            }
 

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
             MembershipCreateStatus status;
             string passwordQuestion = this.txtUserName.Text;
             string passwordAnswer = this.txtCnName.Text;

            string UserName = this.txtUserName.Text;
            string CnName = this.txtCnName.Text;
            string EnName = this.txtEnName.Text;
            string EmpID = this.txtEmpID.Text;
            string Password = this.txtPassword.Text ;

            string DeptName = this.txtDeptName.Text;

            string Positions = this.txtPositions.Text;
            string Sex = this.txtSex.SelectedValue;
            string IDCard = this.txtIDCard.Text;
            string Nationality = this.txtNationality.Text;
            string Addr = this.txtAddr.Text;
            string Mobile = this.txtMobile.Text;
            string Tel = this.txtTel.Text;
            string Email = this.txtEmail.Text;
            string Fax = this.txtFax.Text;
            try
             {
               MembershipUser newUser = Membership.CreateUser(UserName, Password, 
                                                   Email, passwordQuestion,
                                                   passwordAnswer, true, out status);
               if (newUser == null)
               {
                   Msg.Text = GetErrorMessage(status);
               }
               else
               {
                   SfSoft.Model.Pub_EmpInfo model = new SfSoft.Model.Pub_EmpInfo();
                   SfSoft.BLL.Pub_EmpInfo bll = new SfSoft.BLL.Pub_EmpInfo();

                   model.UserID = new Guid(newUser.ProviderUserKey.ToString());
                   model.UserName = UserName;
                   model.CnName = CnName;
                   model.EnName = EnName;
                   model.EmpID = EmpID;

                   // model.DeptName = DeptName;

                   model.Positions = Positions;
                   model.Sex = Sex;
                   model.IDCard = IDCard;
                   model.Nationality = Nationality;
                   model.Addr = Addr;
                   model.Mobile = Mobile;
                   model.Tel = Tel;
                   model.Email = Email;
                   model.Fax = Fax;

                   bll.Add(model);
                   int uid = -1;
                   //取的用户ID
                   model = bll.GetModel(UserName);
                   if (model != null)
                   {
                       uid = model.ID;

                   }
                   //增加到部门公司人员关联表中


                   BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
                   Model.Pub_DeptUsers modeldu = new Model.Pub_DeptUsers();
                   modeldu.FilialeID = Common.Common.stringToInt(Session["FilialeID"].ToString());
                   modeldu.DeptID = Common.Common.stringToInt(txtDeptID.Value);
                   modeldu.UserDeptKind = "1";
                   modeldu.UserID = uid;
                   blldu.Add(modeldu);
               }

            }
             catch
             {
                Msg.Text = "An exception occurred creating the user.";
              }
        }

        protected void Btn_Add_Click(object sender, EventArgs e)
        {
            Response.Write("<script>window.open('add.aspx?state=add','_self','')");
        }

        protected void Btn_Return2_Click(object sender, EventArgs e)
        {
            Response.Write("<script>window.open('browse.aspx?state=browse','_self','')");
        }

        public string GetErrorMessage(MembershipCreateStatus status)
        {
            switch (status)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "用户名已经存在，请输入其它用户名！";

                case MembershipCreateStatus.DuplicateEmail:
                    return "Email地址已经存在请用其它Email";

                case MembershipCreateStatus.InvalidPassword:
                    return "密码格式不正确！";

                case MembershipCreateStatus.InvalidEmail:
                    return "Email格式不正确！";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }


 
    }
}


