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
namespace SfSoft.web.emc.brainsexpert.libraryset
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
            hfMID.Value = "emc.brainsexpert.libraryset";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.brainsexpert.libraryset.browse");
        }
 
        private void SetTabName()
        {
            BLL.Pub_BaseData_Classc bllBdc = new BLL.Pub_BaseData_Classc();
            DataSet dsbdc = bllBdc.GetList(" ClassID='" + hfClassID.Value + "'");
            string tabname = "基础数据列表";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["ClassName"].ToString() + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.Pub_BaseData bllBd = new BLL.Pub_BaseData();

            DataSet dsbd = bllBd.GetList(strWhere);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();

            //初始化顺序号
            int OrderID = DbHelperSQL.GetMaxID("OrderID", "Pub_BaseData", Session["FilialeID"].ToString());
            this.txtOrderID.Text = OrderID.ToString();
        }

        private string GetWhere()
        {
            return " FilialeID='" + Session["FilialeID"].ToString() + "' and RefObj='" + hfClassID.Value + "'";

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

            BLL.Pub_BaseData bllbd = new BLL.Pub_BaseData();
            string IsSysFlag = GridView1.Rows[e.RowIndex].Cells[5].Text.ToString();
            if (IsSysFlag == "是")
            {
                MessageBox.Show(this, "系统数据不能删除，只能停用!");
                return;
            }
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.Pub_BaseData modelbd = new Model.Pub_BaseData();
            BLL.Pub_BaseData bllBd = new BLL.Pub_BaseData();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            string IsSysFlag = GridView1.Rows[e.RowIndex].Cells[5].Text.ToString();
            if (IsSysFlag == "否")
            {
                modelbd.RefValueCode = ((TextBox)GridView1.Rows[e.RowIndex].FindControl("txtRefValueCode")).Text.Trim();
            }
            modelbd.RefValue = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim();
            modelbd.OrderID = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[3].Controls[0])).Text.ToString().Trim());
            string IsAct = "1";
            if (!((CheckBox)(GridView1.Rows[e.RowIndex].FindControl("cbIsActv"))).Checked)
            {
                IsAct = "0";
            }

            modelbd.IsAct = IsAct;
            if (!CheckCodes(RefID.ToString(), modelbd.RefObj, modelbd.FilialeID, modelbd.RefValueCode))
            {
                MessageBox.Show(this, "编码重复，请输入其它编码!");
                return;
            }

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
                if (e.Row.Cells[5].Text.Trim() == "0")
                {
                    e.Row.Cells[5].Text = "否";
                }
                else
                {
                    e.Row.Cells[5].Text = "是";
                }

                if (e.Row.RowState == DataControlRowState.Normal || e.Row.RowState == DataControlRowState.Alternate)
                {
                    ((LinkButton)e.Row.Cells[7].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[2].Text + "\"吗?')");
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            if (this.txtRefValueCode.Text == "")
            {
                strErr += "编码不能为空！\\n";
            }

            if (this.txtRefValue.Text == "")
            {
                strErr += "值不能为空！\\n";
            }


            if (!PageValidate.IsNumber(txtOrderID.Text))
            {
                strErr += "顺序号不是数字！\\n";
            }


            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            int RefPID = 0;
            string RefObj = hfClassID.Value;
            string RefValueCode = this.txtRefValueCode.Text;
            if (!CheckCodes("", RefObj, Session["FilialeID"].ToString(), RefValueCode))
            {
                MessageBox.Show(this, "编码重复，请输入其它编码!");
                return;
            }


            string RefValue = this.txtRefValue.Text;
            string IsSystem = "0";

            string IsAct = "1";
            if (!this.cbIsActAdd.Checked)
            {
                IsAct = "0";
            }
            if (this.txtOrderID.Text == "")
            {
                this.txtOrderID.Text = "0";
            }
            int OrderID = int.Parse(this.txtOrderID.Text);
            string FilialeID = Session["FilialeID"].ToString();


            Model.Pub_BaseData model = new Model.Pub_BaseData();
            model.RefPID = RefPID;
            model.RefObj = RefObj;
            model.RefValueCode = RefValueCode;

            model.RefValue = RefValue;
            model.IsSystem = IsSystem;
            model.IsAct = IsAct;
            model.OrderID = OrderID;
            model.FilialeID = FilialeID;
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            bll.Add(model);

            this.txtRefValueCode.Text = "";
            this.txtRefValue.Text = "";
            this.txtOrderID.Text = "";
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


