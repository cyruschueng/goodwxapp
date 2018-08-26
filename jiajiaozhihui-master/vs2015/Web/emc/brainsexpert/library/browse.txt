using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
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
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        Dictionary<string, string> QuestionClassIDDictionary =new Dictionary<string,string>();
        Dictionary<string, string> QuestionTypeDictionary = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();
                InitDropDownList();
                InitCheckBoxList();
                if (Session["ddlclass1"] != null && Session["ddlclass1"].ToString()!="")
                {
                    ddlClass1.SelectedValue = Session["ddlclass1"].ToString();
                    LoadddlClass1(ddlClass1.SelectedValue);
                }
                if (Session["ddlclass2"] != null && Session["ddlclass2"].ToString() != "")
                {
                    ddlClass2.SelectedValue = Session["ddlclass2"].ToString();
                }
                if (Session["cbltype"] != null && Session["cbltype"].ToString() != "")
                {
                    string[] items = Session["cbltype"].ToString().Split(new char[] {','});
                    for (int i = 0; i < items.Length; i++) {
                        cblType.Items.FindByValue(items[i].ToString()).Selected = true;
                    }
                }
                if (Session["cblgrade"] != null && Session["cblgrade"].ToString() != "")
                {
                    string[] items = Session["cblgrade"].ToString().Split(new char[] { ',' });
                    for (int i = 0; i < items.Length; i++)
                    {
                        cblGrade.Items.FindByValue(items[i].ToString()).Selected = true;
                    }
                }

                BindData(GetWhere());
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.brainsexpert.library";
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
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_TestQuestion modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            GetQuestionClassIDDictionary();
            GetQuestionTypeDictionary();
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
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            GetQuestionClassIDDictionary();
            GetQuestionTypeDictionary();
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1";
            if (ddlClass2.SelectedValue != "" && ddlClass2.SelectedItem != null) {
                strWhere += " and classid='" +ddlClass2.SelectedValue +"'";
            }
            string typewhere = "";
            if (cblType.SelectedItem != null && cblType.SelectedValue != "") {
                foreach (ListItem m in cblType.Items) {
                    if (m.Selected == true) {
                        typewhere += "QuestionType=" + m.Value+" or ";    
                    }
                }
                if(typewhere.Length!=0){
                    typewhere=typewhere.Substring(0,typewhere.Length-4);
                }
                strWhere += " and (" + typewhere+")";
            }

            string gradewhere = "";
            if (cblGrade.SelectedItem != null && cblGrade.SelectedValue != "")
            {
                foreach (ListItem m in cblGrade.Items)
                {
                    if (m.Selected == true)
                    {
                        gradewhere += "Grade=" + m.Value + " or ";
                    }
                }
                if (gradewhere.Length != 0)
                {
                    gradewhere = gradewhere.Substring(0, gradewhere.Length - 4);
                }
                strWhere += " and (" + gradewhere + ")";
            }
            
            return strWhere;
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow) {
                string classid = e.Row.Cells[6].Text;
                if (classid != "&nbsp;" && classid != "") {
                    e.Row.Cells[6].Text = (string)QuestionClassIDDictionary[classid];
                }
                string type = e.Row.Cells[5].Text;
                if (type != "&nbsp;" && type != "")
                {
                    e.Row.Cells[5].Text = (string)QuestionTypeDictionary[type];
                }
                string grade = e.Row.Cells[7].Text;
                if (grade != "&nbsp;" && grade != "")
                {
                    string value = "";
                    if (grade == "1") value = "易";
                    if (grade == "2") value = "中";
                    if (grade == "3") value = "难";
                    e.Row.Cells[7].Text = value;
                }

                HiddenField hfType = (HiddenField)e.Row.FindControl("hfType");
                Image img =(Image)e.Row.FindControl("imgShow");
                if (hfType.Value != "2") {
                    img.Attributes.CssStyle.Add("display", "none");
                }
                //string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                //e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";  
            }
        }
        /// <summary>
        /// 获取题库分类
        /// </summary>
        private void GetQuestionClassIDDictionary()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj  like 'wx.questionSorted%'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                QuestionClassIDDictionary.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    QuestionClassIDDictionary.Add(dr["Refobj"].ToString() + "_" + dr["RefValueCode"].ToString(), dr["RefValue"].ToString());
                }  
            }
        }

        /// <summary>
        /// 获取题库分类
        /// </summary>
        private void GetQuestionTypeDictionary()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj = 'weixin.activity.testquestion.type'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                QuestionTypeDictionary.Clear();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    QuestionTypeDictionary.Add(dr["RefValueCode"].ToString(), dr["RefValue"].ToString());
                }
            }
        }

        /// <summary>
        /// 导入数据
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnInport_Click(object sender, EventArgs e)
        {
            if (ddlClass2.Items == null || ddlClass2.SelectedValue == "")
            { 
                MessageBox.Show(this,"请选择要导入到哪个题库中！"); 
                return;
            }
            if (this.cblAll.Items == null || cblAll.SelectedValue == "")
            {
                MessageBox.Show(this, "请选择要导入方式！");
                return;
            }
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
                    GetQuestionClassIDDictionary();
                    GetQuestionTypeDictionary();
                    InsertData(FileUpload1, ds);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(this.Page, ex.Message);
                }
                finally {
                    File.Delete(filePath);
                }
            }
        }
        private void InsertData(FileUpload f1, DataSet ds)
        {
            string strSQL = string.Empty; int errorRow = 0;
            string msg = "";
            string sql = "";
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (cblAll.SelectedValue == "1")
                {
                    sql = "delete WX_TestQuestion where classid='" + this.ddlClass2.SelectedValue + "'";
                    DBUtility.DbHelperSQL.ExecuteSql(sql);
                }
                
                for (int j = 0; j < ds.Tables.Count; j++)
                {
                    #region
                    for (int i = 0; i < ds.Tables[j].Rows.Count; i++)
                    {
                        if (ds.Tables[j].Rows.Count >= 1)
                        {
                            DataRow dr = ds.Tables[j].Rows[i];
                            if (dr.ItemArray[1].ToString() != "")
                            {
                                if (cblAll.SelectedValue == "2")
                                {
                                    sql = "select * from WX_TestQuestion where testquestion='" + dr["试题"].ToString().Trim() + "' and ClassID='" + ddlClass2.SelectedValue + "'";
                                    if (DBUtility.DbHelperSQL.Exists(sql))
                                    {
                                        errorRow += 1;
                                    }
                                    else {
                                        msg=AddNewData(dr,i);
                                    }
                                }
                                else {
                                    msg=AddNewData(dr,i);
                                }
                            }
                        }
                    }
                    #endregion
                }
            }
            if (errorRow != 0) {
                msg += "数据重复未导入"+errorRow.ToString()+"条\\n";
            }
            MessageBox.Show(this.Page, msg);
            BindData(GetWhere());
        }
        string msg = ""; int rightRow = 0; int errorRow = 0; string errorMsg = "";
        private string  AddNewData(DataRow dr,int row)
        {
            //试题  //正确答案 //答案1 //答案2//答案3//答案4
            //问题类型  //等级//创建时间  
            string testquestion = ""; string rightanswer = ""; string answer1 = ""; string answer2 = ""; string answer3 = "";
            string answer4 = ""; string questiontype = ""; string grade = ""; string createdate = ""; string track_v2 = "";
            string classid = ""; 

            testquestion = dr["试题"].ToString().Trim();
            rightanswer = dr["正确答案"].ToString().Trim();
            answer1 = dr["答案1(A)"].ToString().Trim() + "/a";
            answer2 = dr["答案2(B)"].ToString().Trim() + "/b";
            answer3 = dr["答案3(C)"].ToString().Trim() + "/c";
            answer4 = dr["答案4(D)"].ToString().Trim() + "/d";
            questiontype = GetDictionaryKey(QuestionTypeDictionary, dr["试题类型"].ToString().Trim());
            grade = dr["试题等级"].ToString();
            track_v2 = dr["曲目编码"].ToString();
            classid = ddlClass2.SelectedValue;
            createdate = DateTime.Now.ToString();

            //SQL语句  
            string  strSQL = "insert  into  WX_TestQuestion(TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct,Classid,Track_V2) Values('" + testquestion + "','" + rightanswer + "','" + answer1 + "','" + answer2 + "','" + answer3 + "','" + answer4 + "','" + questiontype + "','" + grade + "','" + createdate + "',1,'" + classid + "','" + track_v2 + "')";
            try
            {
                if (questiontype != "" && grade != "")
                {
                    SfSoft.DBUtility.DbHelperSQL.ExecuteSql(strSQL);
                    rightRow += 1;
                }
                else
                {
                    errorRow += 1;
                    errorMsg += "因第" + row + 1 + "行数据有误，此行数据没有导入成功！\\n";
                }
            }
            catch (Exception ex)
            {
                errorMsg += ex.Message+"\\n";
            }
            msg = "成功导入数据" + rightRow + "条。\\n 失败数据" + errorRow + "条。\\n"+errorMsg;
            return msg;
        }
        /// <summary>
        /// 通过Dictionary Value 找到相应的Key
        /// </summary>
        /// <param name="dictionary"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        private string GetDictionaryKey(Dictionary<string, string> dictionary, string value)
        {
            foreach (var c in dictionary) {
                if (c.Value == value) {
                    return c.Key;
                }
            }
            return "";
        }
        private void InitDropDownList()
        {
            string sql = "select * from dbo.Pub_BaseData_Classc where parentcid like 'wx.questionSorted%' and classtype='D'";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    ddlClass1.Items.Add(new ListItem {
                        Value = dr["ClassID"].ToString(),
                        Text = dr["ClassName"].ToString()
                    });
                }
                ddlClass1.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
            }
        }
        private void InitCheckBoxList()
        {
            string sql = "select * from dbo.Pub_BaseData where refobj='weixin.activity.testquestion.type'";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    cblType.Items.Add(new ListItem
                    {
                        Value = dr["RefValueCode"].ToString(),
                        Text = dr["RefValue"].ToString()
                    });
                }
            }
        }
        protected void ddlClass1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass1.SelectedItem != null && ddlClass1.SelectedValue != "")
            {
                LoadddlClass1(ddlClass1.SelectedValue);
                Session["ddlclass1"] = ddlClass1.SelectedValue;
            }
            else {
                ddlClass2.Items.Clear();
                ddlClass2.Items.Insert(0, new ListItem { Text = "---请选择---", Value = "" });
            }
        }

        protected void ddlClass2_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlClass2.SelectedItem != null && ddlClass2.SelectedValue != "") {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();
                Session["ddlclass2"] = ddlClass2.SelectedValue;
                BindData(GetWhere());
            }
        }

        protected void cblType_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cblType.SelectedItem != null && cblType.SelectedValue != "") {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();
                string selectitem = "";
                foreach (ListItem m in cblType.Items) {
                    if (m.Selected == true) {
                        selectitem += m.Value + ",";
                    }
                }
                if (selectitem != "") {
                    selectitem = selectitem.Substring(0, selectitem.Length - 1);
                    Session["cbltype"] = selectitem;
                }
                
                BindData(GetWhere());
            }
        }
        private void LoadddlClass1(string selectvalue)
        {
            string sql = "select * from Pub_BaseData where RefObj='" + selectvalue  + "'";
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

        protected void cblGrade_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cblGrade.SelectedItem != null && cblGrade.SelectedValue != "")
            {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();
                string selectitem = "";
                foreach (ListItem m in cblGrade.Items)
                {
                    if (m.Selected == true)
                    {
                        selectitem += m.Value + ",";
                    }
                }
                if (selectitem != "")
                {
                    selectitem = selectitem.Substring(0, selectitem.Length - 1);
                    Session["cblgrade"] = selectitem;
                }
                BindData(GetWhere());
            }
        }
    }
}


