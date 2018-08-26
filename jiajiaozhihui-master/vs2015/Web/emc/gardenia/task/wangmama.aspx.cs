using SfSoft.SfEmc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.gardenia.task
{
    public partial class wangmama : SfSoft.SfEmc.EmcBasePage
    {
        private Newtonsoft.Json.Linq.JObject _config;
        private string _classId = "0";
        protected void Page_Load(object sender, EventArgs e)
        {
            ReadConfig();
            _classId = Request.QueryString["classId"];
            if (!IsPostBack)
            {
                BindData();
                BindEveryWeekData();
            }

        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.gardenia.task";
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
        
        protected void btnAddTask_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            string[] arrID = ID.Split(',');
            AddEveryWeekTask(arrID);
        }
        protected void ddlTheme_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager3_PageChanged(object sender, EventArgs e)
        {
            BindEveryWeekData();
        }
        private void AddEveryWeekTask(string[] ids)
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            for (var i = 0; i < ids.Length; i++)
            {
                var model = new Model.wx_gardenia_task()
                {
                    class_id = int.Parse(_classId),
                    create_date = DateTime.Now,
                    data_type = "wangmama",
                    is_act = 1,
                    year=DateTime.Now.Year,
                    data = Newtonsoft.Json.JsonConvert.SerializeObject(new
                    {
                        foreignKey = ids[i],
                        remark = "来自表WX_Course的主键Id"
                    }),
                };
                bll.Add(model);
            }
            BindData();
        }
        private void BindData()
        {
            BLL.WX_Course courseBll = new BLL.WX_Course();
            List<Model.WX_Course> courseList = new List<Model.WX_Course>();


            courseList = courseBll.GetModelList("Theme=14 and courseType=3");
            

            var taskList = GetEveryWeekData();

            var list = courseList.Where(e => !taskList.Exists(c => c.ForeignKey == e.Id));

            var query = (from m in list
                         select new
                         {
                             Id = m.Id,
                             Name = m.Name,
                         }).ToList();
            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = query;
            AspNetPager1.RecordCount = pds.Count;
            pds.AllowPaging = true;
            pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
            pds.PageSize = AspNetPager1.PageSize;
            GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
            this.GridView1.DataSource = pds;
            this.GridView1.DataBind();

        }
        private void BindEveryWeekData()
        {
            var list = GetEveryWeekData();
            BLL.WX_Course courseBll = new BLL.WX_Course();
            List<Model.WX_Course> audioList = courseBll.GetModelList("");
            var query = from e in list
                        join a in audioList on e.ForeignKey equals a.Id
                        orderby e.StartUp ascending, e.Id ascending
                        select new { Id = e.Id, Name = a.Name, Year=e.Year, StartUpDate = e.StartUp };


            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = query.ToList();
            AspNetPager3.RecordCount = pds.Count;
            pds.AllowPaging = true;
            pds.CurrentPageIndex = AspNetPager3.CurrentPageIndex - 1;
            pds.PageSize = AspNetPager3.PageSize;
            GridView3.PageIndex = AspNetPager3.CurrentPageIndex - 1;
            this.GridView3.DataSource = pds;
            this.GridView3.DataBind();

        }
        /// <summary>
        /// 读起配置文件 
        /// </summary>
        private void ReadConfig()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/emc/gardenia/task.json");
            _config = App.Helper.FileHelper.getJson(path);
        }
        private List<dynamic> GetEveryWeekData()
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list = bll.GetModelList("class_id=" + _classId + " and data_type='wangmama'");
            List<dynamic> results = new List<dynamic>();
            foreach (var item in list)
            {
                var data = Newtonsoft.Json.Linq.JObject.Parse(item.data);
                int id = 0;
                bool valid = int.TryParse(data["foreignKey"].ToString(), out id);
                if (valid) results.Add(new
                {
                    Id = item.id,
                    ClassId = item.class_id,
                    ForeignKey = id,
                    Year=item.year,
                    StartUp = item.startup,
                    IsAct = item.is_act
                });
            }
            return results;
        }

        protected void GridView3_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    LinkButton temp = e.Row.Cells[4].Controls[2] as LinkButton;
                    temp.Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[2].Text + "\"吗?')");
                }
            }
        }

        protected void GridView3_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView3.DataKeys[e.RowIndex].Value.ToString());
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            bll.Delete(RefID);
            BindEveryWeekData();
        }

        protected void GridView3_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView3.DataKeys[e.RowIndex].Value.ToString());

            TextBox txtStartUpDate = (TextBox)(GridView3.Rows[e.RowIndex].FindControl("txtStartUpDate"));

            Model.wx_gardenia_task model = new Model.wx_gardenia_task();
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();

            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (txtStartUpDate.Text != "")
                {
                    model.startup = txtStartUpDate.Text;
                }
            }
            bll.Update(model);
            GridView3.EditIndex = -1;
            BindEveryWeekData();
        }

        protected void GridView3_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView3.EditIndex = e.NewEditIndex;
            BindEveryWeekData();
        }

        protected void GridView3_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView3.EditIndex = -1;
            BindEveryWeekData();
        }
    }
}