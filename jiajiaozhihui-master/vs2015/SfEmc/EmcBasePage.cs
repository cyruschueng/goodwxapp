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
using YYControls;
using Telerik.WebControls;
using log4net;
namespace SfSoft.SfEmc
{
    /// <summary>
    /// 
    /// </summary>
    public class EmcBasePage : System.Web.UI.Page
    {
        protected Button tsbtnView = null;//查阅
        protected Button tsbtnNew = null;//新建
        protected Button tsbtnEdit = null;//修改
        protected Button tsbtnDelete = null;//删除
        protected Button tsbtnSave = null;//保存
        protected Button tsbtnSaveAndSave = null;//保存并新建
        protected Button tsbtnShowSearch = null;//显示查询条件
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
        protected Button tsbtnApproveClose = null;//审批栏关闭
        protected Button tsbtnApproval = null;//修改审批人
        protected Button tsbtnHelp = null;//帮助
        protected PlaceHolder phToolBars = null;//工具栏容器
        protected PlaceHolder phAppToolBars = null;//审批工具栏容器
        protected PlaceHolder phScToolBars = null;//查询工具栏
        protected string OpenWindWidth = "800";
        protected string OpenWindHeight= "450";
        protected HiddenField hfMID = new HiddenField();//模块ID
        protected bool OperateSuccess = true;
        private static readonly ILog log = LogManager.GetLogger(typeof(EmcBasePage));
        protected void Page_Init(object sender, EventArgs e)
        {
            if (Session["license"].ToString() == "no")
            {
                Response.Redirect("/login.aspx?error=系统注册出错！");
            }
            VtInitMID();//初始化当前模块hfMID值
            phToolBars = FindControl(Page, typeof(PlaceHolder), "phToolBars") as PlaceHolder;
      
            VtInitToolbars();// 初始化标准工具栏
            VtInitOthersToolbars();// 初始化其它工具栏
            VtInitBaseToolsBars();//初始化基本工具栏
            VtPageAccess();//页面访问权限
 

            //初始化审批窗口
            //  VtInitApproveWindows();
        }
        /// <summary>
        /// 初始化当前模块hfMID值
        /// </summary>
        protected virtual void VtInitMID()
        {
            hfMID.Value = "";
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
            VtNewClientEvent();
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
            tsbtnDelete.OnClientClick = "return confirm('确定要删除吗?');";
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
            tsbtnPrint.OnClientClick = GetPrintBtnClientClick();
            tsbtnPrint.Click += new EventHandler(tsbtnPrint_Click);
        }

        protected virtual string   GetPrintBtnClientClick() 
        {
            return "javascript:window.print();return false";
        }
        /// <summary>
        /// 刷新
        /// </summary>
        protected void NewTsbtnFresh()
        {
            tsbtnFresh = new Button();
            tsbtnFresh.ID = "tsbtnFresh";
            tsbtnFresh.Text = "刷新";
            tsbtnFresh.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnFresh.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnFresh.CssClass = "btn";
            tsbtnFresh.OnClientClick = "javascript:window.location.href=window.location.href;return false";
            //tsbtnFresh.Click += new EventHandler(tsbtnFresh_Click);
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
            //tsbtnFresh.OnClientClick = "javascript:window.close();return false";
            //tsbtnClose.Click += new EventHandler(tsbtnClose_Click);
            VtCloseClientEvent();
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
            // tsbtnHelp.Click += new EventHandler(tsbtnHelp_Click);
            tsbtnHelp.OnClientClick = "javascript:openhelp('" + hfMID.Value + "');return false";
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
            //tsbtnSave.Attributes.Add("onclick","validate()");
            tsbtnSave.CssClass = "btn";
            tsbtnSave.Click += new EventHandler(tsbtnSave_Click);
        }
        /// <summary>
        /// 查询
        /// </summary>
        protected void NewTsbtnShowSearch()
        {
            tsbtnShowSearch = new Button();
            tsbtnShowSearch.ID = "tsbtnShowSearch";
            tsbtnShowSearch.Text = "查询条件";
            tsbtnShowSearch.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnShowSearch.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnShowSearch.CssClass = "btn";
            tsbtnShowSearch.OnClientClick = "ShowSearchDiv();return false;";
          //  tsbtnShowSearch.Click += new EventHandler(tsbtnSearch_Click);
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
            tsbtnSubmit.Enabled = false;
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
            tsbtnCancel.Enabled = false;
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
            tsbtnSubCancel.Enabled = false;
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
            tsbtnApprove.Enabled = false;
            tsbtnApprove.OnClientClick = "ShowAppDiv('" + tsbtnApprove.ClientID + "');return false;";
           // tsbtnApprove.Click += new EventHandler(tsbtnApprove_Click);
        }


