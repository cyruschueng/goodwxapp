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

namespace SfSoft.web.emc.resouce.set
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
 
                rootnode.Text ="基础数据";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("wx.resouce", rootnode);
            }
        }

        private void CreateTree(string ClassID,   TreeNode rootnode)
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = new DataSet();
            string strWhere = "RefObj = '" + ClassID + " ' and isnull(isact,0)=1";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["RefValue"].ToString().Trim();
                string CID = dr["RefValueCode"].ToString().Trim();
                treenode.NavigateUrl = "javascript:OpenDocument('" + CID + "')";
                rootnode.ChildNodes.Add(treenode);
            }
        }
        
    }
}


