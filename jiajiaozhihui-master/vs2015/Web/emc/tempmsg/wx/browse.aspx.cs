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
using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json.Linq;
namespace SfSoft.web.emc.tempmsg.wx
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                InitDropDownList();
                BindData(GetWhere());
            }
            
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.tempmsg.wx.browse";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion

        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Template_Msg modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var list = bll.GetModelList(GetWhere());

            if (list != null && list.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = list;
                AspNetPager1.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager1.PageSize;
                GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                //Common.SetEmptyGridView.GridViewDataBind(GridView1, list);
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1 ";
            if (ddlTemp.SelectedItem != null && ddlTemp.SelectedValue != "") {
                strWhere += " and TempId='"+ddlTemp.SelectedValue+"'";
            }
            if (txtSendDate.Text != "") {
                strWhere += " and convert(varchar(10),SendDate,110)=convert(varchar(10),'" + txtSendDate.Text + "',110)";
            }
            if (rblIsSend.SelectedItem != null && rblIsSend.SelectedValue != "") {
                strWhere += " and isnull(IsSend,0)="+rblIsSend.SelectedValue;
            }
            if (rblIsAct.SelectedItem != null && rblIsAct.SelectedValue != "") {
                strWhere += " and isnull(IsAct,0)=" + rblIsAct.SelectedValue;
            }
            return strWhere;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        
        private void InitDropDownList()
        {
            string src = HttpContext.Current.Server.MapPath("~/emc/tempmsg/template/temp.json");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                JArray arr = JArray.Parse(json);
                foreach (var c in arr) {
                    ddlTemp.Items.Add(new ListItem {
                        Value = c["tempid"].ToString(),
                        Text = c["name"].ToString()
                    });
                }
                ddlTemp.Items.Insert(0, new ListItem { Text = "．．．请选择消息模版．．．", Value = "" });
            }
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                var index = GridView1.DataKeys[e.Row.RowIndex].Value.ToString();
                string url = "update.aspx?ID=" + index + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
            }
        }
    }
}


