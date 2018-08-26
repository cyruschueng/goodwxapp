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
using System.Text;
using SfSoft.DBUtility;
namespace SfSoft.web.emc.material.reply
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitData();
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
            hfMID.Value = "emc.material.reply";
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
            BLL.WX_MessageReply bll = new BLL.WX_MessageReply();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_MessageReply modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.refvalue as MsgTypeText from dbo.WX_MessageReply a ");
            sb.Append("left join (select * from Pub_BaseData where refobj='emc.material.reply.msgtype') b on a.MsgType=b.refvaluecode ");
            sb.Append( " where "+strWhere);
            DataSet ds=DbHelperSQL.Query(sb.ToString());
            
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
        //protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        //{
        //    GridView1.PageIndex = e.NewPageIndex;
        //    BindData(GetWhere());
        //}
        private string GetWhere()
        {
            string strWhere = "";
            string keyword = txtKeyWord.Text.Trim();
            string msgtype = "";
            if (ddlMsgType.SelectedItem != null) {
                msgtype = ddlMsgType.SelectedValue;
            }
            string title = txtTitle.Text.Trim();
            strWhere = "1=1";
            if (keyword != "") {
                strWhere += " and (KeyWord like '%"+keyword+"%' or Tags like '%"+keyword+"%')";
            }
            if (msgtype != "")
            {
                strWhere += " and MsgType='" + msgtype + "'";
            }
            if (title != "") {
                strWhere += " and title like '%" + title + "%'";
            }
            if (ddlApp.SelectedItem != null && ddlApp.SelectedValue != "") {
                strWhere += " and AppId='" + ddlApp.SelectedValue + "'";
            }
            strWhere += " order by keyword,[order] ";
            return strWhere;
        }


        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value.ToString() + "&mode=update";
                e.Row.Cells[3].Text = "<a href=" + url + "><font color=#2828FF>" + e.Row.Cells[3].Text + "</font></a>";
            }
        }

        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void InitData()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='emc.material.reply.msgtype'");
            EmcCommon.SetBaseDataDropDownList(ddlMsgType, "emc.material.reply.msgtype", ds);
            ListItem li = new ListItem();
            li.Text = "";
            li.Value = "";
            ddlMsgType.Items.Insert(0, li);
        }

        protected void btnSearch_Click1(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            TextBox txtOrder = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtOrder"));
            TextBox txtTags = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtTags"));

            Model.WX_MessageReply model = new Model.WX_MessageReply();
            BLL.WX_MessageReply bll = new BLL.WX_MessageReply();
            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (txtOrder.Text != "")
                {
                    model.Order = int.Parse(txtOrder.Text);
                }
                if (txtTags.Text != "") {
                    model.Tags = txtTags.Text;
                }
            }
            bll.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
    }
}


