using System;
using System.Data;
using System.Collections.Generic;
using SfSoft.Common;
using SfSoft.Model;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
	/// <summary>
	/// WX_SubscribeActivity
	/// </summary>
	public partial class WX_SubscribeActivity
	{
		private readonly IWX_SubscribeActivity dal=DataAccess.CreateWX_SubscribeActivity();
		public WX_SubscribeActivity()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
			return dal.GetMaxId();
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			return dal.Exists(ID);
		}
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string openid) 
        {
            return dal.Exists(openid);
        }
		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int  Add(SfSoft.Model.WX_SubscribeActivity model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_SubscribeActivity model)
		{
			return dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool Delete(int ID)
		{
			
			return dal.Delete(ID);
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			return dal.DeleteList(IDlist );
		}

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_SubscribeActivity GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public Model.WX_SubscribeActivity GetModel(string openid) {
            return dal.GetModel(openid);
        }
		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.WX_SubscribeActivity GetModelByCache(int ID)
		{
			
			string CacheKey = "WX_SubscribeActivityModel-" + ID;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
			if (objModel == null)
			{
				try
				{
					objModel = dal.GetModel(ID);
					if (objModel != null)
					{
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
					}
				}
				catch{}
			}
			return (SfSoft.Model.WX_SubscribeActivity)objModel;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			return dal.GetList(strWhere);
		}
		/// <summary>
		/// 获得前几行数据
		/// </summary>
		public DataSet GetList(int Top,string strWhere,string filedOrder)
		{
			return dal.GetList(Top,strWhere,filedOrder);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_SubscribeActivity> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_SubscribeActivity> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.WX_SubscribeActivity> modelList = new List<SfSoft.Model.WX_SubscribeActivity>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.WX_SubscribeActivity model;
				for (int n = 0; n < rowsCount; n++)
				{
					model = dal.DataRowToModel(dt.Rows[n]);
					if (model != null)
					{
						modelList.Add(model);
					}
				}
			}
			return modelList;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetAllList()
		{
			return GetList("");
		}

		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public int GetRecordCount(string strWhere)
		{
			return dal.GetRecordCount(strWhere);
		}
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
		{
			return dal.GetListByPage( strWhere,  orderby,  startIndex,  endIndex);
		}
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		//public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		//{
			//return dal.GetList(PageSize,PageIndex,strWhere);
		//}

		#endregion  BasicMethod
		#region  ExtensionMethod
        /// <summary>
        /// 按分享者分组排名统计邀约人数
        /// </summary>
        /// <returns></returns>
        public DataSet GetOrder(string where)
        {
            return dal.GetOrder( where);
        }
        public Model.WX_Ranking GetMyOrder(string name)
        {
            return dal.GetMyOrder(name);
        }
        public DataSet GetFriendsList(string shareid)
        {
            return dal.GetFriendsList(shareid);
        }
        /// <summary>
        /// 是否建立活动关系
        /// </summary>
        /// <param name="openid">本订阅号openid</param>
        /// <returns></returns>
        public bool IsRelationByOpenid(string openid)
        {
            return dal.IsRelationByOpenid(openid);
        }
        /// <summary>
        /// 是否建立活动关系
        /// </summary>
        /// <param name="openid">代理的服务号openid</param>
        /// <returns></returns>
        public bool IsRelationByAgentOpenid(string openid)
        {
            return dal.IsRelationByAgentOpenid(openid);
        }
		#endregion  ExtensionMethod
	}
}

