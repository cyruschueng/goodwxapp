using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
namespace SfSoft.Common
{
    /// <summary>
    /// OpenWindow 的摘要说明。
    /// </summary>
    public class OpenWindow
    {
        public OpenWindow()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }

        #region  打开一个窗口，并且这个窗口位于最前面
        /// <summary>
        /// 打开一个窗口，并且这个窗口位于最前面
        /// </summary>
        /// <param name="page">提用的页面</param>
        /// <param name="URL">要打开的URL</param>
        /// <param name="PageName">要打开页面的名称</param>
        /// <param name="Win_Width">窗口宽度</param>
        /// <param name="Win_Hight">窗口高度</param>
        /// <param name="Left">窗口左侧位置</param>
        /// <param name="Top">窗口右侧位置</param>
        /// <param name="CenterFlag">是否右中 yes/no</param>
        /// <param name="Status">是否显示状态栏 yes/no</param>
        /// <param name="ParentFlag">true:不关闭弹出窗口，将不能操作父窗口 false 可以操作父窗口</param>
        public static void OpenNewWinodw(Page page, string URL, string PageName, string Win_Width, string Win_Hight, string Left, string Top, string CenterFlag, string Status, bool ParentFlag)
        {

            string scriptstr = "";
            if (ParentFlag)
            {
                scriptstr = "<script language=javascript>showModalDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:" + CenterFlag.ToString() + ";help:no;resizeable:yes;status:" + Status + "')</script>";
            }
            else
            {
                scriptstr = "<script language=javascript>showModelessDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:" + CenterFlag.ToString() + ";help:no;resizeable:yes;status:" + Status + "')</script>";
            }
            page.Response.Write(scriptstr);
        }
        /// <summary>
        /// 打开一个窗口，并且这个窗口位于最前面，不关闭，将不能操作父窗口
        /// </summary>
        /// <param name="page">提用的页面</param>
        /// <param name="URL">要打开的URL</param>
        /// <param name="PageName">要打开页面的名称</param>
        /// <param name="Win_Width">窗口宽度</param>
        /// <param name="Win_Hight">窗口高度</param>
        /// <param name="Left">窗口左侧位置</param>
        /// <param name="Top">窗口右侧位置</param>
        /// <param name="CenterFlag">是否右中 yes/no</param>
        /// <param name="ParentFlag">true:不关闭弹出窗口，将不能操作父窗口 false 可以操作父窗口</param> 
        public static void OpenNewWinodw(Page page, string URL, string PageName, string Win_Width, string Win_Hight, string Left, string Top, string CenterFlag, bool ParentFlag)
        {
            string scriptstr = "";
            if (ParentFlag)
            {
                scriptstr = "<script language=javascript>showModalDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:" + CenterFlag + ";help:no;resizeable:yes;status:no')</script>";
            }
            else
            {
                scriptstr = "<script language=javascript>showModelessDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:" + CenterFlag + ";help:no;resizeable:yes;status:no')</script>";
            }
            page.Response.Write(scriptstr);
        }

        /// <summary>
        /// 打开一个窗口，并且这个窗口位于最前面，不关闭，将不能操作父窗口
        /// </summary>
        /// <param name="page">提用的页面</param>
        /// <param name="URL">要打开的URL</param>
        /// <param name="PageName">要打开页面的名称</param>
        /// <param name="Win_Width">窗口宽度</param>
        /// <param name="Win_Hight">窗口高度</param>
        /// <param name="Left">窗口左侧位置</param>
        /// <param name="Top">窗口右侧位置</param>
        /// <param name="ParentFlag">true:不关闭弹出窗口，将不能操作父窗口 false 可以操作父窗口</param>
        public static void OpenNewWinodw(Page page, string URL, string PageName, string Win_Width, string Win_Hight, string Left, string Top, bool ParentFlag)
        {
            string scriptstr = "";
            if (ParentFlag)
            {
                scriptstr = "<script language=javascript>showModalDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:no;help:no;resizeable:yes;status:no')</script>";
            }
            else
            {
                scriptstr = "<script language=javascript>showModelessDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:" + Left + "px;dialogTop:" + Top + "px;center:no;help:no;resizeable:yes;status:no')</script>";

            }
            page.Response.Write(scriptstr);
        }

        /// <summary>
        /// 打开一个窗口，并且这个窗口位于最前面，不关闭，将不能操作父窗口
        /// </summary>
        /// <param name="page">提用的页面</param>
        /// <param name="URL">要打开的URL</param>
        /// <param name="PageName">要打开页面的名称</param>
        /// <param name="Win_Width">窗口宽度</param>
        /// <param name="Win_Hight">窗口高度</param>
        /// <param name="ParentFlag">true:不关闭弹出窗口，将不能操作父窗口 false 可以操作父窗口</param>
        public static void OpenNewWinodw(Page page, string URL, string PageName, string Win_Width, string Win_Hight, bool ParentFlag)
        {
            string scriptstr = "";
            if (ParentFlag)
            {
                scriptstr = "<script language=javascript>showModalDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:0px;dialogTop:0px;center:no;help:no;resizeable:yes;status:no')</script>";
            }
            else
            {
                scriptstr = "<script language=javascript>showModelessDialog('" + URL + "','" + PageName + "','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:0px;dialogTop:0px;center:no;help:no;resizeable:yes;status:no')</script>";
            }
            page.Response.Write(scriptstr);
        }
        /// <summary>
        /// 打开一个窗口，并且这个窗口位于最前面，不关闭，将不能操作父窗口
        /// </summary>
        /// <param name="page">提用的页面</param>
        /// <param name="URL">要打开的URL</param>
        /// <param name="Win_Width">窗口宽度</param>
        /// <param name="Win_Hight">窗口高度</param>
        /// <param name="ParentFlag">true:不关闭弹出窗口，将不能操作父窗口 false 可以操作父窗口</param>
        public static void OpenNewWinodw(Page page, string URL, string Win_Width, string Win_Hight, bool ParentFlag)
        {
            string scriptstr = "";
            if (ParentFlag)
            {
                scriptstr = "<script language=javascript>showModalDialog('" + URL + "','','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:0px;dialogTop:0px;center:no;help:no;resizeable:yes;status:no')</script>";
            }
            else
            {
                scriptstr = "<script language=javascript>showModelessDialog('" + URL + "','','dialogWidth:" + Win_Width + "px;"
                    + "dialogHeight:" + Win_Hight + "px;dialogLeft:0px;dialogTop:0px;center:no;help:no;resizeable:yes;status:no')</script>";
            }
            page.Response.Write(scriptstr);
        }
        #endregion




    }
}
