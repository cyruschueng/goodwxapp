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

namespace SfSoft.web.emc.sm.s8
{
    public partial class funtree : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BLL.Pub_FunDef bll = new BLL.Pub_FunDef();
                DataSet ds = new DataSet();
                string strWhere = " FunType='App'";
                ds = bll.GetList(strWhere);

                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:void('0')";

                rootnode.Text = "审批流程";
                FunTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode,ds,"emc");
            }
        }

        private void CreateTree(string ParentID, TreeNode rootnode, DataSet ds, string PFunID)
        {

            string FunID = "";
            string Flag = "";
            string ID = "";
            DataView dv = new DataView(ds.Tables[0]);
            if (PFunID == "emc.rcm.flow")
            {
                dv.RowFilter = " ParentID = " + ParentID + " and FilialeID='"+ Session ["FilialeID"].ToString () + "' and IsAct='1' ";
            }
            else
            {
                dv.RowFilter = " ParentID = " + ParentID;
            }
            TreeNode treenode = null;
            foreach (DataRowView dr in dv)
            {
                treenode = new TreeNode();
                treenode.Text = dr["FunName"].ToString().Trim();
                FunID = dr["FunID"].ToString().Trim();
                Flag = dr["Flag"].ToString().Trim();
                ID = dr["ID"].ToString().Trim();
                if (Flag == "C")
                {
                    treenode.NavigateUrl = "javascript:void('0')";
                }
                else
                {
                    treenode.NavigateUrl = "javascript:OpenDocument('" + FunID + "','" + dr["FunName"].ToString().Trim() + "')";
                }
                rootnode.ChildNodes.Add(treenode);
                CreateTree(ID, treenode,ds,FunID);

            }


        }
    }
}


