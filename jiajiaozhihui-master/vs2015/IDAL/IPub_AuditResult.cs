using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层IPub_AuditResult 的摘要说明。
	/// </summary>
	public interface IPub_AuditResult
	{
		#region  成员方法
		/// <summary>
		/// 得到最大ID
		/// </summary>
		//int GetMaxId();
		/// <summary>
		/// 是否存在该记录
		/// </summary>
		bool Exists(int ARSID);
		/// <summary>
		/// 增加一条数据
		/// </summary>
		int Add(SfSoft.Model.Pub_AuditResult model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		void Update(SfSoft.Model.Pub_AuditResult model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		void Delete(int ARSID);
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.Pub_AuditResult GetModel(int ARSID);
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
