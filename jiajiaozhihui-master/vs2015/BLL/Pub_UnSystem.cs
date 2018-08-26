using System;
using System.Data;
using System.Collections.Generic;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// Pub_UnSystem
    /// </summary>
    public class Pub_UnSystem
	{
		private readonly IPub_UnSystem dal=DataAccess.CreatePub_UnSystem();
		public Pub_UnSystem()
		{}
		#region  Method

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
		public int  Add(SfSoft.Model.Pub_UnSystem model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.Pub_UnSystem model)
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
		public SfSoft.Model.Pub_UnSystem GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中
		/// </summary>
		public SfSoft.Model.Pub_UnSystem GetModelByCache(int ID)
		{
			
			string CacheKey = "Pub_UnSystemModel-" + ID;
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
			return (SfSoft.Model.Pub_UnSystem)objModel;
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
		public List<SfSoft.Model.Pub_UnSystem> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			return DataTableToList(ds.Tables[0]);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
		public List<SfSoft.Model.Pub_UnSystem> DataTableToList(DataTable dt)
		{
			List<SfSoft.Model.Pub_UnSystem> modelList = new List<SfSoft.Model.Pub_UnSystem>();
			int rowsCount = dt.Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.Pub_UnSystem model;
				for (int n = 0; n < rowsCount; n++)
				{
					model = new SfSoft.Model.Pub_UnSystem();
					if(dt.Rows[n]["ID"].ToString()!="")
					{
						model.ID=int.Parse(dt.Rows[n]["ID"].ToString());
					}
					model.DbSrvAddr=dt.Rows[n]["DbSrvAddr"].ToString();
					model.DbName=dt.Rows[n]["DbName"].ToString();
					model.DbUid=dt.Rows[n]["DbUid"].ToString();
					model.DbPwd=dt.Rows[n]["DbPwd"].ToString();
					model.SysType=dt.Rows[n]["SysType"].ToString();
					model.SysUrl=dt.Rows[n]["SysUrl"].ToString();
					model.SysShortName=dt.Rows[n]["SysShortName"].ToString();
					model.SysName=dt.Rows[n]["SysName"].ToString();
					model.SysIcon=dt.Rows[n]["SysIcon"].ToString();
					model.IsAct=dt.Rows[n]["IsAct"].ToString();
					if(dt.Rows[n]["OrderID"].ToString()!="")
					{
						model.OrderID=int.Parse(dt.Rows[n]["OrderID"].ToString());
					}
					model.Flag=dt.Rows[n]["Flag"].ToString();
					if(dt.Rows[n]["Uid"].ToString()!="")
					{
						model.Uid=int.Parse(dt.Rows[n]["Uid"].ToString());
					}
					model.UserName=dt.Rows[n]["UserName"].ToString();
					model.Password=dt.Rows[n]["Password"].ToString();
					modelList.Add(model);
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
		//public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		//{
			//return dal.GetList(PageSize,PageIndex,strWhere);
		//}

		#endregion  Method
	}
}

