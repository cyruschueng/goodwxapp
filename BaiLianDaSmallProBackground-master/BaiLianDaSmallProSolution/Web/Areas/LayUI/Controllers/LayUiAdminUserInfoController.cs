using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Services.Admins.AdminUserInfos;
using MyUntil;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Areas.LayUI.Models;
using Web.Filters;
using Web.Infrastructure;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiAdminUserInfoController : BaseAdminWebController
    {
        private readonly IAdminUserInfoService _adminUserInfoService;
        public LayUiAdminUserInfoController()
        {
            _adminUserInfoService = new AdminUserInfoService();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List(ListSearch search,string userName)
        {
            var model = new ListResult();
            try
            {
                var list = _adminUserInfoService.GetPageList(search.pageIndex, search.limit, userName);

                model.count = list.TotalRecords;
                model.data = list.Datas;
            }
            catch (Exception ex)
            {
                model.code = -1;
                model.msg = ex.Message;
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Add(AdminUserInfoModel paraModel)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };

            var salt = StringHelper.GetSaltStr();

            var pwd = EncryptHelper.Md5(paraModel.Password, salt);
            try
            {
                _adminUserInfoService.Insert(new AdminUserInfo()
                {
                    UserName = paraModel.UserName,
                    Password = pwd,
                    PwdSalt = salt,
                    CreateOn = DateTime.Now
                });
                model.IsSuccess = true;
                model.ReturnMsg = "添加完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }
            return Json(model);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };
            try
            {
                _adminUserInfoService.Delete(id);
                model.IsSuccess = true;
                model.ReturnMsg = "删除完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        [HttpPost]
        public ActionResult CheckUserName(string userName)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "验证失败" };
            try
            {
                var isExists = _adminUserInfoService.IsExistUserName(userName);

                if (isExists)
                {
                    model.IsSuccess = false;
                    model.ReturnMsg = "该用户名已存在";
                }
                else
                {
                    model.IsSuccess = true;
                    model.ReturnMsg = "";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }
            

            return Json(model);
        }
    }
}