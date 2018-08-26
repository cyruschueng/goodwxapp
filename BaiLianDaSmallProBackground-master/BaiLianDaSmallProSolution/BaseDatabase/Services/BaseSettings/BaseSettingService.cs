using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.BaseSettings;
using EntityFramework.Extensions;

namespace BaseDatabase.Services.BaseSettings
{
    public class BaseSettingService : IBaseSettingService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.BaseSettings.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.BaseSettings.Remove(entity);
                db.SaveChanges();
            }
        }

        public BaseSettingModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.BaseSettings.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(BaseSetting entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.BaseSettings.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(BaseSettingModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.BaseSettings.Find(model.Id);

                if (oldEntity == null)
                {
                    throw new Exception("oldEntity is null");
                }
                oldEntity = model.ToEntity(db.BaseSettings.Find(model.Id));
                db.SaveChanges();
            }
        }

        public void RemoveAll()
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.BaseSettings.AsNoTracking();
                query.Delete();
            }
        }

        public BaseSettingModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.BaseSettings.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }
    }
}
