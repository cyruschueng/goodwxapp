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

namespace SfSoft.SfEmc
{
    public class EmcDetailPage : EmcBasePage 
    {
        protected HiddenField hfFromPage = new HiddenField();//从哪个页面过来的
        /// <summary>
        /// 关闭窗口事件
        /// </summary>
        protected override  void VtCloseClientEvent()
        {
            tsbtnClose.OnClientClick = "parent.tabCurClose();return false";
        }
        /// <summary>
        /// 表单修改后的 关闭窗口事件
        /// </summary>
        protected override void VtCloseFreshClientEvent()
        {
           
        }
        /// <summary>
        /// 返回窗口事件
        /// </summary>
        protected override  void VtReturnClientEvent()
        {
            tsbtnReturn.OnClientClick = "Return_List();return false";
            
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
            NewTsbtnReturn();
            tsbtnReturn.ToolTip = "返回列表";
            phToolBars.Controls.Add(tsbtnReturn);
            NewTsbtnClose();
            tsbtnClose.ToolTip = "关闭窗口";
            phToolBars.Controls.Add(tsbtnClose);
            NewTsbtnHelp();
            phToolBars.Controls.Add(tsbtnHelp);
        }
    }
}
