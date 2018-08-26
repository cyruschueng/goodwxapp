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

namespace SfSoft.web.emc.sm.s4
{
    public partial class dttree : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:void('0')";

                rootnode.Text = "数据权限";
                DTTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }
        }

        private void CreateTree(string ParentID, TreeNode rootnode)
        {
            BLL.Pub_FunDef bll = new BLL.Pub_FunDef();
            DataSet ds = new DataSet();
            string strWhere = "ParentID = '" + ParentID + " ' and FunType='Data'";
            string FunID = "";
            string Flag = "";
            string ID = "";
            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
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
                    treenode.NavigateUrl = "javascript:OpenDocument('" + FunID + "')";
                }
                rootnode.ChildNodes.Add(treenode);
                CreateTree(ID, treenode);

            }


        }
    }
}


