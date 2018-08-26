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
using System.Net;
using sbSoft.BSSoftLock;
using log4net;
namespace SfSoft.web
{
    public partial class login : System.Web.UI.Page
    {
      public   string strDisp = "block";
      public string strDisp1 = "none";
      public string StartComputerCheck = "1";
      public string iframeurl = "";
      private static readonly ILog log = LogManager.GetLogger(typeof(login));
        protected void Page_Load(object sender, EventArgs e)
        {
            StartComputerCheck = ConfigurationManager.AppSettings["StartComputerCheck"].ToString ();
            if (StartComputerCheck == "1")
            {
                iframeurl = "reg/emc/getclient.aspx";
            }
            //是否注册
            //if (bsSoftLock.IsRegister() == false)
            //{
            //    strDisp = "none";
            //    strDisp1 = "block";
            //}
            ////是否失效
            //else if (bsSoftLock.IsValidLincese() == false)
            //{
            //    strDisp = "block";
            //    strDisp1 = "block";
            //}

            string loginout = "";
            if (Request.Params["loginout"] != null)
            {
                loginout = Request.Params["loginout"].ToString();
                if (loginout == "out")
                {
                    LoginOut();
                }
            }

            if (Request.Params["error"] != null)
            {
              string error = Request.Params["error"].ToString();
              FailureText.Text = error;
            }

           

        }
        protected void LoginOut()
        {
            Session["UserAcldv"] = null;
            Session["FilialeID"] = null;
            Session["DeptName"] = null;
            Session["FilialeName"] = null;
            Session["DeptID"] = null;
            Session["CnName"] = null;
            Session["FirstSchool"] = null;
            if (Session["LogID"] != null)
            {
                string LogID = Session["LogID"].ToString();
                //更新退出日志


                EmcCommon.UpdateSysLogs(LogID);
            }
            Application.Lock();
            if (Session["Uid"] != null)
            {
                string uid = Session["Uid"].ToString();

                DataTable dt = (DataTable)Application["UsersOnline"];

                foreach (DataRow dr in dt.Rows)
                {
                    if (dr["UID"].ToString() == uid)
                    {
                        Application["UsersOnlineNum"] = (int)Application["UsersOnlineNum"] - 1;
                        dt.Rows.Remove(dr);
                        break;
                    }
                }
            }
            Application.UnLock();
            FormsAuthentication.SignOut();
        }
        protected void LoginButton_Click(object sender, EventArgs e)
        {
            string UserName = this.UserName.Text.Trim ();
            string Password = this.Password.Text.Trim () ;
            string OPCode = this.code_op.Text;
            /*
            if (OPCode =="") {
                MessageBox.Show(this, "没有输入验证码！");
                return;
            }
            if (Session["CheckCode"] == null || OPCode != Session["CheckCode"].ToString())
            {
                MessageBox.Show(this, "验证码无效，请确认您输入的验证码有效！");
                return;
            }
            */
            if (StartComputerCheck == "1") //需要验证
            {
                DataSet dsc1 = DBTools.GetList("select * from Pub_ComputerKey where UserName='" + UserName + "' and Flag=0 and Status='审批同意' ");//用户是否不需要验证客户端
                if (dsc1.Tables[0].Rows.Count < 1) //用户需要验证客户端
                {
                    string ComputerID = txtComputerID.Value;
                    if (ComputerID == "")
                    {
                        MessageBox.Show(this, "没有取到电脑号，注意浏览器配置或联系管理员！");
                        return;
                    }
                    DataSet dsc2 = DBTools.GetList("select * from Pub_ComputerKey where ComputerID='" + ComputerID + "' and Flag=1 and Status='审批同意' ");//用户是否不需要验证客户端
                    if (dsc2.Tables[0].Rows.Count < 1) //电脑没有注册
                    {
                       Response.Redirect("reg/emc/reginfo.aspx");
                    }

                }
            }

            //验证产品注册码
            Session["license"] = "ok";

            //if (bsSoftLock.IsValidLincese() == false)
            //{
            //    MessageBox.Show(this, bsSoftLock.LastError);
            //    return;
            //}
            //else
            //{
            //    Session["license"] = "ok";
            //}

            //验证用户数
            int onlineusernum = (int)Application["UsersOnlineNum"];
            int AllowUsers = bsSoftLock.GetAllowUsers();
            if (onlineusernum >= 200)
            {
                MessageBox.Show(this, "当前系统用户数已大于系统最大授权用户数[" + AllowUsers .ToString ()+ "]！");
                return;
            }

           

            BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();
            UserName = Common.Common.SqlInsertEncode(UserName);
            string strWhere = " a.UserName = '" + UserName + "' and    b.IsSysUser='1' ";
            DataSet EmpDs = bllEmp.GetUsersInfoList(strWhere);
            if (EmpDs.Tables[0].Rows.Count > 0)
            {
                string ZZState = EmpDs.Tables[0].Rows[0]["ZZState"].ToString().Trim();

                if (ZZState == "离职")
                {
                    UserName += ".#.$...";
                }
            }
            else
            {
                UserName += ".#.$...";
            }
            //验证帐号
            if (Membership.ValidateUser(UserName, Password))
            {
                //取的当前公司ID
                string FilialeID = "";
                string FilialeName = "";
                //FilialeID = Request.Params["FilialeID"];
                if ((FilialeID != null) && (FilialeID != ""))
                {
                    Session["UserAcldv"] = null;
                }
                //取权限及相关信息
                    string userName = UserName;// HttpContext.Current.User.Identity.Name;
                    string userID = "";
                    string Uid = "";
                    string DeptID = "";
                    string DeptName = "";
                    string CnName = "";
                    string Email = "";
                    string ZZState = "";
                    //取的用户GUID 
                    if (EmpDs.Tables[0].Rows.Count >0)
                    {
                        userID = EmpDs.Tables[0].Rows[0]["UserID"].ToString().Trim();
                        Uid = EmpDs.Tables[0].Rows[0]["ID"].ToString().Trim();
                        CnName = EmpDs.Tables[0].Rows[0]["CnName"].ToString().Trim();
                        Email = EmpDs.Tables[0].Rows[0]["Email"].ToString().Trim();
                    }
                    //取出用户所在的部门信息和公司ID
                    Hashtable hashdp = new Hashtable();
                    hashdp = EmcCommon.getDeptInfoByUserID(Uid, FilialeID);
                    if (hashdp != null)
                    {
                        if (FilialeID == null || FilialeID == "")
                        {
                            FilialeID = hashdp["FilialeID"].ToString();
                        }
                        DeptName = hashdp["DeptName"].ToString();
                        DeptID = hashdp["DeptID"].ToString();
                    }

                    //取的公司名称
                    FilialeName = SfEmc.EmcCommon.getDeptNameByID(Common.Common.stringToInt(FilialeID));

                    Session["FilialeID"] = FilialeID;
                    Session["DeptName"] = DeptName;
                    Session["FilialeName"] = FilialeName;
                    Session["DeptID"] = DeptID;
                    Session["CnName"] = CnName;
                    Session["Uid"] = Uid;
                    Session["UserID"] = userID;
                    Session["Email"] = Email;
                    Session["DeptManagers"] = EmcCommon.GetDeptIDByManagerID(Uid, FilialeID);
                    //取的角色权限
                    BLL.Pub_Roles_Fun bllrf = new BLL.Pub_Roles_Fun();
                    DataSet dsrf = bllrf.GetUsersFun(userID, FilialeID);
                    DataView UserAcldv = new DataView(dsrf.Tables[0]);
       
                                        
                    string IpAddr = Request.UserHostAddress;
                    string ComputerName = Request.UserHostName;
                    Session["UserAcldv"] = UserAcldv;
                    int LogID=EmcCommon.AddSysLogs("emc", "EMC", UserName, Uid, CnName, DeptName, DeptID, FilialeID, DateTime.Now, IpAddr, ComputerName, "login", "");
                                        
                    Session["LogID"] = LogID.ToString ();
                    //加入在线信息
                    if (!CheckOnline(Uid))
                    {
                        Application.Lock();
                        Application["UsersOnlineNum"] = (int)Application["UsersOnlineNum"] + 1;
                        DataTable dt = (DataTable)Application["UsersOnline"];
                        DataRow dr = dt.NewRow();
                        dr["UID"] = Uid;
                        dr["CnName"] = CnName;
                        dr["DeptID"] = DeptID;
                        dr["FilialeID"] = FilialeID;
                        dr["Face"] = "";
                        dt.Rows.Add(dr);
                        Application["UsersOnline"] = dt;
                        Application.UnLock();
                    }


                

                Session["CompanyNum"] = 1;
                DataSet dstemp = DBTools.GetList("select * from Pub_Dept where IsFiliale=0 or IsFiliale=1");
                if (dstemp.Tables[0].Rows.Count > 1)
                {
                    Session["CompanyNum"] = dstemp.Tables[0].Rows.Count;
                }
 
                FormsAuthentication.RedirectFromLoginPage(UserName, RememberMe.Checked);
                 
            }
            else
            {
                FailureText.Text = "登录失败，请重新输入用户名和密码！";
            }

        }
        //查询是否已经在在线列表中
        private bool CheckOnline(string uid)
        {
 
            DataTable dt = (DataTable)Application["UsersOnline"];
            DataView dv = new DataView(dt);
            dv.RowFilter = " UID = '" + uid + "'";
            if (dv.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
 
        }

 
    }
}

