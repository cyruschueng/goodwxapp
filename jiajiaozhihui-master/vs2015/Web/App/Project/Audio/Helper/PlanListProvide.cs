using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Audio.Helper
{
    public class PlanListProvide
    {
        public static List<Models.Plan.PlanList> GetPlanList(int planId)
        {
            string sql = "select * from (" +
                " select a.*,b.FullName,b.ShortName,b.SoundSource,b.Cover,b.PlayNumber,b.CategoryPath,b.CategoryId,b.Duration from WX_Audio_PlanList a" +
                " left join WX_Audio b on a.AudioId=b.Id" +
                " )a where planId="+planId;
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<Models.Plan.PlanList> planList = new List<Models.Plan.PlanList>();
            var categorys=Helper.CategoryProvide.GetCategoryList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    planList.Add(new Models.Plan.PlanList
                    {
                        AudioId = dr.Field<int>("AudioId"),
                        CategoryPath = dr.Field<string>("CategoryPath"),
                        Cover = dr.Field<string>("Cover"),
                        FullName = dr.Field<string>("FullName"),
                        PlanId = dr.Field<int>("PlanId"),
                        PlayNumber = dr.Field<int?>("PlayNumber")??0,
                        ShortName = dr.Field<string>("ShortName"),
                        SoundSource = dr.Field<string>("SoundSource"),
                        CategoryId = dr.Field<int>("CategoryId"),
                        CategoryInfo = categorys.Find(e => e.CategoryId == dr.Field<int>("CategoryId")),
                        PPCategoryId = Helper.CategoryProvide.GetCategoryPath(dr.Field<string>("CategoryPath")).PPCategoryId,
                        Duration = dr.Field<int?>("Duration"),
                    });
                }
            }
            return planList;
        }
    }
}