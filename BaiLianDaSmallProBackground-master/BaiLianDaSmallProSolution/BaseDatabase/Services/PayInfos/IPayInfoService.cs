using BaseDatabase.Entities.PayInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.PayInfos
{
    public interface IPayInfoService
    {
        void Insert(PayInfo entity);

        void Update(PayInfoModel model);

        void Delete(int id);

        PayInfoModel GetById(int id);

        void RemoveAll();

        PayInfoModel GetLast();

        PayInfo GetHasPayedPayInfoBySerialNumber(string tradeNo);

        PayInfoModel GetUnpayPayInfoBySerialNumber(string tradeNo);
    }
}
