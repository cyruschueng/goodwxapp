using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class DownLoadProvide
    {
        public static IEnumerable<Models.DownLoad.DownLoadInfo> GetDownLoads(string tag)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            List<Models.DownLoad.DownLoadInfo> downLoadInfos = new List<Models.DownLoad.DownLoadInfo>();
            BLL.WX_Audio_DownLoad bll = new BLL.WX_Audio_DownLoad();
            var list = bll.GetModelList("");
            if (string.IsNullOrEmpty(tag)) {
                foreach (var m in list) { 
                    downLoadInfos.Add(new Models.DownLoad.DownLoadInfo{
                        CreatDate=m.CreateDate,
                        Detail=m.Detail,
                        DownLoadUrl=m.DownLoadUrl,
                        ImgUrl = website+m.ImgUrl,
                        Intro=m.Intro,
                        Tag=m.Tag,
                        Title=m.Title,
                        Id=m.Id
                    });
                }
                return downLoadInfos;
            }
           var newList= list.Where(e =>e.Tag.Split(',').Contains(tag));
           foreach (var m in newList)
           {
               downLoadInfos.Add(new Models.DownLoad.DownLoadInfo
               {
                   CreatDate = m.CreateDate,
                   Detail = m.Detail,
                   DownLoadUrl = m.DownLoadUrl,
                   ImgUrl = website + m.ImgUrl,
                   Intro = m.Intro,
                   Tag = m.Tag,
                   Title = m.Title
               });
           }
           return downLoadInfos;
        }
        public static Models.DownLoad.DownLoadInfo GetDownLoad(int downLoadId)
        {
            var list = GetDownLoads("");
            if (list.Count() > 0) {
                return list.Where(e => e.Id == downLoadId).FirstOrDefault();
            }
            return new Models.DownLoad.DownLoadInfo();
        }
    }
}