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
	/// WX_PublicGood
	/// </summary>
	public partial class WX_PublicGood
	{
		private readonly IWX_PublicGood dal=DataAccess.CreateWX_PublicGood();
		public WX_PublicGood()
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
		public int  Add(SfSoft.Model.WX_PublicGood model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_PublicGood model)
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
		public SfSoft.Model.WX_PublicGood GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.WX_PublicGood GetModelByCache(int ID)
		{
			
			string CacheKey = "WX_PublicGoodModel-" + ID;
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
			return (SfSoft.Model.WX_PublicGood)objModel;
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
		public List<SfSoft.Model.WX_PublicGood> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_PublicGood> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.WX_PublicGood> modelList = new List<SfSoft.Model.WX_PublicGood>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.WX_PublicGood model;
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
        /// 是否还有库存
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool IsStore(int ID)
        {
            return dal.IsStore(ID);
        }


        /// <summary>
        /// 获取产品价格
        /// 产品价格计算说明：1）如果有福利价,产品价的计算方式为：福利价    2)如果没有福利价,产品价的计算方式为：（市场价-降价）*折扣率 
        /// </summary>
        /// <param name="markprice">市场价</param>
        /// <param name="depreciate">降价</param>
        /// <param name="discount">折扣</param>
        /// <param name="price">粉丝价</param>
        /// <returns></returns>
        public decimal GetPrice(decimal markprice, decimal depreciate, decimal discount, decimal price)
        {
            decimal result = 0;
            if (price!=0)
            {
                result = price;
            }
            else
            {
                result = (markprice - depreciate) * discount;
            }
            return result;
        }
        /// <summary>
        /// 获取产品价格
        /// 产品价格计算说明：1）如果有福利价,产品价的计算方式为：福利价    2)如果没有福利价,产品价的计算方式为：（市场价-降价）*折扣率 
        /// </summary>
        /// <param name="markprice">产品ID</param>
        /// <returns></returns>
        public decimal GetPrice(int ProductID)
        {
            decimal result = 0; 
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(ProductID);
            if (model == null)
            {
                return result;
            }
            if (model.PublicPrice != null && model.PublicPrice.ToString() != "" && model.PublicPrice.ToString() != "0")
            {
                result = (decimal)model.PublicPrice;
            }
            else
            {
                decimal marketPrice = 0;
                if (model.MarketPrice != null && model.MarketPrice.ToString() != "")
                {
                    marketPrice = (decimal)model.MarketPrice;
                }
                decimal depreciate = 0;
                if (model.Depreciate != null && model.Depreciate.ToString() != "")
                {
                    depreciate = (decimal)model.Depreciate;
                }
                decimal discount = 1;
                if (model.Discount != null && model.Discount.ToString() != "")
                {
                    discount = (decimal)model.Discount;
                }
                result = (marketPrice - depreciate) * discount;
            }
            return result;
        }

		#endregion  ExtensionMethod
	}
}

