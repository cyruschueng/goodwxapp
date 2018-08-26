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
namespace SfSoft.web.emc.sm.sysun
{
    public partial class update : SfSoft.SfEmc.EmcBasePage
    {
        BLL.Pub_UnSystem bllCL = new SfSoft.BLL.Pub_UnSystem();
        Model.Pub_UnSystem modelCL = new SfSoft.Model.Pub_UnSystem();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hfID.Value = Request.QueryString["ID"].ToString();
                hfMode.Value = Request.QueryString["mode"].ToString();
                hfMID.Value = "emc.sm.sysun";
                //修改
                if (hfMode.Value == "update")
                {
                    //显示数据
                    modelCL = bllCL.GetModel(int.Parse(hfID.Value));
                    if (modelCL != null)
                    {
                        this.ShowInfo(modelCL);
                    }
                }
            }
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.sysun";
        }
        //页面权限
        protected override void VtPageAccess()
        {
            CheckPageAccess(hfMID.Value + ".mgt");
        }

        //工具栏
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
            VtInitBaseDetailToolsBars();
        }

        protected override void VtButtonAccess()
        {
            tsbtnSave.Enabled = CheckButtonAccess(hfMID.Value + ".mgt");
        }

        /// <summary>
        /// 保存的重写方法
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected override void VtSave()
        {

            string strErr = "";

            strErr = this.checkform();

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.Pub_UnSystem model = new SfSoft.Model.Pub_UnSystem();
            //保存单据
            if (hfMode.Value == "add")
            {
                DateTime? ctime = DateTime.Now;
                model = this.SetModelValue(model);
                model.Flag = "sys";
                hfID.Value = bllCL.Add(model).ToString();
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllCL.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
       
                bllCL.Update(model);

            }
        }



        /// <summary>
        /// 显示数据
        /// </summary>
        /// <returns></returns>
        public Model.Pub_UnSystem ShowInfo(Model.Pub_UnSystem model)
        {
            txtDbSrvAddr.Text = model.DbSrvAddr.ToString();
            txtDbName.Text = model.DbName;
            txtDbPwd.Text = model.DbPwd.ToString();
            txtDbUid.Text = model.DbUid;
            txtSysName.Text = model.SysName ;
            txtSysUrl.Text = model.SysUrl.ToString();
            txtSysShortName.Text = model.SysShortName;
            EmcCommon.ShowRadioButtonList(rblIsAct, model.IsAct);
            EmcCommon.ShowRadioButtonList(rblSysType, model.SysType);
            txtOrderID.Text = model.OrderID.ToString();
            if (model.SysIcon != "")
            {

                imgSysIcon.ImageUrl = model.SysIcon;
                imgSysIcon.Visible = true;
                btnDelPic.Visible = true;
            }
            else
            {
                imgSysIcon.Visible = false;
                btnDelPic.Visible = false;
            }
            return model;
        }
        /// <summary>
        /// 设置保存数据
        /// </summary>
        /// <param name="setSend"></param>
        /// <returns></returns>
        public Model.Pub_UnSystem SetModelValue(Model.Pub_UnSystem model)
        {
            model.DbName = txtDbName.Text;
            model.DbPwd =  txtDbPwd.Text ;
            model.DbSrvAddr =  txtDbSrvAddr.Text ;
            model.DbUid = txtDbUid.Text;
            model.IsAct = rblIsAct.SelectedItem.Value;
            model.SysType = rblSysType.SelectedItem.Value;
            model.SysUrl = txtSysUrl.Text ;
            model.SysShortName =  txtSysShortName.Text ;
            model.SysName = txtSysName.Text;

            model.OrderID = PageValidate.StringToInt(txtOrderID.Text);
            if (fuSysIcon.FileName != "")
            {
                if (model.SysIcon != "")
                {
                    FileUpLoadCommon.DeleteFile(model.SysIcon);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("company/", fuSysIcon);
                string FilePath = Common.Common.UpLoadDir + "company/" + newfname;

                model.SysIcon = FilePath;
                imgSysIcon.Visible = true;
                imgSysIcon.ImageUrl = model.SysIcon;
                btnDelPic.Visible = true;
            }
            return model;
        }
        protected void BtnDelPic_Click(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            modelCL = bllCL.GetModel(int.Parse(hfID.Value));

            FileUpLoadCommon.DeleteFile(modelCL.SysIcon);
            modelCL.SysIcon = "";
            bllCL.Update(modelCL);
            imgSysIcon.ImageUrl = "";
            imgSysIcon.Visible = false;
            btnDelPic.Visible = false;


        }
        /// <summary>
        /// 核对输入框
        /// </summary>
        /// <returns></returns>
        private string checkform()
        {
            string strErr = "";

            if (this.txtSysName.Text == "")
            {
                strErr += "系统名称不能为空！\\n";
            }
            if (this.txtSysShortName.Text == "")
            {
                strErr += "英文名称不能为空！\\n";
            }
            return strErr;
        }
    }
}

