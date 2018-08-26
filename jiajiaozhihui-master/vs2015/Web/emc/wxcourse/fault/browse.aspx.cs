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
namespace SfSoft.web.emc.wxcourse.fault
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
            hfMID.Value = "emc.wxcourse.fault";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        private void BindData(string strWhere)
        {
            BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
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
            string strWhere = "1=1 ";
            if (txtCardId.Text != "")
            {
                strWhere += " and CardId="+txtCardId.Text;
            }
            if (txtCardNo.Text != "")
            {
                strWhere += " and CardNo like '%"+txtCardNo.Text+"%'";
            }
            if (rbState.SelectedItem!=null && rbState.SelectedValue!="")
            {
                strWhere += " and isnull(IsAgree,0)=" +rbState.SelectedValue ;
            }
            return strWhere;
        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow )
            {
                BLL.WX_UserInfo bll=new BLL.WX_UserInfo();
                var model= bll.GetModel(e.Row.Cells[5].Text);
                if (model != null) {
                    e.Row.Cells[5].Text = model.NickName + "(" + e.Row.Cells[5].Text + ")";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            var name = e.CommandName;
            var arguments= e.CommandArgument.ToString();
            var id =Convert.ToInt32(arguments);

            if (name != "name1") {
                BLL.WX_Course_Card_Detail_Error bll = new BLL.WX_Course_Card_Detail_Error();
                var model= bll.GetModel(id);
                model.IsAgree = 1;
                model.AgreeDate = DateTime.Now;
                bll.Update(model);
                Action<int,string,int,int > action = (a,b,c,d) =>
                {
                    SfSoft.web.Course.Helper.ActiveTheCardProvide.SetCardInvalid(c,d);
                    SfSoft.web.Course.Helper.ActiveTheCardProvide.CreateOrder(a,b);
                    SfSoft.web.Course.Helper.TemplateProvide provide = new SfSoft.web.Course.Helper.TemplateProvide();
                    provide.MessageNotifyToUser(model.OpenId, 2, "http://courses.jiajiaozhihui.cn/link/parents_course.html");
                };
                action.BeginInvoke(model.CardType,model.OpenId,model.CardId,id,null,null);
                BindData(GetWhere());
            }
        }
    }
}


