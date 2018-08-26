﻿using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.BLL;
using SfSoft.SfEmc;
namespace SfSoft.web.emc.group.role
{
    public partial class browse :SfSoft.SfEmc .EmcBasePage 
    {
        BLL.Pub_Modules_Fun bllfun = new BLL.Pub_Modules_Fun();
        BLL.Pub_Roles_Fun bllrols = new BLL.Pub_Roles_Fun();
        
        Model.Pub_Roles_Fun modelrols = new Model.Pub_Roles_Fun();
        Model.aspnet_Roles modelasproles = new Model.aspnet_Roles();

        BLL.WX_Group_Role bllRoles = new BLL.WX_Group_Role();
        BLL.WX_Group_Member bllMember = new BLL.WX_Group_Member();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                GridView1.DataSource = bllRoles.GetList(getWhere1());
                GridView1.DataBind();
                InitDropDownList();
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.group.role";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.group.role");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars ();
        }
        private void BindDataUserList(string strWhere)
        {
            DataSet dsemp = bllMember.GetList(strWhere);
            gvUsers.DataSource = dsemp;
            gvUsers.DataBind();
            if (dsemp != null)
            {
                string rname = LblRolesName1.Text;
                for (int i = 0; i < dsemp.Tables[0].Rows.Count; i++)
                {
                    CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                    string uname = checkb1.ToolTip;
                    checkb1.Checked = IsUserInRole(uname, rname);
                    //将角色信息传递到显示角色信息列表中
                    checkb1.Attributes["role"] = rname;
                }
            }
            TabOptionWebControls1.SelectIndex = 2;
        }
        protected void LinkButtonClick(object sender, CommandEventArgs e)
        {
            string rname = e.CommandArgument.ToString();
            //取的解色ID
            string rolesID = GetRoleId(rname);
            // 实现角色编辑
            if (e.CommandName.Equals("EditRole"))
            {
                //显示用户信息，设置CheckBox的状态

                LblRolesName1.Text = rname;
                TabOptionItem3.Visible = true;
                
                 
                BindDataUserList(getWhere2());

            }
            //处理角色的删除
            if (e.CommandName.Equals("DeleteRole"))
            {
                TabOptionItem3.Visible = false;
                TabOptionWebControls1.SelectIndex = 0;

                //如果角色中还包含用户，则不删除
                if (IsEmptyRole(rname) == true)
                {
                    lbMessage.Text = "该角色中还包含用户，不能删除该角色.";
                    return;
                }
                // 角色删除
                if (bllRoles.Delete(int.Parse(rolesID)))
                {
                    GridView1.DataSource = bllRoles.GetList(getWhere1());
                    GridView1.DataBind();
                    lbMessage.Text = "删除成功.";
                }
                else
                {
                    lbMessage.Text = "删除失败.";
                }
            }
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string createRole = txtRole.Text;
           
            //如果角色为空，则要求输入角色名
            if (txtRole.Text == string.Empty)
            {
                lbMessage.Text = "请输入角色名.";
                return;
            }
            
            //如果角色不存在，则调用CreateRole方法创建角色；否则显示提示信息
            if (!ExistsRole(createRole))
            {
                Model.WX_Group_Role model = new Model.WX_Group_Role();
                model.GroupId =0;
                model.RoleName = createRole;
                BLL.WX_Group_Role bll = new BLL.WX_Group_Role();
                bll.Add(model);
                TabOptionWebControls1.SelectIndex = 0;
                GridView1.DataSource = bll.GetList(getWhere1());
                GridView1.DataBind();
                lbMessage.Text = "添加成功.";
            }
            else
            {
                lbMessage.Text = "角色存在，请重新输入.";
            }
        }
        protected void CheckBox_Click(object sender, EventArgs e)
        {
            try
            {
                //获取角色和用户信息
                CheckBox cbUserInRole = (CheckBox)sender;
                string uname = cbUserInRole.ToolTip;
                string rname = LblRolesName1.Text;//cbUserInRole.Attributes["role"];
                //如果未被选中，则调用RemoveUserFromRole删除用户；否则调用AddUserToRole添加用户
                
                
                if (!cbUserInRole.Checked)
                {
                    RemoveUserFromRole(uname, rname);
                }
                else
                {
                    AddUserToRole(uname, rname);
                }
                lbMessage2.Text = "更新成功.";

            }
            catch (System.Configuration.Provider.ProviderException ex)
            {
                //抛出异常
                lbMessage2.Text = ex.Message;
            }
        }

        

        private string getWhere1()
        {
            return    "1=1";
        }
        private string getWhere2()
        {
            string groupId = ddlGroupId.SelectedItem.Value;
            string CnName = txtCnName.Text.Trim ();

            string strWhere = "state=1";
            if (groupId != "")
            {
                strWhere += " and GroupId=" + groupId ;
            }
            if (CnName != "")
            {
                strWhere += " and NickName like '%" + CnName + "%'";
            }
            return strWhere;

        }

        protected void btnSelectAll_Click(object sender, EventArgs e)
        {
            DataSet dsMember = bllMember.GetList(getWhere2());
            string rname = LblRolesName1.Text;
            if (dsMember != null)
            {
                for (int i = 0; i < dsMember.Tables[0].Rows.Count; i++)
                {
                    CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                    string uname = dsMember.Tables[0].Rows[i]["UserName"].ToString();
                    checkb1.Checked = true;
                    if (!IsUserInRole(uname, rname))
                    {
                        AddUserToRole(uname, rname);
                    }
                 }
            }
        }

        protected void btnCancelAll_Click(object sender, EventArgs e)
        {
            DataSet dsemp = bllMember.GetList(getWhere2());
            string rname = LblRolesName1.Text;
            if (dsemp != null)
            {
                for (int i = 0; i < dsemp.Tables[0].Rows.Count; i++)
                {

                    CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                    string uname = dsemp.Tables[0].Rows[i]["UserName"].ToString();
                    checkb1.Checked = false;
                    if (Roles.IsUserInRole(uname, rname))
                    {
                        Roles.RemoveUserFromRole(uname, rname);
                    }
                }
            }
 
        }



        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindDataUserList(getWhere2());

        }






        private bool ExistsRole(string roleName)
        {
            WX_Group_Role bll = new WX_Group_Role();
            DataSet ds = bll.GetList("RoleName='" + roleName + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        private void InitDropDownList()
        {
            BLL.WX_Group_Info bll = new WX_Group_Info();
            DataSet ds = bll.GetAllList();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                ddlGroupId.Items.Add(new ListItem() { 
                     Text=dr["Name"].ToString(),
                     Value=dr["Id"].ToString()
                });
            }
        }
        private string GetRoleId(string roleName)
        {
            BLL.WX_Group_Role bll = new BLL.WX_Group_Role();
            DataSet ds= bll.GetList("RoleName='"+roleName+"'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return ds.Tables[0].Rows[0]["Id"].ToString();
            }
            return "";
        }
        private bool IsEmptyRole(string roleName)
        {
            BLL.WX_Group_Role_User bll = new WX_Group_Role_User();
            DataSet ds = bll.GetList("RoleName='" + roleName + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        private bool IsUserInRole(string uname, string rname)
        {
            BLL.WX_Group_Role_User bll = new WX_Group_Role_User();
            Model.WX_Group_Role_User model = new Model.WX_Group_Role_User();
            DataSet ds = bll.GetList("GroupId=" + ddlGroupId.SelectedValue + " and OpenId='" + uname + "' and RoleName='" + rname + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            return false;
        }
        private void RemoveUserFromRole(string uname, string rname)
        {
            BLL.WX_Group_Role_User bll = new WX_Group_Role_User();
            Model.WX_Group_Role_User model = new Model.WX_Group_Role_User();
            DataSet ds = bll.GetList("GroupId="+ddlGroupId.SelectedValue+" and OpenId='"+uname+"' and RoleName='"+rname+"'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                var id=Convert.ToInt32(ds.Tables[0].Rows[0]["Id"]);
                bll.Delete(id);
            }
        }
        private void AddUserToRole(string uname, string rname)
        {
            BLL.WX_Group_Role_User bll = new WX_Group_Role_User();
            Model.WX_Group_Role_User model = new Model.WX_Group_Role_User();
            model.GroupId = Convert.ToInt32(ddlGroupId.SelectedValue);
            model.OpenId = uname;
            model.RoleId = 0;
            model.RoleName = rname;
            bll.Add(model);
        }

        protected void ddlGroupId_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindDataUserList(getWhere2());
        }
    }
}


