using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层WX_TestQuestion
	/// </summary>
	public interface IWX_TestQuestion
	{
		#region  成员方法
		/// <summary>
		/// 得到最大ID
		/// </summary>
		int GetMaxId();
		/// <summary>
		/// 是否存在该记录
		/// </summary>
		bool Exists(int ID);
		/// <summary>
		/// 增加一条数据
		/// </summary>
		int Add(SfSoft.Model.WX_TestQuestion model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		bool Update(SfSoft.Model.WX_TestQuestion model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		bool Delete(int ID);
		bool DeleteList(string IDlist );
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.WX_TestQuestion GetModel(int ID);
		SfSoft.Model.WX_TestQuestion DataRowToModel(DataRow row);
		/// <summary>
		/// 获得数据列表
		/// </summary>
		DataSet GetList(string strWhere);
		/// <summary>
		/// 获得前几行数据
		/// </summary>
		DataSet GetList(int Top,string strWhere,string filedOrder);
		int GetRecordCount(string strWhere);
		DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex);
		/// <summary>
		/// 根据分页获得数据列表
		/// </summary>
		//DataSet GetList(int PageSize,int PageIndex,string strWhere);

        /// <summary>
        ///  获取所题库
        /// </summary>
        /// <param name="simple_number"></param>
        /// <param name="medium_number"></param>
        /// <param name="hard_number"></param>
        /// <param name="simple_score"></param>
        /// <param name="medium_score"></param>
        /// <param name="hard_score"></param>
        /// <param name="openid"></param>
        /// <param name="activeid"></param>
        /// <returns></returns>
        DataSet GetList(int simple_number, int medium_number, int hard_number, int simple_score, int medium_score, int hard_score, string openid, int activeid);

		#endregion  成员方法
		#region  MethodEx
        DataSet GetList(string testQuestion, string questionType, string grade);
		#endregion  MethodEx
	} 
}
