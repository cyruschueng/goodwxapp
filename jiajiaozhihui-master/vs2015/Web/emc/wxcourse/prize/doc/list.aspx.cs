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
using System.Linq;
namespace SfSoft.web.emc.wxcourse.prize.doc
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {
        public string HTMLCourseName = "";
        public string HTMLDetaile = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                hfClassID.Value = ClassID;
                GetCourseName(hfClassID.Value);
                GetRule(hfClassID.Value);
                 var g= InitDropDownList(ddlPrizse);
                ddlPrizse.Items.Insert(0, new ListItem() {  Value="", Text="请选择奖品"});
                BindData(GetWhere());
                DataCache.SetCache("gvgoodsid", g);
                LoadConfig();
            }
        }
        private void GetCourseName(string id)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            var model= bll.GetModel(int.Parse(id));
            if (model != null) {
                spanTitle.InnerText = model.Name;
            }
        }
        private void GetRule(string id)
        {
            string detail = "";
            int isAct = 0;
            BLL.WX_Course_RuleDoc bll = new BLL.WX_Course_RuleDoc();
            var list= bll.GetModelList("CourseId="+id);
            if (list.Count > 0) {
                detail = list[0].Detail;
                isAct = list[0].IsAct ?? 0;
            }
            preDetail.InnerHtml = detail;
            txtInfoDesc.Value = detail;
            cbDocIsAct.Checked = isAct == 0 ? false : true;
            lbDocIsAct.Text = isAct == 0 ? "否" : "是";
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.libao.set";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.libao.set.browse");
        }


        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            
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
                //更新是否系统列的值

                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    var btn = e.Row.FindControl("LinkButton4") as LinkButton;
                    btn.Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[0].Text + "\"吗?')");
                }
                var index = e.Row.RowIndex;
                if (e.Row.RowState == DataControlRowState.Edit || e.Row.RowState == (DataControlRowState.Alternate | DataControlRowState.Edit))
                {
                    var ddl= e.Row.FindControl("gv_goodsid") as DropDownList;
                    var list= (System.Collections.Generic.List<Model.WX_PublicGood>)DataCache.GetCache("gvgoodsid");
                    foreach (var m in list) {
                        ddl.Items.Add(new ListItem() { Text=m.GoodName, Value=m.ID.ToString() });
                    }
                    var gv_hfgoodsid = e.Row.FindControl("gv_hfgoodsid") as HiddenField;
                    var gv_goodsid =e.Row.FindControl("gv_goodsid") as DropDownList;
                    gv_goodsid.Items.FindByValue(gv_hfgoodsid.Value).Selected = true;
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {
            Model.WX_Course_RuleSet model = new Model.WX_Course_RuleSet();
            model.CourseId = int.Parse(hfClassID.Value);
            model.CreateDate =DateTime.Now;
            model.GoodsId =int.Parse( ddlPrizse.SelectedValue);
            model.LowLimit =int.Parse(txtLowLimit.Text);
            model.UpperLimit = int.Parse(txtUpperLimit.Text);
            model.Ranking = int.Parse(txtRanking.Text);
            model.IsAct = cbIsAct.Checked == true ? 1 : 0;
            BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
            bll.Add(model);
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
            var list = bll.GetModelList(strWhere);

            BLL.WX_PublicGood bll1 = new BLL.WX_PublicGood();
            var goods = bll1.GetModelList("goodsType=20161213");

            var vv = from r in list
                     join g in goods on r.GoodsId equals g.ID
                     select new {
                         Id=r.Id,
                         CourseId=r.CourseId,
                         LowLimit=r.LowLimit,
                         UpperLimit=r.UpperLimit,
                         Ranking=r.Ranking,
                         GoodsId=r.GoodsId,
                         CreateDate=r.CreateDate,
                         IsAct=r.IsAct,
                         ImgUrl=g.ImgURL,
                         GoodsLink=App.Helper.WxBaseConfig.WebSite+"emc/product/info/update.aspx?ID="+r.GoodsId+"&mode=update"
                     };
            GridView1.DataSource = vv.ToList();
            GridView1.DataBind();
        }
        private string GetWhere()
        {
            return " CourseId=" + hfClassID.Value;
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "Update")
            {
                GridView1.RowUpdating += (a, b) =>
                {
                    var key = Convert.ToInt32(b.Keys[0]);
                    BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
                    var model= bll.GetModel(key);

                    var gv_low_limit = GridView1.Rows[b.RowIndex].FindControl("gv_low_limit") as TextBox;
                    var gv_upper_limit = GridView1.Rows[b.RowIndex].FindControl("gv_upper_limit") as TextBox;
                    var gv_ranking = GridView1.Rows[b.RowIndex].FindControl("gv_ranking") as TextBox;
                    var gv_goodsid = GridView1.Rows[b.RowIndex].FindControl("gv_goodsid") as  DropDownList;
                    var gv_isact = GridView1.Rows[b.RowIndex].FindControl("gv_isact") as CheckBox;
                    if (model != null) {
                        model.GoodsId = Convert.ToInt32(gv_goodsid.SelectedValue);
                        model.IsAct = gv_isact.Checked == true ? 1 : 0;
                        model.LowLimit = Convert.ToInt32(gv_low_limit.Text);
                        model.Ranking = Convert.ToInt32(gv_ranking.Text);
                        model.UpperLimit = Convert.ToInt32(gv_upper_limit.Text);
                        bll.Update(model);
                        GridView1.EditIndex = -1;
                        BindData(GetWhere());
                    }
                };
            }
            else if (e.CommandName == "Cancel")
            {
                GridView1.RowCancelingEdit += (a, b) =>
                {
                    GridView1.EditIndex = -1;
                    BindData(GetWhere());
                };
            }
            else if (e.CommandName == "Edit")
            {
                GridView1.RowEditing += (a, b) =>
                {
                    GridView1.EditIndex = b.NewEditIndex;
                    BindData(GetWhere());
                };
            }
            else if (e.CommandName == "Delete")
            {
                GridView1.RowDeleting += (a, b) => {
                    var key = Convert.ToInt32(GridView1.DataKeys[b.RowIndex].Value);
                    BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
                    var model= bll.GetModel(key);
                    model.IsAct = 0;
                    bll.Update(model);

                    BindData(GetWhere());
                };
            }
        }
        private System.Collections.Generic.List<Model.WX_PublicGood> InitDropDownList(DropDownList ctl)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            var list = bll.GetModelList("IsAct=1 and GoodsType=20161213");
            foreach (var m in list) {
                ctl.Items.Add(new ListItem() { Text = m.GoodName, Value = m.ID.ToString() });
            }
            return list;
        }

        

        protected void btnEdit_Click(object sender, EventArgs e)
        {
            BLL.WX_Course_RuleDoc bll = new BLL.WX_Course_RuleDoc();
            var list = bll.GetModelList("CourseId=" + hfClassID.Value);
            if (list.Count > 0)
            {
                var model = list[0];
                model.Detail = txtInfoDesc.Value;
                model.IsAct = cbDocIsAct.Checked == true ? 1 : 0;
                bll.Update(model);
            }
            else
            {
                var model = new Model.WX_Course_RuleDoc();
                model.CourseId = int.Parse(hfClassID.Value);
                model.CreateDate = DateTime.Now;
                model.Detail = txtInfoDesc.Value;
                model.IsAct = cbDocIsAct.Checked == true ? 1 : 0;
                bll.Add(model);
            }
            preDetail.InnerHtml = txtInfoDesc.Value;
            lbDocIsAct.Text = cbDocIsAct.Checked == true ? "是" : "否";
        }

        protected void btnSaveConfig_Click(object sender, EventArgs e)
        {
            BLL.WX_Course_Config bll = new BLL.WX_Course_Config();
            var m = bll.GetModel(int.Parse(hfClassID.Value));
            if (m == null)
            {
                var model = new Model.WX_Course_Config
                {
                    CourseId = int.Parse(hfClassID.Value),
                    CreateDate = DateTime.Now,
                    GuwenId = int.Parse(txtGeWenId.Text),
                    GxdrItemId = int.Parse(txtGxdrItemId.Text),
                    IsAct = 1,
                    ZxsAppId = txtZxsAppId.Text,
                    ZxsHash = txtZxstHash.Text,
                    ZxsThemeId = int.Parse(txtZxsThemeId.Text),
                    ZxsTitle = txtZxsTitle.Text
                };
                bll.Add(model);
                UpdateConfigView(model);
            }
            else { 
                m.CourseId = int.Parse(hfClassID.Value);
                m.GuwenId = int.Parse(txtGeWenId.Text);
                m.GxdrItemId = int.Parse(txtGxdrItemId.Text);
                m.ZxsAppId = txtZxsAppId.Text;
                m.ZxsHash = txtZxstHash.Text;
                m.ZxsThemeId = int.Parse(txtZxsThemeId.Text);
                m.ZxsTitle = txtZxsTitle.Text;
                bll.Update(m);
                UpdateConfigView(m);
            }
        }
        private void UpdateConfigView(Model.WX_Course_Config config)
        {
            txtGeWenId.Text=lbGeWenId.Text = config.GuwenId.ToString();
            txtGxdrItemId.Text = lbGxdrItemId.Text = config.GxdrItemId.ToString();
            txtZxsAppId.Text = lbZxsAppId.Text = config.ZxsAppId;
            txtZxsThemeId.Text = lbZxsThemeId.Text = config.ZxsThemeId.ToString();
            txtZxsTitle.Text = lbZxsTitle.Text = config.ZxsTitle;
            txtZxstHash.Text = lbZxsHash.Text = config.ZxsHash;
        }

        private void LoadConfig()
        {
            BLL.WX_Course_Config bll = new BLL.WX_Course_Config();
            var courseId = int.Parse(hfClassID.Value);
            var m = bll.GetModel(courseId);
            if (m != null)
            {
                txtGeWenId.Text = m.GuwenId.ToString();
                txtGxdrItemId.Text = m.GuwenId.ToString();
                txtZxsAppId.Text=m.ZxsAppId;
                txtZxsTitle.Text = m.ZxsTitle;
                txtZxsThemeId.Text = m.ZxsThemeId.ToString();
                txtZxstHash.Text = m.ZxsHash;
                UpdateConfigView(m);
            }
        }
    }
}


