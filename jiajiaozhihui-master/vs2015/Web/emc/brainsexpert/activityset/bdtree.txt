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

namespace SfSoft.web.emc.brainsexpert.activityset
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
 
                rootnode.Text ="活动设置";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }
        }

        private void CreateTree(string pid,   TreeNode rootnode)
        {
            BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
            DataSet ds = new DataSet();
            string strWhere = "PID = '" + pid + " ' and isnull(IsAct,0)=1 and ClassType=0";

            ds = bll.GetList(strWhere);
            TreeNode treenode = null;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                treenode = new TreeNode();
                treenode.Text = dr["ClassName"].ToString().Trim();
                string id = dr["ID"].ToString().Trim();
                treenode.NavigateUrl = "javascript:OpenDocument('" + id + "')";
                rootnode.ChildNodes.Add(treenode);
                CreateTree(id, treenode);
            }
        }
        
    }
}


