using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Text;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;

namespace SfSoft.web.emc.common
{
    public partial class SelectMoreDepts : SfSoft.SfEmc.EmcBasePage
    {
 
        protected void Page_Load(object sender, EventArgs e)
        {
 
   
            if (!IsPostBack)
            {

                if (Request.Params["ObjID"] != null)
                {
                    hfObjID.Value = Request.Params["ObjID"].ToString();
                }
                if (Request.Params["ObjhfID"] != null)
                {
                    hfObjhfID.Value = Request.Params["ObjhfID"].ToString();
                }
                if (Request.Params["Flag"] != null)
                {
                    hfFlag.Value = Request.Params["Flag"].ToString();
                }
                
                EmcCommon.GetFilialeDropDownList(ddlFiliale);
                if (ddlFiliale.Items.FindByValue(Session["FilialeID"].ToString()) != null)
                {
                    ddlFiliale.Items.FindByValue(Session["FilialeID"].ToString()).Selected = true;
                }
                this.ShowTab();
            }
            txtSelect.Attributes.Add("readonly", "true");
        }
        protected override void VtInitOthersToolbars()
        {
            Button tsbtnSelect = new Button();
            tsbtnSelect.ID = "tsbtnSelect";
            tsbtnSelect.Text = "确定";
            tsbtnSelect.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSelect.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSelect.CssClass = "btn";
            tsbtnSelect.OnClientClick = "SelectMember();return false;";
            phToolBars.Controls.Add(tsbtnSelect);
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }

        private void ShowUsers()
        {
            string FilialeID = ddlFiliale.SelectedItem.Value;
            string SCnName = txtCnName.Text;
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            DataSet dsdept = new DataSet();
            string strWhere = " DeptID in (select DeptID from Pub_DeptUsers where FilialeID='" + FilialeID + "')";
            dsdept = bllDept.GetList(strWhere);

            //取的人员数据
            BLL.Pub_EmpInfo bllemp = new SfSoft.BLL.Pub_EmpInfo();
            string strWhere1 = " b.FilialeID ='" + FilialeID + "' and a.IsSysUser='1'   ";
            DataSet dsemp = bllemp.GetUsersDeptIDList(strWhere1);
            DataView dvemp = new DataView(dsemp.Tables[0]);
            StringBuilder strHtml = new StringBuilder();
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            strHtml.Append("<tr>");
            strHtml.Append("<td  class='tablehead' > </td>");
            strHtml.Append("<td style='width: 80px'  height='22' class='tablehead'>部门</td>");
            strHtml.Append("<td style='width: 600px' class='tablehead'>人员</td>");
            strHtml.Append("</tr>");
            foreach (DataRow dr in dsdept.Tables[0].Rows)
            {


                string DeptName = dr["DeptName"].ToString();
                string DeptID = dr["DeptID"].ToString();
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 60px'  class='formlbl' ><img src='/images/right.gif' title='全选部门' onClick=\"SelectUDData('true','" + DeptID + "')\" class='cursor' />&nbsp;<img src='/images/wrong.gif' title='取消部门' onClick=\"SelectUDData('false','" + DeptID + "')\" class='cursor' /></td>");
                strHtml.Append("<td style='width: 80px'  class='formlbl' >&nbsp;" + DeptName + "</td>");
                strHtml.Append("<td style='width: 600px' class='formlbl' id='tdUD" + DeptID + "'>");
                //取的部门下的员工
                string FilterWhere = " DeptID = '" + DeptID + "'";
                if (SCnName != "")
                {
                    FilterWhere += " and CnName like '%" + SCnName + "%'";
                }
                dvemp.RowFilter = FilterWhere;
                if (dvemp.Count > 0)
                {
                    foreach (DataRowView dremp in dvemp)
                    {
                        string Uid = dremp["ID"].ToString();
                        string CnName = dremp["CnName"].ToString();
                        strHtml.Append(" <input id='ckU" + Uid + "'  OnClick=SelectData('ckU" + Uid + "','U-" + Uid + "','" + CnName + "')  value='" + Uid + "-" + CnName + "' type='checkbox'/> " + CnName + "&nbsp;");
                    }
                }
                strHtml.Append("</td></tr>");
            }
            strHtml.Append("</table>");
            UserlistDiv.InnerHtml = strHtml.ToString();
        }

