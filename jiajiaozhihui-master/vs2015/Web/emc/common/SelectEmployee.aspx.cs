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

namespace SfSoft.web.emc.common
{
    public partial class SelectEmployee : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ObjText = Request.Params["ObjText"];
                string ObjValue = Request.Params["ObjValue"];
                HfObjText.Value = ObjText;
                HfObjValue.Value = ObjValue;

                string CompanyName = "";
                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:void('0')";
                BLL.Pub_Company bllCom = new BLL.Pub_Company();
                Model.Pub_Company modelCom = bllCom.GetModel("01");
                if (modelCom != null)
                {
                    CompanyName = modelCom.CompanyName;
                }

                rootnode.Text = CompanyName;
                EmpTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }
        }
        private void CreateTree(string DeptID, TreeNode rootnode)
        {
            BLL.Pub_Dept bll = new BLL.Pub_Dept();
            BLL.Pub_EmpInfo bllEmp = new BLL.Pub_EmpInfo();

            DataSet ds = new DataSet();
            string strWhere = "ParentID = '" + DeptID + " ' and FilialeID='" + Session["FilialeID"].ToString() + "'";

            ds = bll.GetList(strWhere);

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TreeNode treenode = new TreeNode();
                treenode.Text = dr["DeptName"].ToString().Trim();
                string MID = dr["DeptID"].ToString().Trim();

                treenode.NavigateUrl = "javascript:void('0')";

                //部门下是否有人员
                string strWhereEmp = " ID in (select UserID from Pub_DeptUsers where DeptID = '" + dr["DeptID"].ToString().Trim() + "') and   IsSysUser='1' ";
                DataSet dsemp = bllEmp.GetList(strWhereEmp);
                if (dsemp != null)
                {

                    foreach (DataRow dremp in dsemp.Tables[0].Rows)
                        {
                            TreeNode treenodeemp = new TreeNode();
                            string UserID = dremp["ID"].ToString().Trim();
                            string CnName = dremp["CnName"].ToString().Trim();
                            treenodeemp.Text = CnName;
                            treenodeemp.ToolTip = UserID;
                             
                            treenodeemp.NavigateUrl = "javascript:SelectDept('" + UserID + "','" + CnName + "','" + HfObjText.Value + "','" + HfObjValue.Value + "')";
                            // treenodecl.Expanded = true;
                            treenode.ChildNodes.Add(treenodeemp);


                        }
                    
                }


                rootnode.ChildNodes.Add(treenode);
                CreateTree(MID, treenode);

            }


        }
    }
}


