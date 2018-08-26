using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.BaseSettings;
using BaseDatabase.Services.PaySettings;
using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.PaySettings
{
    public class PaySettingService : IPaySettingService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PaySettings.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.PaySettings.Remove(entity);
                db.SaveChanges();
            }
        }

        public PaySettingModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PaySettings.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(PaySetting entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.PaySettings.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(PaySettingModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.PaySettings.Find(model.Id);

                if (oldEntity == null)
                {
                    throw new Exception("oldEntity is null");
                }
                oldEntity = model.ToEntity(db.PaySettings.Find(model.Id));
                db.SaveChanges();
            }
        }

        public void RemoveAll()
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.PaySettings.AsNoTracking();
                query.Delete();
            }
        }

        public PaySettingModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PaySettings.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }
    }
}
