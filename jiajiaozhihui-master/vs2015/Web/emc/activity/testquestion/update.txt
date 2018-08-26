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
namespace SfSoft.web.emc.activity.testquestion
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_TestQuestion modelArts = new SfSoft.Model.WX_TestQuestion();
        BLL.WX_TestQuestion bllArts = new BLL.WX_TestQuestion();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();

                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.activity.testquestion";

                //新建
                if (hfMode.Value == "add")
                {
                    cbAct.Checked = true;
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
            hfMID.Value = "emc.activity.testquestion";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_TestQuestion model)
        {
            txtTestQuestion.Text = model.TestQuestion;
            txtAnswer1.Text = model.Answer1.Replace("/a","");
            txtAnswer2.Text = model.Answer2.Replace("/b", "");
            txtAnswer3.Text = model.Answer3.Replace("/c", "");
            txtAnswer4.Text = model.Answer4.Replace("/d", "");
            if (model.QuestionType != null && model.QuestionType != "") {
                ddlQuestionType.Items.FindByValue(model.QuestionType).Selected = true;
            }

            if (model.Grade != null && model.Grade != "")
            {
                ddlGrade.Items.FindByValue(model.Grade).Selected = true;
            }
            if (model.IsAct == 1) {
                cbAct.Checked = true;
            }
            switch (model.RightAnswer) { 
                case "A":
                case "a":
                    cbRightAnswer1.Checked = true;
                    break;
                case "B":
                case "b":
                    cbRightAnswer2.Checked = true;
                    break;
                case "C":
                case "c":
                    cbRightAnswer3.Checked = true;
                    break;
                case "D":
                case "d":
                    cbRightAnswer4.Checked = true;
                    break;
            }
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
            Model.WX_TestQuestion model = new Model.WX_TestQuestion();
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

        private Model.WX_TestQuestion SetModelValue(Model.WX_TestQuestion model)
        {
            model.TestQuestion = txtTestQuestion.Text.Trim();
            model.Answer1 = txtAnswer1.Text.Trim()+"/a";
            model.Answer2 = txtAnswer2.Text.Trim() + "/b";
            model.Answer3 = txtAnswer3.Text.Trim() + "/c";
            model.Answer4 = txtAnswer4.Text.Trim() + "/d";
            if (cbAct.Checked == true)
            {
                model.IsAct = 1;
            }
            else {
                model.IsAct = 0;
            }
            if (cbRightAnswer1.Checked == true) {
                model.RightAnswer = "A";
            }
            else if (cbRightAnswer2.Checked == true) {
                model.RightAnswer = "B";
            }
            else if (cbRightAnswer3.Checked == true) {
                model.RightAnswer = "C";
            }
            else if (cbRightAnswer4.Checked == true) {
                model.RightAnswer = "D";
            }
            if (ddlQuestionType.SelectedItem != null && ddlQuestionType.SelectedValue != "") {
                model.QuestionType = ddlQuestionType.SelectedValue;
            }
            if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "") {
                model.Grade = ddlGrade.SelectedValue;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtTestQuestion.Text == "")
            {
                strErr += "试题不能为空！\\n";
            }
            if (this.txtAnswer1.Text == "")
            {
                strErr += "答案1不能为空！\\n";
            }
            if (this.txtAnswer2.Text == "")
            {
                strErr += "答案2不能为空！\\n";
            }
            if (this.txtAnswer3.Text == "")
            {
                strErr += "答案3不能为空！\\n";
            }
            if (this.txtAnswer4.Text == "")
            {
                strErr += "答案4不能为空！\\n";
            }
            if (IsMoreSelected() == false) {
                strErr += "请选择一个正确的答案！\\n";
            }
            if (ddlQuestionType.SelectedItem == null || ddlQuestionType.SelectedValue == "") {
                strErr += "请选择试题类型！\\n";
            }
            if (ddlGrade.SelectedItem == null || ddlGrade.SelectedValue == "")
            {
                strErr += "请选择试题等级！\\n";
            }
            return strErr;
        }
        private bool IsMoreSelected()
        {
            int i = 0;
            if (cbRightAnswer1.Checked == true) i += 1;
            if (cbRightAnswer2.Checked == true) i += 1;
            if (cbRightAnswer3.Checked == true) i += 1;
            if (cbRightAnswer4.Checked == true) i += 1;
            if (i == 1)
            {
                return true;
            }
            else {
                return false;
            }
        }

        
        /// <summary>
        /// 活动类型
        /// </summary>
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.activity.testquestion.type'");
            EmcCommon.SetBaseDataDropDownList(ddlQuestionType, "weixin.activity.testquestion.type", ds);
            ddlQuestionType.Items.Insert(0, new ListItem { Text = "", Value = "" });

            ds = bll.GetList("refobj='weixin.activity.testquestion.grade'");
            EmcCommon.SetBaseDataDropDownList(ddlGrade, "weixin.activity.testquestion.grade", ds);
            ddlGrade.Items.Insert(0, new ListItem { Text = "", Value = "" });
        }

        protected void cbRightAnswer1_CheckedChanged(object sender, EventArgs e)
        {
            SelectedRightAnswer(cbRightAnswer1);
        }

        protected void cbRightAnswer2_CheckedChanged(object sender, EventArgs e)
        {
            SelectedRightAnswer(cbRightAnswer2);
        }

        protected void cbRightAnswer3_CheckedChanged(object sender, EventArgs e)
        {
            SelectedRightAnswer(cbRightAnswer3);
        }

        protected void cbRightAnswer4_CheckedChanged(object sender, EventArgs e)
        {
            SelectedRightAnswer(cbRightAnswer4);
        }
        private void SelectedRightAnswer(CheckBox cb)
        {
            cbRightAnswer1.Checked = false;
            cbRightAnswer2.Checked = false;
            cbRightAnswer3.Checked = false;
            cbRightAnswer4.Checked = false;
            cb.Checked = true;
        }
    }
}


