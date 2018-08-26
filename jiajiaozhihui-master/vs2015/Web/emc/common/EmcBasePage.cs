﻿using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using System.Collections.Generic;

namespace SfSoft.web.emc.common
{
    public class EmcBasePage : System.Web.UI.Page
    {
        protected Button tsbtnView = null;//查阅
        protected Button tsbtnNew = null;//新建
        protected Button tsbtnEdit = null;//修改
        protected Button tsbtnDelete = null;//删除
        protected Button tsbtnSave = null;//保存
        protected Button tsbtnSearch = null;//查询
        protected Button tsbtnClearCd = null;//清空条件
        protected Button tsbtnSubmit = null;//提交
        protected Button tsbtnCancel = null;//撤消
        protected Button tsbtnSubCancel = null;//申请撤消
        protected Button tsbtnApprove = null;//审批
        protected Button tsbtnAppRecord = null;//审批记录
        protected Button tsbtnPrint = null;//打印
        protected Button tsbtnFresh = null;//刷新
        protected Button tsbtnExport = null;//导出
        protected Button tsbtnReturn = null;//返回
        protected Button tsbtnClose = null;//关闭
        protected Button tsbtnCurCat = null;//新增本级栏目
        protected Button tsbtnNextCat = null;//新增下级栏目
        protected Button tsbtnMgt = null;//管理
        protected Button tsbtnApproveYes = null;//审批同意
        protected Button tsbtnApproveNo = null;//审批不同意
        protected Button tsbtnHelp = null;//帮助
        protected PlaceHolder phToolBars = null;//工具栏容器
        protected void Page_Init(object sender, EventArgs e)
        {
            //phToolBars = (PlaceHolder)FindControl("phToolBars");
            phToolBars = FindControl(Page, typeof(PlaceHolder), "phToolBars") as PlaceHolder;
            VtInitToolbars();// 初始化标准工具栏
            VtInitOthersToolbars();// 初始化其它工具栏
            VtInitBaseToolsBars();//初始化基本工具栏

            //初始化审批窗口
            //  VtInitApproveWindows();
        }
        #region 初始化按扭
        /// <summary>
        /// 查阅
        /// </summary>
        protected void NewTsbtnView()
        {
            tsbtnView = new Button();
            tsbtnView.ID = "tsbtnView";
            tsbtnView.Text = "查阅";
            tsbtnView.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnView.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnView.CssClass = "btn";
            tsbtnView.Click += new EventHandler(tsbtnView_Click);
        }

        /// <summary>
        /// 新建
        /// </summary>
        protected void NewTsbtnNew()
        {
            tsbtnNew = new Button();
            tsbtnNew.ID = "tsbtnNew";
            tsbtnNew.Text = "新建";
            tsbtnNew.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnNew.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnNew.CssClass = "btn";
            tsbtnNew.Click += new EventHandler(tsbtnNew_Click);
        }

        /// <summary>
        /// 修改
        /// </summary>
        protected void NewTsbtnEdit()
        {
            tsbtnEdit = new Button();
            tsbtnEdit.ID = "tsbtnEdit";
            tsbtnEdit.Text = "修改";
            tsbtnEdit.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnEdit.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnEdit.CssClass = "btn";
            tsbtnEdit.Click += new EventHandler(tsbtnEdit_Click);
        }

        /// <summary>
        /// 删除
        /// </summary>
        protected void NewTsbtnDelete()
        {
            tsbtnDelete = new Button();
            tsbtnDelete.ID = "tsbtnDelete";
            tsbtnDelete.Text = "删除";
            tsbtnDelete.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnDelete.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnDelete.CssClass = "btn";
            tsbtnDelete.Click += new EventHandler(tsbtnDelete_Click);
        }
        /// <summary>
        /// 打印
        /// </summary>
        protected void NewTsbtnPrint()
        {
            tsbtnPrint = new Button();
            tsbtnPrint.ID = "tsbtnPrint";
            tsbtnPrint.Text = "打印";
            tsbtnPrint.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnPrint.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnPrint.CssClass = "btn";
            tsbtnPrint.Click += new EventHandler(tsbtnPrint_Click);
        }
        /// <summary>
        /// 刷新
        /// </summary>
        protected void NewtsbtnFresh()
        {
            tsbtnFresh = new Button();
            tsbtnFresh.ID = "tsbtnFresh";
            tsbtnFresh.Text = "刷新";
            tsbtnFresh.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnFresh.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnFresh.CssClass = "btn";
            tsbtnFresh.Click += new EventHandler(tsbtnFresh_Click);
        }
        /// <summary>
        /// 关闭
        /// </summary>
        protected void NewTsbtnClose()
        {
            tsbtnClose = new Button();
            tsbtnClose.ID = "tsbtnClose";
            tsbtnClose.Text = "关闭";
            tsbtnClose.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnClose.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnClose.CssClass = "btn";
            tsbtnClose.Click += new EventHandler(tsbtnClose_Click);
        }

