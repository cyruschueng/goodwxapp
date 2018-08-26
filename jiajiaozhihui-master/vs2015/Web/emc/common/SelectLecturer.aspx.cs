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
    public partial class SelectLecturer : SfSoft.SfEmc.EmcBasePage
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
            BLL.WX_Course_Lecturer bll = new BLL.WX_Course_Lecturer();
            DataSet ds = new DataSet();
            ds = bll.GetList("Name like '%" + txtName.Text+ "%'");

            StringBuilder strHtml = new StringBuilder();
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                string Id = dr["Id"].ToString();
                string name = dr["Name"].ToString();
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 60px'  class='formlbl' ><input id='ckU" + Id + "'  OnClick=SelectData('ckU" + Id + "','U-" + Id + "','" + name + "')  value='" + Id + "-" + name + "' type='checkbox'/></td>");
                strHtml.Append("<td style='width: 60px'  class='formlbl' >" + Id + "</td>");
                strHtml.Append("<td style='width: 100px' class='formlbl' id='tdUD'>" + name + "</td>");
                strHtml.Append("<td style='width: 420px' class='formlbl' id='tdUD'>" + dr["DepartMent"].ToString() + "</td>");
                strHtml.Append("<td style='width: 100px' class='formlbl' id='tdUD'>" + dr["Postion"].ToString() + "</td>");
                strHtml.Append("</tr>");
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

