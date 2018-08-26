using BaseDatabase.AutoMaps;
using BaseDatabase.Entities.PayInfos;
using EntityFramework.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.PayInfos
{
    public class PayInfoService : IPayInfoService
    {
        public void Delete(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PayInfos.Find(id);
                if (entity == null)
                {
                    throw new Exception("entity is null");
                }
                db.PayInfos.Remove(entity);
                db.SaveChanges();
            }
        }

        public PayInfoModel GetById(int id)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PayInfos.Find(id);
                if (entity == null)
                {
                    return null;
                }
                return entity.ToModel();
            }
        }

        public void Insert(PayInfo entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            using (var db = new BaseDatabaseContext())
            {
                db.PayInfos.Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(PayInfoModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            using (var db = new BaseDatabaseContext())
            {
                var oldEntity = db.PayInfos.Find(model.Id);

                if (oldEntity == null)
                {
                    throw new Exception("oldEntity is null");
                }
                oldEntity = model.ToEntity(db.PayInfos.Find(model.Id));
                db.SaveChanges();
            }
        }

        public void RemoveAll()
        {
            using (var db = new BaseDatabaseContext())
            {
                var query = db.PayInfos.AsNoTracking();
                query.Delete();
            }
        }

        public PayInfoModel GetLast()
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PayInfos.OrderByDescending(q => q.Id).FirstOrDefault();
                return entity.ToModel();
            }
        }

        public PayInfo GetHasPayedPayInfoBySerialNumber(string tradeNo)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PayInfos.FirstOrDefault(q => q.IsPay && q.TradeNo == tradeNo);
                return entity;
            }
        }

        public PayInfoModel GetUnpayPayInfoBySerialNumber(string tradeNo)
        {
            using (var db = new BaseDatabaseContext())
            {
                var entity = db.PayInfos.OrderByDescending(q => q.Id).FirstOrDefault(q => !q.IsPay && q.TradeNo == tradeNo);
                return entity.ToModel();
            }
        }
    }
}
