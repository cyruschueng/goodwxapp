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
namespace SfSoft.web.emc.sm.s1
{
    public partial class depttree : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string PDeptNo = Request.Params["PDeptNo"];
                string CompanyName="";
                TreeNode rootnode = new TreeNode();
                rootnode.Expanded = true;
                rootnode.NavigateUrl = "javascript:void('0')";
                BLL.Pub_Company bllCom = new BLL.Pub_Company();
                Model.Pub_Company modelCom= bllCom.GetModel("01");
                if (modelCom != null) 
                {
                    CompanyName = modelCom.CompanyName;
                }

                rootnode.Text =CompanyName;
                DeptTreeView.Nodes.Add(rootnode);
                CreateTree("0",PDeptNo, rootnode);
            }
        }

        private void CreateTree(string DeptID, string PDeptNo, TreeNode rootnode)
        {
            BLL.Pub_Dept bll = new BLL.Pub_Dept();
            DataSet ds = new DataSet();
            string strWhere = "ParentID = '" + DeptID + " ' and FilialeID = '" + Session["FilialeID"].ToString() + "'";

            ds = bll.GetList(strWhere);
            
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                TreeNode treenode = new TreeNode();
                treenode.Text = dr["DeptName"].ToString().Trim();
                string MID = dr["DeptID"].ToString().Trim();
                string DeptNo = dr["DeptNo"].ToString().Trim();
                
                if (PDeptNo != null)
                {
                    if (DeptNo.Length <= PDeptNo.Length)
                    {
                        if (DeptNo == PDeptNo.Substring(0, DeptNo.Length))
                        {
                         
                            treenode.Expanded = true;

                        }
                    }
                }
                   
                treenode.NavigateUrl = "javascript:OpenDocument('" + MID + "')";
               
                
 
                rootnode.ChildNodes.Add(treenode);
                CreateTree(MID, DeptNo, treenode);
 
            }
            

        }
    }
}


