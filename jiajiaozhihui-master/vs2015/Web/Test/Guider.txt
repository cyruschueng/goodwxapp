using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WxPayAPI;

namespace SfSoft.web.Test
{
    public partial class Guider : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                
                var access_token = Request["access_token"];
                var offset = Request["offset"];
                var limit = Request["limit"];
                var appid = "6365925a4cb27585";
                var method = "weiba.wxrrd.guider.lists";
                var secret = "5758b6365925a4cb27585d6cd03c77d9";
                var timestamp = DateTime.Now.ToString();

                WxPayData data = new WxPayData();
                data.SetValue("access_token", access_token);
                data.SetValue("appid", appid);
                data.SetValue("method", method);
                data.SetValue("secret", secret);
                data.SetValue("timestamp", timestamp);
                data.SetValue("limit", limit);
                data.SetValue("offset", offset);

                Response.Write("签名字符串：" + data.ToUrl() + "<br/>");
                var sign = data.MakeKSortSign();


                var url = string.Format("http://apis.wxrrd.com/router/rest?timestamp={0}&appid={1}&method={2}&access_token={3}&secret={4}&sign={5}&limit={6}&offset={7}", timestamp, appid, method, access_token, secret, sign, limit, offset);

                Response.Write("get 推客会员信息 " + url + "<br/>");
                string result = WxPayAPI.HttpService.Get(url);
                Response.Write("结果：" + result + "<br/>");

            }
        }
    }
}
