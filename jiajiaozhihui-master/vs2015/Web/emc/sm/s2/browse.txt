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
namespace SfSoft.web.emc.sm.s2
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage 
    {
        protected HtmlGenericControl a1a2;
        
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
            hfMID.Value = "emc.sm.s2";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s2.browse");
        }
        protected override void VtInitToolbars()
        {
            NewTsbtnEdit();
            phToolBars.Controls.Add(tsbtnEdit);
            NewTsbtnNew();
            tsbtnNew.Text = "锁定密码为[111111]的用户";
            tsbtnNew.OnClientClick = "return configLock();";
            phToolBars.Controls.Add(tsbtnNew);
        }

        private void BindData(string strWhere)
        {
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet hrds = bll.GetUsersInfoList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(GridView1, hrds.Tables[0]);
        }

        protected override  void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            string Topic = "";
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                Topic = e.Row.Cells[2].Text.Trim();
                string url = "update.aspx?mode=update&UserName=" + e.Row.Cells[1].Text.Trim();
                e.Row.Cells[2].Text = "<a href =" + url + "><font color=#2828FF>" + Topic + "</font></a>";
            }
        }

        protected override void VtEdit()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, false);
            if (ID == "")
            {
                return;
            }
            //VtShowIframe("详细", "update.aspx?mode=update&userName=" + ID, "", "");
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>document.location='update.aspx?mode=update&userName=" + ID+"'</script>");
        }

        protected void BtnSearch_Click(object sender, EventArgs e)
        {

            BindData(GetWhere());

        }
        //删除
          protected void LinkButtonClick(object sender, CommandEventArgs e)
        {
    
          //处理角色的删除


            if (e.CommandName.Equals("DeleteUser"))
            {
                //删除用户基本信息
                string UserName = e.CommandArgument.ToString();
                BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
                bllEmp.Delete(UserName);
                //删除用户帐号
                Membership.DeleteUser(UserName);
                //删除部门用户公司关联
                Model.Pub_EmpInfo modelEmp = new Model.Pub_EmpInfo();
                modelEmp = bllEmp.GetModel(UserName);
                int uid = modelEmp.ID;
                BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
                blldu.Delete(uid, Common.Common.stringToInt(Session["FilialeID"].ToString()));
                //重新绑定数据
                BindData(GetWhere());
            }
        }

          protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
          {
              GridView1.PageIndex = e.NewPageIndex;
              BindData(GetWhere());
          }

        private string GetWhere()
        {
            string strWhere = "";
            strWhere = " c.FilialeID='" + Session["FilialeID"].ToString() + "' and b.IsSysUser='1'  ";
            string UserName = txtUserName.Text;
            string CnName = txtCnName.Text;
            //string DeptID = txtDeptID.Text;
            string DeptName = txtDeptName.Text;
            //Boolean inChild = ckChild.Checked;

            bool isLock = this.cbxLock.Checked;
            bool isInitPass = this.cbxPass.Checked;
            bool isLizhi = this.cbxLiZhi.Checked;

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
            if (isLock)
            {
                strWhere += " and d.IsLockedOut='1'";
            }
            else
            {
                strWhere += " and d.IsLockedOut='0'";
            }
            if(!isLizhi)
            {
                strWhere += " and a.UserId in(select UserID from Pub_EmpInfo where ZZState='在职') ";
            }
            if (isLizhi)
            {
                strWhere += " and a.UserId in(select UserID from Pub_EmpInfo where ZZState='离职') ";
            }
            if (isInitPass)
            {
                //默认密码为111111的用户
                strWhere += " and d.Password = 'skONgN6YXRFleSLsKZSHTZyU6t8='";
            }
            return strWhere;
        }

        protected override void VtNew()
        {
 
            string strSql = "update aspnet_Membership set IsLockedOut='true' where UserID  in ( " +
                " select d.UserID from  aspnet_Membership  d " +
                " left join Pub_EmpInfo as b on d.UserID=b.UserID  left join " +
                " ( select a.UserID,a.DeptID,a.FilialeID,b.DeptName,a.UserDeptKind from Pub_DeptUsers as a left join Pub_Dept as b on a.DeptID=b.DeptID) as c on b.id=c.UserID " +
                " where c.FilialeID = " + Session["FilialeID"].ToString() + " and d.Password ='skONgN6YXRFleSLsKZSHTZyU6t8=' and b.UserName<>'admin' )";
            DBUtility.DbHelperSQL.ExecuteSql(strSql);
            MessageBox.Show(this, "执行完成!");
        }

    }
}


