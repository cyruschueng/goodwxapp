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
  public   class EmcBrowseBasePage : EmcBasePage
    {
      YYControls.SmartGridView GridView1 = null;

      protected void Page_Init(object sender, EventArgs e)
      {
         // phScToolBars = FindControl(Page, typeof(PlaceHolder), "phScToolBars") as PlaceHolder;
          GridView1 = FindControl(Page, typeof(YYControls.SmartGridView), "GridView1") as YYControls.SmartGridView;
          base.Page_Init(sender, e);

      }

      protected override void VtInitToolbars()
      {
          VtInitListToolsBars();
          tsbtnDelete.Visible = false;
      }
      protected override void VtInitBaseToolsBars()
      {
          VtInitBaseListToolsBars();
      }
      /// <summary>
      /// 新建军窗口事件
      /// </summary>
      protected override void VtNewClientEvent()
      {

          tsbtnNew.OnClientClick = "Add_Form();return false";
      }
      protected virtual  void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
      {
          string Topic = "";
          if (e.Row.RowType == DataControlRowType.DataRow)
          {
              Topic = e.Row.Cells[2].Text.Trim();
              if (Topic != "" && Topic.Length > 25)
              {
                  Topic = Topic.Substring(0, 25) + "...";
              }
              string url = "update.aspx?mode=update&ID=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString();
              e.Row.Cells[2].Text = "<a href =" + url + "><font color=#2828FF>" + Topic + "</font></a>";
          }
      }

      #region 操作方法
      //查阅
      protected override void VtView()
      {

          string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, false);
          if (ID == "")
          {
              return;
          }
          VtShowIframe("查阅", "update.aspx?mode=view&ID=" + ID, "", "");
      }

      /// <summary>
      /// 新建
      /// </summary>
      protected override void VtNew()
      {
          VtShowIframe("新建", "update.aspx?mode=add&ID=", "", "");
      }

      /// <summary>
      /// 修改
      /// </summary>
      protected override void VtEdit()
      {
          string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, false);
          if (ID == "")
          {
              return;
          }
          VtShowIframe("详细", "update.aspx?mode=update&ID=" + ID, "", "");
      }



      //返回
      protected override void VtReturn()
      {
          Response.Write("<script >parent.document.location='browse.aspx';</script>");
      }



      #endregion
    }
}
