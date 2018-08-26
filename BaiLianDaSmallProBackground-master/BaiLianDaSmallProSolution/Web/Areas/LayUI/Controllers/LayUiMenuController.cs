using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Areas.LayUI.Models.Menus;
using Web.Infrastructure;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiMenuController : BaseAdminWebController
    {
        [HttpPost]
        public ActionResult GetMenuJson()
        {
            var model = new List<MenuModel>
            {
                new MenuModel()
                {
                    Title = "首页",
                    Icon = "icon-barrage",
                    Href = "/layui/layuihome/index",
                    Spread = false,
                    ModuleId = 1
                },
                new MenuModel()
                {
                    Title = "系统用户",
                    Icon = "icon-barrage",
                    Href = "/layui/LayUiAdminUserInfo/index",
                    Spread = false,
                    ModuleId = 1
                },
                new MenuModel()
                {
                    Title = "修改密码",
                    Icon = "icon-barrage",
                    Href = "/layui/LayUiSystem/changepwd",
                    Spread = false,
                    ModuleId = 1
                },
                new MenuModel()
                {
                    Title = "广告",
                    Icon = "icon-barrage_fill",
                    Href = "",
                    Spread = true,
                    ModuleId = 2,
                    Children = new List<ChildrenMenuModel>()
                    {
                        new ChildrenMenuModel()
                        {
                            Title = "广告位",
                            Icon = "icon-barrage",
                            Href = "/layui/LayUiAdv/AdvertisingSpaceIndex",
                            Spread = false,
                        },
                        new ChildrenMenuModel()
                        {
                            Title = "广告内容",
                            Icon = "icon-barrage",
                            Href = "/layui/LayUiAdv/AdvContentIndex",
                            Spread = false,
                        }
                    }
                }
            };
            return Json(model);
        }
    }
}