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
using SfSoft.SfEmc;
namespace SfSoft.web.emc.wxcourse.content
{
    public partial class list : SfSoft.SfEmc.EmcBrowseBasePage      //EmcBasePage
    {
        public  string SectionId="";
        public string SubSectionId = "";
        public string CourseId = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            SectionId = Request.QueryString["SectionId"];
            CourseId = Request.QueryString["CourseId"];
            hfSectionId.Value = SectionId;
            SubSectionId = Request.QueryString["SubSectionId"];
            if (!IsPostBack)
            {
                //SetTabName();
                BindData(GetWhere());
                tsbtnNew.OnClientClick = "document.location='update.aspx?state=add&sectionId=" + SectionId + "'; return false";
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
                
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.content";
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
            BLL.WX_Course_Content bll = new BLL.WX_Course_Content();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_Course_Content modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {

            string sql = "select * from ( select a.*,b.Name from WX_Course_Content a" +
                            " left join WX_Course b on a.CourseId=b.Id) a where " + strWhere;
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
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
            string strWhere = "1=1  and SectionId='" + hfSectionId.Value + "'";
            strWhere += " order by Sn ,Id";
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
                string url = "update.aspx?Id=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&state=update&courseId=" + CourseId + "&sectionId=" + SectionId ;
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[1].Text + "</font></a>";

                if (e.Row.Cells[2].Text == "1")
                {
                    e.Row.Cells[2].Text = "视频";
                }
                else if (e.Row.Cells[2].Text == "2")
                {
                    e.Row.Cells[2].Text = "语音";
                }
                else if (e.Row.Cells[2].Text == "3")
                {
                    e.Row.Cells[2].Text = "图片";
                }
                else if (e.Row.Cells[2].Text == "4")
                {
                    e.Row.Cells[2].Text = "文字";
                }

                if (e.Row.Cells[8].Text == "1")
                {
                    e.Row.Cells[8].Text = "已发布";
                }
                else if (e.Row.Cells[8].Text == "2")
                {
                    e.Row.Cells[8].Text = "未发布";
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        private string GetCaption(string id)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(id));
            if (model != null)
            {
                return model.Name;
            }
            return "";
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            /*
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.Cover != "" || modelArts.Cover != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.Cover);
                modelArts.Cover = "";
                bllArts.Update(modelArts);
                txtCover.Text = "";
                txtCover.Visible = false;
                btnDelPic.Visible = false;
            }
             * */
        }
        private void SetTabName()
        {
            BLL.WX_Course bllBdc = new BLL.WX_Course();
            Model.WX_Course model = bllBdc.GetModel(int.Parse(CourseId));
            string tabname = "";
            if (model != null)
            {
                tabname += model.Name;
                BLL.WX_Course_Section bll = new BLL.WX_Course_Section();
                var list = bll.GetModelList("ClassifyId=" + CourseId);
                var section = list.Find(e => e.Id == int.Parse(SectionId));
                if (section != null)
                {
                    tabname += "-" + section.SectionName;
                }
                section = list.Find(e => e.Id == int.Parse(SubSectionId));
                if (section != null)
                {
                    tabname += "-" + section.SectionName;
                }
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Course_Content modelbd = new Model.WX_Course_Content();
            BLL.WX_Course_Content bllBd = new BLL.WX_Course_Content();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            modelbd.Cname = ((TextBox)GridView1.Rows[e.RowIndex].Cells[3].Controls[0]).Text;
            int sn = 0;
            int.TryParse(((TextBox)GridView1.Rows[e.RowIndex].Cells[5].Controls[0]).Text, out sn);
            modelbd.Sn = sn;
            int duration = 0;
            int.TryParse(((TextBox)GridView1.Rows[e.RowIndex].Cells[6].Controls[0]).Text, out duration);
            modelbd.Duration = duration;
            int interval = 0;
            int.TryParse(((TextBox)GridView1.Rows[e.RowIndex].Cells[7].Controls[0]).Text, out interval);
            modelbd.Interval = interval;
            CheckBox cbAtOnceShow = ((CheckBox)GridView1.Rows[e.RowIndex].Cells[9].FindControl("cbAtOnceShow"));
            modelbd.AtOnceShow = cbAtOnceShow.Checked == true ? 1 : 0;

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
    }
}


