using System;
using System.Data;
namespace SfSoft.IDAL
{
    /// <summary>
    /// 接口层IPub_EmpInfo 的摘要说明。
    /// </summary>
    public interface IPub_EmpInfo
    {
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        bool Exists(int ID);
        /// <summary>
        /// 增加一条数据
        /// </summary>
        int Add(SfSoft.Model.Pub_EmpInfo model);
        /// <summary>
        /// 更新一条数据
        /// </summary>
        void Update(SfSoft.Model.Pub_EmpInfo model);
        /// <summary>
        /// 删除一条数据
        /// </summary>
        void Delete(string UserName);
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        SfSoft.Model.Pub_EmpInfo GetEmpModel(string UserName);
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        SfSoft.Model.Pub_EmpInfo GetModel(string UserName);
        /// <summary>
        /// 获得数据列表
        /// </summary>
        SfSoft.Model.Pub_EmpInfo GetModel(int ID);

        DataSet GetList(string strWhere);
        /// <summary>
        /// 取的用户信息及所属公司及部门信息
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        DataSet GetUsersInfoList(string strWhere);
        /// <summary>
        /// 取的用户信息及所属公司及部门ID
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        DataSet GetUsersDeptIDList(string strWhere);
        /// <summary>
        /// 根据分页获得数据列表
        /// </summary>
        //		DataSet GetList(int PageSize,int PageIndex,string strWhere);
        #endregion  成员方法
    }
}
