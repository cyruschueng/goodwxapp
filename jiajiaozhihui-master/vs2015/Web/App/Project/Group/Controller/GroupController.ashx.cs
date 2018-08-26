using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Group.Controller
{
    /// <summary>
    /// GroupController 的摘要说明
    /// </summary>
    public class GroupController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetGroupInfo(context);
        }

        public void GetGroupInfo(HttpContext context)
        {
            var groupId = context.Request["groupId"];
            var contentId = context.Request["contentId"];
            var catalogue = context.Request["catalogue"];

            if (!string.IsNullOrEmpty(groupId) && !string.IsNullOrEmpty(contentId))
            {
                var group= Helper.GroupProvide.GetSGrop(int.Parse(groupId));
                var content = Helper.GroupProvide.GetSGroupContent(int.Parse(groupId),catalogue);
                var result = new {
                    ImgUrl = !string.IsNullOrEmpty(content.img_url)? App.Helper.WxBaseConfig.WebSite + content.img_url.Substring(1) : "",
                    GroupImgUrl=!string.IsNullOrEmpty(group.img_url)? App.Helper.WxBaseConfig.WebSite+group.img_url.Substring(1):"",
                    Desc=group.introduce,
                    Title=group.group_name,
                    Remark=group.Remark,
                    ClassName=content.class_name,
                    GroupName=Helper.GroupProvide.CurrGroupName(groupId,catalogue)
                };
                var info= Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
                Action<Model.WX_SGroup_Content> action = (m) => {
                    if (m != null && m.title != "")
                    {
                        Helper.GroupProvide.SetGroupQuantity(m);
                    }
                };
                action.BeginInvoke(content, null, null);
                context.Response.Write(info);
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}