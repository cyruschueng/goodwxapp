using System;
using System.Data;
using SfSoft.Common;
using SfSoft.Model;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
	/// <summary>
	/// 业务逻辑类Pub_AuditFlow 的摘要说明。
	/// </summary>
	public class Pub_AuditFlow
	{
		private readonly IPub_AuditFlow dal=DataAccess.CreatePub_AuditFlow();
		public Pub_AuditFlow()
		{}
		#region  成员方法

        /// <summary>
        ///  
        /// </summary>
        public int GetMaxClass(string strWhere)
        {
            return dal.GetMaxClass(strWhere);
        }

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int AFID)
		{
			return dal.Exists(AFID);
		}

		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int  Add(SfSoft.Model.Pub_AuditFlow model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_AuditFlow model)
		{
			dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int AFID)
		{
			dal.Delete(AFID);
		}
        /// <summary>
        /// 更新上级级别
        /// </summary>
        public void UpAuditClass(int AuditClass, string MID, string FilialeID)
        {
            dal.UpAuditClass(AuditClass, MID, FilialeID);
        }
        /// <summary>
        /// 更新上级级别
        /// </summary>
        public void LwAuditClass(int AuditClass, string MID, string FilialeID)
        {
            dal.LwAuditClass(AuditClass, MID, FilialeID);
        }
		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_AuditFlow GetModel(int AFID)
		{
			return dal.GetModel(AFID);
		}
        public SfSoft.Model.Pub_AuditFlow GetModel(string MID, string AuditClass, string FilialeID)
        {
            return dal.GetModel(MID, AuditClass, FilialeID);
        }
		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Pub_AuditFlow GetModelByCache(int AFID)
		{
			string CacheKey = "Pub_AuditFlowModel-" + AFID;
			object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
			if (objModel == null)
			{
				try
				{
					objModel = dal.GetModel(AFID);
					if (objModel != null)
					{
						int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
						SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
					}
				}
				catch{}
			}
			return (SfSoft.Model.Pub_AuditFlow)objModel;
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
        /// 取的被审批单据信息
        /// </summary>
        /// <param name="DocID">单据ID</param>
        /// <param name="BoName">表名</param>
        /// <returns></returns>
        public DataSet GetBoInfo(string DocID, string BoName)
        {
            return dal.GetBoInfo( DocID, BoName);
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

