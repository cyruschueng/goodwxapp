using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class ExpertProvide
    {
        public static Models.Expert.ExpertInfo GetExpert(int expertId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model= bll.GetModel(expertId);
            if (model == null) {
                model = new Model.WX_JJZH_Expert();
            }
            return new Models.Expert.ExpertInfo()
            {
                ExpertId = expertId,
                HeadImgUrl = model.HeadImgUrl,
                Name = model.UName,
                NickName = model.NickName,
                ImgUrl = website + model.ImgUrl,
                Intro=model.Intro
            };
        }
    }
}