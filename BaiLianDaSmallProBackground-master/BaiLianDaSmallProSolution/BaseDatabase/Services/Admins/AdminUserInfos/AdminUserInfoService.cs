using BaseDatabase.AutoMaps.Admins;
using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Pages;
using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.Admins.AdminUserInfos
{
    public class AdminUserInfoService : IAdminUserInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdminUserInfos.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.AdminUserInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public AdminUserInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdminUserInfos.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(AdminUserInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.AdminUserInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(AdminUserInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.AdminUserInfos.Find(model.Id);

                if (oldEntity == null)
                {
                    throw new Exception("oldEntity is null");
                }
                oldEntity = model.ToEntity(oldEntity);
                db.SaveChanges();
            }
        }

        public void RemoveAll()
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.AdminUserInfos.AsNoTracking();
                query.Delete();
            }
        }

        public AdminUserInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdminUserInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }

        public IPageList<AdminUserInfo> GetPageList(int page, int size,string userName)
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.AdminUserInfos.AsNoTracking().AsQueryable();

                if (!string.IsNullOrEmpty(userName))
                {
                    query = query.Where(q => q.UserName.Contains(userName));
                }

                query = query.OrderByDescending(q => q.Id);
                return new PageList<AdminUserInfo>(query, page, size);
            }
        }

        public bool IsExistUserName(string userName)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdminUserInfos.FirstOrDefault(q => q.UserName == userName);
                return entity != null;
            }
        }

        public AdminUserInfoModel GetByUserName(string userName)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdminUserInfos.FirstOrDefault(q => q.UserName == userName);
                if (entity != null)
                {
                    return entity.ToModel();
                }
                else
                {
                    return null;
                }
            }
        }

        public void SetLoginInfo(string userName, string ip)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                using (var db = new BaseDatabaseContext())
                {
                    var entity = db.AdminUserInfos.FirstOrDefault(q => q.UserName == userName);
                    if (entity != null)
                    {
                        var model = entity.ToModel();
                        model.LastLoginDate = DateTime.Now;
                        model.LoginSuccessTimes = model.LoginSuccessTimes + 1;
                        model.LastLoginIp = ip;
                        Update(model);
                    }
                }
            }
        }
    }
}
