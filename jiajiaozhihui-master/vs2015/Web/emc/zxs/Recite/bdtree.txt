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

namespace SfSoft.web.emc.zxs.recite
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
 
                rootnode.Text ="关卡";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree(rootnode);
            }
        }

        private void CreateTree( TreeNode rootnode)
        {
            BLL.WX_ZXS_Info bll = new BLL.WX_ZXS_Info();
            DataSet ds = new DataSet();
            string strWhere = "";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["Title"].ToString().Trim();
                string CID = dr["AppId"].ToString().Trim();
                treenode.NavigateUrl = "javascript:void(0)";
                rootnode.ChildNodes.Add(treenode);
                ChilderTheme(CID, treenode);
            }
        }
        private void ChilderTheme(string appid, TreeNode rootnode)
        {
            BLL.WX_ZXS_Theme bll = new BLL.WX_ZXS_Theme();
            DataSet ds = new DataSet();
            string strWhere = "AppId='" + appid + "'";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["Title"].ToString().Trim();
                string themId = dr["Id"].ToString().Trim();
                int weeks = Convert.ToInt32(dr["Weeks"].ToString());
                treenode.NavigateUrl = "javascript:OpenDocument('"+appid+"','"+themId+"')";
                rootnode.ChildNodes.Add(treenode);
            }
        }
    }
}


