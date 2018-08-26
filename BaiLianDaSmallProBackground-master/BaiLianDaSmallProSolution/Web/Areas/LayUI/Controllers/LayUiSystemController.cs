using BaseDatabase.Services.Admins.AdminUserInfos;
using MyUntil;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Areas.LayUI.Models;
using Web.Areas.LayUI.Models.Systems;
using Web.Infrastructure;
using Web.InstanceMangers;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiSystemController : BaseAdminWebController
    {
        private readonly CurrentWebContext _currentWebContext;
        private readonly IAdminUserInfoService _adminUserInfoService;
        public LayUiSystemController()
        {
            _currentWebContext = InstanceManger.GetCurrentWebContext();
            _adminUserInfoService = new AdminUserInfoService();
        }

        public ActionResult ChangePwd()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ChangePwd(string confirmPassword)
        {
            var model = new BaseReturnModel()
            {
                IsSuccess = false,
                ReturnMsg = "修改失败"
            };

            if (_currentWebContext.IsAdminUserLogined)
            {
                try
                {
                    var adminUser = _currentWebContext.LoginAdminUser;
                    var salt = StringHelper.GetSaltStr();
                    adminUser.Password = EncryptHelper.Md5(confirmPassword, salt);
                    adminUser.PwdSalt = salt;
                    _adminUserInfoService.Update(adminUser);
                    model.IsSuccess = true;
                    model.ReturnMsg = "修改完成，请重新登录";
                }
                catch (Exception ex)
                {
                    model.ReturnMsg = ex.Message;
                }
            }

            return Json(model);
        }

        [HttpPost]
        public ActionResult CheckOldPwd(string oldPwd)
        {
            var model = new CheckOldPwdModel()
            {
                IsSuccess = false,
                ReturnMsg = "请输入正确的旧密码"
            };

            var adminUser = _currentWebContext.LoginAdminUser;
            var currentPwd = EncryptHelper.Md5(oldPwd, adminUser.PwdSalt);
            if (adminUser != null && currentPwd.Equals(adminUser.Password))
            {
                model.IsSuccess = true;
                model.ReturnMsg = "旧密码正确";
            }

            return Json(model);
        }
    }
}