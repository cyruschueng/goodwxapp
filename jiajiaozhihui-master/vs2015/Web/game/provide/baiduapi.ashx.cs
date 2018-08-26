using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.DBUtility;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Net;
using System.Data;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// baiduapi 的摘要说明
    /// </summary>
    public class baiduapi : IHttpHandler
    {

        static string ENCRYPTKEY = "shenerxm";
        private string _openid = ""; //解密的openid
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string longitude = context.Request["longitude"].ToString();
            string latitude = context.Request["latitude"].ToString();
            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString();
                _openid =openid;
            }
            string result = Convert(_openid, longitude, latitude);
            context.Response.Write(result);
        }
        private string Convert(string openid, string longitude, string latitude)
        {
            string info = "";
            string result = "";
            
            try
            {
                #region gps转百度座标
                string path = "http://api.map.baidu.com/geoconv/v1/?coords=" + longitude + "," + latitude + "&from=1&to=5&ak=HmpypsSlnhBrSidKOasHSQEb";
                WebClient client = new WebClient();
                client.Encoding = Encoding.UTF8;
                client.DownloadData(path);
                info = client.DownloadString(path);
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

                string sql = "select * from WX_TestQuestion_Player where ServiceOpenID='" + openid + "'";
                if (DbHelperSQL.Exists(sql))
                {
                    BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
                    Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
                    model.Longitude = x;
                    model.Latitude = y;
                    model.Province = province;
                    model.City = city;
                    model.District = district;
                    model.Street = street;
                    model.Street_Number = street_number;
                    bll.Update(model);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
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