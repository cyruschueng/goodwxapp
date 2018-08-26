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
using SfSoft.DBUtility;
namespace SfSoft.web.emc.activity.testquestion
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        DataView dvkind = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindData(GetWhere());
                
                InitDropDownList();
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
                Common.SetEmptyGridView.ResetGridView(this.GridView2);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.activity.testquestion";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        protected override void VtDelete()
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_PublicGood modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            DataSet ds = bll.GetList(strWhere);
            
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                AspNetPager1.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager1.PageSize;
                GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }

        private void BindData2(string strWhere)
        {
            BLL.WX_TestQuestionGrade bll = new BLL.WX_TestQuestionGrade();
            DataSet ds = bll.GetList(strWhere);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                GridView2.DataSource = ds;
                GridView2.DataBind();
            }
            else {
                Common.SetEmptyGridView.GridViewDataBind(GridView2, ds.Tables[0]);
            }
        }

        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1 and isnull(IsAct,0)=1 ";
            if (ddlQuestionType.SelectedItem != null && ddlQuestionType.SelectedValue != "") {
                strWhere += " and QuestionType='" + ddlQuestionType.SelectedValue + "'";
            }

            if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "")
            {
                strWhere += " and Grade='" + ddlGrade.SelectedValue + "'";
            }
            if (txtTestQuestion.Text.Trim() != "") {
                strWhere += " and TestQuestion like '%"+txtTestQuestion.Text+"%'";
            }
            return strWhere;
        }

        //删除
        protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";

                if (Session["dvkind"] == null)
                {
                    string sql = "select * from dbo.Pub_BaseData where refobj like 'weixin.activity.testquestion%'";
                    dvkind = DBTools.GetList(sql).Tables[0].DefaultView;
                    Session["dvkind"] = dvkind;
                }
                else
                {
                    dvkind = (DataView)Session["dvkind"];
                }
                DropDownList ddlQuestionType = (DropDownList)e.Row.FindControl("ddlQuestionType");
                if (ddlQuestionType != null)
                {
                    dvkind.RowFilter = "refobj='weixin.activity.testquestion.type'";
                    if (dvkind.Count > 0) {
                        ddlQuestionType.Items.Clear();
                        for (int i = 0; i < dvkind.Count; i++) {
                            ListItem listItem = new ListItem { Text = dvkind[i]["refvalue"].ToString(), Value = dvkind[i]["refvaluecode"].ToString() };
                            ddlQuestionType.Items.Add(listItem);
                        }
                    }
                }
                DropDownList ddlGrade = (DropDownList)e.Row.FindControl("ddlGrade");
                if (ddlGrade != null)
                {
                    dvkind.RowFilter = "refobj='weixin.activity.testquestion.grade'";
                    if (dvkind.Count > 0)
                    {
                        ddlGrade.Items.Clear();
                        for (int i = 0; i < dvkind.Count; i++)
                        {
                            ListItem listItem = new ListItem { Text = dvkind[i]["refvalue"].ToString(), Value = dvkind[i]["refvaluecode"].ToString() };
                            ddlGrade.Items.Add(listItem);
                        }
                    }
                }
                DropDownList ddlRightAnswer = (DropDownList)e.Row.FindControl("ddlRightAnswer");
                if (e.Row.RowIndex == GridView1.EditIndex)
                {
                    ddlQuestionType = (DropDownList)e.Row.FindControl("ddlQuestionType");
                    ddlQuestionType.Items.FindByValue(((Label)e.Row.FindControl("lblQuestionType")).Text).Selected = true;
                    ddlGrade = (DropDownList)e.Row.FindControl("ddlGrade");
                    ddlGrade.Items.FindByValue(((Label)e.Row.FindControl("lblGrade")).Text).Selected = true;
                    ddlRightAnswer = (DropDownList)e.Row.FindControl("ddlRightAnswer");
                    ddlRightAnswer.Items.FindByValue(((Label)e.Row.FindControl("lblRightAnswer")).Text.ToUpper()).Selected = true;
                }
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        private void InitDropDownList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='weixin.activity.testquestion.type'");
            EmcCommon.SetBaseDataDropDownList(ddlQuestionType, "weixin.activity.testquestion.type", ds);
            ddlQuestionType.Items.Insert(0, new ListItem { Text = "", Value = "" });

            EmcCommon.SetBaseDataDropDownList(ddlQuestionType2, "weixin.activity.testquestion.type", ds);
            ddlQuestionType2.Items.Insert(0, new ListItem { Text = "", Value = "" });


            ds = bll.GetList("refobj='weixin.activity.testquestion.grade'");
            EmcCommon.SetBaseDataDropDownList(ddlGrade, "weixin.activity.testquestion.grade", ds);
            ddlGrade.Items.Insert(0, new ListItem { Text = "", Value = "" });

            EmcCommon.SetBaseDataDropDownList(ddlGrade2, "weixin.activity.testquestion.grade", ds);
            ddlGrade2.Items.Insert(0, new ListItem { Text = "", Value = "" });
        }

        protected void btnSearch_Click1(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Value.ToString());
            DropDownList ddlRightAnswer = (DropDownList)(GridView1.Rows[e.RowIndex].FindControl("ddlRightAnswer"));
            DropDownList ddlQuestionType = (DropDownList)(GridView1.Rows[e.RowIndex].FindControl("ddlQuestionType"));
            DropDownList ddlGrade = (DropDownList)(GridView1.Rows[e.RowIndex].FindControl("ddlGrade"));

            Model.WX_TestQuestion model = new Model.WX_TestQuestion();
            BLL.WX_TestQuestion bllorder = new BLL.WX_TestQuestion();
            model = bllorder.GetModel(RefID);
            if (model != null)
            {
                if (ddlRightAnswer.SelectedItem!=null && ddlRightAnswer.SelectedValue!="")
                {
                    model.RightAnswer = ddlRightAnswer.SelectedValue;
                }
                if (ddlQuestionType.SelectedItem != null && ddlQuestionType.SelectedValue != "") {
                    model.QuestionType = ddlQuestionType.SelectedValue;
                }
                if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "")
                {
                    model.Grade = ddlGrade.SelectedValue;
                }
            }
            bllorder.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void btnInport_Click(object sender, EventArgs e)
        {
            //调用  
            //获取上传文件名  
            string fileName = FileUpload1.FileName;
            //判断是否存在上传文件  
            if (FileUpload1.PostedFile.FileName.Length == 0)
            {
                //   Page.RegisterStartupScript("", "<mce:script type="text/javascript"><!--  
                //('请选择你要上传的Excel文件!!')  
                // --></mce:script>");  
                return;
            }
            //判断上传的文件类型是否正确  
            else if (!Path.GetExtension(FileUpload1.PostedFile.FileName).ToLower().Equals(".xls") && !Path.GetExtension(FileUpload1.PostedFile.FileName).ToLower().Equals(".xlsx"))
            {
                // Page.RegisterStartupScript("", "<script>//('很抱歉!你上传的文件类型不正确!只能上传Excel类型的文件!')</script.");  
            }
            else
            {
                //获取上传的文件路径  
                string filePath = Server.MapPath("TxtFiles\\") + DateTime.Now.ToString("yyyyMMddhhmmss") + fileName;
                FileUpload1.PostedFile.SaveAs(filePath); DataSet ds = null;
                try
                {
                    ds = ExcelHelper.GetDataSet(filePath);
                    InsertData(FileUpload1, ds);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(this.Page, ex.Message);
                }
            }
        }
        private  void InsertData(FileUpload f1, DataSet ds)
        {
            string strSQL = string.Empty; int w = 0; int f = 0; int d = 0;
            string msg = "";
            string sql = "";
            if (ds.Tables[0].Rows.Count > 0)
            {
                //sql = "update WX_TestQuestion set IsAct=0";
                //DbHelperSQL.ExecuteSql(sql);

                if (Session["dvkind"] == null)
                {
                    sql = "select * from dbo.Pub_BaseData where refobj like 'weixin.activity.testquestion%'";
                    dvkind = DBTools.GetList(sql).Tables[0].DefaultView;
                    Session["dvkind"] = dvkind;
                }
                else
                {
                    dvkind = (DataView)Session["dvkind"];
                }

                for (int j = 0; j < ds.Tables.Count; j++)
                {
                    #region
                    for (int i = 0; i < ds.Tables[j].Rows.Count; i++)
                    {
                        if (ds.Tables[j].Rows.Count >= 1)
                        {
                            DataRow dr = ds.Tables[j].Rows[i];
                            //试题  //正确答案 //答案1 //答案2//答案3//答案4
                            //问题类型  //等级//创建时间  
                            string testquestion = ""; string rightanswer = ""; string answer1 = ""; string answer2 = ""; string answer3 = "";
                            string answer4 = ""; string questiontype = ""; string grade = ""; string createdate = ""; 
                            if (dr.ItemArray[1].ToString() != "")
                            {
                                testquestion = dr["试题"].ToString().Trim().Replace("#", "﹍﹍﹍");
                                rightanswer = dr["正确答案"].ToString().Trim();
                                answer1 = dr["答案1"].ToString().Trim()+"/a";
                                answer2 = dr["答案2"].ToString().Trim() + "/b";
                                answer3 = dr["答案3"].ToString().Trim() + "/c";
                                answer4 = dr["答案4"].ToString().Trim() + "/d";
                                dvkind.RowFilter = "refobj='weixin.activity.testquestion.type' and refvalue='" + dr["试题类型"].ToString().Trim() + "'";
                                if (dvkind.Count > 0) {
                                    questiontype = dvkind[0]["refvaluecode"].ToString();
                                }
                                dvkind.RowFilter = "refobj='weixin.activity.testquestion.grade' and refvalue='" + dr["试题等级"].ToString().Trim() + "'";
                                if (dvkind.Count > 0) {
                                    grade = dvkind[0]["refvaluecode"].ToString();
                                }
                                createdate = DateTime.Now.ToString();

                                //SQL语句  
                                strSQL = "insert  into  WX_TestQuestion(TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct) Values('" + testquestion + "','" + rightanswer + "','" + answer1 + "','" + answer2 + "','" + answer3 + "','" + answer4 + "','" + questiontype + "','" + grade + "','" + createdate + "',1)";
                                try
                                {
                                    if (questiontype != "" && grade != "")
                                    {
                                        DbHelperSQL.ExecuteSql(strSQL);
                                        w += 1;
                                    }
                                    else {
                                        msg += "因第" + i + 1 + "行数据有误，此行数据没有导入成功！";
                                        f += 1;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    MessageBox.Show(this.Page,  ex.Message);
                                }
                            }
                        }
                    }
                    #endregion
                }
            }
            MessageBox.Show(this.Page, "一共导入成功数据" + w + "条，失败数据" + f + "条");
            BindData(GetWhere());
        }

        public string GetNameByValue(string refobj,string value)
        {
            if (Session["dvkind"] == null)
            {
                string sql = "select * from dbo.Pub_BaseData where refobj like 'weixin.activity.testquestion%'";
                dvkind = DBTools.GetList(sql).Tables[0].DefaultView;
                Session["dvkind"] = dvkind;
            }
            else {
                dvkind = (DataView)Session["dvkind"];
            }
            if (refobj == "weixin.activity.testquestion.type") {
                dvkind.RowFilter = "refobj='weixin.activity.testquestion.type' and refvaluecode='" +value+ "'";
            }
            else if (refobj == "weixin.activity.testquestion.grade") {
                dvkind.RowFilter = "refobj='weixin.activity.testquestion.grade' and refvaluecode='" + value + "'";
            }
            if (dvkind.Count > 0) {
                return dvkind[0]["refvalue"].ToString();
            }else{
                return "";
            }
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            string testquestion = "";
            if (txtTestQuestion.Text.Trim() != "")
            {
                testquestion = txtTestQuestion.Text;
            }
            string questiontype = "";
            if (ddlQuestionType.SelectedItem!= null && ddlQuestionType.SelectedValue!="")
            {
                questiontype = ddlQuestionType.SelectedValue;
            }
            string grade = "";
            if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "")
            {
                grade = ddlGrade.SelectedValue;
            }
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            DataSet ds = bll.GetList(testquestion, questiontype, grade);
            ExcelHelper helper = new ExcelHelper();
            string fileName = "试题("+string.Format("{0:yyyyMMdd}",DateTime.Now)+").xls";
            helper.DtToExcel(ds, "ds", true, fileName);
        }

        protected void Button4_Click(object sender, EventArgs e)
        {
            ClearForm();
            BindData2("");
            updateset.Attributes.CssStyle.Add("display", "block");
        }

        protected void GridView2_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                if (Session["dvkind"] == null)
                {
                    string sql = "select * from dbo.Pub_BaseData where refobj like 'weixin.activity.testquestion%'";
                    dvkind = DBTools.GetList(sql).Tables[0].DefaultView;
                    Session["dvkind"] = dvkind;
                }
                else
                {
                    dvkind = (DataView)Session["dvkind"];
                }
                DropDownList ddlQuestionType = (DropDownList)e.Row.FindControl("ddlQuestionType");
                if (ddlQuestionType != null)
                {
                    dvkind.RowFilter = "refobj='weixin.activity.testquestion.type'";
                    if (dvkind.Count > 0)
                    {
                        ddlQuestionType.Items.Clear();
                        for (int i = 0; i < dvkind.Count; i++)
                        {
                            ListItem listItem = new ListItem { Text = dvkind[i]["refvalue"].ToString(), Value = dvkind[i]["refvaluecode"].ToString() };
                            ddlQuestionType.Items.Add(listItem);
                        }
                    }
                }
                DropDownList ddlGrade = (DropDownList)e.Row.FindControl("ddlGrade");
                if (ddlGrade != null)
                {
                    dvkind.RowFilter = "refobj='weixin.activity.testquestion.grade'";
                    if (dvkind.Count > 0)
                    {
                        ddlGrade.Items.Clear();
                        for (int i = 0; i < dvkind.Count; i++)
                        {
                            ListItem listItem = new ListItem { Text = dvkind[i]["refvalue"].ToString(), Value = dvkind[i]["refvaluecode"].ToString() };
                            ddlGrade.Items.Add(listItem);
                        }
                    }
                }
                if (e.Row.RowIndex == GridView2.EditIndex)
                {
                    ddlQuestionType = (DropDownList)e.Row.FindControl("ddlQuestionType");
                    ddlQuestionType.Items.FindByValue(((Label)e.Row.FindControl("lblQuestionType")).Text).Selected = true;
                    ddlGrade = (DropDownList)e.Row.FindControl("ddlGrade");
                    ddlGrade.Items.FindByValue(((Label)e.Row.FindControl("lblGrade")).Text).Selected = true;
                }
            }
        }

        protected void GridView2_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView2.EditIndex = -1;
            BindData2("");
        }

        protected void GridView2_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView2.DataKeys[e.RowIndex].Value.ToString());
            DropDownList ddlQuestionType = (DropDownList)(GridView2.Rows[e.RowIndex].FindControl("ddlQuestionType"));
            DropDownList ddlGrade = (DropDownList)(GridView2.Rows[e.RowIndex].FindControl("ddlGrade"));
            
            TextBox txtEveryTime = (TextBox)(GridView2.Rows[e.RowIndex].FindControl("txtEveryTime"));
            TextBox txtAmount = (TextBox)(GridView2.Rows[e.RowIndex].FindControl("txtAmount"));
            TextBox txtUpperLimit = (TextBox)(GridView2.Rows[e.RowIndex].FindControl("txtUpperLimit"));

            Model.WX_TestQuestionGrade model = new Model.WX_TestQuestionGrade();
            BLL.WX_TestQuestionGrade bllorder = new BLL.WX_TestQuestionGrade();
            model = bllorder.GetModel(RefID);
            if (model != null)
            {
                if (ddlQuestionType.SelectedItem != null && ddlQuestionType.SelectedValue != "")
                {
                    model.QuestionType = ddlQuestionType.SelectedValue;
                }
                if (ddlGrade.SelectedItem != null && ddlGrade.SelectedValue != "")
                {
                    model.Grade = ddlGrade.SelectedValue;
                }
                if (SfSoft.Common.PageValidate.IsNum(txtEveryTime.Text)) {
                    model.EveryTime = int.Parse(txtEveryTime.Text);
                }
                if (SfSoft.Common.PageValidate.IsNum(txtAmount.Text))
                {
                    model.Amount = int.Parse(txtAmount.Text);
                }
                if (SfSoft.Common.PageValidate.IsNum(txtUpperLimit.Text))
                {
                    model.UpperLimit = int.Parse(txtUpperLimit.Text);
                }
            }
            bllorder.Update(model);
            GridView2.EditIndex = -1;
            BindData2("");
        }

        protected void GridView2_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView2.EditIndex = e.NewEditIndex;
            BindData2("");
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            BLL.WX_TestQuestionGrade bll = new BLL.WX_TestQuestionGrade();
            Model.WX_TestQuestionGrade model = new Model.WX_TestQuestionGrade();
            model.Amount =int.Parse(txtAmount.Text);
            model.EveryTime =int.Parse(txtEveryTime.Text);
            model.Grade = ddlGrade2.SelectedValue;
            model.IsActTime=cbIsActTime.Checked==true?1:0;
            model.QuestionType = ddlQuestionType2.SelectedValue;
            model.UpperLimit =int.Parse(txtUpperLimit.Text);
            int index= bll.Add(model);
            if (index != 0) {
                ClearForm();
            }
            BindData2("");
        }
        private string checkform()
        {
            string strErr = "";
            if (this.txtEveryTime.Text == "")
            {
                strErr += "答案时间不能为空！\\n";
            }
            if (this.txtAmount.Text == "")
            {
                strErr += "多少题目不能为空！\\n";
            }
            if (this.txtUpperLimit.Text == "")
            {
                strErr += "达标不能为空！\\n";
            }
            if (ddlQuestionType2.SelectedItem == null || ddlQuestionType2.SelectedValue == "")
            {
                strErr += "请选择试题类型！\\n";
            }
            if (ddlGrade2.SelectedItem == null || ddlGrade2.SelectedValue == "")
            {
                strErr += "请选择试题等级！\\n";
            }
            return strErr;
        }
        private void ClearForm()
        {
            ddlQuestionType2.SelectedValue = "";
            ddlGrade2.SelectedValue = "";
            txtAmount.Text = "";
            txtEveryTime.Text = "";
            txtUpperLimit.Text = "";
        }

        protected void Button3_Click(object sender, EventArgs e)
        {
            string ID = EmcCommon.GetCheckedDataKey(GridView2, 0, true);
            if (ID == "")
            {
                return;
            }
            BLL.WX_TestQuestionGrade bll = new BLL.WX_TestQuestionGrade();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_TestQuestionGrade modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            BindData2("");
        }
    }
}


