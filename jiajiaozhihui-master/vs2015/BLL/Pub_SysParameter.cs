using System;
using System.Data;
using System.Collections.Generic;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_SysParameter 的摘要说明。
    /// </summary>
    public class Pub_SysParameter
	{
		private readonly IPub_SysParameter dal=DataAccess.CreatePub_SysParameter();
		public Pub_SysParameter()
		{}
		#region  成员方法

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
		public int  Add(SfSoft.Model.Pub_SysParameter model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_SysParameter model)
		{
			dal.Update(model);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ID)
		{
			
			dal.Delete(ID);
		}

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_SysParameter GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Pub_SysParameter GetModelByCache(int ID)
		{
			
			string CacheKey = "Pub_SysParameterModel-" + ID;
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
			return (SfSoft.Model.Pub_SysParameter)objModel;
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
		public List<SfSoft.Model.Pub_SysParameter> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			List<SfSoft.Model.Pub_SysParameter> modelList = new List<SfSoft.Model.Pub_SysParameter>();
			int rowsCount = ds.Tables[0].Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.Pub_SysParameter model;
				for (int n = 0; n < rowsCount; n++)
				{
					model = new SfSoft.Model.Pub_SysParameter();
					if(ds.Tables[0].Rows[n]["ID"].ToString()!="")
					{
						model.ID=int.Parse(ds.Tables[0].Rows[n]["ID"].ToString());
					}
					model.SysStartTimeAm=ds.Tables[0].Rows[n]["SysStartTimeAm"].ToString();
					model.SysEndTimeAm=ds.Tables[0].Rows[n]["SysEndTimeAm"].ToString();
					model.SysStartTimePm=ds.Tables[0].Rows[n]["SysStartTimePm"].ToString();
					if(ds.Tables[0].Rows[n]["SysDaySiesta"].ToString()!="")
					{
						model.SysDaySiesta=decimal.Parse(ds.Tables[0].Rows[n]["SysDaySiesta"].ToString());
					}
					if(ds.Tables[0].Rows[n]["SysTotalHours"].ToString()!="")
					{
						model.SysTotalHours=decimal.Parse(ds.Tables[0].Rows[n]["SysTotalHours"].ToString());
					}
					model.SysEndTimePm=ds.Tables[0].Rows[n]["SysEndTimePm"].ToString();
					if(ds.Tables[0].Rows[n]["SetDate"].ToString()!="")
					{
						model.SetDate=DateTime.Parse(ds.Tables[0].Rows[n]["SetDate"].ToString());
					}
					model.SysWeekRest0=ds.Tables[0].Rows[n]["SysWeekRest0"].ToString();
					model.SysWeekRest6=ds.Tables[0].Rows[n]["SysWeekRest6"].ToString();
					model.FilialeID=ds.Tables[0].Rows[n]["FilialeID"].ToString();
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
		/// 获得数据列表
		/// </summary>
		//public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		//{
			//return dal.GetList(PageSize,PageIndex,strWhere);
		//}


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_SysParameter GetModel(string  FilialeID)
        {

            return dal.GetModel(FilialeID);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string  FilialeID)
        {

            dal.Delete(FilialeID);
        }
		#endregion  成员方法
	}
}

