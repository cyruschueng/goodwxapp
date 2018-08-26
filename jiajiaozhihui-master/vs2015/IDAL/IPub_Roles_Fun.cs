using System;
using System.Data;
namespace SfSoft.IDAL
{
    /// <summary>
    /// 接口层IPub_Roles_Fun 的摘要说明。
    /// </summary>
    public interface IPub_Roles_Fun
    {
        #region  成员方法
        /// <summary>
        /// 增加一条数据
        /// </summary>
        void Add(SfSoft.Model.Pub_Roles_Fun model);
        /// <summary>
        /// 删除一条数据
        /// </summary>
        void Delete(Guid RolesID);
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        SfSoft.Model.Pub_Roles_Fun GetModel(Guid RolesID, string FunID);
        /// <summary>
        /// 获得数据列表
        /// </summary>
        DataSet GetList(string strWhere);

        DataSet GetUsersFun(string UsersID,string FilialeID);

        /// <summary>
        /// 根据分页获得数据列表
        /// </summary>
        //		DataSet GetList(int PageSize,int PageIndex,string strWhere);
        #endregion  成员方法
    }
}
