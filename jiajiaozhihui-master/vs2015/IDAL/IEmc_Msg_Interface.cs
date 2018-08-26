using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层Emc_Msg_Interface
	/// </summary>
	public interface IEmc_Msg_Interface
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
		bool Add(SfSoft.Model.Emc_Msg_Interface model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		bool Update(SfSoft.Model.Emc_Msg_Interface model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		bool Delete(int ID);
		bool DeleteList(string IDlist );
        bool updatestatus(int ID);
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.Emc_Msg_Interface GetModel(int ID);
		SfSoft.Model.Emc_Msg_Interface DataRowToModel(DataRow row);
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
		#endregion  成员方法
		#region  MethodEx

		#endregion  MethodEx
	} 
}
