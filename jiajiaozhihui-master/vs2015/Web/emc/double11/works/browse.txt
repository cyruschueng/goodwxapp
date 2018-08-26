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
namespace SfSoft.web.emc.double11.works
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
            hfMID.Value = "emc.double11.works";
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
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Doublenovember_File modelMsn = bll.GetModel(id);
                modelMsn.IsAct = 0;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            StringBuilder sb=new StringBuilder();
            string openid="admin";
            if(Session["Email"]!=null && Session["Email"].ToString()!=""){
                openid=Session["Email"].ToString();
            }
            sb.Append(" select a.*, case when c.IsAlias=1 then c.Alias else b.NickName end as NickName ");
            sb.Append(" from dbo.WX_Doublenovember_File a");
            sb.Append(" left join (select distinct OpenID,NickName from dbo.WX_HomeCard) b on a.openid=b.openid");
            sb.Append(" left join dbo.WX_Doublenovember_Children c on a.openid=c.openid");
            sb.Append(" where "+strWhere);
            
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
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
            string strWhere = "a.openid<>'' ";
            if (txtNickName.Text != "") {
                strWhere += " and b.NickName= '"+txtNickName.Text+"'";
            }
            if (ddlStatus.SelectedItem != null && ddlStatus.SelectedValue != "") {
                strWhere += " and isnull(a.IsAct,1)="+ddlStatus.SelectedValue;
            }
            if (txtCreateDate.Text != "") {
                strWhere += " and datediff(dd,Create_Date,getdate())=0";
            }
            strWhere += "order by  a.id desc";
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
                //string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                //e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState==DataControlRowState.Alternate)
                {
                    Label lbIsAct = (Label)e.Row.Cells[3].FindControl("lbIsAct");
                    if (lbIsAct.Text == "0")
                    {
                        lbIsAct.Text = "违规";
                        lbIsAct.Attributes.CssStyle.Add("color", "#f00");
                    }
                    else
                    {
                        lbIsAct.Text = "正常";
                    }
                }
            }
            
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void btnSearch_Click1(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            DropDownList ddlIsAct = (DropDownList)GridView1.Rows[e.RowIndex].FindControl("ddlIsAct");

            Model.WX_Doublenovember_File model = new Model.WX_Doublenovember_File();
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "") {
                    model.IsAct =int.Parse(ddlIsAct.SelectedValue);
                }
            }
            bll.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }
        
        protected void btnLike_Click(object sender, EventArgs e)
        {
            Like();
        }
        private void Like()
        {
            if (Session["Email"] != null && Session["Email"].ToString() != "")
            {
                string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
                if (ID == "")
                {
                    return;
                }
                BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
                string[] arrID = ID.Split(',');
                string toOpenID = "";
                string fileID = "";
                for (int i = 0; i < arrID.Length; i++)
                {
                    int id = Common.Common.stringToInt(arrID[i].ToString());
                    Model.WX_Doublenovember_File modelMsn = bll.GetModel(id);
                    if (modelMsn != null)
                    {
                        if (IsLike(modelMsn.OpenID, Session["Email"].ToString(), modelMsn.ID.ToString()) == false) {
                            if (modelMsn.Like_Number != null)
                            {
                                modelMsn.Like_Number += 1;
                            }
                            else
                            {
                                modelMsn.Like_Number = 1;
                            }
                            bll.Update(modelMsn);
                            AddLike(modelMsn.ID, modelMsn.OpenID);
                        }
                    }
                }
                BindData(GetWhere());
            }
            else
            {
                MessageBox.Show(this, "你没有权操作");
            }
        }
        /// <summary>
        /// 每人只能点赞一次
        /// </summary>
        /// <param name="toOpenid"></param>
        /// <param name="fromOpenid"></param>
        /// <param name="fileID"></param>
        /// <returns></returns>
        private bool IsLike(string toOpenid,string fromOpenid,string fileID)
        {
            BLL.WX_Doublenovember_Like bll = new BLL.WX_Doublenovember_Like();
            DataSet ds = bll.GetList("FileID=" + fileID + " and To_OpenID='" + toOpenid + "' and From_OpenID='"+fromOpenid+"'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        private void AddLike(int? fileID,string toOpenID)
        {
            Model.WX_Doublenovember_Like model = new Model.WX_Doublenovember_Like();
            model.Create_Date = DateTime.Now;
            model.FileID = fileID;
            model.From_OpenID = Session["Email"].ToString();
            model.To_OpenID = toOpenID;
            BLL.WX_Doublenovember_Like bll = new BLL.WX_Doublenovember_Like();
            bll.Add(model);
        }
    }
}


