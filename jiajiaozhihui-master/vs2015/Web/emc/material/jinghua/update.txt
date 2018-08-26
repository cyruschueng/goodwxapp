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
namespace SfSoft.web.emc.material.jinghua
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_JingHua modelArts = new SfSoft.Model.WX_JingHua();
        BLL.WX_JingHua bllArts = new BLL.WX_JingHua();
        BLL.Pub_BaseData baseDataBll = new BLL.Pub_BaseData();
        Model.Pub_BaseData baseDataModel = new Model.Pub_BaseData();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.material.jinghua";
                InitData();
                InitListBox();
                //新建
                if (hfMode.Value == "add")
                {
                    rblImgType.Items.FindByValue("2").Selected = true;
                    localUrl.Visible = true;
                    remoteUrl.Visible = false;
                    txtReleaseDate.Text = string.Format("{0:yyyyy-MM-dd HH:mm:ss}", DateTime.Now);
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
            hfMID.Value = "emc.material.jinghua";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_JingHua model)
        {
            txtTitle.Text = model.Title;
            if (model.GroupTitle != null && model.GroupTitle != "") {
                ddlGroupTitle.Items.FindByValue(model.GroupTitle).Selected = true;
            }
            if (model.ArticleType != null) {
                ddlArticleType.Items.FindByValue(model.ArticleType.ToString()).Selected = true;
            }
            txtDetail.Value = model.Detail;
            txtArticleUrl.Text = model.ArticleUrl;
            if (model.ImgUrl.StartsWith("http"))
            {
                rblImgType.SelectedValue = "1";
                localUrl.Visible = false;
                remoteUrl.Visible = true;
                txtImgUrl.Text = model.ImgUrl;
            }
            else {
                rblImgType.SelectedValue = "2";
                localUrl.Visible = true;
                remoteUrl.Visible = false;
                if (model.ImgUrl.Trim() != "")
                {
                    imgLogo.ImageUrl = model.ImgUrl;
                    imgLogo.Visible = true;
                    btnDeleLogo.Visible = true;
                    fileLogo.Visible = false;
                }
                else
                {
                    imgLogo.Visible = false;
                    btnDeleLogo.Visible = false;
                    fileLogo.Visible = true;
                }
            }
            txtReleaseDate.Text = model.ReleaseDate.HasValue == true ? string.Format("{0:yyyy-MM-dd HH:mm:ss}", model.ReleaseDate) : "";
            txtOrder.Text = model.Order.ToString();
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
            Model.WX_JingHua model = new Model.WX_JingHua();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.IsHead = 0;
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

        private Model.WX_JingHua SetModelValue(Model.WX_JingHua model)
        {
            model.Title = txtTitle.Text;
            if (ddlGroupTitle.SelectedItem != null && ddlGroupTitle.SelectedValue != "") {
                model.GroupTitle = ddlGroupTitle.SelectedValue;
            }
            if (txtOrder.Text != "") {
                model.Order = int.Parse(txtOrder.Text);
            }
            model.ArticleUrl = txtArticleUrl.Text;
            if (ddlArticleType.SelectedItem != null && ddlArticleType.SelectedValue != "") {
                model.ArticleType =int.Parse(ddlArticleType.SelectedValue);
            }
            model.Detail = txtDetail.Value;
            if (rblImgType.SelectedValue == "1")
            {
                model.ImgUrl = txtImgUrl.Text;
            }
            else {
                model.ImgUrl = UploadImg(fileLogo, model.ImgUrl);
                if (model.ImgUrl != "")
                {
                    imgLogo.ImageUrl = model.ImgUrl;
                    fileLogo.Visible = false;
                    imgLogo.Visible = true;
                    btnDeleLogo.Visible = true;
                }
            }
            if (!string.IsNullOrEmpty(txtReleaseDate.Text))
            {
                model.ReleaseDate = DateTime.Parse(txtReleaseDate.Text);
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtTitle.Text == "") {
                strErr += "文章标题不能为空！\\n";
            }
            if (ddlGroupTitle.SelectedItem == null && ddlGroupTitle.SelectedValue=="") {
                strErr += "请选择组名称！\\n";
            }
            if (ddlArticleType.SelectedValue == "" && ddlArticleType.SelectedItem == null)
            {
                strErr += "请选择类别！\\n";
            }
            return strErr;
        }

        private void InitData()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            //DataSet ds = bll.GetList("refobj='weixin.material.jinghua.groupname'");
            DataSet ds = bll.GetList(50, "refobj='weixin.material.jinghua.groupname'", "RefID desc");
            EmcCommon.SetBaseDataDropDownList(ddlGroupTitle, "weixin.material.jinghua.groupname", ds);
            ListItem li = new ListItem();
            li.Text = "";
            li.Value = "";
            ddlGroupTitle.Items.Insert(0, li);
        }
        private void InitListBox()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            //DataSet ds = bll.GetList( "refobj='weixin.material.jinghua.groupname'");
            DataSet ds = bll.GetList(50, "refobj='weixin.material.jinghua.groupname'", "RefID desc");
            cblGroup.DataTextField = "RefValue";
            cblGroup.DataValueField = "RefValueCode";
            cblGroup.DataSource = ds;
            cblGroup.DataBind();
        }

        protected void cblGroup_SelectedIndexChanged(object sender, EventArgs e)
        {
            string s = Request.Form["__EVENTTARGET"];
            int index = Convert.ToInt32(s.Substring(s.LastIndexOf("$") + 1));
            bool selected = cblGroup.Items[index].Selected;
            for(int i=0;i<cblGroup.Items.Count;i++){
                if (i != index) {
                    cblGroup.Items[i].Selected = false;
                }
            }
            if (selected)
            {
                txtGroup.Text = cblGroup.Items[index].Text;
                edit.Text = "修改";
                edit.CommandArgument = "update";
                Session["selectedindex"] = index;
            }
            else {
                txtGroup.Text = "";
                edit.Text = "新增";
                edit.CommandArgument = "add";
            }
        }

        protected void edit_Click(object sender, EventArgs e)
        {
            if (txtGroup.Text.Trim() == "") {
                MessageBox.Show(this, "栏目组名称不能为空");
                return;
            }
            if (edit.CommandArgument == "add")
            {
                Model.Pub_BaseData model = new Model.Pub_BaseData();
                model.FilialeID = "4";
                model.IsAct = "1";
                model.IsSystem = "0";
                int index = GetMaxIndex()+1;
                model.OrderID = index;
                model.RefObj = "weixin.material.jinghua.groupname";
                model.RefPID = 0;
                model.RefValue = txtGroup.Text;
                model.RefValue_e = "Null";
                model.RefValueCode = index.ToString();
                baseDataBll.Add(model);
                MessageBox.Show(this, "添加成功！");
            }
            else {
                int index =int.Parse(Session["selectedindex"].ToString());
                SetModel(cblGroup.Items[index].Value);
                baseDataModel.RefValue = txtGroup.Text;
                baseDataBll.Update(baseDataModel);
                MessageBox.Show(this, "修改成功！");
            }
            txtGroup.Text = "";
            edit.CommandArgument = "add";
            edit.Text = "新增";
            InitListBox();
            InitData();
        }
        private int GetMaxIndex()
        {
            string sql = "select top 1 * from Pub_BaseData where RefObj='weixin.material.jinghua.groupname' order by OrderID desc";
            DataSet ds=DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return int.Parse(ds.Tables[0].Rows[0]["RefvalueCode"].ToString());
            }
            return 0;
        }
        private void SetModel(string code)
        {
            string sql = "select top 1 * from Pub_BaseData where RefObj='weixin.material.jinghua.groupname' and RefValueCode='" + code + "'";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                baseDataModel.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                baseDataModel.IsAct = ds.Tables[0].Rows[0]["IsAct"].ToString();
                baseDataModel.IsSystem = ds.Tables[0].Rows[0]["IsSystem"].ToString();
                baseDataModel.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                baseDataModel.RefID = int.Parse(ds.Tables[0].Rows[0]["RefID"].ToString());
                baseDataModel.RefObj = ds.Tables[0].Rows[0]["RefObj"].ToString();
                baseDataModel.RefPID = int.Parse(ds.Tables[0].Rows[0]["RefPID"].ToString());
                baseDataModel.RefValue = ds.Tables[0].Rows[0]["RefValue"].ToString();
                baseDataModel.RefValue_e = ds.Tables[0].Rows[0]["RefValue_e"].ToString();
                baseDataModel.RefValueCode = ds.Tables[0].Rows[0]["RefValueCode"].ToString();

            }
            else {
                baseDataModel = null;
            }
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.ImgUrl != "" || modelArts.ImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.ImgUrl);
                modelArts.ImgUrl = "";
                bllArts.Update(modelArts);
                imgLogo.ImageUrl = modelArts.ImgUrl;
                fileLogo.Visible = true;
                btnDeleLogo.Visible = true;
                imgLogo.Visible = false;
            }
        }
        private string UploadImg(FileUpload fileUpload, string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "jinhua/";
            if (fileUpload.FileName != "")
            {
                if (imgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(imgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;
                return FilePath;
            }
            return imgUrl;
        }

        protected void rblImgType_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (rblImgType.SelectedValue == "1")
            {
                localUrl.Visible = false;
                remoteUrl.Visible = true;
            }
            else {
                localUrl.Visible = true;
                remoteUrl.Visible = false;
            }
        }
    }
}


