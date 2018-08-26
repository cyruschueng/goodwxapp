using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using SfSoft.BLL;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.Mail;
using SfSoft.DBUtility;
using SfSoft.Common;
using YYControls;
using System.Threading;
using System.IO;
namespace SfSoft.SfEmc
{
    /// <summary>
    /// 
    /// </summary>
    public static class EmcCommon
    {
        //private static readonly ILog log = LogManager.GetLogger(typeof(EmcCommon));
        public static SqlConnection GetMyConn()
        {
            string strProvider = ConfigurationSettings.AppSettings["ConnectionString"];
            SqlConnection MyConn = new SqlConnection(strProvider);
            MyConn.Open();
            return MyConn;
        }
        /// <summary>
        /// 把路径转换成模块ID
        /// </summary>
        /// <param name="filepath">当前页面路径</param>
        /// <returns></returns>
        public static string ChangePathToModulesID(string filepath)
        {
            string lFilepath = filepath.ToLower();
            filepath = filepath.Substring(0, lFilepath.LastIndexOf(".aspx"));
            filepath = filepath.Substring(1, lFilepath.LastIndexOf("/") - 1);
            filepath = filepath.Replace("/", ".");

            return filepath;
        }

      

        /// <summary>
        /// 取的模块名称
        /// </summary>
        /// <param name="modulesID"></param>
        /// <returns></returns>
        public static string GetModulesName(string modulesID)
        {
            string ModulesName = "";
            if (modulesID.IndexOf("emc.workflow.") >= 0)
            {
                BLL.Pub_FunDef bll = new BLL.Pub_FunDef();
                string strWhere = " FunID='" + modulesID + "' and FunType='App'";
                DataSet ds = bll.GetList(strWhere);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ModulesName = ds.Tables[0].Rows[0]["FunName"].ToString();
                }
                else
                {
                    ModulesName = null;
                }
            }
            else
            {
                SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
                SfSoft.Model.Pub_Modules model = new SfSoft.Model.Pub_Modules();
                model = bll.GetModel(modulesID);
                if (model != null)
                {
                    ModulesName = model.ModulesName;
                }
                else
                {
                    ModulesName = null;
                }
            }
            return ModulesName;
        }

        /// <summary>
        /// 取的模块图标
        /// </summary>
        /// <param name="modulesID"></param>
        /// <returns></returns>
        public static string GetModulesIcon(string modulesID)
        {
            SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
            SfSoft.Model.Pub_Modules model = new SfSoft.Model.Pub_Modules();
            model = bll.GetModel(modulesID);
            if (model != null)
            {
                return model.Icon;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取的gridview 中的选中的第一行第columnIndex列值
        /// </summary>
        /// <param name="gv"></param>
        /// <param name="columnIndex">列</param>
        ///  <param name="isAll">是否所有选中行</param>
        /// <returns>如果isAll是否所有，如果所有返回以，号为分格的字符串</returns>
        public static string GetCheckedDataKey(GridView gv, int columnIndex, bool isAll)
        {
            string ID = "";
            List<System.Web.UI.WebControls.DataKey> keys = YYControls.Helper.SmartGridView.GetCheckedDataKey(gv, columnIndex);
            if (keys.Count > 0)
            {
                if (isAll)
                {
                    for (int i = 0; i < keys.Count; i++)
                    {
                        ID += keys[i].Value.ToString() + ",";
                    }
                    if (ID != "")
                    {
                        ID = ID.Substring(0, ID.Length - 1);
                    }
                }
                else
                {
                    ID = keys[0].Value.ToString();
                }
            }
            return ID;
        }
        /// <summary>
        /// 取的gridview 中的选中的第一行checkboxId列值
        /// </summary>
        /// <param name="gv"></param>
        /// <param name="columnIndex">列</param>
        /// <param name="isAll">是否所有选中行</param>
        /// <returns>如果isAll是否所有，如果所有返回以，号为分格的字符串</returns>
        public static string GetCheckedDataKey(GridView gv, string checkboxId, bool isAll)
        {
            string ID = "";
            List<System.Web.UI.WebControls.DataKey> keys = YYControls.Helper.SmartGridView.GetCheckedDataKey(gv, checkboxId);
            if (keys.Count > 0)
            {
                if (isAll)
                {
                    for (int i = 0; i < keys.Count; i++)
                    {
                        ID += keys[i].Value.ToString() + ",";
                    }
                    if (ID != "")
                    {
                        ID = ID.Substring(0, ID.Length - 1);
                    }
                }
                else
                {
                    ID = keys[0].Value.ToString();
                }
            }
            return ID;
        }

        /// </summary>
        /// <param name="filepath">文件路径及名称</param>
        /// <returns></returns>
        public static string GetModulesNoteInfoByFilePath(string filepath)
        {
            /*
            BLL.Pub_Help bll = new BLL.Pub_Help();

            Model.Pub_Help model = new Model.Pub_Help();
            model = bll.GetModelByFilePath(filepath);
            if (model != null)
            {
                return model.NoteInfo;
            }
            else
            {
                return null;
            }
            */
            return null;
        }
        /// <summary>
        /// 锁定还是取消锁定
        /// </summary>
        /// <param name="UserID">用户GUID</param>
        /// <param name="YN">true 锁定，false取消锁定</param>
        public static void LockUserLogin(string UserID, string YN)
        {
            string strSql = "update aspnet_Membership set IsLockedOut='" + YN + "' where UserID='" + UserID + "'";
            DBUtility.DbHelperSQL.ExecuteSql(strSql);
        }

        /// <summary>
        /// 取部门名
        /// </summary>
        /// <param name="DeptID">部门ID</param>
        /// <returns></returns>
        public static string getDeptNameByID(int DeptID)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            Model.Pub_Dept model = new Model.Pub_Dept();
            model = bllDept.GetModel(DeptID);
            if (model != null)
            {
                return model.DeptName;
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 取部门编码
        /// </summary>
        /// <param name="DeptID">部门ID</param>
        /// <returns></returns>
        public static string getDeptNoNameByID(int DeptID)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            Model.Pub_Dept model = new Model.Pub_Dept();
            model = bllDept.GetModel(DeptID);
            if (model != null)
            {
                return model.DeptNo;
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 取公司名称
        /// </summary>
        /// <param name="DeptID">公司ID</param>
        /// <returns></returns>
        public static string getCompanyNameByID(string ID)
        {
            BLL.Pub_Company bllC = new BLL.Pub_Company();
            Model.Pub_Company model = new Model.Pub_Company();
            model = bllC.GetModel(ID);
            if (model != null)
            {
                return model.CompanyName;
            }
            else
            {
                return "";
            }
        }
        /// <summary>
        /// 取用户中文名
        /// </summary>
        /// <param name="UserID">用户ID</param>
        /// <returns></returns>
        public static string getUserCnNameByID(string UserID)
        {
            string strWhere = " ID='" + UserID + "'";
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["CnName"].ToString();
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取用户职位
        /// </summary>
        /// <param name="UserID">用户ID</param>
        /// <returns></returns>
        public static string getPositionsByID(string UserID)
        {
            string strWhere = " ID='" + UserID + "'";
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["Positions"].ToString();
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取用户ID,根据姓名
        /// </summary>
        /// <param name="CnName">姓名</param>
        /// <returns></returns>
        public static string getUserIDNameByID(string CnName)
        {
            if (CnName == "")
            {
                return "";
            }
            string strWhere = " CnName='" + CnName + "'";
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["ID"].ToString();
            }
            else
            {
                return "";
            }
        }

        /// <summary>
        /// 取用户GUID
        /// </summary>
        /// <param name="ID">用户ID</param>
        /// <returns></returns>
        public static string getUserGUIDByID(string ID)
        {
            string strWhere = " ID='" + ID + "'";
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["UserID"].ToString();
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取用户名
        /// </summary>
        /// <param name="ID">用户ID</param>
        /// <returns></returns>
        public static string getUserNameByID(string ID)
        {
            string strWhere = " ID='" + ID + "'";
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["UserName"].ToString();
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 取角色ID根据角色名


        /// </summary>
        /// <param name="rname">角色名D</param>
        /// <returns></returns>
        public static string getRoleIDByRoleName(string rname)
        {
            string strWhere = " RoleName ='" + rname + "'";
            BLL.aspnet_Roles bll = new BLL.aspnet_Roles();
            DataSet ds = bll.GetList(strWhere);

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RoleId"].ToString();
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 根据用户ID取的部门信息
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="FilialeID"></param>
        /// <returns>hashtable key：DeptID,DeptName,UserDeptKind,FilialeID</returns>
        public static Hashtable getDeptInfoByUserID(string UserID, string FilialeID)
        {
            Hashtable hash = new Hashtable();
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            StringBuilder strWhere = new StringBuilder();
            strWhere.Append(" a.UserID='" + UserID + "'");
            //如果公司ID不为空那么根据公司ID来取部门
            if ((FilialeID) != null && (FilialeID != ""))
            {
                strWhere.Append(" and a.FilialeID='" + FilialeID + "'");
            }
            else
            //如果公司ID为空那么根据默认所属公司来取部门
            {
                strWhere.Append(" and a.UserDeptKind='1'");
            }

            DataSet duds = blldu.GetDeptInfoByUserInfo(strWhere.ToString());
            if (duds.Tables[0].Rows.Count > 0)
            {
                hash.Add("DeptID", duds.Tables[0].Rows[0]["DeptID"].ToString());
                hash.Add("UserDeptKind", duds.Tables[0].Rows[0]["UserDeptKind"].ToString());
                hash.Add("DeptName", duds.Tables[0].Rows[0]["DeptName"].ToString());
                hash.Add("PostID", duds.Tables[0].Rows[0]["PostID"].ToString());
                hash.Add("PostName", duds.Tables[0].Rows[0]["PostName"].ToString());
                hash.Add("FilialeID", duds.Tables[0].Rows[0]["FilialeID"].ToString());
                return hash;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 根据用户取的公司ID 
        /// </summary>
        /// <param name="UserID">选择用户ID</param>
        /// <param name="FilialeID"></param>
        ///  <param name="CurDeptID">当前用户所在部门，在选择用户没有部门时代替</param>
        /// <param name="ddlDept"></param>
        /// <returns></returns>
        public static Hashtable getDeptInfoByUserID(string UserID, string FilialeID, string CurDeptID, DropDownList ddlDept)
        {

            Hashtable hash = new Hashtable();
            hash.Add("DeptID", "");
            hash.Add("DeptName", "");
            //if (ddlDept.SelectedItem != null)
            //{
            //    string DeptID = ddlDept.SelectedItem.Value;
            //    string DeptName = ddlDept.SelectedItem.Text;
            //    if (DeptID != "--" && DeptID != "")
            //    {
            //        hash["DeptID"] = DeptID;
            //        hash["DeptName"] = DeptName;
            //        return hash;
            //    }
            //}
            BLL.Pub_DeptUsers blldu = new BLL.Pub_DeptUsers();
            StringBuilder strWhere = new StringBuilder();
            strWhere.Append(" a.UserID='" + UserID + "'");
            //如果公司ID不为空那么根据公司ID来取部门
            if ((FilialeID) != null && (FilialeID != ""))
            {
                strWhere.Append(" and a.FilialeID='" + FilialeID + "'");
            }
            else
            //如果公司ID为空那么根据默认所属公司来取部门
            {
                strWhere.Append(" and a.UserDeptKind='1'");
            }

            DataSet duds = blldu.GetDeptInfoByUserInfo(strWhere.ToString());
            if (duds.Tables[0].Rows.Count > 0)
            {
                hash["DeptID"] = duds.Tables[0].Rows[0]["DeptID"].ToString();
                hash["DeptName"] = duds.Tables[0].Rows[0]["DeptName"].ToString();
                EmcCommon.ShowDropDownList(ddlDept, hash["DeptID"].ToString());
            }
            else
            {
                hash["DeptID"] = CurDeptID;
                hash["DeptName"] = EmcCommon.getDeptNameByID((int)PageValidate.StringToInt(CurDeptID));
            }
            return hash;
        }

        /// <summary>
        /// 初始化用户下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetUsersDropDownList(DropDownList ddlList, string curValue, string FilialeID)
        {
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')  and  IsSysUser='1'  order by CnName ";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            ddlList.DataSource = dsEmp.Tables[0];
            ddlList.DataTextField = "CnName";
            ddlList.DataValueField = "ID";
            ddlList.DataBind();

            if (curValue != null && curValue != "")
            {
                //  ddlList.Items.FindByValue(curValue).Selected = true ; 
            }
        }
        public static string GetDropDownListValue(DropDownList ddl)
        {
            string dv = "";
            if (ddl.SelectedItem != null && ddl.SelectedItem.Value != "--")
            {
                dv = ddl.SelectedItem.Value;
            }

            return dv;
        }

        public static string GetDropDownListText(DropDownList ddl)
        {
            string dv = "";
            if (ddl.SelectedItem != null && ddl.SelectedItem.Text != "--未选择--")
            {
                dv = ddl.SelectedItem.Text;
            }

            return dv;
        }
        public static string GetRadioButtonListValue(RadioButtonList rbl)
        {
            string dv = "";
            if (rbl.SelectedItem != null && rbl.SelectedItem.Value != "")
            {
                dv = rbl.SelectedItem.Value;
            }

            return dv;
        }

        public static string GetRadioButtonListText(RadioButtonList rbl)
        {
            string dv = "";
            if (rbl.SelectedItem != null && rbl.SelectedItem.Text != "")
            {
                dv = rbl.SelectedItem.Text;
            }

            return dv;
        }
        /// <summary>
        /// 初始化用户下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetAllUsersDropDownList(DropDownList ddlList, string curValue, string FilialeID)
        {
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')   order by CnName ";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            ddlList.DataSource = dsEmp.Tables[0];
            ddlList.DataTextField = "CnName";
            ddlList.DataValueField = "ID";
            ddlList.DataBind();

            if (curValue != null && curValue != "")
            {
                //  ddlList.Items.FindByValue(curValue).Selected = true ; 
            }
        }
        /// <summary>
        /// 设置用户下拉框中的人员
        /// </summary>
        /// <param name="ddl"></param>
        /// <param name="UserID"></param>
        /// <param name="CnName"></param>
        public static void SetDropDownListUserID(DropDownList ddl, string UserID, string CnName)
        {
            if (UserID == null)
            {
                return;
            }

            if (ddl.Items.FindByValue(UserID) == null)
            {
                if (CnName == "")
                {
                    CnName = EmcCommon.getUserCnNameByID(UserID);
                }
                ListItem li = new ListItem();
                li.Text = CnName;
                li.Value = UserID;
                ddl.ClearSelection();
                li.Selected = true;
                ddl.Items.Add(li);
            }
            else
            {
                ddl.Items.FindByValue(UserID).Selected = true;
            }
        }

        /// <summary>
        /// 设置部门下拉框中的部门
        /// </summary>
        /// <param name="ddl"></param>
        /// <param name="UserID"></param>
        /// <param name="CnName"></param>
        public static void SetDropDownListDeptID(DropDownList ddl, string DeptID, string DeptName)
        {
            if (DeptID == null || DeptID == "")
            {
                return;
            }

            if (ddl.Items.FindByValue(DeptID) == null)
            {
                if (DeptName == "")
                {
                    DeptName = EmcCommon.getDeptNameByID(int.Parse(DeptID));
                }
                ListItem li = new ListItem();
                li.Text = DeptName;
                li.Value = DeptID;
                ddl.ClearSelection();
                li.Selected = true;
                ddl.Items.Add(li);
            }
            else
            {
                ddl.Items.FindByValue(DeptID).Selected = true;
            }
        }

        /// <summary>
        /// 初始化用户下拉列表的值,包含离职人员
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetUsersAllDropDownList(DropDownList ddlList, string curValue, string FilialeID)
        {
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = "   c.FilialeID='" + FilialeID + "'   order by CnName ";
            DataSet dsEmp = bllEmp.GetUsersInfoList(strWhere);
            ddlList.DataSource = dsEmp.Tables[0];
            ddlList.DataTextField = "CnName";
            ddlList.DataValueField = "ID";
            ddlList.DataBind();

            if (curValue != null && curValue != "")
            {
                //  ddlList.Items.FindByValue(curValue).Selected = true ; 
            }
        }
        /// <summary>
        /// 初始化用户下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetUsersIDDropDownList(DropDownList ddlList, string FilialeID)
        {
            ddlList.Items.Clear();
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')  and  IsSysUser='1'   order by CnName";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            DataTable dtNodeSets = dsEmp.Tables[0];

            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["CnName"].ToString();
                li.Value = dr["ID"].ToString();
                ddlList.Items.Add(li);
            }
        }

      


        /// <summary>
        /// 初始化待分配用户下拉列表的值
        /// </summary>
        /// <param name="ddlList"></param>
        /// <param name="DeptID"></param>
        /// <param name="FilialeID"></param>
        public static void GetToDoUsersIDDropDownList(DropDownList ddlList, string DeptID, string FilialeID)
        {
            ddlList.Items.Clear();
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "'";
            if (DeptID != "")
            {
                strWhere += " and DeptID='" + DeptID + "'";
            }
            strWhere += " )  and  IsSysUser='1'   order by CnName";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            DataTable dtNodeSets = dsEmp.Tables[0];

            ListItem li = new ListItem();
            li.Text = "待分配";
            li.Value = "0";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["CnName"].ToString();
                li.Value = dr["ID"].ToString();
                ddlList.Items.Add(li);
            }
        }
        /// <summary>
        /// 取的用户所管理的部门ID串，用","号分开
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="FilialeID"></param>
        /// <returns></returns>
        public static string GetDeptIDByManagerID(string UserID, string FilialeID)
        {
            string sql = "select DeptID from Pub_Dept where ManagerID='" + UserID + "' and FilialeID='" + FilialeID + "'";
            string str = "";
            DataSet ds = DBTools.GetList(sql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    str += dr["DeptID"].ToString() + ",";
                }
            }
            if (str != "")
            {
                str = "," + str;
            }
            return str;

        }
        /// <summary>
        /// 初始化用户下拉列表的值,包括锁定用户
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetAllUsersIDDropDownList(DropDownList ddlList, string FilialeID)
        {
            ddlList.Items.Clear();
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')    order by CnName";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            DataTable dtNodeSets = dsEmp.Tables[0];

            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["CnName"].ToString();
                li.Value = dr["ID"].ToString();
                ddlList.Items.Add(li);
            }
        }

        /// <summary>
        /// 通过部门ID获取部门下的用户
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetUsersIDByDeptIDDropDownList(DropDownList ddlList, string FilialeID, string DeptID)
        {
            ddlList.Items.Clear();
            BLL.Pub_EmpInfo bll = new BLL.Pub_EmpInfo();
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" id in ( select userid from Pub_DeptUsers where deptid in ( ");
            strSql.Append("  select deptid from  Pub_Dept where deptid = " + DeptID);
            strSql.Append("   union ( ");
            strSql.Append("     select deptid from Pub_Dept where ParentID=" + DeptID);
            strSql.Append("   ) union ( ");
            strSql.Append("     select deptid from Pub_Dept where ParentID in  (select deptid  from Pub_Dept where ParentID=" + DeptID + ")  ");
            strSql.Append("   ) union ( ");
            strSql.Append("    select deptid from  Pub_Dept where ParentID in  (select deptid from Pub_Dept where ParentID in  (select deptid  from Pub_Dept where ParentID=" + DeptID + ") ) ");
            strSql.Append("   ) ");
            strSql.Append(") ) and FilialeID = " + FilialeID);
            strSql.Append(" and ZZState<>'离职' ");
            DataSet dsEmp = bll.GetUsersInfoList(strSql.ToString());
            DataTable dtNodeSets = dsEmp.Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["CnName"].ToString();
                li.Value = dr["ID"].ToString();
                ddlList.Items.Add(li);
            }
        }


        public static DataTable GetUserListData(string text, string FilialeID)
        {
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')  ";
            if (text != "")
            {
                strWhere += " and CnName LIKE '" + text + "%' ";
            }
            strWhere += " order by CnName";
            DataSet dsEmp = bllEmp.GetList(strWhere);
            DataTable dtNodeSets = dsEmp.Tables[0];
            return dtNodeSets;
        }

        public static DataTable GetPostListData(string text, string FilialeID)
        {

            string sql = " select * from Pub_BaseData where RefObj='hrm.emp.Positions'  and FilialeID='" + FilialeID + "'  ";
            if (text != "")
            {
                sql += " and (RefValueCode LIKE '" + text + "%' or RefValue LIKE '" + text + "%') ";
            }
            sql += " order by RefValueCode";
            DataSet ds = DBTools.GetList(sql);
            DataTable dt = ds.Tables[0];
            return dt;
        }
        public static DataTable GetDeptListData(string text, string FilialeID)
        {

            string sql = " select * from Pub_Dept where DelFlag='N'  and FilialeID='" + FilialeID + "'  ";
            if (text != "")
            {
                sql += " and (DeptName LIKE '" + text + "%') ";
            }
            sql += " order by DeptNo";
            DataSet ds = DBTools.GetList(sql);
            DataTable dt = ds.Tables[0];
            return dt;
        }
        public static string GetStatusMessage(int offset, int total)
        {
            if (total <= 0)
                return "没有数据";

            return String.Format("选项： <b>1</b>-<b>{0}</b> 共计：<b>{1}</b>人", offset, total);
        }


        /// <summary>
        /// 初始化部门下拉列表的值


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetDeptDropDownList(DropDownList ddlDept, string curValue, string FilialeID)
        {

            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " FilialeID='" + FilialeID + "' and IsFiliale='2'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            //string strParentColumn = "ParentID";
            //string strRootValue = "0";
            //string strIndexColumn = "DeptID";
            //string strTextColumn = "DeptName";
            //int i = -1;
            // MakeTree(dtNodeSets, strParentColumn, strRootValue, strIndexColumn, strTextColumn, ddlDept, i);
            ddlDept.DataSource = dtNodeSets;
            ddlDept.DataTextField = "DeptName";
            ddlDept.DataValueField = "DeptID";
            ddlDept.DataBind();

            if (curValue != null && curValue != "")
            {
                ddlDept.Items.FindByValue(curValue).Selected = true;
            }
        }


        /// <summary>
        /// 初始化部门带空选下拉列表的值


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetDeptIDDropDownList(DropDownList ddlDept, string FilialeID)
        {
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " FilialeID='" + FilialeID + "' and IsFiliale='2'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlDept.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                ddlDept.Items.Add(li);
            }
        }

     
        /// <summary>
        /// 初始化部门有数据权限控制
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetAclDeptDropDownList(DropDownList ddlDept, string FilialeID, string UserID, string DeptID, string MID, string DeptName)
        {
            string strWhere = DataAcl.GetDataAclWhere(UserID, DeptID, FilialeID, MID);
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();

            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlDept.Items.Add(li);
            if (DeptID != "")
            {
                li = new ListItem();
                li.Text = DeptName;
                li.Value = DeptID;
                ddlDept.Items.Add(li);
            }
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                ddlDept.Items.Add(li);
            }
        }

        /// <summary>
        /// 初始化部门有数据权限控制
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetAclDeptDropDownList(DataSet ds, DropDownList ddlDept, string DeptID, string DeptName)
        {
            DataTable dtNodeSets = ds.Tables[0];
            ListItem li = new ListItem();

            li.Text = DeptName;
            li.Value = DeptID;
            ddlDept.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                ddlDept.Items.Add(li);
            }
        }

        /// <summary>
        /// 初始化部门有数据有空选权限控制


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetAclDeptSelectDropDownList(DropDownList ddlDept, string FilialeID, string UserID, string DeptID, string MID, string DeptName)
        {
            string strWhere = DataAcl.GetDataAclWhere(UserID, DeptID, FilialeID, MID);
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();

            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            li.Selected = true;
            ddlDept.Items.Add(li);
            li = new ListItem();
            li.Text = DeptName;
            li.Value = DeptID;
            ddlDept.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                ddlDept.Items.Add(li);
            }
        }
        /// <summary>
        /// 初始化部门列表框的值


