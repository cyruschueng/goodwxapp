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
    public partial class CourseBag :  SfSoft.SfEmc.EmcBasePage
    {
        private Dictionary<int, string> dicLecturer = new Dictionary<int, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetdicLecturer();
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
            BLL.WX_Course bll = new BLL.WX_Course();
            DataSet ds = new DataSet();
            ds = bll.GetList("isnull(ParentId,0)=0 and SaleState=1 and Name like '%" + txtName.Text+ "%'");

            StringBuilder strHtml = new StringBuilder();
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                string Id = dr["Id"].ToString();
                string name = dr["Name"].ToString();
                int key;
                int.TryParse(dr["Lecturer"].ToString(), out key);
                string lecturer = "";
                if (dicLecturer.ContainsKey(key)) {
                    lecturer = dicLecturer[key];
                }
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 60px'  class='formlbl' ><input id='ckU" + Id + "'  OnClick=SelectData('ckU" + Id + "','U-" + Id + "','" + name + "')  value='" + Id + "-" + name + "' type='checkbox'/></td>");
                strHtml.Append("<td style='width: 60px'  class='formlbl' >" + Id + "</td>");
                strHtml.Append("<td style='width: 420px' class='formlbl' id='tdUD'>" + name + "</td>");
                strHtml.Append("<td style='width: 100px' class='formlbl' id='tdUD'>" + lecturer + "</td>");
                strHtml.Append("</tr>");
            }
            strHtml.Append("</table>");
            UserlistDiv.InnerHtml = strHtml.ToString();
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            ShowUsers();
        }
        private void GetdicLecturer()
        { 
            BLL.WX_Course_Lecturer bll =new BLL.WX_Course_Lecturer();
            List<Model.WX_Course_Lecturer> list = bll.GetModelList("");
            foreach (Model.WX_Course_Lecturer m in list) {
                dicLecturer.Add(m.Id, m.Name);
            }
        }

    }
}

