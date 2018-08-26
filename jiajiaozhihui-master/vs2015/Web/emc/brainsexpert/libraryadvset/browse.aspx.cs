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
using System.Collections.Generic;
using SfSoft.SfEmc;

namespace SfSoft.web.emc.brainsexpert.libraryadvset
{
    public partial class browse : SfSoft.SfEmc.EmcBasePage
    {
        public string HTMLLibrary = "";
        Dictionary<string, string> QuestionClassIDDictionary = new Dictionary<string, string>();
        Dictionary<string, string> QuestionTypeDictionary = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                InitCheckBoxList();
                InitDropDownList();
                BindData(GetWhere());
            }
        }

        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.brainsexpert.libraryadvset";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.brainsexpert.libraryadvset.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        private void InitCheckBoxList()
        {
            BLL.Pub_BaseData_Classc bllDataClass = new BLL.Pub_BaseData_Classc();
            DataSet ds = bllDataClass.GetList("ParentCID like 'wx.questionSorted%' and ClassType='D'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count>0) {
                cblMainLibrary.DataTextField = "ClassName";
                cblMainLibrary.DataValueField = "ClassID";
                cblMainLibrary.DataSource = ds;
                cblMainLibrary.DataBind();
            }

            BLL.Pub_BaseData bllData = new BLL.Pub_BaseData();
            ds = bllData.GetList("RefObj='weixin.activity.testquestion.type'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                cblQuestionType.DataTextField = "RefValue";
                cblQuestionType.DataValueField = "RefValueCode";
                cblQuestionType.DataSource = ds;
                cblQuestionType.DataBind();

                foreach (ListItem list in cblQuestionType.Items) {
                    list.Selected = true;
                }
            }

            BLL.Pub_BaseData bllGrade = new BLL.Pub_BaseData();
            ds = bllData.GetList("RefObj='weixin.activity.testquestion.grade'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                cblGrade.DataTextField = "RefValue";
                cblGrade.DataValueField = "RefValueCode";
                cblGrade.DataSource = ds;
                cblGrade.DataBind();

                foreach (ListItem list in cblGrade.Items)
                {
                    list.Selected = true;
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

        protected void cblMainLibrary_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cblMainLibrary.SelectedItem != null && cblMainLibrary.SelectedValue != "")
            {
                string selectItems = "";
                foreach (ListItem m in cblMainLibrary.Items)
                {
                    if (m.Selected == true)
                    {
                        selectItems += "'" + m.Value + "'" + ",";
                    }
                }
                if (selectItems.Length != 0)
                {
                    selectItems = selectItems.Substring(0, selectItems.Length - 1);
                }
                BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
                DataSet ds = bll.GetList("RefObj in (" + selectItems + ")");
                cblDetailLibrary.Items.Clear();
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        cblDetailLibrary.Items.Add(new ListItem()
                        {
                            Value = dr["RefObj"].ToString() + "_" + dr["RefValueCode"].ToString(),
                            Text = dr["RefValue"].ToString()
                        });
                    }
                }
            }
            else {
                cblDetailLibrary.Items.Clear();
            }
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
        private string GetWhere()
        {
            string strWhere = "1=1 and isnull(IsAct,0)=1 ";
            
            string classwhere = "";
            if (cblDetailLibrary.SelectedItem != null && cblDetailLibrary.SelectedValue != "")
            {
                foreach (ListItem m in cblDetailLibrary.Items)
                {
                    if (m.Selected == true)
                    {
                        classwhere += "ClassID='" + m.Value + "' or ";
                    }
                }
                if (classwhere.Length != 0)
                {
                    classwhere = classwhere.Substring(0, classwhere.Length - 4);
                }
                strWhere += " and (" + classwhere + ")";
            }
            string typewhere = "";
            if (cblQuestionType.SelectedItem != null && cblQuestionType.SelectedValue != "")
            {
                foreach (ListItem m in cblQuestionType.Items)
                {
                    if (m.Selected == true)
                    {
                        typewhere += "QuestionType=" + m.Value + " or ";
                    }
                }
                if (typewhere.Length != 0)
                {
                    typewhere = typewhere.Substring(0, typewhere.Length - 4);
                }
                strWhere += " and (" + typewhere + ")";
            }
            else {
                strWhere += " and 1<>1 ";
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
            else {
                strWhere += " and 1<>1 ";
            }
            return strWhere;
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();

                string classid = e.Row.Cells[6].Text;
                if (classid != "&nbsp;" && classid != "")
                {
                    e.Row.Cells[6].Text = (string)QuestionClassIDDictionary[classid];
                }
                string type = e.Row.Cells[5].Text;
                if (type != "&nbsp;" && type != "")
                {
                    e.Row.Cells[5].Text = (string)QuestionTypeDictionary[type];
                }
                string grade = e.Row.Cells[7].Text;
                if (grade == "1") {
                    e.Row.Cells[7].Text = "易";
                }
                else if (grade == "2") {
                    e.Row.Cells[7].Text = "中";
                }
                else if (grade == "3") {
                    e.Row.Cells[7].Text = "难";
                }
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
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            
            BindData(GetWhere());
        }

        protected void cblQuestionType_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void cblGrade_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void cblDetailLibrary_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
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

        protected void btnInport_Click(object sender, EventArgs e)
        {
            if (ddlClass2.SelectedItem == null && ddlClass2.SelectedValue == "") {
                Response.Write("<script>alert('请选择你要导入的题库!' );</script>");
                return;
            }
            int rightRow = 0;
            int errorRow = 0;
            string ID = EmcCommon.GetCheckedDataKey(GridView1, 0, true);
            if (ID == "")
            {
                Response.Write("<script>alert('请选择你要导入题库的数据!' );</script>");
                return;
            }
            BLL.WX_TestQuestion bll = new BLL.WX_TestQuestion();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_TestQuestion modelMsn = bll.GetModel(id);
                modelMsn.ClassID = ddlClass2.SelectedValue;
                string sql = "select * from WX_TestQuestion where testquestion='" + modelMsn.TestQuestion + "' and ClassID='" + ddlClass2 .SelectedValue+ "'";
                if (!DBUtility.DbHelperSQL.Exists(sql))
                {
                    bll.Add(modelMsn);
                    rightRow += 1;
                }
                else {
                    errorRow += 1;
                }
            }
            Response.Write("<script>alert('当前导入数据:" + rightRow.ToString() + "条，重复未导入数据:"+errorRow.ToString()+"' );</script>");
        }
    }
}


