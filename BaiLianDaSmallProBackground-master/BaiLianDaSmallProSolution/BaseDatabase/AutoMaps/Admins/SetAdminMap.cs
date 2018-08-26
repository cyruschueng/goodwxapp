using AutoMapper;
using BaseDatabase.Entities.Admins.AdminUserInfos;
using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.AutoMaps.Admins
{
    public class SetAdminMap
    {
        public static void Config(IMapperConfigurationExpression cfg)
        {
            #region AdminUserInfo

            cfg.CreateMap<AdminUserInfo, AdminUserInfoModel>();
            cfg.CreateMap<AdminUserInfoModel, AdminUserInfo>()
                .ForMember(q => q.CreateOn, d => d.Ignore());

            #endregion

            #region AdvertisingSpaceInfo

            cfg.CreateMap<AdvertisingSpaceInfo, AdvertisingSpaceInfoModel>();
            cfg.CreateMap<AdvertisingSpaceInfoModel, AdvertisingSpaceInfo>()
                .ForMember(q => q.CreateOn, d => d.Ignore())
                .ForMember(q => q.Sign, d => d.Ignore());

            #endregion

            #region AdvContentInfo

            cfg.CreateMap<AdvContentInfo, AdvContentInfoModel>();
            cfg.CreateMap<AdvContentInfoModel, AdvContentInfo>()
                .ForMember(q => q.CreateOn, d => d.Ignore());

            #endregion
        }
    }
}
