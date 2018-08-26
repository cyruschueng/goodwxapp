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
using AjaxPro;
namespace SfSoft.web.emc.sm.s1
{
    public partial class _Default: System.Web.UI.Page
    {
        //此对象用于存放所有的节点数
        public static DataSet dsAllNodes = new DataSet();
      
        protected void Page_Load(object sender, EventArgs e)
        {

            AjaxPro.Utility.RegisterTypeForAjax(typeof(SfSoft.web.emc.sm.s1._Default));
               
                CreateNodes();
            
        }
        public void CreateNodes()
        {
            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            dsAllNodes = bllDept.GetList("");
        }

        private DataTable CreateStructure()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("DeptID", typeof(string)));
            dt.Columns.Add(new DataColumn("DeptName", typeof(string)));
            dt.Columns.Add(new DataColumn("ParentID", typeof(string)));
            dt.Columns.Add(new DataColumn("IsChild", typeof(bool)));
            return dt;
        }

        [AjaxPro.AjaxMethod]
        public DataSet GetSubDept(string DeptID)
        {
            DataSet ds = new DataSet();
            DataSet dsAllNodesTemp = new DataSet();
            
            DataTable dt = this.CreateStructure();
            dsAllNodesTemp = dsAllNodes;

            DataRow[] drSelect = dsAllNodesTemp.Tables[0].Select("ParentID='" + DeptID + "'");
            foreach (DataRow drTemp in drSelect)
            {
                DataRow dr = dt.NewRow();
                dr["DeptID"] = drTemp["DeptID"];
                dr["DeptName"] = drTemp["DeptName"];
                dr["ParentID"] = drTemp["ParentID"];
                dr["IsChild"] = IsLeaf(drTemp["DeptID"].ToString());
                dt.Rows.Add(dr);
            }
            ds.Tables.Add(dt);
            return ds;
        }

        [AjaxPro.AjaxMethod]
        public bool IsLeaf(string DeptID)
        {
            foreach (DataRow dr in dsAllNodes.Tables[0].Rows)
            {
                if (dr["ParentID"] != null && dr["ParentID"].ToString() == DeptID)
                {
                    return false;
                }
            }
            return true;
        }

        [AjaxPro.AjaxMethod]
        public string GetNameByDeptID(string DeptID)
        {
            foreach (DataRow dr in dsAllNodes.Tables[0].Rows)
            {
                if (dr["DeptID"].ToString () == DeptID)
                {
                    return dr["DeptName"].ToString();
                }
            }
            return "";
        }
    }
}


