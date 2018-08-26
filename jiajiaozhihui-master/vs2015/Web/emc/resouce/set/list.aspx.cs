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
namespace SfSoft.web.emc.resouce.set
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                hfClassID.Value = ClassID;

                BindData(GetWhere());
            }
            SetTabName();

        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s7";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s7.browse");
        }
 
        private void SetTabName()
        {
            BLL.Pub_BaseData_Classc bllBdc = new BLL.Pub_BaseData_Classc();
            DataSet dsbdc = bllBdc.GetList(" ClassID='" + hfClassID.Value + "'");
            string tabname = "基础数据列表";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["ClassName"].ToString() + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.wx_source bllBd = new BLL.wx_source();

            DataSet dsbd = bllBd.GetList(strWhere);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();
        }

        private string GetWhere()
        {
            return " ";

        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        //protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        //{
        //    var title = GridView1.Rows[e.RowIndex].Cells[1].Text;
        //    var id= GridView1.Rows[e.RowIndex].Cells[0].Text;
        //    var run= "<script>javascript: onclick = parent.parent.addTab('"+ title + "', '/emc/resouce/set/source_list.aspx?ClassID=" + id+"&mode=update', 'subNav');</script>";
        //    Response.Write(run);
        //}

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.wx_source modelbd = new Model.wx_source();
            BLL.wx_source bllBd = new BLL.wx_source();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            modelbd.title = ((TextBox)GridView1.Rows[e.RowIndex].FindControl("txtTitle")).Text.ToString().Trim();
            
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
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate) {
                    var title = ((HiddenField)e.Row.Cells[1].FindControl("txtHfBucketTitle")).Value;
                    var id = e.Row.Cells[0].Text;
                    ((HyperLink)e.Row.Cells[3].FindControl("HyperLink1")).NavigateUrl = "javascript: onclick = parent.parent.addTab('" + title + "', '/emc/resouce/set/source_list.aspx?ClassID=" + id + "&mode=update', 'subNav')";
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            if (this.txtTitle.Text == "")
            {
                strErr += "Bucket名称不能为空！\\n";
            }

            

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            


            Model.wx_source model = new Model.wx_source();
            model.title = txtTitle.Text.Trim();
            BLL.wx_source bll = new BLL.wx_source();
            bll.Add(model);

            this.txtTitle.Text = "";
            BindData(GetWhere());
        }

        
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }

        protected void GridView1_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
        {
            
        }
    }
}


