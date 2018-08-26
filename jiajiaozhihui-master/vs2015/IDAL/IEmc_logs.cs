using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层IEmc_logs 的摘要说明。
	/// </summary>
	public interface IEmc_logs
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
		int Add(SfSoft.Model.Emc_logs model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		void Update(SfSoft.Model.Emc_logs model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		void Delete(int ID);
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.Emc_logs GetModel(int ID);
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
