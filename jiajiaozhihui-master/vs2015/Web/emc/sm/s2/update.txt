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
using SfSoft.SfEmc;
using SfSoft.DBUtility;//请先添加引用
using System.Data.SqlClient;
using System.Text;
namespace SfSoft.web.emc.sm.s2
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        BLL.aspnet_Roles bllasproles = new BLL.aspnet_Roles();
        BLL.Pub_Modules_Fun bllfun = new BLL.Pub_Modules_Fun();
        protected void Page_Load(object sender, EventArgs e)
        {

            //获得UserName
            if (Request.QueryString["UserName"] != null)
            {
                txtUserName.Text = Request.QueryString["UserName"].ToString();
                txtOldUserName.Text = txtUserName.Text;
            }

            if (!IsPostBack)
            {
                #region 读取帐号资料
                Lbl_UserName.Text = txtUserName.Text;
                MembershipUser user = Membership.GetUser(txtUserName.Text);
                txt_Email.Text = user.Email;

                txt_PasswordQuestion.Text = user.PasswordQuestion;
                txt_Comment.Text = user.Comment;

                lbl_CreationDate.Text = user.CreationDate.ToString();
                lbl_LastActivityDate.Text = user.LastActivityDate.ToString();
                lbl_LastLoginDate.Text = user.LastLoginDate.ToString();
                lbl_LastPasswordChangedDate.Text = user.LastPasswordChangedDate.ToString();

                chk_IsOnline.Checked = user.IsOnline;
                //lbl_ProviderUserKey.Text = user.ProviderUserKey.ToString();
                HF_UserID.Value = user.ProviderUserKey.ToString();
                chk_IsApproved.Checked = user.IsApproved;
                //判断用户锁定

                if (user.IsLockedOut)
                {
                    btn_IsLockOut.Enabled = true;
                    btn_IsLockOut.Text = "解除用户锁定";
                    btnLock.Visible = false;
                }
                else
                {
                    btnLock.Enabled = true;
                }
                #endregion
                #region 读取详细信息和联系方式



                BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
                Model.Pub_EmpInfo modelEmp = bllEmp.GetModel(txtUserName.Text);
                //是否为空
                if (modelEmp != null)
                {
                    this.ShowInfo(modelEmp);

                    HF_Mode.Value = "update";

                }
                else
                {
                    HF_Mode.Value = "add";
                    txtEmail.Text = user.Email;
                }
                #endregion

                //初始化角色
                GetBySelectRolesListBox();
                //初始化已有角色
                GetRolesListBox();
                //初始化权限明细
                GetRolesTreeView();

            }

        }

        #region 权限明细
        protected void GetRolesTreeView()
        {
            this.RolesTreeView.Nodes.Clear();

            //取的角色权限集合
            BLL.Pub_Roles_Fun bllrf = new BLL.Pub_Roles_Fun();
            DataSet rolesds = bllrf.GetUsersFun(HF_UserID.Value, Session["FilialeID"].ToString());

            DataView dv = new DataView(rolesds.Tables[0]);

            TreeNode rootnode = new TreeNode();
            rootnode.Expanded = true;
            rootnode.Text = "EMC";
            rootnode.ToolTip = "emc";
            DataView dv1 = dv;
            dv1.RowFilter = "[FunID]='emc'";
            RolesTreeView.Nodes.Add(rootnode);
            SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
            string strWhere = " ParentMID<>'0' order by OrderID";
            DataSet dsm = bll.GetList(strWhere);
            CreateTree("emc", rootnode, dsm, dv);


        }


        private void CreateTree(string modulesID, TreeNode rootnode, DataSet dsm, DataView dv)
        {
            DataView dvm = new DataView(dsm.Tables[0]);
            dvm.RowFilter = " ParentMID = '" + modulesID + "' ";
            foreach (DataRowView dr in dvm)
            {
                TreeNode treenode = new TreeNode();
                DataView dvtemp = dv;
                treenode.Text = dr["ModulesName"].ToString().Trim();
                treenode.ToolTip = dr["ModulesID"].ToString().Trim();
                if (SfEmc.UserAcl.checkMenuAcl(dv, dr["ModulesID"].ToString().Trim()) || (txtUserName .Text  == "admin"))
                {
                    dvtemp.RowFilter = "[FunID]='" + dr["ModulesID"].ToString().Trim() + "'";
                    DataSet dscl = bllfun.GetListByFunTypeAndModulesID("module", dr["ModulesID"].ToString().Trim());
                    if (dscl != null)
                    {
                        foreach (DataRow drcl in dscl.Tables[0].Rows)
                        {
                            TreeNode treenodecl = new TreeNode();
                            DataView dvtempcl = dv;
                            string FunID = drcl["FunID"].ToString().Trim();
                            if (SfEmc.UserAcl.checkMenuAcl(dv, FunID) || (txtUserName.Text == "admin"))
                            {
                                string FunName = drcl["FunName"].ToString().Trim();
                                dvtempcl.RowFilter = "[FunID]='" + drcl["FunID"].ToString().Trim() + "'";
                                if (dvtempcl.Count > 0)
                                {
                                    treenodecl.Text = FunName;
                                    treenodecl.ToolTip = FunID;
                                    treenode.ChildNodes.Add(treenodecl);
                                }

                            }

                        }
                    }
                    rootnode.ChildNodes.Add(treenode);
                }
                string MID = dr["ModulesID"].ToString().Trim();
                CreateTree(MID, treenode, dsm, dv);
            }
        }
        #endregion
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s2";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s2.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.Pub_EmpInfo model)
        {
            Hashtable hashdp = new Hashtable();
            hashdp = EmcCommon.getDeptInfoByUserID(model.ID.ToString(), "");
            if (hashdp != null)
            {
                this.txtDeptID.Value = hashdp["DeptID"].ToString();
                this.txtDeptName.Text = hashdp["DeptName"].ToString();
                this.txtPositions.Text = hashdp["PostName"].ToString();
            }

            this.txtUserName.Text = model.UserName;
            this.txtCnName.Text = model.CnName;
            this.txtEmpID.Text = model.EmpID;
            this.txtEnName.Text = model.EnName;
           
            string txtSexTemp = model.Sex;
            if (txtSexTemp != null && this.txtSex.Items.FindByValue(txtSexTemp) != null)
            {
                this.txtSex.Items.FindByValue(txtSexTemp).Selected = true;
            }
            this.txtIDCard.Text = model.IDCard;
            this.txtNationality.Text = model.Nationality;
            this.txtAddr.Text = model.Addr;
            this.txtMobile.Text = model.Mobile;
            this.txtTel.Text = model.Tel;
            this.txtEmail.Text = model.Email;
            this.txtFax.Text = model.Fax;

        }


        protected void btnCancel_Click(object sender, EventArgs e)
        {

        }

        protected void btn_IsLockOut_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(txtUserName.Text);
            if (user.UnlockUser())
            {
                btn_IsLockOut.Text = "未锁定";
                btn_IsLockOut.Enabled = false;
                btnLock.Enabled = true;
            }

        }

        protected void btn_SecUpdate_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(txtUserName.Text);
            try
            {
                if (user.ChangePassword(txt_OldPassword.Text, txt_NewPassword.Text))
                {
                    lbl_Tips.Text = "成功：密码修改成功!";
                }
                else
                {
                    lbl_Tips.Text = "错误：原密码错误，请重新输入";
                }
            }
            catch (Exception ex)
            {
                lbl_Tips.Text = ex.Message;
            }
        }

        protected void btn_GenPassword_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(txtUserName.Text);
            try
            {
                lbl_GenPassword.Text = user.ResetPassword(txt_PasswordAnswer.Text);
            }
            catch (Exception ex)
            {
                lbl_Tips.Text = ex.Message;
            }
        }

        protected void btn_UpdateQA_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(txtUserName.Text);

            try
            {
                if (user.ChangePasswordQuestionAndAnswer(txt_OldPassword.Text, txt_PasswordQuestion.Text, txt_PasswordAnswer.Text))
                {
                    lbl_Tips.Text = "成功：修改问题和答案成功！";
                }
                else
                {
                    lbl_Tips.Text = "错误：请检查原密码是否正确";
                }
            }
            catch (Exception ex)
            {
                lbl_Tips.Text = ex.Message;
            }
        }

        protected void btn_ForceResetPwd_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(txtUserName.Text);
            //从Web.config读取配置
            user.UnlockUser();
            string oldPass = user.ResetPassword();
            string newPass = txt_ForceNewPassword.Text.ToString().Trim();
            if (newPass.Length < 6)
            {
                MessageBox.Show(this, "密码必须>=6位");
                return;
            }
            user.ChangePassword(oldPass, newPass);
            lbl_Tips.Text = "强制修改密码成功！";

        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (txtDeptID.Value != null)
            {
                txtDeptName.Text = EmcCommon.getDeptNameByID(Common.Common.stringToInt(txtDeptID.Value));
            }
            string mode = HF_Mode.Value;
            string strErr = "";

            strErr = this.checkform();


            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            Model.Pub_EmpInfo model = this.SetModelValue();
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            if (mode == "add")
            {
                bll.Add(model);
            }

            if (mode == "update")
            {
                bll.Update(model);

            }
            Lbl_Message.Text = "更新成功!!!";
        }


        private Model.Pub_EmpInfo SetModelValue()
        {
            string UserID = HF_UserID.Value;


            string UserName = this.txtUserName.Text;
            string CnName = this.txtCnName.Text;
            string EnName = this.txtEnName.Text;
            string DeptID = this.txtDeptID.Value;
            string EmpID = this.txtEmpID.Text;
            string DeptName = this.txtDeptName.Text;
            string PositionsID = this.txtPositionsID.Value;
            string Positions = this.txtPositions.Text;
            string Sex = this.txtSex.SelectedValue;
            string IDCard = this.txtIDCard.Text;
            string Nationality = this.txtNationality.Text;
            string Addr = this.txtAddr.Text;
            string Mobile = this.txtMobile.Text;
            string Tel = this.txtTel.Text;
            string Email = this.txtEmail.Text;
            string Fax = this.txtFax.Text;
            Model.Pub_EmpInfo model = new Model.Pub_EmpInfo();
            model.UserID = new Guid(UserID);
            model.UserName = UserName;
            model.CnName = CnName;
            model.EnName = EnName;
            model.EmpID = EmpID;
            // model.DeptID = Common.Common.stringToInt(DeptID);
            //model.DeptName = DeptName;
            model.PositionsID = PositionsID;
            model.Positions = Positions;
            model.Sex = Sex;
            model.IDCard = IDCard;
            model.Nationality = Nationality;
            model.Addr = Addr;
            model.Mobile = Mobile;
            model.Tel = Tel;
            model.Email = Email;
            model.Fax = Fax;
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtUserName.Text == "")
            {
                strErr += "用户名不能为空！\\n";
            }
            if (this.txtCnName.Text == "")
            {
                strErr += "姓名不能为空！\\n";
            }

            if (this.txtDeptName.Text == "")
            {
                strErr += "部门不能为空！\\n";
            }
            return strErr;
        }

        protected void btnUpdateUserName_Click(object sender, EventArgs e)
        {
            string NewUserName = txtNewUserName.Text;
            string UserName = txtOldUserName.Text;
            if (NewUserName == "")
            {

                MessageBox.Show(this, "新用户名不能为空!");
                return;
            }
            //NewUserName = NewUserName.Replace("'", "");
            BLL.Pub_EmpInfo bll = new SfSoft.BLL.Pub_EmpInfo();
            string strSql = " select UserName from Pub_EmpInfo where UserName='" + NewUserName + "'";
            DataSet ds = DbHelperSQL.Query(strSql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                MessageBox.Show(this, "新用户名已经存在!");
                return;
            }
            StringBuilder strSql1 = new StringBuilder();
            strSql1.Append("update Pub_EmpInfo set ");
            strSql1.Append("UserName=@NewUserName");
            strSql1.Append(" where UserName=@UserName");
            SqlParameter[] parameters = {
	   			    new SqlParameter("@UserName", SqlDbType.NVarChar,255),
					new SqlParameter("@NewUserName", SqlDbType.NVarChar,255)
                      };
            parameters[0].Value = UserName;
            parameters[1].Value = NewUserName;
            DbHelperSQL.ExecuteSql(strSql1.ToString(), parameters);

            StringBuilder strSql2 = new StringBuilder();
            strSql2.Append("update aspnet_Users set ");
            strSql2.Append("UserName=@NewUserName,LoweredUserName=@NewUserName");
            strSql2.Append(" where UserName=@UserName");
            SqlParameter[] parameters2 = {
	   			    new SqlParameter("@UserName", SqlDbType.NVarChar,255),
					new SqlParameter("@NewUserName", SqlDbType.NVarChar,255)
                      };
            parameters2[0].Value = UserName;
            parameters2[1].Value = NewUserName;
            DbHelperSQL.ExecuteSql(strSql2.ToString(), parameters2);
            lblUpuserInfo.Text = "用户名更新成功!";
        }

        protected void btnLock_Click(object sender, EventArgs e)
        {

            string UserID = HF_UserID.Value;
            //string strSql = "update aspnet_Membership set IsLockedOut='true' where UserID='" + UserID + "'";
            //DBUtility.DbHelperSQL.ExecuteSql(strSql);
            EmcCommon.LockUserLogin(UserID, "true");
            btnLock.Enabled = false;
            btn_IsLockOut.Enabled = true;
            btn_IsLockOut.Text = "解除用户锁定";
        }


        //初始化角色
        protected void GetBySelectRolesListBox()
        {

            string strWhere = "  RoleId in (select RoleId from Pub_Roles_Company where FilialeID='" + Session["FilialeID"].ToString() + "')";
            DataTable dtNodeSets = bllasproles.GetList(strWhere).Tables[0];
            lbBySelectRoles.DataSource = dtNodeSets;
            lbBySelectRoles.DataTextField = "RoleName";
            lbBySelectRoles.DataValueField = "RoleId";
            lbBySelectRoles.DataBind();
        }

        //初始化已有角色
        protected void GetRolesListBox()
        {

            string strWhere = "  RoleId in (select RoleId from aspnet_UsersInRoles where UserID='" + HF_UserID.Value + "') ";
            strWhere += " and  RoleId in (select RoleId from Pub_Roles_Company where FilialeID='" + Session["FilialeID"].ToString() + "') ";
            DataTable dtNodeSets = bllasproles.GetList(strWhere).Tables[0];
            lbRoles.DataSource = dtNodeSets;
            lbRoles.DataTextField = "RoleName";
            lbRoles.DataValueField = "RoleId";
            lbRoles.DataBind();
        }

        protected void btnAddRoles_Click(object sender, EventArgs e)
        {

            if (lbBySelectRoles.SelectedItem == null)
            {
                MessageBox.Show(this, "没有选择要增加的角色！");
            }
            else
            {
                if (lbRoles.Items.FindByValue(lbBySelectRoles.SelectedItem.Value) == null)
                {
                    lbRoles.Items.Add(lbBySelectRoles.SelectedItem);
                    Roles.AddUserToRole(txtUserName.Text, lbBySelectRoles.SelectedItem.Text);
                    lbBySelectRoles.SelectedItem.Selected = false;
                    GetRolesTreeView();
                }
            }
        }

        protected void btnDelRoles_Click(object sender, EventArgs e)
        {
            if (lbRoles.SelectedItem == null)
            {
                MessageBox.Show(this, "没有选择要移除的角色！");
            }
            else
            {
                Roles.RemoveUserFromRole(txtUserName.Text, lbRoles.SelectedItem.Text);
                lbRoles.Items.Remove(lbRoles.SelectedItem);
                GetRolesTreeView();
            }
        }

        protected void btnAddRolesAll_Click(object sender, EventArgs e)
        {
            foreach (ListItem li in lbBySelectRoles.Items)
            {
                if (lbRoles.Items.FindByValue(li.Value) == null)
                {
                    lbRoles.Items.Add(li);
                    Roles.AddUserToRole(txtUserName.Text, li.Text);
                }
            }
            GetRolesTreeView();
            //GetRolesListBox();
        }

        protected void btnDelRolesAll_Click(object sender, EventArgs e)
        {
            foreach (ListItem li in lbRoles.Items)
            {
                Roles.RemoveUserFromRole(txtUserName.Text, li.Text);
                //  lbRoles.Items.Remove(li);
            }
            lbRoles.Items.Clear();
            GetRolesTreeView();
            //GetRolesListBox();
        }

    }
}


