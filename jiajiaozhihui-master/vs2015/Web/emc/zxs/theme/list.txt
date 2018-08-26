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
namespace SfSoft.web.emc.zxs.theme
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ClassID = Request.Params["ClassID"].Trim();
                hfClassID.Value = ClassID;

                BindData(GetWhere());
            }
            SetTabName();

        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.zxs.theme";
        }
        protected override void VtPageAccess()
        {
            //CheckPageAccess("emc.zxs.theme.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_ZXS_Info bllBdc = new BLL.WX_ZXS_Info();
            DataSet dsbdc = bllBdc.GetList(" AppId='" + hfClassID.Value + "'");
            string tabname = "基础数据列表";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["Title"].ToString() + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.WX_ZXS_Theme bllBd = new BLL.WX_ZXS_Theme();

            DataSet dsbd = bllBd.GetList(strWhere);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();

            int sn = DbHelperSQL.GetMaxID("Sn", "WX_ZXS_Theme");
            this.txtSn.Text = sn.ToString();
        }

        private string GetWhere()
        {
            return "IsAct=1 and AppId='" + hfClassID.Value + "'";
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_ZXS_Theme bllbd = new BLL.WX_ZXS_Theme();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            Model.WX_ZXS_Theme model = bllbd.GetModel(RefID);
            model.IsAct = 0;
            bllbd.Update(model);
            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_ZXS_Theme modelbd = new Model.WX_ZXS_Theme();
            BLL.WX_ZXS_Theme bllBd = new BLL.WX_ZXS_Theme();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            modelbd.Title = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[1].Controls[0])).Text.ToString().Trim();
            modelbd.Weeks = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim());
            modelbd.Sn = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[3].Controls[0])).Text.ToString().Trim());

            modelbd.StartWeek = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[4].Controls[0])).Text.ToString().Trim());
            modelbd.EndWeek = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[5].Controls[0])).Text.ToString().Trim());
            int IsAct =1;
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsActv"))).Checked)
            {
                IsAct = 0;
            }
            modelbd.IsAct = IsAct;
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

        //绑定行数据时更新内容
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (((CheckBox)e.Row.FindControl("cbIsActv")) != null)
            {
                CheckBox cbIsActv = (CheckBox)e.Row.FindControl("cbIsActv");
                string hfIsActv = ((HiddenField)e.Row.FindControl("hfIsActv")).Value;
                if (hfIsActv == "0")
                {
                    cbIsActv.Checked = false;
                }
                else
                {
                    cbIsActv.Checked = true;
                }

            }

            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[8].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[1].Text + "\"吗?')");
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            if (this.txtTheme .Text == "")
            {
                strErr += "主题不能为空！\\n";
            }

            if (this.txtWeeks.Text == "")
            {
                strErr += "周期不能为空！\\n";
            }


            if (!PageValidate.IsNumber(txtWeeks.Text))
            {
                strErr += "周期不是数字！\\n";
            }
            if (!PageValidate.IsNumber(txtSn.Text))
            {
                strErr += "顺序号不是数字！\\n";
            }
            if (this.txtSn.Text == "")
            {
                this.txtSn.Text = "0";
            }
            int sn = int.Parse(this.txtSn.Text);

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            string appId = hfClassID.Value;
            string them = this.txtTheme.Text;
            string weeks = this.txtWeeks.Text;

            int IsAct = 1;
            if (!this.cbIsAct.Checked)
            {
                IsAct = 0;
            }


            Model.WX_ZXS_Theme model = new Model.WX_ZXS_Theme();
            model.AppId = appId;
            model.IsAct = IsAct;
            model.Title = them;
            model.Sn = sn;
            model.Weeks = Convert.ToInt32(weeks);

            BLL.WX_ZXS_Theme bll = new BLL.WX_ZXS_Theme();
            bll.Add(model);

            this.txtTheme.Text = "";
            this.txtWeeks.Text = "";
            BindData(GetWhere());
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
    }
}


