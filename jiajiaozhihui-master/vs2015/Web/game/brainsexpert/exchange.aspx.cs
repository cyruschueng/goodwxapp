using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.game.brainsexpert
{
    public partial class exchange : System.Web.UI.Page
    {
        public string HTMLProvince = "";
        public string HTMLTitle = "";
        public string HTMLImgUrl = "";
        public string HTMLExchange = "";
        public string HTMLDesc = "";
        public string HTMLAllExchange = "";
        public string HTMLEnable = "disabled";
        public string HTMLButtonName = "立即兑换";
        public string HTMLButtonStyle = "";
        static string ENCRYPTKEY = "shenerxm";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                GetProvince();
                GetCity();
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["productid"] != null) {
                    hfProductID.Value = Request.QueryString["productid"].ToString();
                }
                GetProduct(hfProductID.Value);
            }
        }
        private void GetProvince()
        {
            string sql = "select * from dbo.Pub_Areas where areatype=1";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLProvince += "<option value=''>请选择</option>";
                foreach (DataRow dr in ds.Tables[0].Rows) {
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
                result=SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            hfCity.Value = result;
        }
        private void GetProduct(string id) 
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(int.Parse(id));
            if (model != null) {
                HTMLTitle = model.GoodName;
                HTMLImgUrl = model.ImgURL;
                HTMLExchange = model.Exchange;
                HTMLDesc = model.Desc;
                ExchangeGoldEnable(int.Parse(model.Exchange));
            }
        }
        private void  ExchangeGoldEnable(int gold)
        {
            string openid = hfOpenID.Value;
            BLL.WX_TestQuestion_Gold bll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold model=bll.GetModelByOpenID(openid);
            if (model != null)
            {
                if (gold < model.Gold || gold == model.Gold)
                {
                    HTMLEnable = "";
                    HTMLAllExchange = model.Gold.ToString();
                    HTMLButtonStyle = "style='background:#f00'";
                }
                else
                {
                    HTMLButtonName = "金币不足";
                    HTMLButtonStyle = "style='background:#aaa; border-color:#aaa;'";
                }
            }
            else {
                HTMLButtonName = "金币不足";
                HTMLButtonStyle = "style='background:#aaa; border-color:#aaa;'";
            }
        }
    }
}
