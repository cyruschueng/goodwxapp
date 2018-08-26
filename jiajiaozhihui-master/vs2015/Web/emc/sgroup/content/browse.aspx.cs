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

namespace SfSoft.web.emc.sgroup.content
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        private Dictionary<string, string> GroupTypeDictionary = new Dictionary<string, string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDDL();
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
            hfMID.Value = "emc.zxs.info";
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
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            string[] arrID = ID.Split(',');
            for (int i = 0; i < arrID.Length; i++)
            {
                int id = Common.Common.stringToInt(arrID[i].ToString());
                Model.WX_SGroup_Content modelMsn = bll.GetModel(id);
                modelMsn.IsDelete = 1;
                modelMsn.is_act = 0;
                bll.Update(modelMsn);
            }
            BindData(GetWhere());
            
        }
        private void BindData(string strWhere)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
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
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(GetWhere());
        }
        private string GetWhere()
        {
            string strWhere = "1=1";
            if (ddlGroup.SelectedItem != null && ddlGroup.SelectedValue != "") {
                strWhere += " and group_type="+ddlGroup.SelectedValue;
            }
            if (cbShowDelete.Checked == false)
            {
                strWhere += " and isnull(IsDelete,0)=0";
            }
            else {
                strWhere += " and isnull(IsDelete,0)=1";
            }
            if (cbIsAct.Checked == true) {
                strWhere += " and isnull(is_act,0)=1";
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
                string url = "update.aspx?ID=" + e.Row.Cells[1].Text + "&mode=update";
                string name =e.Row.Cells[1].Text;
                e.Row.Cells[1].Text = "<a href='" + url + "'><font color=#2828FF>" + name + "</font></a>";
                e.Row.Cells[3].Text = GetGroupName(e.Row.Cells[3].Text);

                e.Row.Cells[5].Text = e.Row.Cells[5].Text == "1" ? "有效" : "无效";

                if (e.Row.RowState == DataControlRowState.Edit)
                {
                    //TextBox txtStartUpDate = (TextBox)e.Row.Cells[3].FindControl("txtStartUpDate");
                    //txtStartUpDate.Attributes.Add("onfocus", "javascript:WdatePicker({isShowWeek:true,onpicked:function(){$dp.$('" + txtStartUpDate.ClientID + "').value=$dp.cal.getP('W','W');},errDealMode:3})");
                }
            }
            
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(GetWhere());
        }
        protected void BtnSearch_Click(object sender, EventArgs e)
        {

            BindData(GetWhere());

        }
        private void InitDDL()
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var list= bll.GetModelList("is_act=1");
            foreach (var m in list) {
                ddlGroup.Items.Add(new ListItem() {
                    Value=m.id.ToString(),
                    Text=m.group_name
                });
            }
            ddlGroup.Items.Insert(0, new ListItem() { Text="", Value="" });
        }
        private string GetGroupName(string  groupId)
        {
            if (string.IsNullOrEmpty(groupId)) return "";
            if (groupId == "&nbsp;") return "";
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var model= bll.GetModel(int.Parse( groupId));
            if (model != null) return model.group_name;
            return "";
        }

        protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            int RefID = Common.Common.stringToInt(GridView1.DataKeys[e.RowIndex].Values[0].ToString());
            var groupType= GridView1.DataKeys[e.RowIndex].Values[1].ToString();

            TextBox txtTitle = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtTitle"));
            TextBox txtClassName = (TextBox)(GridView1.Rows[e.RowIndex].FindControl("txtClassName"));
            if (IsValidClassName(txtClassName.Text.Trim()) == false) {
                Response.Write("<script> alert('不是有效的班级名称，请使用 1101至9999班级') </script>");
                return;
            }
            if (IsUsingClassName(txtClassName.Text.Trim(), groupType) == true) {
                Response.Write("<script> alert('当前班级名称已使用,请使用其它的 1101至9999班级') </script>");
                return;
            }
            Model.WX_SGroup_Content model = new Model.WX_SGroup_Content();
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();

            model = bll.GetModel(RefID);
            if (model != null)
            {
                if (txtTitle.Text != "")
                {
                    model.title = txtTitle.Text;
                }

                if (txtClassName.Text != "")
                {
                    model.class_name = txtClassName.Text;
                }
            }
            bll.Update(model);
            GridView1.EditIndex = -1;
            BindData(GetWhere());
        }

        protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView1.EditIndex = e.NewEditIndex;
            BindData(GetWhere());
        }
        private bool IsUsingClassName(string className,string groupType)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list= bll.GetModelList("class_name='" + className + "' and group_type="+ groupType);
            return list.Count > 1 ? true : false;
        }
        private bool IsValidClassName(string className)
        {
            var valid2 = true;
            var valid1=  Common.PageValidate.IsNumber(className);
            int v = 0;
            int.TryParse(className, out v);
            if (v < 1101 || v > 9999)
            {
                valid2 = false;
            }
            else {
                valid2 = true;
            }
            return valid1 && valid2;
        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            var argument= e.CommandArgument.ToString();
            var url = string.Format("{0}app/appstart/basic/baseinfo.ashx?redirect_url={1}?r=a=app001|h=start|id="+argument,App.Helper.WxBaseConfig.WebSite, App.Helper.WxBaseConfig.WebSite+"app/client/classregist");

            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model= bll.GetModel(int.Parse(argument));

            BLL.WX_SGroup b = new BLL.WX_SGroup();
            var m= b.GetModel(model.group_type??0);

            QRCode qr = new QRCode();

            var subFolder = string.Format("{0:yyyyMMdd}", DateTime.Now);
            var path = Server.MapPath("\\Files\\QR\\" + subFolder + "\\");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var fileName = path + argument + ".png";

            var result = qr.WriteBarcode(url, fileName);
            Manage.Common.CommonFile file = new Manage.Common.CommonFile();

            var buffer = file.ReadCommonFile(fileName);
            string name = "高级班学习注册码(" + m.group_name + "-"+model.title+").png";

            Response.AddHeader("content-disposition", "attachment;filename=" + name);
            Response.BinaryWrite(buffer);
            Response.Flush();

            Response.End();

        }
    }
}


