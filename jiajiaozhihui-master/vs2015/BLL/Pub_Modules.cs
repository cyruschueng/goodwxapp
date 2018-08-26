﻿using System;
using System.Data;
using SfSoft.Common;
using SfSoft.DALFactory;
using SfSoft.Model;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_Modules 的摘要说明。
    /// </summary>
    public class Pub_Modules
    {
        private readonly IPub_Modules dal = DataAccess.CreatePub_Modules();
        public Pub_Modules()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ModulesID)
        {
            return dal.Exists(ModulesID);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(SfSoft.Model.Pub_Modules model)
        {
            dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_Modules model)
        {
            dal.Update(model);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string ModulesID)
        {
            dal.Delete(ModulesID);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Modules GetModel(string ModulesID)
        {
            return dal.GetModel(ModulesID);
        }

        /// <summary>
        /// 得到一个对象实体，从缓存中。
        /// </summary>
        public SfSoft.Model.Pub_Modules GetModelByCache(string ModulesID)
        {
            string CacheKey = "Pub_ModulesModel-" + ModulesID;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(ModulesID);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.Pub_Modules)objModel;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetAllList()
        {
            return GetList("");
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        //public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        //{
        //return dal.GetList(PageSize,PageIndex,strWhere);
        //}

        #endregion  成员方法
    }
}

