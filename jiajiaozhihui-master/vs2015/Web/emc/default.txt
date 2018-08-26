using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;
using SfSoft.SfEmc;
using SfSoft.Common;
using SfSoft.DBUtility;
using AjaxPro;

namespace SfSoft.web.emc
{
    public partial class _default : System.Web.UI.Page
    {
        public string strMenus = "";
        public string StartTimerMsn = "0";
        public string timerMsn = "60000";
        public string strDisp = "none";
        public string strDispNav = "none";
        public string westTitle = "EMC";
        public int n = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxPro.Utility.RegisterTypeForAjax(typeof(SfSoft.web.emc._default));
            StartTimerMsn = ConfigurationManager.AppSettings["StartTimerMsn"];
            timerMsn = ConfigurationManager.AppSettings["timerMsn"];
            var num = Session["CompanyNum"];
            if (PageValidate.StringToInt(Session["CompanyNum"].ToString()) > 1)
            {
                strDisp = "block";
            }
            else
            {
                strDisp = "none";
            }

            if (!IsPostBack)
            {
                DateTime dt = DateTime.Now;
                string weekname = Common.DateUtil.GetWeekNameOfDay(dt);
                lblCurDate.Text =dt.Year + " 年 "+ dt.Month +" 月 "+ dt.Day +" 日 " + weekname  ; 
                lblCnName.Text = "您好！" + Session["CnName"].ToString().Trim();
                spanUserInfo.InnerHtml =   "单位：" + Session["FilialeName"].ToString().Trim() + "-" + Session["DeptName"].ToString().Trim()+"-"+Session["CnName"].ToString().Trim() ;
              //  EMCLOGO.InnerHtml = "EMC-" + EmcCommon.getCompanyNameByID("01") + "企业协同办公管理系统";
                string NavMenu = ConfigurationManager.AppSettings["NavMenu"];
                if (NavMenu == "outlook")
                {
                    ShowMenu();
                    tvMenu.Visible = false;
                    westTitle = "EMC";
                    strDispNav = "none";
                }
                else
                {
                    ShowTreeMenu();
                    tvMenu.Visible = true;
                    westTitle = "";
                    strDispNav = "block";
                }
            }

        }

        public string GetUnSystem()
        {
            DataSet ds = DBTools.GetList("select * from Pub_UnSystem where SysUrl<>'' and SysUrl is not null and Flag='sys' and isAct='1'");

            StringBuilder sb = new StringBuilder();
            
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                string SysUrl = dr["SysUrl"].ToString();
                string SysType = dr["SysType"].ToString();
                string strUrl = "";
                if (SysType == "file")
                {
                    SysUrl = SysUrl.Replace(" ", "%20").Replace("\\", "/");
                    strUrl = "\"javascript:Run('file:///" + SysUrl + "')\"";
                    strUrl = "<a href=" + strUrl + ">" + dr["SysShortName"].ToString() + "</a>";
                }
                else
                {
                    strUrl = "<a href='http://" + dr["SysUrl"].ToString() + "' target='_blank'>" + dr["SysShortName"].ToString() + "</a>";
                }
                if (dr["SysIcon"].ToString() == "")
                {
                    dr["SysIcon"] = "/images/icon/application_view_tile.png";
                } 
                sb.Append("<div class='emctopmenuli1'><span class ='unsystemliicon' style=\" background-image: url('" + dr["SysIcon"].ToString() + "');\">&nbsp; </span>" + strUrl + "</div>");
            }
           

