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

namespace SfSoft.web.emc.wxcourse.bag
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
 
                rootnode.Text ="课程包";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("weixin.wxcourse.bag", rootnode);
            }
        }

        private void CreateTree(string ClassID,   TreeNode rootnode)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            DataSet ds = new DataSet();
            string strWhere = "IsAct=1";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["BagName"].ToString().Trim();
                string CID = dr["Id"].ToString().Trim();
                string mediaType = dr["MediaType"].ToString().Trim();
                treenode.NavigateUrl = "javascript:OpenDocument('" + CID + "'," + mediaType + ")";
                rootnode.ChildNodes.Add(treenode);
            }
        }
    }
}


