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
namespace SfSoft.web.emc.material.reply
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_MessageReply modelArts = new SfSoft.Model.WX_MessageReply();
        BLL.WX_MessageReply bllArts = new BLL.WX_MessageReply();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.material.reply";
                InitData();
                //新建
                if (hfMode.Value == "add")
                {
                    rblClass.SelectedValue = "0";
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
            hfMID.Value = "emc.material.reply";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_MessageReply model)
        {
            txtTitle.Text = model.Title;
            txtKeyWord.Text = model.KeyWord;
            if (model.MsgType != null) {
                ddlMsgType.Items.FindByValue(model.MsgType).Selected = true;
            }
            fckDesc.Text = model.Description;
            fckContent.Text = model.Content;
            txtNewsUrl.Text = model.NewsUrl;
            txtPicUrl.Text = model.PicUrl;
            txtAuthUrl.Text = model.AuthUrl;
            txtTags.Text = model.Tags;
            if(model.Order!=null){
                txtOrder.Text = model.Order.ToString();
            }
            if (model.IsReadWeixinService != null && model.IsReadWeixinService.ToString() == "1")
            {
                cbIsReadWeiXinService.Checked = true;
            }
            else {
                cbIsReadWeiXinService.Checked = false;
            }
            if (model.Class != null && model.Class != "") {
                rblClass.Items.FindByValue(model.Class).Selected = true;
            }
            ddlApp.Items.FindByValue(model.AppId).Selected = true;
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
            Model.WX_MessageReply model = new Model.WX_MessageReply();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
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

        private Model.WX_MessageReply SetModelValue(Model.WX_MessageReply model)
        {
            model.Title = txtTitle.Text;
            model.KeyWord = txtKeyWord.Text;
            model.Content = fckContent.Text;
            model.Description = fckDesc.Text;
            if (ddlMsgType.SelectedItem != null) {
                model.MsgType = ddlMsgType.SelectedValue;
            }
            if (txtOrder.Text != "") {
                model.Order = int.Parse(txtOrder.Text);
            }
            model.NewsUrl = txtNewsUrl.Text;
            model.PicUrl = txtPicUrl.Text;
            model.AuthUrl = txtAuthUrl.Text;
            model.Tags = txtTags.Text;
            if (cbIsReadWeiXinService.Checked)
            {
                model.IsReadWeixinService = 1;
            }
            else {
                model.IsReadWeixinService = 0;
            }
            if (rblClass.SelectedItem != null && rblClass.SelectedValue != "")
            {
                model.Class = rblClass.SelectedValue;
            }
            else {
                model.Class = "0";
            }
            if (ddlApp.SelectedItem != null && ddlApp.SelectedValue != "") {
                model.AppId = ddlApp.SelectedValue;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (txtKeyWord.Text == "")
            {
                strErr += "关键字不能为空！\\n";
            }
            if (ddlApp.SelectedItem == null || ddlApp.SelectedValue == "") {
                strErr += "请选择微信号！\\n";
            }
            if (ddlMsgType.SelectedItem == null || ddlMsgType.SelectedValue == "") {
                strErr += "消息类型不能为空！\\n";
            }
            return strErr;
        }

        private void InitData()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            DataSet ds = bll.GetList("refobj='emc.material.reply.msgtype'");
            EmcCommon.SetBaseDataDropDownList(ddlMsgType, "emc.material.reply.msgtype", ds);
            ListItem li = new ListItem();
            li.Text = "";
            li.Value = "";
            ddlMsgType.Items.Insert(0, li);

            
        }
    }
}


