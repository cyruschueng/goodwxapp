using System;
using System.Data;
namespace SfSoft.IDAL
{
    /// <summary>
    /// 接口层Iaspnet_Roles 的摘要说明。
    /// </summary>
    public interface Iaspnet_Roles
    {
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        bool Exists(Guid RoleId);
        /// <summary>
        /// 增加一条数据
        /// </summary>
        void Add(SfSoft.Model.aspnet_Roles model);
        /// <summary>
        /// 更新一条数据
        /// </summary>
        void Update(SfSoft.Model.aspnet_Roles model);
        /// <summary>
        /// 删除一条数据
        /// </summary>
        void Delete(Guid RoleId);
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        SfSoft.Model.aspnet_Roles GetModel(Guid RoleId);
        /// <summary>
        /// 获得数据列表
        /// </summary>
        DataSet GetList(string strWhere);
        /// <summary>
        /// 根据分页获得数据列表
        /// </summary>
        //		DataSet GetList(int PageSize,int PageIndex,string strWhere);
        #endregion  成员方法
    }
}
