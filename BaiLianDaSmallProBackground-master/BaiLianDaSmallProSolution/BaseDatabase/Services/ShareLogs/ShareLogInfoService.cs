using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.ShareLogs;
using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.ShareLogs
{
    public class ShareLogInfoService : IShareLogInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareLogInfos.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.ShareLogInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public ShareLogInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareLogInfos.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(ShareLogInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.ShareLogInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(ShareLogInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.ShareLogInfos.Find(model.Id);

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
                var query = db.ShareLogInfos.AsNoTracking();
                query.Delete();
            }
        }

        public ShareLogInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareLogInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }

        public string GetShareNickNameById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareLogInfos.FirstOrDefault(q => q.Id == id);
                if (entity!=null)
                {
                    return entity.ShareUserInfo.NickName;
                }
                else
                {
                    return string.Empty;
                }
            }
        }

        public bool IsExists(int shareUserInfoId, int targetUserInfoId, int shareType)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.ShareLogInfos.FirstOrDefault(q => q.ShareUserInfoId == shareUserInfoId 
                && q.TargetUserInfoId == targetUserInfoId 
                && q.ShareType == (ShareType)shareType);
                return entity != null;
            }
        }
    }
}
