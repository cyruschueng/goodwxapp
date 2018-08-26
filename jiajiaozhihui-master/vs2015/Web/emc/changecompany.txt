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
using SfSoft.SfEmc;
namespace SfSoft.web.emc
{
    public partial class changecompany : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
                string strWhere = "a.UserID = '" + Session["Uid"].ToString() + "' and a.DeptID<>'" + Session["DeptID"].ToString() + "'";
                DataSet dsdu = blldu.GetPluraList(strWhere);
                GridView1.DataSource = dsdu;
                GridView1.DataBind();

            }
        }
        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Session["FilialeID"] = null;
            Session["DeptName"] = null;
            Session["FilialeName"] = null;
            Session["DeptID"] = null;
 
            //取的公司ID 
            string FilialeID = GridView1.DataKeys[e.NewEditIndex].Value.ToString();
            string FilialeName = "";
            //更新登录信息
            string userName = HttpContext.Current.User.Identity.Name; 
            string userID = "";
            string Uid = Session["Uid"].ToString();
            string DeptID = "";
            string DeptName = "";
            string CnName = Session["CnName"].ToString();
            MembershipUser user = Membership.GetUser(userName);
            userID = user.ProviderUserKey.ToString();
            /*
            BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
            string strWhere = " a.UserName = '" + userName + "'";
            DataSet EmpDs = bllEmp.GetUsersInfoList(strWhere);
            //取的用户GUID 
            foreach (DataRow emdr in EmpDs.Tables[0].Rows)
            {
                userID = emdr["UserID"].ToString().Trim();
                Uid = emdr["ID"].ToString().Trim();
                CnName = emdr["CnName"].ToString().Trim();
            }*/

            //取出用户所在的部门信息和公司ID
            Hashtable hashdp = new Hashtable();
            hashdp = EmcCommon.getDeptInfoByUserID(Uid, FilialeID);
            if (hashdp != null)
            {
 
                DeptName = hashdp["DeptName"].ToString();
                DeptID = hashdp["DeptID"].ToString();
            }

            //取的公司名称
            FilialeName = SfEmc.EmcCommon.getDeptNameByID(Common.Common.stringToInt(FilialeID));

            Session["FilialeID"] = FilialeID;
            Session["DeptName"] = DeptName;
            Session["FilialeName"] = FilialeName;
            Session["DeptID"] = DeptID;
            Session["UserAcldv"] = null;
            //取的角色权限
            BLL.Pub_Roles_Fun bllrf = new BLL.Pub_Roles_Fun();
            DataSet dsrf = bllrf.GetUsersFun(userID, FilialeID);
            DataView UserAcldv = new DataView(dsrf.Tables[0]);

            Session["UserAcldv"] = UserAcldv;
            relogin(this);
            
        }

        public  void relogin(System.Web.UI.Page page)
        {
            System.Text.StringBuilder rStr = new System.Text.StringBuilder();

            rStr.Append("<script language='JavaScript'>\n");
            rStr.Append("parent.window.location.reload();\n");
            rStr.Append("parent.ClosePop();\n");
 
            rStr.Append("</script>");
            page.ClientScript.RegisterStartupScript(page.GetType(), "reloign", rStr.ToString());
        }

 

    }
}


