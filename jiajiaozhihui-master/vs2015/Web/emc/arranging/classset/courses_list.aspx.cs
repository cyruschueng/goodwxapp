using SfSoft.SfEmc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.arranging.classset
{
    public partial class courses_list : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                hfClassID.Value = ClassID;

                BindData();
                SourceBindData();
            }
            SetTabName();
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.resouce.set";
            hfClassID.Value = Request.Params["ClassID"].Trim();
        }

        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            //NewTsbtnNew();
            //tsbtnNew.OnClientClick = "Add_CorsesForm(" + hfClassID.Value + ");return false;";
            //phToolBars.Controls.Add(tsbtnNew);
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
            BLL.wx_class_courses bll = new BLL.wx_class_courses();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                bll.Delete(id);
            }
            SourceBindData();
            BindData();
        }
        private void SetTabName()
        {
            BLL.wx_class bllBdc = new BLL.wx_class();
            var model = bllBdc.GetModel(int.Parse(hfClassID.Value));
            string tabname = "课程列表";
            if (model != null)
            {
                tabname = "[" + model.class_name + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData()
        {
            var sql = "select a.*,b.title as course_name,c.uname as exper_name ,d.opening_date,(select COUNT(1) from wx_source_list s where a.scource_id=s.source_id  ) as course_size " +
                "from wx_class_courses a " +
                "left join wx_source b on a.scource_id=b.id " +
                "left join WX_JJZH_Expert c on b.expert_id=c.Id " +
                "left join wx_class d on a.class_id=d.id " +
                " where class_id=" + hfClassID.Value;

            DataSet ds =SfSoft.DBUtility.DbHelperSQL.Query(sql);
            
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

        private string GetWhere()
        {
            string strWhere = " ";
            
            return strWhere;
        }

        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow )
            {
                string url = "courses_update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&classId=" + hfClassID.Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";

                if (e.Row.RowState == DataControlRowState.Edit|| ((int)(e.Row.RowState & DataControlRowState.Edit)) != 0) {
                    HiddenField hfRole = (HiddenField)(e.Row.FindControl("hfRole"));
                    var role =string.IsNullOrEmpty(hfRole.Value)?"001":hfRole.Value;
                    RadioButtonList cblRole = (RadioButtonList)(e.Row.FindControl("cblRole"));
                    cblRole.Items.FindByValue(role).Selected = true ;


                    HiddenField hfIsPublic = (HiddenField)(e.Row.FindControl("hfIsPublic"));
                    var isPublic =string.IsNullOrEmpty(hfIsPublic.Value)?"0":hfIsPublic.Value;
                    RadioButtonList cbIsPublic = (RadioButtonList)(e.Row.FindControl("cbIsPublic"));
                    cbIsPublic.Items.FindByValue(isPublic).Selected = true;

                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData();
        }
        protected void AspNetPager2_PageChanged(object sender, EventArgs e)
        {
            SourceBindData();
        }

        private void SourceBindData()
        {
            var sql = "select * from wx_source a  where not exists(select id from wx_class_courses b where  a.id=b.scource_id )";
            var ds= SfSoft.DBUtility.DbHelperSQL.Query(sql);
            
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
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
                Common.SetEmptyGridView.GridViewDataBind(GridView2, ds.Tables[0]);
            }
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView2, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.wx_class_courses bll = new BLL.wx_class_courses();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.wx_class_courses model = new Model.wx_class_courses();
                model.class_id =int.Parse( hfClassID.Value);
                model.scource_id = id;
                model.is_act = 1;
                model.starting_date = DateTime.Now;
                bll.Add(model);
            }
            SourceBindData();
            BindData();
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData();
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData();
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            TextBox txtStartingDate = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtStartingDate"));

            RadioButtonList cblRole = (RadioButtonList)(GridView1.Rows[e.RowIndex].FindControl("cblRole"));

            RadioButtonList cbIsPublic = (RadioButtonList)(GridView1.Rows[e.RowIndex].FindControl("cbIsPublic"));

            Model.wx_class_courses model = new Model.wx_class_courses();
            BLL.wx_class_courses bllorder = new BLL.wx_class_courses();
            model = bllorder.GetModel(RefID);
            if (model != null)
            {
                if (txtStartingDate.Text != "")
                {
                    model.starting_date = DateTime.Parse(txtStartingDate.Text);
                }
                model.role = cblRole.SelectedValue;
                model.is_public = int.Parse(cbIsPublic.SelectedValue);
            }
            bllorder.Update(model);
            GridView1.EditIndex = -1;
            BindData();
        }
        public string GetClassType(string typeId)
        {
            string result = "";
            switch (typeId) {
                case "001":
                    result = "初级班";
                    break;
                case "002":
                    result = "高级班";
                    break;
                case "003":
                    result = "卓越班";
                    break;
            }
            return result;
        }
    }
}