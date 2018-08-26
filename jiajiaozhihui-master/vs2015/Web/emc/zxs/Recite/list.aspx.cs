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
using SfSoft.DBUtility;
namespace SfSoft.web.emc.zxs.recite
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string appId = Request.Params["AppId"].Trim();
                string themeId = Request.Params["ThemId"].Trim();
                hfAppId.Value = appId;
                hfThemeId.Value = themeId;
                BindData(GetWhere());
            }
            SetTabName();
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.zxs.theme";
        }
        protected override void VtPageAccess()
        {
            //CheckPageAccess("emc.zxs.theme.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_ZXS_Theme bllBdc = new BLL.WX_ZXS_Theme();
            DataSet dsbdc = bllBdc.GetList(" Id='" + hfThemeId.Value + "' ");
            string tabname = "任务";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["Title"].ToString() +  tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            string sql = "select * from (" +
                " select a.*,b.Title as ThemeTitle,c.Title as TaskTitle,d.NickName,e.Telephone as Mobile,e.PlayerType from WX_ZXS_ApplyRecite a" +
                " left join dbo.WX_ZXS_Theme b on a.ThemeId=b.Id" +
                " left join WX_ZXS_Task c on a.TaskId=c.Id" +
                " left join WX_UserInfo d on a.OpenId=d.OpenId" +
                " left join WX_ZXS_Players e on a.AppId=e.appId and a.OpenId=e.OpenId"+
                ")a where "+strWhere;
            DataSet dsbd = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();
        }

        private string GetWhere()
        {
            string strWhere = "1=1 and themeId="+hfThemeId.Value;
            if (txtNickName.Text.Trim() != "") {
                strWhere += " and NickName like '%" + txtNickName.Text.Trim() + "%'";
            }
            if (txtPhone.Text.Trim() != "") {
                strWhere += " and Mobile='" + txtPhone.Text.Trim() + "'";
            }
            if (rblState.SelectedItem != null && rblState.SelectedValue != "") {
                strWhere += " and State="+rblState.SelectedValue;
            }
            if (rblPlayerType.SelectedItem != null && rblPlayerType.SelectedValue != "") {
                strWhere += " and PlayerType=" + rblPlayerType.SelectedValue;
            }
            return strWhere;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_ZXS_ApplyRecite modelbd = new Model.WX_ZXS_ApplyRecite();
            BLL.WX_ZXS_ApplyRecite bllBd = new BLL.WX_ZXS_ApplyRecite();

            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            DropDownList ddlState = (DropDownList)GridView1.Rows[e.RowIndex].FindControl("ddlState");
            if(ddlState.SelectedItem!=null){
                modelbd.State =int.Parse(ddlState.SelectedValue);
            }
            modelbd.CheckDate = DateTime.Now;
            modelbd.Checker = Session["CnName"].ToString();
            bllBd.Update(modelbd);

            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        //取消
        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Edit)
                {
                    DropDownList ddlState = (DropDownList)e.Row.FindControl("ddlState");
                    HiddenField hf = (HiddenField)e.Row.FindControl("hfState");
                    if (hf.Value != "")
                    {
                        ddlState.Items.FindByValue(hf.Value).Selected = true;
                    }
                }
            }
           
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        public string StateText(string state)
        {
            string result = "";
            switch (state) { 
                case "0":
                    result = "申请";
                    break;
                case "1":
                    result = "通过";
                    break;
                case "2":
                    result="未通过";
                    break;
                default:
                    result="";
                    break;
            }
            return result;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
    }
}


