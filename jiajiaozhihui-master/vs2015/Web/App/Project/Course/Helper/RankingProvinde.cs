using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class RankingProvinde
    {
        public RankingProvinde(int courseId)
        {
            BLL.WX_Course_Config bll = new BLL.WX_Course_Config();
            var model= bll.GetModel(courseId);
            if (model != null) {
                this.CourseId = model.CourseId;
                this.GxdrId = model.GxdrItemId;
            }
        }
        public Models.Ranking.RankingInfo GxdrRanking(string openId, string top)
        {
            SfSoft.web.Gxdr.Helper.RankingProvide provide = new SfSoft.web.Gxdr.Helper.RankingProvide();
            var date = DateTime.Now.AddMonths(-1);
            var ranking = provide.GetMonthRanking(openId, GxdrId.ToString(), top, date.Year, date.Month);

            var rule = GetRule();
            if ((rule.IsAct ?? 0) == 0)
            {
                return  new Models.Ranking.RankingInfo
                {
                    IsAct = 0,
                    CourseId = this.CourseId,
                    GxdrId = this.GxdrId,
                    GxdrName = GetGxdrName(),
                    OpenId = openId,
                };
            }
            else
            {
                var _gxdrName = GetGxdrName();
                var _rule = GetPrizeSet();
                return new Models.Ranking.RankingInfo
                {
                    IsAct = 1,
                    CourseId = this.CourseId,
                    Doc = rule.Detail,
                    GxdrId = this.GxdrId,
                    GxdrName = _gxdrName,
                    OpenId = openId,
                    Rule = _rule,
                    Ranking = ranking,
                    Top = provide.GetRanking(_rule, ranking.My)
                };
            }
        }
        /// <summary>
        /// 国学达人的项目名称
        /// </summary>
        /// <param name="gxdrId"></param>
        /// <returns></returns>
        public string  GetGxdrName()
        {
            var model = SfSoft.web.Gxdr.Helper.QuestionActivityProvide.GetQuestionActive(this.GxdrId);
            return model == null ? "" : model.ActivityName;
        }
        /// <summary>
        /// 活动规则
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public Model.WX_Course_RuleDoc GetRule()
        {
            BLL.WX_Course_RuleDoc bll = new BLL.WX_Course_RuleDoc();
            var list = bll.GetModelList("CourseId=" + this.CourseId);
            if (list.Count > 0) {
                return list[0];
            }
            return new Model.WX_Course_RuleDoc();
        }
        /// <summary>
        /// 奖品设置
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public List<Models.Prize.Gxdr> GetPrizeSet()
        {
            BLL.WX_Course_RuleSet bll = new BLL.WX_Course_RuleSet();
            var list= bll.GetModelList("CourseId=" + this.CourseId);
            List<Models.Prize.Gxdr> prizes = new List<Models.Prize.Gxdr>();
            foreach (var m in list) { 
                var goods=GetGood(m.GoodsId);
                prizes.Add(new Models.Prize.Gxdr(){
                    CourseId=m.CourseId,
                    GoodsId=m.GoodsId,
                    GoodsName = goods.GoodName,
                    GoodsImg=App.Helper.WxBaseConfig.WebSite+ goods.ImgURL.Substring(1),
                    LowLimit=m.LowLimit,
                    UpperLimit=m.UpperLimit,
                    Ranking=m.Ranking
                });
            }
            return prizes;
        }
        private Model.WX_PublicGood GetGood(int goodId)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            var model= bll.GetModel(goodId);
            if (model == null) return new Model.WX_PublicGood();
            return model;
        }

        /// <summary>
        /// 课程Id
        /// </summary>
        public int CourseId { get; private set; }
        /// <summary>
        /// 国学达人Id
        /// </summary>
        public int GxdrId { get; private set; }
    }
}