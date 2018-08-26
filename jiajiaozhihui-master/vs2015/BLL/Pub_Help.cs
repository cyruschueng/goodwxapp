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
	/// 业务逻辑类Pub_Help 的摘要说明。
	/// </summary>
	public class Pub_Help
	{
		private readonly IPub_Help dal=DataAccess.CreatePub_Help();
		public Pub_Help()
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
		public int  Add(SfSoft.Model.Pub_Help model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_Help model)
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
		public SfSoft.Model.Pub_Help GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
        public SfSoft.Model.Pub_Help GetModel(string  HelpID)
        {

            return dal.GetModel(HelpID);
        }
		/// <summary>
		/// 得到一个对象实体，从缓存中。
		/// </summary>
		public SfSoft.Model.Pub_Help GetModelByCache(int ID)
		{
			
			string CacheKey = "Pub_HelpModel-" + ID;
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
			return (SfSoft.Model.Pub_Help)objModel;
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
		public List<SfSoft.Model.Pub_Help> GetModelList(string strWhere)
		{
			DataSet ds = dal.GetList(strWhere);
			List<SfSoft.Model.Pub_Help> modelList = new List<SfSoft.Model.Pub_Help>();
			int rowsCount = ds.Tables[0].Rows.Count;
			if (rowsCount > 0)
			{
				SfSoft.Model.Pub_Help model;
				for (int n = 0; n < rowsCount; n++)
				{
					model = new SfSoft.Model.Pub_Help();
					if(ds.Tables[0].Rows[n]["ID"].ToString()!="")
					{
						model.ID=int.Parse(ds.Tables[0].Rows[n]["ID"].ToString());
					}
					model.ModulesID=ds.Tables[0].Rows[n]["ModulesID"].ToString();
					model.ModulesName=ds.Tables[0].Rows[n]["ModulesName"].ToString();
					model.Content=ds.Tables[0].Rows[n]["Content"].ToString();
					model.NoteInfo=ds.Tables[0].Rows[n]["NoteInfo"].ToString();
					model.Mpath=ds.Tables[0].Rows[n]["Mpath"].ToString();
					model.CaseInfo=ds.Tables[0].Rows[n]["CaseInfo"].ToString();
					model.FlowInfo=ds.Tables[0].Rows[n]["FlowInfo"].ToString();
					model.AppInfo=ds.Tables[0].Rows[n]["AppInfo"].ToString();
					model.Others=ds.Tables[0].Rows[n]["Others"].ToString();
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

