using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class HomeProvide
    {
        private Model.WX_Audio_Plan todayPlan;
        private List<Models.Plan.PlanList> planList;
        private List<Models.Category.CategoryInfo> categoryInfos;
        private string appId;
        private string openId;
        public HomeProvide(string appId,string openId)
        {
            this.appId = appId;
            this.openId = openId;
            //今天的计划
            todayPlan= Helper.PlanProvide.GetTodayPlan();
            //今天计划详细数据
            planList = Helper.PlanListProvide.GetPlanList(todayPlan.Id).OrderBy(e=>e.PPCategoryId).ToList();

            categoryInfos = Helper.CategoryProvide.GetCategoryList();

        }
        public Models.Home.HomeInfo GetHomeInfo(string openId)
        {
            //获取大类
            var categorys = categoryInfos.Where(e => e.Pid == 0);

            Models.Home.HomeInfo info = new Models.Home.HomeInfo();
            List<Models.Plan.PlanList> todayPlans = new List<Models.Plan.PlanList>();
            foreach (var plan in planList) {
                todayPlans.Add(new Models.Plan.PlanList
                {
                    AudioId=plan.AudioId,
                    CategoryId=plan.CategoryId,
                    CategoryInfo=categoryInfos.Where(e=>e.CategoryId==plan.CategoryId).FirstOrDefault(),
                    CategoryPath=plan.CategoryPath,
                    Cover=plan.Cover,
                    FullName=plan.FullName,
                    PlanId=plan.PlanId,
                    PlayNumber=plan.PlayNumber??0,
                    ShortName=plan.ShortName,
                    SoundSource=plan.SoundSource,
                    PPCategoryId=plan.PPCategoryId,
                    IsFavorite=Helper.FavoriteProvide.IsExist(appId,openId,plan.AudioId),
                    Duration=plan.Duration??0
                });
            }
            info.TodayPlans = todayPlans;
            //当前的播放记录
            info.CurrPlay = Helper.MyRecordProvide.GetMyRecord(openId, todayPlan.Id);

            return info;
        }
        private  List<Models.Audio.AudioInfo> GetTodayAudio(int categoryId)
        {
            List<Models.Audio.AudioInfo> audioInfos = new List<Models.Audio.AudioInfo>();
            var list= planList.Where(e => e.PPCategoryId == categoryId);
            foreach (var m in list) {
                audioInfos.Add(new Models.Audio.AudioInfo
                {
                    AudioId = m.AudioId,
                    CategoryPath = m.CategoryPath,
                    Cover = m.Cover,
                    FullName = m.FullName,
                    PlayNumber = m.PlayNumber??0,
                    ShortName = m.ShortName,
                    SoundSource = m.SoundSource,
                    CategoryId=m.CategoryId,
                    Duration=m.Duration??0
                });
            }
            return audioInfos;
        }
    }
}