using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

namespace SfSoft.web.emc.common
{
    public partial class SelectSingle : SfSoft.SfEmc.EmcBasePage
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
                this.ShowUsers();
            }
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        protected override void VtInitOthersToolbars()
        {
            //Button tsbtnSelect = new Button();
            //tsbtnSelect.ID = "tsbtnSelect";
            //tsbtnSelect.Text = "确定";
            //tsbtnSelect.Attributes.Add("onmouseout", "this.className='btn'");
            //tsbtnSelect.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            //tsbtnSelect.CssClass = "btn";
            //tsbtnSelect.OnClientClick = "SelectMember();return false;";
            //phToolBars.Controls.Add(tsbtnSelect);
        }
        private void ShowUsers()
        {
            string FilialeID = "4";
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
            strHtml.Append("<td style='width: 80px'  height='22' class='tablehead'>部门</td>");
            strHtml.Append("<td style='width: 600px' class='tablehead'>人员</td>");
            strHtml.Append("</tr>");
            foreach (DataRow dr in dsdept.Tables[0].Rows)
            {


                string DeptName = dr["DeptName"].ToString();
                string DeptID = dr["DeptID"].ToString();
                strHtml.Append("<tr>");
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

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            ShowUsers();
        }
    }
}

