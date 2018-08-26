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

namespace SfSoft.web.emc.audio.category
{
    public partial class bdtree : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (!IsPostBack)
            {
                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:OpenDocument('0')";
 
                rootnode.Text ="教材";
                BDTreeView.Nodes.Add(rootnode);
                CreateTree("0", rootnode);
            }
        }

        private void CreateTree(string pid,   TreeNode rootnode)
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            string strWhere = "isnull(Pid,0)="+pid+" and IsAct=1";
            var list= bll.GetModelList(strWhere);
            TreeNode treenode = null;
            foreach (var m  in list)
            {
                treenode = new TreeNode();
                treenode.Text = m.FullName;
                string id = m.Id.ToString();
                treenode.NavigateUrl = "javascript:OpenDocument('" + id + "','')";
                rootnode.ChildNodes.Add(treenode);
                CreateTree(m.Id.ToString(), treenode);
            }
        }
        private bool HasSub(int id)
        {
            BLL.WX_Audio bll = new BLL.WX_Audio();
            var count= bll.GetRecordCount("pid=" + id);
            return count > 0 ? true : false;
        }
    }
}


