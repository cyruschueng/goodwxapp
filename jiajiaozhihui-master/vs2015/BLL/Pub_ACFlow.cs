using System;
using System.Data;
using SfSoft.Common;
using SfSoft.Model;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
	/// <summary>
	/// 业务逻辑类Pub_ACFlow 的摘要说明。
	/// </summary>
	public class Pub_ACFlow
	{
		private readonly IPub_ACFlow dal=DataAccess.CreatePub_ACFlow();
		public Pub_ACFlow()
		{}
		#region  成员方法

 

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ACID)
		{
			return dal.Exists(ACID);
		}

		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int  Add(SfSoft.Model.Pub_ACFlow model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_ACFlow model)
		{
			dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ACID)
		{
			dal.Delete(ACID);
		}

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_ACFlow GetModel(int ACID)
		{
			return dal.GetModel(ACID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Pub_ACFlow GetModelByCache(int ACID)
		{
			string CacheKey = "Pub_ACFlowModel-" + ACID;
			object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
			if (objModel == null)
			{
				try
				{
					objModel = dal.GetModel(ACID);
					if (objModel != null)
					{
						int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
						SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
					}
				}
				catch{}
			}
			return (SfSoft.Model.Pub_ACFlow)objModel;
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

