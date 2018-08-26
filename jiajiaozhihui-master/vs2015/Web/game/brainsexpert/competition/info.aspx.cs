﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Data;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class info : System.Web.UI.Page
    {
        public string HTMLOpenID = "";
        public InfoModel HTMLInfoModel = new InfoModel();
        public string HTMLProvince = "";
        public string HTMLShow = "";
        public string HTMLStatusText = "";
        public string HTMLStatusName = "领取";
        public string HTMLStyleNone = "";
        public string HTMLTipStyle = "";
        public string HtmlBackLink = "";
        public string HTMLNunPrize = "";
        public string HTMLBtnStyle = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                try {
                    hfOpenID.Value = Session["openid"].ToString();
                    hfCompetition.Value = Session["competition"].ToString();
                    LoadInfo(hfOpenID.Value , hfCompetition.Value);
                    SetStauts(hfCompetition.Value);
                    GetProvince();
                    GetCity();
                    BackLink();
                } catch( Exception ex){
                    HTMLStyleNone = "style='display:none'";
                }
            }
        }

        private void LoadInfo(string openid,string id)
        {
            string _openid = openid;
            string sql = "select * from (" +
                "   select row_number() over(order by Score desc,UsingTime) as RowIndex,Score,UsingTime,OpenId from (" +
                " select * from WX_TestQuestion_Item_Score where score<=100 " +
                " )a where Item="+id+" " +
                " )a where openid='"+_openid+" '";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLInfoModel.ActivityName = "";
                HTMLInfoModel.Score =ds.Tables[0].Rows[0]["Score"].ToString();
                double spantime = double.Parse(ds.Tables[0].Rows[0]["UsingTime"].ToString());
                HTMLInfoModel.SpanTime = FormatSpanTime(spantime);
                HTMLInfoModel.Rank = ds.Tables[0].Rows[0]["RowIndex"].ToString();
                GetPrize(HTMLInfoModel.Rank);
                GetGoldTotal(_openid);
            }
        }
        private void GetPrize(string rank)
        {
            string sql = "select a.*,b.Rank,b.WinnerName from  (select * from WX_PublicGood where GoodsType=8 and isnull(isAct,0)=1) a ";
            sql += " left join dbo.WX_TestQuestion_Winner_Rule b on " + rank + " between b.LowerLimit and b.UpperLimit and ActivityId=" + hfCompetition.Value;
            sql += "where b.Rank=a.Exchange ";

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLInfoModel.Title = ds.Tables[0].Rows[0]["WinnerName"].ToString();
                HTMLInfoModel.PrizeName = ds.Tables[0].Rows[0]["GoodName"].ToString();
                hfGoodsClass.Value = ds.Tables[0].Rows[0]["GoodClass"].ToString();
                hfProductID.Value = ds.Tables[0].Rows[0]["ID"].ToString();
                hfGold.Value = ds.Tables[0].Rows[0]["Score"].ToString(); 
            }
        }
        private void SetStauts(string activityid)
        { 
            //活动是否结束
            string sql = "select * from dbo.WX_TestQuestion_Activity where ID=" + activityid + " and DATEDIFF ( n  ,  EndDate,getdate() )>=0";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            string goodsClass = "";
            bool isEnd = false;
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLBtnStyle = "style='display:block'";
                HTMLStyleNone = "style='display:block;'";
                HTMLTipStyle = "style='display:none;'";
                isEnd = true;
            }
            else {
                HTMLBtnStyle = "style='display:none;'";
                HTMLStyleNone = "style='display:none;'";
                HTMLTipStyle = "style='display:block;'";
            }
            if (HTMLInfoModel.PrizeName==null && HTMLInfoModel.Title == null && isEnd==true)
            {
                HTMLBtnStyle = "style='display:none;'";
                HTMLNunPrize = "<div id='Div1' class='alert alert-success alert-dismissible' role='alert' style='margin-top:10px;'>亲，您与本次擂台赛奖品缘分未到、擦肩而过！没关系，再接再厉，欢迎下次再战！</div>";
            }
            else {
                //奖品是否领取

                string openid =hfOpenID.Value;
                
                sql = "select * from dbo.WX_PublicOrder where openid='" + openid + "' and activityid=" + activityid;
                ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    HTMLBtnStyle = "style='display:none;'";
                    HTMLStatusName = "已领取";
                    HTMLStatusText = "<div id='result' class='alert alert-success alert-dismissible' role='alert' style='margin-top:20px;'><strong>已领取！</strong></div>";
                }
            }
        }
        private void GetGoldTotal(string openid)
        {
            BLL.WX_TestQuestion_Gold bll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold model = bll.GetModelByOpenID(openid);
            if (model != null && model.Gold != null) {
                HTMLInfoModel.GoldTotal = model.Gold.ToString();
            }
        }
        private string FormatSpanTime(double spantime)
        {
            double t = spantime / 1000;
            return t.ToString() + "秒";
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
        private void BackLink()
        {
            string openid = "";
            if (Session["openid"] != null)
            {
                openid = Session["openid"].ToString();
            }
            string weixinid = "";
            if (Session["weixinid"] != null)
            {
                weixinid = Session["weixinid"].ToString();
            }
            if (openid != "" && weixinid != "")
            {
                HtmlBackLink = "../default.aspx?openid=" + openid.Replace("+", "%2B") + "&from=shenerhost&weixinid=" + weixinid;
            }
            else
            {
                HtmlBackLink = "javascript:void(0)";
            }

        }
    }
    public class InfoModel
    {
        public string ActivityName { get; set; } //活动名称
        public string Score { get; set; } //得分
        public string SpanTime { get; set; } //所有时间
        public string Rank { get; set; } //排名
        public string Title { get; set; } //获奖名次
        public string PrizeName { get; set; } //奖品名称
        public string GoldTotal { get; set; } //总金币
    }
}