using System;
using System.Data;
namespace SfSoft.IDAL
{
    /// <summary>
    /// 接口层IPub_Modules_Fun 的摘要说明。
    /// </summary>
    public interface IPub_Modules_Fun
    {
        #region  成员方法
   
    
        SfSoft.Model.Pub_Modules_Fun GetModel(string FunType, string MPath);

        /// <summary>
        /// 获得数据列表
        /// </summary>
        DataSet GetList(string strWhere);
        /// <summary>
        /// 根据类型和页面路径取的按扭
        /// </summary>
        /// <param name="funType"></param>
        /// <param name="mPath"></param>
        /// <returns></returns>
        DataSet GetListByFunTypeAndMPath(string funType, string mPath);


        DataSet GetListByFunTypeAndModulesID(string funType, string ModulesID);

        /// <summary>
        /// 根据分页获得数据列表
        /// </summary>
        //		DataSet GetList(int PageSize,int PageIndex,string strWhere);
        #endregion  成员方法
    }
}
