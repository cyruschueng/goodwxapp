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
 

namespace SfSoft.web.emc.sm.s4
{
    public partial class list : SfSoft.SfEmc.EmcBasePage 
    {
        int j = 0;
        int m = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
 
 
            if (!IsPostBack)
            {
                string FunID = Request.Params["FunID"].Trim();
                hfFunID.Value = FunID;
                BindData(GetWhere());
                //初始化下接用户


                EmcCommon.GetUsersDropDownList(ddlUserList, "", Session["FilialeID"].ToString());
                EmcCommon.GetDeptDropDownList(ddlDeptID, "", Session["FilialeID"].ToString());
                EmcCommon.GetUsersDropDownList(ddlUserID, "", Session["FilialeID"].ToString());
            }
            else
            {
          
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
                Common.SetEmptyGridView.ResetGridView(this.GridView2);
                Common.SetEmptyGridView.ResetGridView(this.GridView3);
            }

            SetTabName();
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s4";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s4.browse");
        }

        private void SetTabName()
        {
            BLL.Pub_FunDef bllBdc = new BLL.Pub_FunDef();
            DataSet dsbdc = bllBdc.GetList(" FunID='" + hfFunID.Value + "' and FunType='Data' ");
            string tabname = "数据权限列表";
            if (dsbdc.Tables[0].Rows.Count > 0)
            {
                tabname = "["+ dsbdc.Tables[0].Rows[0]["FunName"].ToString() +"]" + tabname;
            }
            TabOptionItem1.Tab_Name = tabname;
        }

        //绑定范围时修改属性值


        protected void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            
            HiddenField hfrc = (HiddenField)e.Row.FindControl("hfRowCount");
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

 
                    hfrc.Value = j.ToString();
                    j += 1;
 
                if (e.Row.Cells[1].Text.Trim() == "D")
                {
                    e.Row.Cells[1].Text = "部门";
                }
                else if (e.Row.Cells[1].Text.Trim() == "U")
                {
                    e.Row.Cells[1].Text = "人员";
                }
                else if (e.Row.Cells[1].Text.Trim() == "C")
                {
                    e.Row.Cells[1].Text = "公司";
                }
            }
        }

        //绑定范围时修改属性值


        protected void GridView3_RowDataBound(object sender, GridViewRowEventArgs e)
        {
             HiddenField hfrc = (HiddenField) e.Row.FindControl("hfRowCount1");
            
         
            if (e.Row.RowType == DataControlRowType.DataRow)
            {


                 hfrc.Value  = m.ToString();
                m += 1;
 
            }
        }

        private void BindData(string strWhere)
        {
            BLL.Pub_Data_doc bllDd = new BLL.Pub_Data_doc();
            DataSet dsDd = bllDd.GetList(strWhere);
            Common.SetEmptyGridView.GridViewDataBind(this.GridView1, dsDd.Tables[0]);
        }

        private string GetWhere()
        {
            return " FilialeID='" + Session["FilialeID"].ToString() + "' and ModulesID='" + hfFunID.Value + "'";

        }

        protected void LinkButtonClick(object sender, CommandEventArgs e)
        {
            
            string DataAclID = e.CommandArgument.ToString();
            hfID.Value = DataAclID;

            Model.Pub_Data_doc docModel = new Model.Pub_Data_doc();
            BLL.Pub_Data_doc docBll = new BLL.Pub_Data_doc();
            BLL.Pub_Data_Acl daBll = new BLL.Pub_Data_Acl();
            BLL.Pub_Data_Acl_Users dauBll = new BLL.Pub_Data_Acl_Users();
            // 实现角色编辑
            if (e.CommandName.Equals("Edit"))
            {
                hfState.Value = "update";
                //显示数据权限详细信息
 
                TabOptionItem2.Visible = true;
                TabOptionItem1.Visible = true;
                TabOptionWebControls1.SelectIndex = 1;

                docModel = docBll.GetModel(Common.Common.stringToInt(DataAclID));
                if (docModel != null)
                {
                    txtDataAclDesc.Text = docModel.DataAclDesc;
                }
                DataSet dsda = daBll.GetList(" DataAclID = '" + DataAclID + "'");
                //GridView2.DataSource = dsda;
                //GridView2.DataBind();
                Common.SetEmptyGridView.GridViewDataBind(this.GridView2, dsda.Tables[0]);
                DataSet dsdau = dauBll.GetList(" a.DataAclID = '" + DataAclID + "'");
                //GridView3.DataSource = dsdau;
                //GridView3.DataBind();
                Common.SetEmptyGridView.GridViewDataBind(this.GridView3, dsdau.Tables[0]);
            }
            //处理角色的删除


            if (e.CommandName.Equals("Delete"))
            {
                TabOptionItem1.Visible = true;
                TabOptionItem2.Visible = false;
                TabOptionWebControls1.SelectIndex = 0;
                //删除主表
                docBll.Delete(Common.Common.stringToInt(DataAclID));
                //删除从表
                daBll.Deletes(Common.Common.stringToInt(DataAclID));
                dauBll.Deletes(Common.Common.stringToInt(DataAclID));
                
            }
            BindData(GetWhere());
        }

 
 
        //新建数据权限
        protected void btnAdd_Click(object sender, EventArgs e)
        {

            hfState.Value = "add";
            TabOptionItem1.Visible = true;
            TabOptionItem2.Visible = true;
            TabOptionWebControls1.SelectIndex = 1;
            
            //设置输入为空
            txtDataAclDesc.Text = "";

            //设置范围为空
            BLL.Pub_Data_Acl bllDa = new BLL.Pub_Data_Acl();
            string strWhere1 = " DataAclID = '-1'";
            DataSet dsDa= bllDa.GetList(strWhere1);
            //GridView2.DataSource = dsDa;
            //GridView2.DataBind();
            Session["sms4dsDa"] = dsDa;
            Common.SetEmptyGridView.GridViewDataBind(this.GridView2, dsDa.Tables[0]);
            //设置人员为空
            BLL.Pub_Data_Acl_Users bllDau = new BLL.Pub_Data_Acl_Users();
            string strWhere2 = " a.DataAclID = '-1'";
            DataSet dsDau = bllDau.GetList(strWhere2);
            //GridView3.DataSource = dsDau;
           // GridView3.DataBind();
            Session["sms4dsDau"] = dsDau;

            Common.SetEmptyGridView.GridViewDataBind(this.GridView3, dsDau.Tables[0]);

        }
        //增加新的范围属性


        protected void btnNewDept_Click(object sender, EventArgs e)
        {
  

            if (hfState.Value == "add")
            {
                //添加从表
                DataSet dsDa = (DataSet)Session["sms4dsDa"];
                //把输入数据保存到session ds 中

                DataRow drda = dsDa.Tables["ds"].NewRow();
                drda["DataAclID"] = "-1";
                drda["ModulesID"] = hfFunID.Value;
                drda["FieldName"] = "D";
                drda["Operator"] = "=";
                drda["FieldValue"] = ddlDeptID.SelectedItem.Value;
                drda["FieldText"] = ddlDeptID.SelectedItem.Text;

                dsDa.Tables["ds"].Rows.Add(drda);
                Session["sms4dsDa"] = dsDa;
                DataAclBindData((DataSet)Session["sms4dsDa"]);

            }
            else
            {
                //如果是修改


                //直接保存到表中


                Model.Pub_Data_Acl daModel = new Model.Pub_Data_Acl();
                BLL.Pub_Data_Acl daBll = new BLL.Pub_Data_Acl();
 
 
                daModel.DataAclID = Common.Common.stringToInt(hfID.Value);
                daModel.FieldName = "D";
                daModel.Operator = "=";
                daModel.FieldValue = ddlDeptID.SelectedItem.Value;
                daModel.FieldText = ddlDeptID.SelectedItem.Text;
                daModel.ModulesID = hfFunID.Value; 
                daBll.Add(daModel);
                string strWhere1 = " DataAclID = '" + hfID.Value +"'";
                DataSet dsDa = daBll.GetList(strWhere1);
                DataAclBindData(dsDa);
            }

        }

        //增加新的范围属性


        protected void btnNewUser_Click(object sender, EventArgs e)
        {


            if (hfState.Value == "add")
            {
                //添加从表
                DataSet dsDa = (DataSet)Session["sms4dsDa"];
                //把输入数据保存到session ds 中


                DataRow drda = dsDa.Tables["ds"].NewRow();


                drda["DataAclID"] = "-1";
                drda["ModulesID"] = hfFunID.Value;
                drda["FieldName"] = "U";
                drda["Operator"] = "=";
                drda["FieldValue"] = ddlUserID.SelectedItem.Value;
                drda["FieldText"] = ddlUserID.SelectedItem.Text;

                dsDa.Tables["ds"].Rows.Add(drda);
                Session["sms4dsDa"] = dsDa;
                DataAclBindData((DataSet)Session["sms4dsDa"]);

            }
            else
            {
                //如果是修改


                //直接保存到表中


                Model.Pub_Data_Acl daModel = new Model.Pub_Data_Acl();
                BLL.Pub_Data_Acl daBll = new BLL.Pub_Data_Acl();


                daModel.DataAclID = Common.Common.stringToInt(hfID.Value);
                daModel.FieldName = "U";
                daModel.Operator = "=";
                daModel.FieldValue = ddlUserID.SelectedItem.Value;
                daModel.FieldText = ddlUserID.SelectedItem.Text;
                daModel.ModulesID = hfFunID.Value;
                daBll.Add(daModel);
                string strWhere1 = " DataAclID = '" + hfID.Value + "'";
                DataSet dsDa = daBll.GetList(strWhere1);
                DataAclBindData(dsDa);
            }

        }

        //增加新的用户
        protected void btnNew2_Click(object sender, EventArgs e)
        {
            //如果数据权限是新建


            if (hfState.Value == "add")
            {
                //添加从表
                DataSet dsDau = (DataSet)Session["sms4dsDau"];
                DataRow drdau = dsDau.Tables["ds"].NewRow();
                drdau["DataAclID"] = "-1";
                drdau["UID"] = ddlUserList.SelectedItem.Value;
                drdau["CnName"] = ddlUserList.SelectedItem.Text;
                dsDau.Tables["ds"].Rows.Add(drdau);
                Session["sms4dsDau"] = dsDau;
                DataAclUserBindData((DataSet)Session["sms4dsDau"]);
            }
            else
            {
                //如果是修改


                //直接保存到表中


                Model.Pub_Data_Acl_Users dauModel = new Model.Pub_Data_Acl_Users();
                BLL.Pub_Data_Acl_Users dauBll = new BLL.Pub_Data_Acl_Users();
                dauModel.DataAclID = Common.Common.stringToInt(hfID.Value);
                dauModel.UID = Common.Common.stringToInt(ddlUserList.SelectedItem.Value);
                dauBll.Add(dauModel);
                string strWhere1 = " DataAclID = '" + hfID.Value + "'";
                DataSet dsDau = dauBll.GetList(strWhere1);
                DataAclUserBindData(dsDau);
            }

        }
        protected void DataAclBindData(DataSet dsDa)
        {
            GridView2.DataSource = dsDa;
            GridView2.DataBind();
        }
        protected   void DataAclUserBindData(DataSet dsDau)
        {
            GridView3.DataSource = dsDau;
            GridView3.DataBind();
        }
        //保存单据
        protected void btnSave_Click(object sender, EventArgs e)
        {
            string strErr = "";
            if (this.txtDataAclDesc.Text == "")
            {
                strErr += "数据权限描述不能为空！\\n";
            }

            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            string ModulesID = hfFunID.Value;
            string DataAclDesc = txtDataAclDesc.Text;
            string FilialeID = Session["FilialeID"].ToString();
            int DataAclID = -1;
            Model.Pub_Data_doc docModel = new Model.Pub_Data_doc();
            BLL.Pub_Data_doc docBll = new BLL.Pub_Data_doc();
            Model.Pub_Data_Acl daModel = new Model.Pub_Data_Acl();
            BLL.Pub_Data_Acl daBll = new BLL.Pub_Data_Acl();
            Model.Pub_Data_Acl_Users dauModel = new Model.Pub_Data_Acl_Users();
            BLL.Pub_Data_Acl_Users dauBll = new BLL.Pub_Data_Acl_Users();
            //如果是新建保存


            if (hfState.Value == "add")
            {
                //保存主表
                docModel.ModulesID = ModulesID;
                docModel.FilialeID = FilialeID;
                docModel.DataAclDesc = DataAclDesc;
                DataAclID = docBll.Add(docModel);
                //保存从表1 范围
                DataSet dsDa = (DataSet) Session["sms4dsDa"];
                if (dsDa != null)
                {
                     foreach (DataRow drda in dsDa.Tables[0].Rows)
                    {
                        daModel.FieldName = drda["FieldName"].ToString();
                        daModel.FieldText = drda["FieldText"].ToString();
                        daModel.FieldValue = drda["FieldValue"].ToString();
                        daModel.ModulesID = drda["ModulesID"].ToString();
                        daModel.Operator = drda["Operator"].ToString();
                        daModel.DataAclID = DataAclID;
                        daBll.Add(daModel);
                    }
                }
                //保存从表2 用户
                DataSet dsDau = (DataSet)Session["sms4dsDau"];
                if (dsDau != null)
                {
                    foreach (DataRow drdau in dsDau.Tables[0].Rows)
                    {
                        dauModel.UID = Common.Common.stringToInt(drdau["UID"].ToString());
                        dauModel.DataAclID = DataAclID;
                        dauBll.Add(dauModel);
                    }
                }

            }
            else
            {
                //保存主表
                docModel.ModulesID = ModulesID;
                docModel.DataAclID = Common.Common.stringToInt(hfID.Value);
                docModel.FilialeID = FilialeID;
                docModel.DataAclDesc = DataAclDesc;
                docBll.Update(docModel);
            }
            BindData(GetWhere());
            TabOptionItem2.Visible = false;
            TabOptionItem1.Visible = true;
            TabOptionWebControls1.SelectIndex = 0;
            Session["sms4dsDa"] = null;
            Session["sms4dsDau"] = null;
        }



        //删除范围
        protected void GridView2_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            if (hfState.Value != "add")
            {
                string DataAclID = hfID.Value;
                BLL.Pub_Data_Acl daBll = new BLL.Pub_Data_Acl();
                int ID = Common.Common.stringToInt(GridView2.DataKeys[e.RowIndex].Value.ToString());
                TabOptionItem2.Visible = true;
                TabOptionWebControls1.SelectIndex = 1;
                daBll.Delete(ID);
                DataSet dsDa = daBll.GetList("DataAclID = '" + DataAclID + "'");
                Common.SetEmptyGridView.GridViewDataBind(this.GridView2, dsDa.Tables["ds"]);
               // DataAclBindData(dsDa);
            }
            else
            {
                int rownum = Common.Common.stringToInt(((HiddenField)GridView2.Rows[e.RowIndex].FindControl("hfRowCount")).Value);
                DataSet dsDa = (DataSet)Session["sms4dsDa"];

                dsDa.Tables["ds"].Rows[rownum].Delete();
                Session["sms4dsDa"] = dsDa;
                //DataAclBindData((DataSet)Session["sms4dsDa"]);
                Common.SetEmptyGridView.GridViewDataBind(this.GridView2, dsDa.Tables["ds"]);
            }
            
        }

        //删除人员
        protected void GridView3_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            BLL.Pub_Data_Acl_Users dauBll = new BLL.Pub_Data_Acl_Users();
            if (hfState.Value != "add")
            {
                string DataAclID = hfID.Value;
                int ID = Common.Common.stringToInt(GridView3.DataKeys[e.RowIndex].Value.ToString());
                TabOptionItem2.Visible = true;
                TabOptionWebControls1.SelectIndex = 1;
                dauBll.Delete(ID);
                DataSet dsDau = dauBll.GetList("DataAclID = '" + DataAclID + "'");
                Common.SetEmptyGridView.GridViewDataBind(this.GridView3, dsDau.Tables["ds"]);
            }
            else
            {
                int rownum = Common.Common.stringToInt(((HiddenField)GridView3.Rows[e.RowIndex].FindControl("hfRowCount1")).Value);
                DataSet dsDau = (DataSet)Session["sms4dsDau"];

                dsDau.Tables["ds"].Rows[rownum].Delete();
                Session["sms4dsDau"] = dsDau;
                Common.SetEmptyGridView.GridViewDataBind(this.GridView3, dsDau.Tables["ds"]);
            }

        }


      
        [AjaxPro.AjaxMethod]
        public DataSet GetDeptList(string ddlFieldName)
        {
            DataSet ds = new DataSet();
            DataSet dstemp = new DataSet();
            DataTable dt = this.CreateStructure();
            
            if (ddlFieldName == "D")
            {
                BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
                string strWhere = " FilialeID='" + Session["FilialeID"] + "'";
                dstemp = bllpd.GetList(strWhere);
                if (dstemp != null)
                {
                    foreach (DataRow drTemp in dstemp.Tables[0].Rows)
                    {
                        DataRow dr = dt.NewRow();
                        dr["ID"] = drTemp["DeptID"];
                        dr["Name"] = drTemp["DeptName"];
                        dt.Rows.Add(dr);
                    }
                    ds.Tables.Add(dt);
                }
            }
            else if (ddlFieldName == "U")
            {
                BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
                string strWhere = " ID in (select UserID from Pub_DeptUsers where FilialeID='" + Session["FilialeID"].ToString() + "') ";
                dstemp = bllEmp.GetList(strWhere);
                if (dstemp != null)
                {
                    foreach (DataRow drTemp in dstemp.Tables[0].Rows)
                    {
                        DataRow dr = dt.NewRow();
                        dr["ID"] = drTemp["ID"];
                        dr["Name"] = drTemp["CnName"];
                        dt.Rows.Add(dr);
                    }
                    ds.Tables.Add(dt);
                }
            }
            else if (ddlFieldName == "C")
            {
                DataRow dr = dt.NewRow();
                dr["ID"] = Session["FilialeID"].ToString();
                dr["Name"] = Session["FilialeName"].ToString();
                dt.Rows.Add(dr);
                ds.Tables.Add(dt);
            }
            return ds;
        }


        private DataTable CreateStructure()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("ID", typeof(string)));
            dt.Columns.Add(new DataColumn("Name", typeof(string)));
            return dt;
        }

        /**
         *  新增所有部门

         *  
         *
         */ 
        protected void btnAddAllDept_Click(object sender, EventArgs e)
        {
            ListItem item;

            if (hfState.Value == "add")
            {
                //添加从表
                DataSet dsDa = (DataSet)Session["sms4dsDa"];
                dsDa.Clear();
                //把输入数据保存到session ds 中

                for (int i = 0; i < ddlDeptID.Items.Count;i++ )
                {
                    DataRow drda = dsDa.Tables["ds"].NewRow();
                    item = ddlDeptID.Items[i];
                    drda["DataAclID"] = "-1";
                    drda["ModulesID"] = hfFunID.Value;
                    drda["FieldName"] = "D";
                    drda["Operator"] = "=";
                    drda["FieldValue"] = item.Value;
                    drda["FieldText"] = item.Text;
                    dsDa.Tables["ds"].Rows.Add(drda);
                }
                Session["sms4dsDa"] = dsDa;
                DataAclBindData(dsDa);
            }
            else　//如果是修改

            {

                BLL.Pub_Data_Acl dauBll = new BLL.Pub_Data_Acl();
                dauBll.AddAllDept(Session["FilialeID"].ToString(), hfID.Value, hfFunID.Value);
                string strWhere1 = " DataAclID = '" + hfID.Value + "'";
                DataSet dsDau = dauBll.GetList(strWhere1);
                DataAclBindData(dsDau);
            }

        }

        protected void btnDelAllDept_Click(object sender, EventArgs e)
        {
            ListItem item;

            if (hfState.Value == "add")
            {
                //添加从表
                DataSet dsDa = (DataSet)Session["sms4dsDa"];
                dsDa.Clear();
                Session["sms4dsDa"] = dsDa;
                DataAclBindData((DataSet)Session["sms4dsDa"]);
            }
            else　//如果是修改

            {
                BLL.Pub_Data_Acl dauBll = new BLL.Pub_Data_Acl();
                dauBll.DelAllDept(Session["FilialeID"].ToString(),hfID.Value, hfFunID.Value);
                string strWhere1 = " DataAclID = '" + hfID.Value + "'";
                DataSet dsDau = dauBll.GetList(strWhere1);
                DataAclBindData(dsDau);
            }
        }

    }
}


