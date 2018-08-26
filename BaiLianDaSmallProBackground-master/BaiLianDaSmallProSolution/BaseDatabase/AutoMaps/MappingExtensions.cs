using AutoMapper;
using BaseDatabase.Entities.BaseSettings;
using BaseDatabase.Entities.PayInfos;
using BaseDatabase.Entities.ShareLogs;
using BaseDatabase.Entities.UserInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.AutoMaps
{
    public static class MappingExtensions
    {


        public static TDestination MapTo<TSource, TDestination>(this TSource source)
        {
            return Mapper.Map<TSource, TDestination>(source);
        }

        public static TDestination MapTo<TSource, TDestination>(this TSource source, TDestination destination)
        {
            return Mapper.Map(source, destination);
        }

        #region UserInfo

        public static UserInfo ToEntity(this UserInfoModel model)
        {
            return model.MapTo<UserInfoModel, UserInfo>();
        }

        public static UserInfo ToEntity(this UserInfoModel model, UserInfo destination)
        {
            return model.MapTo(destination);
        }

        public static UserInfoModel ToModel(this UserInfo entity)
        {
            return entity.MapTo<UserInfo, UserInfoModel>();
        }

        #endregion

        #region PayInfo

        public static PayInfo ToEntity(this PayInfoModel model)
        {
            return model.MapTo<PayInfoModel, PayInfo>();
        }

        public static PayInfo ToEntity(this PayInfoModel model, PayInfo destination)
        {
            return model.MapTo(destination);
        }

        public static PayInfoModel ToModel(this PayInfo entity)
        {
            return entity.MapTo<PayInfo, PayInfoModel>();
        }

        #endregion

        #region BaseSetting

        public static BaseSetting ToEntity(this BaseSettingModel model)
        {
            return model.MapTo<BaseSettingModel, BaseSetting>();
        }

        public static BaseSetting ToEntity(this BaseSettingModel model, BaseSetting destination)
        {
            return model.MapTo(destination);
        }

        public static BaseSettingModel ToModel(this BaseSetting entity)
        {
            return entity.MapTo<BaseSetting, BaseSettingModel>();
        }

        #endregion

        #region PaySetting

        public static PaySetting ToEntity(this PaySettingModel model)
        {
            return model.MapTo<PaySettingModel, PaySetting>();
        }

        public static PaySetting ToEntity(this PaySettingModel model, PaySetting destination)
        {
            return model.MapTo(destination);
        }

        public static PaySettingModel ToModel(this PaySetting entity)
        {
            return entity.MapTo<PaySetting, PaySettingModel>();
        }

        #endregion

        #region ShareLogInfo

        public static ShareLogInfo ToEntity(this ShareLogInfoModel model)
        {
            return model.MapTo<ShareLogInfoModel, ShareLogInfo>();
        }

        public static ShareLogInfo ToEntity(this ShareLogInfoModel model, ShareLogInfo destination)
        {
            return model.MapTo(destination);
        }

        public static ShareLogInfoModel ToModel(this ShareLogInfo entity)
        {
            return entity.MapTo<ShareLogInfo, ShareLogInfoModel>();
        }

        #endregion

        #region ShareInfo

        public static ShareInfo ToEntity(this ShareInfoModel model)
        {
            return model.MapTo<ShareInfoModel, ShareInfo>();
        }

        public static ShareInfo ToEntity(this ShareInfoModel model, ShareInfo destination)
        {
            return model.MapTo(destination);
        }

        public static ShareInfoModel ToModel(this ShareInfo entity)
        {
            return entity.MapTo<ShareInfo, ShareInfoModel>();
        }

        #endregion
    }
}
