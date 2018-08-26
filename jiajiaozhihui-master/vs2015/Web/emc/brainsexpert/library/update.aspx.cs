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
namespace SfSoft.web.emc.brainsexpert.library
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
                if (Request.QueryString["mode"] != null) {
                    hfMode.Value = Request.QueryString["mode"].ToString();
                }
                if (Request.QueryString["ID"] != null) {
                    hfID.Value = Request.QueryString["ID"].ToString();
                }
                hfMID.Value = "emc.brainsexpert.library";

                if (hfMode.Value == "add")
                {
                    
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
            hfMID.Value = "emc.brainsexpert.library";
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
            Model.WX_TestQuestion model = new Model.WX_TestQuestion();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                int index = bllArts.Add(model);
                string path= SaveFile(index.ToString());
                UpdateAccessoryUrl(path, index.ToString());
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                string path=SaveFile(hfID.Value) ;
                if (path != "")
                {
                    model.AccessoryUrl = path;
                }
                bllArts.Update(model);
                
            }
        }

        private void ShowInfo(Model.WX_TestQuestion model)
        {
            txtTestQuestion.Text = model.TestQuestion;
            txtAnswer1.Text = model.Answer1.Replace("/a", "");
            txtAnswer2.Text = model.Answer2.Replace("/b", "");
            txtAnswer3.Text = model.Answer3.Replace("/c", "");
            txtAnswer4.Text = model.Answer4.Replace("/d", "");
            txtTrack_V1.Text = model.Track_V1;
            txtTrack_V2.Text = model.Track_V2;
            txtTrack_V3.Text = model.Track_V3;
            labFilePath.Text = model.AccessoryUrl.Replace(@"/",@"\");

            if (model.QuestionType != null && model.QuestionType != "")
            {
                ddrQuestionType.Items.FindByValue(model.QuestionType).Selected = true;
                
            }
            if (model.ClassID != null && model.ClassID != "")
            {
                ddrQuestionClass.Items.FindByValue(model.ClassID).Selected = true;
            }

            if (model.Grade != null && model.Grade != "")
            {

                ddrQuestionGrade.Items.FindByValue(model.Grade).Selected = true;
            }
            if (model.QuestionType == "2") {
                imgShow.ImageUrl = model.AccessoryUrl;
            }
            switch (model.RightAnswer)
            {
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
        private Model.WX_TestQuestion SetModelValue(Model.WX_TestQuestion model)
        {
            model.TestQuestion = txtTestQuestion.Text.Trim();
            model.Answer1 = txtAnswer1.Text.Trim() + "/a";
            model.Answer2 = txtAnswer2.Text.Trim() + "/b";
            model.Answer3 = txtAnswer3.Text.Trim() + "/c";
            model.Answer4 = txtAnswer4.Text.Trim() + "/d";
           
            if (cbRightAnswer1.Checked == true)
            {
                model.RightAnswer = "A";
            }
            else if (cbRightAnswer2.Checked == true)
            {
                model.RightAnswer = "B";
            }
            else if (cbRightAnswer3.Checked == true)
            {
                model.RightAnswer = "C";
            }
            else if (cbRightAnswer4.Checked == true)
            {
                model.RightAnswer = "D";
            }
            
            if (ddrQuestionType.SelectedItem != null && ddrQuestionType.SelectedValue != "")
            {
                model.QuestionType = ddrQuestionType.SelectedValue;
            }
            if (ddrQuestionClass.SelectedItem != null && ddrQuestionClass.SelectedValue != "")
            {
                model.ClassID = ddrQuestionClass.SelectedValue;
            }
            if (ddrQuestionGrade.SelectedItem != null && ddrQuestionGrade.SelectedValue != "")
            {
                model.Grade = ddrQuestionGrade.SelectedValue;
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
            if (IsMoreSelected() == false)
            {
                strErr += "请选择一个正确的答案！\\n";
            }

            if (ddrQuestionType.SelectedItem == null || ddrQuestionType.SelectedValue == "")
            {
                strErr += "请选择试题类型！\\n";
            }
            if (ddrQuestionClass.SelectedItem == null || ddrQuestionClass.SelectedValue == "")
            {
                strErr += "请选择试题分类！\\n";
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
            else
            {
                return false;
            }
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
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.activity.testquestion.type'");
            EmcCommon.SetBaseDataDropDownList(ddrQuestionType, "weixin.activity.testquestion.type", ds);
            ddrQuestionType.Items.Insert(0, new ListItem { Text = "", Value = "" });

            string sql = "select refobj+'_'+refvaluecode as refvaluecode,refvalue from Pub_BaseData where refobj like 'wx.questionSorted%'";
            ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            ddrQuestionClass.DataSource = ds;
            ddrQuestionClass.DataTextField = "refvalue";
            ddrQuestionClass.DataValueField = "refvaluecode";
            ddrQuestionClass.DataBind();
            ddrQuestionClass.Items.Insert(0, new ListItem { Text = "", Value = "" });

            ds = bll.GetList("refobj='weixin.activity.testquestion.grade'");
            EmcCommon.SetBaseDataDropDownList(ddrQuestionGrade, "weixin.activity.testquestion.grade", ds);
            ddrQuestionGrade.Items.Insert(0, new ListItem { Text = "", Value = "" });
        }
        private string  SaveFile(string newfilename)
        {
            string url = "";
            if (txtFileUpload.HasFile) {
                string filename = txtFileUpload.FileName;
                string fileExt = filename.Substring(filename.IndexOf("."));
                string filedire = "";
                if (ddrQuestionType.SelectedValue == "2")
                {
                    filedire = @"images/question/";
                }
                else if (ddrQuestionType.SelectedValue == "3") {
                    filedire = @"voice/question/";
                }
                else if (ddrQuestionType.SelectedValue == "4") {
                    filedire = @"video/question/";
                }
                try
                {
                    string name = SfSoft.Common.FileUpLoadCommon.UpFile(filedire, txtFileUpload,newfilename);
                    string savepath= Common.Common.UpLoadDir + filedire;

                    url = savepath + name;
                }
                catch (Exception ex) { 
                    
                }
            }
            return url;
        }
        private void UpdateAccessoryUrl(string path,string id)
        {
            string sql = "update WX_TestQuestion set AccessoryUrl='" + path + "' where id=" + id;
            SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sql);
        }
    }
}


