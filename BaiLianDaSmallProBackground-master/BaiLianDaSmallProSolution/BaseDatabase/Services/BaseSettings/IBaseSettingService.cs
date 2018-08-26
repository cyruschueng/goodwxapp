using BaseDatabase.Entities.BaseSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Services.BaseSettings
{
    public interface IBaseSettingService
    {
        void Insert(BaseSetting entity);

        void Update(BaseSettingModel model);

        void Delete(int id);

        BaseSettingModel GetById(int id);

        void RemoveAll();

        BaseSettingModel GetLast();
    }
}
