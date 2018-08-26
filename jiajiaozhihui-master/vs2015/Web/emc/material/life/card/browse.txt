using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using SfSoft.DBUtility;

namespace SfSoft.web.emc.life.card
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                SetProvice();
                InitActor();
                InitGrade();
                BindData(GetWhere());
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.life.card";
        }
        protected override void VtInitToolbars()
        {
            //NewTsbtnNew();
            //phToolBars.Controls.Add(tsbtnNew);
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        private string GetWhere()
        {
            string strWhere = "1=1 ";

            string provice = ddlProvice.SelectedItem != null ? ddlProvice.SelectedValue : "";
            string city = ddlCity.SelectedItem != null ? ddlCity.SelectedValue : "";
            string address = txtAddress.Text.Trim();
            string nickname = txtNickName.Text.Trim();
            string name = txtName.Text.Trim();
            string sex = ddlSex.SelectedItem != null ? ddlSex.SelectedValue : "";

            if (provice != "") {
                strWhere += " and  Province='" + provice + "'";
            }
            if (city != "") {
                strWhere += " and City='" + city + "'";
            }
            if (address != "") {
                strWhere += " and Address like '%" + address + "%'";
            }
            if (name != "") {
                strWhere += " and [Name]='" + name + "'";
            }
            if (sex != "") {
                strWhere += " and Sex=" + sex  +"";
            }
            strWhere += " order by CreateDate desc ";

            return strWhere;
        }
        private DataSet DataSource(string where)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.areaname as provincename,c.areaname as cityname from dbo.WX_HomeCard a  ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=1) b on a.province=b.areaid ");
            sb.Append("left join (select * from dbo.Pub_Areas where areatype=2) c on a.city=c.areaid ");
            DataSet ds= DbHelperSQL.Query(sb.ToString());
            return ds;
        }
        private void BindData(string strWhere)
        {
            DataSet ds = DataSource(strWhere);
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
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        private void SetProvice()
        {
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds = bll.GetList("areatype=1");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                ddlProvice.DataTextField = "areaname";
                ddlProvice.DataValueField = "areaid";
                ddlProvice.DataSource = ds;
                ddlProvice.DataBind();
                ListItem li = new ListItem();
                li.Text = "";
                li.Value = "";
                ddlProvice.Items.Insert(0, li);
            }
        }
        protected void ddlProvice_SelectedIndexChanged(object sender, EventArgs e)
        {
            string areaid = ddlProvice.SelectedValue;
            if (areaid != "")
            {
                ddlCity.Items.Clear();
                BLL.Pub_Areas bll = new BLL.Pub_Areas();
                DataSet ds = bll.GetList("areatype=2 and pid=" + areaid);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    ddlCity.DataTextField = "areaname";
                    ddlCity.DataValueField = "areaid";
                    ddlCity.DataSource = ds;
                    ddlCity.DataBind();
                    ListItem li = new ListItem();
                    li.Text = "";
                    li.Value = "";
                    ddlCity.Items.Insert(0, li);
                }
            }
            else {
                ddlCity.Items.Clear();
            }
        }
        /// <summary>
        /// 会员等级
        /// </summary>
        private void InitActor()
        {
            BLL.WX_Grade bll = new BLL.WX_Grade();
            DataSet ds = bll.GetList("type=1");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                ddlActor.DataTextField = "Title";
                ddlActor.DataValueField = "Grade";
                ddlActor.DataSource = ds;
                ddlActor.DataBind();
                ListItem li = new ListItem();
                li.Text = "";
                li.Value = "";
                ddlActor.Items.Insert(0, li);
            }
        }
        /// <summary>
        /// 卡等级
        /// </summary>
        private void InitGrade()
        {
            BLL.WX_Grade bll = new BLL.WX_Grade();
            DataSet ds = bll.GetList("type=2");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                ddlGrade.DataTextField = "Title";
                ddlGrade.DataValueField = "Grade";
                ddlGrade.DataSource = ds;
                ddlGrade.DataBind();
                ListItem li = new ListItem();
                li.Text = "";
                li.Value = "";
                ddlGrade.Items.Insert(0, li);
            }
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow) { 
                if(e.Row.Cells[5].Text=="1"){
                    e.Row.Cells[5].Text = "男";
                }
                if (e.Row.Cells[5].Text == "2") {
                    e.Row.Cells[5].Text = "女";
                }

                
            }
        }

        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {

        }

        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {

        }
    }
}

