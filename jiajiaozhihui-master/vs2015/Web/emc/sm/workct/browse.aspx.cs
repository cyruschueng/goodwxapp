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
using SfSoft.SfEmc;
using SfSoft.Common;
using SfSoft.DBUtility;
namespace SfSoft.web.emc.sm.workct
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                EmcCommon.GetUsersIDDropDownList(ddlOldMan, Session["FilialeID"].ToString());
                EmcCommon.GetUsersIDDropDownList(ddlNewMan, Session["FilialeID"].ToString());
                BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
                string strWhere = " isFiliale='0' or isFiliale='1' ";
                DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];

                ListItem li = new ListItem();
                li.Text = "--所有公司--";
                li.Value = "--";
                ddlFw.Items.Add(li);
                foreach (DataRow dr in dtNodeSets.Rows)
                {
                    li = new ListItem();
                    li.Text = dr["DeptName"].ToString();
                    li.Value = dr["DeptID"].ToString();
                    if (dr["DeptID"].ToString() == Session["FilialeID"].ToString())
                    {
                        li.Selected = true;
                    }
                    ddlFw.Items.Add(li);
                }

            }
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars ();
            tsbtnSave.OnClientClick = "return (confirm('确认是否交接!'))";
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.workct";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.workct.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        protected override  void VtCloseFreshClientEvent()
        {
            
        }
        protected override void VtSave()
        {
            if (ddlOldMan.SelectedItem.Value == "--")
            {
                MessageBox.Show(this, "被交接人不能为空!");
                return;
            }
            if (ddlNewMan.SelectedItem.Value == "--")
            {
                MessageBox.Show(this, "现交接人不能为空!");
                return;
            }
            string OldManID = ddlOldMan.SelectedItem.Value;
            string OldMan = ddlOldMan.SelectedItem.Text;
            string NewManID = ddlNewMan.SelectedItem.Value;
            string NewMan = ddlNewMan.SelectedItem.Text;

            string sqlup = "";
            string FwID = ddlFw.SelectedItem.Value;
            string strWhere = "";
            if (FwID != "--")
            {
                strWhere = " and FilialeID='" + FwID + "'";
            }
            string isSelect = "0";
           //任务管理
            if (cbTask.Checked)
            {
                //只有进行中或未提交的才要交接
                //更新执行人
                sqlup = "update Emc_RcmTask set DoMan='" + NewMan + "',DoManID='" + NewManID + "' where DoManID='" + OldManID + "' and (Status='1' or Status='3')" + strWhere;
                DbHelperSQL.ExecuteSql(sqlup);
                sqlup = "update Emc_RcmTask_List set UserName='" + NewMan + "',UserID='" + NewManID + "' where UserID='" + OldManID + "' and (FlowStatus='1' or FlowStatus='3')" + strWhere;
                DbHelperSQL.ExecuteSql(sqlup);
 
                isSelect = "1";
            }
            //审批事务
            if (cbToDo.Checked)
            {
                //更新待审批人
                sqlup = "update Pub_AuditRec set AuditName='" + NewMan + "',AuditUserID='" + NewManID + "' where AuditUserID='" + OldManID + "' and (StatusFlag='S' or StatusFlag='UP')" + strWhere;
                DbHelperSQL.ExecuteSql(sqlup);
                isSelect = "1";
            }
            //审批流程
            if (cbWorkFlow.Checked)
            {
                //更新审批人
                sqlup = "update Pub_AuditFlow set AuditName='" + NewMan + "',AuditUserID='" + NewManID + "' where AuditUserID='" + OldManID + "'" + strWhere;
                DbHelperSQL.ExecuteSql(sqlup);
                isSelect = "1";
            }
            //数据权限
            if (cbDataAcl.Checked)
            {
                sqlup = "update  Pub_Data_Acl_Users set uid='" + NewManID + "' where uid='" + OldManID + "'";
                if (FwID != "--")
                {
                    sqlup += " and DataAclID in (select DataAclID from Pub_Data_doc where FilialeID='"+FwID +"')";
                }
                DbHelperSQL.ExecuteSql(sqlup);
                isSelect = "1";
            }
            //功能权限
            if (cbFunAcl.Checked)
            {
                string NewUserName = EmcCommon.getUserNameByID(NewManID);
                string OldUserName = EmcCommon.getUserNameByID(OldManID);
                string NewUserID=EmcCommon.getUserGUIDByID(NewManID);

                //角色列表
                string sqls= "select RoleID,RoleName from aspnet_Roles ";
                if (FwID != "--")
                {
                    sqls += " where RoleID in (select RoleID from Pub_Roles_Company where FilialeID='" + FwID + "')";
                }
                string sqls1 = "select UserId, RoleId from aspnet_UsersInRoles  where UserId='" + NewUserID + "'";
                DataSet ds1=DbHelperSQL.Query(sqls1);
                DataView dv = new DataView (ds1.Tables[0]);
                DataSet ds = DbHelperSQL.Query(sqls);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        string RoleName = dr["RoleName"].ToString();
                        string RoleID = dr["RoleID"].ToString();
                        string[] users;
                        users = Roles.FindUsersInRole(RoleName, OldUserName);
                        for (int i = 0; i < users.Length; i++)
                        {
                            if (users[i].ToString() == OldUserName)
                            {
                                dv.RowFilter = "RoleId='" + RoleID + "' ";
                                if (dv.Count < 1)//如果用户不存在角色中
                                {
                                    Roles.AddUserToRole(NewUserName, RoleName);
                                }
                                Roles.RemoveUserFromRole(OldUserName, RoleName);
                                break;
                            }
                        }
                    }
                }
                 
                isSelect = "1";
            }
            if (isSelect == "0")
            {
                MessageBox.Show(this, "没有选择交接功能!");
            }
            else
            {
                lblMsg.Text = "工作交接成功！";
            }
        }
    }
}


