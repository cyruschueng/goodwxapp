using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class CategoryProvide
    {
        public static List<Models.Category.CategoryInfo> GetCategoryList()
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            List<Models.Category.CategoryInfo> categorys = new List<Models.Category.CategoryInfo>();
            var list = bll.GetModelList("");
            foreach (var m in list) {
                categorys.Add(new Models.Category.CategoryInfo
                {
                    FullName = m.FullName,
                    CategoryId= m.Id,
                    MaxImgUrl =website+ m.MaxImgUrl,
                    MiniImgUrl = website+m.MiniImgUrl,
                    ShortName = m.ShortName,
                    Pid=m.Pid??0,
                    IsAct=m.IsAct??0
                });
            }
            return categorys;
        }
        public static Models.Category.PathInfo GetCategoryPath (string cateoryPath)
        {
            if (cateoryPath.Trim() == "") return new Models.Category.PathInfo();
            var cateorys = cateoryPath.Split('/');
            Models.Category.PathInfo info = new Models.Category.PathInfo();
            info.PPCategoryId = int.Parse(cateorys[0]);
            info.PCategoryId = int.Parse(cateorys[1]);
            return info;
        }
        public static List<Models.Category.CategoryRelation> GetCategoryRelation()
        {
            List<Models.Category.CategoryRelation> infos = new List<Models.Category.CategoryRelation>();
            var cagetorys = GetCategoryList();
            var firstCatetorys = cagetorys.Where(e => e.Pid == 0 && e.IsAct == 1);
            foreach (var c in firstCatetorys) {
                infos.Add(new Models.Category.CategoryRelation
                {
                    CategoryId = c.CategoryId,
                    FullName = c.FullName,
                    IsAct = c.IsAct,
                    MaxImgUrl = c.MiniImgUrl,
                    MiniImgUrl = c.MiniImgUrl,
                    Pid = c.Pid,
                    ShortName = c.ShortName,
                    SubCategory = GetCategoryList(c.CategoryId),
                });
            }
            return infos;
        }
        public static List<Models.Category.CategoryInfo> GetCategoryList(int pid)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_Audio_Category bll = new BLL.WX_Audio_Category();
            List<Models.Category.CategoryInfo> categorys = new List<Models.Category.CategoryInfo>();
            var list = bll.GetModelList("pid="+pid);
            foreach (var m in list)
            {
                categorys.Add(new Models.Category.CategoryInfo
                {
                    FullName = m.FullName,
                    CategoryId = m.Id,
                    MaxImgUrl = website + m.MaxImgUrl,
                    MiniImgUrl = website + m.MiniImgUrl,
                    ShortName = m.ShortName,
                    Pid = m.Pid ?? 0,
                    IsAct = m.IsAct ?? 0
                });
            }
            return categorys;
        }
    }
}