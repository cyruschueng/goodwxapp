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
namespace SfSoft.web.emc.sm.sysun
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage 
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                hfMID.Value = "emc.sm.sysun";
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
            hfMID.Value = "emc.sm.sysun";
        }

        private void BindData(string strWhere)
        {
            BLL.Pub_UnSystem bll = new BLL.Pub_UnSystem();
            DataSet ds = bll.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);

        }
        /// <summary>
        /// 初始化工具栏
        /// </summary>
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
            VtInitBaseListToolsBars();
            tsbtnNew.OnClientClick = "add_onClick();return false;";
        }

        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }

        private string GetWhere()
        {
            string strWhere = " Flag='sys' ";
            strWhere += "    order by OrderID";
            return strWhere;
        }
        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.Pub_UnSystem bll  = new SfSoft.BLL.Pub_UnSystem();

            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int ID1 = Common.Common.stringToInt(arrID[i].ToString());
                Model.Pub_UnSystem mode  = bll.GetModel(ID1);
                if (mode.SysIcon != "" || mode.SysIcon != null)
                {
                    FileUpLoadCommon.DeleteFile(mode.SysIcon);
                }
              
                bll .Delete(ID1);
            }
            BindData(GetWhere());
        }
 
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

                string url = "\"javascript:ShowIframe('详细页面','update.aspx?mode=update&ID=" + DataBinder.Eval(e.Row.DataItem, "ID").ToString() + "', '', '')\"";
                e.Row.Cells[2].Text = "<a href =" + url + "><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
                string IsAcT = DataBinder.Eval(e.Row.DataItem, "IsAcT").ToString();
                if (IsAcT == "1")
                {
                    e.Row.Cells[6].Text = "启用";
                }
                else
                {
                    e.Row.Cells[6].Text = "停用";
                }
                string SysType = DataBinder.Eval(e.Row.DataItem, "SysType").ToString();
                if (SysType == "file")
                {
                    e.Row.Cells[4].Text = "本地";
                }
                else
                {
                    e.Row.Cells[4].Text = "网址";
                }
            }
        }
    }
}

