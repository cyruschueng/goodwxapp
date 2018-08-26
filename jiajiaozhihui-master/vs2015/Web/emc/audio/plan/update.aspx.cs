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
using System.Collections.Generic;
namespace SfSoft.web.emc.audio.plan
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Audio modelArts = new SfSoft.Model.WX_Audio();
        BLL.WX_Audio bllArts = new BLL.WX_Audio();
        List<Model.WX_Audio_Category> CategoryList = new List<Model.WX_Audio_Category>();
        protected void Page_Load(object sender, EventArgs e)
        {
            GetCateGoryList();
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                
                hfMode.Value = mode;
                hfID.Value = Request.QueryString["Id"];
                hfMID.Value = "emc.audio.plan";
                InitCategory(ddlCategory1, 0);
                InitCategory(DropDownList1, 0);
                BindData(GetWhere());
                BindPlanData();
            }
            
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.plan";
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
                string result = "";
                string category = e.Row.Cells[2].Text.Replace("&nbsp;","");
                if (category.Length != 0) {
                    var categorys = category.Split('/');
                    foreach (string m in categorys)
                    {
                        result += CategoryList.Find(c => c.Id == int.Parse(m)).FullName + " > ";
                    }
                    if (result.EndsWith(" > "))
                    {
                        result = result.Substring(0, result.Length - 3);
                    }
                }
                e.Row.Cells[2].Text = result;
            }
        }
        protected new void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string result = "";
                string category = e.Row.Cells[2].Text.Replace("&nbsp;", "");
                if (category.Length != 0)
                {
                    var categorys = category.Split('/');
                    foreach (string m in categorys)
                    {
                        result += CategoryList.Find(c => c.Id == int.Parse(m)).FullName + " > ";
                    }
                    if (result.EndsWith(" > "))
                    {
                        result = result.Substring(0, result.Length - 3);
                    }
                }
                e.Row.Cells[2].Text = result;
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected void AspNetPager2_PageChanged(object sender, EventArgs e)
        {
            BindPlanData();
        }
        private void BindData(string strWhere)
        {
            BLL.WX_Audio_PlanList planBll=new BLL.WX_Audio_PlanList();
            var planList = planBll.GetModelList("PlanId=" + hfID.Value);

            string category= GetCategory();
            BLL.WX_Audio bll = new BLL.WX_Audio();
            
            var list= bll.GetModelList(strWhere);
            var newlist= list.FindAll(e =>
            {
                var find = true;
                if (category != "") {
                    string[] arr = e.CategoryPath.Split('/');
                    int index = Array.IndexOf(arr, category);
                    find = index == -1 ? false : true;
                };
                var exist = planList.Exists(x => x.AudioId == e.Id);
                if (exist == true)
                {
                    return false;
                }
                else {
                    if (find == true) {
                        return true;
                    }
                    return false;
                }
            });
            if (newlist.Count>0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = newlist;
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
                Common.SetEmptyGridView.GridViewDataBind(GridView1, new List<Model.WX_Audio> { 
                    new Model.WX_Audio(),
                });
            }
        }
        private string GetWhere()
        {
            string strWhere = "1=1 ";
            return strWhere;
        }
        private string  GetCategory()
        {
            string result = "";
            if (ddlCategory3.Visible == true && ddlCategory3.SelectedItem != null && ddlCategory3.SelectedValue != "") {
                result = ddlCategory3.SelectedValue;
            }
            else if (ddlCategory2.Visible == true && ddlCategory2.SelectedItem != null && ddlCategory2.SelectedValue != "") {
                result = ddlCategory2.SelectedValue;
            }
            else if (ddlCategory1.Visible == true && ddlCategory1.SelectedItem != null && ddlCategory1.SelectedValue != "")
            {
                result = ddlCategory1.SelectedValue;
            }
            return result;
        }
        private void InitCategory(DropDownList ddl,int pid,int selected=-1)
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list= bll.GetModelList("Pid="+pid);
            foreach (var m in list) {
                ddl.Items.Add(new ListItem
                {
                    Text = m.FullName,
                    Value = m.Id.ToString()
                });
            }
            ddl.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            if (selected != -1) {
                ddl.Items.FindByValue(selected.ToString()).Selected = true;
            }
        }

        protected void ddlCategory1_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = ddlCategory1.SelectedValue;
            ddlCategory2.Items.Clear();
            ddlCategory3.Items.Clear();
            if (value.Length != 0) {
                BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
                var list = bll.GetModelList("Pid=" + value);
                foreach (var m in list)
                {
                    ddlCategory2.Items.Add(new ListItem
                    {
                        Text = m.FullName,
                        Value = m.Id.ToString()
                    });
                }
            }
            ddlCategory2.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            ddlCategory2.Visible = (ddlCategory2.Items.Count==1 || ddlCategory2.Items.Count==0)?false:true;
            ddlCategory3.Visible = (ddlCategory3.Items.Count == 1 || ddlCategory3.Items.Count == 0) ? false : true;
            BindData(GetWhere());
        }

        protected void ddlCategory2_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = ddlCategory2.SelectedValue;
            ddlCategory3.Items.Clear();
            if (value.Length != 0) {
                BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
                var list = bll.GetModelList("Pid=" + value);
                foreach (var m in list)
                {
                    ddlCategory3.Items.Add(new ListItem
                    {
                        Text = m.FullName,
                        Value = m.Id.ToString()
                    });
                }
            }
            ddlCategory3.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            ddlCategory3.Visible = (ddlCategory3.Items.Count == 1 || ddlCategory3.Items.Count == 0) ? false : true;
            BindData(GetWhere());
        }

        protected void ddlCategory3_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void GetCateGoryList()
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            CategoryList= bll.GetModelList("");
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            var audioId = e.CommandArgument.ToString();
            AddPlanList(int.Parse(hfID.Value), int.Parse(audioId));
            BindData(GetWhere());
            BindPlanData();
        }
        protected void GridView2_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            var audioId = e.CommandArgument.ToString();
            BLL.WX_Audio_PlanList bll = new BLL.WX_Audio_PlanList();
            bll.Delete(int.Parse(hfID.Value), int.Parse(audioId));
            BindData(GetWhere());
            BindPlanData();
        }
        private void AddPlanList(int planId, int audioId)
        {
            if (audioId == 0) return;
            Model.WX_Audio_PlanList model = new Model.WX_Audio_PlanList();
            model.AudioId = audioId;
            model.PlanId = planId;
            BLL.WX_Audio_PlanList bll = new BLL.WX_Audio_PlanList();
            bll.Add(model);
        }

        protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = DropDownList1.SelectedValue;
            DropDownList2.Items.Clear();
            DropDownList3.Items.Clear();
            if (value.Length != 0)
            {
                BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
                var list = bll.GetModelList("Pid=" + value);
                foreach (var m in list)
                {
                    DropDownList2.Items.Add(new ListItem
                    {
                        Text = m.FullName,
                        Value = m.Id.ToString()
                    });
                }
            }
            DropDownList2.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            DropDownList2.Visible = (DropDownList2.Items.Count == 1 || DropDownList2.Items.Count == 0) ? false : true;
            DropDownList3.Visible = (DropDownList3.Items.Count == 1 || DropDownList3.Items.Count == 0) ? false : true;
            BindPlanData();
        }

        protected void DropDownList2_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = DropDownList2.SelectedValue;
            DropDownList3.Items.Clear();
            if (value.Length != 0)
            {
                BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
                var list = bll.GetModelList("Pid=" + value);
                foreach (var m in list)
                {
                    DropDownList3.Items.Add(new ListItem
                    {
                        Text = m.FullName,
                        Value = m.Id.ToString()
                    });
                }
            }
            DropDownList3.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            DropDownList3.Visible = (DropDownList3.Items.Count == 1 || DropDownList3.Items.Count == 0) ? false : true;
            BindPlanData();
        }

        protected void DropDownList3_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindPlanData();
        }

        private void BindPlanData()
        {
            string sql = "select * from (" +
                " select a.*,b.CategoryId,b.FullName,b.ShortName,b.SoundSource,b.CategoryPath from WX_Audio_PlanList a" +
                " left join  WX_Audio b on a.AudioId=b.Id" +
                ")a";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<PlanInfo> planInfos = new List<PlanInfo>();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                planInfos.Add(new PlanInfo {
                    AudioId = dr.Field<int>("AudioId"),
                    CategoryId = dr.Field<int>("CategoryId"),
                    CategoryPath = dr.Field<string>("CategoryPath"),
                    FullName = dr.Field<string>("FullName"),
                    ShortName = dr.Field<string>("ShortName"),
                    PlanId = dr.Field<int>("PlanId"),
                    SoundSource = dr.Field<string>("SoundSource")
                });
            }
            string category = GetCategory2();
            var list = planInfos.FindAll(e =>
            {
                var find = true;
                if (category != "")
                {
                    string[] arr = e.CategoryPath.Split('/');
                    int index = Array.IndexOf(arr, category);
                    find = index == -1 ? false : true;
                };
                return find;
            });
            if (list.Count>0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = list;
                AspNetPager2.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager2.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager2.PageSize;
                GridView2.PageIndex = AspNetPager2.CurrentPageIndex - 1;
                this.GridView2.DataSource = pds;
                this.GridView2.DataBind();
            }
            else
            {
                AspNetPager2.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView2, new List<PlanInfo> { 
                    new PlanInfo()
                });
            }
        }
        private string GetCategory2()
        {
            string result = "";
            if (DropDownList3.Visible == true && DropDownList3.SelectedItem != null && DropDownList3.SelectedValue != "")
            {
                result = DropDownList3.SelectedValue;
            }
            else if (DropDownList2.Visible == true && DropDownList2.SelectedItem != null && DropDownList2.SelectedValue != "")
            {
                result = DropDownList2.SelectedValue;
            }
            else if (DropDownList1.Visible == true && DropDownList1.SelectedItem != null && DropDownList1.SelectedValue != "")
            {
                result = DropDownList1.SelectedValue;
            }
            return result;
        }
    }
}


