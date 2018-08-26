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
using System.Collections.Generic;
using System.IO;
using System.Text;
namespace SfSoft.web.emc.QA.q
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        private List<Model.WX_JJZH_Expert> ExpertList = new List<Model.WX_JJZH_Expert>();
        protected void Page_Load(object sender, EventArgs e)
        {
            GetExpertList();
            if (!IsPostBack)
            {
                InitDropDownList();
                BindData(GetWhere());
            }
            else
            {
                Common.SetEmptyGridView.ResetGridView(this.GridView1);
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.qa.q";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
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
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_QA_File modelMsn = bll.GetModel(id);
                modelMsn.Status = 0;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
        }
        private void BindData(string strWhere)
        {

            string sql = "select * from( " +
                " select a.*,isnull(b.Quantity,0)as Quantity,c.UName from dbo.WX_QA_File a" +
                " left join (select ReadFileId,count(1) as Quantity from dbo.WX_QA_Comment group by ReadFileId) b on a.Id=b.ReadFileId"+
                " left join dbo.WX_JJZH_Expert c on a.Expert=c.Id"+
                ")a where " + strWhere;

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
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
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string startDate = "";
            string endDate = "";
            string strWhere = " 1=1";
            if (txtComment.Text != "") {
                strWhere += " and Comment like '%" + txtComment.Text + "%'";
            }
            if (txtStartDate.Text.Trim() == "")
            {
                startDate = "2000-01-01";
            }
            else {
                startDate = txtStartDate.Text;
            }
            if (txtEndDate.Text.Trim() == "")
            {
                endDate = "9999-01-01";
            }
            else {
                endDate = txtEndDate.Text;
            }
            strWhere += " and CreateDate between '"+startDate+"'and '"+endDate+"'";

            if (cbDele.Checked == true)
            {
                strWhere += " and  Status=0";
            }
            else {
                strWhere += " and  Status=1";
            }
            if (txtReplayNumber.Text != "") {
                strWhere += " and CommentNumber=" + txtReplayNumber.Text;
            }
            if (cbTop.Checked) {
                strWhere += " and IsTop=1";
            }
            if (txtExpert.Text != "") {
                strWhere += " and UName like '%"+txtExpert.Text+"%'";
            }
            strWhere += " order by Id desc";
            return strWhere;
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected new void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                string openId = GridView1.DataKeys[e.Row.RowIndex].Values[1].ToString();
                string url = "update.aspx?ID=" + e.Row.Cells[1].Text + "&openId="+openId+"&mode=update";
                
                string name = e.Row.Cells[2].Text.Length > 30 ? e.Row.Cells[2].Text.Substring(0, 30) + "..." : e.Row.Cells[2].Text;
                e.Row.Cells[2].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";
                
            }
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        private void InitDropDownList()
        {
            QuizzerList list = LoadQuizzer();
            foreach (var m in list.Items) {
                ddlQuizzer.Items.Add(new ListItem() { Text=m.NickName, Value=m.OpenId });
            };
            ddlQuizzer.Items.Insert(0, new ListItem() { Text="...选择提问者...",Value="" });
        }
        private QuizzerList LoadQuizzer()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("question.txt");
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                return Newtonsoft.Json.JsonConvert.DeserializeObject<QuizzerList>(json);
            }
        }
        private void Release()
        {
            if (ddlQuizzer.SelectedItem == null || ddlQuizzer.SelectedValue == "") {
                MessageBox.Show(this, "选择提问者");
                OperateSuccess = false;
                return;
            };
            if (txtQuestion.Text.Trim() == "" && txtQuestion.Text.Trim().Length<5) {
                MessageBox.Show(this, "问题不能为空且必须大于5个字");
                OperateSuccess = false;
                return;
            }

            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            Model.WX_QA_File model = new Model.WX_QA_File();
            model.AppId = "app001";
            model.Comment = txtQuestion.Text;
            model.CreateDate = DateTime.Now;
            model.OpenId = ddlQuizzer.SelectedValue;
            model.Expert = "";
            model.ExpertType = 0;
            model.Status = 1;
            model.IsNew = 1;
            bll.Add(model);
            MessageBox.Show(this, "发布完成！");
            OperateSuccess = true;
            txtQuestion.Text = "";
            BindData(GetWhere());
        }

        protected void btnQuestion_Click(object sender, EventArgs e)
        {
            Release();
        }
        private void GetExpertList()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            ExpertList = bll.GetModelList("");
        }

        protected void btnFind_Click(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            var name = e.CommandName;
            switch (name) { 
                case "like":
                    break;
                case "top":
                    break;
            }
        }
        
    }
}


