using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Services.Admins.AdminUserInfos;
using MyUntil;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using Web.Models;

namespace Web.Infrastructure
{
    public class CurrentWebContext
    {
        private readonly IAdminUserInfoService _adminUserInfoService;
        private readonly string _cookieIdStr = FormsAuthentication.FormsCookieName + ".Admin";
        private readonly TimeSpan _timeOut;

        public CurrentWebContext()
        {
            _adminUserInfoService = new AdminUserInfoService();
            _timeOut = FormsAuthentication.Timeout;
        }

        private AdminUserInfoModel _loginAdminUser;

        private AdminUserInfoModel GetAdminUserInfo()
        {
            if (HttpContext.Current == null)
            {
                return null;
            }

            var cookie = HttpContext.Current.Request.Cookies[_cookieIdStr];
            if (cookie == null || string.IsNullOrEmpty(cookie.Value))
            {
                return null;
            }
            FormsAuthenticationTicket ticket = null;
            try
            {
                ticket = FormsAuthentication.Decrypt(cookie.Value);
                if (ticket.Expired)
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }

            if (ticket == null)
            {
                return null;
            }

            var userName = ticket.UserData;
            if (string.IsNullOrWhiteSpace(userName))
            {
                return null;
            }

            if (_loginAdminUser != null && _loginAdminUser.UserName.ToLower().Equals(userName.ToLower()))
            {
                return _loginAdminUser;
            }

            return _adminUserInfoService.GetByUserName(userName);
        }

        public bool IsAdminUserLogined
        {
            get
            {
                return LoginAdminUser != null;
            }
        }

        private static object LoginAdminUserLock = new object();

        public AdminUserInfoModel LoginAdminUser
        {
            get
            {
                lock (LoginAdminUserLock)
                {
                    if (SystemConst.EnableAdminAuth)
                    {
                        _loginAdminUser = GetAdminUserInfo();
                    }
                    else
                    {
                        _loginAdminUser = _adminUserInfoService.GetByUserName("admin");
                    }
                }
                return _loginAdminUser;
            }

            set
            {
                _loginAdminUser = value;
            }
        }

        public void SetLogin(AdminUserInfoModel adminUserInfo, bool isPersistent = false)
        {
            var now = DateTime.Now;
            var ticket = new FormsAuthenticationTicket(
                version: 1,
                name: Guid.NewGuid().ToString("N"),
                issueDate: now,
                expiration: now.Add(_timeOut),
                isPersistent: isPersistent,
                userData: adminUserInfo.UserName,
                cookiePath: FormsAuthentication.FormsCookiePath);

            var cookie = new HttpCookie(_cookieIdStr, FormsAuthentication.Encrypt(ticket));
            cookie.HttpOnly = true;
            cookie.Secure = FormsAuthentication.RequireSSL;
            cookie.Path = FormsAuthentication.FormsCookiePath;
            if (FormsAuthentication.CookieDomain != null)
            {
                cookie.Domain = FormsAuthentication.CookieDomain;
            }
            HttpContext.Current.Response.Cookies.Add(cookie);
            _loginAdminUser = adminUserInfo;
            try
            {
                _adminUserInfoService.SetLoginInfo(adminUserInfo.UserName, IpAddressHelper.GetIp());
            }
            catch
            {

            }
        }

        public void SetLoginOut()
        {
            _loginAdminUser = null;
            var cookie = new HttpCookie(_cookieIdStr);
            cookie.Expires = DateTime.Now.AddSeconds(-1);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}