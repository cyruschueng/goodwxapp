using System;
using System.Data;
namespace SfSoft.IDAL
{
    /// <summary>
    /// 接口层IPub_DeptUsers 的摘要说明。
    /// </summary>
    public interface IPub_DeptUsers
    {
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        bool Exists(int ID);
        /// <summary>
        /// 增加一条数据
        /// </summary>
        int Add(SfSoft.Model.Pub_DeptUsers model);
        /// <summary>
        /// 更新一条数据
        /// </summary>
        void Update(SfSoft.Model.Pub_DeptUsers model);
        /// <summary>
        /// 删除一条数据
        /// </summary>
        void Delete(int UserID, int FilialeID);

        /// <summary>
        /// 删除一条数据
        /// </summary>
        void Delete(int ID);

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        SfSoft.Model.Pub_DeptUsers GetModel(int ID);
        SfSoft.Model.Pub_DeptUsers GetModelByUserID(int UserID);
        /// <summary>
        /// 获得数据列表
        /// </summary>
        DataSet GetList(string strWhere);
        /// <summary>
        /// 取兼职信息列表
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        DataSet GetPluraList(string strWhere);

        /// <summary>
        /// 取的部门信息根据用户信息
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        DataSet GetDeptInfoByUserInfo(string strWhere);

        /// <summary>
        /// 根据分页获得数据列表
        /// </summary>
        //		DataSet GetList(int PageSize,int PageIndex,string strWhere);
        #endregion  成员方法
    }
}
