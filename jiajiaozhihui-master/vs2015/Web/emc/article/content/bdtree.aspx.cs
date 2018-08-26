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

namespace SfSoft.web.emc.article.content
{
    public partial class bdtree : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (!IsPostBack)
            {
                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:void('0')";
 
                rootnode.Text ="内容管理";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("emc", rootnode);
            }
        }

        private void CreateTree(string ClassID,   TreeNode rootnode)
        {
            BLL.Pub_Modules bll = new BLL.Pub_Modules();
            DataSet ds = new DataSet();
            string strWhere = "ParentMID = '" + ClassID + " ' ";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["ModulesName"].ToString().Trim();
                string CID = dr["Modulesid"].ToString().Trim();
                string ClassType = dr["MPath"].ToString().Trim();
                if (ClassType == "")
                {
                    treenode.NavigateUrl = "javascript:void('0')";
                }
                else
                {
                    treenode.NavigateUrl = "javascript:OpenDocument('" + CID + "')";
                }
                rootnode.ChildNodes.Add(treenode);
                CreateTree(CID, treenode);
 
            }
            

        }
        
    }
}


