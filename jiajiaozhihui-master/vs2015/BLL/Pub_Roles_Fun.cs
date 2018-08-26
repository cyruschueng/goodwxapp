using System;
using System.Data;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_Roles_Fun 的摘要说明。


    /// </summary>
    public class Pub_Roles_Fun
    {
        private readonly IPub_Roles_Fun dal = DataAccess.CreatePub_Roles_Fun();
        public Pub_Roles_Fun()
        { }
        #region  成员方法
        /// <summary>
        /// 增加一条数据


        /// </summary>
        public void Add(SfSoft.Model.Pub_Roles_Fun model)
        {
            dal.Add(model);
        }

        /// <summary>
        /// 删除一条数据


        /// </summary>
        public void Delete(Guid RolesID)
        {
            dal.Delete(RolesID);
        }

        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_Roles_Fun GetModel(Guid RolesID, string FunID)
        {
            return dal.GetModel(RolesID, FunID);
        }

        /// <summary>
        /// 得到一个对象实体，从缓存中。


        /// </summary>
        public SfSoft.Model.Pub_Roles_Fun GetModelByCache(Guid RolesID, string FunID)
        {
            string CacheKey = "Pub_Roles_FunModel-" + FunID;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(RolesID, FunID);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.Pub_Roles_Fun)objModel;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }


        /// <summary>
        /// 获得用户权限数据列表
        /// </summary>
        public DataSet GetUsersFun(string UsersID,string FilialeID)
        {
            return dal.GetUsersFun(UsersID,FilialeID);
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

