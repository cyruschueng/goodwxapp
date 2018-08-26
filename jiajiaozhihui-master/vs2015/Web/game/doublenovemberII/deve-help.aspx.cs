using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class deve_help : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnConvert_Click(object sender, EventArgs e)
        {
            try
            {
                if (rblSel.SelectedValue == "1")
                {
                    if (txtOpenID.Text != "")
                    {
                        
                        txtConvertOpenID.Text = DEncrypt.Encrypt(txtOpenID.Text, ShenerWeiXin.WXConfig.EncryptKey);
                    }
                }
                else
                {
                    if (txtOpenID.Text != "")
                    {
                        txtConvertOpenID.Text = DEncrypt.Decrypt(txtOpenID.Text, ShenerWeiXin.WXConfig.EncryptKey);
                    }
                }
            }
            catch (Exception ex) {
                txtConvertOpenID.Text = "出错";
            }
        }
    }
}
