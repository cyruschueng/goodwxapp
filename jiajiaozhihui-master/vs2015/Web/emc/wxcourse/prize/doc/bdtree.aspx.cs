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

namespace SfSoft.web.emc.wxcourse.prize.doc
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
 
                rootnode.Text ="课程";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }
        }

        private void CreateTree(string pid,   TreeNode rootnode)
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.wxcourse.theme' and IsAct=1");
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["RefValue"].ToString().Trim();
                string id = dr["RefValueCode"].ToString().Trim();
                treenode.NavigateUrl = "javascript:void('0')";
                rootnode.ChildNodes.Add(treenode);
                LoadCourse(id, treenode);
            }
        }
        private void LoadCourse(string theme,TreeNode node)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            DataSet ds= bll.GetList("theme="+theme);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows) {
                treenode = new TreeNode();
                treenode.Text = dr["Name"].ToString().Trim();
                string id = dr["Id"].ToString().Trim();
                treenode.NavigateUrl = "javascript:OpenDocument('" + id + "')";
                node.ChildNodes.Add(treenode);
            }
        }
    }
}


