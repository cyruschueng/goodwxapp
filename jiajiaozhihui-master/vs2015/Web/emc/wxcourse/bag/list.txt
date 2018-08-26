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
using System.Collections.Generic;
namespace SfSoft.web.emc.wxcourse.bag
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                string mediaType = Request.Params["mediaType"].Trim();
                hfMediaType.Value = mediaType;
                hfClassID.Value = ClassID;
                BindData(GetWhere());
                BindCourse();
            }
            SetTabName(hfClassID.Value);
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.section";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.wxcourse.section.browse");
        }

        private void SetTabName(string code)
        {
            BLL.WX_Course_SetBag bllBdc = new BLL.WX_Course_SetBag();
            DataSet ds = bllBdc.GetList("id=" + code + "");
            string tabname = "基础数据列表";
            if (ds != null && ds.Tables[0]!=null && ds.Tables[0].Rows.Count>0)
            {
                tabname = "[" + ds.Tables[0].Rows[0].Field<string>("BagName") + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            string sql = "select * from (" +
                " select a.*,b.RefValue as BagName,c.Name as CourseName from WX_Course_Bag a" +
                " left join (select * from  Pub_BaseData where RefObj='weixin.wxcourse.bag' ) b on a.BagId=b.RefValueCode" +
                " left join WX_Course c on a.CourseId=c.Id" +
                ")a where " + strWhere;
            DataSet dsbd = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();
        }

        private string GetWhere()
        {
            return " BagId='" + hfClassID.Value + "'";
        }
        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_Course_Bag bllbd = new BLL.WX_Course_Bag();
            
            string bagId= GridView1.DataKeys[e.RowIndex].Values[0].ToString();
            string  courseId = GridView1.DataKeys[e.RowIndex].Values[1].ToString();
            bllbd.Delete(bagId, int.Parse(courseId) );
            Action<string, int> update = UpdateCourseBag;
            update.BeginInvoke("del", int.Parse(courseId),null,null);
            BindData(GetWhere());
        }
        private void UpdateCourseBag(string mode,int courseId)
        {
            try
            {
                BLL.WX_Course bll = new BLL.WX_Course();
                var model = bll.GetModel(courseId);
                if (mode == "add")
                {
                    model.IsBags = 1;
                    bll.Update(model);
                }
                else if (mode == "del")
                {
                    model.IsBags = 0;
                    bll.Update(model);
                }
            }
            catch (Exception ex) { 
            
            }
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {
            
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[3].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[1].Text + "\"吗?')");
                }
            }
        }
        protected void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
        
        }
        private Boolean CheckCodes(string sectionId)
        {
            BLL.WX_Course_Section bllbd = new BLL.WX_Course_Section();
            string strWhere = " SectionId = '" + sectionId + "' and ClassifyId='" + hfClassID.Value + "'";
            DataSet dsbd = bllbd.GetList(strWhere);
            if (dsbd.Tables[0].Rows.Count > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        private void BindCourse()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            DataSet ds = bll.GetList("SaleState=1 and LearnState=1 and isnull(IsBags,0)=0");
            //DataSet ds = bll.GetList("SaleState=1 and LearnState=1 and isnull(IsBags,0)=0 and MediaType=" + hfMediaType.Value);
            GridView2.DataSource = ds;
            GridView2.DataBind();
        }

        protected void btnOK_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView2, 0, true);
            if (ID == "")
            {
                return;
            }
            string[] arrID = ID.Split(',');
            BLL.WX_Course_Bag bll = new BLL.WX_Course_Bag();
            List<Model.WX_Course_Bag> list = bll.GetModelList("BagId='" + hfClassID.Value + "'");
            for (int i = 0; i < arrID.Length; i++) {
                bool isExist = list.Exists(m => m.BagId == hfClassID.Value && m.CourseId ==int.Parse(arrID[i]));
                if (!isExist) {
                    Model.WX_Course_Bag model = new Model.WX_Course_Bag();
                    model.BagId = hfClassID.Value;
                    model.CourseId =int.Parse(arrID[i]);
                    model.CreateDate = DateTime.Now;
                    Action<string, int> update = UpdateCourseBag;
                    update.BeginInvoke("add", model.CourseId, null, null);
                    bll.Add(model);
                }
            }
            BindData(GetWhere());
        }
    }
}


