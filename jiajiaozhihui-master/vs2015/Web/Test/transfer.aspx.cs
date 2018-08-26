using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class transfer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var mch_appid = App.Helper.WxPayConfig.APPID;
            var mchid = App.Helper.WxPayConfig.MCHID;
            var device_info = "";
            var nonce_str = Senparc.Weixin.MP.TenPayLibV3.TenPayV3Util.GetNoncestr();
            var partner_trade_no = WxPayAPI.WxPayApi.GenerateOutTradeNo();
            var openid = "oc6zzs1y_A_7RgGi6EGLBUrPCfRk";
            var key = "ygelwgjty32whpbtwfykwcqytflwgjty";
            var check_name = "FORCE_CHECK";
            var re_user_name = "袁名湖";
            var amount =1m;
            var desc = "企业付款测试";
            var spbill_create_ip= Request.ServerVariables.Get("Local_Addr").ToString();
            var path = "c:\\cert\\apiclient_cert.p12";
            var pass = "1229673702";
            
            var data = new Senparc.Weixin.MP.TenPayLibV3.TenPayV3TransfersRequestData(mch_appid, mchid, null, nonce_str, partner_trade_no, openid, key, check_name, re_user_name, amount, desc, spbill_create_ip);
            //var msg= Senparc.Weixin.MP.TenPayLibV3.TenPayV3.TransfersAsync(data, path, pass).Result;
            //var msg= Senparc.Weixin.MP.TenPayLibV3.TenPayV3.Transfers(data);
            
            //App.Helper.Log.WriteNode(Newtonsoft.Json.JsonConvert.SerializeObject(msg), "transfers.txt");
        }
    }
}
