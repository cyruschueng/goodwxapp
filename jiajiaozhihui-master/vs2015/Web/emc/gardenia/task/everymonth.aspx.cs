using SfSoft.SfEmc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.gardenia.task
{
    public partial class everymonth : SfSoft.SfEmc.EmcBasePage
    {
        private string _classId = "0";
        private Newtonsoft.Json.Linq.JObject _config;
        protected void Page_Load(object sender, EventArgs e)
        {
            _classId = Request.QueryString["classId"];
            ReadConfig();
            if (!IsPostBack)
            {

                InitDropDownList();
                BindData();
                BindEveryMonthData();
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
        private void InitDropDownList()
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            var list = bll.GetModelList("appid='"+ _config["habit"]["appId"].ToString() + "' and habit_classify="+ _config["habit"]["habitType"].ToString());
            foreach (var item in list)
            {
                ddlHabit.Items.Add(new ListItem()
                {
                    Text = item.title,
                    Value = item.id.ToString()
                });
            }
        }
        private void BindData()
        {
            BLL.wx_habit habitBll = new BLL.wx_habit();
            List<Model.wx_habit> habitList = new List<Model.wx_habit>();

            if (ddlHabit.SelectedItem != null && ddlHabit.SelectedValue != "")
            {
                habitList = habitBll.GetModelList("id=" + ddlHabit.SelectedValue);
            }
            else
            {
                habitList = habitBll.GetModelList("appid = '"+ _config["habit"]["appId"].ToString() + "' and habit_classify = "+ _config["habit"]["habitType"].ToString());
            }

            var taskList = GetEveryMonthData();

            var list = habitList.Where(e => !taskList.Exists(c => c.ForeignKey == e.id));

            var query = from m in list
                        select new
                        {
                            Id = m.id,
                            Name = m.title
                        };

            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = query.ToList();
            AspNetPager1.RecordCount = pds.Count;
            pds.AllowPaging = true;
            pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
            pds.PageSize = AspNetPager1.PageSize;
            GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
            this.GridView1.DataSource = pds;
            this.GridView1.DataBind();

        }
        protected void ddlHabit_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager2_PageChanged(object sender, EventArgs e)
        {
            BindEveryMonthData();
        }
        protected void btnAddTask_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            string[] arrID = ID.Split(',');
            AddEveryDayTask(arrID);
        }
        private void AddEveryDayTask(string[] ids)
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            for (var i = 0; i < ids.Length; i++)
            {
                var model = new Model.wx_gardenia_task()
                {
                    class_id = int.Parse(_classId),
                    create_date = DateTime.Now,
                    data_type = "everymonth",
                    is_act = 1,
                    year=DateTime.Now.Year,
                    data = Newtonsoft.Json.JsonConvert.SerializeObject(new
                    {
                        foreignKey = ids[i],
                        appId= _config["habit"]["appId"].ToString(),
                        habitType= _config["habit"]["habitType"].ToString(),
                        remark = "来自表wx_habit的主键Id"
                    }),
                };
                bll.Add(model);
            }
            BindData();
        }
        private List<dynamic> GetEveryMonthData()
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list = bll.GetModelList("class_id=" + _classId + " and data_type='everymonth'");
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
        private void BindEveryMonthData()
        {
            var list = GetEveryMonthData();
            BLL.wx_habit habitBll = new BLL.wx_habit();
            List<Model.wx_habit> habitList = habitBll.GetModelList("");
            var query = from e in list
                        join a in habitList on e.ForeignKey equals a.id
                        orderby e.StartUp ascending, e.Id ascending
                        select new { Id = e.Id, Name = a.title, StartUpDate = e.StartUp };


            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = query.ToList();
            AspNetPager2.RecordCount = pds.Count;
            pds.AllowPaging = true;
            pds.CurrentPageIndex = AspNetPager2.CurrentPageIndex - 1;
            pds.PageSize = AspNetPager2.PageSize;
            GridView2.PageIndex = AspNetPager2.CurrentPageIndex - 1;
            this.GridView2.DataSource = pds;
            this.GridView2.DataBind();

        }

        protected void GridView2_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView2.DataKeys[e.RowIndex].Value.ToString());
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            bll.Delete(RefID);
            BindEveryMonthData();
        }

        protected void GridView2_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView2.EditIndex = -1;
            BindEveryMonthData();
        }

        protected void GridView2_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView2.DataKeys[e.RowIndex].Value.ToString());
            TextBox txtStartUpDate = (TextBox)(GridView2.Rows[e.RowIndex].FindControl("txtStartUpDate"));

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
            GridView2.EditIndex = -1;
            BindEveryMonthData();
        }

        protected void GridView2_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView2.EditIndex = e.NewEditIndex;
            BindEveryMonthData();
        }

        protected void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    LinkButton temp = e.Row.Cells[4].Controls[2] as LinkButton;
                    temp.Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[2].Text + "\"吗?')");
                }
                if (e.Row.RowState == DataControlRowState.Edit)
                {
                    //TextBox txtStartUpDate = (TextBox)e.Row.Cells[3].FindControl("txtStartUpDate");
                    //txtStartUpDate.Attributes.Add("onfocus", "javascript:WdatePicker({isShowWeek:true,onpicked:function(){$dp.$('" + txtStartUpDate.ClientID + "').value=$dp.cal.getP('W','W');},errDealMode:3})");
                }
            }
        }
        /// <summary>
        /// 读起配置文件 
        /// </summary>
        private void ReadConfig()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/emc/gardenia/task.json");
            _config = App.Helper.FileHelper.getJson(path);
        }
    }
}