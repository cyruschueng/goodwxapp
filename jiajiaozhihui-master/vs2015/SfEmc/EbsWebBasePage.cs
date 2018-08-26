﻿using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using SfSoft.SfEmc;

namespace SfSoft.SfEmc
{
   
  public   class EbsWebBasePage : System.Web.UI.Page
    {
        public string StopCopyStr1 = "";
        public string StopCopyStr2 = "";

      public string InfoMID = "";//信息模块1级ID
      public string InfoCatID = "";//信息模块当前级ID
      public string ProMID = "";//产品模块1级ID
      public string PorCatID = "";//产品信息模块当前级ID
      protected virtual void  Page_Init(object sender, EventArgs e)
      {
          if (Application["IsSiteStart"].ToString() != "1")
          {
              Response.Write("<center>网站更新中...</center>");
              Response.End();
          }

          if (Request.Params["InfoCatID"] != null)
          {
              InfoCatID = Request.Params["InfoCatID"].ToString();
          }
          if (Request.QueryString["InfoMID"] != null)
          {
              InfoMID = Request.QueryString["InfoMID"].ToString();

          }

          if (Application["IsSiteCopy"].ToString() != "1")
          {
              StopCopyStr1 = " oncontextmenu=\"self.event.returnValue=false\"  ondragstart=\"return false\" onselectstart =\"return false\" onselect=\"document.selection.empty()\" oncopy=\"document.selection.empty()\" onbeforecopy=\"return false\" onmouseup=\"document.selection.empty()\"";
              StopCopyStr2 = "<noscript><iframe src=\" * \"></iframe></noscript>";
          }
          else
          {
              StopCopyStr1 = "";
              StopCopyStr2 = "";
          }
 
 
      }


      /// <summary>
      /// 取的当前信息栏目ID
      /// </summary>
      /// <returns></returns>
      //public virtual  string GetInfoCatName()
      //{
      //    //string _infoid = InfoCatID;
      //    //if (_infoid == "")
      //    //{
      //    //    _infoid=InfoMID ;
      //    //}

      //    //if (_infoid == "")
      //    //{
      //    //    return "";
      //    //}
      //    //string InfoCatName = SanbaoEbs.EbsCommon.GetCatNameByCatID(_infoid);
      //    //return InfoCatName;

      //}
    }
}
