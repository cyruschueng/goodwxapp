using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class PrizeOrderProvide
    {
        public Models.Ranking.RankingInfo GetGxdrRanking(string openId,string top, string courseId)
        {
            Helper.RankingProvinde helper = new Helper.RankingProvinde(int.Parse(courseId));
            var data = helper.GxdrRanking(openId, top);
            return data;
        }
    }
}