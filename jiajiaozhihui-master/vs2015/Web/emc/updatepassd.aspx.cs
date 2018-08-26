using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Text.RegularExpressions;

namespace SfSoft.web.emc
{
    public partial class updatepassd : SfSoft .SfEmc .EmcBasePage 
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string userName =   HttpContext.Current.User.Identity.Name;
                Lbl_UserName.Text = userName;
            }
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars ();
        }
        protected void btn_SecUpdate_Click(object sender, EventArgs e)
        {
            MembershipUser user = Membership.GetUser(Lbl_UserName.Text );
            try
            {
                 Regex r = new Regex("^(?!\\D+$)(?![^a-zA-Z]+$).{6,16}$"); 
                 Match m = r.Match(txt_NewPassword.Text);
                 if (m.Success==false)
                 {
                     lbl_Tips.Text = "须同时包含字母、数字；密码长度为6-16个字符";
                     return;
                 }
                if (user.ChangePassword(txt_OldPassword.Text, txt_NewPassword.Text))
                {
                    lbl_Tips.Text = "成功：密码修改成功!";
                }
                else
                {
                    lbl_Tips.Text = "错误：原密码错误，请重新输入";
                }
            }
            catch (Exception ex)
            {
                lbl_Tips.Text = ex.Message;
            }
        }
    }
}


