using System;
using System.Data;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层IPub_AuditFlow 的摘要说明。
	/// </summary>
	public interface IPub_AuditFlow
	{
		#region  成员方法
		/// <summary>
		/// 得到最大ID
		/// </summary>
		//int GetMaxId();
		/// <summary>
		/// 是否存在该记录
		/// </summary>
        /// <summary>
        /// 取的最大级别
        /// </summary>
        int GetMaxClass(string strWhere);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AFID"></param>
        /// <returns></returns>
		bool Exists(int AFID);
		/// <summary>
		/// 增加一条数据
		/// </summary>
		int Add(SfSoft.Model.Pub_AuditFlow model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		void Update(SfSoft.Model.Pub_AuditFlow model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		void Delete(int AFID);
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.Pub_AuditFlow GetModel(int AFID);
		/// <summary>
		/// 获得数据列表
		/// </summary>
		DataSet GetList(string strWhere);
		/// <summary>
		/// 根据分页获得数据列表
		/// </summary>
        SfSoft.Model.Pub_AuditFlow GetModel(string MID, string AuditClass, string FilialeID);
        void UpAuditClass(int AuditClass, string MID, string FilialeID);
        void LwAuditClass(int AuditClass, string MID, string FilialeID);
        /// <summary>
        /// 取的被审批单据信息
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="BoName">表名</param>
        /// <returns></returns>
        DataSet GetBoInfo(string DocID, string BoName);

//		DataSet GetList(int PageSize,int PageIndex,string strWhere);
		#endregion  成员方法
	}
}
