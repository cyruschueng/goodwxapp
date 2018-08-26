using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.SfEmc;
using System.Data;
using System.Text;

namespace SfSoft.web.emc.common
{
    public partial class SelectMoreExpert :  SfSoft.SfEmc.EmcBasePage
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
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            DataSet ds = bll.GetList("IsAct=1 and IsCheck=1");

            StringBuilder strHtml = new StringBuilder();

            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            strHtml.Append("<tr>");
            strHtml.Append("<td style='width: 20px'  height='22' class='tablehead'></td>");
            strHtml.Append("<td style='width: 120px'  height='22' class='tablehead'>专家姓名</td>");
            strHtml.Append("<td style='width: 120px' height='22' class='tablehead'>专家昵称</td>");
            strHtml.Append("<td style='width: 80px' height='22' class='tablehead'>系统专家</td>");
            strHtml.Append("<td style='width: 340px' height='22' class='tablehead'>默认专家</td>");
            strHtml.Append("</tr>");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 20px'  height='22' class='tablehead'>");
                strHtml.Append(" <input id='ckU" + dr.Field<int>("Id") + "'  OnClick=SelectData('ckU" + dr.Field<int>("Id") + "','U@" + dr.Field<int>("Id") + "@" + dr.Field<string>("OpenId") + "','" + dr.Field<string>("UName") + "')  value='" + dr.Field<int>("Id") + "-" + dr.Field<string>("UName") + "' type='checkbox'/>");
                strHtml.Append("</td>");
                strHtml.Append("<td style='width: 120px'  class='formlbl'>&nbsp;" + dr.Field<string>("UName") + "</td>");
                strHtml.Append("<td style='width: 120px' class='formlbl'>&nbsp;" + dr.Field<string>("NickName") + "</td>");
                string expertTypeName = ExpertTypeName(dr.Field<int?>("ExpertType").Value);
                strHtml.Append("<td style='width: 80px' class='formlbl'>&nbsp;" + expertTypeName + "</td>");
                string defaultName = (dr.Field<int?>("IsDefault") ?? 0) == 0 ? "" : "是";
                strHtml.Append("<td style='width: 340px' class='formlbl'>&nbsp;" + defaultName + "</td>");
                strHtml.Append("</tr>");
            }
            strHtml.Append("</table>");
            UserlistDiv.InnerHtml = strHtml.ToString();
        }
        private string ExpertTypeName(int expertType)
        {
            string result = "";
            if (expertType == 1)
            {
                result = "系统专家";
            } if (expertType == 2)
            {
                result = "普通专家";
            }
            return result;
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
            }
            else if (Flag == "4")
            {
                Tab1.Visible = false;
                Tab2.Visible = false;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 2;
            }
            else if (Flag == "3")
            {
                Tab1.Visible = true;
                Tab2.Visible = true;
                Tab3.Visible = false;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
            }
            else if (Flag == "5")
            {
                Tab1.Visible = true;
                Tab2.Visible = false;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 0;
                this.ShowUsers();
            }
            else if (Flag == "6")
            {
                Tab1.Visible = false;
                Tab2.Visible = true;
                Tab3.Visible = true;
                TabOption1.SelectIndex = 2;
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

