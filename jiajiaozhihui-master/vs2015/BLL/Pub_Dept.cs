using System;
using System.Data;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_Dept 的摘要说明。
    /// </summary>
    public class Pub_Dept
    {
        private readonly IPub_Dept dal = DataAccess.CreatePub_Dept();
        public Pub_Dept()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int DeptID)
        {
            return dal.Exists(DeptID);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Dept model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_Dept model)
        {
            dal.Update(model);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int DeptID)
        {
            dal.Delete(DeptID);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Dept GetModel(int DeptID)
        {
            return dal.GetModel(DeptID);
        }

        /// <summary>
        /// 得到一个对象实体，从缓存中。
        /// </summary>
        public SfSoft.Model.Pub_Dept GetModelByCache(int DeptID)
        {
            string CacheKey = "Pub_DeptModel-" + DeptID;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(DeptID);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.Pub_Dept)objModel;
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

