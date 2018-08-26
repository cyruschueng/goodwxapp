using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class get_prize : System.Web.UI.Page
    {
        public string HTMLProvince = "";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLProductName = "";
        public string HTMLImgUrl = "";
        public string HTMLDisenable = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetProvince();
                GetCity();
                if (Request.QueryString["openid"] != null && Request.QueryString["openid"] != "") {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["id"] != null && Request.QueryString["id"] != "") {
                    hfActiveID.Value = Request.QueryString["id"].ToString();
                }
                if (Session["rank"] != null) {
                    hfRank.Value = Session["rank"].ToString();
                }
                string _openid = Request["openid"].ToString();
                GetPrize();
            }
        }
        private void GetProvince()
        {
            string sql = "select * from dbo.Pub_Areas where areatype=1";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLProvince += "<option value=''>请选择</option>";
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    HTMLProvince += "<option value='" + dr["AreaID"].ToString() + "'>" + dr["AreaName"].ToString() + "</option>";
                }
            }
        }
        private void GetCity()
        {
            string sql = "select * from dbo.Pub_Areas where areatype=2";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            string result = "{}";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            hfCity.Value = result;
        }
        private void GetPrize()
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            DataSet ds = bll.GetList("isnull(Exchange,0)=" + hfRank.Value);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) { 
                HTMLProductName=ds.Tables[0].Rows[0]["GoodName"].ToString();
                HTMLImgUrl = ds.Tables[0].Rows[0]["ImgUrl"].ToString();
                hfProductID.Value = ds.Tables[0].Rows[0]["ID"].ToString();
            }
        }
    }
}
