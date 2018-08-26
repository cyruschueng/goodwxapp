using BaseDatabase.AutoMaps.Admins;
using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using BaseDatabase.Pages;
using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.Admins.AdvertisingSpaces
{
    public class AdvContentInfoService : IAdvContentInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdvContentInfos.FirstOrDefault(q => q.Id == id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.AdvContentInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public AdvContentInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdvContentInfos.FirstOrDefault(q => q.Id == id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(AdvContentInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.AdvContentInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(AdvContentInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.AdvContentInfos.FirstOrDefault(q => q.Id == model.Id);

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
                var query = db.AdvContentInfos.AsNoTracking();
                query.Delete();
            }
        }

        public AdvContentInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.AdvContentInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }

        public IPageList<AdvContentInfo> GetPageList(int page, int size, string contentJsonKeyword, string advertisingSpaceInfoSign)
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.AdvContentInfos.AsQueryable();

                if (!string.IsNullOrEmpty(contentJsonKeyword))
                {
                    query = query.Where(q => q.ContentJsonKeyword.Contains(contentJsonKeyword));
                }

                if (!string.IsNullOrEmpty(advertisingSpaceInfoSign))
                {
                    query = query.Where(q => q.AdvertisingSpaceInfoSign == advertisingSpaceInfoSign);
                }

                query = query.OrderByDescending(q => q.Id);
                return new PageList<AdvContentInfo>(query, page, size);
            }
        }
    }
}
