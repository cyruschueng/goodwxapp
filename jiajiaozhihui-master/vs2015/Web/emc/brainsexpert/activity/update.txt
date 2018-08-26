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
using System.IO;
namespace SfSoft.web.emc.brainsexpert.activity
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_TestQuestion_Activity modelArts = new SfSoft.Model.WX_TestQuestion_Activity();
        BLL.WX_TestQuestion_Activity bllArts = new BLL.WX_TestQuestion_Activity();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();
                if (Request.QueryString["mode"] != null) {
                    hfMode.Value = Request.QueryString["mode"].ToString();
                }
                if (Request.QueryString["ID"] != null) {
                    hfID.Value = Request.QueryString["ID"].ToString();
                }
                hfMID.Value = "emc.brainsexpert.activity";
                spanSelect2.Attributes.CssStyle.Add("display", "none");
                spanSelect3.Attributes.CssStyle.Add("display", "none");

                if (hfMode.Value == "add")
                {
                    ddlStatus.Items.FindByValue("2").Selected = true;
                    cbIsAct.Checked = true;
                    txtAllocation.Text = "易|6|2\r\n中|3|4\r\n难|1|6\r\n";
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfID.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.brainsexpert.activity";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
            tsbtnSave.Attributes.Remove("onmouseover");
            tsbtnSave.Attributes.Remove("onmouseout");
        }
        protected override void VtInitBaseToolsBars()
        {

            VtInitBaseDetailToolsBars();
            tsbtnPrint.Attributes.Remove("onmouseover");
            tsbtnPrint.Attributes.Remove("onmouseout");
            tsbtnFresh.Attributes.Remove("onmouseover");
            tsbtnFresh.Attributes.Remove("onmouseout");
            tsbtnReturn.Attributes.Remove("onmouseover");
            tsbtnReturn.Attributes.Remove("onmouseout");
            tsbtnClose.Attributes.Remove("onmouseover");
            tsbtnClose.Attributes.Remove("onmouseout");
            tsbtnHelp.Attributes.Remove("onmouseover");
            tsbtnHelp.Attributes.Remove("onmouseout");
        }
        protected override void VtSave()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.WX_TestQuestion_Activity model = new Model.WX_TestQuestion_Activity();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                int index = bllArts.Add(model);
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllArts.Update(model);
            }
        }

        private void ShowInfo(Model.WX_TestQuestion_Activity model)
        {
            txtActivityName.Text = model.ActivityName;
            txtAllocation.Text = model.Allocation;
            txtInitTakeIn.Text = model.InitTakeIn.ToString();

            if (model.UsingData != null && model.UsingData != "")
            {
                string value = model.UsingData;
                int index = model.UsingData.IndexOf("_");
                string value1 = value.Substring(0,index);
                ddlUsingData.Items.FindByValue(value1).Selected = true;
                LoadUsingDetailData(ddlUsingData.SelectedValue);
                ddlUsingDetailData.Items.FindByValue(value).Selected = true;
            }

            if (model.Status != null )
            {
                ddlStatus.Items.FindByValue(model.Status.ToString()).Selected = true;
            }
            if (model.IsAct != null && model.IsAct != 0) {
                cbIsAct.Checked = true;
            }
            if (model.Sort == null)
            {
                txtSort.Text = "99999";
            }
            else {
                txtSort.Text = model.Sort.ToString();
            }
            if (model.StartDate != null) {
                txtStartDate.Text =string.Format("{0:yyyy-MM-dd HH:mm:ss}",model.StartDate);
            }
            if (model.EndDate != null) {
                txtEndDate.Text = string.Format("{0:yyyy-MM-dd HH:mm:ss}", model.EndDate);
            }
            ShowClass(model.SPid);
        }
        private Model.WX_TestQuestion_Activity SetModelValue(Model.WX_TestQuestion_Activity model)
        {
            model.ActivityName = txtActivityName.Text;
            model.Allocation = txtAllocation.Text;

            if (ddlUsingData.SelectedItem != null && ddlUsingData.SelectedValue != "")
            {
                model.UsingData = ddlUsingDetailData.SelectedValue;
            }
            if (ddlStatus.SelectedItem != null && ddlStatus.SelectedValue != "")
            {
                model.Status = int.Parse(ddlStatus.SelectedValue);
            }
            model.SPid = SetClass();
            model.Pid =int.Parse(ddlClass1.SelectedValue);
            if (cbIsAct.Checked == true)
            {
                model.IsAct = 1;
            }
            else {
                model.IsAct = 0;
            }
            if (txtSort.Text == "")
            {
                model.Sort = 99999;
            }
            else {
                model.Sort = int.Parse(txtSort.Text);
            }
            if (txtInitTakeIn.Text != "")
            {
                model.InitTakeIn = int.Parse(txtInitTakeIn.Text);
            }
            else {
                model.InitTakeIn = 0;
            }
            if (txtStartDate.Text != "") {
                model.StartDate = DateTime.Parse(txtStartDate.Text);
            }
            if (txtEndDate.Text != "") {
                model.EndDate = DateTime.Parse(txtEndDate.Text);
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtActivityName.Text == "")
            {
                strErr += "活动名称不能为空！\\n";
            }
            if (this.txtAllocation.Text == "")
            {
                strErr += "题目分配不能为空！\\n";
            }
            if (this.ddlUsingDetailData.SelectedValue == "" || ddlUsingDetailData.SelectedItem == null)
            {
                strErr += "题库分类不能为空！\\n";
            }
            if (ddlClass1.SelectedItem == null && ddlClass1.SelectedValue == "") {
                strErr += "活动分类不能为空！\\n";
            }
            if (ddlClass2.SelectedItem == null && ddlClass2.SelectedValue == "")
            {
                strErr += "活动分类不能为空！\\n";
            }
            if (!SfSoft.Common.PageValidate.IsNumber1(txtInitTakeIn.Text)) {
                strErr += "数据据格式不正确！\\n";
            }
            return strErr;
        }
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();

            string sql = "select * from dbo.Pub_BaseData_Classc where parentcid like 'wx.questionSorted%' and classtype='D'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

            ddlUsingData.DataSource = ds;
            ddlUsingData.DataTextField = "ClassName";
            ddlUsingData.DataValueField = "ClassID";
            ddlUsingData.DataBind();
            ddlUsingData.Items.Insert(0, new ListItem { Text = "", Value = "" });

            ds = bll.GetList("refobj='weixin.activity.testquestion.status'");
            EmcCommon.SetBaseDataDropDownList(ddlStatus, "weixin.activity.testquestion.status", ds);
            ddlStatus.Items.Insert(0, new ListItem { Text = "", Value = "" });

            sql = "select * from WX_TestQuestion_Activity_Class where classtype=0";
            ds = DBUtility.DbHelperSQL.Query(sql);
            ddlClass1.DataSource = ds;
            ddlClass1.DataTextField = "ClassName";
            ddlClass1.DataValueField = "ID";
            ddlClass1.DataBind();
            ddlClass1.Items.Insert(0, new ListItem { Text = "", Value = "" });
        }
        /// <summary>
        /// 显示当前所选的活动分类
        /// </summary>
        /// <param name="spid"></param>
        private void ShowClass(string spid)
        {
            if (spid == "") return;
            string[] keys = spid.Split('/');
            if (keys.Length > 0) {
                string key = "";
                for (int i = 0; i < keys.Length; i++) {
                    if (i == 0) {
                        key = keys[0];
                        ddlClass1.Items.FindByValue(key).Selected = true;
                        InitDDLClass2(key);
                    }
                    if (i == 1) {
                        key = keys[1];
                        ddlClass2.Items.FindByValue(key).Selected = true;
                        InitDDLClass3(key);
                    }
                    if (i == 2) {
                        key = keys[2];
                        ddlClass3.Items.FindByValue(key).Selected = true;
                    }
                }
            }
        }
        /// <summary>
        /// 返回所选择的活动分类
        /// </summary>
        /// <returns></returns>
        private string SetClass()
        {
            string spid = "";
            spid += ddlClass1.SelectedValue;
            if (ddlClass2.SelectedItem != null && ddlClass2.SelectedValue != "") {
                spid += "/" + ddlClass2.SelectedValue;
            }
            if (ddlClass3.SelectedItem != null && ddlClass3.SelectedValue != "") {
                spid += "/" + ddlClass3.SelectedValue;
            }
            return spid;
        }
        protected void ddlClass1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass1.SelectedItem != null && ddlClass1.SelectedValue != "") {
                string key = ddlClass1.SelectedValue;
                InitDDLClass2(key);
            }
        }
        private void InitDDLClass2(string key)
        {
            string sql = "select * from WX_TestQuestion_Activity_Class where classtype=1 and pid=" + key;
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                spanSelect2.Attributes.CssStyle.Add("display", "inline-block");
                ddlClass2.Items.Clear();
                spanSelect3.Attributes.CssStyle.Add("display", "none");
                ddlClass3.Items.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ddlClass2.Items.Add(new ListItem { Text = dr["ClassName"].ToString(), Value = dr["ID"].ToString() });
                }
                ddlClass2.Items.Insert(0, new ListItem { Value = "", Text = "" });
            }
            else
            {
                spanSelect2.Attributes.CssStyle.Add("display", "none");
                ddlClass2.Items.Clear();
                spanSelect3.Attributes.CssStyle.Add("display", "none");
                ddlClass3.Items.Clear();
            }
        }

        protected void ddlClass2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass2.SelectedItem != null && ddlClass2.SelectedValue != "") {
                string key = ddlClass2.SelectedValue;
                InitDDLClass3(key);
            }
        }
        private void InitDDLClass3(string key)
        {
            string sql = "select * from WX_TestQuestion_Activity_Class where classtype=2 and pid=" + key;
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                spanSelect3.Attributes.CssStyle.Add("display", "inline-block");
                ddlClass3.Items.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ddlClass3.Items.Add(new ListItem { Text = dr["ClassName"].ToString(), Value = dr["ID"].ToString() });
                }
                ddlClass3.Items.Insert(0, new ListItem { Value = "", Text = "" });
            }
            else
            {
                spanSelect3.Attributes.CssStyle.Add("display", "none");
                ddlClass3.Items.Clear();
            }
        }
        private void LoadUsingDetailData(string selectvalue)
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();

            string sql = "select refobj+'_'+refvaluecode as refvaluecode,refvalue from Pub_BaseData where refobj = '"+selectvalue+"'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

            ddlUsingDetailData.Items.Clear();
            ddlUsingDetailData.DataSource = ds;
            ddlUsingDetailData.DataTextField = "refvalue";
            ddlUsingDetailData.DataValueField = "refvaluecode";
            ddlUsingDetailData.DataBind();
            ddlUsingDetailData.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
        }

        protected void ddlUsingData_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlUsingData.SelectedItem != null && ddlUsingData.SelectedValue != "")
            {
                LoadUsingDetailData(ddlUsingData.SelectedValue);
            }
            else {
                ddlUsingDetailData.Items.Clear();
                ddlUsingDetailData.Items.Insert(0, new ListItem() {  Text="---请选择---",Value=""});
            }
        }

    }
}