        /// </summary>
        /// <param name="ddlList">ListBox</param>
        public static void GetDeptListBox(ListBox lb, string FilialeID)
        {
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " FilialeID='" + FilialeID + "' and IsFiliale='2'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            lb.DataSource = dtNodeSets;
            lb.DataTextField = "DeptName";
            lb.DataValueField = "DeptID";
            lb.DataBind();
        }
        /// <summary>
        /// 初始化公司下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetFilialeDropDownList(DropDownList ddlDept)
        {

            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " isFiliale='0' or isFiliale='1' ";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ddlDept.DataSource = dtNodeSets;
            ddlDept.DataTextField = "DeptName";
            ddlDept.DataValueField = "DeptID";
            ddlDept.DataBind();
        }

       
 
        /// <summary>
        /// 初始化公司下拉列表的值


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetFilialeIDDropDownList(DropDownList ddlDept)
        {

            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " isFiliale='0' or isFiliale='1' ";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];

            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlDept.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                ddlDept.Items.Add(li);
            }
        }


        /// <summary>
        /// 特殊处理：在制作办公采购计划中，深圳公司只能从深圳公司的用品目录中选择
        ///  modi ：gouzg
        ///  2009-03-10
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        /// <param name="iUnitID">制单用户所属的公司</param>
        /// <param name="unitIds">单位划分集合：该参数在web.config中设置，只需要设置广州公司，格式：4;40;</param>
        public static void GetFilialeIDOtherDropDownList(DropDownList ddlDept, string iUnitID, string unitIds)
        {
            if (unitIds == "" || unitIds == null)
            {
                GetFilialeIDDropDownList(ddlDept);
            }
            else
            {

                BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
                string strWhere = " isFiliale='0' or isFiliale='1' ";
                DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
                bool isGZunit = false;//是否属于广州单位
                if (unitIds.IndexOf(iUnitID + ";") >= 0)
                {
                    isGZunit = true;
                }

                ListItem li = new ListItem();
                li.Text = "--未选择--";
                li.Value = "--";
                ddlDept.Items.Add(li);
                foreach (DataRow dr in dtNodeSets.Rows)
                {
                    li = new ListItem();
                    li.Text = dr["DeptName"].ToString();
                    li.Value = dr["DeptID"].ToString();
                    if (isGZunit)
                    {
                        if (unitIds.IndexOf(li.Value + ";") >= 0)
                        {
                            ddlDept.Items.Add(li);
                        }
                    }
                    else
                    {
                        if (unitIds.IndexOf(li.Value + ";") < 0)
                        {
                            ddlDept.Items.Add(li);
                        }
                    }

                }
            }
        }

        /// <summary>
        ///  特殊处理：返回查询脚本
        ///  modi ：gouzg
        ///  2009-03-10
        /// </summary>
        /// <param name="unitIds">单位划分集合：该参数在web.config中设置，只需要设置广州公司，格式：4;40;</param>
        public static string GetUnitQuery(string iUnitID, string unitIds)
        {
            string strWhere = "";
            bool isGZunit = false;//是否属于广州单位
            if (unitIds.IndexOf(iUnitID + ";") >= 0)
            {
                isGZunit = true;
            }
            string[] units = unitIds.Split(';');
            if (isGZunit)
            {
                for (int i = 0; i < units.Length - 1; i++)
                {
                    if (strWhere != "")
                    {
                        strWhere = strWhere + " or FilialeID=" + units[i];
                    }
                    else
                    {
                        strWhere = " FilialeID=" + units[i];
                    }
                }

            }
            else
            {
                for (int i = 0; i < units.Length - 1; i++)
                {
                    if (strWhere != "")
                    {
                        strWhere = strWhere + "  and FilialeID <> " + units[i];
                    }
                    else
                    {
                        strWhere = " FilialeID <> " + units[i];
                    }
                }
            }
            if (strWhere != "")
            {
                strWhere = " ( " + strWhere + " ) ";
            }
            return strWhere;
        }


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetFilialeIDDropDownList(DropDownList ddlDept, string iUnitID, string unitIds)
        {
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " isFiliale='0' or isFiliale='1' ";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];

            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlDept.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["DeptName"].ToString();
                li.Value = dr["DeptID"].ToString();
                if (unitIds.IndexOf(li.Value + ";") >= 0)
                {
                    ddlDept.Items.Add(li);
                }

            }
        }

        /// <summary>
        /// 初始化事务分类选下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetFlowDropDownList(DropDownList ddlFlowType, string FilialeID)
        {
            BLL.Pub_FunDef bllpd = new BLL.Pub_FunDef();
            string strWhere = " FunType='App' and Flag='C' and FunID like 'emc.workflow.%' and FilialeID='" + FilialeID + "' and IsAct='1'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlFlowType.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["FunName"].ToString();
                li.Value = dr["FunID"].ToString();
                ddlFlowType.Items.Add(li);
            }
        }

        /// <summary>
        /// 初始化自定义表单选下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetFreeFormDropDownList(DropDownList ddlFlowType, string FilialeID)
        {
            BLL.Pub_FunDef bllpd = new BLL.Pub_FunDef();
            string strWhere = " FunType='App' and Flag='L' and FunID like 'emc.workflow.%' and FilialeID='" + FilialeID + "' and IsAct='1'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlFlowType.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["FunName"].ToString();
                li.Value = dr["BoName"].ToString();
                ddlFlowType.Items.Add(li);
            }
        }
        public static void GetDeptTreeDropDownList(DropDownList ddlDept, string FilialeID)
        {

            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " FilialeID='" + FilialeID + "'";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            string strParentColumn = "ParentID";
            string strRootValue = "0";
            string strIndexColumn = "DeptID";
            string strTextColumn = "DeptName";
            int i = -1;
            MakeTree(dtNodeSets, strParentColumn, strRootValue, strIndexColumn, strTextColumn, ddlDept, i);

        }
        

        /**/
        /// <summary> 
        /// 绑定生成一个有树结构的下拉菜单 
        /// </summary> 
        /// <param name="dtNodeSets">菜单记录数据所在的表</param> 
        /// <param name="strParentColumn">表中用于标记父记录的字段</param> 
        /// <param name="strRootValue">第一层记录的父记录值(通常设计为0或者-1或者Null)用来表示没有父记录</param> 
        /// <param name="strIndexColumn">索引字段，也就是放在DropDownList的Value里面的字段</param> 
        /// <param name="strTextColumn">显示文本字段，也就是放在DropDownList的Text里面的字段</param> 
        /// <param name="drpBind">需要绑定的DropDownList</param> 
        /// <param name="i">用来控制缩入量的值，请输入-1</param> 
        public static void MakeTree(DataTable dtNodeSets, string strParentColumn, string strRootValue, string strIndexColumn, string strTextColumn, DropDownList drpBind, int i)
        {
            //每向下一层，多一个缩入单位 
            i++;

            DataView dvNodeSets = new DataView(dtNodeSets);
            dvNodeSets.RowFilter = strParentColumn + "=" + strRootValue;

            string strPading = ""; //缩入字符 

            //通过i来控制缩入字符的长度，我这里设定的是一个全角的空格 
            for (int j = 0; j < i; j++)
                strPading += "　";//如果要增加缩入的长度，改成两个全角的空格就可以了 

            foreach (DataRowView drv in dvNodeSets)
            {
                ListItem li = new ListItem();//strPading + "├" + drv[strTextColumn].ToString(), drv[strIndexColumn].ToString()
                li.Value = drv[strIndexColumn].ToString();
                li.Text = strPading + "├" + drv[strTextColumn].ToString();
                drpBind.Items.Add(li);
                MakeTree(dtNodeSets, strParentColumn, drv[strIndexColumn].ToString(), strIndexColumn, strTextColumn, drpBind, i);
            }

            //递归结束，要回到上一层，所以缩入量减少一个单位 
            i--;
        }

        /// <summary>
        /// 初始化基础数据下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataDropDownList(DropDownList ddlList, string RefObj, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            ddlList.DataSource = dv;
            ddlList.DataTextField = "RefValue";
            ddlList.DataValueField = "RefValueCode";
            ddlList.DataBind();
        }
        /// <summary>
        /// 初始化基础数据下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataDropDownListS(DropDownList ddlList, string RefObj, DataSet ds)
        {
            ddlList.Items.Clear();
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["RefValue"].ToString();
                li.Value = dr["RefValueCode"].ToString();
                ddlList.Items.Add(li);
            }
        }
        /// <summary>
        /// 初始化基础数据下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataDropDownList(DropDownList ddlList, string RefObj, string RefValueCode, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            ddlList.DataSource = dv;
            ddlList.DataTextField = "RefValue";
            ddlList.DataValueField = "RefValueCode";
            ddlList.DataBind();
            if (ddlList.Items != null && ddlList.Items.FindByValue(RefValueCode) != null)
            {
                ddlList.Items.FindByValue(RefValueCode).Selected = true;
            }
        }
        /// <summary>
        /// 初始化基础数据下拉列表的值,有空选
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataEptDropDownList(DropDownList ddlList, string RefObj, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRowView dr in dv)
            {
                li = new ListItem();
                li.Text = dr["RefValue"].ToString();
                li.Value = dr["RefValueCode"].ToString();
                ddlList.Items.Add(li);
            }

        }

        /// <summary>
        /// 初始化基础数据下拉列表的值,有空选
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataEptDropDownList(DropDownList ddlList, string RefObj)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + RefObj + "'";
            DataSet dsbd = DbHelperSQL.Query(sql);


            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dsbd.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["RefValue"].ToString();
                li.Value = dr["RefValueCode"].ToString();
                ddlList.Items.Add(li);
            }

        }
        /// <summary>
        /// 初始化基础数据下拉列表的值,有空选
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataIDEptDropDownList(DropDownList ddlList, string RefObj)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + RefObj + "'";
            DataSet dsbd = DbHelperSQL.Query(sql);


            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dsbd.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["RefValue"].ToString();
                li.Value = dr["RefID"].ToString();
                ddlList.Items.Add(li);
            }

        }
       
        /// <summary>
        /// 初始化基础数据多选框列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataCheckBoxList(CheckBoxList cblList, string RefObj, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            cblList.DataSource = dv;
            cblList.DataTextField = "RefValue";
            cblList.DataValueField = "RefValueCode";
            cblList.DataBind();
        }

        /// <summary>
        /// 初始化基础数据多选框列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataCheckBoxList(CheckBoxList cblList, string RefObj)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + RefObj + "'";
            DataSet dsbd = DbHelperSQL.Query(sql);
            cblList.DataSource = dsbd.Tables[0];
            cblList.DataTextField = "RefValue";
            cblList.DataValueField = "RefValueCode";
            cblList.DataBind();
        }

        public static string GetCheckBoxListValue(CheckBoxList cbl)
        {
            string str_cbl = "";
            if (cbl.SelectedItem != null)
            {
                foreach (ListItem li in cbl.Items)
                {
                    if (li.Selected == true)
                    {
                        str_cbl += li.Value + ",";
                    }
                }
            }
            if (str_cbl != "")
            {
                str_cbl = str_cbl.Substring(0, str_cbl.Length - 1);
            }
            return str_cbl;
        }
        public static string GetCheckBoxListText(CheckBoxList cbl)
        {
            string str_cbl = "";
            if (cbl.SelectedItem != null)
            {
                foreach (ListItem li in cbl.Items)
                {
                    if (li.Selected == true)
                    {
                        str_cbl += li.Text + ",";
                    }
                }
            }
            if (str_cbl != "")
            {
                str_cbl = str_cbl.Substring(0, str_cbl.Length - 1);
            }
            return str_cbl;
        }
        /// <summary>
        /// 初始化基础数据多选框列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataRadioButtonList(RadioButtonList rblList, string RefObj)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + RefObj + "'";
            DataSet dsbd = DbHelperSQL.Query(sql);
            rblList.DataSource = dsbd.Tables[0];
            rblList.DataTextField = "RefValue";
            rblList.DataValueField = "RefValueCode";
            rblList.DataBind();

        }
        /// <summary>
        /// 初始化基础数据多选框列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataRadioButtonList(RadioButtonList rblList, string RefObj, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            rblList.DataSource = dv;
            rblList.DataTextField = "RefValue";
            rblList.DataValueField = "RefValueCode";
            rblList.DataBind();

        }

        /// <summary>
        /// 初始化基础数据多选框列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataRadioButtonList(RadioButtonList rblList, string RefObj, string RefValueCode, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            rblList.DataSource = dv;
            rblList.DataTextField = "RefValue";
            rblList.DataValueField = "RefValueCode";
            rblList.DataBind();
            if (rblList.Items != null && rblList.Items.FindByValue(RefValueCode) != null)
            {
                rblList.Items.FindByValue(RefValueCode).Selected = true;
            }
        }

        /// <summary>
        /// 显示页面中设置下拉框的当前选项
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        /// <param name="RefValue">参数代码</param>
        /// <param name="RefText">参数名</param>
        public static void ShowBaseDataDropDownList(DropDownList ddlList, string RefText, string RefValue)
        {
            if (RefValue == null && RefText == null)
            {
                return;
            }

            if (ddlList.Items.FindByText(RefText) == null)
            {

                ListItem li = new ListItem();
                li.Text = RefText;
                if (RefValue == "")
                {
                    li.Value = RefText;
                }
                else
                {
                    li.Value = RefValue;
                }
                ddlList.ClearSelection();
                li.Selected = true;
                ddlList.Items.Add(li);
            }
            else
            {
                ddlList.Items.FindByText(RefText).Selected = true;
            }
        }


        /// <summary>
        /// 显示页面中设置下拉框的当前选项
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        /// <param name="RefValue">参数代码</param>
        public static void ShowDropDownList(DropDownList ddlList, string RefValue)
        {
            if (RefValue == null && RefValue == "")
            {
                return;
            }
            if (ddlList.Items.FindByValue(RefValue) != null)
            {
                ddlList.ClearSelection();
                ddlList.Items.FindByValue(RefValue).Selected = true;
            }
        }

        /// <summary>
        /// 显示页面中设置单选框的当前选项
        /// </summary>
        /// <param name="rblList">RadioButtonList</param>
        /// <param name="RefValue">参数代码</param>
        public static void ShowRadioButtonList(RadioButtonList rblList, string RefValue)
        {
            if (RefValue == null && RefValue == "")
            {
                return;
            }
            if (rblList.Items.FindByValue(RefValue) != null)
            {
                rblList.ClearSelection();
                rblList.Items.FindByValue(RefValue).Selected = true;
            }
        }
        /// <summary>
        /// 显示页面中设置多选框的当前选项
        /// </summary>
        /// <param name="cblList">CheckBoxList</param>
        /// <param name="RefValue">参数代码,可用逗号”，“隔开</param>
        public static void ShowCheckBoxList(CheckBoxList cblList, string RefValue)
        {
            if (RefValue == null && RefValue == "")
            {
                return;
            }
            string[] arrValue = RefValue.Split(',');
            if (arrValue.Length > 0)
            {
                cblList.ClearSelection();
                for (int i = 0; i < arrValue.Length; i++)
                {
                    if (arrValue[i].ToString() != "" && cblList.Items.FindByValue(arrValue[i].ToString()) != null)
                    {
                        cblList.Items.FindByValue(arrValue[i].ToString()).Selected = true;
                    }
                }
            }

        }

        /// <summary>
        /// 初始化基础数据下拉列表的值,有空选
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetBaseDataSelectDropDownList(DropDownList ddlList, string RefObj, DataSet ds)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = "RefObj = '" + RefObj + "'";
            ListItem li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "--";
            ddlList.Items.Add(li);
            foreach (DataRow dr in dv.Table.Rows)
            {
                li = new ListItem();
                li.Text = dr["RefValue"].ToString();
                li.Value = dr["RefValueCode"].ToString();
                ddlList.Items.Add(li);
            }
        }


        //取的审批功能定义信息
        public static string GetFunDefValue(string FieldName, string FunID)
        {
            string FieldValue = "";
            BLL.Pub_FunDef bllpf = new SfSoft.BLL.Pub_FunDef();
            string strWhere = " FunID ='" + FunID + "' and FunType='App'";
            DataSet dspf = bllpf.GetList(strWhere);
            if (dspf != null && dspf.Tables[0].Rows.Count > 0)
            {
                FieldValue = dspf.Tables[0].Rows[0][FieldName].ToString();

            }
            return FieldValue;

        }

        public static DataSet GetBoInfo(string strWhere, string BoName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * ");
            strSql.Append(" FROM " + BoName + " ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="UserID">发信人ID</param>
        /// <param name="CnName">发信人姓名</param>
        /// <param name="msn">消息内容</param>
        /// <param name="msndt">收信人列表</param>
        public static void SendMsn(string UserID, string CnName, string msn, DataTable msndt)
        {

            Model.Pub_Msn modelpm = new SfSoft.Model.Pub_Msn();
            Model.Pub_Msn_Addressee modelpma = new SfSoft.Model.Pub_Msn_Addressee();
            BLL.Pub_Msn bllpm = new SfSoft.BLL.Pub_Msn();
            BLL.Pub_Msn_Addressee bllpma = new SfSoft.BLL.Pub_Msn_Addressee();
            modelpm.Name = CnName;
            modelpm.SendTime = DateTime.Now;
            modelpm.Msn = msn;
            modelpm.UID = PageValidate.StringToInt(UserID);
            int msnid = bllpm.Add(modelpm);
            foreach (DataRow dr in msndt.Rows)
            {
                modelpma.MsnID = msnid;
                modelpma.isRead = 0;
                modelpma.ReadTime = null;
                modelpma.Addressee = dr["CnName"].ToString();
                modelpma.AddresseeID = PageValidate.StringToInt(dr["UID"].ToString());
                bllpma.Add(modelpma);
            }
        }

        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="UserID">发信人ID</param>
        /// <param name="CnName">发信人姓名</param>
        /// <param name="msn">消息内容</param>
        /// <param name="ContactIDs">收信人ID，“，”隔开</param>
        /// <param name="ContactIDs">收信人名，“，”隔开</param>
        public static void SendMsn(string UserID, string CnName, string msn, string ContactIDs, string ContactNames)
        {
            if (ContactIDs == "" || ContactNames == "")
            {
                return;
            }
            Model.Pub_Msn modelpm = new SfSoft.Model.Pub_Msn();
            Model.Pub_Msn_Addressee modelpma = new SfSoft.Model.Pub_Msn_Addressee();
            BLL.Pub_Msn bllpm = new SfSoft.BLL.Pub_Msn();
            BLL.Pub_Msn_Addressee bllpma = new SfSoft.BLL.Pub_Msn_Addressee();
            modelpm.Name = CnName;
            modelpm.SendTime = DateTime.Now;
            modelpm.Msn = msn;
            modelpm.UID = PageValidate.StringToInt(UserID);
            int msnid = bllpm.Add(modelpm);
            string[] arrContactIDs = ContactIDs.Split(',');
            string[] arrContactNames = ContactNames.Split(',');
            if (arrContactIDs.Length > 0)
            {

                for (int i = 0; i < arrContactIDs.Length; i++)
                {
                    modelpma.MsnID = msnid;
                    modelpma.isRead = 0;
                    modelpma.ReadTime = null;
                    modelpma.Addressee = arrContactNames[i].ToString();
                    modelpma.AddresseeID = PageValidate.StringToInt(arrContactIDs[i].ToString());
                    bllpma.Add(modelpma);
                }
            }
        }



        //建立MSN收信人结构


        public static DataTable CreateMsNStructure()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("UID", typeof(string)));
            dt.Columns.Add(new DataColumn("CnName", typeof(string)));
            dt.Columns.Add(new DataColumn("Face", typeof(string)));
            return dt;
        }

        //获取基础数据
        //public static string GetBaseData

        //取基础数据
        public static DataSet GetBaseDataDs(string MID, string FilialeID)
        {
            //取的基础数据
            BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
            string strWhereBd = "RefObj like '" + MID + "%' and isAct='1'";
            if (FilialeID != "")
            {
                strWhereBd += " and FilialeID='" + FilialeID + "'";
            }
            DataSet dsbd = bllbd.GetList(strWhereBd);
            return dsbd;
        }

        //取基础数据
        public static DataSet GetBaseDataDs(string strWhere)
        {
            BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
            DataSet dsbd = bllbd.GetList(strWhere);
            return dsbd;
        }
        /// <summary>
        /// 发送单个收信人消息
        /// </summary>
        /// <param name="msg">消息内容</param>
        /// <param name="Addressee">收信人</param>
        /// <param name="AddresseeID">收信人ID</param>
        /// <param name="UserID">发信人ID</param>
        /// <param name="CnName">发信人</param>
        /// <param name="Remark">备注，没有为空</param>
        public static void SendMSN(string msg, string Addressee, string AddresseeID, string UserID, string CnName, string Remark)
        {
            StringBuilder strMsn = new StringBuilder();
            strMsn.Append("--------消息提醒--------------<br>");
            strMsn.Append("" + msg + "<br>");
            if (Remark != "")
            {
                strMsn.Append("备注:" + Remark + "<br>");
            }
            strMsn.Append("---------------------------------");
            DataTable dt = EmcCommon.CreateMsNStructure();
            if (UserID != "")
            {
                DataRow dr = dt.NewRow();
                dr["UID"] = UserID;
                dr["CnName"] = CnName;
                dr["Face"] = "";
                dt.Rows.Add(dr);
            }
            if (AddresseeID != "")
            {
                DataRow dr = dt.NewRow();
                dr["UID"] = AddresseeID;
                dr["CnName"] = Addressee;
                dr["Face"] = "";
                dt.Rows.Add(dr);
            }
            //发送消息


            EmcCommon.SendMsn(UserID, CnName, strMsn.ToString(), dt);
        }
        /// <summary>
        /// 发送多个收信人消息
        /// </summary>
        /// <param name="msg">消息内容</param>
        /// <param name="DataTable dt">收信人  实例DataTable dt = EmcCommon.CreateMsNStructure();</param>
        /// <param name="UserID">发信人ID</param>
        /// <param name="CnName">发信人</param>
        /// <param name="Remark">备注，没有为空</param>
        public static void SendMSN(string msg, DataTable dt, string UserID, string CnName, string Remark)
        {
            StringBuilder strMsn = new StringBuilder();
            strMsn.Append("--------消息提醒--------------<br>");
            strMsn.Append("" + msg + "<br>");
            if (Remark != "")
            {
                strMsn.Append("备注:" + Remark + "<br>");
            }
            strMsn.Append("---------------------------------");

            if (UserID != "")
            {
                DataRow dr = dt.NewRow();
                dr["UID"] = UserID;
                dr["CnName"] = CnName;
                dr["Face"] = "";
                dt.Rows.Add(dr);
            }
            //发送消息
            EmcCommon.SendMsn(UserID, CnName, strMsn.ToString(), dt);
        }
        /// <summary>
        /// 显示单据所带的附件
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        public static void ShowFileList(SmartGridView sgvFilelist, string DocID, string MID)
        {
            BLL.Pub_AttFiles bllpaf = new SfSoft.BLL.Pub_AttFiles();
            string strWhere = " DocID='" + DocID + "' and MID='" + MID + "'";
            DataSet dspaf = bllpaf.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(sgvFilelist, dspaf.Tables[0]);
            //sgvFilelist.DataSource = dspaf.Tables[0];
            //sgvFilelist.DataBind();

        }
        /// <summary>
        /// 显示单据所带的附件
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        ///  <param name="return">有数据反回true,没有数据返回false</param>
        public static bool ShowFileListExt(SmartGridView sgvFilelist, string DocID, string MID)
        {
            BLL.Pub_AttFiles bllpaf = new SfSoft.BLL.Pub_AttFiles();
            string strWhere = " DocID='" + DocID + "' and MID='" + MID + "'";
            DataSet dspaf = bllpaf.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(sgvFilelist, dspaf.Tables[0]);
            if (dspaf.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
            //sgvFilelist.DataSource = dspaf.Tables[0];
            //sgvFilelist.DataBind();

        }
        /// <summary>
        /// 显示单据所带的附件
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        public static void ShowFileList(SmartGridView sgvFilelist, string DocID, string MID, string ClassID)
        {
            BLL.Pub_AttFiles bllpaf = new SfSoft.BLL.Pub_AttFiles();
            string strWhere = " DocID='" + DocID + "' and MID='" + MID + "' and ClassID='" + ClassID + "'";
            DataSet dspaf = bllpaf.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(sgvFilelist, dspaf.Tables[0]);
            //sgvFilelist.DataSource = dspaf.Tables[0];
            //sgvFilelist.DataBind();

        }

        /// <summary>
        /// 修改调查显示的附件
        /// modi:guozg
        /// date:2009-04-27
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        public static void ShowDCFileList(SmartGridView sgvFilelist, string DocID, string MID, string ClassID)
        {
            BLL.Pub_AttFiles bllpaf = new SfSoft.BLL.Pub_AttFiles();
            string strWhere = " DocID='" + DocID + "' and MID='" + MID + "' and ClassID= (select top 1 ID from Emc_GtmTicket_Fb where TicketID='" + DocID + "' and userid='" + ClassID + "')";
            DataSet dspaf = bllpaf.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(sgvFilelist, dspaf.Tables[0]);
            //sgvFilelist.DataSource = dspaf.Tables[0];
            //sgvFilelist.DataBind();

        }

        /// <summary>
        /// 保存单据的附件


        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        /// <param name="ClassID">分类ID</param>
        /// <param name="folder">保存的文件夹</param>
        /// <param name="FileUpload1">文件1</param>
        /// <param name="FileUpload2">文件2</param>
        /// <param name="FileUpload3">文件3</param>
        /// <param name="FileUpload4">文件4</param>
        /// <param name="FileUpload5">文件5</param>
        public static void SaveFiles(string DocID, string MID, string ClassID, string folder, FileUpload FileUpload1, FileUpload FileUpload2, FileUpload FileUpload3, FileUpload FileUpload4, FileUpload FileUpload5)
        {
            string fname1 = "";
            string fname2 = "";
            string fname3 = "";
            string fname4 = "";
            string fname5 = "";
            if (FileUpload1 != null)
            {
                fname1 = FileUpload1.FileName.Trim();
            }
            if (FileUpload2 != null)
            {
                fname2 = FileUpload2.FileName.Trim();
            }
            if (FileUpload3 != null)
            {
                fname3 = FileUpload3.FileName.Trim();
            }
            if (FileUpload4 != null)
            {
                fname4 = FileUpload4.FileName.Trim();
            }
            if (FileUpload5 != null)
            {
                fname5 = FileUpload5.FileName.Trim();
            }
            string newfname = "";
            string filepath = Common.Common.UpLoadDir + folder;
            if (fname1 != "" && FileUpload1.Visible != false)
            {
                newfname = Common.FileUpLoadCommon.UpFile(folder, FileUpload1);
                AttFiles.SaveAttFile(fname1, filepath + newfname, MID, DocID, ClassID);
            }
            if (fname2 != "" && FileUpload2.Visible != false)
            {
                newfname = Common.FileUpLoadCommon.UpFile(folder, FileUpload2);
                AttFiles.SaveAttFile(fname2, filepath + newfname, MID, DocID, ClassID);
            }
            if (fname3 != "" && FileUpload3.Visible != false)
            {
                newfname = Common.FileUpLoadCommon.UpFile(folder, FileUpload3);
                AttFiles.SaveAttFile(fname3, filepath + newfname, MID, DocID, ClassID);
            }
            if (fname4 != "" && FileUpload4.Visible != false)
            {
                newfname = Common.FileUpLoadCommon.UpFile(folder, FileUpload4);
                AttFiles.SaveAttFile(fname4, filepath + newfname, MID, DocID, ClassID);
            }
            if (fname5 != "" && FileUpload5.Visible != false)
            {
                newfname = Common.FileUpLoadCommon.UpFile(folder, FileUpload5);
                AttFiles.SaveAttFile(fname5, filepath + newfname, MID, DocID, ClassID);
            }
        }
        public static void DeleteAttFiles(string MID, string DocID)
        {

            BLL.Pub_AttFiles bllaf = new BLL.Pub_AttFiles();
            string strWhere = "MID ='" + MID + "' and DocID='" + DocID + "'";
            DataSet dsaf = bllaf.GetList(strWhere);
            if (dsaf.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dsaf.Tables[0].Rows)
                {
                    string FID = dr["ID"].ToString();
                    string filepath = dr["FilePath"].ToString();
                    FileUpLoadCommon.DeleteFile(filepath);
                    bllaf.Delete(int.Parse(FID));
                }
            }
        }


        /// <summary>
        /// 文件下载
        /// </summary>
        /// <param name="_Request">Page.Request</param>
        /// <param name="_Response">Page.Response</param>
        /// <param name="_fileName">下载后保存的文件名</param>
        /// <param name="_fullPath">下载路径</param>
        /// <param name="_speed">下载速度</param>
        /// <returns></returns>
        public static bool ResponseFile(HttpRequest _Request, HttpResponse _Response, string _fileName, string _fullPath, long _speed)
        {
            try
            {
                FileStream myFile = new FileStream(_fullPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                BinaryReader br = new BinaryReader(myFile);
                try
                {
                    _Response.AddHeader("Accept-Ranges", "bytes");
                    _Response.Buffer = false;
                    long fileLength = myFile.Length;
                    long startBytes = 0;

                    double pack = 10240; //10K bytes
                    //int sleep = 200;   //每秒5次   即5*10K bytes每秒
                    int sleep = (int)Math.Floor(1000 * pack / _speed) + 1;
                    if (_Request.Headers["Range"] != null)
                    {
                        _Response.StatusCode = 206;
                        string[] range = _Request.Headers["Range"].Split(new char[] { '=', '-' });
                        startBytes = Convert.ToInt64(range[1]);
                    }
                    _Response.AddHeader("Content-Length", (fileLength - startBytes).ToString());
                    if (startBytes != 0)
                    {
                        //Response.AddHeader("Content-Range", string.Format(" bytes {0}-{1}/{2}", startBytes, fileLength-1, fileLength));
                    }
                    _Response.AddHeader("Connection", "Keep-Alive");
                    _Response.ContentType = "application/octet-stream";
                    _Response.AddHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(_fileName, System.Text.Encoding.UTF8));

                    br.BaseStream.Seek(startBytes, SeekOrigin.Begin);
                    int maxCount = (int)Math.Floor((fileLength - startBytes) / pack) + 1;

                    for (int i = 0; i < maxCount; i++)
                    {
                        if (_Response.IsClientConnected)
                        {
                            _Response.BinaryWrite(br.ReadBytes(int.Parse(pack.ToString())));
                            Thread.Sleep(sleep);
                        }
                        else
                        {
                            i = maxCount;
                        }
                    }
                }
                catch
                {
                    return false;
                }
                finally
                {
                    br.Close();

                    myFile.Close();
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 初始化时间下拉列表的值


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void SetTimeDropDownList(DropDownList ddlList, string CurTime)
        {
            string sttext = "";
            string sttext1 = "";
            ListItem li0 = new ListItem();
            li0.Text = "";
            li0.Value = "00";
            ddlList.Items.Add(li0);
            for (int i = 0; i <= 23; i++)
            {


                if (i < 10)
                {
                    sttext = "0" + i.ToString() + ":00";
                    sttext1 = "0" + i.ToString() + ":30";
                }
                else
                {
                    sttext = i.ToString() + ":00";
                    sttext1 = i.ToString() + ":30";
                }

                ListItem li = new ListItem();
                ListItem li1 = new ListItem();
                li.Text = sttext;
                li.Value = sttext;
                if (CurTime == sttext)
                {
                    li.Selected = true;
                }
                ddlList.Items.Add(li);

                li1.Text = sttext1;
                li1.Value = sttext1;
                if (CurTime == sttext1)
                {
                    if (li.Selected == true)
                    {
                        li.Selected = false;
                    }
                    li1.Selected = true;
                }
                ddlList.Items.Add(li1);
            }


        }

        /// <summary>
        /// 初始化时间下拉列表的值,时间可定义阶差


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        /// <param name="CurTime">当前时间</param>
        /// <param name="mm">可以定义时间段的差值，是5的整数陪小于60</param>
        public static void SetTimeDropDownList(DropDownList ddlList, string CurTime, int mm)
        {
            string sttext = "";
            int n1 = 60 / mm;

            for (int i = 0; i <= 23; i++)
            {


                if (i < 10)
                {

                    sttext = "0" + i.ToString();
                }
                else
                {
                    sttext = i.ToString();
                }

                ListItem li = null;
                string st1 = "";
                int ct = 0;
                for (int j = 0; j < n1; j++)
                {
                    li = new ListItem();
                    ct = j * mm;
                    if (ct < 10)
                    {
                        st1 = sttext + ":" + "0" + ct.ToString();
                    }
                    else
                    {
                        st1 = sttext + ":" + ct.ToString();
                    }

                    li.Text = st1;
                    li.Value = st1;
                    if (CurTime == st1)
                    {
                        li.Selected = true;
                    }

                    ddlList.Items.Add(li);
                    if (st1 == "17:45")
                    {
                        li = new ListItem();
                        li.Text = "17:48";
                        li.Value = "17:48";
                        if (CurTime == li.Text)
                        {
                            li.Selected = true;
                        }
                        ddlList.Items.Add(li);
                    }
                }

            }


        }
        public static string GetShortTime(DateTime dt, bool isMit)
        {

            int hh = dt.Hour;
            int mm = dt.Minute;
            string hh1 = "";
            string mm1 = "";
            if (hh < 10)
            {
                hh1 = "0" + hh.ToString();
            }
            else
            {
                hh1 = hh.ToString();
            }
            if (mm < 10)
            {
                mm1 = "0" + mm.ToString();
            }
            else
            {
                mm1 = mm.ToString();
            }
            if (isMit)
            {
                return hh1 + ":" + mm1;
            }
            else
            {
                if (mm < 30)
                {
                    return hh1 + ":00";
                }
                else
                {
                    return hh1 + ":30";
                }
            }

        }
        public static string GetDbIntString(int inputdata)
        {
            if (inputdata < 10)
            {
                return "0" + inputdata.ToString();
            }
            else
            {
                return inputdata.ToString();
            }
        }

        /// <summary>
        /// 月份下拉列表的值


        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetMonthDropDown(DropDownList ddlList, string mm)
        {
            ListItem li = null;
            for (int i = 1; i <= 12; i++)
            {
                li = new ListItem();
                li.Value = i.ToString();
                li.Text = i.ToString() + " 月";
                if (mm == i.ToString())
                {
                    li.Selected = true;
                }
                ddlList.Items.Add(li);
            }
        }
        /*
        /// <summary>
        /// MultiListBox 双选下拉框用户选择设置
        /// </summary>
        /// <param name="mlb"></param>
        /// <param name="mlbid"></param>
        public static void SetJoinMultiListBox(FrameWork.WebControls.MultiListBox mlb, string mlbid, string FilialeID)
        {
            ListItem litemp = new ListItem();
            string[] liarry = null;
            string strWhereIn = "";
            if (mlbid != "")
            {
                mlbid = mlbid.Substring(1, mlbid.Length - 1);
                liarry = mlbid.Split(',');
                StringBuilder strWhereInB = new StringBuilder();
                for (int i = 0; i < liarry.Length; i++)
                {
                    if (liarry[i].ToString() != "")
                    {
                        strWhereInB.Append("'" + liarry[i].ToString() + "',");
                    }
                }
                if (strWhereInB.ToString() != "")
                {
                    strWhereIn = strWhereInB.ToString().Substring(0, strWhereInB.ToString().Length - 1);
                }
            }
            if (strWhereIn != "")
            {
                strWhereIn = " (" + strWhereIn + ") ";
            }
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + FilialeID + "')   order by CnName";
            if (strWhereIn != "")
            {
                //strWhere = " and ID not in " + strWhereIn + "";
            }
            DataSet dsEmp = bllEmp.GetList(strWhere);
            DataTable dtNodeSets = dsEmp.Tables[0];
            DataView dv = new DataView(dsEmp.Tables[0]);

            if (strWhereIn != "")
            {
                dv.RowFilter = " ID not in " + strWhereIn + "";
            }
            ListItem li = new ListItem();
            foreach (DataRowView dr in dv)
            {
                li = new ListItem();
                li.Text = dr["CnName"].ToString();
                li.Value = dr["ID"].ToString();
                mlb.FirstListBox.Items.Add(li);
            }
            if (strWhereIn != "")
            {
                DataView dv1 = new DataView(dsEmp.Tables[0]);
                dv1.RowFilter = " ID  in " + strWhereIn + "";
                li = new ListItem();
                foreach (DataRowView dr in dv1)
                {
                    li = new ListItem();
                    li.Text = dr["CnName"].ToString();
                    li.Value = dr["ID"].ToString();
                    mlb.SecondListBox.Items.Add(li);
                }
            }
        }
         * */
        /// <summary>
        /// 去除字符串中最后一个字符


        /// </summary>
        /// <param name="Inputdata">输入的字符</param>
        /// <param name="delchar">要去除的字符</param>
        /// <returns></returns>
        public static string DeleteLastChar(string Inputdata, string delchar)
        {
            if (Inputdata != "")
            {
                Inputdata = Inputdata.Substring(0, Inputdata.Length - 1);
                return Inputdata;
            }
            else
            {
                return "";
            }
        }
        /// <summary>
        /// 年份下拉
        /// </summary>
        /// <param name="dlist"></param>
        /// <param name="StartYear">开始年</param>
        /// <param name="EndYear">结束年</param>
        public static void SetYearsDropDownList(DropDownList dlist, int StartYear, int EndYear)
        {
            ListItem li = null;
            for (int i = StartYear; i <= EndYear; i++)
            {
                li = new ListItem();
                if (i == DateTime.Now.Year)
                {
                    li.Selected = true;
                }
                li.Text = i.ToString();
                li.Value = i.ToString();
                dlist.Items.Add(li);
            }
        }
        /// <summary>
        /// 年份下拉
        /// </summary>
        /// <param name="dlist"></param>
        /// <param name="StartYear">开始年</param>
        /// <param name="EndYear">结束年</param>
        public static void SetYearsDropDownList(DropDownList dlist, int StartYear, int EndYear, int CurYear)
        {
            ListItem li = null;
            for (int i = StartYear; i <= EndYear; i++)
            {
                li = new ListItem();
                if (CurYear != 0)
                {
                    if (i == CurYear)
                    {
                        li.Selected = true;
                    }
                }
                else
                {
                    if (i == DateTime.Now.Year)
                    {
                        li.Selected = true;
                    }
                }
                li.Text = i.ToString();
                li.Value = i.ToString();
                dlist.Items.Add(li);
            }
        }
        /// <summary>
        /// 月份下拉
        /// </summary>
        /// <param name="dlist"></param>
        /// <param name="StartYear">开始月</param>
        /// <param name="EndYear">结束月</param>
        public static void SetMonthsDropDownList(DropDownList dlist, int StartMonth, int EndMonth, int CurMonth)
        {
            ListItem li = null;
            for (int i = StartMonth; i <= EndMonth; i++)
            {
                li = new ListItem();
                if (CurMonth != 0)
                {
                    if (i == CurMonth)
                    {
                        li.Selected = true;
                    }
                }
                else
                {
                    if (i == DateTime.Now.Month)
                    {
                        li.Selected = true;
                    }
                }
                li.Text = i.ToString();
                li.Value = i.ToString();
                dlist.Items.Add(li);
            }
        }

        /// <summary>
        /// 月份下拉，空选


        /// </summary>
        /// <param name="dlist"></param>
        /// <param name="StartYear">开始月</param>
        /// <param name="EndYear">结束月</param>
        public static void SetMonthsSelectDropDownList(DropDownList ddlList, int StartMonth, int EndMonth, int CurMonth)
        {
            ListItem li = null;
            li = new ListItem();
            li.Text = "--未选择--";
            li.Value = "";
            ddlList.Items.Add(li);
            for (int i = StartMonth; i <= EndMonth; i++)
            {
                li = new ListItem();
                if (CurMonth != 0)
                {
                    if (i == CurMonth)
                    {
                        li.Selected = true;
                    }
                }
                li.Text = i.ToString();
                li.Value = i.ToString();
                ddlList.Items.Add(li);
            }
        }

    
        /// <summary>
        /// 根据提醒方式ID,取的对应名称
        /// </summary>
        /// <param name="CallType">ID,用“，”号格开</param>
        /// <returns></returns>
        public static string GetCallTypeTextByID(string CallType)
        {
            string strCallType = "";
            DataSet ds = DBTools.GetList("Select * from Pub_BaseData where RefObj='emc.rcm.template.CallType'");
            if (CallType != "")
            {
                string[] arrCt = CallType.Split(',');
                if (arrCt.Length > 0)
                {
                    for (int i = 0; i < arrCt.Length; i++)
                    {
                        if (arrCt[i].ToString().Trim() != "")
                        {
                            DataRow[] arrDr = ds.Tables[0].Select("RefValueCode='" + arrCt[i].ToString().Trim() + "'");
                            if (arrDr.Length > 0)
                            {
                                strCallType += arrDr[0]["RefValue"].ToString() + ",";
                            }
                        }
                    }
                }
            }
            if (strCallType != "")
            {
                strCallType = strCallType.Substring(0, strCallType.Length - 1);
            }
            return strCallType;
        }
 
        /// <summary>
        /// 审批模块选择
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static DropDownList GetAppFunDropDownList(DropDownList ddlList)
        {
            ListItem li = new ListItem();
            li.Text = "所有审批功能";
            li.Value = "emc";
            ddlList.Items.Add(li);

            BLL.Pub_FunDef bllfd = new SfSoft.BLL.Pub_FunDef();
            string strWherefd = "  FunType='App' and Flag = 'L' Order by FunID";
            DataSet dsfd = bllfd.GetList(strWherefd);
            foreach (DataRow dr in dsfd.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["FunName"].ToString();
                li.Value = dr["FunID"].ToString();
                ddlList.Items.Add(li);
            }
            return ddlList;

        }

        /// <summary>
        /// 审批模块选择
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static DropDownList GetAppFunDropDownList(DropDownList ddlList, string FilialeID)
        {
            ListItem li = new ListItem();
            li.Text = "所有审批功能";
            li.Value = "emc";
            ddlList.Items.Add(li);

            BLL.Pub_FunDef bllfd = new SfSoft.BLL.Pub_FunDef();
            string strWherefd = "  FunType='App' and Flag = 'L' and (FilialeID is null or FilialeID='" + FilialeID + "') Order by FunID";
            DataSet dsfd = bllfd.GetList(strWherefd);
            foreach (DataRow dr in dsfd.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["FunName"].ToString();
                li.Value = dr["FunID"].ToString();
                ddlList.Items.Add(li);
            }
            return ddlList;

        }

        /// <summary>
        /// 审批模块选择
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static DropDownList GetAppFunNotFreeDropDownList(DropDownList ddlList, string FilialeID)
        {
            ListItem li = new ListItem();
            li.Text = "--流程选择--";
            li.Value = "--";
            ddlList.Items.Add(li);

            BLL.Pub_FunDef bllfd = new SfSoft.BLL.Pub_FunDef();
            string strWherefd = "  (FunType = 'App') AND (Flag = 'L') AND (FunID NOT LIKE 'emc.workflow.%') and (FilialeID is null or FilialeID='" + FilialeID + "') Order by FunID";
            DataSet dsfd = bllfd.GetList(strWherefd);
            foreach (DataRow dr in dsfd.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["FunName"].ToString();
                li.Value = dr["FunID"].ToString();
                ddlList.Items.Add(li);
            }
            return ddlList;

        }

        /// <summary>
        /// 验证gridvew中的某列的数据是否存在


        /// </summary>
        /// <param name="gv">GridView</param>
        /// <param name="col">列</param>
        /// <param name="ckvalue">验证值</param>
        /// <returns></returns>
        public static string CheckGridVew(GridView gv, int col, string ckvalue)
        {
            string strmsg = "";
            return strmsg;
            if (gv.Rows.Count > 0 && gv.Columns.Count > 1)
            {
                foreach (GridViewRow gvr in gv.Rows)
                {
                    if (gvr.Cells[col].Text == "ckvalue")
                    {
                        strmsg = "数据已存在!";
                    }
                }
            }

        }


        //取的任务状态


        public static string GetTaskStatusNameByStatus(string status)
        {
            DataSet ds = DBTools.GetList("select * from Pub_BaseData where   RefObj = 'emc.rcm.task.status' and RefValueCode='" + status + "'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RefValue"].ToString();
            }
            else
            {
                return "";
            }
        }

     
        /// <summary>
        /// 显示权限范围
        /// </summary>
        /// <param name="txtAsgName">权限输入框</param>
        /// <param name="hfAsgnsID">权限ID</param>
        /// <param name="MID">模块ID</param>
        /// <param name="ID">单据ID</param>
        public static void ShowAssigns(TextBox txtAsgName, HiddenField hfAsgnsID, string MID, string ID)
        {
            BLL.Pub_Data_Assign bllPDA = new BLL.Pub_Data_Assign();
            string strWhere = " ModulesID='" + MID + "' and DataID='" + ID + "' order by AssignType desc";
            DataSet dspda = bllPDA.GetList(strWhere);
            StringBuilder strAssignsID = new StringBuilder();
            StringBuilder strAssignsName = new StringBuilder();

            if (dspda.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dspda.Tables[0].Rows)
                {
                    string AssignType = dr["AssignType"].ToString();
                    string AssignID = dr["AssignID"].ToString();
                    string AssignName = dr["AssignName"].ToString();
                    strAssignsID.Append("" + AssignType + "-" + AssignID + ",");
                    strAssignsName.Append("" + AssignName + ",");
                }
            }
            string AssignsID = strAssignsID.ToString();
            string AssignsName = strAssignsName.ToString();
            if (AssignsName != null && AssignsName != "" && AssignsID != null && AssignsID != "")
            {
                AssignsID = AssignsID.Substring(0, AssignsID.Length - 1);
                AssignsName = AssignsName.Substring(0, AssignsName.Length - 1);
                txtAsgName.Text = AssignsName;
                hfAsgnsID.Value = AssignsID;
            }

        }
        public static void SaveAssigns(TextBox txtAsgName, HiddenField hfAsgnsID, string MID, string ID)
        {
            BLL.Pub_Data_Assign bllpda = new SfSoft.BLL.Pub_Data_Assign();
            SfSoft.Model.Pub_Data_Assign modelpda = null;
            //删除成员
            bllpda.Delete(int.Parse(ID), MID);
            string strAssignsID = hfAsgnsID.Value;
            string strAssignsName = txtAsgName.Text;
            if (strAssignsID != null && strAssignsID != "")
            {
                string[] arrAssignsID = strAssignsID.Split(',');
                string[] arrAssignsName = strAssignsName.Split(',');

                for (int i = 0; i < arrAssignsID.Length; i++)
                {
                    if (arrAssignsID[i] != null && arrAssignsID[i].ToString() != "")
                    {
                        string AssignsID = arrAssignsID[i].ToString();
                        string AssignsName = arrAssignsName[i].ToString();
                        string AssignType = AssignsID.Substring(0, 1);
                        string AssignsID1 = AssignsID.Substring(2, AssignsID.Length - 2);
                        modelpda = new SfSoft.Model.Pub_Data_Assign();
                        modelpda.ModulesID = MID;
                        modelpda.DataID = PageValidate.StringToInt(ID);
                        modelpda.AssignID = PageValidate.StringToInt(AssignsID1);
                        modelpda.AssignName = AssignsName;
                        modelpda.AssignType = AssignType;
                        bllpda.Add(modelpda);
                    }
                }
            }
        }
        public static void ShowSigns(TextBox txtSigName, HiddenField hfSigID, string MID, string ID)
        {
            BLL.Pub_SignFile bllPSF = new BLL.Pub_SignFile();
            string strWhere = " MID='" + MID + "' and DocID='" + ID + "'";
            DataSet dspsf = bllPSF.GetList(strWhere);

            StringBuilder strSignsID = new StringBuilder();
            StringBuilder strSignsName = new StringBuilder();

            if (dspsf.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dspsf.Tables[0].Rows)
                {
                    string SignID = "U-" + dr["SignsID"].ToString();
                    string SignName = dr["Signs"].ToString();
                    strSignsID.Append("" + SignID + ",");
                    strSignsName.Append("" + SignName + ",");
                }
            }
            string SignsID = strSignsID.ToString();
            string SignsName = strSignsName.ToString();
            if (SignsName != null && SignsName != "" && SignsID != null && SignsID != "")
            {
                SignsID = SignsID.Substring(0, SignsID.Length - 1);
                SignsName = SignsName.Substring(0, SignsName.Length - 1);
                txtSigName.Text = SignsName;
                hfSigID.Value = SignsID;
            }
        }

        public static void SaveSigns(TextBox txtSigName, HiddenField hfSigID, string MID, string ID)
        {
            BLL.Pub_SignFile bllpsf = new SfSoft.BLL.Pub_SignFile();
            Model.Pub_SignFile modelpsf = null;
            //删除成员
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_SignFile ");
            strSql.Append(" where DocID=@DocID and MID=@MID and Status = '未签阅'");
            SqlParameter[] parameters = {
					new SqlParameter("@DocID", SqlDbType.NVarChar,10),
                    new SqlParameter("@MID", SqlDbType.NVarChar ,80)
            };
            parameters[0].Value = ID;
            parameters[1].Value = MID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);


            string strSigID = hfSigID.Value;
            string strSigName = txtSigName.Text;
            if (strSigID != null && strSigID != "")
            {
                string[] arrSigID = strSigID.Split(',');
                string[] arrSigName = strSigName.Split(',');

                for (int i = 0; i < arrSigID.Length; i++)
                {
                    if (arrSigID[i] != null && arrSigID[i].ToString() != "")
                    {
                        string SigID = arrSigID[i].ToString();
                        SigID = SigID.Substring(2, SigID.Length - 2);

                        DataSet dsck = bllpsf.GetList(" MID='" + MID + "' and DocID='" + ID + "' and SignsID='" + SigID + "'");
                        if (dsck.Tables[0].Rows.Count < 1)
                        {
                            string SigName = arrSigName[i].ToString();
                            modelpsf = new SfSoft.Model.Pub_SignFile();
                            modelpsf.SignsID = PageValidate.StringToInt(SigID);
                            modelpsf.Signs = SigName;
                            modelpsf.MID = MID;
                            modelpsf.Status = "未签阅";
                            modelpsf.DocID = ID;
                            bllpsf.Add(modelpsf);
                        }
                    }
                }
            }
        }

     
 
        /// <summary>
        /// 改变人员选择时和保存时的值


        /// </summary>
        /// <param name="MansID"></param>
        /// <param name="Flag"></param>
        /// <returns></returns>
        public static string ChangeSelectID(string MansID, string Flag)
        {
            if (MansID == null || MansID == "")
            {
                return "";
            }
            string NewMansID = "";
            StringBuilder strNewMasID = new StringBuilder();
            string[] arrMansID = null;
            //显示时加上U-
            if (Flag == "show")
            {
                MansID = MansID.Substring(1, MansID.Length - 2);
                arrMansID = MansID.Split(',');
                for (int i = 0; i < arrMansID.Length; i++)
                {
                    strNewMasID.Append("U-" + arrMansID[i].ToString() + ",");
                }
                NewMansID = strNewMasID.ToString();
                NewMansID = NewMansID.Substring(0, NewMansID.Length - 1);
            }
            else
            {
                //保存时去掉U- 加上","
                arrMansID = MansID.Split(',');
                for (int i = 0; i < arrMansID.Length; i++)
                {
                    string mansid = arrMansID[i].ToString();
                    strNewMasID.Append("" + mansid.Substring(2, mansid.Length - 2) + ",");
                }
                NewMansID = "," + strNewMasID.ToString();
            }
            return NewMansID;
        }

        /// <summary>
        /// 改变公司选择时和保存时的值


        /// </summary>
        /// <param name="MansID"></param>
        /// <param name="Flag"></param>
        /// <returns></returns>

        public static string ChangeFilialeSelectID(string FilialesID, string Flag)
        {
            if (FilialesID == null || FilialesID == "")
            {
                return "";
            }
            string NewFilialesID = "";
            StringBuilder strFilialesID = new StringBuilder();
            string[] arrFilialesID = null;
            //显示时加上C-
            if (Flag == "show")
            {
                FilialesID = FilialesID.Substring(1, FilialesID.Length - 2);
                arrFilialesID = FilialesID.Split(',');
                for (int i = 0; i < arrFilialesID.Length; i++)
                {
                    strFilialesID.Append("C-" + arrFilialesID[i].ToString() + ",");
                }
                NewFilialesID = strFilialesID.ToString();
                NewFilialesID = NewFilialesID.Substring(0, NewFilialesID.Length - 1);
            }
            else
            {
                //保存时去掉C- 加上","
                arrFilialesID = FilialesID.Split(',');
                for (int i = 0; i < arrFilialesID.Length; i++)
                {
                    string Filialesid = arrFilialesID[i].ToString();
                    strFilialesID.Append("" + Filialesid.Substring(2, Filialesid.Length - 2) + ",");
                }
                NewFilialesID = "," + strFilialesID.ToString();
            }
            return NewFilialesID;
        }
        public static decimal CountExpense(DataSet ds)
        {
            decimal TotalAmt = 0;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                decimal expamt = decimal.Parse(dr["ExpItemAmt"].ToString());
                TotalAmt += expamt;
            }
            return TotalAmt;
        }
   
        /// <summary>
        /// 验证普通单据的访问权限
        /// </summary>
        /// <param name="MID">模块ID</param>
        /// <param name="ID">单据ID</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="BoName">功能表名</param>
        /// <returns></returns>
        public static bool CheckOrderAcl(string MID, string ID, string UserID, string DeptID, string FilialeID, string BoName)
        {
            bool acl = false;
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID from  " + BoName + "");
            strSql.Append(" where ID='" + ID + "' ");
            strSql.Append(" and (" + DataAcl.GetDataBoWhere(UserID) + "");
            strSql.Append(" or " + DataAcl.GetDataAclWhere(UserID, DeptID, FilialeID, MID) + "");
            strSql.Append(")");
            DataSet ds = DbHelperSQL.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                acl = true;
            }


            return acl;
        }

        /// <summary>
        /// 验证单据数据权限
        /// </summary>
        /// <param name="UserAcldv">权限集</param>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">模块ID</param>
        /// <param name="status">状态</param>
        /// <param name="FunID">管理功能ID</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="BoName">数据表名</param>
        /// <returns></returns>
        public static bool CheckOrderAcl(DataView UserAcldv, string DocID, string MID, string status, string FunID, string UserID, string DeptID, string FilialeID, string BoName)
        {
            bool isApprove = false;
            bool isApproval = false;
            bool isApproved = false;// 审批记录人
            if (status != "") //如果状态不为空，说明为审批单据
            {
                isApprove = SfEmc.DoAppFlow.CheckCurApproval(DocID, MID, UserID);//是否为审批人
                isApproval = SfEmc.UserAcl.checkMenuAcl(UserAcldv, "emc.rcm.todo.mgt");//是否为审批管理员 
                BLL.Pub_AuditRec bllPAR = new Pub_AuditRec();
                Model.Pub_AuditRec model = bllPAR.GetModel(MID, DocID);
                if (model == null)
                {
                    isApproved = false;
                }
                else
                {
                    string ARID = model.ARID.ToString();
                    BLL.Pub_AuditResult bllar = new SfSoft.BLL.Pub_AuditResult();
                    string strWhere = " ARID = '" + ARID + "' ";
                    DataSet ds = bllar.GetList(strWhere);
                    if (ds.Tables[0].Rows.Count < 1)
                    {
                        isApproved = false;
                    }
                    else
                    {
                        isApproved = true;
                    }
                }
            }

            bool isMoudlesMgt = false;
            if (FunID != "")
            {
                isMoudlesMgt = SfEmc.UserAcl.checkMenuAcl(UserAcldv, FunID);//是否为功能管理员
            }
            bool dataacl = false;
            if (BoName != "")
            {
                dataacl = CheckOrderAcl(MID, DocID, UserID, DeptID, FilialeID, BoName);//验证数据权限
            }
            bool acl = isApprove || isApproved || isApproval || isMoudlesMgt || dataacl;
            return acl;
        }
        public static Hashtable GetJobTime(string FilialeID)
        {
            Hashtable hash = new Hashtable();
            BLL.Pub_SysParameter bll = new SfSoft.BLL.Pub_SysParameter();
            Model.Pub_SysParameter model = new SfSoft.Model.Pub_SysParameter();
            model = bll.GetModel(FilialeID);
            string SysStartTimeAm = "08:00";
            string SysEndTimeAm = "12:00";
            string SysStartTimePm = "13:30";
            string SysEndTimePm = "16:00";
            string SysWeekRest0 = "-2";
            string SysWeekRest6 = "-2";
            string SysDaySiesta = "1";
            string SysTotalHours = "8";
            string CheckInEndDay = "0";
            if (model != null)
            {
                SysStartTimeAm = model.SysStartTimeAm;
                SysEndTimeAm = model.SysEndTimeAm;
                SysStartTimePm = model.SysStartTimePm;
                SysEndTimePm = model.SysEndTimePm;
                SysDaySiesta = model.SysDaySiesta.ToString();
                SysTotalHours = model.SysTotalHours.ToString();
                SysWeekRest0 = model.SysWeekRest0;
                SysWeekRest6 = model.SysWeekRest6;
                CheckInEndDay = model.CheckInEndDay.ToString();
            }
            if (SysStartTimeAm == "")
            {
                SysStartTimeAm = "08:00";
            }
            if (SysEndTimeAm == "")
            {
                SysEndTimeAm = "12:00";
            }
            if (SysStartTimePm == "")
            {
                SysStartTimePm = "13:30";
            }
            if (SysEndTimePm == "")
            {
                SysEndTimePm = "16:00";
            }
            hash.Add("SysStartTimeAm", SysStartTimeAm);
            hash.Add("SysEndTimeAm", SysEndTimeAm);
            hash.Add("SysStartTimePm", SysStartTimePm);
            hash.Add("SysEndTimePm", SysEndTimePm);
            hash.Add("SysDaySiesta", SysDaySiesta);
            hash.Add("SysTotalHours", SysTotalHours);
            hash.Add("SysWeekRest0", SysWeekRest0);
            hash.Add("SysWeekRest6", SysWeekRest6);
            hash.Add("CheckInEndDay", CheckInEndDay);
            return hash;

        }

        /// <summary>
        ///增加登录日志
        /// </summary>
        /// <param name="FunID">功能</param>
        /// <param name="FunName">功能名称</param>
        /// <param name="UserName">用户名</param>
        /// <param name="UserID">用户ID</param>
        /// <param name="CnName">姓名</param>
        /// <param name="Dept">部门</param>
        /// <param name="DeptID">部门ID</param>
        /// <param name="FilialeID">公司ID</param>
        /// <param name="LoginTime">登录时间</param>
        /// <param name="IpAddr">IP</param>
        /// <param name="ComputerName">电脑名称</param>
        /// <param name="LogoutTime">退出时间</param>
        /// <param name="SysFlag">系统分类</param>
        /// <param name="OthersFlag">其它分类</param>
        /// <returns>反回日志ID</returns>
        public static int AddSysLogs(string FunID, string FunName, string UserName, string UserID, string CnName, string Dept, string DeptID, string FilialeID, DateTime LoginTime, string IpAddr, string ComputerName, string SysFlag, string OthersFlag)
        {
            int LID = 0;
            BLL.Emc_logs bll = new Emc_logs();
            Model.Emc_logs model = new SfSoft.Model.Emc_logs();
            model.FunID = FunID;
            model.FunName = FunName;
            model.UserName = UserName;
            model.UserID = PageValidate.StringToInt(UserID);
            model.CnName = CnName;
            model.Dept = Dept;
            model.DeptID = PageValidate.StringToInt(DeptID);
            model.FilialeID = FilialeID;
            model.LoginTime = LoginTime;
            model.IpAddr = IpAddr;
            model.ComputerName = ComputerName;
            model.LogoutTime = null;
            model.SysFlag = SysFlag;
            model.OthersFlag = OthersFlag;

            LID = bll.Add(model);

            return LID;
        }
        /// <summary>
        /// 更新退出时间


        /// </summary>
        /// <param name="LogID"></param>
        public static void UpdateSysLogs(string LogID)
        {
            if (LogID == "")
            {
                return;

            }
            BLL.Emc_logs bll = new Emc_logs();
            Model.Emc_logs model = new SfSoft.Model.Emc_logs();
            model = bll.GetModel(int.Parse(LogID));
            if (model != null)
            {
                model.LogoutTime = DateTime.Now;
                bll.Update(model);
            }
        }
        /// <summary>
        /// 建立按扭
        /// </summary>
        /// <param name="btnID"></param>
        /// <param name="text"></param>
        /// <returns></returns>
        public static Button NewButton(string btnID, string text)
        {
            Button tsbtn = new Button();
            tsbtn.ID = btnID;
            tsbtn.Text = text;
            tsbtn.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtn.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtn.CssClass = "btn";
            return tsbtn;
        }

        /// <summary>
        /// 设置按扭
        /// </summary>
        /// <param name="btnID"></param>
        /// <param name="text"></param>
        /// <returns></returns>
        public static void SetButton(Button btn)
        {
            btn.Attributes.Add("onmouseout", "this.className='btn'");
            btn.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            btn.CssClass = "btn";

        }
        /// <summary>
        /// 验证库存数是否满足出库数量
        /// </summary>
        /// <param name="id">主表ID</param>
        /// <param name="tbname">子表名</param>
        /// <param name="numfield">子表数量字段名</param>
        /// <returns></returns>
        public static string CheckOutAssetsStocksQty(string id, string tbname, string numfield)
        {
            string ck = "";
            string strSql = "select ID,StockNum,b." + numfield + ",a.SelfNo,a.AssetName,(isnull(a.StockNum,0)-isnull(b." + numfield + ",0)) as num";
            strSql += " from Emc_Assets as a right join (select AssetID," + numfield + " from  " + tbname + " where refid='" + id + "') as b on a.ID=b.AssetID";
            DataSet dslist = DbHelperSQL.Query(strSql);
            DataRow[] arrdr = dslist.Tables[0].Select("num<=0");
            if (arrdr.Length > 0)
            {
                for (int i = 0; i < arrdr.Length; i++)
                {
                    ck += "编码：【" + arrdr[i]["SelfNo"].ToString() + "】 " + arrdr[i]["AssetName"].ToString() + " 的资产库存数量为：【" + arrdr[i]["StockNum"].ToString() + "】 不能满足操作要求！\\n";
                }
            }
            return ck;

        }

        public static int GetMaxOrderIDByWhere(string table, string strWhere)
        {
            int OrderID = 0;
            string sql = "select max(OrderID) as OrderID from " + table + " where 1=1 and " + strWhere;
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                string OrderID1 = ds.Tables[0].Rows[0]["OrderID"].ToString();
                if (OrderID1 == "")
                {
                    OrderID = 0;
                }
                else
                {
                    OrderID = int.Parse(OrderID1);
                }
            }
            return OrderID + 1;
        }

        /// <summary>
        /// 取的试题分类名称据分类ID
        /// </summary>
        /// <param name="ProblemType"></param>
        /// <returns></returns>
        public static string GetProblemTypeName(string ProblemType)
        {
            BLL.Pub_BaseData bllpb = new Pub_BaseData();
            string strWhere = "RefObj='emc.km.exam.ProblemType' and RefValueCode='" + ProblemType + "'";
            DataSet ds = bllpb.GetList(strWhere);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RefValue"].ToString();
            }
            return "";
        }

        /// <summary>
        /// 取的系统参数ID名称据分类名称
        /// </summary>
        /// <param name="RefValue"></param>
        /// <param name="RefValueCode"></param>
        /// <returns></returns>
        public static string GetSystemValue(string RefObj, string RefValueCode)
        {
            BLL.Pub_BaseData bllpb = new Pub_BaseData();
            string strWhere = "RefObj='" + RefObj + "' and RefValueCode='" + RefValueCode + "'";
            DataSet ds = bllpb.GetList(strWhere);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RefValue"].ToString();
            }
            return "";
        }

        /// <summary>
        /// 取的基础数据文件值根据基础数据ID
        /// </summary>
        /// <param name="RefValue"></param>
        /// <param name="RefValueCode"></param>
        /// <returns></returns>
        public static string GetBaseTextByID(string ID)
        {
            BLL.Pub_BaseData bllpb = new Pub_BaseData();
            string strWhere = "RefID='" + ID + "'";
            DataSet ds = bllpb.GetList(strWhere);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RefValue"].ToString();
            }
            return "";
        }
        /// <summary>
        /// 取的系统参数名称据分类ID
        /// </summary>
        /// <param name="RefValue"></param>
        /// <param name="RefValueCode"></param>
        /// <returns></returns>
        public static string GetSystemText(string RefObj, string RefValue)
        {
            BLL.Pub_BaseData bllpb = new Pub_BaseData();
            string strWhere = "RefObj='" + RefObj + "' and RefValue='" + RefValue + "'";
            DataSet ds = bllpb.GetList(strWhere);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["RefValueCode"].ToString();
            }
            return "";
        }

        /// <summary>
        /// 发邮件
        /// </summary>
        /// <param name="sendusername">发件帐号</param>
        /// <param name="sendpassword">密码</param>
        /// <param name="smtpServer">smtpserver</param>
        /// <param name="From">发件人</param>
        /// <param name="To">收件人</param>
        /// <param name="Cc">抄送</param>
        /// <param name="Bcc">暗送</param>
        /// <param name="Subject">主题</param>
        /// <param name="Body">内容</param>
        /// <param name="BodyFormat">格式html/text</param>
        /// <param name="atts">附件</param>
        public static void SendMail(string sendusername, string sendpassword, string smtpServer, string From, string To, string Cc, string Bcc, string Subject, string Body, string BodyFormat, ArrayList atts)
        {
            try
            {
                MailMessage objMailMessage = new MailMessage();
                objMailMessage.From = sendusername;//源邮件地址 
                objMailMessage.To = To;//目的邮件地址
                objMailMessage.Cc = Cc;
                objMailMessage.Bcc = Bcc;
                objMailMessage.Subject = Subject;//发送邮件的标题 
                objMailMessage.Body = Body;//发送邮件的内容 
                if (BodyFormat.ToLower() == "html")
                {
                    objMailMessage.BodyFormat = MailFormat.Html;
                }
                else
                {
                    objMailMessage.BodyFormat = MailFormat.Text;
                }
                if (atts != null && atts.Count > 0)
                {
                    for (int i = 0; i < atts.Count; i++)
                    {
                        if (atts[i].ToString() != "")
                        {
                            MailAttachment objMailAttachment = new MailAttachment(atts[i].ToString());//发送邮件的附件 
                            objMailMessage.Attachments.Add(objMailAttachment);//将附件附加到邮件消息对象中 
                        }
                    }
                }
                ////接着利用SMTP来发送邮件，需要使用Microsoft .NET Framework SDK v1.1和它以上的版本 
                ////基本权限 
                //objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
                ////用户名 
                //objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", sendusername);
                ////密码 
                //objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", sendpassword);
                ////如果没有上述三行代码，则出现如下错误提示：服务器拒绝了一个或多个收件人地址。服务器响应为: 554 : Client host rejected: Access denied 

                if (sendusername != "")
                {
                    int cdoBasic = 1;
                    int cdoSendUsingPort = 2;
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserver", smtpServer);
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", 25);
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusing", cdoSendUsingPort);
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", cdoBasic);
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", sendusername);
                    objMailMessage.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", sendpassword);
                }
                //SMTP地址 
                SmtpMail.SmtpServer = smtpServer;
                //开始发送邮件 
                SmtpMail.Send(objMailMessage);
            }
            catch
            {

            }
        }
        /// <summary>
        /// 取的发邮件帐号
        /// </summary>
        /// <param name="Uid"></param>
        /// <returns>hashtable key: MyMail Password Pop3Server</returns>
        public static Hashtable GetMailAccountByUid(string Uid)
        {
            Hashtable hash = new Hashtable();
            string sql = "select * from Mail_MailInfo where UserID='" + Uid + "' and IsStart=1";
            DataSet dsAccount = DBTools.GetList(sql);
            string MyMail = "";
            string Password = "";
            string Pop3Server = "";
            if (dsAccount.Tables[0].Rows.Count > 0)
            {
                MyMail = dsAccount.Tables[0].Rows[0]["MyMail"].ToString();
                Password = dsAccount.Tables[0].Rows[0]["Password"].ToString();
                Pop3Server = dsAccount.Tables[0].Rows[0]["Pop3Server"].ToString();
                if ((Password != null) && (Password != ""))
                {
                    Password = DESEncrypt.Decrypt(Password);
                }

            }
            hash.Add("MyMail", MyMail);
            hash.Add("Password", Password);
            hash.Add("Pop3Server", Pop3Server);
            return hash;
        }
        /// <summary>
        /// 用公共邮箱发邮件
        /// </summary>
        /// <param name="From"></param>
        /// <param name="To"></param>
        /// <param name="Cc"></param>
        /// <param name="Bcc"></param>
        /// <param name="Subject"></param>
        /// <param name="Body"></param>
        /// <param name="BodyFormat"></param>
        /// <param name="atts"></param>
        public static void SendMail(string From, string To, string Cc, string Bcc, string Subject, string Body, string BodyFormat, ArrayList atts)
        {
            string sql = "select DeptID from Pub_Dept where IsFiliale =0";
            DataSet ds = DBTools.GetList(sql);
            string FilialeID = "";
            if (ds.Tables[0].Rows.Count > 0)
            {
                FilialeID = ds.Tables[0].Rows[0]["DeptID"].ToString();
            }
            BLL.Pub_SysParameter bllPsp = new SfSoft.BLL.Pub_SysParameter();
            Model.Pub_SysParameter modelPsp = bllPsp.GetModel(FilialeID);
            string smtpServer = modelPsp.Pop3Server;
            string sendusername = modelPsp.EMail;
            string sendpassword = "";
            if (modelPsp.EmailPassword != null && modelPsp.EmailPassword != "")
            {
                sendpassword = DESEncrypt.Decrypt(modelPsp.EmailPassword);
            }
            SendMail(sendusername, sendpassword, smtpServer, From, To, Cc, Bcc, Subject, Body, BodyFormat, atts);
        }
        /// <summary>
        /// 显示单据提醒方式，提醒周期
        /// </summary>
        /// <param name="cblList"></param>
        /// <param name="ddlReCall">重复提醒时间</param>
        /// <param name="ddlCallTime">提前提醒时间</param>
        public static void GetCallTypeCheckBoxList(CheckBoxList cblList, DropDownList ddlReCall, DropDownList ddlCallTime)
        {
            if (cblList != null)
            {
                string sql = "select * from Pub_BaseData where RefObj='emc.rcm.template.CallType'";
                DataSet dsbd = DbHelperSQL.Query(sql);
                cblList.DataSource = dsbd.Tables[0];
                cblList.DataTextField = "RefValue";
                cblList.DataValueField = "RefValueCode";
                cblList.DataBind();
            }
            if (ddlCallTime != null || ddlReCall != null)
            {
                string sql1 = "select * from Pub_BaseData where RefObj='emc.rcm.template.ReCall' order by OrderID";
                DataSet dsbd1 = DbHelperSQL.Query(sql1);
                if (ddlCallTime != null)
                {
                    ddlCallTime.DataSource = dsbd1.Tables[0];
                    ddlCallTime.DataTextField = "RefValue";
                    ddlCallTime.DataValueField = "RefValueCode";
                    ddlCallTime.DataBind();

                }
                string sql2 = "select * from Pub_BaseData where RefObj='emc.rcm.template.ReCall' and (RefValueCode>='1' or RefValueCode='0') order by OrderID";
                DataSet dsbd2 = DbHelperSQL.Query(sql2);

                if (ddlReCall != null)
                {
                    ddlReCall.DataSource = dsbd2.Tables[0];
                    ddlReCall.DataTextField = "RefValue";
                    ddlReCall.DataValueField = "RefValueCode";
                    ddlReCall.DataBind();
                }
            }
        }

        /// <summary>
        /// 显示页面中设置多选框的当前选项
        /// </summary>
        /// <param name="cblList"></param>
        /// <param name="AppID">系统ID</param>
        /// <param name="ModulesID">模块ID</param>
        /// <param name="DocID">单据ID</param>
        /// <param name="ddlReCall">重复提醒时间</param>
        /// <param name="ddlCallTime">提前提醒时间</param>
        public static void ShowCallTypeCheckBoxList(CheckBoxList cblList, string AppID, string ModulesID, string DocID, DropDownList ddlReCall, DropDownList ddlCallTime)
        {
            string sql = "select * from Pub_CallType where AppID='" + AppID + "' and ModulesID='" + ModulesID + "' and DocID='" + DocID + "'";
            DataSet ds = DBTools.GetList(sql);
            string ReCallTime = "";
            string CallTime = "";
            if (ds.Tables[0].Rows.Count > 0)
            {
                ReCallTime = ds.Tables[0].Rows[0]["ReCallTime"].ToString();
                CallTime = ds.Tables[0].Rows[0]["CallTime"].ToString();
                if (cblList != null)
                {
                    cblList.ClearSelection();

                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        if (dr["CallType"].ToString() != "" && cblList.Items.FindByValue(dr["CallType"].ToString()) != null)
                        {
                            cblList.Items.FindByValue(dr["CallType"].ToString()).Selected = true;
                        }
                    }
                }
            }
            if (ddlReCall != null)
            {
                if (ReCallTime == "")
                {
                    return;
                }
                if (ddlReCall.Items.FindByValue(ReCallTime) != null)
                {
                    ddlReCall.ClearSelection();
                    ddlReCall.Items.FindByValue(ReCallTime).Selected = true;
                }
            }
            if (ddlCallTime != null)
            {
                if (CallTime == "")
                {
                    return;
                }
                if (ddlCallTime.Items.FindByValue(CallTime) != null)
                {
                    ddlCallTime.ClearSelection();
                    ddlCallTime.Items.FindByValue(CallTime).Selected = true;
                }
            }
        }
        /// <summary>
        /// 保存单据提醒方式
        /// </summary>
        /// <param name="cblList"></param>
        /// <param name="AppID"></param>
        /// <param name="ModulesID"></param>
        /// <param name="DocID"></param>
        /// <param name="ddlReCall"></param>
        public static void SaveCallType(CheckBoxList cblList, string AppID, string ModulesID, string DocID, DropDownList ddlReCall, DropDownList ddlCallTime)
        {
            string sql = "delete Pub_CallType where AppID='" + AppID + "' and ModulesID='" + ModulesID + "' and DocID='" + DocID + "'";
            DBTools.UpdateTableBySql(sql);
            BLL.Pub_CallType bll = new Pub_CallType();
            Model.Pub_CallType model = null;
            string ReCallTime = "0";
            string CallTime = "0";
            if (ddlReCall != null && ddlReCall.Items != null && ddlReCall.SelectedItem != null)
            {
                ReCallTime = ddlReCall.SelectedItem.Value;
            }
            if (ddlCallTime != null && ddlCallTime.Items != null && ddlCallTime.SelectedItem != null)
            {
                CallTime = ddlCallTime.SelectedItem.Value;
            }
            if (cblList != null && cblList.Items != null && cblList.SelectedItem != null)
            {
                foreach (ListItem li in cblList.Items)
                {
                    if (li.Selected == true)
                    {
                        model = new SfSoft.Model.Pub_CallType();
                        model.AppID = AppID;
                        model.ModulesID = ModulesID;
                        model.DocID = DocID;
                        model.CallType = PageValidate.StringToInt(li.Value);
                        model.ReCallTime = PageValidate.StringToDecimal(ReCallTime);
                        model.CallTime = PageValidate.StringToDecimal(CallTime);
                        bll.Add(model);
                    }
                }
            }

        }
        /// <summary>
        /// 验证单据提醒方式
        /// </summary>
        /// <param name="CallType"></param>
        /// <param name="CallTypes"></param>
        /// <returns></returns>
        public static bool CheckCallType(string CallType, string CallTypes)
        {
            bool bl = true;
            if (CallTypes.IndexOf(CallType) < 0)
            {

                bl = false;
            }

            return bl;

        }
        /// <summary>
        /// 发送信息
        /// </summary>
        /// <param name="msg">消息及邮件内容</param>
        /// <param name="smsmsg">短信内容</param>
        /// <param name="UserIds">用户ID,用“，”隔开</param>
        /// <param name="calltype">提醒方式，用“，”隔开</param>
        /// <param name="SendUserID">发信人ID</param>
        /// <param name="SendCnName">发信人</param>
        /// <param name="Flag">0业务发生时产生，1系统提醒产生</param>
        /// <param name="AppID">系统ID</param>
        /// <param name="ModulesID">模块ID</param>
        /// <param name="DocID">单据ID</param>
        public static void SendMsg(string msg, string smsmsg, string UserIds, string CallType, string SendUserID, string SendCnName, string Flag, string AppID, string ModulesID, string DocID)
        {
            if (UserIds == "" || CallType == "")
            {
                return;
            }
            string[] arrUid = UserIds.Split(',');
            string uids = "";
            if (arrUid.Length > 0)
            {
                for (int i = 0; i < arrUid.Length; i++)
                {
                    if (arrUid[i].ToString() != "")
                    {
                        uids += "'" + arrUid[i].ToString() + "',";
                    }
                }
                if (uids != "")
                {
                    uids = uids.Substring(0, uids.Length - 1);
                }
            }
            DataSet dsUser = null;
            if (uids != "")
            {
                string sql = "select  ID,ID as Uid,CnName,Email,Mobile from Pub_EmpInfo where ID in (" + uids + ") or ID='" + SendUserID + "'";
                dsUser = DBTools.GetList(sql);
            }
            if (dsUser == null || dsUser.Tables[0].Rows.Count < 1)
            {
                return;
            }

            string strMobiles = "";
            string strEmails = "";
            string ContactNames = "";
            string ContactIDs = "";
            string UserContact = "";
            foreach (DataRow dr in dsUser.Tables[0].Rows)
            {
                if (SendUserID != dr["ID"].ToString())
                {
                    ContactIDs += dr["ID"].ToString() + ",";
                    ContactNames += dr["CnName"].ToString() + ",";
                    if (dr["Mobile"].ToString() != "")
                    {
                        strMobiles += dr["Mobile"].ToString() + ",";
                    }
                    if (dr["Email"].ToString() != "")
                    {
                        strEmails += dr["Email"].ToString() + ",";
                    }
                }
                else
                {
                    UserContact = dr["Email"].ToString();
                }
            }
            if (ContactIDs != "")
            {
                ContactIDs = ContactIDs.Substring(0, ContactIDs.Length - 1);
            }
            if (ContactNames != "")
            {
                ContactNames = ContactNames.Substring(0, ContactNames.Length - 1);
            }
            if (strMobiles != "")
            {
                strMobiles = strMobiles.Substring(0, strMobiles.Length - 1);
            }
            if (strEmails != "")
            {
                strEmails = strEmails.Substring(0, strEmails.Length - 1);
            }

            if (CallType != "")
            {
                string[] arrCt = CallType.Split(',');
                if (arrCt.Length > 0)
                {
                    string ContactIDs1 = "";
                    for (int i = 0; i < arrCt.Length; i++)
                    {
                        if (arrCt[i].ToString() == "1")//短信
                        {
                            ContactIDs1 = strMobiles;
                        }
                        else if (arrCt[i].ToString() == "2")//邮件
                        {
                            ContactIDs1 = strEmails;
                        }
                        else if ((arrCt[i].ToString() == "0")) //内部消息
                        {
                            ContactIDs1 = ContactIDs;
                        }

                        if (ContactIDs1 != "")
                        {
                            SaveCallList(arrCt[i].ToString(), AppID, ModulesID, DocID, Flag, msg, smsmsg, SendUserID, SendCnName, UserContact, ContactIDs1, ContactNames, "0", "");
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 发送信息
        /// </summary>
        /// <param name="msg">消息及邮件内容</param>
        /// <param name="smsmsg">短信内容</param>
        /// <param name="UserIds">用户ID,用“，”隔开</param>
        /// <param name="calltype">提醒方式，用“，”隔开</param>
        public static void SendMsg(string msg, string smsmsg, string UserIds, string CallType, string SendUserID, string SendCnName, string Flag, string AppID, string ModulesID, string DocID, string FlowID)
        {
            if (UserIds == "" || CallType == "")
            {
                return;
            }

            string[] arrUid = UserIds.Split(',');
            string uids = "";
            if (arrUid.Length > 0)
            {
                for (int i = 0; i < arrUid.Length; i++)
                {
                    if (arrUid[i].ToString() != "")
                    {
                        uids += "'" + arrUid[i].ToString() + "',";
                    }
                }
                if (uids != "")
                {
                    uids = uids.Substring(0, uids.Length - 1);
                }
            }
            DataSet dsUser = null;
            if (uids != "")
            {
                string sql = "select  ID,ID as Uid,CnName,Email,Mobile from Pub_EmpInfo where ID in (" + uids + ") or ID='" + SendUserID + "'";
                dsUser = DBTools.GetList(sql);
            }
            if (dsUser == null || dsUser.Tables[0].Rows.Count < 1)
            {
                return;
            }

            string strMobiles = "";
            string strEmails = "";
            string ContactNames = "";
            string ContactIDs = "";
            string UserContact = "";
            foreach (DataRow dr in dsUser.Tables[0].Rows)
            {
                if (SendUserID != dr["ID"].ToString())
                {
                    ContactIDs += dr["ID"].ToString() + ",";
                    ContactNames += dr["CnName"].ToString() + ",";
                    if (dr["Mobile"].ToString() != "")
                    {
                        strMobiles += dr["Mobile"].ToString() + ",";
                    }
                    if (dr["Email"].ToString() != "")
                    {
                        strEmails += dr["Email"].ToString() + ",";
                    }
                }
                else
                {
                    UserContact = dr["Email"].ToString();
                }
            }


            if (ContactIDs != "")
            {
                ContactIDs = ContactIDs.Substring(0, ContactIDs.Length - 1);
            }
            if (ContactNames != "")
            {
                ContactNames = ContactNames.Substring(0, ContactNames.Length - 1);
            }
            ;
            if (strMobiles != "")
            {
                strMobiles = strMobiles.Substring(0, strMobiles.Length - 1);
            }
            if (strEmails != "")
            {
                strEmails = strEmails.Substring(0, strEmails.Length - 1);
            }

            if (CallType != "")
            {
                string[] arrCt = CallType.Split(',');
                if (arrCt.Length > 0)
                {
                    string ContactIDs1 = "";
                    for (int i = 0; i < arrCt.Length; i++)
                    {
                        if (arrCt[i].ToString() == "1")//短信
                        {
                            ContactIDs1 = strMobiles;
                        }
                        else if (arrCt[i].ToString() == "2")//邮件
                        {
                            ContactIDs1 = strEmails;
                        }
                        else if ((arrCt[i].ToString() == "0")) //内部消息
                        {
                            ContactIDs1 = ContactIDs;
                        }
                        if (ContactIDs1 != "")
                        {
                            SaveCallList(arrCt[i].ToString(), AppID, ModulesID, DocID, Flag, msg, smsmsg, SendUserID, SendCnName, UserContact, ContactIDs1, ContactNames, "0", FlowID);
                        }
                    }
                }
            }
        }
        /// <summary>
        /// 保存提醒队列
        /// </summary>
        /// <param name="CallType">提方式0消息,1短信,2邮件</param>
        /// <param name="AppID">系统ID</param>
        /// <param name="ModulesID">模块ID</param>
        /// <param name="DocID">单据ID</param>
        /// <param name="CallTypeTime">提醒时间</param>
        /// <param name="Flag">0 业务发生时产生，1 工作开始前提醒，3 结束前提醒产生， 2 周期提醒</param>
        /// <param name="UserID">发信人ID</param>
        /// <param name="CnName">发信人</param>
        /// <param name="UserContact">发信人Email</param>
        /// <param name="ContactIDs">收信人ID,手机，Email</param>
        /// <param name="ContactNames">收信人姓名</param>
        /// <param name="Status">状态：0未发，1 已发</param>
        /// <param name="FlowID">任务流程序号 ，为-1时增加消息记录</param>
        public static void SaveCallList(string CallType, string AppID, string ModulesID, string DocID, string Flag, string msg, string smsmsg, string UserID, string CnName, string UserContact, string ContactIDs, string ContactNames, string Status, string FlowID)
        {

            BLL.Pub_CallList bll = new Pub_CallList();
            Model.Pub_CallList model = new SfSoft.Model.Pub_CallList();
            string ID = "0";
            int num1 = 1;
            if (FlowID != "-1")
            {
                string MaxMsgNum = ConfigurationManager.AppSettings["MaxMsgNum"];//提醒最大次数
                if (MaxMsgNum == "")
                {
                    MaxMsgNum = "5";
                }
                string sql = "select * from Pub_CallList where AppID='" + AppID + "' and ModulesID='" + ModulesID + "' and DocID='" + DocID + "' and CallType='" + CallType + "' and Flag='" + Flag + "'";
                if (FlowID != "")
                {
                    sql += " and FlowID='" + FlowID + "'";
                }
                DataSet ds = DBTools.GetList(sql);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    ID = ds.Tables[0].Rows[0]["ID"].ToString();
                    model = bll.GetModel(int.Parse(ID));
                    num1 = (int)model.num + 1;
                    if (num1 > int.Parse(MaxMsgNum)) //如果是周期提醒，次数>N时，不再提醒
                    {
                        return;
                    }
                }
            }
            else
            {
                FlowID = "";
            }

            if (CallType == "1")
            {
                model.Msg = smsmsg;
            }
            else
            {
                model.Msg = msg;
            }
            model.AppID = AppID;
            model.ModulesID = ModulesID;
            model.DocID = DocID;
            model.CallTypeTime = DateTime.Now;
            model.CallType = PageValidate.StringToInt(CallType);
            model.num = num1;
            model.Flag = PageValidate.StringToInt(Flag);
            model.UserID = PageValidate.StringToInt(UserID);
            model.CnName = CnName;
            model.UserContact = UserContact;
            model.ContactIDs = ContactIDs;
            model.ContactNames = ContactNames;
            model.Status = PageValidate.StringToInt(Status);
            model.FlowID = FlowID;
            if (ID == "0")
            {

                bll.Add(model);
            }
            else
            {
                bll.Update(model);
            }
        }

        /// <summary>
        /// 根据开始时间，时间跨度，取的结束时间
        /// </summary>
        /// <param name="sd">开始日期</param>
        /// <param name="st">开始时间</param>
        /// <param name="hh">时间跨度,小时</param>
        /// <param name="TimeUnit">时间单位,小时/天</param>
        /// <returns></returns>
        public static string GetEndDateTime(string sd, string st, float hh, string TimeUnit, string FilialieID)
        {
            string EndDate = "";//结束日期
            string EndTime = "";//结束时间
            //取的工作时间参数
            Hashtable hash = EmcCommon.GetJobTime(FilialieID);
            string SysStartTimeAm = hash["SysStartTimeAm"].ToString();//上午开始时间
            string SysEndTimeAm = hash["SysEndTimeAm"].ToString();//上午结束时间

            string SysStartTimePm = hash["SysStartTimePm"].ToString();//下午开始时间
            string SysEndTimePm = hash["SysEndTimePm"].ToString();//下午结束时间
            string SysWeekRest0 = hash["SysWeekRest0"].ToString();//周六休息 0
            string SysWeekRest6 = hash["SysWeekRest6"].ToString();//周日休息 6
            string SysDaySiesta = hash["SysDaySiesta"].ToString();//中午休息时间
            string SysTotalHours = hash["SysTotalHours"].ToString();//一天工作小时
            double mm = 0;

            if (SysTotalHours == "" || SysTotalHours == "0")
            {
                SysTotalHours = "8";
            }
            if (SysDaySiesta == "")
            {
                SysDaySiesta = "1";
            }

            double SysDaySiesta1 = double.Parse(SysDaySiesta);
            double SysTotalHours1 = double.Parse(SysTotalHours);
            double hm = SysDaySiesta1 * 60;//中午休息分钟数
            if (TimeUnit == "天")
            {
                mm = hh * SysTotalHours1 * 60;//转换成小时
            }
            if (TimeUnit == "小时")
            {
                mm = hh * 60;//转换成小时
            }
            DateTime dt1 = (DateTime)PageValidate.StringToDatetime(sd + " " + st); //开始时间
            DateTime dtStAm1 = (DateTime)PageValidate.StringToDatetime(sd + " " + SysStartTimeAm); //开始上午上班时间
            DateTime dtEtAm1 = (DateTime)PageValidate.StringToDatetime(sd + " " + SysEndTimeAm); //开始上午下班时间
            DateTime dtStPm1 = (DateTime)PageValidate.StringToDatetime(sd + " " + SysStartTimePm); //开始下午上班时间
            DateTime dtEtPm1 = (DateTime)PageValidate.StringToDatetime(sd + " " + SysEndTimePm); //开始下午下班时间
            if (EmcCommon.IsHoliday(SysWeekRest0, SysWeekRest6, dt1)) //开始日期是否为休息天
            {
                if (SysWeekRest0 == "0") //休周六 加一天
                {
                    dt1 = dt1.AddDays(1);
                }
                if (SysWeekRest6 == "6") //休周日 加一天
                {
                    dt1 = dt1.AddDays(1);
                }
            }

            //如果开始时间小于上班时间，开始时间==上班时间
            if (GetTimeSpan(dt1, dtStAm1, "NN") < 0)
            {
                dt1 = dtStAm1; //开始时间
            }

            //如果开始时间大于下午下班时间，开始时间==第二天上班时间
            if (GetTimeSpan(dt1, dtEtPm1, "NN") >= 0)
            {
                dt1 = dtStAm1.AddDays(1); //开始时间
            }

            DateTime dtTempEt = dt1.AddMinutes(mm); //预计结束时间

            //预计结束时间在上午
            if (GetTimeSpan(dtTempEt, dtEtAm1, "NN") <= 0)
            {
                EndDate = PageValidate.FormatSmallDate(dtTempEt);
                EndTime = EmcCommon.GetShortHHMM(dtTempEt);
                //返回
                return EndDate + " " + EndTime;
            }

            dtTempEt = dt1.AddMinutes(mm + hm); //预计结束时间+中午休息时间
            //预计结束时间在下午
            if (GetTimeSpan(dtTempEt, dtEtPm1, "NN") <= 0)
            {
                EndDate = PageValidate.FormatSmallDate(dtTempEt);
                EndTime = EmcCommon.GetShortHHMM(dtTempEt);
                //返回
                return EndDate + " " + EndTime;
            }

            //结束时间不在当天
            //当天已耗时
            double DoMM = GetTimeSpan(dtEtPm1, dt1, "NN") - hm;//减去中午休息时间

            mm = mm - DoMM;//剩余时间
            double d1 = mm / (SysTotalHours1 * 60);//还需要天数
            int d2 = (int)d1;
            double h2 = mm - (d2 * SysTotalHours1 * 60);//余数 分钟
            if (d2 >= 1)//大于一天
            {

                for (int i = 1; i <= d2; i++)
                {

                    dt1 = dt1.AddDays(1);//结束日期

                    if (EmcCommon.IsHoliday(SysWeekRest0, SysWeekRest6, dt1)) //结束日期是休息日
                    {
                        if (SysWeekRest0 == "0") //休周六 加一天
                        {
                            dt1 = dt1.AddDays(1);
                        }
                        if (SysWeekRest6 == "6") //休周日 加一天
                        {
                            dt1 = dt1.AddDays(1);
                        }
                    }
                }
            }


            if (h2 == 0)
            {
                EndDate = PageValidate.FormatSmallDate(dt1);
                EndTime = SysEndTimePm;
                //返回
                return EndDate + " " + EndTime;
            }
            if (h2 > 0) // 
            {
                DateTime dt2 = dt1.AddDays(1);//结束日期
                if (EmcCommon.IsHoliday(SysWeekRest0, SysWeekRest6, dt2)) //结束日期是休息日
                {
                    if (SysWeekRest0 == "0") //休周六 加一天
                    {
                        dt2 = dt2.AddDays(1);
                    }
                    if (SysWeekRest6 == "6") //休周日 加一天
                    {
                        dt2 = dt2.AddDays(1);
                    }
                }
                //结束时间在上午
                DateTime dtStAm2 = (DateTime)PageValidate.StringToDatetime(PageValidate.FormatSmallDate(dt2) + " " + SysStartTimeAm);
                DateTime dtEtAm2 = (DateTime)PageValidate.StringToDatetime(PageValidate.FormatSmallDate(dt2) + " " + SysEndTimeAm); //开始上午下班时间
                //预计结束时间在上午
                DateTime dtTempEt1 = dtStAm2.AddMinutes(h2); //预计结束时间
                if (GetTimeSpan(dtTempEt1, dtEtAm2, "NN") <= 0)
                {
                    EndDate = PageValidate.FormatSmallDate(dtTempEt1);
                    EndTime = EmcCommon.GetShortHHMM(dtTempEt1);
                    //返回
                    return EndDate + " " + EndTime;
                }

                DateTime dtEtPm2 = (DateTime)PageValidate.StringToDatetime(PageValidate.FormatSmallDate(dt2) + " " + SysEndTimePm); //开始下午下班时间
                //预计结束时间在下午
                dtTempEt1 = dtStAm2.AddMinutes(h2 + hm); //预计结束时间+中午休息时间
                if (GetTimeSpan(dtTempEt1, dtEtPm2, "NN") <= 0)
                {
                    EndDate = PageValidate.FormatSmallDate(dtTempEt1);
                    EndTime = EmcCommon.GetShortHHMM(dtTempEt1);
                    //返回
                    return EndDate + " " + EndTime;
                }

            }
            return EndDate + " " + EndTime;
        }
        /// <summary>
        /// 两个日期时间差
        /// </summary>
        /// <param name="dt1">开始时间</param>
        /// <param name="dt2">结束时间</param>
        /// <param name="flag">返回值差值 标志：DD 天，HH 小时，NN 分钟，SS 秒</param>
        /// <returns></returns>
        public static double GetTimeSpan(DateTime dt1, DateTime dt2, string flag)
        {
            flag = flag.ToUpper();


            TimeSpan ts = dt1 - dt2;
            if (flag == "DD")
            {
                return ts.TotalDays;
            }
            else if (flag == "HH")
            {

                return ts.TotalHours;
            }
            else if (flag == "NN")
            {
                return ts.TotalMinutes;
            }
            else if (flag == "SS")
            {

                return ts.TotalSeconds;
            }
            return 0;
        }




        /// <summary>
        /// 是否休息日
        /// </summary>
        /// <param name="SysWeekRest0">休周六 0</param>
        /// <param name="SysWeekRest6">休周日 6</param>
        /// <param name="dt">当前时间</param>
        /// <returns></returns>
        public static bool IsHoliday(string SysWeekRest0, string SysWeekRest6, DateTime dt)
        {


            string wk1 = Common.DateUtil.GetWeekNumberOfDay(dt);// 1-7 表示周一到周日
            if (SysWeekRest0 == "0" && wk1 == "6")
            {
                return true;
            }
            if (SysWeekRest6 == "6" && wk1 == "7")
            {
                return true;
            }

            return false; ;
        }

        /// <summary>
        /// 取的短时间 HHMM
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string GetShortHHMM(DateTime dt)
        {
            string hh = "00";
            string mm = "00";
            int h = dt.Hour;
            int m = dt.Minute;
            if (h < 10)
            {
                hh = "0" + h.ToString();
            }
            else
            {
                hh = h.ToString();
            }
            if (m < 10)
            {
                mm = "0" + m.ToString();
            }
            else
            {
                mm = m.ToString();
            }
            return hh + ":" + mm;
        }

        /// <summary>
        /// 初始化数据库下拉列表的值
        /// </summary>
        /// <param name="ddlList">DropDownList</param>
        public static void GetDbNameDropDownList(DropDownList ddlList)
        {
            ddlList.Items.Clear();
            BLL.Pub_UnSystem bll = new SfSoft.BLL.Pub_UnSystem();
            string strWhere = "   DbName<>'' and DbName is not null";
            DataSet ds = bll.GetList(strWhere);
            DataTable dtNodeSets = ds.Tables[0];

            ListItem li = new ListItem();
            //li.Text = "--未选择--";
            //li.Value = "--";
            //ddlList.Items.Add(li);
            foreach (DataRow dr in dtNodeSets.Rows)
            {
                li = new ListItem();
                li.Text = dr["SysName"].ToString();
                li.Value = dr["ID"].ToString();
                ddlList.Items.Add(li);
            }
        }

    

         //add by liupengfei 2013-05-30
        /// <summary>
        /// 显示单据所带的附件
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="MID">功能ID</param>
        public static void ShowFileListAndPic(SmartGridView sgvFilelist, SmartGridView sgvPiclist, string DocID, string MID)
        {
            BLL.Pub_AttFiles bllpaf = new SfSoft.BLL.Pub_AttFiles();
            string strWhere = " DocID='" + DocID + "' and MID='" + MID + "'";
            DataSet dspaf = bllpaf.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(sgvFilelist, dspaf.Tables[0]);
            for (int i = 0; i < dspaf.Tables[0].Rows.Count; i++)
            {
                string filename = dspaf.Tables[0].Rows[i]["FileName"].ToString();
                string gs = filename.Substring(filename.Length - 3, 3).ToLower();
                if (gs == "jpg" || gs == "bmp" || gs == "gif" || gs == "png")
                {
                    Common.SetEmptyGridView.GridViewDataBind(sgvPiclist, dspaf.Tables[0]);
                }
            }
        }


        /// <summary>
        /// 默认省市
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        public static string GetProvinceCity(string agentId)
        {
            string sql = "select * from emc_srv_agent where Id="+agentId;
            DataSet ds = DBTools.GetList(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["AreaNames"].ToString() != "" && ds.Tables[0].Rows[0]["AreaNames"].ToString().Length >= 2)
                {
                    string psql = "select * from province where p_name like'" + ds.Tables[0].Rows[0]["AreaNames"].ToString().Substring(0,2) + "%'";
                    DataSet dps = DBTools.GetList(psql);
                    if (dps != null && dps.Tables[0] != null && dps.Tables[0].Rows.Count > 0)
                    {
                        return dps.Tables[0].Rows[0]["p_name"].ToString();
                    }
                    else
                    {
                        string csql = "select * from city where cname like'" + ds.Tables[0].Rows[0]["AreaNames"].ToString().Substring(0, 2) + "%'";
                        DataSet dcs = DBTools.GetList(csql);
                        if (dcs != null && dcs.Tables[0] != null && dcs.Tables[0].Rows.Count > 0)
                        {
                            DataSet dpname = DBTools.GetList("select * from province where p_id=" + dcs.Tables[0].Rows[0]["pid"].ToString());
                            return dpname.Tables[0].Rows[0]["p_name"].ToString() + "," + dcs.Tables[0].Rows[0]["cid"].ToString();
                        }
                        else { return null; }
                    }
                }
                else { return null; }
            }
            else { return null; }
        }
        /// <summary>
        /// 生成充值流水号格式：8位日期加5位顺序号，如20140530000001。
        /// </summary>
        /// <param name="serialNumber"></param>
        /// <returns></returns>
        public static string GetSerialNumber(string serialNumber) {
            if (serialNumber != "0")
            {
                string headDate = serialNumber.Substring(0, 8);
                int lastNumber = int.Parse(serialNumber.Substring(8));
                //如果数据库最大值流水号中日期和生成日期在同一天，则顺序号加1
                if (headDate == DateTime.Now.ToString("yyyyMMdd"))
                {
                    lastNumber++;
                    return headDate + lastNumber.ToString("00000");
                }
            }
            return DateTime.Now.ToString("yyyyMMdd") + "00001";
        }
    }
}