        private void ShowDept()
        {
            string FilialeID = ddlFiliale.SelectedItem.Value;
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            DataSet dsdept = new DataSet();
            string strWhere = " DeptID in (select DeptID from Pub_DeptUsers where FilialeID='" + FilialeID + "')";
            dsdept = bllDept.GetList(strWhere);

            StringBuilder strHtml = new StringBuilder();
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            strHtml.Append("<tr>");
            strHtml.Append("<td colspan='3' class='tablehead'>部门</td>");

            strHtml.Append("</tr>");
            int m = 0;
            int totalRow = dsdept.Tables[0].Rows.Count;
            int cols = 3;
            if (dsdept.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dsdept.Tables[0].Rows)
                {

                    string DeptName = dr["DeptName"].ToString();
                    string DeptID = dr["DeptID"].ToString();
                    if ((m % cols) == 0)
                    {
                        strHtml.Append("<tr>");
                    }
                    strHtml.Append("<td   class='formlbl'>");
                    strHtml.Append(" <input id='ckD" + DeptID + "'  OnClick=SelectData('ckD" + DeptID + "','D-" + DeptID + "','" + DeptName + "')  type='checkbox'/>" + DeptName + "&nbsp;");
                    strHtml.Append("</td>");
                    if (m == totalRow && m % cols != 0)
                    {
                        int kk = cols - (m % cols);
                        for (int j = 0; j < kk; j++)
                        {
                            strHtml.Append("<td class='formlbl'>&nbsp;</td>");
                        }

                        strHtml.Append("</tr>");
                    }
                    else
                    {
                        if (((m + 1) % cols) == 0)
                        {
                            strHtml.Append("</tr>");
                        }
                        m += 1;
                    }

                }
            }
            strHtml.Append("</table>");
            DeptlistDiv.InnerHtml = strHtml.ToString();
        }
        private void ShowCompany()
        {

            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            DataSet dsdept = new DataSet();
            string strWhere = " isFiliale='0' or isFiliale='1' ";
            dsdept = bllDept.GetList(strWhere);

            StringBuilder strHtml = new StringBuilder();
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%'  class='fromtable1'>");
            strHtml.Append("<tr>");
            strHtml.Append("<td style='width: 400px'  class='tablehead'>公司</td>");

            strHtml.Append("</tr>");
            foreach (DataRow dr in dsdept.Tables[0].Rows)
            {


                string DeptName = dr["DeptName"].ToString();
                string DeptID = dr["DeptID"].ToString();
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 400px'  class='formlbl'>");
                strHtml.Append(" <input id='ckC" + DeptID + "'  OnClick=SelectData('ckC" + DeptID + "','C-" + DeptID + "','" + DeptName + "')  type='checkbox'/>" + DeptName + "&nbsp;");
                strHtml.Append("</td></tr>");
            }
            strHtml.Append("</table>");
            ComlistDiv.InnerHtml = strHtml.ToString();

        }

        private void ShowTab()
        {

            string Flag = hfFlag.Value;
            if (Flag == "" || Flag == "7")
            {
                Tab1.Visible = true;
                Tab2.Visible = true;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
                this.ShowDept();
                this.ShowCompany();
            }
            else if (Flag == "1")
            {
                Tab1.Visible = true;
                Tab2.Visible = false;
                Tab3.Visible = false;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
            }
            else if (Flag == "2")
            {
                Tab1.Visible = false;
                Tab2.Visible = true;
                Tab3.Visible = false;
                TabOption1.SelectIndex = 1;
                this.ShowDept();
            }
            else if (Flag == "4")
            {
                Tab1.Visible = false;
                Tab2.Visible = false;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 2;
                this.ShowCompany();
            }
            else if (Flag == "3")
            {
                Tab1.Visible = true;
                Tab2.Visible = true;
                Tab3.Visible = false;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
                this.ShowDept();
            }
            else if (Flag == "5")
            {
                Tab1.Visible = true;
                Tab2.Visible = false;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
                this.ShowCompany();
            }
            else if (Flag == "6")
            {
                Tab1.Visible = false;
                Tab2.Visible = true;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 2;
                this.ShowDept();
                this.ShowCompany();
            }
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            Tab1.Visible = true;
            hfMode.Value = "Y";
            txtSelect.Text = hfSelectTxt.Value;
            ShowTab();
 
        }

        protected void ddlFiliale_SelectedIndexChanged(object sender, EventArgs e)
        {
            Tab1.Visible = true;
            hfMode.Value = "Y";
            txtSelect.Text = hfSelectTxt.Value;
            ShowTab();
 

        }
 
    }
}


