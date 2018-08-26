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
namespace SfSoft.web.emc.hrm.group
{
    public partial class changegroup : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string DeptID = Request.Params["DeptID"].ToString();
                hfDeptID.Value = DeptID;
                txtDeptName.Text = EmcCommon.getDeptNameByID(int.Parse(DeptID));
                EmcCommon.GetDeptTreeDropDownList(ddlDeptID, Session["FilialeID"].ToString());
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.hrm.group";
        }
        //工具栏
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
            VtInitBaseDetailToolsBars();
             
        }
        protected override void VtSave()
        {
            string ParentDeptID = ddlDeptID.SelectedItem.Value;
            string DeptID = hfDeptID.Value;
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            Model.Pub_Dept ModelDept = new Model.Pub_Dept();
            Model.Pub_Dept PModelDept = new Model.Pub_Dept();
            string ParentNo = "";
            PModelDept = bllDept.GetModel(int.Parse(ParentDeptID));
            if (PModelDept != null)
            {
                ParentNo = PModelDept.DeptNo;
            }
            string NewDeptNo = "";
            NewDeptNo = GetHaveDeptNo(ParentDeptID, ParentNo);
            if (NewDeptNo != "")
            {
                ModelDept = bllDept.GetModel(int.Parse(DeptID));
                ModelDept.ParentID = Common.Common.stringToInt(ParentDeptID);
                ModelDept.DeptNo = NewDeptNo;
                ModelDept.ParentAuditID = ModelDept.ParentID;
                bllDept.Update(ModelDept);
            }
            Response.Write("<script>parent.window.location='update.aspx?state=update&DeptID=" + DeptID + "'</script>");
            Response.Write("<script> parent.window.parent.leftbody.location='depttree.aspx?state=browse&PDeptNo=" + NewDeptNo + "';</script>");
        }

        private static string GetHaveDeptNo(string ParentID, string ParentNo)
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            string strWhere = " ParentID = '" + ParentID + "'";
            DataSet dsDept = bllDept.GetList(strWhere);
            for (int i = 1; i <= 99; i++)
            {
                string tempID = "";
                if (i < 10)
                {
                    tempID = "0" + i.ToString();
                }
                else
                {
                    tempID = i.ToString();
                }
                Boolean bl = true;
                if (dsDept != null)
                {
                    DataView dvDept = new DataView(dsDept.Tables[0]);
                    if (dvDept != null)
                    {
                        dvDept.RowFilter = "[DeptNo]='" + ParentNo + tempID + "'";
                        if (dvDept.Count <1)
                        {

                            return ParentNo + tempID;
                        }
                    }
                }
            }
            return "";
        }
    }
}


