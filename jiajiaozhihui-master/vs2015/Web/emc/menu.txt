using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Senparc.Weixin.MP.CommonAPIs;
using System.IO;
using System.Text;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.HttpUtility;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP.Containers;

namespace SfSoft.web.emc
{
    public partial class menu : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                LoadDropDownList();
            }
        }
        private void LoadDropDownList()
        {
            BLL.WX_WeiXinAccounts bll = new BLL.WX_WeiXinAccounts();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                weixinname.DataTextField = "WeiXinName";
                weixinname.DataValueField = "WeiXinID";
                weixinname.DataSource = ds;
                weixinname.DataBind();
                weixinname.Items.Insert(0, new ListItem() { Text="------请选择-----", Value=""});
            }
        }
        private void Save()
        {
            if (Check() == false) { return; }
            string menuData = menuitem.Text;
            menuData = menuData.Replace("\r", "");
            menuData = menuData.Replace("\n", "");
            menuData = menuData.Replace("\t", "");

            var accessToken = AccessTokenContainer.TryGetAccessToken(hfAppID.Value, hfAppSect.Value);
            var urlFormat = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}";


            var url = string.IsNullOrEmpty(accessToken) ? urlFormat : string.Format(urlFormat, accessToken);
            using (MemoryStream ms = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes(menuData);
                ms.Write(bytes, 0, bytes.Length);
                ms.Seek(0, SeekOrigin.Begin);

                WxJsonResult wxJsonResult = Post.PostGetJson<WxJsonResult>(url, null, ms);
                lbMenuMsg.Text = wxJsonResult.errcode.ToString();
                lbMenuMsg.Text += "\n\t" + wxJsonResult.errmsg;
            }
            SaveMenuText(weixinname.SelectedValue + ".txt");
        }

        protected void weixinname_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (weixinname.SelectedItem != null && weixinname.SelectedValue != "")
            {
                BLL.WX_WeiXinAccounts bll = new BLL.WX_WeiXinAccounts();
                DataSet ds= bll.GetList("WeiXinID='"+weixinname.SelectedValue+"'");
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                    hfAppSect.Value = ds.Tables[0].Rows[0]["AppSect"].ToString();
                    hfAppID.Value = ds.Tables[0].Rows[0]["AppID"].ToString();
                    ReadText(weixinname.SelectedValue + ".txt");
                }
            }
            else {
                hfAppID.Value = "";
                hfAppSect.Value = "";
                menuitem.Text = "";
            }
        }
        private void ReadText(string fileName)
        {
            string filePath = System.Web.HttpContext.Current.Server.MapPath("/upload/weixinmenu/"+fileName);
            if (File.Exists(filePath))
            {
                StreamReader sr = new StreamReader(filePath, System.Text.Encoding.UTF8);
                String input = sr.ReadToEnd();
                sr.Close();
                menuitem.Text = input; 
            }
        }
        private void SaveMenuText(string fileName)
        {
            string filePath = System.Web.HttpContext.Current.Server.MapPath("/upload/weixinmenu/" + fileName);
            System.IO.File.WriteAllText(filePath,menuitem.Text);  
        }
        private bool Check()
        {
            string msg = "";
            if (weixinname.SelectedItem == null || weixinname.SelectedValue == "") {
                msg += "请选择微信号！/n/r";
                return false;
            }
            if (menuitem.Text.Trim() == "") {
                msg += "请填写菜单项！/n/r";
                return false;
            }
            lbMenuMsg.Text = msg;
            return true;
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            Save();
        }
    }
}

