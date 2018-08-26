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
using System.Web.Services;
using System.Collections.Generic;
namespace SfSoft.web.emc.wxcourse.mycourse
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                hfID.Value = Request.Params["openId"].ToString();

                hfMode.Value = mode;
                hfMID.Value = "emc.wxcourse.mycourse";
                //修改
                if (hfMode.Value == "update")
                {
                    DataBindCourse();
                    DataBindMyCourse();
                    DataBindCourseBag();
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.mycourse";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                
            }
        }
        protected new void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

            }
        }
        protected new void GridView3_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

            }
        }
        private string GetCourseBagName(string bag)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(bag));
            if (model != null) {
                return model.Name;
            }
            return "";
        }

        private void DataBindCourseBag()
        {
            string sql = "select * from dbo.Pub_BaseData where RefObj='weixin.wxcourse.bag'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                this.GridView2.DataSource = pds;
                this.GridView2.DataBind();
            }
            else
            {
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        private void DataBindCourse()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            DataSet ds = bll.GetList("SaleState=1 and LearnState=1");

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                this.GridView3.DataSource = pds;
                this.GridView3.DataBind();
            }
            else
            {
                Common.SetEmptyGridView.GridViewDataBind(GridView3, ds.Tables[0]);
            }
        }
        private void DataBindMyCourse()
        {
            string sql = "select * from (" +
                " select a.*,b.Name as CoursName,b.Duration,c.Name as LecturName from WX_Course_Personal a" +
                " left join WX_Course b on a.courseId=b.Id" +
                " left join dbo.WX_Course_Lecturer c on b.Lecturer=c.Id"+
                " )a where OpenId='" + hfID.Value + "'";

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        /*填加单课程*/
        protected void btnAddCourseOK_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView3, 0, true);
            if (ID == "")
            {
                return;
            }
            string[] arrID = ID.Split(',');
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            List<Model.WX_Course_Personal> list = bll.GetModelList("OpenId='" + hfID.Value + "'");
            for (int i = 0; i < arrID.Length; i++)
            {
                bool isExist = list.Exists(m => m.OpenId == hfID.Value && m.CourseId == int.Parse(arrID[i]));
                if (!isExist)
                {
                    Model.WX_Course_Personal model = new Model.WX_Course_Personal();
                    model.CourseId = int.Parse(arrID[i]);
                    model.CurrSection = null;
                    model.IsDele = 0;
                    model.LastDateTime = DateTime.Now;
                    model.OpenId = hfID.Value;
                    model.Tiem = 0;
                    bll.Add(model);
                }
            }
            DataBindMyCourse();
        }
        /*填加课程包*/
        protected void btnAddCourseBagOK_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView2, 0, true);
            if (ID == "")
            {
                return;
            }
            string[] arrID = ID.Split(',');

            for (int i = 0; i < arrID.Length; i++) {
                AddCourse(arrID[i]);
            }
            DataBindMyCourse();
        }

        private void AddCourse(string  bagId)
        {
            BLL.WX_Course_Personal bllPersonal = new BLL.WX_Course_Personal();
            List<Model.WX_Course_Personal> listPersonal = bllPersonal.GetModelList("OpenId='" + hfID.Value + "'");

            BLL.WX_Course_Bag bll = new BLL.WX_Course_Bag();
            var list = bll.GetModelList("BagId='"+bagId+"'");
            foreach (var m in list) {
                bool isExist = listPersonal.Exists(c => c.OpenId == hfID.Value && c.CourseId == m.CourseId);
                if (!isExist)
                {
                    Model.WX_Course_Personal model = new Model.WX_Course_Personal();
                    model.CourseId = m.CourseId;
                    model.CurrSection = null;
                    model.IsDele = 0;
                    model.LastDateTime = DateTime.Now;
                    model.OpenId = hfID.Value;
                    model.Tiem = 0;
                    bllPersonal.Add(model);
                }
            }
        }
    }
}


