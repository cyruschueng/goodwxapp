using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.ShareLogs;
using EntityFramework.Extensions;

namespace BaseDatabase.Services.ShareLogs
{
    public class ShareInfoService : IShareInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareInfos.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.ShareInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public ShareInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareInfos.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(ShareInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.ShareInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(ShareInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.ShareInfos.Find(model.Id);

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
                var query = db.ShareInfos.AsNoTracking();
                query.Delete();
            }
        }

        public ShareInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }
    }
}
