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
namespace SfSoft.web.emc.audio.list
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Audio modelArts = new SfSoft.Model.WX_Audio();
        BLL.WX_Audio bllArts = new BLL.WX_Audio();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                
                hfMode.Value = mode;
                hfID.Value = Request.QueryString["Id"];
                hfMID.Value = "emc.audio.list";

                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfID.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
                else {
                    InitCategory(ddlCategory1,0);
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.list";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Audio model)
        {
            ShowCategory(model.CategoryId ?? 0);
            if (model.Cover == "")
            {
                fileUpload.Visible = true;
                btnView.Visible = false;
                btnDelPic.Visible = false;
            }
            else {
                txtCover.Text = model.Cover;
                txtCover.Visible = true;
                fileUpload.Visible = false;
                btnView.Visible = true;
                btnView.NavigateUrl = model.Cover;
                btnDelPic.Visible = true;
            }
            txtFullName.Text = model.FullName;
            txtShortName.Text = model.ShortName;
            txtSinger.Text = model.Singer;
            txtSoundSource.Text = model.SoundSource;
            cbIsAct.Checked = (model.IsAct ?? 0) == 0 ? false : true;
            txtDuration.Text = model.Duration.ToString();
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
            Model.WX_Audio model = new Model.WX_Audio();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.AppId = "app001";
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

        private Model.WX_Audio SetModelValue(Model.WX_Audio model)
        {
            string category = GetCategory();
            model.CategoryId = GetCategory() == "" ? 0 : int.Parse(category);
            model.FullName = txtFullName.Text;
            model.IsAct = cbIsAct.Checked == true ? 1 : 0;
            model.ShortName = txtShortName.Text;
            model.Singer = txtSinger.Text;
            model.SoundSource = txtSoundSource.Text;
            model.CategoryPath = GetCategoryPath();
            if(!string.IsNullOrEmpty(txtDuration.Text)){
                model.Duration = int.Parse(txtDuration.Text);
            }
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "audio/";
            if (fileUpload.FileName != "")
            {
                if (model.Cover != "")
                {
                    FileUpLoadCommon.DeleteFile(model.Cover);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;

                model.Cover = FilePath;
                txtCover.Visible = true;
                txtCover.Text = model.Cover;
                btnView.NavigateUrl = model.Cover;
                btnDelPic.Visible = true;
                btnView.Visible = true;
            }

            return model;
        }
        private string checkform()
        {
            string strErr = "";
            
            return strErr;
        }
        private void ShowCategory(int categoryId)
        {
            List<model.Category> categoryList = new List<model.Category>();
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list = bll.GetModelList("");
            var pid=0;
            var values = "";
            do
            {
                var model = list.Find(e => e.Id == categoryId);
                pid = model.Pid ?? 0;
                categoryList.Add(new model.Category{
                    Id=categoryId,
                    Pid=pid
                });
                categoryId = pid;
            } while (pid != 0);
            categoryList.Reverse(0,categoryList.Count);
            var cateoryModel = new model.Category();
            for (int m = 0; m < categoryList.Count; m++) {
                switch (m) { 
                    case 0:
                        cateoryModel = categoryList[m];
                        InitCategory(ddlCategory1, cateoryModel.Pid, cateoryModel.Id);
                        break;
                    case 1:
                        cateoryModel = categoryList[m];
                        InitCategory(ddlCategory2, cateoryModel.Pid, cateoryModel.Id);
                        ddlCategory2.Visible = true;
                        break;
                    case 2:
                        cateoryModel = categoryList[m];
                        InitCategory(ddlCategory3, cateoryModel.Pid, cateoryModel.Id);
                        ddlCategory3.Visible = true;
                        break;
                }
            }
        }
        private string  GetCategory()
        {
            string result = "";
            if (ddlCategory3.Visible == true) {
                if (ddlCategory3.SelectedItem != null && ddlCategory3.SelectedValue != "") {
                    result= ddlCategory3.SelectedValue;
                }
            }
            else if (ddlCategory2.Visible == true) {
                if (ddlCategory2.SelectedItem != null && ddlCategory2.SelectedValue != "")
                {
                    result = ddlCategory2.SelectedValue;
                }
            }
            else if (ddlCategory3.Visible == true)
            {
                if (ddlCategory3.SelectedItem != null && ddlCategory3.SelectedValue != "")
                {
                    result = ddlCategory3.SelectedValue;
                }
            }
            return result;
        }
        private void InitCategory(DropDownList ddl,int pid,int selected=-1)
        {
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list= bll.GetModelList("Pid="+pid);
            foreach (var m in list) {
                ddl.Items.Add(new ListItem
                {
                    Text = m.FullName,
                    Value = m.Id.ToString()
                });
            }
            ddl.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            if (selected != -1) {
                ddl.Items.FindByValue(selected.ToString()).Selected = true;
            }
        }

        protected void ddlCategory1_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = ddlCategory1.SelectedValue;
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list = bll.GetModelList("Pid="+value);
            ddlCategory2.Items.Clear();
            ddlCategory3.Items.Clear();
            foreach (var m in list)
            {
                ddlCategory2.Items.Add(new ListItem
                {
                    Text = m.FullName,
                    Value = m.Id.ToString()
                });
            }
            ddlCategory2.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            ddlCategory2.Visible = (ddlCategory2.Items.Count==1 || ddlCategory2.Items.Count==0)?false:true;
            ddlCategory3.Visible = (ddlCategory3.Items.Count == 1 || ddlCategory3.Items.Count == 0) ? false : true;
        }

        protected void ddlCategory2_SelectedIndexChanged(object sender, EventArgs e)
        {
            var value = ddlCategory2.SelectedValue;
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            var list = bll.GetModelList("Pid=" + value);
            ddlCategory3.Items.Clear();
            foreach (var m in list)
            {
                ddlCategory3.Items.Add(new ListItem
                {
                    Text = m.FullName,
                    Value = m.Id.ToString()
                });
            }
            ddlCategory3.Items.Insert(0, new ListItem { Value = "", Text = "---选择类目---" });
            ddlCategory3.Visible = (ddlCategory3.Items.Count == 1 || ddlCategory3.Items.Count == 0) ? false : true;
        }

        protected void ddlCategory3_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.Cover != "" || modelArts.Cover != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.Cover);
                modelArts.Cover = "";
                bllArts.Update(modelArts);
                txtCover.Text = "";
                fileUpload.Visible = true;
                txtCover.Visible = false;
                btnDelPic.Visible = false;
                btnView.Visible = false;
            }
        }
        private string GetCategoryPath()
        {
            string result = "";
            if (ddlCategory1.SelectedItem != null && ddlCategory1.SelectedValue != "") {
                result += ddlCategory1.SelectedValue;
            }
            if (ddlCategory2.SelectedItem != null && ddlCategory2.SelectedValue != "") {
                result +="/"+ddlCategory2.SelectedValue;
            }
            if (ddlCategory3.SelectedItem != null && ddlCategory3.SelectedValue != "")
            {
                result += "/" + ddlCategory3.SelectedValue;
            }
            return result;
        }
    }
}