        /// <summary>
        /// 帮助
        /// </summary>
        protected void NewTsbtnHelp()
        {
            tsbtnHelp = new Button();
            tsbtnHelp.ID = "tsbtnHelp";
            tsbtnHelp.Text = "帮助";
            tsbtnHelp.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnHelp.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnHelp.CssClass = "btn";
            tsbtnHelp.Click += new EventHandler(tsbtnHelp_Click);
        }

        /// <summary>
        /// 保存
        /// </summary>
        protected void NewTsbtnSave()
        {
            tsbtnSave = new Button();
            tsbtnSave.ID = "tsbtnSave";
            tsbtnSave.Text = "保存";
            tsbtnSave.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSave.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSave.CssClass = "btn";
            tsbtnSave.Click += new EventHandler(tsbtnSave_Click);
        }
        /// <summary>
        /// 查询
        /// </summary>
        protected void NewTsbtnSearch()
        {
            tsbtnSearch = new Button();
            tsbtnSearch.ID = "tsbtnSearch";
            tsbtnSearch.Text = "查询";
            tsbtnSearch.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSearch.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSearch.CssClass = "btn";
            tsbtnSearch.Click += new EventHandler(tsbtnSearch_Click);
        }

        /// <summary>
        /// 清空条件
        /// </summary>
        protected void NewTsbtnClearCd()
        {
            tsbtnClearCd = new Button();
            tsbtnClearCd.ID = "tsbtnClearCd";
            tsbtnClearCd.Text = "清空条件";
            tsbtnClearCd.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnClearCd.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnClearCd.CssClass = "btn";
            tsbtnClearCd.Click += new EventHandler(tsbtnClearCd_Click);
        }
        /// <summary>
        /// 提交
        /// </summary>
        protected void NewTsbtnSubmit()
        {
            tsbtnSubmit = new Button();
            tsbtnSubmit.ID = "tsbtnSubmit";
            tsbtnSubmit.Text = "提交";
            tsbtnSubmit.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSubmit.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSubmit.CssClass = "btn";
            tsbtnSubmit.Click += new EventHandler(tsbtnSubmit_Click);
        }


        /// <summary>
        /// 撤消
        /// </summary>
        protected void NewTsbtnCancel()
        {
            tsbtnCancel = new Button();
            tsbtnCancel.ID = "tsbtnCancel";
            tsbtnCancel.Text = "撤消";
            tsbtnCancel.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnCancel.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnCancel.CssClass = "btn";
            tsbtnCancel.Click += new EventHandler(tsbtnCancel_Click);
        }
        /// <summary>
        /// 申请撤消
        /// </summary>
        protected void NewTsbtnSubCancel()
        {
            tsbtnSubCancel = new Button();
            tsbtnSubCancel.ID = "tsbtnSubCancel";
            tsbtnSubCancel.Text = "申请撤消";
            tsbtnSubCancel.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSubCancel.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSubCancel.CssClass = "btn";
            tsbtnSubCancel.Click += new EventHandler(tsbtnSubCancel_Click);
        }

        /// <summary>
        /// 审批
        /// </summary>
        protected void NewTsbtnApprove()
        {
            tsbtnApprove = new Button();
            tsbtnApprove.ID = "tsbtnApprove";
            tsbtnApprove.Text = "审批";
            tsbtnApprove.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnApprove.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnApprove.CssClass = "btn";
            tsbtnApprove.Click += new EventHandler(tsbtnApprove_Click);
        }


