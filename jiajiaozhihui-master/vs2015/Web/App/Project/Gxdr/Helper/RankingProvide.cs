using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Gxdr.Helper
{
    public class RankingProvide
    {
        private List<Models.Rank.Ranking> Ranking{get;set;}
        /// <summary>
        /// 全国，省，市　排名
        /// </summary>
        private List<Models.Rank.Ranking> CurrRanking { get; set; }
        private string OpenId { get; set; }
        public RankingProvide() { }
        /// <summary>
        /// 全国所有人排名
        /// </summary>
        public RankingProvide(string openId)
        {
            this.OpenId = openId;
            string sql = "Select ServiceOpenId as OpenId,NickName,HeaderImgUrl,Score,UsingTime,Province,City,District,Street from WX_TestQuestion_Player order by Score desc,UsingTime";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            ConvertToRanking(ds);
        }
        /// <summary>
        /// 单个全国活动排名
        /// </summary>
        /// <param name="item"></param>
        public RankingProvide(string item, string openId)
        {
            this.OpenId = openId;
            string sql = "select a.OpenId,a.Item,a.Score,a.UsingTime,b.NickName,b.HeaderImgUrl,b.Province,b.City,b.District,b.Street " +
                "from (select * from WX_TestQuestion_Item_Score where item=" + item + ")a " +
                "left join WX_TestQuestion_Player b on a.openid=b.serviceopenId "+
                "order by a.Score desc,a.UsingTime";

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            ConvertToRanking(ds);
        }

        /// <summary>
        /// 单个活动城市排名
        /// </summary>
        /// <param name="item"></param>
        public RankingProvide(string item, string openId,string address, string type="city")
        {
            this.OpenId = openId;
            string sql = "";
            if (type.ToLower() == "city")
            {
                sql = "select a.OpenId,a.Item,a.Score,a.UsingTime,b.NickName,b.HeaderImgUrl,b.Province,b.City,b.District,b.Street "+
                "from (select * from WX_TestQuestion_Item_Score where item=" + item + ")a "+
                "left join WX_TestQuestion_Player b on a.openid=b.serviceopenId "+
                "where b.City='" + address + "'"+
                " order by a.Score desc,a.UsingTime";
            }
            else
            {
                sql = "select a.OpenId,a.Item,a.Score,a.UsingTime,b.NickName,b.HeaderImgUrl,b.Province,b.City,b.District,b.Street " +
                "from (select * from WX_TestQuestion_Item_Score where item=" + item + ")a " +
                "left join WX_TestQuestion_Player b on a.openid=b.serviceopenId " +
                "where b.Province='" + address + "'"+
                " order by a.Score desc,a.UsingTime";
            }
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            ConvertToRanking(ds);
        }

        /// <summary>
        /// 城市排名
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        private List<Models.Rank.Ranking> CityRanking()
        {
            CurrRanking = Ranking;
            return CurrRanking;
        }
        /// <summary>
        /// 城市排名　前几名
        /// </summary>
        /// <param name="top"></param>
        /// <param name="city"></param>
        /// <returns></returns>
        private List<Models.Rank.Ranking> CityRanking(int top)
        {
            CurrRanking = Ranking;

            return CurrRanking.Take(top).ToList();
        }
        /// <summary>
        /// 省份排名
        /// </summary>
        /// <param name="province"></param>
        /// <returns></returns>
        private List<Models.Rank.Ranking> ProvinceRanking()
        {
            CurrRanking = Ranking;
            return CurrRanking;
        }
        /// <summary>
        /// 省份排名 前几名
        /// </summary>
        /// <param name="top"></param>
        /// <param name="province"></param>
        /// <returns></returns>
        private List<Models.Rank.Ranking> ProvinceRanking(int top)
        {
            CurrRanking = Ranking;
            return CurrRanking.Take(top).ToList();
        }
        /// <summary>
        /// 全国排名
        /// </summary>
        /// <returns></returns>
        private List<Models.Rank.Ranking> NationwideRanking()
        {
            CurrRanking= Ranking;
            return CurrRanking;
        }
        /// <summary>
        /// 全国排名 前几名
        /// </summary>
        /// <returns></returns>
        private List<Models.Rank.Ranking> NationwideRanking(int top )
        {
            CurrRanking= Ranking;
            return CurrRanking.Take(top).ToList();
        }
        private void ConvertToRanking(DataSet ds) 
        {
            var ranking = new List<Models.Rank.Ranking>();
            if (ds != null && ds.Tables[0] != null)
            {
                var index=0;
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    index++;
                    ranking.Add(new Models.Rank.Ranking
                    {
                        Index=index,
                        City = dr.Field<string>("City"),
                        District = dr.Field<string>("District"),
                        HeaderImgUrl = dr.Field<string>("HeaderImgUrl"),
                        NickName = dr.Field<string>("NickName"),
                        OpenId = dr.Field<string>("OpenId"),
                        Province = dr.Field<string>("Province"),
                        Score = dr.Field<int?>("Score")??0,
                        Street = dr.Field<string>("Street"),
                        UsingTime = dr.Field<int?>("UsingTime")??0
                    });
                }
            }
            Ranking = ranking;
        }
        /// <summary>
        /// 自己的排名
        /// </summary>
        /// <returns></returns>
        public Models.Rank.Ranking MyRanking()
        {
            return CurrRanking.FirstOrDefault(e => e.OpenId == this.OpenId);
        }
        /// <summary>
        /// 是否在几前名
        /// </summary>
        /// <param name="top"></param>
        /// <returns></returns>
        public bool ExistRanking(int top)
        {
            return CurrRanking.Exists(e => e.OpenId == this.OpenId && e.Index >= top);
        }
        /// <summary>
        /// 总排名
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="top"></param>
        /// <returns></returns>
        public Models.Rank.MyRanking GetRanking(string openId, string top)
        {
            var list = new List<Models.Rank.Ranking>();
            Helper.RankingProvide provide = null;
            provide = new Helper.RankingProvide(openId);
            int t = 0;
            var b = int.TryParse(top, out t);
            if (b)
            {
                list = provide.NationwideRanking(t);
            }
            else
            {
                list = provide.ProvinceRanking();
            }
            var my = provide.MyRanking();
            return new Models.Rank.MyRanking { My = my, List = list };
        }
        /// <summary>
        /// 　单个活动市排名
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="city"></param>
        /// <param name="top"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public Models.Rank.MyRanking GetCityRanking(string openId,string city,string top,string item)
        {
            var list = new List<Models.Rank.Ranking>();
            Helper.RankingProvide provide = null;
            provide = new Helper.RankingProvide(item, openId,city,"city");
            int t = 0;
            var b = int.TryParse(top, out t);
            if (b)
            {
                list = provide.CityRanking(t);
            }
            else {
                list = provide.CityRanking();
            }
            var my = provide.MyRanking();
            return new Models.Rank.MyRanking { My=my, List=list };
        }
        
        /// <summary>
        /// 单个活动省排名
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="province"></param>
        /// <param name="top"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public Models.Rank.MyRanking GetProvinceRanking(string openId, string province, string top, string item)
        {
            var list = new List<Models.Rank.Ranking>();
            Helper.RankingProvide provide = null;
            provide = new Helper.RankingProvide(item, openId,province,"province");

            int t = 0;
            var b = int.TryParse(top, out t);
            if (b)
            {
                list = provide.ProvinceRanking(t);
            }
            else
            {
                list = provide.ProvinceRanking();
            }
            var my = provide.MyRanking();
            return new Models.Rank.MyRanking { My = my, List = list };
        }
        /// <summary>
        /// 单个活动全国排名
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="item"></param>
        /// <param name="top"></param>
        /// <returns></returns>
        public Models.Rank.MyRanking GetNationwideRanking(string openid, string item, string top)
        {
            var list = new List<Models.Rank.Ranking>();
            Helper.RankingProvide provide = null;
            provide = new Helper.RankingProvide(item, openid);
            
            int t = 0;
            var b = int.TryParse(top, out t);
            if (b)
            {
                list = provide.NationwideRanking(t);
            }
            else
            {
                list = provide.NationwideRanking();
            }
            var my = provide.MyRanking();
            return new Models.Rank.MyRanking { My = my, List = list };
        }
        public Models.Rank.MyRanking GetMonthRanking(string openid, string item, string top, int Year = 0, int Month = 0)
        {
            Year = Year == 0 ? DateTime.Now.Year : Year;
            Month = Month == 0 ? DateTime.Now.Month : Month;
            BLL.Wx_TestQuestion_Item_Ranking bll = new BLL.Wx_TestQuestion_Item_Ranking();
            var list = bll.GetModelList("ActiveId=" + item + " and Year=" + Year + " and Month=" + Month).OrderByDescending(e => e.Score).ThenBy(e => e.UsingTime);
            List<Models.Rank.Ranking> rank = new List<Models.Rank.Ranking>();
            int index = 0;
            foreach (var m in list)
            {
                ++index;
                var player = SfSoft.web.Gxdr.Helper.PlayerProvide.GetPlayer(m.OpenId);
                rank.Add(new Models.Rank.Ranking()
                {
                    Index = index,
                    City = player.City,
                    District = player.District,
                    HeaderImgUrl = player.HeaderImgUrl,
                    NickName = player.NickName,
                    OpenId = player.ServiceOpenID,
                    Province = player.Province,
                    Score = m.Score,
                    Street = player.Street,
                    UsingTime = m.UsingTime
                });
            }
            var my= rank.FirstOrDefault(e => e.OpenId == openid);
            return new Models.Rank.MyRanking { My = my, List = rank };
        }

        /// <summary>
        /// 获取名次
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="ranking"></param>
        /// <returns></returns>
        public int GetRanking(List<Course.Models.Prize.Gxdr> list, Models.Rank.Ranking myRanking )
        {
            BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
            if (myRanking == null) return 0;
            var newList=list.OrderBy(e=>e.Ranking);
            foreach (var m in list) {
                if (m.LowLimit <= myRanking.Index && m.UpperLimit >= myRanking.Index)
                {
                    return m.Ranking;
                }
            }
            return 0;
        }
    }
}