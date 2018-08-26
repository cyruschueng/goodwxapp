using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.UserInfos;
using EntityFramework.Extensions;

namespace BaseDatabase.Services.UserInfos
{
    public class UserInfoService : IUserInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.UserInfos.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.UserInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public UserInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.UserInfos.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(UserInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.UserInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(UserInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.UserInfos.Find(model.Id);

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
                var query = db.UserInfos.AsNoTracking();
                query.Delete();
            }
        }

        public UserInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.UserInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }


        public UserInfoModel GetByOpenId(string openId)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.UserInfos.FirstOrDefault(q => q.OpenId == openId);
                return entity.ToModel();
            }
        }
    }
}
