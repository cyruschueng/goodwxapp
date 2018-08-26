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

namespace SfSoft.web.emc.wxcourse.reward
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
 
                rootnode.Text ="分成设置";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("weixin.wxcourse.reward", rootnode);
            }
        }

        private void CreateTree(string pid,   TreeNode rootnode)
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = new DataSet();
            string strWhere = "RefObj ='"+pid+"' and isnull(IsAct,0)=1";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["RefValue"].ToString().Trim();
                string id = dr["RefValueCode"].ToString().Trim();
                treenode.NavigateUrl = "javascript:OpenDocument('" + id + "')";
                rootnode.ChildNodes.Add(treenode);
                CreateTree(id, treenode);
            }
        }
        
    }
}


