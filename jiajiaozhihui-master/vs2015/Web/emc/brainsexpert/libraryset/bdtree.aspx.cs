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

namespace SfSoft.web.emc.brainsexpert.libraryset
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
 
                rootnode.Text ="题库设置";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("wx.questionSorted", rootnode);
            }
        }

        private void CreateTree(string ClassID,   TreeNode rootnode)
        {
            BLL.Pub_BaseData_Classc bll = new BLL.Pub_BaseData_Classc();
            DataSet ds = new DataSet();
            string strWhere = "ParentCID = '" + ClassID + " ' and isnull(IsSystem,0)=0";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["ClassName"].ToString().Trim();
                string CID = dr["ClassID"].ToString().Trim();
                string ClassType = dr["ClassType"].ToString().Trim();
                if (ClassType == "C")
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