        /// <summary>
        /// 审批记录
        /// </summary>
        protected void NewTsbtnAppRecord()
        {
            tsbtnAppRecord = new Button();
            tsbtnAppRecord.ID = "tsbtnAppRecord";
            tsbtnAppRecord.Text = "审批";
            tsbtnAppRecord.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnAppRecord.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnAppRecord.CssClass = "btn";
            tsbtnAppRecord.Click += new EventHandler(tsbtnAppRecord_Click);
        }
        /// <summary>
        /// 审批同意
        /// </summary>
        protected void NewTsbtnApproveYes()
        {
            tsbtnApproveYes = new Button();
            tsbtnApproveYes.ID = "tsbtnApproveYes";
            tsbtnApproveYes.Text = "审批同意";
            tsbtnApproveYes.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnApproveYes.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnApproveYes.CssClass = "btn";
            tsbtnApproveYes.Click += new EventHandler(tsbtnApproveYes_Click);

        }

        /// <summary>
        /// 审批不同意
        /// </summary>
        protected void NewTsbtnApproveNo()
        {
            tsbtnApproveNo = new Button();
            tsbtnApproveNo.ID = "tsbtnApproveNo";
            tsbtnApproveNo.Text = "审批不同意";
            tsbtnApproveNo.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnApproveNo.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnApproveNo.CssClass = "btn";
            tsbtnApproveNo.Click += new EventHandler(tsbtnApproveNo_Click);
        }

        /// <summary>
        /// 新增本级栏目
        /// </summary>
        protected void NewTsbtnCurCat()
        {
            tsbtnCurCat = new Button();
            tsbtnCurCat.ID = "tsbtnApproveNo";
            tsbtnCurCat.Text = "新增本级栏目";
            tsbtnCurCat.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnCurCat.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnCurCat.CssClass = "btn";
            tsbtnCurCat.Click += new EventHandler(tsbtnCurCat_Click);
        }
        /// <summary>
        /// 新增下级栏目
        /// </summary>
        protected void NewTsbtnNextCat()
        {
            tsbtnNextCat = new Button();
            tsbtnNextCat.ID = "tsbtnNextCat";
            tsbtnNextCat.Text = "新增下级栏目";
            tsbtnNextCat.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnNextCat.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnNextCat.CssClass = "btn";
            tsbtnNextCat.Click += new EventHandler(tsbtnNextCat_Click);
        }
        /// <summary>
        /// 管理
        /// </summary>
        protected void NewTsbtnMgt()
        {
            tsbtnMgt = new Button();
            tsbtnMgt.ID = "tsbtnMgt";
            tsbtnMgt.Text = "管理";
            tsbtnMgt.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnMgt.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnMgt.CssClass = "btn";
            tsbtnMgt.Click += new EventHandler(tsbtnMgt_Click);
        }

        #endregion

        #region 工具栏
        /// <summary>
        /// 初始化标准工具栏
        /// </summary>
        protected virtual void VtInitToolbars()
        {


        }
        /// <summary>
        /// 初始化其它工具栏
        /// </summary>
        protected virtual void VtInitOthersToolbars()
        {


        }
        /// <summary>
        /// 初始化管理列表工具栏
        /// </summary>
        protected virtual void VtInitListToolsBars()
        {
            NewTsbtnView();
            phToolBars.Controls.Add(tsbtnView);
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnEdit();
            phToolBars.Controls.Add(tsbtnEdit);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
        }

        /// <summary>
        /// 初始化信息浏览工具栏
        /// </summary>
        protected virtual void VtInitBrowseToolbars()
        {
            NewTsbtnMgt();
            phToolBars.Controls.Add(tsbtnMgt);
        }

        /// <summary>
        /// 初始化普通修改页工具栏
        /// </summary>
        protected virtual void VtInitEditToolbars()
        {
            NewTsbtnSave();
            phToolBars.Controls.Add(tsbtnSave);
        }

        /// <summary>
        /// 初始化审批修改页工具栏
        /// </summary>
        protected virtual void VtInitApproveEditPageToolbars()
        {
            NewTsbtnSave();
            phToolBars.Controls.Add(tsbtnSave);
            NewTsbtnSubmit();
            phToolBars.Controls.Add(tsbtnSubmit);
            NewTsbtnCancel();
            phToolBars.Controls.Add(tsbtnCancel);
            NewTsbtnSubCancel();
            phToolBars.Controls.Add(tsbtnSubCancel);
            NewTsbtnApprove();
            phToolBars.Controls.Add(tsbtnApprove);
            NewTsbtnAppRecord();
            phToolBars.Controls.Add(tsbtnAppRecord);
        }

