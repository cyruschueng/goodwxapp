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
using System.Text;
using SfSoft.DBUtility;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Entities;
using SfSoft.web.common;
using Senparc.Weixin.Helpers;
using System.IO;
using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.MP.Entities.Menu;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP.Containers;

namespace SfSoft.web.emc.database.set
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ShowData();
                hfAppid.Value = WXConfig.AgentAppID;
                hfAuthUrl.Value = WXConfig.AuthURL;
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.material.reply";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            
        }
        protected override void VtButtonAccess()
        {
            btnMenu.Enabled = CheckButtonAccess("emc.database.set.manage");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion

        protected void btnSave_Click(object sender, EventArgs e)
        {
            SaveAutoAttention();
            SavePassivityAttention();
        }
        private void ShowData()
        {
            BLL.WX_DataBase bll = new BLL.WX_DataBase();
            DataSet ds = bll.GetList ("AppId='"+ddlApp.SelectedValue+"'");
            txtAutoAttention.Text = "";
            txtPassivityAttention.Text = "";
            txtMenu.Text = "";

            foreach (DataRow dr in ds.Tables[0].Rows) { 
                if(dr["Code"].ToString().ToLower()=="autoattention"){
                    txtAutoAttention.Text = dr["Value"].ToString();
                }
                if (dr["Code"].ToString().ToLower() == "passivityattention")
                {
                    txtPassivityAttention.Text = dr["Value"].ToString();
                }
                if (dr["Code"].ToString().ToLower() == "menu")
                {
                    txtMenu.Text = dr["Value"].ToString();
                }
            }
        }

        /// <summary>
        /// 关注回复设置
        /// </summary>
        private void SaveAutoAttention()
        {
            BLL.WX_DataBase bll = new BLL.WX_DataBase();
            Model.WX_DataBase model = new Model.WX_DataBase();

            if (bll.Exists("AutoAttention",ddlApp.SelectedValue) == true)
            {
                model = bll.GetModel("AutoAttention",ddlApp.SelectedValue);
                model.AppId = ddlApp.SelectedValue;
                model.Value = txtAutoAttention.Text;
                bll.Update(model);
            }
            else {
                model.Code = "AutoAttention";
                model.IsAct = 1;
                model.AppId = ddlApp.SelectedValue;
                model.Value = txtAutoAttention.Text;
                bll.Add(model);
            }
        }
        /// <summary>
        /// 被动回复设置
        /// </summary>
        private void SavePassivityAttention()
        {
            BLL.WX_DataBase bll = new BLL.WX_DataBase();
            Model.WX_DataBase model = new Model.WX_DataBase();

            if (bll.Exists("PassivityAttention",ddlApp.SelectedValue) == true)
            {
                model = bll.GetModel("PassivityAttention",ddlApp.SelectedValue);
                model.Value = txtPassivityAttention.Text;
                model.AppId = ddlApp.SelectedValue;
                bll.Update(model);
            }
            else
            {
                model.Code = "PassivityAttention";
                model.IsAct = 1;
                model.AppId = ddlApp.SelectedValue;
                model.Value = txtPassivityAttention.Text;
                bll.Add(model);
            }
        }
        protected void btnMenu_Click(object sender, EventArgs e)
        {
            BLL.WX_DataBase bll = new BLL.WX_DataBase();
            Model.WX_DataBase model = new Model.WX_DataBase();
            if (bll.Exists("Menu",ddlApp.SelectedValue) == true)
            {
                model = bll.GetModel("Menu",ddlApp.SelectedValue);
                model.Value = txtMenu.Text;
                bll.Update(model);
            }
            else
            {
                model.Code = "Menu";
                model.IsAct = 1;
                model.Value = txtMenu.Text;
                bll.Add(model);
            }
            
            string menuData = txtMenu.Text;
            menuData = menuData.Replace("\r", "");
            menuData = menuData.Replace("\n", "");
            menuData = menuData.Replace("\t", "");

            var accessToken = AccessTokenContainer.TryGetAccessToken(WXConfig.appId, WXConfig.appSecret);
            var urlFormat = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}";


            var url = string.IsNullOrEmpty(accessToken) ? urlFormat : string.Format(urlFormat, accessToken);
            using (MemoryStream ms = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes(menuData);
                ms.Write(bytes, 0, bytes.Length);
                ms.Seek(0, SeekOrigin.Begin);

                WxJsonResult wxJsonResult = Post.PostGetJson<WxJsonResult>(url, null, ms);
                lbMenuMsg.Text = wxJsonResult.errcode.ToString();
                lbMenuMsg.Text +="\n\t"+ wxJsonResult.errmsg;
            }
        }

        protected void ddlApp_SelectedIndexChanged(object sender, EventArgs e)
        {
            ShowData();
        }
    }
}