        /// <summary>
        /// 审批记录
        /// </summary>
        protected void NewTsbtnAppRecord()
        {
            tsbtnAppRecord = new Button();
            tsbtnAppRecord.ID = "tsbtnAppRecord";
            tsbtnAppRecord.Text = "审批记录";
            tsbtnAppRecord.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnAppRecord.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnAppRecord.CssClass = "btn";
            tsbtnAppRecord.Enabled = false;
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
        /// 审批工具栏关闭
        /// </summary>
        protected void NewTsbtnApproveClose()
        {
            tsbtnApproveClose = new Button();
            tsbtnApproveClose.ID = "tsbtnApproveClose";
            tsbtnApproveClose.Text = "关闭";
            tsbtnApproveClose.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnApproveClose.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnApproveClose.CssClass = "btn";
            tsbtnApproveClose.OnClientClick = "hideDiv();return false;";
        }

        /// <summary>
        /// 修改审批人
        /// </summary>
        protected void NewTsbtnApproval()
        {
            tsbtnApproval = new Button();
            tsbtnApproval.ID = "tsbtnApproval";
            tsbtnApproval.Text = "修改审批人";
            tsbtnApproval.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnApproval.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnApproval.CssClass = "btn";
            tsbtnApproval.Enabled = false;
            tsbtnApproval.Click += new EventHandler(tsbtnApproval_Click);
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

        /// <summary>
        /// 导出
        /// </summary>
        protected void NewTsbtnExport()
        {
            tsbtnExport = new Button();
            tsbtnExport.ID = "tsbtnExport";
            tsbtnExport.Text = "导出";
            tsbtnExport.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnExport.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnExport.CssClass = "btn";
            tsbtnExport.Click += new EventHandler(tsbtnExport_Click);
        }
        /// <summary>
        /// 返回
        /// </summary>
        protected void NewTsbtnReturn()
        {
            tsbtnReturn = new Button();
            tsbtnReturn.ID = "tsbtnReturn";
            tsbtnReturn.Text = "返回";
            tsbtnReturn.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnReturn.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnReturn.CssClass = "btn";
            tsbtnReturn.Click += new EventHandler(tsbtnReturn_Click);
            VtReturnClientEvent();
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
        /// 初始化管理列表工具栏,查阅，新建，修改，删除
        /// </summary>
        protected virtual void VtInitListToolsBars()
        {
            //NewTsbtnView();
            //phToolBars.Controls.Add(tsbtnView);
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            //NewTsbtnEdit();
            //phToolBars.Controls.Add(tsbtnEdit);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
            //NewTsbtnExport();
            //phToolBars.Controls.Add(tsbtnExport);
        }

        /// <summary>
        /// 初始化管理列表工具栏,查阅，新建，修改，删除
        /// </summary>
        protected virtual void VtInitPortToolsBars()
        {
            //NewTsbtnView();
            //phToolBars.Controls.Add(tsbtnView);
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            //NewTsbtnEdit();
            //phToolBars.Controls.Add(tsbtnEdit);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
            //NewTsbtnExport();
            //phToolBars.Controls.Add(tsbtnExport);
        }

        /// <summary>
        /// 初始化信息浏览工具栏
        /// </summary>
        protected virtual void VtInitBrowseToolbars()
        {
            NewTsbtnView();
            phToolBars.Controls.Add(tsbtnView);
            NewTsbtnMgt();
            phToolBars.Controls.Add(tsbtnMgt);
            //NewTsbtnExport();
            //phToolBars.Controls.Add(tsbtnExport);
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
            NewTsbtnApproval();
            phToolBars.Controls.Add(tsbtnApproval);
            VtInitApproveToolsBars();
        }

       
                /// <summary>
        /// 初始化基础列表工具栏
        /// </summary>
        protected virtual void  VtInitBaseToolsBars()
        {
 
        }

        /// <summary>
        /// 初始化基础列表工具栏，打印，刷新，帮助
        /// </summary>
        protected virtual void VtInitBaseListToolsBars()
        {

            NewTsbtnPrint();
            phToolBars.Controls.Add(tsbtnPrint);
            NewTsbtnFresh();
            phToolBars.Controls.Add(tsbtnFresh);
            NewTsbtnHelp();
            phToolBars.Controls.Add(tsbtnHelp);
        }

        /// <summary>
        /// 初始化基础详细工具栏，打印，刷新，关闭，帮助
        /// </summary>
        protected virtual void VtInitBaseDetailToolsBars()
        {

            NewTsbtnPrint();
            phToolBars.Controls.Add(tsbtnPrint);
            NewTsbtnFresh();
            phToolBars.Controls.Add(tsbtnFresh);
            NewTsbtnClose();
            phToolBars.Controls.Add(tsbtnClose);
            NewTsbtnHelp();
            phToolBars.Controls.Add(tsbtnHelp);
        }

        /// <summary>
        /// 初始化基础列表工具栏，查询
        /// </summary>
        protected virtual void VtInitSearchToolsBars()
        {
            NewTsbtnShowSearch();
            phToolBars.Controls.Add(tsbtnShowSearch);
            if (phScToolBars != null)
            {
 
                NewTsbtnSearch();
                phScToolBars.Controls.Add(tsbtnSearch);
                NewTsbtnClearCd();
                phScToolBars.Controls.Add(tsbtnClearCd);
                NewTsbtnApproveClose();
                phScToolBars.Controls.Add(tsbtnApproveClose);
            }

        }


        /// <summary>
        /// 初始化审批工具栏，审批同意，审批不同意，关闭
        /// </summary>
        protected virtual void VtInitApproveToolsBars()
        {

            NewTsbtnApproveYes();
            phAppToolBars.Controls.Add(tsbtnApproveYes);
            NewTsbtnApproveNo();
            phAppToolBars.Controls.Add(tsbtnApproveNo);
            NewTsbtnApproveClose();
            phAppToolBars.Controls.Add(tsbtnApproveClose);
        }

        /// <summary>
        /// 根据buttons类型名称产生工具栏按扭，用','号隔开
        /// </summary>
        /// <param name="buttons">按扭名称</param>
        protected virtual void VtInitFreeToolsBarsByButtons(string buttons)
        {
            if (buttons == "")
            {
                return;
            }
            else
            {
                string[] arrBut = buttons.Split(',');
                if (arrBut.Length > 0)
                {
                    for(int i=0;i<arrBut .Length ;i++) 
                    {
                        PhToolbarsAddButton(arrBut[i]);
                    }
                }
            }
        }

        protected virtual void PhToolbarsAddButton(string button)
        {
            //根据单据状态设置工具栏按扭显示
            switch (button.ToLower().Trim())
            {
                case "tsbtnview"://查阅
                    NewTsbtnView();
                    phToolBars.Controls.Add(tsbtnView);
                    break;
                case "tsbtnnew"://新建
                    NewTsbtnNew();
                    phToolBars.Controls.Add(tsbtnNew);
                    break;
                case "tsbtnedit"://修改
                    NewTsbtnEdit();
                    phToolBars.Controls.Add(tsbtnEdit);
                    break;
                case "tsbtndelete"://删除
                    NewTsbtnDelete();
                    phToolBars.Controls.Add(tsbtnDelete);
                    break;
                case "tsbtnsave"://保存
                    NewTsbtnSave();
                    phToolBars.Controls.Add(tsbtnSave);
                    break;
                case "tsbtnsearch"://查询
                    NewTsbtnSearch();
                    phToolBars.Controls.Add(tsbtnSearch);
                    break;
                case "tsbtnclearcd"://清空条件
                    NewTsbtnClearCd();
                    phToolBars.Controls.Add(tsbtnClearCd);
                    break;
                case "tsbtnsubmit"://提交
                    NewTsbtnSubmit();
                    phToolBars.Controls.Add(tsbtnSubmit);
                    break;
                case "tsbtncancel"://撤消
                    NewTsbtnCancel();
                    phToolBars.Controls.Add(tsbtnCancel);
                    break;
                case "tsbtnsubcancel"://申请撤消
                    NewTsbtnSubCancel();
                    phToolBars.Controls.Add(tsbtnSubCancel);
                    break;
                case "tsbtnApprove"://审批
                    NewTsbtnApprove();
                    phToolBars.Controls.Add(tsbtnApprove);
                    break;
                case "tsbtnapprecord"://审批记录
                    NewTsbtnAppRecord();
                    phToolBars.Controls.Add(tsbtnAppRecord);
                    break;
                case "tsbtnprint"://打印
                    NewTsbtnPrint();
                    phToolBars.Controls.Add(tsbtnPrint);
                    break;
                case "tsbtnfresh"://刷新
                    NewTsbtnFresh(); 
                    phToolBars.Controls.Add(tsbtnFresh);
                    break;
                case "tsbtnexport"://导出
                    NewTsbtnExport();
                    phToolBars.Controls.Add(tsbtnExport);
                    break;
                case "tsbtnreturn"://返回
                    NewTsbtnReturn(); 
                    phToolBars.Controls.Add(tsbtnReturn);
                    break;
                case "tsbtnclose"://关闭
                    NewTsbtnClose();
                    phToolBars.Controls.Add(tsbtnClose);
                    break;
                case "tsbtncurcat"://新增本级栏目
                    NewTsbtnCurCat();
                    phToolBars.Controls.Add(tsbtnCurCat);
                    break;
                case "tsbtnnextcat"://新增下级栏目
                    NewTsbtnNextCat();
                    phToolBars.Controls.Add(tsbtnNextCat);
                    break;
                case "tsbtnmgt"://管理
                    NewTsbtnMgt();
                    phToolBars.Controls.Add(tsbtnMgt);
                    break;
                case "tsbtnhelp"://帮助
                    NewTsbtnHelp();
                    phToolBars.Controls.Add(tsbtnHelp);
                    break;
            }
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
        protected virtual void tsbtnApproval_Click(object sender, EventArgs e)
        {
            VtApproval();
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
        protected virtual void VtAfterSave() {
            VtShowTips("保存成功", "0", "0");
            VtCloseFreshClientEvent();
        }
        protected virtual void VtBeforeSearch() { }
        protected virtual void VtSearch() { }
        protected virtual void VtAfterSearch() { }

        protected virtual void VtBeforeClearCd() { }
        protected virtual void VtClearCd() { }
        protected virtual void VtAfterClearCd() { }

        protected virtual void VtBeforeSubmit() { }
        protected virtual void VtSubmit() { }
        protected virtual void VtAfterSubmit() {
            VtShowTips("提交成功", "0", "0");
            VtCloseFreshClientEvent();
        }

        protected virtual void VtBeforeCancel() { }
        protected virtual void VtCancel() { }
        protected virtual void VtAfterCancel() {
            VtShowTips("撤消成功", "0", "0");
            VtCloseFreshClientEvent();
        }

        protected virtual void VtBeforeSubCancel() { }
        protected virtual void VtSubCancel() { }
        protected virtual void VtAfterSubCancel() {
            VtShowTips("提交成功", "0", "0");
            VtCloseFreshClientEvent();
        }

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
        protected virtual void VtExport()
        {

        }
        protected virtual void VtReturn() { }
        protected virtual void VtClose()
        {
         //   ExtAspNet.PageContext.RegisterStartupScript(ExtAspNet.ActiveWindow.GetHideReference());
        }
        protected virtual void VtCurCat() { }
        protected virtual void VtNextCat() { }
        protected virtual void VtMgt() { }

        protected virtual void VtBeforeApproveYes() { }
        protected virtual void VtApproveYes() {
          
            VtApproveOrder("Y");
        }
        protected virtual void VtAfterApproveYes() {
            VtShowTips("审批成功", "0", "0");
            VtCloseFreshClientEvent();
        }

        protected virtual void VtBeforeApproveNo() { }
        protected virtual void VtApproveNo() {
            VtApproveOrder("N");
        }
        /// <summary>
        /// 单据审批
        /// </summary>
        /// <param name="AuditSign">同意=Y，不同意=N</param>
        protected virtual void VtApproveOrder(string AuditSign) { }
        protected virtual void VtAfterApproveNo() {
            VtShowTips("审批成功", "0", "0");
            VtCloseFreshClientEvent();
        }
        protected virtual void VtApproval() { }
        protected virtual void VtHelp() { }

        #endregion
        #region javascript 方法
        //帮助
        protected virtual void VtHelpFun(string MID)
        {

        }

        #endregion
        #region 权限
        /// <summary>
        /// 初化页面访问权限
        /// </summary>
        protected virtual void VtPageAccess()
        {

        }
        /// <summary>
        /// 初始化按扭权限
        /// </summary>
        protected virtual void VtButtonAccess()
        {

        }

        /// <summary>
        /// 初始化按扭显示,如果是mode =view 时，只显示基础按扭
        /// </summary>
        protected virtual void VtButtonShow()
        {
            PlaceHolder phToolBars = FindControl(Page, typeof(PlaceHolder), "phToolBars") as PlaceHolder;
            HiddenField hfMode = FindControl(Page, typeof(HiddenField), "hfMode") as HiddenField;
            if (hfMode != null && hfMode.Value == "view")
            {
                foreach (Control c in phToolBars.Controls)
                {
                    if (c != null && c.GetType() == typeof(Button))
                    {
                        if (c.ID != "tsbtnPrint" && c.ID != "tsbtnFresh" && c.ID != "tsbtnClose" && c.ID != "tsbtnHelp" && c.ID != "tsbtnReturn") //      
                        {
                            c.Visible = false;
                        }
                    }
 
                }
            }
        }

        /// <summary>
        /// 页面权限
        /// </summary>
        /// <param name="FunID">功能ID，可以用“，”号分隔开多个</param>
        protected void CheckPageAccess(string FunID)
        {
            bool IsPageAccess = false;
            if (FunID != "")
            {
                string[] arrFunID = FunID.Split(',');
                for (int i = 0; i < arrFunID.Length; i++)
                {
                    IsPageAccess = SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], arrFunID[i]);
                    if (IsPageAccess)
                    {
                        break;
                    }
                }
            }

            if (!IsPageAccess && HttpContext.Current.User.Identity.Name != "admin")
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
                    tsbtnSubmit.Enabled = false;
                    tsbtnSave.Enabled = true;
                    tsbtnCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    tsbtnApproval.Enabled = true;
                    break;
                case "UP"://审批中
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = false;
                    tsbtnCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    tsbtnApproval.Enabled = true;
                    break;
                case "Y"://审批同意
                    tsbtnSave.Enabled = false;
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

        protected  Control FindControl(Control control, Type controlType, string ToolbarName)
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

        //初始化客户端审批事件
        protected virtual void VtAppRecordClientEvent(string MID,string ID)
        {
            tsbtnAppRecord.OnClientClick = "openApproveList('" + MID + "','" + ID + "');return false";
        }
        //初始化客户端修改审批人事件
        protected virtual void VtAppApprovalClientEvent(string MID, string ID)
        {
            tsbtnApproval.OnClientClick = "openEditApproval('" + SfEmc.DoAppFlow.GetAuditRecID(ID, MID) + "');return false";
        }
        /// <summary>
        /// 关闭窗口事件
        /// </summary>
        protected virtual void VtCloseClientEvent()
        {
            tsbtnClose.OnClientClick = "parent.ClosePop();return false";
        }
         /// <summary>
        /// 新建窗口事件
        /// </summary>
        protected virtual void VtNewClientEvent()
        {
            
        }
        
         /// <summary>
        /// 返回窗口事件
        /// </summary>
        protected virtual void VtReturnClientEvent()
        {
            
        }
        

       /// <summary>
        /// 表单修改后的 关闭窗口事件
        /// </summary>
        protected virtual void VtCloseFreshClientEvent()
        {
            tsbtnClose.OnClientClick = "javascript:parent.window.location.href=parent.window.location.href;parent.ClosePop();return false";
        }
      
        /// <summary>
        /// 弹开窗口 jquery
        /// </summary>
        /// <param name="title">窗口标题</param>
        /// <param name="contentUrl">页面路径</param>
        /// <param name="width">窗口宽度</param>
        /// <param name="height">窗口高度</param>
        protected virtual void VtShowIframe(string title,string contentUrl,string width,string height)
        {
            if (width == "")
            {
                width = OpenWindWidth;
            }
            if (height == "")
            {
                height = OpenWindHeight;
            }
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>ShowIframe('" + title + "','" + contentUrl + "', '" + width + "', '" + height + "')</script>");
        }

        /// <summary>
        /// 弹开窗口 jquery
        /// </summary>
        /// <param name="title">窗口标题</param>
        /// <param name="parent">父窗口中弹开 parent. or parent.parent.</param>
        /// <param name="width">窗口宽度</param>
        /// <param name="width">窗口宽度</param>
        /// <param name="height">窗口高度</param>
        /// 
        protected virtual void VtShowIframe(string title, string contentUrl, string parent,string width, string height)
        {
            if (width == "")
            {
                width = OpenWindWidth;
            }
            if (height == "")
            {
                height = OpenWindHeight;
            }
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>" + parent + "ShowIframe('" + title + "','" + contentUrl + "', '" + width + "', '" + height + "')</script>");
        }

        /// <summary>
        /// 增加Tab页 jquery
        /// </summary>
        /// <param name="title">窗口标题</param>
        /// <param name="contentUrl">路径</param>
        /// <param name="icon">tab页图标</param>
        protected virtual void VtAddTabIframe(string title, string contentUrl, string icon)
        {

            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script> parent.addTab('" + title + "', '" + contentUrl + "', '" + icon + "');</script>");
        }

        /// <summary>
        /// 浮动DIV定时显示提示信息,如操作成功, 失败等 
        /// </summary>
        /// <param name="tips">string tips (提示的内容) </param>
        /// <param name="height"> height 显示的信息距离浏览器顶部的高度 </param>
        /// <param name="time"> 显示的时间(按秒算), time > 0</param>
        protected virtual void VtShowTips(string tips, string height, string  time)
        {
            if (OperateSuccess)
            {
                ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>showTips( '" + tips + "', " + height + ", " + time + " );</script>");
            }
        }
     
        protected override void OnLoad(EventArgs e)
        {
            Response.Cache.SetNoStore();
            base.OnLoad(e);
        }

        protected override void OnLoadComplete(EventArgs e)
        {
            VtButtonAccess();//工具栏按扭权限
            VtButtonShow();
            base.OnLoadComplete(e);
        }

        protected virtual void RadComboBoxUser_ItemsRequested(object sender, RadComboBoxItemsRequestedEventArgs e)
        {
            DataTable data = EmcCommon . GetUserListData(e.Text,Session ["FilialeID"].ToString ());
            int ItemsPerRequest = 10;
            int itemOffset = e.NumberOfItems;
            RadComboBox RadComboBox1 = (RadComboBox)sender;
            int endOffset = Math.Min(itemOffset + ItemsPerRequest, data.Rows.Count);
            // e.EndOfItems = endOffset == data.Rows.Count;
             
            

            for (int i = itemOffset; i < endOffset; i++)
            {
                RadComboBox1.Items.Add(new RadComboBoxItem(data.Rows[i]["CnName"].ToString(), data.Rows[i]["ID"].ToString()));                
            }
            //if (data != null && data.Rows.Count == 1)
            //{
            //    log.Debug(e.Text + "A:" + data.Rows.Count.ToString());
            //    RadComboBox1.Value = data.Rows[0]["ID"].ToString();
                 
            //    log.Debug(e.Text + "C:" + RadComboBox1.Value);
            //}
            //else
            //{
            //    log.Debug(e.Text + "B:" + data.Rows.Count.ToString());
            //    RadComboBox1.Value = "";
            //}
            e.Message = EmcCommon.GetStatusMessage(endOffset, data.Rows.Count);
        }

        protected virtual void RadComboBoxPost_ItemsRequested(object sender, RadComboBoxItemsRequestedEventArgs e)
        {
            DataTable data = EmcCommon.GetPostListData(e.Text, Session["FilialeID"].ToString());
            int ItemsPerRequest = 10;
            int itemOffset = e.NumberOfItems;
            RadComboBox RadComboBox1 = (RadComboBox)sender;
            int endOffset = Math.Min(itemOffset + ItemsPerRequest, data.Rows.Count);
            // e.EndOfItems = endOffset == data.Rows.Count;

            for (int i = itemOffset; i < endOffset; i++)
            {
                RadComboBox1.Items.Add(new RadComboBoxItem(data.Rows[i]["RefValue"].ToString(), data.Rows[i]["RefValueCode"].ToString()));

            }
 
            e.Message = EmcCommon.GetStatusMessage(endOffset, data.Rows.Count);
        }

    }
}
