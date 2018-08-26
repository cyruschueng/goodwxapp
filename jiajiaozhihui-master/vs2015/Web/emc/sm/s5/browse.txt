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
using System.Text;
using System.Collections.Generic;
using System.Data.Common;
using sbSoft.BSSoftLock;
using SfSoft.DBUtility;
using System.Data.SqlClient;
using SfSoft.web.emc.common;
using log4net;
using SfSoft.SfEmc;
namespace SfSoft.web.emc.sm.s5
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage 
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(browse));
        //MsgTools msgTools = new MsgTools();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {


                //取公司数据到deptgridview
                DeptBindData("");

                BLL.Pub_Company bllCom = new BLL.Pub_Company();
                Model.Pub_Company model = new Model.Pub_Company();
                model = bllCom.GetModel("01");
                if (model != null)
                {
                    this.txtCompanyName.Text = model.CompanyName;
                    this.txtCompanyName_e.Text = model.CompanyName_e;
                    this.txtEmail.Text = model.Email;
                    this.txtAddr.Text = model.Addr;
                    this.txtPhone.Text = model.Phone;
                    this.txtFax.Text = model.Fax;
                    this.lblID.Text = model.ID;
                    this.hfLogo.Value = model.Logo;
                    if (model.Logo != "")
                    {
                        ImageLogo.Visible = true;
                        ImageLogo.ImageUrl = Common.Common.UpLoadDir + "company/" + model.Logo;
                    }
                }

                //统计可用公司数
                CountCompanyNum();
                
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s5";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s5.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {
            string strErr = "";

            strErr = this.checkform();


            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            string CompanyName = this.txtCompanyName.Text;
            string CompanyName_e = this.txtCompanyName_e.Text;
            string hfLogo = this.hfLogo.Value;
            string Email = this.txtEmail.Text;
            string Addr = this.txtAddr.Text;
            string Phone = this.txtPhone.Text;
            string Fax = this.txtFax.Text;

            string GetC_PhotoName = UpPhoto();
            if (GetC_PhotoName != "")
            {
              SfSoft .Common .FileUpLoadCommon.DeleteFile(string.Format("{0}{1}{2}", Common.Common.UpLoadDir, "company/", hfLogo));
              SfSoft.Common.FileUpLoadCommon.DeleteFile(string.Format("{0}{1}s_{2}", Common.Common.UpLoadDir, "company/", hfLogo));
                hfLogo = GetC_PhotoName;
            }
            Model.Pub_Company model = new Model.Pub_Company();
            model.CompanyName = CompanyName;
            model.CompanyName_e = CompanyName_e;
            model.Logo = hfLogo;
            model.Email = Email;
            model.Addr = Addr;
            model.Phone = Phone;
            model.Fax = Fax;
            model.ID = lblID.Text;
            BLL.Pub_Company bll = new BLL.Pub_Company();
            bll.Update(model);

            LblMessage.Text = "更新成功";
        }
        private string checkform()
        {
            /*修改代码-提交更新 */

            string strErr = "";
            if (this.txtCompanyName.Text == "")
            {
                strErr += "公司名称不能为空！\\n";
            }

            return strErr;
        }


        private string UpPhoto()
        {
          string   newfname = Common.FileUpLoadCommon.UpFile("company/", txtLogo);

            //SfSoft.Common.FileUpLoadCommon fc = new SfSoft.Common.FileUpLoadCommon(Common.Common.UpLoadDir + "company/", false);
            //fc.SaveFile(txtLogo, true);
          return newfname;// fc.newFileName;
        }


        //子公司信息管理 
        protected void LinkButtonClick(object sender, CommandEventArgs e)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            //修改部门信息
            if (e.CommandName.Equals("UpdateDept"))
            {
                Panel1.Visible = true;
                

                string DeptID = e.CommandArgument.ToString();
                hfDeptID.Value = DeptID;
                hfMode.Value = "UpdateDept";
                txtDeptNo.Visible = true;
                DeptIDDropDownList.Visible = false;
                btnSetAdmin.Visible = true;
                Model.Pub_Dept modelDept = new Model.Pub_Dept();
                modelDept = bllDept.GetModel(Common.Common.stringToInt(DeptID));
                if (modelDept != null)
                {
                    txtDeptNo.Text = modelDept.DeptNo;
                    txtDeptName.Text = modelDept.DeptName;
                    string IsFiliale = modelDept.IsFiliale;

                    rblIsFiliale.ClearSelection();
                    rblIsFiliale.Items.FindByValue(IsFiliale.Trim()).Selected = true;

                }
                ShowDropDownList("0", "00");
                PanelJob.Visible = true;
                PanelEmail.Visible = true;
                PanelSms.Visible = true;
                ShowJobTime(DeptID);
            }

            //删除部门信息
            if (e.CommandName.Equals("DeleteDept"))
            {
                //删除部门信息
                Panel1.Visible = false;

                string DeptID = e.CommandArgument.ToString();
                string strWhere = " ParentID = '" + DeptID + "'";
                DataSet dsDept = bllDept.GetList(strWhere);
                if (dsDept.Tables[0].Rows.Count > 0)
                {
                    MessageBox.Show(this, "还有下一级部门，先删除下级部门！！！");

                    return;
                }
                bllDept.Delete(Common.Common.stringToInt(DeptID));
                BLL.Pub_SysParameter bllpsp = new SfSoft.BLL.Pub_SysParameter();
                bllpsp.Delete(DeptID);

                //统计可用公司数
                CountCompanyNum();
                PanelJob.Visible = false;
                PanelEmail.Visible = false;
                PanelSms.Visible = false;
            }
            DeptBindData("");


        }
        //取公司/子部门数据
        private void DeptBindData(string strWhere)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            string strWhere1 = " IsFiliale < '2'";
            DataSet deptds = bllDept.GetList(strWhere1);
            DeptGridView.DataSource = deptds;
            DeptGridView.DataBind();
        }
        protected void DeptGridView_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

                if (e.Row.Cells[3].Text.Trim() == "0")
                {
                    e.Row.Cells[3].Text = "公司总部";
                }
                else if (e.Row.Cells[3].Text.Trim() == "1")
                {
                    e.Row.Cells[3].Text = "子公司";
                }
            }
        }
        private void ShowDropDownList(string ParentID, string ParentNo)
        {
            ListItem liDeptID1 = new ListItem();
            liDeptID1.Value = "";
            liDeptID1.Text = "选择可用编码";
            DeptIDDropDownList.Items.Add(liDeptID1);

            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            string strWhere = " ParentID = '" + ParentID + "'";
            DataSet dsDept = bllDept.GetList(strWhere);
            for (int i = 1; i <= 99; i++)
            {
                string tempID = "";
                if (i < 10)
                {
                    tempID = "0" + i.ToString();
                }
                else
                {
                    tempID = i.ToString();
                }
                Boolean bl = true;
                if (dsDept != null)
                {
                    DataView dvDept = new DataView(dsDept.Tables[0]);
                    if (dvDept != null)
                    {
                        dvDept.RowFilter = "[DeptNo]='" + ParentNo + tempID + "'";
                        if (dvDept.Count > 0)
                        {

                            bl = false;
                        }
                    }
                }
                if (bl)
                {
                    ListItem liDeptID = new ListItem();
                    liDeptID.Value = ParentNo + tempID;
                    liDeptID.Text = ParentNo + tempID;
                    DeptIDDropDownList.Items.Add(liDeptID);
                }
            }

        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            Model.Pub_Dept modelDept = new Model.Pub_Dept();
            if (hfMode.Value == "UpdateDept")
            {
                string DeptID = hfDeptID.Value;
                if (DeptID != null)
                {
                    if (this.rblIsFiliale.SelectedValue == "0")
                    {
                        string strWhere2 = " IsFiliale='0' and DeptID <>'" + DeptID + "'";
                        DataSet dsdeptck = bllDept.GetList(strWhere2);
                        if (dsdeptck != null)
                        {
                            if (dsdeptck.Tables[0].Rows.Count > 0)
                            {
                                MessageBox.Show(this, "已经有一个公司设为总部，不能设置两个总部");
                                return;
                            }
                        }
                    }
                    modelDept = bllDept.GetModel(Common.Common.stringToInt(DeptID));
                    if (modelDept != null)
                    {
                        modelDept.DeptName = txtDeptName.Text;
                        modelDept.IsFiliale = this.rblIsFiliale.SelectedValue;
                        modelDept.DeptID = Common.Common.stringToInt(DeptID);
                        bllDept.Update(modelDept);
                    }
                }
                else
                {
                    return;
                }
            }
            if (hfMode.Value == "NewDept")
            {
                string strErr = "";
                if (this.txtDeptNo.Text == "")
                {
                    strErr += "公司编码不能为空！\\n";
                }
                if (this.txtDeptName.Text == "")
                {
                    strErr += "公司名称不能为空！\\n";
                }
                modelDept.DeptName = txtDeptName.Text;
                modelDept.IsFiliale = rblIsFiliale.SelectedValue;
                modelDept.DeptNo = DeptIDDropDownList.SelectedValue;
                modelDept.ParentID = 0;
                int DID = bllDept.Add(modelDept);
                //更新公司ID，当新建子公司时部门ID=公司ID
                modelDept.DeptID = DID;
                modelDept.FilialeID = DID.ToString();
                modelDept.DelFlag = "N";
                bllDept.Update(modelDept);

                hfMode.Value = "UpdateDept";
                DeptIDDropDownList.Visible = false;
                txtDeptNo.Visible = true;
                Panel1.Visible = false;
                //统计可用公司数
                CountCompanyNum();
            }
            DeptBindData("");
        }

        protected void btnNew_Click(object sender, EventArgs e)
        {
            hfMode.Value = "NewDept";
            //显示增加面板
            Panel1.Visible = true;
            PanelJob.Visible = false;
            PanelEmail.Visible = false;
            PanelSms.Visible = false;
            txtDeptNo.Visible = false;
            DeptIDDropDownList.Visible = true;
            txtDeptName.Text = "";
            rblIsFiliale.Items[1].Selected = true;
            btnSetAdmin.Visible = false;
            ShowDropDownList("0", "00");
           
        }

        private void CountCompanyNum()
        {
            //取的可以设置的公司数
            string CompanyNum = bsSoftLock.GetAllowAccounts().ToString();
            if (CompanyNum == "")
            {
                CompanyNum = "1";
            }
            //已建公司数
            int Cnum = 0;
            //可建公司数
            int Bnum = 0;
            LblCompanyNum.Text = CompanyNum;
            //取的已用公司数
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            string strWhere = " IsFiliale < '2'";
            DataSet deptds = bllDept.GetList(strWhere);
            if (deptds != null)
            {

                Cnum = deptds.Tables[0].Rows.Count;
            }
            Bnum = int.Parse(CompanyNum) - Cnum;
            LblCNum.Text = Cnum.ToString();
            LblBNum.Text = Bnum.ToString();
            //如果未建公司数<1，那么将不能新建公司。
            if (Bnum < 1)
            {
                btnNew.Visible = false;
            }
            else
            {
                btnNew.Visible = true;
            }
        }

        protected void btnSetAdmin_Click(object sender, EventArgs e)
        {
            string CompanyID = hfDeptID.Value;
            string CompanyName = txtDeptName.Text;
            string AdminUserName = "admin" + CompanyID;
            string AdminCnName = "管理员" + CompanyID;
            //string AppId = "6059c7e4-254d-4729-913b-42e2bdd199cb";
            string RoleName = txtDeptName.Text + "管理员";
            // Guid RoID1 = Guid.NewGuid();
            string RoID = Guid.NewGuid().ToString();
            //Guid UserID1 = Guid.NewGuid();
            string UserID = Guid.NewGuid().ToString();
            int Uid = 0;
            // MessageBox.Show(this, UserID);

            SqlParameter[] parameters0 = {
					new SqlParameter("@RoleName", SqlDbType.NVarChar,40)
            };
            parameters0[0].Value = RoleName;

            //是否存存在管理员
            Model.Pub_EmpInfo model = new SfSoft.Model.Pub_EmpInfo();
            BLL.Pub_EmpInfo bll = new SfSoft.BLL.Pub_EmpInfo();
            model = bll.GetModel(AdminUserName);

            //删除已有帐号信息
            Hashtable hashdel = new Hashtable();
            string del5 = "delete aspnet_UsersInRoles where RoleId  in (select RoleId from aspnet_Roles where RoleName=@RoleName)";
            string del6 = "delete Pub_Roles_Company where RoleId in ( select RoleId from aspnet_Roles where RoleName=@RoleName)";
            string del7 = "delete Pub_Roles_Fun where RolesID in ( select RoleId from aspnet_Roles where RoleName=@RoleName)";
            string del8 = "delete aspnet_Roles where RoleName=@RoleName";
            hashdel.Add(del5, parameters0);
            hashdel.Add(del6, parameters0);
            hashdel.Add(del7, parameters0);
            hashdel.Add(del8, parameters0);
            DbHelperSQL.ExecuteSqlTran(hashdel);
            //重新初始化
            Hashtable hashadd = new Hashtable();

            if (model == null)
            {
                string UserName = AdminUserName;
                string passwordQuestion = AdminUserName;
                string passwordAnswer = AdminUserName + "1";
                string Password = "111111";
                string Email = UserName + "@sanbaotech.com";

                MembershipCreateStatus status;

                MembershipUser newUser = Membership.CreateUser(UserName, Password,
                                Email, passwordQuestion,
                                passwordAnswer, true, out status);
                if (newUser == null)
                {
                    return;
                }
                else
                {
                    UserID = newUser.ProviderUserKey.ToString();
                }



                Model.Pub_EmpInfo model1 = new SfSoft.Model.Pub_EmpInfo();
                model1.UserID = new Guid(UserID);
                model1.UserName = AdminUserName;
                model1.CnName = AdminCnName;
                model1.Positions = "网管";
                model1.PositionsID = "网管";
                model1.ZZState = "在职";
                model1.DGDate = DateTime.Now;
                Uid = bll.Add(model1);
            }
            else
            {
                Uid = model.ID;
                UserID = model.UserID.ToString();
            }
            string add1 = "insert Pub_DeptUsers(DeptID,UserID,FilialeID,UserDeptKind) values(@CompanyID,@Uid,@CompanyID,'1')";
            SqlParameter[] parameters1 = {
					new SqlParameter("@CompanyID", SqlDbType.Int,4),
            new SqlParameter("@Uid", SqlDbType.Int,4)
            };
            parameters1[0].Value = int.Parse(CompanyID);
            parameters1[1].Value = Uid;

            //插入人员帐号
            /*
            string add2 = "INSERT [aspnet_Users] ([ApplicationId],[UserId],[UserName],[LoweredUserName],[IsAnonymous],[LastActivityDate]) VALUES( @AppId,@UserID,@AdminUserName,@AdminUserName,0,'2008-9-7 23:27:18') ";

            SqlParameter[] parameters2 = {
					new SqlParameter("@AppId", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@UserID", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@AdminUserName", SqlDbType.NVarChar,40)
  
            };
            parameters2[0].Value = new Guid(AppId);
            parameters2[1].Value = new Guid(UserID);
            parameters2[2].Value = AdminUserName;

            string add3 = "INSERT [aspnet_Membership] ([ApplicationId],[UserId],[Password],[PasswordFormat],[PasswordSalt],";
            add3 += "[IsApproved],[IsLockedOut],[CreateDate],[LastLoginDate],[LastPasswordChangedDate],";
            add3 += "[LastLockoutDate],[FailedPasswordAttemptCount],[FailedPasswordAttemptWindowStart],";
            add3 += "[FailedPasswordAnswerAttemptCount],[FailedPasswordAnswerAttemptWindowStart]) ";
            add3 += " VALUES ( @AppId,@UserID,'skONgN6YXRFleSLsKZSHTZyU6t8=',1,'1caS4yZIy4bGkk5znyiAvw==',1,0,'2008-8-6 9:37:04','2008-8-15 4:36:39','2008-8-14 1:08:14','1754-1-1 0:00:00',0,'1754-1-1 0:00:00',0,'1754-1-1 0:00:00')";
            SqlParameter[] parameters3 = {
					new SqlParameter("@AppId", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@UserID", SqlDbType.UniqueIdentifier,16) 
            };
            parameters3[0].Value = new Guid(AppId);
            parameters3[1].Value = new Guid(UserID);
            */
            /*
            //建立管理员角色
            string add4 = "INSERT [aspnet_Roles] ([ApplicationId],[RoleId],[RoleName],[LoweredRoleName])";
            add4 += " VALUES ( @AppId,@RoID,@RoleName,@RoleName)";
            SqlParameter[] parameters4 = {
					new SqlParameter("@AppId", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@RoID", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@RoleName", SqlDbType.NVarChar ,160)
            };
            parameters4[0].Value = new Guid(AppId);
            parameters4[1].Value = new Guid(RoID);
            parameters4[2].Value = CompanyName + "管理员";
           
                   //人员角色关系
            string add8 = "insert aspnet_UsersInRoles(UserID,RoleID) values(@UserID,@RoID)";
            SqlParameter[] parameters8 = {
					new SqlParameter("@UserID", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@RoID", SqlDbType.UniqueIdentifier,4)
 
            };
            parameters8[0].Value = new Guid(UserID);
            parameters8[1].Value = new Guid(RoID);
              */

            if (!Roles.RoleExists(RoleName))
            {
                Roles.CreateRole(RoleName);
                //取的RoleID
                Roles.AddUserToRole(AdminUserName, RoleName);
            }

            BLL.aspnet_Roles bllrl = new BLL.aspnet_Roles();
            string strWhere3 = " RoleName = '" + RoleName + "'";
            DataSet dsrl = bllrl.GetList(strWhere3);
            if (dsrl != null)
            {
                RoID = dsrl.Tables[0].Rows[0]["RoleId"].ToString();
            }

            //角色公司关联
            string add5 = "insert Pub_Roles_Company(RoleID,FilialeID) values(@RoID,@CompanyID)";
            SqlParameter[] parameters5 = {
					new SqlParameter("@RoID", SqlDbType.UniqueIdentifier,16),
              new SqlParameter("@CompanyID", SqlDbType.Int,4)
 
            };
            parameters5[0].Value = new Guid(RoID);
            parameters5[1].Value = int.Parse(CompanyID);

            //初始化管理员角色值
            string add6 = "insert  into Pub_Roles_Fun select @RoID,FunID from Pub_Modules_Fun where FunType='module' and isAcl='1' and ModulesID<>'emc.sm.s6'";
            SqlParameter[] parameters6 = {
					new SqlParameter("@RoID", SqlDbType.UniqueIdentifier,16)
            };
            parameters6[0].Value = new Guid(RoID);

            string add7 = "insert  into Pub_Roles_Fun select @RoID,ModulesID from Pub_Modules  where ModulesID<>'emc.sm.s6'";
            SqlParameter[] parameters7 = {
					new SqlParameter("@RoID", SqlDbType.UniqueIdentifier,16)
            };
            parameters7[0].Value = new Guid(RoID);

            //hashadd.Add(add4, parameters4);
            hashadd.Add(add5, parameters5);
            hashadd.Add(add6, parameters6);
            hashadd.Add(add7, parameters7);
            if (model == null)
            {
                hashadd.Add(add1, parameters1);
                // hashadd.Add(add8, parameters8);
            }

            DbHelperSQL.ExecuteSqlTran(hashadd);
            lblAdmin.Text = "初始化成功";
        }

        protected void btnSaveJobTime_Click(object sender, EventArgs e)
        {
            string FilialeID = hfDeptID.Value;
            string strErr = "";
            if (FilialeID == "")
            {
                strErr += "没有选择公司！";
            }
            if (sender == btnSaveJobTime)
            {

                string SysStartTimeAm = txtSysStartTimeAm.Text;
                string SysEndTimeAm = txtSysEndTimeAm.Text;
                string SysStartTimePm = txtSysStartTimePm.Text;
                string SysEndTimePm = txtSysEndTimePm.Text;
                if (SysStartTimeAm.Length != 5 || SysStartTimeAm.IndexOf(":") < 0)
                {
                    strErr += "上午上班时间格式有错！";
                }
                if (SysEndTimeAm.Length != 5 || SysEndTimeAm.IndexOf(":") < 0)
                {
                    strErr += "上午下班时间格式有错！";
                }
                if (SysStartTimePm.Length != 5 || SysStartTimePm.IndexOf(":") < 0)
                {
                    strErr += "下午上班时间格式有错！";
                }
                if (SysEndTimePm.Length != 5 || SysEndTimePm.IndexOf(":") < 0)
                {
                    strErr += "下午下班时间格式有错！";
                }
                if (strErr != "")
                {
                    MessageBox.Show(this, strErr);
                    return;
                }
            }
            BLL.Pub_SysParameter bll = new SfSoft.BLL.Pub_SysParameter();
            Model.Pub_SysParameter model = new SfSoft.Model.Pub_SysParameter();
            model = bll.GetModel(FilialeID);
           
            if (model != null)
            {
                model = SetModuleValue(model,sender );
                bll.Update(model);
            }
            else
            {
                model = new SfSoft.Model.Pub_SysParameter();
                model = SetModuleValue(model,sender );
                model.FilialeID = FilialeID;
                bll.Add(model);
            }
            if (sender ==btnSms ) 
            {

                GetSmsInfo();
            }
        }
        void GetSmsInfo()
        {
            string ServerCon = "";
            try
            {
                //Hashtable hashSmsInfo = msgTools.SMS_GetUserInfo(Session["FilialeID"].ToString());
                //string connflag = msgTools.GetSmsConn(hashSmsInfo["0"].ToString());//联接状态
                //ServerCon = "短信服务联接：" + connflag;//提示信息
                //if (hashSmsInfo["0"].ToString().Substring(0, 1) != "-1")
                //{
                //    txtSmsBalance.Text = hashSmsInfo["2"].ToString()+"元";
                //    txtSMSPrice.Text = hashSmsInfo["3"].ToString() + "元/条";
                //    txtFAXPrice.Text = hashSmsInfo["7"].ToString() + "元/分钟";
                //}
                //lblSms.Text = ServerCon;
            }
            catch (Exception ee)
            {
                ServerCon  = "短信服务联接失败，请检查有没有联通互联网！";
                lblSms.Text = ServerCon;
                log.Debug(ServerCon);
                log.Debug(ee.Message);
            }

        }

        private Model.Pub_SysParameter SetModuleValue(Model.Pub_SysParameter model,object sender)
        {
            if (sender == btnSaveJobTime)
            {
                string SysStartTimeAm = txtSysStartTimeAm.Text;
                string SysEndTimeAm = txtSysEndTimeAm.Text;
                string SysStartTimePm = txtSysStartTimePm.Text;
                string SysEndTimePm = txtSysEndTimePm.Text;
                string SysWeekRest0 = "-2";
                string SysWeekRest6 = "-2";
                string SysDaySiesta = txtSysDaySiesta.Text;
                string SysTotalHours = txtSysTotalHours.Text;
                string CheckInEndDay = txtCheckInEndDay.Text;
                if (cbSysWeekRest0.Checked)
                {
                    SysWeekRest0 = "0";
                }
                if (cbSysWeekRest6.Checked)
                {
                    SysWeekRest6 = "6";
                }
                if (SysDaySiesta == "")
                {
                    SysDaySiesta = "2";
                }
                if (SysTotalHours == "")
                {
                    SysTotalHours = "8";
                }
                if (CheckInEndDay == "")
                {
                    CheckInEndDay = "0";
                }
                model.SetDate = DateTime.Now;
                model.SysStartTimeAm = SysStartTimeAm;
                model.SysEndTimeAm = SysEndTimeAm;
                model.SysStartTimePm = SysStartTimePm;
                model.SysEndTimePm = SysEndTimePm;
                model.SysWeekRest0 = SysWeekRest0;
                model.SysWeekRest6 = SysWeekRest6;
                model.SysDaySiesta = PageValidate.StringToDecimal(SysDaySiesta);
                model.SysTotalHours = PageValidate.StringToDecimal(SysTotalHours);
                model.CheckInEndDay = PageValidate.StringToInt(CheckInEndDay);
                lblJobTime.Text = "更新成功!";
            }
            else if (sender == btnEmail)
            {
                model.EMail = txtPopEmail.Text;
                
                model.Pop3Port = txtPop3Port.Text;
                model.Pop3Server = txtPop3Server.Text;
                string EmailPassword = txtEmailPassword.Text;
                if (EmailPassword!="" && EmailPassword.IndexOf("*") < 0)
                {

                    model.EmailPassword = DESEncrypt.Encrypt(txtEmailPassword.Text); 
                }
            }
            else if (sender == btnSms)
            {
                 
               // model.SMSPrice = PageValidate.StringToDecimal(txtSMSPrice.Text);
                model.SMSServer = txtSMSServer.Text;
                model.SMSUserName = txtSMSUserName.Text;
              //  model.FAXPrice = PageValidate.StringToDecimal(txtFAXPrice.Text);
                string SMSPassword = txtSMSPassword.Text;
                if (SMSPassword!="" && SMSPassword.IndexOf("*") < 0)
                {
                    model.SMSPassword = DESEncrypt.Encrypt(txtSMSPassword.Text);
                }
              
            }
            return model;
        }

        private void ShowJobTime(string FilialeID)
        {

            BLL.Pub_SysParameter bll = new SfSoft.BLL.Pub_SysParameter();
            Model.Pub_SysParameter model = new SfSoft.Model.Pub_SysParameter();
            model = bll.GetModel(FilialeID);

            if (model != null)
            {
                txtSysStartTimeAm.Text = model.SysStartTimeAm;
                txtSysEndTimeAm.Text = model.SysEndTimeAm;
                txtSysStartTimePm.Text = model.SysStartTimePm;
                txtSysEndTimePm.Text = model.SysEndTimePm;
                txtCheckInEndDay.Text = model.CheckInEndDay.ToString();
                txtSysDaySiesta.Text = model.SysDaySiesta.ToString();
                txtSysTotalHours.Text = model.SysTotalHours.ToString();
                if (model.SysWeekRest0 == "0")
                {
                    cbSysWeekRest0.Checked = true;
                }
                if (model.SysWeekRest6 == "6")
                {
                    cbSysWeekRest6.Checked = true;
                }
                txtPopEmail.Text = model.EMail;
                txtPop3Port.Text = model.Pop3Port;
                txtPop3Server.Text = model.Pop3Server;
               
                string EmailPassword1 = "";
                if (model.EmailPassword != null && model.EmailPassword != "")
                {
                    string EmailPassword = DESEncrypt.Decrypt(model.EmailPassword);
                    for (int i = 0; i < EmailPassword.Length; i++)
                    {
                        EmailPassword1 += "*";
                    }
                }
                txtEmailPassword.Text = EmailPassword1;
              

                txtSMSUserName.Text = model.SMSUserName;
                txtSMSServer.Text = model.SMSServer;
                //txtSMSPrice.Text = model.SMSPrice.ToString();
               // txtFAXPrice.Text = model.FAXPrice.ToString();


               
                string SMSPassword1 = "";
                if (model.SMSPassword != null && model.SMSPassword != "")
                {
                    string SMSPassword = DESEncrypt.Decrypt(model.SMSPassword);
                    for (int i = 0; i < SMSPassword.Length; i++)
                    {
                        SMSPassword1 += "*";
                    }
                }
                txtSMSPassword.Text = SMSPassword1;
                if (txtSMSUserName.Text != "")
                {
                    GetSmsInfo();
                }
            }
            else
            {
                txtSysStartTimeAm.Text = "";
                txtSysEndTimeAm.Text = "";
                txtSysStartTimePm.Text = "";
                txtSysEndTimePm.Text = "";
                cbSysWeekRest0.Checked = false ;
                cbSysWeekRest6.Checked = false;
                txtSysDaySiesta.Text = "";
                txtSysTotalHours.Text = "";
                txtPopEmail.Text = "";
                txtPop3Port.Text = "110";
                txtPop3Server.Text = "";
                txtEmailPassword.Text = "";
                txtSMSUserName.Text = "";
                txtSMSServer.Text = "";
                txtSMSPrice.Text = "";
                txtFAXPrice.Text = "";
                txtSMSPassword.Text = "";
                txtCheckInEndDay.Text = "";
            }
        }
    }
}


