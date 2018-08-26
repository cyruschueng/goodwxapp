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
using SfSoft.SfEmc;
using SfSoft.Common;
using SfSoft.DBUtility;
namespace SfSoft.web.emc.sm.s8
{
    public partial class update : SfSoft.SfEmc.EmcBasePage 
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string MID = Request.Params["MID"].ToString();
                string mode = Request.Params["mode"].ToString();
                string AuditClass = Request.Params["AuditClass"].ToString();
                string flag = Request.Params["flag"].ToString();
                lblClass.Text = AuditClass;
                hfMID.Value = MID;
                hfMode.Value = mode;
                hfAuditClass.Value = AuditClass;
                hfFlag.Value = flag;
                //初始化部门
                this.GetDeptListBox(lbBySelectDept, MID, AuditClass);
                //初始化人员
                SfEmc.EmcCommon.GetUsersDropDownList(ddlAuditUserID, "", Session["FilialeID"].ToString());
                //初始化条件
                this.SetCondtion(MID);
                if (hfMode.Value == "update")
                {
                    string AFID = Request.Params["AFID"].ToString();
                    hfAFID.Value = AFID;


                    //初始化条件值
                    Model.Pub_AuditFlow modelPAF = new SfSoft.Model.Pub_AuditFlow();
                    BLL.Pub_AuditFlow bllPAF = new SfSoft.BLL.Pub_AuditFlow();
                    modelPAF = bllPAF.GetModel(int.Parse(AFID));
                    ShowAuditFlow(modelPAF);
                    string ConditionValue = modelPAF.ConditionValue;
                    string FieldName = modelPAF.FieldName;
                    string LogicName = modelPAF.LogicName;
                    ShowCondition(ConditionValue, FieldName, LogicName);

                }
                else
                {
                    ddlConditionName.Items.FindByValue("N").Selected = true;
                }
                if (hfAuditClass.Value != "1")
                {
                    rblAuditMode.Items.Remove(rblAuditMode.Items.FindByValue("U"));
                    Panel1.Visible = true;
                    rblAuditMode.Items.FindByValue("P").Selected = true;

                }



            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s8";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s8.browse");
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars ();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
 
        /// <summary>
        /// 初始化部门列表框的值
        /// </summary>
        /// <param name="ddlList">ListBox</param>
        public void GetDeptListBox(ListBox lb, string MID, string AuditClass)
        {
            BLL.Pub_Dept bllpd = new BLL.Pub_Dept();
            string strWhere = " FilialeID='" + Session["FilialeID"].ToString() + "' and DeptID not in ( select DeptID from Pub_AuditFlow_Dept where AFID in (select AFID from Pub_AuditFlow where MID='" + MID + "' and AuditClass='" + AuditClass + "' and FilialeID='" + Session["FilialeID"].ToString() + "'))";
            DataTable dtNodeSets = bllpd.GetList(strWhere).Tables[0];
            lb.DataSource = dtNodeSets;
            lb.DataTextField = "DeptName";
            lb.DataValueField = "DeptID";
            lb.DataBind();
        }

        //显示审批信息
        private void ShowAuditFlow(Model.Pub_AuditFlow modelPAF)
        {

            if (modelPAF != null)
            {

                string AuditBound = modelPAF.AuditBound;
                string AuditUserID = modelPAF.AuditUserID.ToString();
                string AuditClass = modelPAF.AuditClass.ToString();
                string AuditMode = modelPAF.AuditMode;
                //string ConditionValue = modelPAF.ConditionValue;
                string AuditTypeName = modelPAF.AuditTypeName;
                //string FieldName = modelPAF.FieldName;
               // string LogicName = modelPAF.LogicName;
                txtAuditTypeName.Text = AuditTypeName;

                if (rblAuditMode.Items.FindByValue(AuditMode) != null)
                {
                    rblAuditMode.Items.FindByValue(AuditMode).Selected = true;
                }

                if (rblAuditBound.Items.FindByValue(AuditBound) != null)
                {
                    rblAuditBound.Items.FindByValue(AuditBound).Selected = true;
                }
                if (ddlAuditUserID.Items.FindByValue(AuditUserID) != null)
                {
                    ddlAuditUserID.Items.FindByValue(AuditUserID).Selected = true;
                }


                if (AuditMode == "P")
                {
                    Panel1.Visible = true;
                }
                //初始化部门范围
                if (AuditBound == "PT")
                {
                    Panel2.Visible = true;
                    BLL.Pub_AuditFlow_Dept bllPAFD = new SfSoft.BLL.Pub_AuditFlow_Dept();
                    string strWhere = "AFID='" + modelPAF.AFID.ToString() + "'";
                    DataSet dspafd = bllPAFD.GetList(strWhere);
                    lbDept.DataSource = dspafd.Tables[0];
                    lbDept.DataTextField = "DeptName";
                    lbDept.DataValueField = "DeptID";
                    lbDept.DataBind();
                }



            }
        }

        //初始化数据条件
        private void SetCondtion(string MID)
        {
            BLL.Pub_ACFlow bllPacf = new SfSoft.BLL.Pub_ACFlow();
            string strWhere = "MID = '" + MID + "'";
            DataSet ds = bllPacf.GetList(strWhere);

            /*
             * DataTable dt = ds.Tables[0];
            if (dt == null)
            {
                dt = CreateStructure();
            }
            DataRow dr = dt.NewRow();
            dr["FieldName"] = "N";
            dr["ConditionName"] = "无条件";
            dt.Rows.Add(dr);
            ddlConditionName.DataSource = dt;
            ddlConditionName.DataTextField = "ConditionName";
            ddlConditionName.DataValueField = "FieldName";
            ddlConditionName.DataBind();
             * */
            ListItem li = new ListItem();
            li.Text = "无条件";
            li.Value = "N";
            ddlConditionName.Items.Add(li);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                li = new ListItem();
                li.Text = dr["ConditionName"].ToString();
                li.Value = dr["FieldName"].ToString();
                ddlConditionName.Items.Add(li);
            }

        }
        private DataTable CreateStructure()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("ConditionName", typeof(string)));
            dt.Columns.Add(new DataColumn("FieldName", typeof(string)));
            return dt;
        }

        protected void ddlConditionName_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlConditionName.Items.FindByValue("N").Selected == true)
            {
                ddlLogicName.Visible = false;
                cblSel.Visible = false;
                txtConditionValue.Visible = false;
            }
            else
            {

                ddlLogicName.Visible = true;
                ShowCondition("", ddlConditionName.SelectedItem.Value, "");

            }
        }
        //显示条件
        private void ShowCondition(string ConditionValue, string FieldName, string LogicName)
        {
            //  string FieldName = ddlConditionName.SelectedItem.Value;

            if (FieldName == "N")//无条件
            {
                ddlLogicName.Visible = false;
                txtConditionValue.Visible = false;
                cblSel.Visible = false;
            }
            else//有条件
            {
                ddlLogicName.Visible = true;

            }
            //显示逻辑输入
            if (LogicName != "" && ddlLogicName.Items.FindByValue(LogicName) != null)
            {
                ddlLogicName.Items.FindByValue(LogicName).Selected = true;
            }
 
            //显示条件字段下拉值
            if (FieldName != "" && ddlConditionName.Items.FindByValue(FieldName) != null)
            {
                ddlConditionName.Items.FindByValue(FieldName).Selected = true;
            }

            string mid = hfMID.Value;
            BLL.Pub_ACFlow bllpf = new SfSoft.BLL.Pub_ACFlow();
            string strWhere1 = " MID='" + mid + "' and FieldName='" + FieldName + "'";//取条件信息
            DataSet dspf = bllpf.GetList(strWhere1);
            if (dspf.Tables[0].Rows.Count > 0)
            {
                string InputFlag = dspf.Tables[0].Rows[0]["InputFlag"].ToString();
                string dt = dspf.Tables[0].Rows[0]["dt"].ToString();
                string SelValue = dspf.Tables[0].Rows[0]["SelValue"].ToString();
                string SelText = dspf.Tables[0].Rows[0]["SelText"].ToString();
                string FunID = dspf.Tables[0].Rows[0]["FunID"].ToString();
                if (InputFlag == "" || InputFlag == "text")//输入框
                {
                    txtConditionValue.Visible = true;
                    txtConditionValue.Text = ConditionValue;
                    cblSel.Visible = false;
                    if (LogicName == null || LogicName == "")
                    {
                        ddlLogicName.ClearSelection();
                        ddlLogicName.Items.FindByValue(">").Selected = true;
                    }
                }
                else//多选框
                {
                    if (LogicName == null || LogicName == "")
                    {
                        ddlLogicName.ClearSelection();
                        ddlLogicName.Items.FindByValue("=").Selected = true;
                    }
                    txtConditionValue.Visible = false;
                    cblSel.Visible = true;
                    string strSql = "select " + SelText + "," + SelValue + " from " + dt + " where RefObj='" + FunID + "' and FilialeID='" + Session["FilialeID"].ToString() + "'";
                    DataSet ds = DbHelperSQL.Query(strSql);//取基础数据中的值
                    if (ds.Tables[0].Rows.Count > 0)
                    {

                        cblSel.DataSource = ds.Tables[0];
                        cblSel.DataTextField = SelText;
                        cblSel.DataValueField = SelValue;
                        cblSel.DataBind();//填充多选框
                    }
                    if (ConditionValue != null)//有条件值，初始化条件
                    {
                        cblSel.ClearSelection();
                        string[] arrCv = ConditionValue.Split(',');
                        for (int i = 0; i < arrCv.Length; i++)
                        {
                            if (cblSel.Items.FindByValue(arrCv[i].Trim()) != null)
                            {
                                cblSel.Items.FindByValue(arrCv[i].Trim()).Selected = true;
                            }
                        }
                    }
                }
            }
        }


        protected void rblAuditMode_SelectedIndexChanged(object sender, EventArgs e)
        {

            if (rblAuditMode.Items.FindByValue("U").Selected == true)
            {
                Panel1.Visible = false;
                Panel2.Visible = false;
            }
            else
            {
                Panel1.Visible = true;
            }
        }

        protected void rblAuditBound_SelectedIndexChanged(object sender, EventArgs e)
        {

            if (rblAuditBound.Items.FindByValue("DF").Selected == true)
            {
                Panel2.Visible = false;
            }
            else
            {
                Panel2.Visible = true;
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (lbBySelectDept.SelectedItem == null)
            {
                MessageBox.Show(this, "没有选择要增加的部门！");
            }
            else
            {
                if (lbDept.Items.FindByValue(lbBySelectDept.SelectedItem.Value) == null)
                {
                    ListItem li = new ListItem();
                    li.Text = lbBySelectDept.SelectedItem.Text;
                    li.Value = lbBySelectDept.SelectedItem.Value;
                    lbDept.Items.Add(li);
                }
            }
        }

        protected void btnDel_Click(object sender, EventArgs e)
        {
            if (lbDept.SelectedItem == null)
            {
                MessageBox.Show(this, "没有选择要移除的部门！");
            }
            else
            {

                lbDept.Items.Remove(lbDept.Items.FindByValue(lbDept.SelectedItem.Value));


            }
        }

        protected void btnAddAll_Click(object sender, EventArgs e)
        {
            SfEmc.EmcCommon.GetDeptListBox(lbDept, Session["FilialeID"].ToString());
        }

        protected void btnDelAll_Click(object sender, EventArgs e)
        {
            SfEmc.EmcCommon.GetDeptListBox(lbDept, "-1");
        }
        protected override void VtSave()
        {
     
 
            string strErr = "";

            strErr = this.checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            BLL.Pub_AuditFlow bllPAF = new BLL.Pub_AuditFlow();
            Model.Pub_AuditFlow modelPAF = this.SetModelValue();
            BLL.Pub_AuditFlow_Dept bllPAFD = new SfSoft.BLL.Pub_AuditFlow_Dept();
            Model.Pub_AuditFlow_Dept modelPAFD = new SfSoft.Model.Pub_AuditFlow_Dept();

            int AFID1 = 0;
            int AuditClass1 = int.Parse(hfAuditClass.Value);
            if (hfMode.Value == "add") //新增保存
            {
                if (hfFlag.Value == "N")//只有插入时才要更上级
                {
                    //更新上级级别
                    bllPAF.UpAuditClass(AuditClass1, hfMID.Value, Session["FilialeID"].ToString());
                }
                AFID1 = bllPAF.Add(modelPAF);
            }
            if (hfMode.Value == "update") //修改保存
            {
                AFID1 = int.Parse(hfAFID.Value);
                modelPAF.AFID = AFID1;
                bllPAF.Update(modelPAF);
                //删除范围
                bllPAFD.Delete(AFID1);

            }
            string AuditBound = modelPAF.AuditBound;

            if (AuditBound == "PT") //指定范围
            {
                //保存范围
                if (lbDept.Items != null)
                {
                    foreach (ListItem li in lbDept.Items)
                    {
                        modelPAFD.AFID = PageValidate.StringToInt(AFID1.ToString());
                        modelPAFD.DeptID = PageValidate.StringToInt(li.Value);
                        modelPAFD.DeptName = li.Text;
                        modelPAFD.FilialeID = Session["FilialeID"].ToString();
                        modelPAFD.MID = hfMID.Value;
                        bllPAFD.Add(modelPAFD);
                    }
                }
            }
            Response.Write("<script>parent.mainbody.document.location='list.aspx?state=browse&mode=list&MID=" + hfMID.Value + "'</script>");
            Response.Write("<script>parent.ClosePop();</script>");
        }


        //设置内容
        private Model.Pub_AuditFlow SetModelValue()
        {
            string ConditionValue = "";
            string LogicName = "";
            string AuditClass = hfAuditClass.Value;
            string AuditTypeName = txtAuditTypeName.Text;
            string FieldName = ddlConditionName.SelectedItem.Value;
            string AuditUserID = "";
            string AuditName = "";
            string AuditBound = "";
            if (FieldName != "N")//有条件审批
            {
                if (txtConditionValue.Visible)
                {
                    ConditionValue = txtConditionValue.Text;
                }
                else
                {
                    ConditionValue = "";
                    if (cblSel.Items != null && cblSel.SelectedItem != null)
                    {
                        foreach (ListItem li in cblSel.Items)
                        {
                            if (li.Selected)
                            {
                                ConditionValue += li.Value +",";
                            }
                        }
                        if (ConditionValue != "")
                        {
                            ConditionValue = ConditionValue.Substring(0, ConditionValue.Length - 1);
                        }
                    }

                }
                LogicName = ddlLogicName.SelectedItem.Text;

            }

            string AuditMode = rblAuditMode.SelectedItem.Value;
            if (AuditMode == "P")//指定审批人
            {
                AuditUserID = ddlAuditUserID.SelectedItem.Value;
                AuditName = ddlAuditUserID.SelectedItem.Text;
                AuditBound = rblAuditBound.SelectedItem.Value;
            }
            Model.Pub_AuditFlow modelPAF = new SfSoft.Model.Pub_AuditFlow();
            modelPAF.AuditTypeName = AuditTypeName;
            modelPAF.FieldName = FieldName;
            modelPAF.LogicName = LogicName;
            modelPAF.ConditionValue = ConditionValue;
            modelPAF.AuditUserID = PageValidate.StringToInt(AuditUserID);
            modelPAF.AuditName = AuditName;
            modelPAF.AuditMode = AuditMode;
            modelPAF.AuditBound = AuditBound;
            modelPAF.FilialeID = Session["FilialeID"].ToString();
            modelPAF.MID = hfMID.Value;
            modelPAF.AuditClass = PageValidate.StringToInt(hfAuditClass.Value);
            return modelPAF;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtAuditTypeName.Text == "")
            {
                strErr += "审批名称不能为空！\\n";
            }
            if (this.rblAuditMode.Items.FindByValue("P").Selected == true)
            {
                if (this.rblAuditBound.Items.FindByValue("PT").Selected == true)
                {
                    if (lbDept.Items == null)
                    {
                        strErr += "没有指定审批范围！\\n";

                    }
                }
            }
            return strErr;
        }

    }
}


