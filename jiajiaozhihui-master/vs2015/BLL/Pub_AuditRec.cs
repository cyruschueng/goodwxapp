using System;
using System.Data;
using SfSoft.Common;
using SfSoft.Model;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
	/// <summary>
	/// 业务逻辑类Pub_AuditRec 的摘要说明。
	/// </summary>
	public class Pub_AuditRec
	{
		private readonly IPub_AuditRec dal=DataAccess.CreatePub_AuditRec();
		public Pub_AuditRec()
		{}
		#region  成员方法

 

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ARID)
		{
			return dal.Exists(ARID);
		}

		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int  Add(SfSoft.Model.Pub_AuditRec model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_AuditRec model)
		{
			dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ARID)
		{
			dal.Delete(ARID);
		}

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_AuditRec GetModel(int ARID)
		{
			return dal.GetModel(ARID);
		}
        /// <summary>
         /// 取的审批流中的信息
         /// </summary>
         /// <param name="MID">模块ID</param>
         /// <param name="DocID">单据ID</param>
         /// <returns></returns>
        public SfSoft.Model.Pub_AuditRec GetModel(string MID, string DocID)
        {
            return dal.GetModel(MID, DocID);
        }
		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Pub_AuditRec GetModelByCache(int ARID)
		{
			string CacheKey = "Pub_AuditRecModel-" + ARID;
			object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
			if (objModel == null)
			{
				try
				{
					objModel = dal.GetModel(ARID);
					if (objModel != null)
					{
						int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
						SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
					}
				}
				catch{}
			}
			return (SfSoft.Model.Pub_AuditRec)objModel;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			return dal.GetList(strWhere);
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetAllList()
		{
			return GetList("");
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		//public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		//{
			//return dal.GetList(PageSize,PageIndex,strWhere);
		//}

		#endregion  成员方法
	}
}

