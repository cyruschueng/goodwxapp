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
using System.Web.Services;
using System.Collections.Generic;
namespace SfSoft.web.emc.parents.plan
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        Dictionary<string, string> QuestionClassIDDictionary = new Dictionary<string, string>();
        Model.WX_Parents_Plan modelArts = new SfSoft.Model.WX_Parents_Plan();
        BLL.WX_Parents_Plan bllArts = new BLL.WX_Parents_Plan();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                GetQuestionClassIDDictionary();
                InitDropDownList();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.parents.plan";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlStatus.Items.FindByValue("1").Selected = true;
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(ID));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.parents.plan";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Parents_Plan model)
        {
            txtContents.Value = model.Contents;
            txtIntro.Text = model.Intro;
            txtMedalName.Text = model.MedalName;
            txtPlanName.Text = model.PlanName;
            txtScore.Text = model.Score.ToString();
            txtSn.Text = model.Sn.ToString();
            //txtTestLibraryId.Text = model.TestLibraryId.ToString();
            SelectedClass(model.TestLibraryId);
            txtQuantity.Text = (model.Quantity??0).ToString();
            ddlAppId.Items.FindByValue(model.AppId).Selected = true;
            ddlStatus.Items.FindByValue((model.IsAct ?? 0).ToString()).Selected = true;
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
            Model.WX_Parents_Plan model = new Model.WX_Parents_Plan();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllArts.Update(model);
            }
        }

        private Model.WX_Parents_Plan SetModelValue(Model.WX_Parents_Plan model)
        {
            if (ddlAppId.SelectedItem != null && ddlAppId.SelectedValue != "") {
                model.AppId = ddlAppId.SelectedValue;
            }
            model.Contents = txtContents.Value;
            model.Intro = txtIntro.Text;
            if (ddlStatus.SelectedItem != null && ddlStatus.SelectedValue != "") {
                model.IsAct = int.Parse(ddlStatus.SelectedValue);
            }
            model.MedalName = txtMedalName.Text;
            model.PlanName = txtPlanName.Text;
            if(txtScore.Text.Trim()!=""){
                model.Score =int.Parse(txtScore.Text);
            }
            if(txtSn.Text.Trim()!=""){
                model.Sn = int.Parse(txtSn.Text);    
            }
            if (ddlClass2.SelectedItem!=null && ddlClass2.SelectedValue!="")
            {
                model.TestLibraryId = ddlClass2.SelectedValue;
            }
            if (txtQuantity.Text.Trim() != "") {
                model.Quantity = int.Parse(txtQuantity.Text);
            }
            return model;
        }
        
        private string checkform()
        {
            string strErr = "";
            if (txtMedalName.Text.Trim() == "") {
                strErr += "荣誉证书不能为空！\\n";
            }
            if (txtPlanName.Text.Trim() == "") {
                strErr += "计划名称不能为空！\\n";
            }
            if (txtScore.Text.Trim() == "") {
                strErr += "过关分数不能为空！\\n";
            }
            if (txtSn.Text.Trim() == "") {
                strErr += "关数不能为空！\\n";
            }
            return strErr;
        }
        private void LoadddlClass1(string selectvalue)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + selectvalue + "'";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                ddlClass2.Items.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ddlClass2.Items.Add(new ListItem
                    {
                        Value = ddlClass1.SelectedValue + "_" + dr["RefValueCode"].ToString(),
                        Text = dr["RefValue"].ToString()
                    });
                }
                ddlClass2.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
            }
        }
        protected void ddlClass1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass1.SelectedItem != null && ddlClass1.SelectedValue != "")
            {
                LoadddlClass1(ddlClass1.SelectedValue);
                Session["ddlclass1"] = ddlClass1.SelectedValue;
            }
            else
            {
                ddlClass2.Items.Clear();
                ddlClass2.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
            }
        }

        protected void ddlClass2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass2.SelectedItem != null && ddlClass2.SelectedValue != "")
            {
                GetQuestionClassIDDictionary();
                Session["ddlclass2"] = ddlClass2.SelectedValue;
            }
        }
        /// <summary>
        /// 获取题库分类
        /// </summary>
        private void GetQuestionClassIDDictionary()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj  like 'wx.questionSorted%'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                QuestionClassIDDictionary.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    QuestionClassIDDictionary.Add(dr["Refobj"].ToString() + "_" + dr["RefValueCode"].ToString(), dr["RefValue"].ToString());
                }
            }
        }
        private void InitDropDownList()
        {
            string sql = "select * from dbo.Pub_BaseData_Classc where parentcid like 'wx.questionSorted%' and classtype='D'";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ddlClass1.Items.Add(new ListItem
                    {
                        Value = dr["ClassID"].ToString(),
                        Text = dr["ClassName"].ToString()
                    });
                }
                ddlClass1.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
            }
        }
        private void SelectedClass(string item)
        {
            try
            {
                var index = item.LastIndexOf("_");
                string value = item.Substring(0, index);
                ddlClass1.Items.FindByValue(value).Selected = true;
                LoadddlClass1(value);
                ddlClass2.Items.FindByValue(item).Selected = true;
            }
            catch (Exception ex) { 
            
            }
        }
    }
}


