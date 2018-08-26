using System;
using System.Data;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_EmpInfo 的摘要说明。
    /// </summary>
    public class Pub_EmpInfo
    {
        private readonly IPub_EmpInfo dal = DataAccess.CreatePub_EmpInfo();
        public Pub_EmpInfo()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            return dal.Exists(ID);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_EmpInfo model)
        {
            return dal.Add(model);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_EmpInfo model)
        {
            dal.Update(model);
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string UserName)
        {
            dal.Delete(UserName);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetEmpModel(string UserName)
        {
            return dal.GetEmpModel(UserName);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetModel(string  UserName)
        {
            return dal.GetModel(UserName);
        }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetModel(int ID)
        {
            return dal.GetModel(ID);
        }
        /// <summary>
        /// 得到一个对象实体，从缓存中。
        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetModelByCache(string UserName)
        {
            string CacheKey = "Pub_EmpInfoModel-" + UserName;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(UserName);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.Pub_EmpInfo)objModel;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }
        /// <summary>
        /// 取的用户登录及用户基本信息
        /// </summary>
        /// 
        public DataSet GetUsersInfoList(string strWhere)
        {
            return dal.GetUsersInfoList(strWhere);
        }
        /// <summary>
        /// 取的用户信息及所属公司及部门
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        public DataSet GetUsersDeptIDList(string strWhere)
        {
            return dal.GetUsersDeptIDList(strWhere);
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

