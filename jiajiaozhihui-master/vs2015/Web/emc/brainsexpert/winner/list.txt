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
namespace SfSoft.web.emc.brainsexpert.winner
{
    public partial class list : SfSoft.SfEmc.EmcBasePage
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string ActivityId = Request.Params["ID"].Trim();
                hfActivityId.Value = ActivityId;

                BindData(GetWhere());
            }
            SetTabName();

        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.brainsexpert.winner";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.brainsexpert.winner.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(int.Parse(hfActivityId.Value));
            string tabname = "获奖设置";
            if (model!=null)
            {
                tabname = "[" +model.ActivityName + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.WX_TestQuestion_Winner_Rule bll = new BLL.WX_TestQuestion_Winner_Rule();
            DataSet ds = bll.GetList(strWhere);

            GridView1.DataSource = ds;
            GridView1.DataBind();
        }

        private string GetWhere()
        {
            return " ActivityId=" + hfActivityId.Value;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_TestQuestion_Winner_Rule bllbd = new BLL.WX_TestQuestion_Winner_Rule();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_TestQuestion_Winner_Rule modelbd = new Model.WX_TestQuestion_Winner_Rule();
            BLL.WX_TestQuestion_Winner_Rule bllBd = new BLL.WX_TestQuestion_Winner_Rule();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);

            modelbd.LowerLimit = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim());
            modelbd.UpperLimit = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[3].Controls[0])).Text.ToString().Trim());
           
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
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                //更新是否系统列的值
                
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[5].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：名次\"" + e.Row.Cells[1].Text + "\"吗?')");
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";
            if (ddlRank.SelectedItem == null || ddlRank.SelectedValue == "") {
                strErr += "获奖名次不能为空！\\n";
            }
            
            if (!PageValidate.IsNumber(this.txtLowerLimit.Text) || this.txtLowerLimit.Text.Trim()=="")
            {
                strErr += "下限不是数字并且不能为空！\\n";
            }
            if (!PageValidate.IsNumber(this.txtUpperLimit.Text) || this.txtUpperLimit.Text.Trim() == "")
            {
                strErr += "上限不是数字并且不能为空！\\n";
            }

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            string ActivityId = hfActivityId.Value;

            Model.WX_TestQuestion_Winner_Rule model = new Model.WX_TestQuestion_Winner_Rule();
            model.ActivityID = int.Parse(ActivityId);
            model.Rank = Convert.ToInt32(ddlRank.SelectedValue);
            model.WinnerName = ddlRank.SelectedItem.Text;
            model.LowerLimit = Convert.ToInt32(txtLowerLimit.Text);
            model.UpperLimit = Convert.ToInt32(txtUpperLimit.Text);
            
            BLL.WX_TestQuestion_Winner_Rule bll = new BLL.WX_TestQuestion_Winner_Rule();
            bll.Add(model);

           
            this.txtLowerLimit.Text = "";
            this.txtUpperLimit.Text = "";
            this.ddlRank.ClearSelection();
            this.ddlRank.Items.FindByValue("").Selected = true;
            BindData(GetWhere());
        }

        private Boolean CheckCodes(string RefID, string ClassID, string FilialeID, string RefValueCode)
        {
            BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
            string strWhere = " RefObj = '" + ClassID + "' and FilialeID='" + FilialeID + "' and RefValueCode='" + RefValueCode + "'";
            if ((RefID != null) && (RefID != ""))
            {

                strWhere += " and RefID <>'" + RefID + "'";
            }
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
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
    }
}


