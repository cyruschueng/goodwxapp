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

namespace SfSoft.web.emc.sm.s6
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //重新绑定数据
                BindData(" a.UserDeptKind='0'");
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s6";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s6.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        protected void btn_addTo_Click(object sender, EventArgs e)
        {
            string strErr = "";

            if (this.hfUserID.Value == "")
            {
                strErr += "兼职人不能为空！\\n";
            }
            if (this.hfDeptID.Value == "")
            {
                strErr += "兼职部门不能为空！\\n";
            }
            Model.Pub_DeptUsers modeldu = new Model.Pub_DeptUsers();
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            BLL.Pub_Dept blldp = new BLL.Pub_Dept ();
           
            modeldu.UserID =  Common.Common.stringToInt(hfUserID.Value);
            modeldu.DeptID =  Common.Common.stringToInt(hfDeptID.Value);
            modeldu.PostName = rcbPostName.Text;
            modeldu.PostID = rcbPostName.Value;
            string  FilialeID= "";
            //根据部门ID取的所在公司ID
            Model.Pub_Dept modeldp = blldp.GetModel(Common.Common.stringToInt(hfDeptID.Value));
            if (modeldp!=null) 
            {
                FilialeID = modeldp.FilialeID;
            }
            modeldu.FilialeID =  Common.Common.stringToInt(FilialeID);
            modeldu.UserDeptKind = "0";
            blldu.Add(modeldu);
            txtCnName.Text = "";
            txtDeptName.Text = "";
            hfDeptID.Value = "";
            hfUserID.Value = "";
            rcbPostName.Text = "";
            rcbPostName.Value = "";
            //重新绑定数据
            BindData(" a.UserDeptKind='0'");
        }

        private void BindData(string strWhere)
        {
            BLL.Pub_DeptUsers bll = new BLL.Pub_DeptUsers();
            DataSet ds = bll.GetPluraList(strWhere);
            GridView1.DataSource = ds;
            GridView1.DataBind();


        }

        //删除
        protected void LinkButtonClick(object sender, CommandEventArgs e)
        {

            //处理角色的删除
            if (e.CommandName.Equals("DeleteUser"))
            {
                //删除用户基本信息
                string ID = e.CommandArgument.ToString();
                BLL.Pub_DeptUsers bllDu = new BLL.Pub_DeptUsers();
                bllDu.Delete(Common.Common.stringToInt(ID));
 
                //重新绑定数据
                BindData(" a.UserDeptKind='0'");
            }
        }
    }

}


