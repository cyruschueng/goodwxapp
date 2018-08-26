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
    public static class AdminMappingExtensions
    {
        #region AdminAdminUserInfo

        public static AdminUserInfo ToEntity(this AdminUserInfoModel model)
        {
            return model.MapTo<AdminUserInfoModel, AdminUserInfo>();
        }

        public static AdminUserInfo ToEntity(this AdminUserInfoModel model, AdminUserInfo destination)
        {
            return model.MapTo(destination);
        }

        public static AdminUserInfoModel ToModel(this AdminUserInfo entity)
        {
            return entity.MapTo<AdminUserInfo, AdminUserInfoModel>();
        }

        #endregion

        #region AdvertisingSpaceInfo

        public static AdvertisingSpaceInfo ToEntity(this AdvertisingSpaceInfoModel model)
        {
            return model.MapTo<AdvertisingSpaceInfoModel, AdvertisingSpaceInfo>();
        }

        public static AdvertisingSpaceInfo ToEntity(this AdvertisingSpaceInfoModel model, AdvertisingSpaceInfo destination)
        {
            return model.MapTo(destination);
        }

        public static AdvertisingSpaceInfoModel ToModel(this AdvertisingSpaceInfo entity)
        {
            return entity.MapTo<AdvertisingSpaceInfo, AdvertisingSpaceInfoModel>();
        }

        #endregion

        #region AdvContentInfo

        public static AdvContentInfo ToEntity(this AdvContentInfoModel model)
        {
            return model.MapTo<AdvContentInfoModel, AdvContentInfo>();
        }

        public static AdvContentInfo ToEntity(this AdvContentInfoModel model, AdvContentInfo destination)
        {
            return model.MapTo(destination);
        }

        public static AdvContentInfoModel ToModel(this AdvContentInfo entity)
        {
            return entity.MapTo<AdvContentInfo, AdvContentInfoModel>();
        }

        #endregion
    }
}
