using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxJs;

namespace SfSoft.web.game.qzsf.exchange
{
    public partial class buy : System.Web.UI.Page
    {
        public string HTMLImage = string.Empty;
        public string HTMLQuantity = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string id = Request.QueryString["id"];
                hfGoodsid.Value = id;
                if (Session["myopenid"] != null)
                {
                    hfOpenId.Value = Session["myopenid"].ToString();
                }
                else {
                    Response.Redirect("/wxpay/result/error.html");
                }
                GetData(id);
            }
        }
        
        private void GetData(string id)
        {
            BLL.WX_Product_Exchange bll = new BLL.WX_Product_Exchange();
            Model.WX_Product_Exchange model = bll.GetModel(Convert.ToInt32(id));
            if (model != null)
            {
                HTMLImage = model.Image;
                HTMLQuantity = model.Quantity + model.Type;
            }
        }
        /// <summary>
        /// 初始jssdk
        /// </summary>
        private void InitJs()
        {
            ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);
            jsapi.SetRightList(EnumJsRight.chooseWXPay, EnumJsRight.getLatestAddress, EnumJsRight.editAddress);
            jsapi.RegisterWeiXinJsApi();
        }
        /// <summary>
        /// 初始支付
        /// </summary>
        /// <summary>
        /// 获取收货地址
        /// </summary>
        private void InitAddress()
        {
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI payApi = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(this.Page);
            if (Session["myaccesstoken"] != null)
            {
                payApi.access_token = Session["myaccesstoken"].ToString();
            }
            else
            {
                Response.Redirect("/wxpay/result/error.html");
            }
            hfAddressParameters.Value = payApi.GetEditAddressParameters();
        }
        private void InitOAuth()
        {
            ShenerWeiXin.WxApi.WxOAuth.BaseOAuth oauth = new ShenerWeiXin.WxApi.WxOAuth.BaseOAuth(this.Page);
            oauth.GetOAuthUserInfo();
            if (oauth.OAuthResult.Code == ShenerWeiXin.WxApi.WxOAuth.OAuthCodeEnum.error.ToString())
            {
                oauth.RedirectUrl = Request.Url.AbsoluteUri;
                oauth.Redirect();
            }
            else
            {
                hfOpenId.Value = oauth.OAuthResult.UserInfo.openid;
            }
        }
    }
}