            return sb.ToString();

        }
        //菜单
        void ShowMenu()
        {
            string sqlmf = "select  ID as ModulesID,FolderName as ModulesName,icon,MailFlag,'emc.mail.maillist' ParentMID  from mail_folder where Flag='0' or (Flag='1' and Creator='" + Session["Uid"].ToString() + "') order by orderid";
            DataSet dsmf = DBTools.GetList(sqlmf);
            string modulesID = "emc";
            StringBuilder sbmenu = new StringBuilder();
            if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], modulesID) || HttpContext.Current.User.Identity.Name == "admin")
            {
                SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
                DataSet ds = new DataSet();
                string strWhere = " AppID='app01' order by OrderID";
                ds = bll.GetList(strWhere);
                string UserName = HttpContext.Current.User.Identity.Name;
                DataRow[] arrFirst = ds.Tables[0].Select("ParentMID='EMC'");
                string dfselected = "false";
                string strUrl = "";
                string subStyle = "subNav";
                string ParentStyle = "parentNav";
                for (int i = 0; i < arrFirst.Length; i++)
                {

                    if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], arrFirst[i]["ModulesID"].ToString()) || (UserName == "admin" && arrFirst[i]["ModulesID"].ToString().Substring(0, 6) == "emc.sm"))
                    {
                        if (i == 0)
                        {
                            dfselected = "true";
                        }
                        else
                        {
                            dfselected = "false";
                        }
                        if (arrFirst[i]["ModulesID"].ToString() == "emc.mail" && arrFirst[i]["icon"].ToString() != "")
                        {
                            ParentStyle = "mail_" + FileUpLoadCommon.GetFileName(arrFirst[i]["icon"].ToString());
                        }
                        else
                        {
                            ParentStyle = "parentNav";
                        }

                        sbmenu.Append(" <div title=" + arrFirst[i]["ModulesName"].ToString() + " iconCls='" + ParentStyle + "'  style='overflow:auto;overflow-y:auto;overflow-x:hidden'  selected=" + dfselected + " >");
                        sbmenu.Append("<ul>");
                        DataRow[] arrSec = ds.Tables[0].Select("ParentMID='" + arrFirst[i]["ModulesID"].ToString() + "'");
                        for (int j = 0; j < arrSec.Length; j++)
                        {
                            if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], arrSec[j]["ModulesID"].ToString()) || (UserName == "admin" && arrSec[j]["ModulesID"].ToString().Substring(0, 6) == "emc.sm"))
                            {
                                DataRow[] arrThird = null;
                                if (arrSec[j]["ModulesID"].ToString().IndexOf("emc.mail") >= 0) //如果是邮件模块
                                {
                                    subStyle = "mail_" + FileUpLoadCommon.GetFileName(arrSec[j]["icon"].ToString());
                                    if (arrSec[j]["ModulesID"].ToString() == "emc.mail.maillist")
                                    {
                                        arrThird = dsmf.Tables[0].Select("1=1");
                                    }
                                    else
                                    {
                                        arrThird = ds.Tables[0].Select("ParentMID='" + arrSec[j]["ModulesID"].ToString() + "'");
                                    }

                                }
                                else
                                {
                                    subStyle = "subNav";
                                }

                                if (arrSec[j]["ModulesID"].ToString() == "emc.mail.maillist" || arrSec[j]["ModulesID"].ToString() == "emc.mail.contacts" || arrSec[j]["ModulesID"].ToString() == "emc.mail.email")
                                {
                                    strUrl = "#";
                                }
                                else
                                {
                                    strUrl = "\"javascript:onclick=addTab('" + arrSec[j]["ModulesName"].ToString() + "','" + arrSec[j]["Dpath"].ToString().Trim() + "&TreeModulesID=" + arrSec[j]["ModulesID"].ToString().Trim() + "','" + subStyle + "')\"";
                                }
                                sbmenu.Append("<li><div><a href=" + strUrl + " ><span class='icon " + subStyle + "' >&nbsp;</span><span class='nav'>" + arrSec[j]["ModulesName"].ToString() + "</span></a></div></li> ");
                                if (arrThird != null && arrThird.Length > 0)
                                {
                                    string MailFlag = "";
                                    string Dpath = "";
                                    for (int k = 0; k < arrThird.Length; k++)
                                    {

                                        if (arrThird[k]["ParentMID"].ToString() == "emc.mail.maillist") //邮件文件夹
                                        {
                                            MailFlag = arrThird[k]["MailFlag"].ToString();
                                            Dpath = "../webmail/maillist.aspx?state=browse";
                                        }
                                        else //正常菜单 需要权限控制
                                        {
                                            MailFlag = "";
                                            Dpath = arrThird[k]["Dpath"].ToString().Trim();
                                            if (!(SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], arrThird[k]["ModulesID"].ToString()) || (UserName == "admin" && arrThird[k]["ModulesID"].ToString().Substring(0, 6) == "emc.sm")))
                                            {
                                                continue;
                                            }

                                        }
                                        if (arrThird[k]["ParentMID"].ToString().IndexOf("emc.mail") >= 0) //如果是邮件模块
                                        {
                                            subStyle = "mail_" + FileUpLoadCommon.GetFileName(arrThird[k]["icon"].ToString());
                                        }
                                        else
                                        {
                                            subStyle = "subNav";
                                        }

                                        strUrl = "\"javascript:onclick=addTab('" + arrThird[k]["ModulesName"].ToString() + "','" + Dpath + "&TreeModulesID=" + arrThird[k]["ModulesID"].ToString().Trim() + "&MailFlag=" + MailFlag + "','" + subStyle + "')\"";
                                        sbmenu.Append("<li class='thirdmenu'><div><a href=" + strUrl + " ><span class='icon " + subStyle + "' >&nbsp;</span><span class='nav'>" + arrThird[k]["ModulesName"].ToString() + "</span></a></div></li> ");
                                    }
                                }
                            }
                        }
                        sbmenu.Append("</ul>");
                        sbmenu.Append("</div>");
                    }

                    strMenus = sbmenu.ToString();
                }

            }
        }

        //树形菜单
        void ShowTreeMenu()
        {

            string modulesID = "emc";
            TreeNode rootnode = new TreeNode();
            rootnode.Expanded = true;
             
            rootnode.Text = EmcCommon.GetModulesName(modulesID);
            rootnode.ImageUrl = "/images/ICON/house.png";
             
            if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], modulesID) || HttpContext.Current.User.Identity.Name == "admin")
            {
                SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
                DataSet ds = new DataSet();
                string strWhere = "1 = 1  order by OrderID";
                ds = bll.GetList(strWhere);

                tvMenu.Nodes.Add(rootnode);
                CreateTree(modulesID, ds, rootnode);
            }
        }
        private void CreateTree(string modulesID, DataSet ds, TreeNode rootnode)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = " ParentMID = '" + modulesID + "' ";
            TreeNode treenode = null;
            string subStyle = "subNav";
            string img = "";
            string MailFlag = "";
            string Dpath = "";
            string UserName = HttpContext.Current.User.Identity.Name;
            foreach (DataRowView dr in dv)
            {
                n += 1;
                treenode = new TreeNode();
                img = dr["Icon"].ToString();
                DataRow[] arrSub = ds.Tables[0].Select("ParentMID='" + dr["ModulesID"].ToString() + "'");
                string MID = dr["ModulesID"].ToString().Trim();

                if (arrSub.Length > 0)
                {
                    treenode.ImageUrl = "/images/ICON/folder.png";
                }
                else
                {
                    treenode.ImageUrl = "/images/ICON/application_side_list.png";
                }
                if (dr["ModulesID"].ToString().IndexOf("emc.mail") >= 0) //如果是邮件模块
                {
                    if (dr["icon"].ToString() != "")
                    {
                        treenode.ImageUrl = "/webmail/images/" + dr["icon"].ToString();
                    }
                    subStyle = "mail_" + FileUpLoadCommon.GetFileName(dr["icon"].ToString());
                }
                else
                {
                    subStyle = "subNav";
                }

                treenode.Text = dr["ModulesName"].ToString().Trim();

                if (dr["Dpath"].ToString().Trim() != "")
                {
                    treenode.NavigateUrl = "javascript:onclick=addTab('" + dr["ModulesName"].ToString() + "','" + dr["Dpath"].ToString().Trim() + "&TreeModulesID=" + dr["ModulesID"].ToString().Trim() + "','" + subStyle + "')";


              
                }
                else
                {
                    treenode.NavigateUrl = "javascript:void('0');";
                }

                if (dr["ModulesID"].ToString() == "emc.mail.maillist") //邮件文件夹
                {
                    string sqlmf = "select  ID as ModulesID,FolderName as ModulesName,icon,MailFlag,'emc.mail.maillist' ParentMID  from mail_folder where Flag='0' or (Flag='1' and Creator='" + Session["Uid"].ToString() + "') order by orderid";
                    DataSet dsmf = DBTools.GetList(sqlmf);
                    DataRow[] arrThird = dsmf.Tables[0].Select("1=1");
                    // MailFlag = dr["MailFlag"].ToString();
                    //  Dpath = "/webmail/maillist.aspx?state=browse";
                    // treenode.NavigateUrl = "javascript:onclick=addTab('" + dr["ModulesName"].ToString() + "','" + Dpath + "&TreeModulesID=" + dr["ModulesID"].ToString().Trim() + "&MailFlag=" + MailFlag + "','" + subStyle + "')";
                    for (int k = 0; k < arrThird.Length; k++)
                    {
                        TreeNode subtreenode = new TreeNode();
                        subtreenode.Expanded = true;
                        MailFlag = arrThird[k]["MailFlag"].ToString();
                        Dpath = "../webmail/maillist.aspx?state=browse";
                        subStyle = "mail_" + FileUpLoadCommon.GetFileName(arrThird[k]["icon"].ToString());
                        subtreenode.Text = arrThird[k]["ModulesName"].ToString().Trim();
                        subtreenode.NavigateUrl = "javascript:onclick=addTab('" + arrThird[k]["ModulesName"].ToString() + "','" + Dpath + "&TreeModulesID=" + arrThird[k]["ModulesID"].ToString().Trim() + "&MailFlag=" + MailFlag + "','" + subStyle + "')";
                        treenode.ChildNodes.Add(subtreenode);

                    }
                }




                if (SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], MID) || (UserName == "admin" && MID.Substring(0, 6) == "emc.sm"))
                {

                    rootnode.ChildNodes.Add(treenode);
                    CreateTree(MID, ds, treenode);
                }
            }


        }

        protected StringBuilder GetTbHeadLine(string mwd, string bgcolor, StringBuilder str1)
        {
            str1.Append("<table width='100%'>");
            str1.Append("    <tr>");
            str1.Append("        <td style='height: 21px;background-color: " + bgcolor + "'>");
            str1.Append("            <strong >" + mwd + "</strong></td>");
            str1.Append("    </tr>");
            str1.Append(" </table>");
            return str1;
        }



        bool IsLeaf(DataRow dataRow)
        {
            if (dataRow.GetChildRows("TreeRelation").Length < 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }




        [AjaxPro.AjaxMethod]
        public DataSet GetTop1Msn()
        {
            //   lblOnline.Text = Application["UsersOnlineNum"].ToString();
            try
            {
                BLL.Pub_Msn bllpm = new SfSoft.BLL.Pub_Msn();
                string uid = Session["Uid"].ToString();
                string strWhere = "a.AddresseeID='" + uid + "' and b.UID<>'" + uid + "' and a.IsRead='0'";
                DataSet dspm = bllpm.GetTop1List(strWhere);
                if (dspm != null)
                {
                    return dspm;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex) {
                return null;
            }
            

        }

        [AjaxPro.AjaxMethod]
        public string ClearMsn(string ids)
        {
            if (ids == "")
            {
                return "obj";
            }
            else
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("update Pub_Msn_Addressee set isRead='1' where AddresseeID=' " + Session["Uid"].ToString() + "' and isRead='0' ");
                string[] arrid = ids.Split(',');
                if (arrid.Length > 0)
                {

                    string sql1 = "";
                    for (int i = 0; i < arrid.Length; i++)
                    {
                        if (arrid[i].ToString() != "")
                        {
                            sql1 += "'" + arrid[i].ToString() + "',";
                        }
                    }
                    if (sql1 != "")
                    {
                        strSql.Append(" and MsnID in (");
                        strSql.Append(sql1.Substring(0, sql1.Length - 1));
                        strSql.Append(" )");
                    }
                    else
                    {
                        strSql.Append(" and 1 <> 1 ");
                    }
                }
                else
                {
                    strSql.Append(" and 1 <> 1 ");
                }
                DbHelperSQL.ExecuteSql(strSql.ToString());
            }
            return "obj";

        }
    }
}


