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
using SfSoft.Common;

namespace SfSoft.web.emc.Yuedu.like
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.yuedu.like";
        }
        protected override void VtPageAccess()
        {
            //CheckPageAccess("emc.zxs.theme.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        private void Like()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            if (Convert.ToDateTime(txtMiniDate.Text) > Convert.ToDateTime(txtMaxDate.Text)) {
                string v = txtMiniDate.Text;
                txtMiniDate.Text = txtMaxDate.Text;
                txtMaxDate.Text = v;
            }
            Random rd = new Random();
            try
            {
                SfSoft.BLL.WX_Yuedu_File bll = new BLL.WX_Yuedu_File();
                var list = bll.GetModelList("CreateDate between '" + txtMiniDate.Text + "' and '" + txtMaxDate.Text + " 23:59:59'");
                foreach (var model in list)
                {
                    int v = rd.Next(1, Convert.ToInt32(txtMaxValue.Text));
                    model.LikeNumber = (model.LikeNumber ?? 0) + v;
                    bll.Update(model);
                }
                MessageBox.Show(this, "完成");
                OperateSuccess = true;
            }
            catch (Exception ex) {
                MessageBox.Show(this, "失败");
                OperateSuccess = false;
            }
        }
        private string checkform()
        {
            string strErr = "";
            if (string.IsNullOrEmpty(txtMaxDate.Text)) {
                strErr += "日期上限不能为空！\\n";
            }
            if (string.IsNullOrEmpty(txtMiniDate.Text)) {
                strErr += "日期下限不能为空！\\n";
            }
            if (string.IsNullOrEmpty(txtMaxValue.Text)) {
                strErr += "最大点赞数不能为空！\\n";
            }
            return strErr;
        }

        protected void btnOk_Click(object sender, EventArgs e)
        {
            Like();
        }
    }
}


