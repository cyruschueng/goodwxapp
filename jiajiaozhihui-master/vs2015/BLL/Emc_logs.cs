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
	/// 业务逻辑类Emc_logs 的摘要说明。
	/// </summary>
	public class Emc_logs
	{
		private readonly IEmc_logs dal=DataAccess.CreateEmc_logs();
		public Emc_logs()
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
		public int  Add(SfSoft.Model.Emc_logs model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Emc_logs model)
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
		public SfSoft.Model.Emc_logs GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Emc_logs GetModelByCache(int ID)
		{
			
			string CacheKey = "Emc_logsModel-" + ID;
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
			return (SfSoft.Model.Emc_logs)objModel;
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
		public List<SfSoft.Model.Emc_logs> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			List<SfSoft.Model.Emc_logs> modelList = new List<SfSoft.Model.Emc_logs>();
			int rowsCount = ds.Tables[0].Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.Emc_logs model;
				for (int n = 0; n < rowsCount; n++)
				{
					model = new SfSoft.Model.Emc_logs();
					if(ds.Tables[0].Rows[n]["ID"].ToString()!="")
					{
						model.ID=int.Parse(ds.Tables[0].Rows[n]["ID"].ToString());
					}
					model.FunID=ds.Tables[0].Rows[n]["FunID"].ToString();
					model.FunName=ds.Tables[0].Rows[n]["FunName"].ToString();
					if(ds.Tables[0].Rows[n]["UserID"].ToString()!="")
					{
						model.UserID=int.Parse(ds.Tables[0].Rows[n]["UserID"].ToString());
					}
					model.CnName=ds.Tables[0].Rows[n]["CnName"].ToString();
					if(ds.Tables[0].Rows[n]["DeptID"].ToString()!="")
					{
						model.DeptID=int.Parse(ds.Tables[0].Rows[n]["DeptID"].ToString());
					}
					model.Dept=ds.Tables[0].Rows[n]["Dept"].ToString();
					model.FilialeID=ds.Tables[0].Rows[n]["FilialeID"].ToString();
					if(ds.Tables[0].Rows[n]["LoginTime"].ToString()!="")
					{
						model.LoginTime=DateTime.Parse(ds.Tables[0].Rows[n]["LoginTime"].ToString());
					}
					model.IpAddr=ds.Tables[0].Rows[n]["IpAddr"].ToString();
					model.ComputerName=ds.Tables[0].Rows[n]["ComputerName"].ToString();
					if(ds.Tables[0].Rows[n]["LogoutTime"].ToString()!="")
					{
						model.LogoutTime=DateTime.Parse(ds.Tables[0].Rows[n]["LogoutTime"].ToString());
					}
					model.SysFlag=ds.Tables[0].Rows[n]["SysFlag"].ToString();
					model.OthersFlag=ds.Tables[0].Rows[n]["OthersFlag"].ToString();
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

		#endregion  成员方法
	}
}

