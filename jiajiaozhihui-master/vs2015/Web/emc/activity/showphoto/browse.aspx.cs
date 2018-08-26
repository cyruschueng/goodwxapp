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
namespace SfSoft.web.emc.activity.showphoto
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
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
            hfMID.Value = "emc.activity.showphoto";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            //NewTsbtnNew();
            //phToolBars.Controls.Add(tsbtnNew);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        
        private void BindData(string strWhere)
        {
            string sql = "select a.*,b.VoteNumber,c.AreaName as ProvinceName,d.AreaName as CityName from WX_ShowPhoto a ";
            sql += " left join (select ActivityID, OpenID,count(1) as VoteNumber from dbo.WX_Vote group by ActivityID,OpenID) b on a.ActivityID=b.ActivityID and a.OpenID=b.OpenID ";
            sql += " left join (select * from dbo.Pub_Areas where AreaType=1) c on a.province=c.AreaID";
            sql += " left join (select * from dbo.Pub_Areas where AreaType=2) d on a.city=d.AreaID";
            sql += " order by b.VoteNumber desc";
            
            DataSet ds = DbHelperSQL.Query(sql); 
            
            
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
            string strWhere = "1=1 ";
            return strWhere;
        }

        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                //string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                //e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";   

                //GridView gv = new GridView();
                //gv = (GridView)e.Row.FindControl("GridView2");
                //if (e.Row.Cells[3].Text.Replace("&nbsp;", "").Trim() != "")
                //{
                //    BLL.WX_Vote bllorder = new BLL.WX_Vote();
                //    DataSet pdt = bllorder.GetList(" ActivityID =" + DataBinder.Eval(e.Row.DataItem, "ActivityID").ToString() + " and OpenID='" + DataBinder.Eval(e.Row.DataItem, "OpenID").ToString() + "'");
                //    Common.SetEmptyGridView.GridViewDataBind(gv, pdt.Tables[0]);
                //}
                HiddenField hfIsSend = (HiddenField)e.Row.Cells[13].FindControl("hfIsSend");
                Label lblSend = (Label)e.Row.Cells[13].FindControl("lblSend");
                LinkButton linkbtnSend = (LinkButton)e.Row.Cells[13].FindControl("linkbtnSend");
                if (hfIsSend.Value == null || hfIsSend.Value == "")
                {
                    lblSend.Attributes.CssStyle.Add("display", "none");
                    linkbtnSend.Attributes.CssStyle.Add("display", "block");
                    linkbtnSend.Attributes.Add("OnClick", "return issend()");
                }
                else {
                    lblSend.Attributes.CssStyle.Add("display", "block");
                    linkbtnSend.Attributes.CssStyle.Add("display", "none");
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            string key = e.CommandArgument.ToString();
            string sql = "update WX_ShowPhoto set IsSend=1 where id=" + key;
            int row=DbHelperSQL.ExecuteSql(sql);
            if (row > 0) {
                BindData(GetWhere());
            }
        }
    }
}


