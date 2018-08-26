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
namespace SfSoft.web.emc.sm.s3
{
    public partial class browse :SfSoft.SfEmc .EmcBasePage 
    {
        BLL.Pub_Modules_Fun bllfun = new BLL.Pub_Modules_Fun();
        BLL.Pub_Roles_Fun bllrols = new BLL.Pub_Roles_Fun();
        BLL.aspnet_Roles bllasproles = new BLL.aspnet_Roles();
        Model.Pub_Roles_Fun modelrols = new Model.Pub_Roles_Fun();
        Model.aspnet_Roles modelasproles = new Model.aspnet_Roles();
        BLL.Pub_EmpInfo bllemp = new BLL.Pub_EmpInfo();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                GridView1.DataSource = bllasproles.GetList(getWhere1());
                GridView1.DataBind();

                EmcCommon.GetDeptIDDropDownList(ddlDept, Session["FilialeID"].ToString());
                //BindDataUserList(getWhere2());

            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s3";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s3.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars ();
        }
        private void BindDataUserList(string strWhere)
        {
            DataSet dsemp = bllemp.GetList(strWhere);
            gvUsers.DataSource = dsemp;
            gvUsers.DataBind();
            if (dsemp != null)
            {
                string rname = LblRolesName1.Text;
                for (int i = 0; i < dsemp.Tables[0].Rows.Count; i++)
                {
                    CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                    string uname = checkb1.ToolTip;
                    checkb1.Checked = Roles.IsUserInRole(uname, rname);
                    //将角色信息传递到显示角色信息列表中
                    checkb1.Attributes["role"] = rname;
                }
            }

        }
        protected void LinkButtonClick(object sender, CommandEventArgs e)
        {
            Guid rolesID = new Guid();
            string rname = e.CommandArgument.ToString();
 
            //取的解色ID
            string rid = EmcCommon.getRoleIDByRoleName(rname);
            if (rid != null)
            {
                rolesID = new Guid(rid);
            }
           
 

            // 实现角色编辑
            if (e.CommandName.Equals("EditRole"))
            {
                //显示用户信息，设置CheckBox的状态

                LblRolesName1.Text = rname;
                TabOptionItem3.Visible = true;
                TabOptionItem2.Visible = false;
                TabOptionWebControls1.SelectIndex = 2;
                 
                //DataSet dsemp = bllemp.GetList(getWhere2());
               // if (dsemp != null)
               // {
               //     for (int i = 0; i < dsemp.Tables[0].Rows.Count; i++)
               //     {
                //        CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                 //       string uname = checkb1.ToolTip;
                 //       checkb1.Checked = Roles.IsUserInRole(uname, rname);
                        //将角色信息传递到显示角色信息列表中
                //        checkb1.Attributes["role"] = rname;
                 //   }
                //}
                BindDataUserList(getWhere2());

            }
            //处理角色的删除
            if (e.CommandName.Equals("DeleteRole"))
            {
                TabOptionItem3.Visible = false;
                TabOptionItem2.Visible = false;
                TabOptionWebControls1.SelectIndex = 0;

                int tleng = Roles.GetUsersInRole(rname).Length;
                //如果角色中还包含用户，则不删除
                if (tleng != 0)
                {
                    lbMessage.Text = "该角色中还包含用户，不能删除该角色.";
                    return;
                }
                // 调用DeleteRole方法进行删除
                if (Roles.DeleteRole(rname))
                {
                    //删除角色的权限
                    bllrols.Delete(rolesID);
                    //删除公司关联信息
                    BLL.Pub_Roles_Company bllrc = new BLL.Pub_Roles_Company();
                    bllrc.Delete(rolesID);

                    GridView1.DataSource = bllasproles.GetList(getWhere1());
                    GridView1.DataBind();
                    lbMessage.Text = "删除成功.";
                }
                else
                {
                    lbMessage.Text = "删除失败.";
                }
            }
            //处理角色的授权
            if (e.CommandName.Equals("RoleFun"))
            {


                LblRolesName.Text = rname;
                TabOptionItem2.Visible = true;
                TabOptionItem3.Visible = false;
                TabOptionWebControls1.SelectIndex = 1;
                this.RolesTreeView.Nodes.Clear();
               // RolesTreeView.Attributes.Add("onclick", "CheckEvent()");


                //取的角色权限集合
                DataSet rolesds = GetRolesFunByRolesID(rolesID);
                DataView dv = new DataView(rolesds.Tables[0]);

                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.Text = "EMC";
                rootnode.ToolTip = "emc";
                DataView dv1 = dv;
                dv1.RowFilter = "[FunID]='emc'";
                if (dv1.Count > 0)
                {
                    rootnode.Checked = true;
                }
      
                RolesTreeView.Nodes.Add(rootnode);
                SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
                DataSet dsm = new DataSet();
                string strWhere = " ParentMID<>'0' order by OrderID";
                dsm = bll.GetList(strWhere);

                CreateTree("emc", rootnode, dsm, dv);
 
            }
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string createRole = txtRole.Text;
            createRole = Session["FilialeID"] + "-" + createRole;
            //如果角色为空，则要求输入角色名
            if (txtRole.Text == string.Empty)
            {
                lbMessage.Text = "请输入角色名.";
                return;
            }
            //如果角色不存在，则调用CreateRole方法创建角色；否则显示提示信息
            if (!Roles.RoleExists(createRole))
            {
                Roles.CreateRole(createRole);
                //取的RoleID
                string TempRoleID = "";
                BLL.aspnet_Roles bllrl = new BLL.aspnet_Roles();
                string strWhere3 = " RoleName = '" + createRole + "'";
                DataSet dsrl = bllrl.GetList(strWhere3);
                if (dsrl != null)
                {
                    TempRoleID = dsrl.Tables[0].Rows[0]["RoleId"].ToString();
                }
                //加入角色公司关联表
                BLL.Pub_Roles_Company bllrc = new Pub_Roles_Company();
                Model.Pub_Roles_Company modelrc = new Model.Pub_Roles_Company();
                modelrc.FilialeID = Session["FilialeID"].ToString();
                modelrc.RoleId = new Guid(TempRoleID);
                bllrc.Add(modelrc);

                TabOptionItem2.Visible = false;
                TabOptionWebControls1.SelectIndex = 0;
                GridView1.DataSource = bllasproles.GetList(getWhere1());
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
                    Roles.RemoveUserFromRole(uname, rname);
                }
                else
                {
                    Roles.AddUserToRole(uname, rname);
                }
                lbMessage2.Text = "更新成功.";

            }
            catch (System.Configuration.Provider.ProviderException ex)
            {
                //抛出异常
                lbMessage2.Text = ex.Message;
            }
        }


        private void CreateTree(string modulesID, TreeNode rootnode,DataSet dsm, DataView dv)
        {
           // SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
           // DataSet ds = new DataSet();
            DataView dvm = new DataView(dsm.Tables[0]);
            dvm.RowFilter = " ParentMID = '" + modulesID + "' ";


            foreach (DataRowView dr in dvm)
            {
                TreeNode treenode = new TreeNode();
                DataView dvtemp = dv;
                treenode.Text = dr["ModulesName"].ToString().Trim();
                treenode.ToolTip = dr["ModulesID"].ToString().Trim();
                if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], dr["ModulesID"].ToString().Trim()) || (HttpContext.Current.User.Identity.Name.Trim() == "admin"))
                {
                    treenode.NavigateUrl = "javascript:void(0)";
                    dvtemp.RowFilter = "[FunID]='" + dr["ModulesID"].ToString().Trim() + "'";
                    if (dvtemp.Count > 0)
                    {
                        treenode.Checked = true;
                    }
                    if (treenode.Depth >1)
                    {
                        treenode.Expanded = false;
                    }
                    if (dr["Dpath"].ToString().Trim() != "")
                    {
                        DataSet dscl = bllfun.GetListByFunTypeAndModulesID("module", dr["ModulesID"].ToString().Trim());
                        if (dscl != null)
                        {
                            foreach (DataRow drcl in dscl.Tables[0].Rows)
                            {
                                TreeNode treenodecl = new TreeNode();
                                DataView dvtempcl = dv;
                                string FunID = drcl["FunID"].ToString().Trim();
                                if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], FunID) || (HttpContext.Current.User.Identity.Name.Trim() == "admin"))
                                {
                                    string FunName = drcl["FunName"].ToString().Trim();
                                    dvtempcl.RowFilter = "[FunID]='" + drcl["FunID"].ToString().Trim() + "'";
                                    if (dvtempcl.Count > 0)
                                    {
                                        treenodecl.Checked = true;
                                    }
                                    treenodecl.Text = FunName;
                                    treenodecl.ToolTip = FunID;
                                    treenodecl.NavigateUrl = "javascript:void(0)";
                                    treenode.ChildNodes.Add(treenodecl);
                                }

                            }
                        }
                    }
                    rootnode.ChildNodes.Add(treenode);

                    string MID = dr["ModulesID"].ToString().Trim();
                    CreateTree(MID, treenode, dsm, dv);
                }

            }
        }
        //遍历树
        private void GetAllNodeText(TreeNodeCollection tnc, Guid rolesID)
        {
            foreach (TreeNode node in tnc)
            {

                if (node.Checked == true)
                {
                    modelrols.RolesID = rolesID;
                    modelrols.FunID = node.ToolTip;
                    bllrols.Add(modelrols);
                    //Response.Write(node.Text + " ");
                    //Response.Write(node.ToolTip + " ");
                    //Response.Write("<br/>");
                }

                if (node.ChildNodes.Count != 0)
                {
                    GetAllNodeText(node.ChildNodes, rolesID);
                }
            }
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            string rolesName = LblRolesName.Text;
 
            string rid = EmcCommon.getRoleIDByRoleName(rolesName);
            if (rid != null)
            {

                Guid rolesID = new Guid(rid) ;
                if (Roles.RoleExists(rolesName))
                {
                    bllrols.Delete(rolesID);
                }
                //string rolesID = Roles."";
                GetAllNodeText(this.RolesTreeView.Nodes, rolesID);
            }


        }
        /// <summary>
        /// 取的角色拥有的权限集合
        /// </summary>
        /// <param name="rolesID">角色ID</param>
        /// <returns></returns>
        private DataSet GetRolesFunByRolesID(Guid rolesID)
        {
            string rolesID1 = rolesID.ToString();
            string strWhere = " RolesID = '" + rolesID1 + "'";
            DataSet rolesds = bllrols.GetList(strWhere);

            return rolesds;
        }

        private string getWhere1()
        {
            return    "  RoleId in (select RoleId from Pub_Roles_Company where FilialeID='" + Session["FilialeID"].ToString() + "')";
            

        }
        private string getWhere2()
        {
            string DeptID = ddlDept.SelectedItem.Value;
            string CnName = txtCnName.Text.Trim ();

            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + Session["FilialeID"].ToString() + "' and  IsSysUser='1'  ";
            if (DeptID != "--")
            {
                strWhere += " and DeptID='"+DeptID +"'";
            }
            strWhere += ")";
            if (CnName != "")
            {
                strWhere += " and CnName like '%" + CnName + "%'";
            }
            return strWhere;

        }

        protected void btnSelectAll_Click(object sender, EventArgs e)
        {
            DataSet dsemp = bllemp.GetList(getWhere2());
            string rname = LblRolesName1.Text;
            if (dsemp != null)
            {
                for (int i = 0; i < dsemp.Tables[0].Rows.Count; i++)
                {
                    CheckBox checkb1 = (CheckBox)gvUsers.Rows[i].FindControl("cbUserInRole");
                    string uname = dsemp.Tables[0].Rows[i]["UserName"].ToString ();
                    checkb1.Checked = true;
                    if (!Roles.IsUserInRole(uname, rname))
                    {
                        Roles.AddUserToRole(uname, rname);
                    }
                 }
            }
        }

        protected void btnCancelAll_Click(object sender, EventArgs e)
        {
            DataSet dsemp = bllemp.GetList(getWhere2());
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
    }
}


