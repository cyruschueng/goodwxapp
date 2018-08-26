using System;
using System.Data;
using SfSoft.Model;
namespace SfSoft.IDAL
{
	/// <summary>
	/// 接口层WX_SubscribeActivity
	/// </summary>
	public interface IWX_SubscribeActivity
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
        /// 是否存在该记录
        /// </summary>
        bool Exists(string openid);
		/// <summary>
		/// 增加一条数据
		/// </summary>
		int Add(SfSoft.Model.WX_SubscribeActivity model);
		/// <summary>
		/// 更新一条数据
		/// </summary>
		bool Update(SfSoft.Model.WX_SubscribeActivity model);
		/// <summary>
		/// 删除一条数据
		/// </summary>
		bool Delete(int ID);
		bool DeleteList(string IDlist );
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		SfSoft.Model.WX_SubscribeActivity GetModel(int ID);
        SfSoft.Model.WX_SubscribeActivity GetModel(string openid);

		SfSoft.Model.WX_SubscribeActivity DataRowToModel(DataRow row);
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
        DataSet  GetFriendsList(string shareid);
		/// <summary>
		/// 根据分页获得数据列表
		/// </summary>
		//DataSet GetList(int PageSize,int PageIndex,string strWhere);
		#endregion  成员方法
		#region  MethodEx
        /// <summary>
        /// 按分享者分组排名统计邀约人数
        /// </summary>
        /// <returns></returns>
        DataSet GetOrder(string where);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name">排名字段</param>
        /// <returns></returns>
        WX_Ranking GetMyOrder(string name);

        /// <summary>
        /// 是否建立活动关系
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsRelationByOpenid(string openid);
        bool IsRelationByAgentOpenid(string openid);

		#endregion  MethodEx
	} 
}
