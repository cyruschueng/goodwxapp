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
namespace SfSoft.web.emc.wxopen.habit.habitlist
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.wx_habit modelArts = new SfSoft.Model.wx_habit();
        BLL.wx_habit bllArts = new BLL.wx_habit();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.libao.product";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
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
            hfMID.Value = "emc.libao.product";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.wx_habit model)
        {
            txtJoinNum.Text = (model.join_num ?? 0).ToString();
            txtSn.Text = (model.sn ?? 0).ToString();
            txtTitle.Text = model.title;
            ddlHabitClassify.Items.FindByValue(model.habit_classify.ToString()).Selected = true;

            if (model.imgurl != "")
            {
                imgUrl.ImageUrl = model.imgurl;
                imgUrl.Visible = true;
                btnDelPic.Visible = true;
            }
            else
            {
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
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
            Model.wx_habit model = new Model.wx_habit();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.create_date = DateTime.Now;
                model.appid = "app001";
                model.is_private = 0;


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

        private Model.wx_habit SetModelValue(Model.wx_habit model)
        {
            if (ddlHabitClassify.SelectedItem != null && ddlHabitClassify.SelectedValue != "") {
                model.habit_classify = int.Parse(ddlHabitClassify.SelectedValue);
            }
            if(ddlIsAct.SelectedItem!=null && ddlIsAct.SelectedValue!=""){
                model.is_act = int.Parse(ddlIsAct.SelectedValue);
            }
            int joinNum = 0;
            int.TryParse(txtJoinNum.Text, out joinNum);
            model.join_num = joinNum;
            int sn = 0;
            int.TryParse(txtSn.Text, out sn);
            model.sn = sn;
            model.title = txtTitle.Text;

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "upload/";
            if (fuImgUrl.FileName != "")
            {
                if (model.imgurl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.imgurl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fuImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.imgurl = FilePath;
                imgUrl.Visible = true;
                imgUrl.ImageUrl = model.imgurl;
                btnDelPic.Visible = true;

            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtTitle.Text == "")
            {
                strErr += "习惯名称不能为空！\\n";
            }
            if (ddlHabitClassify.SelectedItem == null && ddlHabitClassify.SelectedValue == "")
            {
                strErr += "习惯分类不能同时为空！\\n";
            }
            return strErr;
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {

            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.imgurl != "" || modelArts.imgurl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.imgurl);
                modelArts.imgurl = "";
                bllArts.Update(modelArts);
                imgUrl.ImageUrl = "";
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }
    }
}


