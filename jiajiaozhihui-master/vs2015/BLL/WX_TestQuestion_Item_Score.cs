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
	/// WX_TestQuestion_Item_Score
	/// </summary>
	public partial class WX_TestQuestion_Item_Score
	{
		private readonly IWX_TestQuestion_Item_Score dal=DataAccess.CreateWX_TestQuestion_Item_Score();
		public WX_TestQuestion_Item_Score()
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
		public bool Exists(string OpenId,int Item)
		{
			return dal.Exists(OpenId,Item);
		}

		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_TestQuestion_Item_Score model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_TestQuestion_Item_Score model)
		{
			return dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool Delete(string OpenId,int Item)
		{
			
			return dal.Delete(OpenId,Item);
		}

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_TestQuestion_Item_Score GetModel(string OpenId,int Item)
		{
			
			return dal.GetModel(OpenId,Item);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.WX_TestQuestion_Item_Score GetModelByCache(string OpenId,int Item)
		{
			
			string CacheKey = "WX_TestQuestion_Item_ScoreModel-" + OpenId+Item;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
			if (objModel == null)
			{
				try
				{
					objModel = dal.GetModel(OpenId,Item);
					if (objModel != null)
					{
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
					}
				}
				catch{}
			}
			return (SfSoft.Model.WX_TestQuestion_Item_Score)objModel;
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
		public List<SfSoft.Model.WX_TestQuestion_Item_Score> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_TestQuestion_Item_Score> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.WX_TestQuestion_Item_Score> modelList = new List<SfSoft.Model.WX_TestQuestion_Item_Score>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.WX_TestQuestion_Item_Score model;
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
        public DataSet GetList(string openid, string province, string city, string activityid, int top)
        {
            return dal.GetList(openid, province, city, activityid, top);
        }
		#endregion  ExtensionMethod
	}
}

