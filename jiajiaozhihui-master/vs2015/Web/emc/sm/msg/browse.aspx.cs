using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using SfSoft.DBUtility;
using System.IO;
using SfSoft.Common;
using Microsoft.Office.Interop.Excel;
using System.Text;

namespace SfSoft.web.emc.sm.msg
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hfMID.Value = "emc.sm.msg";
                BindData();
            }
        }
        protected override void VtInitOthersToolbars()
        {
            tsbtnDelete.Visible = true; ;
            tsbtnNew.Enabled = CheckButtonAccess("emc.sm.msg.mgt");
            tsbtnDelete.Enabled = tsbtnNew.Enabled;
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.msg";
        }
        //页面权限
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.msg.browse");
        }
         
        private void BindData()
        {
            BLL.Emc_Msg_Interface bll = new BLL.Emc_Msg_Interface();
            DataSet pdt = bll.GetList(" isdefault <> 4 ");
            Common.SetEmptyGridView.GridViewDataBind(GridView1, pdt.Tables[0]);
        }
        protected void btn_search_Click(object sender, EventArgs e)
        {
            BindData();
        }
        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData();
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            string Topic = "";
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                Topic = e.Row.Cells[1].Text.Trim();
                string url = "update.aspx?mode=update&ID=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString();
                e.Row.Cells[1].Text = "<a href =" + url + "><font color=#2828FF>" + Topic + "</font></a>";
                if (e.Row.Cells[5].Text == "1")
                {
                    e.Row.Cells[5].Text = "是";
                }
                else if (e.Row.Cells[5].Text == "0")
                {
                    e.Row.Cells[5].Text = "否";
                } 
            }
        }
        protected override void VtDelete()
        {
            string id = SfSoft.SfEmc.EmcCommon.GetCheckedDataKey(GridView1, 0,false);
            if (id == "")
            {
                return;
            }
            BLL.Emc_Msg_Interface bll = new BLL.Emc_Msg_Interface();
            bll.updatestatus(int.Parse(id));
            BindData();
        } 
    }
}

