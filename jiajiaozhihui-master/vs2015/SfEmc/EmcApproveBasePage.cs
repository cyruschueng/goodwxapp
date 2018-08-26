﻿using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using System.Collections.Generic;
using YYControls;

namespace SfSoft.SfEmc
{
    public class EmcApproveBasePage : EmcDetailPage 
    {
        protected void Page_Init(object sender, EventArgs e)
        {
            phAppToolBars = FindControl(Page, typeof(PlaceHolder), "phAppToolBars") as PlaceHolder;
            base.Page_Init(sender, e);
  
        }


        protected override void VtInitToolbars()
        {
            VtInitApproveEditPageToolbars();
             
        }
        protected override void VtInitOthersToolbars()
        {
           // NewTsbtnReturn();
           // phToolBars.Controls.Add(tsbtnReturn);
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        /// <summary>
        /// 返回窗口事件
        /// </summary>
        protected override void VtReturnClientEvent()
        {
            tsbtnReturn.OnClientClick = "AppReturn_List();return false";

        }
        //返回
        protected override void VtReturn()
        {
           // Response.Write("<script >window.open('list.aspx?state=mgt&ID=','_self','');</script>");
        }

        /// <summary>
        /// 验证权限及审批
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        /// <param name="status">审批状态</param>
        /// <param name="FunID">功能管理ID</param>
        /// <param name="creator">单据建立者ID</param>
        /// <param name="UserID">申请人ID</param>
        protected virtual void VtButtonAndAccess(string DocID, string MID, string status, string FunID, string creator,string  UserID) 
        {
            BLL.Pub_AuditRec bllPAR = new BLL.Pub_AuditRec();
            Model.Pub_AuditRec model = bllPAR.GetModel(MID, DocID);
            string StatusFlag = "";
            string UndoFlag = "";
            if (model != null)
            {
                StatusFlag = model.StatusFlag;
                UndoFlag = model.UndoFlag;
            }

            bool isApprove = false;
            if (status == "S" || status == "UP" ||  (StatusFlag=="S" && UndoFlag =="UNS"))
            {
                isApprove = SfEmc.DoAppFlow.CheckCurApproval(DocID, MID, Session["Uid"].ToString());//是否为审批人
            }
            bool isApproval = SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], "emc.rcm.todo.mgt");//是否为审批管理员
            bool isMoudlesMgt = false;
            if (FunID != "")
            {
                isMoudlesMgt = SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], FunID);//是否为功能管理员
            }
            bool isCreator =  creator == Session["Uid"].ToString();//是否单据建立者
            bool isUserID =  UserID  == Session["Uid"].ToString();//是否申请人

  
 

            //if (!isApproved && !isApprove && !isApproval && !isMoudlesMgt && !isUserID && !isCreator && status != "SN" && status != "NS" && status != "UN")
            //{
            //     Response.Redirect("/emc/message.aspx?msg=数据访问权限");
            //}

            tsbtnApprove.Enabled = (isApprove) && (status  == "S" || status  == "UP" || (StatusFlag=="S" && UndoFlag =="UNS")) ; //设置 审批按扭 是当前审批人+(审批状态=待审 or =审批中 or 审批记录的审批状态=申请且撤消标志=申请撤消)
            tsbtnApproval.Enabled = (isApproval || isApprove) && (status == "S" || status == "UP" || (StatusFlag == "S" && UndoFlag == "UNS"));//设置修改审批人按扭   (是当前审批人 or 审批管理员) +(审批状态=待审 or =审批中)
        }

        /// <summary>
        /// 执行审批及获取审批结论
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">模块ID</param>
        /// <param name="AuditSign">审批结论</param>
        /// <returns></returns>
        protected virtual Hashtable GetAppInfoHash(string DocID, string MID, string AuditSign)
        {
            TextBox txtContral = FindControl(Page, typeof(TextBox), "txtContral") as TextBox;
            TextBox txtAuditorCmnt = FindControl(Page, typeof(TextBox), "txtAuditorCmnt") as TextBox;
           return  DoAppFlow.AuditDoApp(DocID, MID, AuditSign, txtContral.Text, txtAuditorCmnt.Text);
        }
    }
}
