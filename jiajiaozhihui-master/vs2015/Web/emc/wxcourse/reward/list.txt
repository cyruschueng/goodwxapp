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
namespace SfSoft.web.emc.wxcourse.reward
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
            hfMID.Value = "emc.wxcourse.reward";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.emc.wxcourse.reward.browse");
        }
 
        private void SetTabName()
        {
            BLL.Pub_BaseData bllBdc = new BLL.Pub_BaseData();
            DataSet dsbdc = bllBdc.GetList(" RefValueCode='" + hfClassID.Value + "' and RefObj='weixin.wxcourse.reward'");
            string tabname = "课程分成";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["RefValue"].ToString() + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.WX_Course_Reward bllBd = new BLL.WX_Course_Reward();

            DataSet dsbd = bllBd.GetList(strWhere);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();

            //初始化顺序号
            //int OrderID = DbHelperSQL.GetMaxID("OrderID", "WX_TestQuestion_Activity_Class", Session["FilialeID"].ToString());
            //this.txtOrderID.Text = OrderID.ToString();
        }

        private string GetWhere()
        {
            return " Class=" + hfClassID.Value;
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            string IsSysFlag = GridView1.Rows[e.NewEditIndex].Cells[5].Text.ToString();
            if (IsSysFlag == "否")
            {
               // ((TextBox)GridView1.Rows[e.NewEditIndex].FindControl("txtRefValueCode")).ReadOnly = true;
            }

            BindData(GetWhere());
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

            BLL.WX_Course_Reward bllbd = new BLL.WX_Course_Reward();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Course_Reward modelbd = new Model.WX_Course_Reward();
            BLL.WX_Course_Reward bllBd = new BLL.WX_Course_Reward();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            
            modelbd.StartNumber = Common.Common.stringToInt( ((TextBox)(GridView1.Rows[e.RowIndex].Cells[1].Controls[0])).Text.ToString().Trim());
            modelbd.EndNumber = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim());
            modelbd.Rate =Convert.ToDecimal(((TextBox)(GridView1.Rows[e.RowIndex].Cells[3].Controls[0])).Text.ToString().Trim());
            modelbd.Sort = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[4].Controls[0])).Text.ToString().Trim());
            int IsAct = 1;
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsActv"))).Checked)
            {
                IsAct = 0;
            }

            modelbd.IsAct = IsAct;

            // modelbd.IsSystem = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[5].Controls[0])).Text.ToString().Trim();
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
                //更新是否系统列的值
                
                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[7].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"记录（" + e.Row.Cells[0].Text + "\"）吗?')");
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {
            
            string strErr = "";


            if (this.txtStartNumber.Text == "" || !PageValidate.IsNumber(this.txtStartNumber.Text))
            {
                strErr += "开始数据不能为空,且是数字！\\n";
            }
            if (this.txtEndNumber.Text == "" || !PageValidate.IsNumber(this.txtEndNumber.Text))
            {
                strErr += "结束数据不能为空,且是数字！\\n";
            }
            if (this.txtRate.Text == "" || !PageValidate.IsNumber(this.txtRate.Text))
            {
                strErr += "比率不能为空,且是数字！\\n";
            }
            
            if (!PageValidate.IsNumber(this.txtSort.Text))
            {
                strErr += "顺序号不是数字！\\n";
            }
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            string pid = hfClassID.Value;

            int startNumber =Convert.ToInt32(txtStartNumber.Text.Trim());
            int endNumber =Convert.ToInt32( txtEndNumber.Text.Trim());
            decimal rate = Convert.ToDecimal(txtRate.Text.Trim()); 

            string IsAct = "1";
            if (!this.cbIsAct.Checked)
            {
                IsAct = "0";
            }
            if (this.txtSort.Text == "")
            {
                this.txtSort.Text = "99999";
            }
            int sort=int.Parse(txtSort.Text);
            Model.WX_Course_Reward model = new Model.WX_Course_Reward();
            model.Class = pid;
            model.Sort = sort;
            model.StartNumber = startNumber;
            model.EndNumber = endNumber;
            model.Rate = rate;
            model.IsAct = 1;
            BLL.WX_Course_Reward bll = new BLL.WX_Course_Reward();
            bll.Add(model);

            this.txtSort.Text = "";
            this.txtStartNumber.Text = "";
            this.txtEndNumber.Text = "";
            this.txtRate.Text = "";

            this.cbIsAct.Checked = false;
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


