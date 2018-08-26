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
    public partial class SelectDept : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ObjText = Request.Params["ObjText"];
                string ObjValue = Request.Params["ObjValue"];
                HfObjText.Value = ObjText;
                HFObjValue.Value = ObjValue;

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
                DeptTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }

        }
        private void CreateTree(string DeptID,TreeNode rootnode)
        {
            BLL.Pub_Dept bll = new BLL.Pub_Dept();
            DataSet ds = new DataSet();
            string strWhere = "ParentID = '" + DeptID + " ' and FilialeID='" + Session["FilialeID"].ToString() + "'";

            ds = bll.GetList(strWhere);

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TreeNode treenode = new TreeNode();
                treenode.Text = dr["DeptName"].ToString().Trim();
                string MID = dr["DeptID"].ToString().Trim();
 
                treenode.NavigateUrl = "javascript:SelectDept('" + MID + "','"+ dr["DeptName"].ToString().Trim() + "','"+HfObjText.Value+ "','"+HFObjValue.Value +"')";



                rootnode.ChildNodes.Add(treenode);
                CreateTree(MID, treenode);

            }


        }
    }
}


