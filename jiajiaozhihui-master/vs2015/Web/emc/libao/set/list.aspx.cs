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
namespace SfSoft.web.emc.libao.set
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
            hfMID.Value = "emc.libao.set";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.libao.set.browse");
        }
 
        private void SetTabName()
        {
            BLL.WX_Libao_Set_Class bllBdc = new BLL.WX_Libao_Set_Class();
            DataSet dsbdc = bllBdc.GetList(" id='" + hfClassID.Value + "'");
            string tabname = "基础数据列表";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "[" + dsbdc.Tables[0].Rows[0]["ClassName"].ToString() + "]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        private void BindData(string strWhere)
        {
            BLL.WX_Libao_Set_Class bllBd = new BLL.WX_Libao_Set_Class();

            DataSet dsbd = bllBd.GetList(strWhere);
            GridView1.DataSource = dsbd;
            GridView1.DataBind();

            //初始化顺序号
            //int OrderID = DbHelperSQL.GetMaxID("OrderID", "WX_TestQuestion_Activity_Class", Session["FilialeID"].ToString());
            //this.txtOrderID.Text = OrderID.ToString();
        }

        private string GetWhere()
        {
            return " PID=" + hfClassID.Value ;
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

            BLL.WX_Libao_Set_Class bllbd = new BLL.WX_Libao_Set_Class();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            bllbd.Delete(RefID);

            BindData(GetWhere());
        }

        //更新
        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            Model.WX_Libao_Set_Class modelbd = new Model.WX_Libao_Set_Class();
            BLL.WX_Libao_Set_Class bllBd = new BLL.WX_Libao_Set_Class();
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            modelbd = bllBd.GetModel(RefID);
            
            modelbd.ClassName = ((TextBox)(GridView1.Rows[e.RowIndex].Cells[1].Controls[0])).Text.ToString().Trim();
            modelbd.Sort = Common.Common.stringToInt(((TextBox)(GridView1.Rows[e.RowIndex].Cells[2].Controls[0])).Text.ToString().Trim());
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
                    ((LinkButton)e.Row.Cells[5].Controls[0]).Attributes.Add("onclick", "javascript:return confirm('你确认要删除：\"" + e.Row.Cells[1].Text + "\"吗?')");
                }
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {

            string strErr = "";

            
            if (this.txtClassName.Text == "")
            {
                strErr += "值不能为空！\\n";
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
            
            string className = this.txtClassName.Text;

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
            Model.WX_Libao_Set_Class model = new Model.WX_Libao_Set_Class();
            model.PID =int.Parse(pid);
            model.Sort = sort;
            model.ClassName = className;
            model.ClassType = 1;
            model.IsAct = 1;
            BLL.WX_Libao_Set_Class bll = new BLL.WX_Libao_Set_Class();
            bll.Add(model);

            this.txtSort.Text = "";
            this.txtClassName.Text = "";
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


