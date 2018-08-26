using BaseDatabase.Entities.BaseSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.PaySettings
{
    public interface IPaySettingService
    {
        void Insert(PaySetting entity);

        void Update(PaySettingModel model);

        void Delete(int id);

        PaySettingModel GetById(int id);

        void RemoveAll();

        PaySettingModel GetLast();
    }
}
