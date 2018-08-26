using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层IPub_FunDef 的摘要说明。
	/// </summary>
	public interface IPub_FunDef
	{
		#region  成员方法
		/// <summary>
		/// 得到最大ID
		/// </summary>
		//int GetMaxId();
		/// <summary>
		/// 是否存在该记录
		/// </summary>
		bool Exists(int ID);
		/// <summary>
		/// 增加一条数据
		/// </summary>
		int Add(SfSoft.Model.Pub_FunDef model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		void Update(SfSoft.Model.Pub_FunDef model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		void Delete(int ID);
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.Pub_FunDef GetModel(int ID);
		/// <summary>
		/// 获得数据列表
		/// </summary>
		DataSet GetList(string strWhere);
		/// <summary>
		/// 根据分页获得数据列表
		/// </summary>
//		DataSet GetList(int PageSize,int PageIndex,string strWhere);

        /// <summary>
        /// 更新是否需要审批字段
        /// </summary>
        void UpdateIsApprove(string FunID, string FunType, string IsApprove);

		#endregion  成员方法
	}
}
