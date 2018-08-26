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
namespace SfSoft.web.emc.hrm.arc
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage 
    {

        protected void Page_Init(object sender, EventArgs e)
        {
            base.Page_Init(sender, e);
            this.CreateHoliday();
        }
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                //获得UserName
                if (Request.QueryString["UserName"] != null)
                {
                    hfUserName.Value = Request.QueryString["UserName"].Trim();
                }
                #region 读取详细信息和联系方式



                //取的基础数据
                BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
                string strWhereBd = "RefObj like 'hrm.emp.%' and isAct='1' and FilialeID='" + Session["FilialeID"].ToString() + "'";
                DataSet dsbd = bllbd.GetList(strWhereBd);
                //初始化下拉框
                EmcCommon.SetBaseDataDropDownList(ddlPositions, "hrm.emp.Positions", dsbd);
                EmcCommon.SetBaseDataDropDownList(ddlEnLevel, "hrm.emp.EnLevel", dsbd);
                EmcCommon.SetBaseDataDropDownList(ddlComputerLevel, "hrm.emp.ComputerLevel", dsbd);
                // EmcCommon.SetBaseDataDropDownList(ddlZZState, "hrm.emp.ZZState", dsbd);
                EmcCommon.SetBaseDataDropDownList(ddlPYState, "hrm.emp.PYState", dsbd);
                EmcCommon.SetBaseDataDropDownList(ddlGrade, "hrm.emp.Grade", dsbd);
                EmcCommon.SetBaseDataCheckBoxList(cblHaveDoc, "hrm.emp.HaveDoc", dsbd);
                EmcCommon.GetDeptIDDropDownList(ddlDept, Session["FilialeID"].ToString());
                EmcCommon.SetBaseDataEptDropDownList(ddlCBArea, "emc.hrm.arc.IsSysUser");
                hfMID.Value = "emc.hrm.arc";
                BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
                Model.Pub_EmpInfo modelEmp = bllEmp.GetEmpModel(hfUserName.Value);
                //是否为空
                if (modelEmp != null)
                {
                    this.ShowInfo(modelEmp);

                    HF_Mode.Value = "update";
                    //显示附件信息
                    EmcCommon.ShowFileList(sgvFilelist, HF_UserID.Value, hfMID.Value);
                }
                else
                {
                    txtHolidayYear.Text = DateTime.Now.Year.ToString();
                    HF_Mode.Value = "add";
                    ImagePhoto.ImageUrl = Common.Common.UpLoadDir + "hrmarc/noPhoto.jpg";
                }

              
                #endregion
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.sgvFilelist);
            }
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.hrm.arc";
        }

        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.hrm.arc.browse,emc.hrm.arc.mgt");
        }
        protected override void VtInitOthersToolbars()
        {
            tsbtnSave.Enabled = CheckButtonAccess("emc.hrm.arc.mgt");
        }

        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }

        private void ShowInfo(Model.Pub_EmpInfo model)
        {
            txtUserName.ReadOnly = true;
            Hashtable hashdp = new Hashtable();
            hashdp = EmcCommon.getDeptInfoByUserID(model.ID.ToString(), "");
            string DeptID = "";
            string PostID = "";
            string PostName = "";
            if (hashdp != null)
            {
                DeptID = hashdp["DeptID"].ToString();
                PostID = hashdp["PostID"].ToString();
                PostName = hashdp["PostName"].ToString();
            }
            EmcCommon.SetDropDownListDeptID(ddlDept, DeptID, "");

            HF_UserID.Value = model.ID.ToString();
            this.hfPhoto.Value = model.Photo;
            if (model.Photo != "")
            {

                ImagePhoto.ImageUrl = Common.Common.UpLoadDir + "hrmarc/" + model.Photo;
            }
            else
            {
                ImagePhoto.ImageUrl = Common.Common.UpLoadDir + "hrmarc/noPhoto.jpg";
            }

            this.txtUserName.Text = model.UserName;
            this.txtCnName.Text = model.CnName;
            this.txtEmpID.Text = model.EmpID;
            this.txtEnName.Text = model.EnName;

            string txtSexTemp = model.Sex;
            if (txtSexTemp != null && this.ddlSex.Items.FindByValue(txtSexTemp) != null)
            {
                this.ddlSex.Items.FindByValue(txtSexTemp).Selected = true;
            }


            string PositionsID = model.PositionsID;
            EmcCommon.ShowBaseDataDropDownList(ddlPositions, PostName, PostID); 
            this.txtWorkPlace.Text = model.WorkPlace;
            this.txtTitle.Text = model.Title;
            string Grade = model.Grade;
            EmcCommon.ShowBaseDataDropDownList(ddlGrade, Grade, Grade);

            string PYState = model.PYState;
            EmcCommon.ShowBaseDataDropDownList(ddlPYState, PYState, PYState);

            string ZZState = model.ZZState;
            EmcCommon.ShowBaseDataDropDownList(ddlZZState, ZZState, ZZState);

            string IsSysUser = model.IsSysUser;
            string Account = model.Account;
            txtAccount.Text = Account;
            if (model.IsSysUser == "1")
            {
                ckIsSysUser.Checked = true;
            }
            else
            {
                ckIsSysUser.Checked = false;
            }

            this.txtHeight.Text = model.Height;
            this.txtDGDate.Text = PageValidate.FormatSmallDate(model.DGDate);
            this.txtZZDate.Text = PageValidate.FormatSmallDate(model.ZZDate);
            this.txtTryDays.Text = model.TryDays.ToString();
            this.txtOrderID.Text = model.OrderID.ToString();
            //this.txtPhoto.Text = model.Photo;
            this.txtTel.Text = model.Tel;
            this.txtPhoneExt.Text = model.PhoneExt;
            this.txtEmail.Text = model.Email;
            this.txtMobile.Text = model.Mobile;
            this.txtMSN.Text = model.MSN;
            this.txtQQ.Text = model.QQ;
            this.txtTemAddr.Text = model.TemAddr;
            this.txtTemTel.Text = model.TemTel;
            this.txtAddr.Text = model.Addr;
            this.txtAddrTel.Text = model.AddrTel;
            this.txtOthersContact.Text = model.OthersContact;
            this.txtOthersRel.Text = model.OthersRel;
            this.txtOthersPhone.Text = model.OthersPhone;
            this.txtBirthDay.Text = PageValidate.FormatSmallDate(model.BirthDay);
            string BirthDay = this.txtBirthDay.Text;

            this.txtAge.Text = model.Age.ToString();

            string Sex = model.Sex;
            if (Sex != null && this.ddlSex.Items.FindByValue(Sex) != null)
            {
                this.ddlSex.Items.FindByValue(Sex).Selected = true;
            }
            string Marriage = model.Marriage;
            if (Marriage != null && this.ddlMarriage.Items.FindByValue(Marriage) != null)
            {
                this.ddlMarriage.Items.FindByValue(Marriage).Selected = true;
            }
            this.txtIDCard.Text = model.IDCard;
            this.txtDriveCharter.Text = model.DriveCharter;
            this.txtNationality.Text = model.Nationality;
            this.txtNativePlace.Text = model.NativePlace;
            this.txtNation.Text = model.Nation;
            this.txtHKPlace.Text = model.HKPlace;
            this.txtArcPlace.Text = model.ArcPlace;
            string DocSubmit = model.DocSubmit;
            if (DocSubmit != null && this.ddlDocSubmit.Items.FindByValue(DocSubmit) != null)
            {
                this.ddlDocSubmit.Items.FindByValue(DocSubmit).Selected = true;
            }
            //this.txtHaveDoc.Text = model.HaveDoc;
            string HaveDoc = model.HaveDoc;
            if (HaveDoc != null && HaveDoc != "")
            {
                string[] hd = HaveDoc.Split(',');
                for (int i = 0; i < hd.Length; i++)
                {
                    if (cblHaveDoc.Items.FindByValue(hd[i]) != null)
                    {
                        cblHaveDoc.Items.FindByValue(hd[i]).Selected = true;
                    }
                }
            }
            this.txtBestXL.Text = model.BestXL;
            this.txtZC.Text = model.ZC;
            string ComputerLevel = model.ComputerLevel;
            if (ComputerLevel != null && this.ddlComputerLevel.Items.FindByValue(ComputerLevel) != null)
            {
                this.ddlComputerLevel.Items.FindByValue(ComputerLevel).Selected = true;
            }
            this.txtFLKind.Text = model.FLKind;
            this.txtFirstSchool.Text = model.FirstSchool;
            this.txtFirstSpecialty.Text = model.FirstSpecialty;
            string EnLevel = model.EnLevel;
            if (EnLevel != null && this.ddlEnLevel.Items.FindByValue(EnLevel) != null)
            {
                this.ddlEnLevel.Items.FindByValue(EnLevel).Selected = true;
            }
            this.txtSecSchool.Text = model.SecSchool;
            this.txtSecSpecialty.Text = model.SecSpecialty;
            this.txtTec.Text = model.Tec;
            this.txtWorkCompanys.Text = model.WorkCompanys;
            this.txtMySpec.Text = model.MySpec;
            this.txtMyLove.Text = model.MyLove;
            this.txtPrisePunsh.Text = model.PrisePunsh;
            this.txtResume.Text = model.Resume;

            EmcCommon.ShowDropDownList(ddlCBArea, model.CBArea);
            this.txtCBStartDate.Text = PageValidate.FormatSmallDate(model.CBStartDate);
            this.txtCBAmt.Text = model.CBAmt.ToString();
            this.txtCBRemark.Text = model.CBRemark;
            this.txtCBEndDate.Text = PageValidate.FormatSmallDate(model.CBEndDate);
            this.txtContractDate.Text = PageValidate.FormatSmallDate(model.ContractDate);
            this.txtLeaveDate.Text = PageValidate.FormatSmallDate(model.LeaveDate);
            this.txtSerYear.Text = model.SerYear.ToString();
            this.txtHolidayYear.Text = model.HolidayYear.ToString();
            //显示假期信息
            this.SetHolidayInfo();
        }

        protected override void VtSave()
        {
            string mode = HF_Mode.Value;
            string strErr = "";
            strErr = this.checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.Pub_EmpInfo model = this.SetModelValue();
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            Model.Pub_DeptUsers modeldu = new Model.Pub_DeptUsers();
            if (mode == "add")
            {
                hfUserName.Value = txtUserName.Text;
                MembershipCreateStatus status;
                model.ctime = DateTime.Now;
                model.mtime = DateTime.Now;
                model.owner = int.Parse(Session["Uid"].ToString());
                model.creator = int.Parse(Session["Uid"].ToString());
                model.conflictCtrlID = "1";

                string passwordQuestion = this.txtUserName.Text;
                string passwordAnswer = this.txtCnName.Text;

                string UserName = this.txtUserName.Text;
                string Password = "111111";
                string Email = UserName + "@xxx.com";
                if (this.txtEmail.Text.Trim() != "")
                {
                    Email = this.txtEmail.Text;
                }
                try
                {
                    MembershipUser newUser = Membership.CreateUser(UserName, Password,
                                                Email, passwordQuestion,
                                                passwordAnswer, true, out status);
                    if (newUser == null)
                    {
                        MessageBox.Show(this, GetErrorMessage(status));
                    }
                    else
                    {
                        //上传照片
                        string oldPhoto = hfPhoto.Value;
                        string Photo = UpPhoto(oldPhoto);
                        model.Photo = Photo;
                        model.UserID = new Guid(newUser.ProviderUserKey.ToString());
                        int uid = bll.Add(model);
                        HF_UserID.Value = uid.ToString();
                        //保存假期信息
                        //this.SaveHolidayInfo(uid);
                        //增加到部门公司人员关联表中



                        UpdateDeptUserInfo(uid.ToString());
                        Lbl_Message.Text = "保存成功!!!";
                        HF_Mode.Value = "update";
                    }
                   
                }
                catch
                {
                    MessageBox.Show(this, "未知错误！");
                }


            }

            if (mode == "update")
            {
                //上传照片
                string oldPhoto = hfPhoto.Value;
                string Photo = UpPhoto(oldPhoto);
                model.Photo = Photo;
                model.mtime = DateTime.Now;
                bll.Update(model);

                //保存假期信息
                this.SaveHolidayInfo(int.Parse(HF_UserID.Value));
                UpdateDeptUserInfo(HF_UserID.Value);
                Lbl_Message.Text = "保存成功!!!";
            }
            string issysuser = "false";
            if (model.IsSysUser == "0") //非系统用户锁定用户
            {
                issysuser = "true";
            }
            EmcCommon.LockUserLogin(model.UserID.ToString(), issysuser);
            EmcCommon.SaveFiles(HF_UserID.Value, hfMID.Value, "", "hrmarc/", FileUpload1, FileUpload2, FileUpload3, FileUpload4, FileUpload5);
            EmcCommon.ShowFileList(sgvFilelist, HF_UserID.Value, hfMID.Value);
        }

        private void UpdateDeptUserInfo(string userid)
        {
            //修改部门信息
            string duid = "";
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            Model.Pub_DeptUsers modeldu = new Model.Pub_DeptUsers();
            DataSet dsdu = blldu.GetList("UserID='" + userid + "' and FilialeID='" + Session["FilialeID"].ToString() + "'");
            if (dsdu.Tables[0].Rows.Count > 0)
            {
                duid = dsdu.Tables[0].Rows[0]["ID"].ToString();
                modeldu = blldu.GetModel(int.Parse(duid));
                modeldu.DeptID = Common.Common.stringToInt(ddlDept.SelectedItem.Value);
                if (ddlPositions.SelectedItem != null)
                {
                    modeldu.PostID = ddlPositions.SelectedItem.Value;
                    modeldu.PostName = ddlPositions.SelectedItem.Text;
                }
                blldu.Update(modeldu);
            }
            else
            {
                modeldu.FilialeID = Common.Common.stringToInt(Session["FilialeID"].ToString());
                modeldu.DeptID = Common.Common.stringToInt(ddlDept.SelectedItem.Value);
                modeldu.UserDeptKind = "1";
                modeldu.UserID = int.Parse(userid);
                if (ddlPositions.SelectedItem != null)
                {
                    modeldu.PostID = ddlPositions.SelectedItem.Value;
                    modeldu.PostName = ddlPositions.SelectedItem.Text;
                }
                blldu.Add(modeldu);
            }

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
                    return "无效的密码答案。";

                case MembershipCreateStatus.InvalidQuestion:
                    return "无效的密码问题。";

                case MembershipCreateStatus.InvalidUserName:
                    return "无效的用户史。";

                case MembershipCreateStatus.ProviderError:
                    return "提供程序返回一个未由其他 MembershipCreateStatus 枚举值描述的错误.";

                case MembershipCreateStatus.UserRejected:
                    return "因为提供程序定义的某个原因而未创建用户";

                default:
                    return "出现未知错误！请联系网站管理员。";
            }
        }
        private Model.Pub_EmpInfo SetModelValue()
        {



            string UserName = this.txtUserName.Text;

            Model.Pub_EmpInfo model = new Model.Pub_EmpInfo();
            BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
            if (HF_Mode.Value == "update")
            {
                model = bllEmp.GetModel(UserName);
            }
            string CnName = this.txtCnName.Text;
            string EnName = this.txtEnName.Text;
            string EmpID = this.txtEmpID.Text;
            string PositionsID = ddlPositions.SelectedItem.Value;
            string Positions = ddlPositions.SelectedItem.Text;
            string WorkPlace = this.txtWorkPlace.Text;
            string Title = this.txtTitle.Text;
            string Grade = string.IsNullOrEmpty(ddlGrade.SelectedValue) ? "" : ddlGrade.SelectedValue;
            string PYState = ddlPYState.SelectedItem.Value;
            string ZZState = ddlZZState.SelectedItem.Value;
            string Height = this.txtHeight.Text;
            string DGDate = this.txtDGDate.Text;
            string ZZDate = this.txtZZDate.Text;
            string TryDays = this.txtTryDays.Text;
            model.UserName = UserName;
            model.DGDate = PageValidate.StringToDatetime(DGDate);
            model.ZZDate = PageValidate.StringToDatetime(ZZDate);
            model.TryDays = PageValidate.StringToInt(TryDays);
            string OrderID = this.txtOrderID.Text;
            model.OrderID = PageValidate.StringToInt(OrderID);
            //string Photo = this.txtPhoto.Text;
            string Tel = this.txtTel.Text;
            string PhoneExt = this.txtPhoneExt.Text;
            string Email = this.txtEmail.Text;
            string Mobile = this.txtMobile.Text;
            string MSN = this.txtMSN.Text;
            string QQ = this.txtQQ.Text;
            string TemAddr = this.txtTemAddr.Text;
            string TemTel = this.txtTemTel.Text;
            string Addr = this.txtAddr.Text;
            string AddrTel = this.txtAddrTel.Text;
            string OthersContact = this.txtOthersContact.Text;
            string OthersRel = this.txtOthersRel.Text;
            string OthersPhone = this.txtOthersPhone.Text;
            string BirthDay = this.txtBirthDay.Text;
            if (BirthDay == "" && txtIDCard.Text != "")
            {
                BirthDay = Common.Common.GetBirthDateByIDCard(txtIDCard.Text);
          
            }
          
            string Age = this.txtAge.Text;
            if (PageValidate.IsDateTime(BirthDay))
            {
                model.BirthDay = PageValidate.StringToDatetime(BirthDay);
                txtBirthDay.Text = BirthDay;
            }
            model.Age = PageValidate.StringToInt(Age);
            string Sex = ddlSex.SelectedItem.Value;
            string Marriage = ddlMarriage.SelectedItem.Value;
            string IDCard = this.txtIDCard.Text;
            string DriveCharter = this.txtDriveCharter.Text;
            string Nationality = this.txtNationality.Text;
            string NativePlace = this.txtNativePlace.Text;
            string Nation = this.txtNation.Text;
            string HKPlace = this.txtHKPlace.Text;
            string ArcPlace = this.txtArcPlace.Text;
            string DocSubmit = ddlDocSubmit.SelectedItem.Value;
            string HaveDoc = "";
            if (cblHaveDoc.Items.Count > 0)
            {
                int k = 0;
                foreach (ListItem li in cblHaveDoc.Items)
                {
                    if (li.Selected == true)
                    {
                        HaveDoc += li.Value + ",";
                        k += 1;

                    }
                }
                if (k == cblHaveDoc.Items.Count)
                {
                    if (ddlDocSubmit.Items.FindByValue("待补").Selected == true)
                    {
                        ddlDocSubmit.Items.FindByValue("待补").Selected = false;
                    }
                    ddlDocSubmit.Items.FindByValue("完整").Selected = true;
                }
            }
            if (HaveDoc != "")
            {
                HaveDoc = HaveDoc.Substring(0, HaveDoc.Length - 1);
            }
            string IsSysUser = "0";
            string Account = txtAccount.Text;
            if (ckIsSysUser.Checked)
            {
                IsSysUser = "1";
            }
            model.IsSysUser = IsSysUser;
            model.Account = Account;

            string BestXL = this.txtBestXL.Text;
            string ZC = this.txtZC.Text;
            string ComputerLevel = ddlComputerLevel.SelectedItem.Value;
            string FLKind = this.txtFLKind.Text;
            string FirstSchool = this.txtFirstSchool.Text;
            string FirstSpecialty = this.txtFirstSpecialty.Text;
            string EnLevel = ddlEnLevel.SelectedItem.Value;
            string SecSchool = this.txtSecSchool.Text;
            string SecSpecialty = this.txtSecSpecialty.Text;
            string Tec = this.txtTec.Text;
            string WorkCompanys = this.txtWorkCompanys.Text;
            string MySpec = this.txtMySpec.Text;
            string MyLove = this.txtMyLove.Text;
            string PrisePunsh = this.txtPrisePunsh.Text;
            string Resume = this.txtResume.Text;
            string CBArea = ddlCBArea.SelectedItem.Value;
            string CBStartDate = this.txtCBStartDate.Text;
            string CBAmt = this.txtCBAmt.Text;
            string CBEndDate = this.txtCBEndDate.Text;
            string ContractDate = this.txtContractDate.Text;
            string LeaveDate = this.txtLeaveDate.Text;
            string SerYear = this.txtSerYear.Text;
            string HolidayYear = this.txtHolidayYear.Text;
            model.CBStartDate = PageValidate.StringToDatetime(CBStartDate);
            model.CBAmt = PageValidate.StringToDecimal(CBAmt);
            string CBRemark = this.txtCBRemark.Text;
            model.CBEndDate = PageValidate.StringToDatetime(CBEndDate);
            model.ContractDate = PageValidate.StringToDatetime(ContractDate);
            model.LeaveDate = PageValidate.StringToDatetime(LeaveDate);
            model.SerYear = PageValidate.StringToInt(SerYear);
            model.HolidayYear = PageValidate.StringToInt(HolidayYear);

            model.CnName = CnName;
            model.EnName = EnName;
            model.EmpID = EmpID;
            model.Positions = Positions;
            model.PositionsID = PositionsID;
            model.WorkPlace = WorkPlace;
            model.Title = Title;
            model.Grade = Grade;
            model.PYState = PYState;
            model.ZZState = ZZState;
            model.Height = Height;
            //model.Photo = Photo;
            model.Tel = Tel;
            model.PhoneExt = PhoneExt;
            model.Email = Email;
            model.Mobile = Mobile;
            model.MSN = MSN;
            model.QQ = QQ;
            model.TemAddr = TemAddr;
            model.TemTel = TemTel;
            model.Addr = Addr;
            model.AddrTel = AddrTel;
            model.OthersContact = OthersContact;
            model.OthersRel = OthersRel;
            model.OthersPhone = OthersPhone;
            model.Sex = Sex;
            model.Marriage = Marriage;
            model.IDCard = IDCard;
            model.DriveCharter = DriveCharter;
            model.Nationality = Nationality;
            model.NativePlace = NativePlace;
            model.Nation = Nation;
            model.HKPlace = HKPlace;
            model.ArcPlace = ArcPlace;
            model.DocSubmit = DocSubmit;
            model.HaveDoc = HaveDoc;
            model.BestXL = BestXL;
            model.ZC = ZC;
            model.ComputerLevel = ComputerLevel;
            model.FLKind = FLKind;
            model.FirstSchool = FirstSchool;
            model.FirstSpecialty = FirstSpecialty;
            model.EnLevel = EnLevel;
            model.SecSchool = SecSchool;
            model.SecSpecialty = SecSpecialty;
            model.Tec = Tec;
            model.WorkCompanys = WorkCompanys;
            model.MySpec = MySpec;
            model.MyLove = MyLove;
            model.PrisePunsh = PrisePunsh;
            model.Resume = Resume;
            model.CBArea = CBArea;
            model.CBRemark = CBRemark;
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

            if (ddlDept.SelectedItem.Value == "--")
            {
                strErr += "没有选择部门！\\n";
            }

       

            return strErr;
        }
        //上传照片
        private string UpPhoto(string hfPhoto)
        {

            FileUpLoadCommon fc = new FileUpLoadCommon(Common.Common.UpLoadDir + "hrmarc/", false);
            fc.SaveFile(txtPhoto, true);
            if (fc.newFileName != "")
            {
                FileUpLoadCommon.DeleteFile(string.Format("{0}{1}{2}", Common.Common.UpLoadDir, "hrmarc/", hfPhoto));
                FileUpLoadCommon.DeleteFile(string.Format("{0}{1}s_{2}", Common.Common.UpLoadDir, "hrmarc/", hfPhoto));
                return fc.newFileName;
            }
            else
            {
                return hfPhoto;
            }
        }

        //建立假期字段
        private void CreateHoliday()
        {


            BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
            string strWhereBd = "RefObj = 'hrm.emp.Holiday' and isAct='1' and FilialeID='" + Session["FilialeID"].ToString() + "'";
            DataSet ds = bllbd.GetList(strWhereBd);

            int rc = 1;

            foreach (DataRow dr in ds.Tables[0].Rows)
            {

                string LableName = dr["RefValue"].ToString();
                Label myLabel = new Label();
                myLabel.Text = LableName;
                myLabel.ID = "myLabel" + rc.ToString();
                TextBox txtBox = new TextBox();
                txtBox.Text = "0";
                txtBox.ID = "txtBox" + rc.ToString();
                txtBox.Width = Unit.Pixel(25);
                TextBox txtBoxH = new TextBox();
                // //     txtBoxH.Text = "0";
                //    txtBoxH.ID = "txtBoxH" + rc.ToString();
                txtBox.ReadOnly = true;
                //    txtBoxH.ReadOnly = true;
                HiddenField hfField = new HiddenField();
                hfField.Value = dr["RefValueCode"].ToString();
                hfField.ID = "hfField" + rc.ToString();
                txtBox.Attributes.Add("style", "width:25px;");
                //  txtBoxH.Attributes.Add("style", "background-color:Azure;border-color:inactivecaptiontext;border-style:Inset;width:25px;");
                myLabel.Attributes.Add("style", "width:35px;");
                phHoliday.Controls.Add(new LiteralControl("&nbsp;"));
                phHoliday.Controls.Add(myLabel);
                phHoliday.Controls.Add(new LiteralControl("&nbsp;"));
                phHoliday.Controls.Add(txtBox);
                phHoliday.Controls.Add(new LiteralControl("天&nbsp;"));
                //  phHoliday.Controls.Add(txtBoxH);
                //  phHoliday.Controls.Add(new LiteralControl("小时&nbsp;"));
                phHoliday.Controls.Add(hfField);
                phHoliday.Controls.Add(new LiteralControl("&nbsp;&nbsp;"));
                if ((rc % 6) == 0)
                {
                    phHoliday.Controls.Add(new LiteralControl("<br>"));
                }
                rc += 1;
            }
            hfHoliday.Value = Convert.ToString(rc - 1);

        }

        //保存假期信息
        private void SaveHolidayInfo(int uid)
        {
            Model.Pub_EmpInfo_Holiday modelhd = new Model.Pub_EmpInfo_Holiday();
            BLL.Pub_EmpInfo_Holiday bllhd = new BLL.Pub_EmpInfo_Holiday();
            string HolidayYear = "";
            int hyear = DateTime.Now.Year;
            if (txtHolidayYear.Text != "")
            {
                hyear = int.Parse(txtHolidayYear.Text);
            }
            if (HF_Mode.Value == "update")
            {
                //删除原来的假期



                string uid1 = HF_UserID.Value;
                bllhd.Delete(int.Parse(uid1), hyear);
            }
            int hdnum = int.Parse(hfHoliday.Value);
            for (int j = 1; j <= hdnum; j++)
            {
                Label lb1 = (Label)phHoliday.FindControl("myLabel" + j.ToString());
                TextBox tb1 = (TextBox)phHoliday.FindControl("txtBox" + j.ToString());
                HiddenField hf1 = (HiddenField)phHoliday.FindControl("hfField" + j.ToString());
                // TextBox tbh = (TextBox)phHoliday.FindControl("txtBoxH" + j.ToString());
                modelhd.Years = hyear;
                modelhd.ItemName = lb1.Text;
                modelhd.ItemNo = hf1.Value;
                modelhd.UID = uid;
                modelhd.Days = PageValidate.StringToDecimal(tb1.Text);
                // modelhd.Hours = PageValidate.StringToDecimal(tbh.Text);
                bllhd.Add(modelhd);
            }
        }
        //设置假期值




        private void SetHolidayInfo()
        {
            BLL.Pub_EmpInfo_Holiday bllhd = new BLL.Pub_EmpInfo_Holiday();
            string strWhere = " UID = '" + HF_UserID.Value + "'";
            DataSet dshd = bllhd.GetList(strWhere);
            DataView dv = new DataView(dshd.Tables[0]);


            int hdnum = int.Parse(hfHoliday.Value);
            for (int j = 1; j <= hdnum; j++)
            {

                TextBox tb1 = (TextBox)phHoliday.FindControl("txtBox" + j.ToString());
                HiddenField hf1 = (HiddenField)phHoliday.FindControl("hfField" + j.ToString());
                //   TextBox tbh = (TextBox)phHoliday.FindControl("txtBoxH" + j.ToString());
                string itemno = hf1.Value;
                dv.RowFilter = " ItemNo = '" + itemno + "'";
                foreach (DataRowView dr in dv)
                {
                    string Days = dr["Days"].ToString();
                    //  string Hours = dr["Hours"].ToString();
                    tb1.Text = Days;
                    //  tbh.Text = Hours;

                }
            }
        }
        //删除文件
        protected void sgvFilelist_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            int ID = Common.Common.stringToInt(sgvFilelist.DataKeys[e.RowIndex].Value.ToString());
            BLL.Pub_AttFiles bllaf = new BLL.Pub_AttFiles();
            Model.Pub_AttFiles model = bllaf.GetModel(ID);
            if (model != null)
            {
                string filepath = model.FilePath;
                FileUpLoadCommon.DeleteFile(filepath);
                bllaf.Delete(ID);
            }
            EmcCommon.ShowFileList(sgvFilelist, HF_UserID.Value, hfMID.Value);
        }

  
    }
}


