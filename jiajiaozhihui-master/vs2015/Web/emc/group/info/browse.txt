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
namespace SfSoft.web.emc.group.info
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        private Dictionary<string, string> GroupTypeDictionary = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetGroupType();
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
            hfMID.Value = "emc.group.info";
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
            BLL.WX_Course bll = new BLL.WX_Course();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Course modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_Group_Info bll = new BLL.WX_Group_Info();
            DataSet ds = bll.GetList(strWhere);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
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
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1";
            if (this.txtCoding.Text != "") {
                strWhere += " and coding='"+txtCoding.Text+"'";
            }
            if (this.txtName.Text != "") {
                strWhere += " and name='"+txtName.Text+"'";
            }
            if (this.ddlType.SelectedItem != null && this.ddlType.SelectedValue != "") {
                strWhere += " and type="+ddlType.SelectedValue+"";
            }
            if (rblCheck.SelectedItem != null && rblCheck.SelectedValue != "") {
                strWhere += " and check="+rblCheck.SelectedValue;
            }
            if (rblPremium.SelectedItem != null && rblPremium.SelectedValue != "") {
                strWhere += " and IsPremium="+rblPremium.SelectedValue;
            }
            strWhere += " order by Id desc";
            return strWhere;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                RowIndex = GridView1.DataKeys[e.Row.RowIndex].Value.ToString();
                string url = "update.aspx?ID=" + RowIndex + "&mode=update";
                string name = e.Row.Cells[2].Text.Length > 10 ? e.Row.Cells[2].Text.Substring(0, 10) + "..." : e.Row.Cells[2].Text;
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";
                if (GroupTypeDictionary.ContainsKey(e.Row.Cells[3].Text)) {
                    e.Row.Cells[3].Text = GroupTypeDictionary[e.Row.Cells[3].Text];
                }
                if (e.Row.Cells[6].Text == "0") {
                    e.Row.Cells[6].Text = "免审";
                }
                else if (e.Row.Cells[6].Text == "1") {
                    e.Row.Cells[6].Text = "审核";
                }
                if (e.Row.Cells[7].Text == "0")
                {
                    e.Row.Cells[7].Text = "免费";
                }
                else if (e.Row.Cells[7].Text == "1")
                {
                    e.Row.Cells[7].Text = "收费";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void GetGroupType()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("RefObj='weixin.group.type'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    dic.Add(dr["RefValueCode"].ToString(), dr["RefValue"].ToString());
                    ddlType.Items.Add(new ListItem() { Text = dr["RefValue"].ToString(), Value = dr["RefValueCode"].ToString() });
                }
            }
            ddlType.Items.Insert(0, new ListItem() { Text="",Value="" });
            GroupTypeDictionary = dic;
        }
        private string RowIndex { get; set; }
    }
}


