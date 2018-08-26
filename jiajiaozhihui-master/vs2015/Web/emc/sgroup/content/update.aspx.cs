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
using System.Web.Services;
using System.Collections.Generic;
namespace SfSoft.web.emc.sgroup.content
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_SGroup_Content modelArts = new SfSoft.Model.WX_SGroup_Content();
        BLL.WX_SGroup_Content bllArts = new BLL.WX_SGroup_Content();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.zxs.info";

                InitDDL();
                //新建
                if (hfMode.Value == "add")
                {
                    ddl_is_act.Items.FindByValue("").Selected = true;
                    
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
            hfMID.Value = "emc.zxs.info";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_SGroup_Content model)
        {


            txt_title.Text = model.title;
            txt_introduce.Value = model.introduce;
            ddlGroup.Items.FindByValue((model.group_type ?? 0).ToString()).Selected = true;
            ddl_is_act.Items.FindByValue((model.is_act ?? 0).ToString()).Selected = true;
            


            if (model.img_url.Trim() != "")
            {
                imgLogo.ImageUrl = model.img_url;
                imgLogo.Visible = true;
                btnDeleLogo.Visible = true;
                fileLogo.Visible = false;
            }
            else
            {
                imgLogo.Visible = false;
                btnDeleLogo.Visible= false;
                fileLogo.Visible = true;
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
            Model.WX_SGroup_Content model = new Model.WX_SGroup_Content();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.create_date = DateTime.Now;
                if (model.is_act == 1) UpdateAct();
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                imgLogo.Visible = true;
                if (model.is_act == 1) UpdateAct();
                bllArts.Update(model);
            }
        }

        private Model.WX_SGroup_Content SetModelValue(Model.WX_SGroup_Content model)
        {
            model.title = txt_title.Text;
            model.introduce = txt_introduce.Value;
            if(ddl_is_act.Items!=null && ddl_is_act.SelectedValue!="")
            {
                model.is_act=int.Parse( ddl_is_act.SelectedValue);
            }else{
                model.is_act=0;
            }
            if (ddlGroup.Items != null && ddlGroup.SelectedValue != "") 
            {
                model.group_type = int.Parse(ddlGroup.SelectedValue);
            }
            else
            {
                model.group_type = null;
            }


            model.img_url = UploadImg(fileLogo, model.img_url);
            if (model.img_url != "")
            {
                imgLogo.ImageUrl = model.img_url;
                fileLogo.Visible = false;
                btnDeleLogo.Visible = true;
            }
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "group/";
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
        private string checkform()
        {
            string strErr = "";
            if (txt_title.Text.Trim() == "")
            { 
                strErr += "标题不能为空！\\n";
            }
            if (txt_introduce.Value.Trim() == "")
            {
                strErr += "群介绍不能为空！\\n";
            }
            if (ddlGroup.SelectedValue == "" || ddlGroup.SelectedItem == null) {
                strErr += "群名称不能为空！\\n";
            }
            return strErr;
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.img_url != "" || modelArts.img_url != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.img_url);
                modelArts.img_url = "";
                bllArts.Update(modelArts);
                imgLogo.ImageUrl = modelArts.img_url;
                fileLogo.Visible = true;
                btnDeleLogo.Visible = true;
                imgLogo.Visible = false;
            }
        }
        private bool IsExistAppId(string appId)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            DataSet ds = bll.GetList("AppId='" + appId + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        private void InitDDL()
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var list = bll.GetModelList("is_act=1");
            foreach (var m in list)
            {
                ddlGroup.Items.Add(new ListItem()
                {
                    Value = m.id.ToString(),
                    Text = m.group_name
                });
            }
            ddlGroup.Items.Insert(0, new ListItem() { Text = "", Value = "" });
        }
        private void UpdateAct()
        {
            var type = ddlGroup.SelectedValue;
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var list= bll.GetModelList("group_type=" + type);
            foreach (var m in list) {
                if (m.is_act == 1) {
                    m.is_act = 0;
                    bll.Update(m);


                }
            }
        }
    }
}


