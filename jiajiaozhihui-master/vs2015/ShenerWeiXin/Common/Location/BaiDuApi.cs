using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using System.Data;

namespace ShenerWeiXin.Common.Location
{
    /// <summary>
    /// 通过经度纬度定位地理位置
    /// </summary>
    public class BaiDuApi
    {
        private string openid = string.Empty;
        private string latitude = string.Empty;
        private string longitude = string.Empty;
       /// <summary>
       /// 
       /// </summary>
       /// <param name="latitude">纬度</param>
       /// <param name="longitude">经度</param>
        public BaiDuApi(string openid, string latitude,string longitude)
        {
            this.openid = openid;
            this.latitude = latitude;
            this.longitude = longitude;
            string url = "http://api.map.baidu.com/geocoder/v2/?ak=HmpypsSlnhBrSidKOasHSQEb&callback=renderReverse&location=" + latitude + "," + longitude + "&output=json&pois=1";
            WebClient client = new WebClient();
            client.Encoding = Encoding.UTF8;
            client.DownloadStringCompleted += DownloadStringCompleted;
            client.DownloadStringAsync(new Uri(url));
        }
        private void DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            string msg = e.Result;
            msg = msg.Replace("renderReverse&&renderReverse(", "");
            msg = msg.Substring(0, msg.Length - 1);
            JObject jsonResult=JObject.Parse(msg);
            BaiDuResult result = new BaiDuResult();
            result.openid = this.openid;
            result.latitude = this.latitude;
            result.longitude = this.longitude;
            result.country = jsonResult["result"]["addressComponent"]["country"].ToString();
            result.province = jsonResult["result"]["addressComponent"]["province"].ToString();
            result.city = jsonResult["result"]["addressComponent"]["city"].ToString();
            result.district = jsonResult["result"]["addressComponent"]["district"].ToString();
            result.street = jsonResult["result"]["addressComponent"]["street"].ToString();
            result.street_number = jsonResult["result"]["addressComponent"]["street_number"].ToString();
            UpdateLocation(result);
        }
        private void UpdateLocation(BaiDuResult result)
        {
            SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar, 100),
                    new SqlParameter("@latitude", SqlDbType.NVarChar, 100),
					new SqlParameter("@longitude", SqlDbType.NVarChar,100),
					new SqlParameter("@country", SqlDbType.NVarChar, 50),
					new SqlParameter("@province", SqlDbType.NVarChar,50),
					new SqlParameter("@city", SqlDbType.NVarChar,50),
					new SqlParameter("@district", SqlDbType.NVarChar,50),
					new SqlParameter("@street", SqlDbType.NVarChar,50),
					new SqlParameter("@street_number", SqlDbType.NVarChar,50),
					};
            parameters[0].Value = result.openid;
            parameters[1].Value = result.latitude;
            parameters[2].Value = result.longitude;
            parameters[3].Value = result.country;
            parameters[4].Value = result.province;
            parameters[5].Value = result.city;
            parameters[6].Value = result.district;
            parameters[7].Value = result.street;
            parameters[8].Value = result.street_number;

            SfSoft.DBUtility.DbHelperSQL.RunProcedure("pro_UserLocation", parameters);
        }
    }
}
