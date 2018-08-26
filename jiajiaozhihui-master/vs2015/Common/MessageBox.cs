using System;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.Common
{
    /// <summary>
    /// 显示消息提示对话框。

    /// 李天平

    /// 2005.10.1
    /// </summary>
    public class MessageBox
    {

        #region "Private Variables"
        private string _M_Title = "信息提示标题";
        private string _M_Body = "信息提示内容";
        private Icon_Type _M_IconType = Icon_Type.OK;
        private List<sys_NavigationUrl> _M_ButtonList = new List<sys_NavigationUrl>();
        private int _M_Type = 1;
        private bool _M_WriteToDB = true;
        private string _M_ReturnScript;
        #endregion

        #region "Public Variables"
        /// <summary>
        /// 信息提示标题
        /// </summary>
        public string M_Title
        {
            get
            {
                return _M_Title;
            }
            set
            {
                _M_Title = value;
            }
        }

        /// <summary>
        /// 信息提示内容
        /// </summary>
        public string M_Body
        {
            get
            {
                return _M_Body;
            }
            set
            {
                _M_Body = value;
            }
        }

        /// <summary>
        /// 信息提示图标类型
        /// </summary>
        public Icon_Type M_IconType
        {
            get
            {
                return _M_IconType;
            }
            set
            {
                _M_IconType = value;
            }
        }

        /// <summary>
        /// 按钮列表
        /// </summary>
        public List<sys_NavigationUrl> M_ButtonList
        {
            get
            {
                return _M_ButtonList;
            }
            set
            {
                _M_ButtonList = value;
            }
        }
        /// <summary>
        /// 信息类型: 1操作日志,2安全日志,3访问日志 (默认1)
        /// </summary>
        public int M_Type
        {
            get
            {
                return _M_Type;
            }
            set
            {
                _M_Type = value;
            }
        }

        /// <summary>
        /// 是否需要写入当前日志数据库,默认为true
        /// </summary>
        public bool M_WriteToDB
        {
            get
            {
                return _M_WriteToDB;
            }
            set
            {
                _M_WriteToDB = value;
            }
        }

        /// <summary>
        /// 执行Script脚本字符串(需加<script></script>)
        /// </summary>
        public string M_ReturnScript
        {
            get
            {
                return _M_ReturnScript;
            }
            set
            {
                _M_ReturnScript = value;
            }
        }

        #endregion

        /// <summary>
        /// 根据日志ID返回日志类型
        /// </summary>
        /// <param name="E_Type">日志ID</param>
        /// <returns></returns>
        public static string Get_Type(int E_Type)
        {
            if (E_Type == 1)
                return "操作日记";
            else if (E_Type == 2)
                return "安全日志";
            else if (E_Type == 3)
                return "访问日志";
            else
                return "未知类型" + E_Type.ToString();
        }

        private MessageBox()
        {
        }

        /// <summary>
        /// 显示消息提示对话框


        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        public static void Show(System.Web.UI.Page page, string msg)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", "<script language='javascript' defer>alert('" + msg.ToString() + "');</script>");
        }


        /// <summary>
        /// 控件点击 消息确认提示框


        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        public static void ShowConfirm(System.Web.UI.WebControls.WebControl Control, string msg)
        {
            //Control.Attributes.Add("onClick","if (!window.confirm('"+msg+"')){return false;}");
            Control.Attributes.Add("onclick", "return confirm('" + msg + "');");
        }

        /// <summary>
        /// 显示消息提示对话框，并进行页面跳转


        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="msg">提示信息</param>
        /// <param name="url">跳转的目标URL</param>
        public static void ShowAndRedirect(System.Web.UI.Page page, string msg, string url)
        {
            StringBuilder Builder = new StringBuilder();
            Builder.Append("<script language='javascript' defer>");
            Builder.AppendFormat("alert('{0}');", msg);
            Builder.AppendFormat("top.location.href='{0}'", url);
            Builder.Append("</script>");
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", Builder.ToString());

        }
        /// <summary>
        /// 输出自定义脚本信息


        /// </summary>
        /// <param name="page">当前页面指针，一般为this</param>
        /// <param name="script">输出脚本</param>
        public static void ResponseScript(System.Web.UI.Page page, string script)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), "message", "<script language='javascript' defer>" + script + "</script>");

        }

    }
    #region "提示框图标类型"

    /// <summary>
    /// 提示Icon类型
    /// </summary>
    public enum Icon_Type : byte
    {
        /// <summary>
        /// 操作成功
        /// </summary>
        OK,
        /// <summary>
        /// 操作标示
        /// </summary>
        Alert,
        /// <summary>
        /// 操作失败
        /// </summary>
        Error
    }
    #endregion

}
