using SfSoft.SfEmc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.gardenia.task
{
    public partial class everyday : SfSoft.SfEmc.EmcBasePage
    {
        private string _classId ="0";
        protected void Page_Load(object sender, EventArgs e)
        {
            _classId = Request.QueryString["classId"];
            if (!IsPostBack) {
                
                InitDropDownList();
                BindData();
                BindEveryDayData();
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
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list= bll.GetModelList("");
            foreach (var item in list) {
                ddlCategoryId.Items.Add(new ListItem() {
                    Text=item.FullName,
                    Value=item.Id.ToString()
                });
            }
        }
        private void BindData()
        {
            BLL.WX_Audio audioBll = new BLL.WX_Audio();
            List<Model.WX_Audio> audioList = new List<Model.WX_Audio>();

            BLL.WX_Audio_Category categoryBll = new BLL.WX_Audio_Category();
            List<Model.WX_Audio_Category> categoryList = new List<Model.WX_Audio_Category>();

            if (ddlCategoryId.SelectedItem != null && ddlCategoryId.SelectedValue != "")
            {
                audioList = audioBll.GetModelList("categoryId="+ddlCategoryId.SelectedValue);
                categoryList = categoryBll.GetModelList("Id="+ddlCategoryId.SelectedValue);
            }
            else {
                audioList = audioBll.GetModelList("");
                categoryList = categoryBll.GetModelList("");
            }

            var taskList= GetEveryDayData();

            var list= audioList.Where(e => !taskList.Exists(c => c.ForeignKey == e.Id));

            var query = (from m in list
                        join c in categoryList on m.CategoryId equals c.Id
                        select new {
                            Id = m.Id,
                            CategoryId = m.CategoryId,
                            FullName = m.FullName,
                            SoundSource = m.SoundSource,
                            CategoryName = c.FullName,
                            CategoryImgUrl = c.MiniImgUrl }).ToList();



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
        protected void ddlCategoryId_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager2_PageChanged(object sender, EventArgs e)
        {
            BindEveryDayData();
        }
        protected void btnAddTask_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_Audio bll = new BLL.WX_Audio();
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
                    data_type = "everydata",
                    is_act = 1,
                    year=DateTime.Now.Year,
                    data = Newtonsoft.Json.JsonConvert.SerializeObject(new
                    {
                        foreignKey = ids[i],
                        remark = "来自表WX_Audio的主键Id"
                    }),
                };
                bll.Add(model);
            }
            BindData();
        }
        private List<dynamic> GetEveryDayData()
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list = bll.GetModelList("class_id=" + _classId + " and data_type='everydata'");
            List<dynamic> results = new List<dynamic>();
            foreach (var item in list) {
                var data= Newtonsoft.Json.Linq.JObject.Parse(item.data);
                int id = 0;
                bool valid= int.TryParse(data["foreignKey"].ToString(), out id);
                if(valid) results.Add(new {
                    Id=item.id,
                    ClassId=item.class_id,
                    ForeignKey=id,
                    StartUp=item.startup,
                    IsAct=item.is_act
                });
            }
            return results;
        }
        private void BindEveryDayData()
        {
            var list = GetEveryDayData();
            BLL.WX_Audio audioBll = new BLL.WX_Audio();
            List<Model.WX_Audio> audioList = audioBll.GetModelList("");
            var query = from e in list
                        join a in audioList on e.ForeignKey equals a.Id
                        orderby e.StartUp ascending,e.Id ascending
                        select new { Id = e.Id, Name = a.FullName, StartUpDate = e.StartUp };


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
            BindEveryDayData();
        }

        protected void GridView2_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView2.EditIndex = -1;
            BindEveryDayData();
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
            BindEveryDayData();
        }

        protected void GridView2_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView2.EditIndex = e.NewEditIndex;
            BindEveryDayData();
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
            }
        }
    }
}