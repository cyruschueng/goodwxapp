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
using System.Text;

namespace SfSoft.web.emc.brainsexpert.activity
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        Dictionary<string, string> QuestionClassIDDictionary =new Dictionary<string,string>();
        Dictionary<string, string> QuestionStatusDictionary = new Dictionary<string, string>();
        public string HTMLActivityClass = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetQuestionClassIDDictionary();
                GetQuestionTypeDictionary();
                InitRadioButtonList();
                BindData(GetWhere());
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.brainsexpert.activity";
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
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_TestQuestion_Activity modelMsn = bll.GetModel(id);
                bll.Delete(id);
            }
            GetQuestionClassIDDictionary();
            GetQuestionTypeDictionary();
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
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
            if (txtActivityName.Text != "") {
                strWhere += " and ActivityName like '%"+txtActivityName.Text +"%'";
            }
            if (rblIsAct.SelectedItem != null && rblIsAct.SelectedValue != "2") {
                if (rblIsAct.SelectedValue == "0") {
                    strWhere += " and isnull(IsAct,0)=0";
                }
                else if (rblIsAct.SelectedValue == "1") {
                    strWhere += " and isnull(IsAct,0)=1";
                }
            }
            if (rblStatus.SelectedItem != null && rblStatus.SelectedValue != "") {
                strWhere += " and Status=" + rblStatus.SelectedValue;
            }
            return strWhere;
        }
        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow) {
                string classid = e.Row.Cells[3].Text;
                if (classid != "&nbsp;") {
                    e.Row.Cells[3].Text = (string)QuestionClassIDDictionary[classid];
                }
                string status = e.Row.Cells[4].Text;
                if (status != "&nbsp;")
                {
                    e.Row.Cells[4].Text = (string)QuestionStatusDictionary[status];
                }
                string isact = e.Row.Cells[7].Text;
                e.Row.Cells[7].Text = isact == "1" ? "启用" : "禁用";
                string url = "update.aspx?ID=" + GridView1.DataKeys[e.Row.RowIndex].Value + "&mode=update";
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + e.Row.Cells[2].Text + "</font></a>";  
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
            DataSet ds = bll.GetList("refobj = 'weixin.activity.testquestion.Status'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    QuestionStatusDictionary.Add(dr["RefValueCode"].ToString(), dr["RefValue"].ToString());
                }
            }
        }

        private void InitRadioButtonList()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("RefObj='weixin.activity.testquestion.status'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    rblStatus.Items.Add(new ListItem
                    {
                        Text = dr["RefValue"].ToString(),
                        Value = dr["RefValueCode"].ToString()
                    });
                }
                rblStatus.Items.Insert(0, new ListItem { Value = "", Text = "所有" , Selected= true });
            }
        }
        /*
        protected void btnOK_Click(object sender, EventArgs e)
        {
            Model.WX_TestQuestion_Activity_Class model = new Model.WX_TestQuestion_Activity_Class();
            if (ddlParentClass0.SelectedItem != null && ddlParentClass0.SelectedValue != "")
            {
                model.PID = int.Parse(ddlParentClass0.SelectedValue);
                model.ClassType = 1;
            }
            else {
                model.PID = 0;
                model.ClassType = 0;
            }
            model.ClassName = txtClassName.Text;
            model.IsAct = 1;
            BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
            int index=bll.Add(model);
            if (model.ClassType == 1)
            {
                ddlParentClass1.Items.Add(new ListItem() { Text = txtClassName.Text, Value = index.ToString() });
                if (ddlParentClass1.Items.Count == 1) {
                    ddlParentClass1.Items.Insert(0, new ListItem { Value = "", Text = "----请选择----" });
                }
                ddlParentClass1.Attributes.Add("style", "display:block");
            }
            else {
                ddlParentClass0.Items.Add(new ListItem() { Text = txtClassName.Text, Value = index.ToString() });
            }
            txtClassName.Text = "";
        }

        protected void ddlParentClass0_SelectedIndexChanged(object sender, EventArgs e)
        {
            string selectvalue = ddlParentClass0.SelectedValue;
            if (selectvalue != "")
            {
                BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
                DataSet ds = bll.GetList("PID=" + selectvalue + " and isact=1");
                ddlParentClass1.Items.Clear();
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        ddlParentClass1.Items.Add(new ListItem()
                        {
                            Text = dr["ClassName"].ToString(),
                            Value = dr["ID"].ToString()
                        });
                    }
                    ddlParentClass1.Items.Insert(0, new ListItem { Value = "", Text = "----请选择----" });
                    ddlParentClass1.Attributes.Add("style","display:block");
                }
                else
                {
                    ddlParentClass1.Items.Clear();
                    ddlParentClass1.Attributes.Add("style", "display:none");
                }
            }
            else {
                ddlParentClass1.Attributes.Add("style", "display:none");
            }
        }

        protected void btnShowActivity_Click(object sender, EventArgs e)
        {
            activityclass.Attributes.CssStyle.Add("display","block");
        }
        */

        private void GetActivityClass()
        {
            BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
            DataSet ds = bll.GetList("ClassType=0 and isnull(IsAct,0)=1");
            DataSet dsDetail = bll.GetList("ClassType=1 and isnull(IsAct,0)=1");

            StringBuilder sb = new StringBuilder();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    sb.Append("<li>");
                    sb.Append("<span><i class='icon-folder-open'></i>" + dr["ClassName"].ToString() + "</span>");
                    string detail= GetActivityClassDetail(dsDetail, dr["ID"].ToString());
                    sb.Append(detail);
                    sb.Append("</li>");
                }
                HTMLActivityClass = sb.ToString();
            }
        }
        private string GetActivityClassDetail(DataSet ds,string pid)
        {
            StringBuilder sb = new StringBuilder();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                DataView dv = ds.Tables[0].DefaultView;
                dv.RowFilter = "PID="+pid;
                if (dv.Count > 0) {
                    sb.Append("<ul>");
                    for (int i = 0; i < dv.Count; i++) {
                        sb.Append("<li>");
                        sb.Append("<a href='browse.aspx?classid=" + dv[i]["ID"].ToString() + "'><span><i class='icon-leaf'></i> " + dv[i]["ClassName"].ToString() + "</span> </a>");
                        sb.Append("</li>");
                    }
                    sb.Append("</ul>");
                }
            }
            return sb.ToString();
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            GetQuestionClassIDDictionary();
            GetQuestionTypeDictionary();
            BindData(GetWhere());
        }
    }
}


