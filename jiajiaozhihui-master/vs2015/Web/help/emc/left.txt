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
using SfSoft.Common;
using SfSoft.SfEmc;
using SfSoft.DBUtility;
namespace SfSoft.web.help.emc
{
    public partial class left : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;

                rootnode.Text = "EMC系统帮助";
                rootnode.ImageUrl = "../../images/icon/folder_home.png";
                rootnode.NavigateUrl = "javascript:void(0);";
                string strSql = " select * from Emc_HelpItem ";
                DataSet ds = DbHelperSQL.Query(strSql);
                TreeView1.Nodes.Add(rootnode);
                CreateTree("0", ds, rootnode);

            }
        }
        private void CreateTree(string modulesID, DataSet ds, TreeNode rootnode)
        {
            DataView dv = new DataView(ds.Tables[0]);
            dv.RowFilter = " ParentFunID = '" + modulesID + "' ";
            TreeNode treenode = null;

            foreach (DataRowView dr in dv)
            {
                treenode = new TreeNode();
                treenode.ImageUrl = "../../images/icon/index_top_helpbuttom2.gif";
                treenode.Text = dr["FunName"].ToString().Trim();

                string MID = dr["FunID"].ToString().Trim();
                rootnode.ChildNodes.Add(treenode);
                if (MID == "help.emc")
                {
                    treenode.NavigateUrl = "javascript:void(0);";
                    SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
                    DataSet ds1 = new DataSet();
                    string strWhere = "1 = 1  order by OrderID";
                    ds1 = bll.GetList(strWhere);

                    CreateMoudlesTree("emc", ds1, treenode);
                }

                else
                {
                    treenode.NavigateUrl = "javascript:openupdate('" + dr["FunID"].ToString().Trim() + "','" + dr["Dpath"].ToString() + "')";
                    CreateTree(MID, ds, treenode);
                }

            }


        }

        private void CreateMoudlesTree(string modulesID, DataSet ds, TreeNode rootnode)
        {
            DataView dv = new DataView(ds.Tables[0]);
          //  DataView dv1 = new DataView(ds.Tables[0]);
            dv.RowFilter = " ParentMID = '" + modulesID + "' ";
            TreeNode treenode = null;
            string img = "";
            foreach (DataRowView dr in dv)
            {
                treenode = new TreeNode();
                img = dr["Icon"].ToString();
                string MID = dr["ModulesID"].ToString().Trim();
 
                if (ds.Tables[0].Select("ParentMID='" + MID + "'").Length > 0)
                {
                    treenode.ImageUrl = "../../images/icon/folder.png";
                }
                else
                {
                    treenode.ImageUrl = "../../images/icon/application_view_columns.png";
                }
                treenode.Text = dr["ModulesName"].ToString().Trim();
 
              //  dv1.RowFilter = " ParentMID = '" + MID + "' ";
               // if (dv1.Count > 0)
              //  {
              //      treenode.NavigateUrl = "javascript:void(0);";
              //  }
              //  else
              //  {
                    treenode.NavigateUrl = "javascript:openupdate('" + dr["ModulesID"].ToString().Trim() + "','')";//"update.aspx?state=browse&HelpID=" + dr["ModulesID"].ToString().Trim();
              //  }




                rootnode.ChildNodes.Add(treenode);
                CreateMoudlesTree(MID, ds, treenode);

            }


        }
    }
}

