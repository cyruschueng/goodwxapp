using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json.Linq;

namespace SfSoft.web.WarrantyCard.Controller
{
    /// <summary>
    /// MemberController 的摘要说明
    /// </summary>
    public class MemberController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "regist":
                    Regist(context);
                    break;
                case "location":
                    TransformLocation(context);
                    break;
                case "registinfo":
                    GetRegistInfo(context);
                    break;
                case "samecode":
                    CheckSameCode(context);
                    break;
            }
        }

        private void CheckSameCode(HttpContext context)
        {
            var machinecode = context.Request["machinecode"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            var exist= provide.ExistWarrantyCard(machinecode);
            var result = exist == true ? "true" : "false";
            context.Response.Write(result);
        }

        private void GetRegistInfo(HttpContext context)
        {
            var openId = context.Request["openId"];
            var machinecode = context.Request["machinecode"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            var list= provide.GetWarrantyCardList(openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        public void Regist(HttpContext context)
        {
            var success = "false";
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());

            SfSoft.Model.WX_WarrantyCard model = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_WarrantyCard>(strJson);
            Helper.MemberProvide provide = new Helper.MemberProvide();
            if (provide.ExistWarrantyCard(model.MachineCode) == false) {
                model.IsAct = 1;
                model.CreateDate = DateTime.Now;
                var result =provide.AddMember(model);
                success=result==true?"true":"false";
            }
            context.Response.Write(success);
        }
        public void TransformLocation(HttpContext context)
        {
            string longitude = context.Request["longitude"];
            string latitude = context.Request["latitude"];

            #region gps转百度座标
            string path = "http://api.map.baidu.com/geoconv/v1/?coords=" + longitude + "," + latitude + "&from=1&to=5&ak=HmpypsSlnhBrSidKOasHSQEb";
            WebClient client = new WebClient();
            client.Encoding = Encoding.UTF8;
            var info = client.DownloadString(path);
            JObject obj = JObject.Parse(info);
            string x = obj["result"][0]["x"].ToString();
            string y = obj["result"][0]["y"].ToString();
            #endregion

            #region 百度座标转成具体地址（省市区）
            path = "http://api.map.baidu.com/geocoder/v2/?ak=HmpypsSlnhBrSidKOasHSQEb&callback=renderReverse&location=" + y + "," + x + "&output=json&pois=1";
            info = client.DownloadString(path);
            info = info.Replace("renderReverse&&renderReverse(", "");
            info = info.Substring(0, info.Length - 1);
            obj = JObject.Parse(info);
            string province = obj["result"]["addressComponent"]["province"].ToString();
            string city = obj["result"]["addressComponent"]["city"].ToString();
            string district = obj["result"]["addressComponent"]["district"].ToString();
            string street = obj["result"]["addressComponent"]["street"].ToString();
            string street_number = obj["result"]["addressComponent"]["street_number"].ToString();
            #endregion
            var data = new { 
                Province=province,
                City=city,
                District=district,
                Street = street
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}