        /// <summary>
        /// 初始化基础工具栏，打印，刷新，关闭，帮助
        /// </summary>
        protected virtual void VtInitBaseToolsBars()
        {

            NewTsbtnPrint();
            phToolBars.Controls.Add(tsbtnPrint);
            NewtsbtnFresh();
            phToolBars.Controls.Add(tsbtnFresh);
            NewTsbtnClose();
            phToolBars.Controls.Add(tsbtnClose);
            NewTsbtnHelp();
            phToolBars.Controls.Add(tsbtnHelp);

            // tsbtnClose.Click += new EventHandler(tsbtnClose_Click);

        }
        #endregion

        #region 事件
        protected virtual void tsbtnView_Click(object sender, EventArgs e)
        {
            VtBeforeView();
            VtView();
            VtAfterView();
        }
        protected virtual void tsbtnNew_Click(object sender, EventArgs e)
        {
            VtBeforeNew();
            VtNew();
            VtAfterNew();
        }
        protected virtual void tsbtnEdit_Click(object sender, EventArgs e)
        {
            VtBeforeEdit();
            VtEdit();
            VtAfterEdit();
        }
        protected virtual void tsbtnDelete_Click(object sender, EventArgs e)
        {
            VtBeforeDelete();
            VtDelete();
            VtAfterDelete();
        }
        protected virtual void tsbtnSave_Click(object sender, EventArgs e)
        {
            VtBeforeSave();
            VtSave();
            VtAfterSave();
        }
        protected virtual void tsbtnSearch_Click(object sender, EventArgs e)
        {
            VtBeforeSearch();
            VtSearch();
            VtAfterSearch();
        }
        protected virtual void tsbtnClearCd_Click(object sender, EventArgs e)
        {
            VtBeforeClearCd();
            VtClearCd();
            VtAfterClearCd();
        }
        protected virtual void tsbtnSubmit_Click(object sender, EventArgs e)
        {
            VtBeforeSubmit();
            VtSubmit();
            VtAfterSubmit();
        }
        protected virtual void tsbtnCancel_Click(object sender, EventArgs e)
        {
            VtBeforeCancel();
            VtCancel();
            VtAfterCancel();
        }
        protected virtual void tsbtnSubCancel_Click(object sender, EventArgs e)
        {
            VtBeforeSubCancel();
            VtSubCancel();
            VtAfterSubCancel();
        }
        protected virtual void tsbtnApprove_Click(object sender, EventArgs e)
        {
            VtBeforeApprove();
            VtApprove();
            VtAfterApprove();
        }
        protected virtual void tsbtnAppRecord_Click(object sender, EventArgs e)
        {
            VtBeforeAppRecord();
            VtAppRecord();
            VtAfterAppRecord();
        }
        protected virtual void tsbtnPrint_Click(object sender, EventArgs e)
        {
            VtPrint();
        }
        protected virtual void tsbtnFresh_Click(object sender, EventArgs e)
        {
            VtFresh();
        }
        protected virtual void tsbtnExport_Click(object sender, EventArgs e)
        {
            VtExport();
        }
        protected virtual void tsbtnReturn_Click(object sender, EventArgs e)
        {
            VtReturn();
        }
        protected virtual void tsbtnClose_Click(object sender, EventArgs e)
        {
            VtClose();
        }
        protected virtual void tsbtnCurCat_Click(object sender, EventArgs e)
        {
            VtCurCat();
        }
        protected virtual void tsbtnNextCat_Click(object sender, EventArgs e)
        {
            VtNextCat();
        }
        protected virtual void tsbtnMgt_Click(object sender, EventArgs e)
        {
            VtMgt();
        }
        protected virtual void tsbtnApproveYes_Click(object sender, EventArgs e)
        {
            VtBeforeApproveYes();
            VtApproveYes();
            VtAfterApproveYes();
        }
        protected virtual void tsbtnApproveNo_Click(object sender, EventArgs e)
        {
            VtBeforeApproveNo();
            VtApproveNo();
            VtAfterApproveNo();
        }
        protected virtual void tsbtnHelp_Click(object sender, EventArgs e)
        {
            VtHelp();
        }
        #endregion

