using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Text;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;

namespace SfSoft.web.emc.sm.computer
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                hfMID.Value = "emc.sm.computer";
                EmcCommon.SetBaseDataEptDropDownList(ddlComputerKind, "sm.computer.ComputerKind");
                BindData(GetWhere());
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.computer";

        }
        //页面权限
        protected override void VtPageAccess()
        {
            CheckPageAccess(hfMID.Value + ".mgt");
        }

        #region 初始化工具栏
        protected override void VtInitToolbars()
        {


        }
        protected override void VtInitOthersToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            //NewTsbtnDelete();
            //phToolBars.Controls.Add(tsbtnDelete);
        
        }

        /// <summary>
        /// 新建
        /// </summary>
        protected override void VtNew()
        {
           // VtShowIframe("新建", "update.aspx?mode=add&ID=", "", "");
            ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script>document.location='update.aspx?mode=add&ID='</script>");
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }

        #endregion
        private void BindData(string strWhere)
        {
            BLL.Pub_ComputerKey bll = new BLL.Pub_ComputerKey();
            DataSet ds = bll.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);

        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
  
        private string GetWhere()
        {
            string CnName = txtCnName.Text;
            string[] arrStatus = null;
            if (cblStatus.SelectedItem != null)
            {
                string status = cblStatus.SelectedItem.Value;
                arrStatus = status.Split(',');
            }
            string ComputerKind = "";
            if (ddlComputerKind.SelectedItem != null)
            {
                ComputerKind = ddlComputerKind.SelectedItem.Value;
            }
            StringBuilder strWhere = new StringBuilder();
            strWhere.Append(" 1=1 ");

            if (cbFlag.Checked)
            {
                strWhere.Append(" and  Flag='0' ");

            }
 
            if (CnName != "")
            {
                strWhere.Append(" and  CnName like '%" + CnName + "%' ");
            }
            if (ComputerKind != "" && ComputerKind != "--")
            {
                strWhere.Append(" and  ComputerKind = '" + ComputerKind + "' ");
            }
            if (arrStatus != null && arrStatus.Length > 0)
            {
               
                string strwhere1 = "";
                for (int i = 0; i < arrStatus.Length; i++)
                {
                   strwhere1+= " status='"+arrStatus [i].ToString ()+"' or " ;
                }
                if (strwhere1 != "")
                {
                    strwhere1=strwhere1.Substring(0, strwhere1.Length - 3);
                    strWhere.Append(" and (");
                    strWhere.Append(strwhere1);
                    strWhere.Append(" ) ");
                }
            }
            strWhere.Append("  order by status desc,id desc ");

            return strWhere.ToString();
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }



        //绑定范围时修改属性值
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {

            string CnName = "";
            string Flag = "";
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                Flag = DataBinder.Eval(e.Row.DataItem, "Flag").ToString();
                string url = "";
                if (Flag == "1")
                {
                    url = "view.aspx?mode=update&ID=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString() ;
                    e.Row.Cells[4].Text = "认证用户";
                }
                else
                {
                    url = "update.aspx?mode=update&ID=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString();
                    e.Row.Cells[4].Text = "非认证用户";
                }
                CnName = DataBinder.Eval(e.Row.DataItem, "CnName").ToString(); e.Row.Cells[1].Text.Trim();

                e.Row.Cells[1].Text = "<a href =" + url + "><font color=blue>" + CnName + "</font></a>";
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.Pub_ComputerKey bllck= new BLL.Pub_ComputerKey();
            Model.Pub_ComputerKey modelck = new SfSoft.Model.Pub_ComputerKey();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int ID1 = Common.Common.stringToInt(arrID[i].ToString());
                modelck = bllck.GetModel(ID1);
                if (modelck != null)
                {
                    modelck.Status = "已取消";
                    modelck.CancelDate = DateTime.Now;
                    modelck.Approval = Session["CnName"].ToString();
                    bllck.Update(modelck);
                }
  
            }
            BindData(GetWhere());
        }
    }
}


