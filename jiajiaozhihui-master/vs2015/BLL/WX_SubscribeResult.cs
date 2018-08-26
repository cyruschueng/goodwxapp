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
	/// WX_SubscribeResult
	/// </summary>
	public partial class WX_SubscribeResult
	{
		private readonly IWX_SubscribeResult dal=DataAccess.CreateWX_SubscribeResult();
		public WX_SubscribeResult()
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
		/// 增加一条数据
		/// </summary>
		public int  Add(SfSoft.Model.WX_SubscribeResult model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_SubscribeResult model)
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
		public SfSoft.Model.WX_SubscribeResult GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.WX_SubscribeResult GetModelByCache(int ID)
		{
			
			string CacheKey = "WX_SubscribeResultModel-" + ID;
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
			return (SfSoft.Model.WX_SubscribeResult)objModel;
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
		public List<SfSoft.Model.WX_SubscribeResult> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_SubscribeResult> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.WX_SubscribeResult> modelList = new List<SfSoft.Model.WX_SubscribeResult>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.WX_SubscribeResult model;
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
        /// 推荐关注成功一个粉丝总量加1
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public int AddFans(string openid)
        {
            return dal.AddFans(openid);
        }
        public int AddFansByOpenid(string openid)
        {
            return dal.AddFansByOpenid(openid);
        }
        /// <summary>
        /// 用粉丝换取一个礼物，重新计算总粉丝量
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public int SubtractFans(string openid, int number)
        {
            return dal.SubtractFans(openid, number);
        }
        /// <summary>
        /// 当前能不能兑换
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        public bool IsCanChange(string openid,int number)
        {
            int total = 0;
            DataSet ds = dal.GetList("ShareID='"+openid+"'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                total= (int)ds.Tables[0].Rows[0]["Number"];
            }
            if (total > number ||  number == total)
            {
                return true;
            }
            else {
                return false;
            }
        }

        public Model.WX_SubscribeResult GetModel(string openid)
        {
            return dal.GetModel(openid);
        }
		#endregion  ExtensionMethod
	}
}