        #region 方法
        protected virtual void VtBeforeView() { }
        protected virtual void VtView() { }
        protected virtual void VtAfterView() { }
        protected virtual void VtBeforeNew() { }
        protected virtual void VtNew() { }
        protected virtual void VtAfterNew() { }
        protected virtual void VtBeforeEdit() { }
        protected virtual void VtEdit() { }
        protected virtual void VtAfterEdit() { }
        protected virtual void VtBeforeDelete() { }
        protected virtual void VtDelete() { }
        protected virtual void VtAfterDelete() { }
        protected virtual void VtBeforeSave() { }
        protected virtual void VtSave() { }
        protected virtual void VtAfterSave() { }
        protected virtual void VtBeforeSearch() { }
        protected virtual void VtSearch() { }
        protected virtual void VtAfterSearch() { }

        protected virtual void VtBeforeClearCd() { }
        protected virtual void VtClearCd() { }
        protected virtual void VtAfterClearCd() { }

        protected virtual void VtBeforeSubmit() { }
        protected virtual void VtSubmit() { }
        protected virtual void VtAfterSubmit() { }

        protected virtual void VtBeforeCancel() { }
        protected virtual void VtCancel() { }
        protected virtual void VtAfterCancel() { }

        protected virtual void VtBeforeSubCancel() { }
        protected virtual void VtSubCancel() { }
        protected virtual void VtAfterSubCancel() { }

        protected virtual void VtBeforeApprove() { }
        protected virtual void VtApprove() { }
        protected virtual void VtAfterApprove() { }

        protected virtual void VtBeforeAppRecord() { }
        protected virtual void VtAppRecord() { }
        protected virtual void VtAfterAppRecord() { }

        protected virtual void VtPrint() { }
        protected virtual void VtFresh()
        {


        }
        protected virtual void VtExport() { }
        protected virtual void VtReturn() { }
        protected virtual void VtClose() { }
        protected virtual void VtCurCat() { }
        protected virtual void VtNextCat() { }
        protected virtual void VtMgt() { }

        protected virtual void VtBeforeApproveYes() { }
        protected virtual void VtApproveYes() { }
        protected virtual void VtAfterApproveYes() { }

        protected virtual void VtBeforeApproveNo() { }
        protected virtual void VtApproveNo() { }
        protected virtual void VtAfterApproveNo() { }

        protected virtual void VtHelp() { }

        #endregion

        #region 权限

        /// <summary>
        /// 页面权限
        /// </summary>
        /// <param name="FunID">浏览ID</param>
        protected void CheckPageAccess(string FunID)
        {
            if (!SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], FunID) && HttpContext.Current.User.Identity.Name != "admin")
            {
                Response.Redirect("/emc/message.aspx?msg=没有权限");
            }
        }

        /// <summary>
        /// 按扭权限
        /// </summary>
        /// <param name="FunID">功能ID</param>
        protected bool CheckButtonAccess(string FunID)
        {
            if (!SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], FunID) && HttpContext.Current.User.Identity.Name != "admin")
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        #endregion

        #region 工具栏状态

        //初化工具栏按扭状态

        protected virtual void VtInitToolbarsEnable(string status)
        {
            //根据单据状态设置工具栏按扭显示
            switch (status.Trim())
            {
                case "NS"://不需要审批
                    tsbtnSave.Enabled = true;
                    break;
                case "SN"://未提交
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    break;
                case "S"://待审
                    tsbtnSubmit.Enabled = true;
                    tsbtnCancel.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    break;
                case "UP"://审批中
                    tsbtnCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    break;
                case "Y"://审批同意
                    tsbtnSubCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;
                case "N"://审批不同意
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;
                case "UN"://撤消
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;

            }

        }

        #endregion

        private Control FindControl(Control control, Type controlType, string ToolbarName)
        {
            if (control != null && control.Controls.Count > 0)
            {
                foreach (Control c in control.Controls)
                {
                    if (c != null && c.GetType() == controlType && c.ID == ToolbarName)
                    {
                        return c;
                    }
                    else
                    {
                        Control childControl = FindControl(c, controlType, ToolbarName);
                        if (childControl != null)
                        {
                            return childControl;
                        }
                    }
                }
            }

            return null;
        }
        protected override void OnLoad(EventArgs e)
        {

            base.OnLoad(e);
        }

        protected override void OnLoadComplete(EventArgs e)
        {
            base.OnLoadComplete(e);

        }
    }
}
