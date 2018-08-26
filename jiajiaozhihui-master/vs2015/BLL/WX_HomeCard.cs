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
	/// WX_HomeCard
	/// </summary>
	public partial class WX_HomeCard
	{
		private readonly IWX_HomeCard dal=DataAccess.CreateWX_HomeCard();
		public WX_HomeCard()
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
		public int  Add(SfSoft.Model.WX_HomeCard model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_HomeCard model)
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
		public SfSoft.Model.WX_HomeCard GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

        /// <summary>
        /// 通过本公众号的用户唯一标识获用户信息
        /// </summary>
        public SfSoft.Model.WX_HomeCard GetModel(string openid)
        {
            return dal.GetModel(openid);
        }

		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.WX_HomeCard GetModelByCache(int ID)
		{
			
			string CacheKey = "WX_HomeCardModel-" + ID;
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
			return (SfSoft.Model.WX_HomeCard)objModel;
		}

        /// <summary>
        /// 得到一个对象实体，从缓存中
        /// </summary>
        public SfSoft.Model.WX_HomeCard GetModelByCache(string  openid)
        {

            string CacheKey = "WX_HomeCardModel-" + openid;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(openid);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.WX_HomeCard)objModel;
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
		public List<SfSoft.Model.WX_HomeCard> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.WX_HomeCard> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.WX_HomeCard> modelList = new List<SfSoft.Model.WX_HomeCard>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.WX_HomeCard model;
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
        /// 通过本公众号的用户唯一标识判断是否存在
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool Exists(string openid)
        {
            return dal.Exists(openid);
        }
        /// <summary>
        /// 通过代理的公众号的用户唯一标识判断是否存在
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool ExistsByAgentId(string openid)
        {
            return dal.ExistsByAgentId(openid);
        }
        /// <summary>
        /// 通过本公众号的用户唯一标识删除
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool Delete(string openid)
        {
            return dal.Delete(openid);
        }
        /// <summary>
        /// 通过代理的公众号的用户唯一标识删除
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool DeleteByAgentId(string openid)
        {
            return dal.DeleteByAgentId(openid);
        }
        /// <summary>
        ///  通过代理的公众号的用户唯一标识获用户信息
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public Model.WX_HomeCard GetModelByAgentId(string openid)
        {
            return dal.GetModelByAgentId(openid);
        }
		#endregion  ExtensionMethod
	}
}

