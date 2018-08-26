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
using System.Text;
using SfSoft.Common;
using SfSoft.SfEmc;
namespace SfSoft.web.emc.hrm.arc
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage 
    {
        //protected HtmlGenericControl a1a2;
 
        protected void Page_Load(object sender, EventArgs e)
        {
 
            if (!IsPostBack)
            {
                BindData(GetWhere());
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.hrm.arc";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess ("emc.hrm.arc.browse,emc.hrm.arc.mgt");
        }

        protected override void VtInitOthersToolbars()
        {
            tsbtnDelete.Visible = true; ;
            tsbtnNew.Enabled = CheckButtonAccess("emc.hrm.arc.mgt");
           // tsbtnEdit.Enabled = tsbtnNew.Enabled;
            tsbtnDelete.Enabled = tsbtnNew.Enabled;
        }
        /// <summary>
        /// 取的gridview 中的选中的第一行第columnIndex列值
        /// </summary>
        protected override void VtEdit()
        {
            string UserName = EmcCommon.GetCheckedDataKey(GridView1, 0, false);
            if (UserName == "")
            {
                return;
            }
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script> document.location='update.aspx?mode=update&UserName=" + UserName + "'</script>");
        //    VtShowIframe("详细", "update.aspx?mode=update&UserName=" + UserName, "", "");
        }
        protected override void VtView()
        {
            string UserName = EmcCommon.GetCheckedDataKey(GridView1, 0, false);
            if (UserName == "")
            {
                return;
            }
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script> document.location='update.aspx?mode=view&UserName=" + UserName + "'</script>");
           // VtShowIframe("详细", "update.aspx?mode=view&UserName=" + UserName, "", "");
        }
        protected override void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            string Topic = "";
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                Topic = e.Row.Cells[2].Text.Trim();
                string url = "update.aspx?mode=update&UserName=" + e.Row.Cells[1].Text.Trim();
                e.Row.Cells[2].Text = "<a href =" + url + "><font color=#2828FF>" + Topic + "</font></a>";
            }
        }
        private void BindData(string strWhere)
        {
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet hrds = bll.GetUsersInfoList(strWhere);
           // HrGV.DataSource = hrds;
           // HrGV.DataBind();
            Common.SetEmptyGridView.GridViewDataBind(GridView1, hrds.Tables[0]);

        }
        protected void BtnSearch_Click(object sender, EventArgs e)
        {
 
            BindData(GetWhere());
        }

        /// <summary>
        /// 删除
        /// </summary>
        protected override void VtDelete()
        {
            string username = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (username == "")
            {
                return;
            }
            BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            string[] arrID = username.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                string UserName = arrID[i].ToString();
                DataSet ds = bllEmp.GetUsersInfoList("a.UserName='" + UserName + "'");
                int uid = 0;
                string ZZState = "";
                if (ds.Tables[0].Rows.Count > 0)
                {
                    uid = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                    ZZState = ds.Tables[0].Rows[0]["ZZState"].ToString();
                }

                if (ZZState != "离职")
                {
                    MessageBox.Show(this, "只有离职人员才有删除");
                    return;
                }
                if (UserName.IndexOf("admin") >= 0)
                {
                    MessageBox.Show(this, "不能删除管理员帐号");
                    return;
                }
                blldu.Delete(uid, Common.Common.stringToInt(Session["FilialeID"].ToString()));
                //删除用户基本信息
                bllEmp.Delete(UserName);
                //删除用户帐号
                Membership.DeleteUser(UserName);
            }
            BindData(GetWhere());
        }

        ////删除
        //  protected void LinkButtonClick(object sender, CommandEventArgs e)
        //{

     
        //  //处理角色的删除


        //    if (e.CommandName.Equals("DeleteUser"))
        //    {
        //        string UserName = e.CommandArgument.ToString();
        //        BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
        //        //删除部门用户公司关联
        //        DataSet ds = bllEmp.GetUsersInfoList("a.UserName='" + UserName + "'");
        //        Model.Pub_EmpInfo modelEmp = new Model.Pub_EmpInfo();
        //       // modelEmp = bllEmp.GetModel(UserName);
        //       // int uid = modelEmp.ID;
        //        int uid = 0;
        //        string ZZState ="";
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            uid = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
        //            ZZState = ds.Tables[0].Rows[0]["ZZState"].ToString();
        //        }

        //        if (ZZState != "离职")
        //        {
        //            MessageBox.Show(this, "只有离职人员才有删除");
        //            return;
        //        }
        //        if (UserName.IndexOf("admin") >= 0)
        //        {
        //            MessageBox.Show(this, "不能删除管理员帐号");
        //            return;
        //        }
        //        BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
        //        blldu.Delete(uid, Common.Common.stringToInt(Session["FilialeID"].ToString()));

        //        //删除用户基本信息


        //        bllEmp.Delete(UserName);
        //        //删除用户帐号
        //        Membership.DeleteUser(UserName);
               
        //        //重新绑定数据
        //        BindData(GetWhere());
        //    }
        //}

        private string GetWhere()
        {
            string strWhere = "";
            strWhere = " c.FilialeID='" + Session["FilialeID"].ToString() + "'";
            string UserName = txtUserName.Text;
            string CnName = txtCnName.Text;
            //string DeptID = txtDeptID.Text;
            string DeptName = txtDeptName.Text;
            string ZZState = ddlZZState.SelectedItem.Value;

            //Boolean inChild = ckChild.Checked;

            if (UserName != "")
            {
                strWhere += " and a.UserName like '%" + UserName + "%'";
            }
            if (CnName != "")
            {
                strWhere += " and b.CnName like '%" + CnName + "%'";
            }
            if (DeptName != "")
            {
                strWhere += " and c.DeptName like '%" + DeptName + "%'";
            }
            if (!(cbIsSysUser1.Checked && cbIsSysUser2.Checked))
            {
                if (cbIsSysUser1.Checked)
                {
                    strWhere += " and  b.IsSysUser='1'";
                }
                if (cbIsSysUser2.Checked)
                {
                    strWhere += " and  b.IsSysUser='0'";
                }
            }

            strWhere += " and b.ZZState = '" + ZZState + "'";
            return strWhere;
        }

        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex; 
            BindData(GetWhere());
        }


    }
}


