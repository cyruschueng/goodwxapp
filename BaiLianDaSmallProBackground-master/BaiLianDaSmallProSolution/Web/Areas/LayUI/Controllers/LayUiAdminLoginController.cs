using BaseDatabase.Services.Admins.AdminUserInfos;
using MyUntil;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Areas.LayUI.Models;
using Web.Infrastructure;
using Web.InstanceMangers;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiAdminLoginController : Controller
    {
        private readonly IAdminUserInfoService _adminUserInfoService;

        private readonly CurrentWebContext _currentWebContext;

        public LayUiAdminLoginController()
        {
            _adminUserInfoService = new AdminUserInfoService();
            _currentWebContext = InstanceManger.GetCurrentWebContext(); ;
        }

        public ActionResult Login()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Login(string account, string pwd)
        {
            var model = new BaseReturnModel()
            {
                IsSuccess = false,
                ReturnMsg = "用户名或密码有误"
            };

            try
            {
                var entity = _adminUserInfoService.GetByUserName(account);
                if (entity != null)
                {
                    if (entity.Password.Equals(EncryptHelper.Md5(pwd, entity.PwdSalt)))
                    {
                        _currentWebContext.SetLogin(entity, true);
                        model.IsSuccess = true;
                        model.ReturnMsg = "成功登录";
                    }
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        public ActionResult LogOut()
        {
            _currentWebContext.SetLoginOut();
            return new RedirectResult("/admin");
        }
    }
}