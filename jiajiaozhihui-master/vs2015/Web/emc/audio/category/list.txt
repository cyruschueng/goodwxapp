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
namespace SfSoft.web.emc.audio.category
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {
        private string _pid = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            _pid = Request.Params["pid"].Trim();
            if (!IsPostBack)
            {
                BindData(GetWhere());
            }
            SetTabName();
        }

        

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.category";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.audio.category.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var model= bll.GetModel(int.Parse(_pid));
            if (model != null)
            {
                TabOptionItem1.Tab_Name = model.FullName;
            }
            else {
                TabOptionItem1.Tab_Name = "教材";
            }
        }

        private void BindData(string strWhere)
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();

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

        private string GetWhere()
        {
            if (!string.IsNullOrEmpty(_pid))
            {
                return "PId=" + _pid;   
            }
            else {
                return "PId=-1";
            }
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_Audio_Category bllbd = new BLL.WX_Audio_Category();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Audio_Category model = new Model.WX_Audio_Category();
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            model = bll.GetModel(RefID);


            model.FullName = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[1].Controls[0])).Text.ToString().Trim();
            model.ShortName =((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim();

            bll.Update(model);

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
                string url = "update.aspx?Id=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";

                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[4].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[1].Text + "\"吗?')");
                }
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            if (this.txtFullColumn.Text == "")
            {
                strErr += "长名称能为空！\\n";
            }
            if (this.txtShortColumn.Text == "")
            {
                strErr += "短名称能为空！\\n";
            }

            
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }

            Model.WX_Audio_Category model = new Model.WX_Audio_Category();
            model.AppId ="app001";
            model.FullName = txtFullColumn.Text;
            model.IsAct = cbColumnIsAct.Checked == true ? 1 : 0;
            model.Pid =string.IsNullOrEmpty(_pid)==true?0:int.Parse(_pid) ;
            model.ShortName = txtShortColumn.Text;

            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            bll.Add(model);

            txtFullColumn.Text="";
            txtShortColumn.Text = "";
            
            BindData(GetWhere());
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
    }
}


