using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_TestQuestion_Activity
	/// </summary>
	public partial class WX_TestQuestion_Activity:IWX_TestQuestion_Activity
	{
		public WX_TestQuestion_Activity()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_TestQuestion_Activity"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_TestQuestion_Activity");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_TestQuestion_Activity model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_TestQuestion_Activity(");
			strSql.Append("ActivityName,UsingData,UsingNumber,OnlineNumber,Status,Allocation,Pid,CreateDate,SPid,IsAct,Sort,InitTakeIn,StartDate,EndDate,Readme,ShareTitle,ShareInfo,AppId)");
			strSql.Append(" values (");
			strSql.Append("@ActivityName,@UsingData,@UsingNumber,@OnlineNumber,@Status,@Allocation,@Pid,@CreateDate,@SPid,@IsAct,@Sort,@InitTakeIn,@StartDate,@EndDate,@Readme,@ShareTitle,@ShareInfo,@AppId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ActivityName", SqlDbType.NVarChar,50),
					new SqlParameter("@UsingData", SqlDbType.NVarChar,50),
					new SqlParameter("@UsingNumber", SqlDbType.Int,4),
					new SqlParameter("@OnlineNumber", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Allocation", SqlDbType.NVarChar,200),
					new SqlParameter("@Pid", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@SPid", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Sort", SqlDbType.Int,4),
					new SqlParameter("@InitTakeIn", SqlDbType.Int,4),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@Readme", SqlDbType.NVarChar,100),
					new SqlParameter("@ShareTitle", SqlDbType.NVarChar,200),
					new SqlParameter("@ShareInfo", SqlDbType.NVarChar,200),
					new SqlParameter("@AppId", SqlDbType.VarChar,50)};
			parameters[0].Value = model.ActivityName;
			parameters[1].Value = model.UsingData;
			parameters[2].Value = model.UsingNumber;
			parameters[3].Value = model.OnlineNumber;
			parameters[4].Value = model.Status;
			parameters[5].Value = model.Allocation;
			parameters[6].Value = model.Pid;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.SPid;
			parameters[9].Value = model.IsAct;
			parameters[10].Value = model.Sort;
			parameters[11].Value = model.InitTakeIn;
			parameters[12].Value = model.StartDate;
			parameters[13].Value = model.EndDate;
			parameters[14].Value = model.Readme;
			parameters[15].Value = model.ShareTitle;
			parameters[16].Value = model.ShareInfo;
			parameters[17].Value = model.AppId;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_TestQuestion_Activity model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_TestQuestion_Activity set ");
			strSql.Append("ActivityName=@ActivityName,");
			strSql.Append("UsingData=@UsingData,");
			strSql.Append("UsingNumber=@UsingNumber,");
			strSql.Append("OnlineNumber=@OnlineNumber,");
			strSql.Append("Status=@Status,");
			strSql.Append("Allocation=@Allocation,");
			strSql.Append("Pid=@Pid,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("SPid=@SPid,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("Sort=@Sort,");
			strSql.Append("InitTakeIn=@InitTakeIn,");
			strSql.Append("StartDate=@StartDate,");
			strSql.Append("EndDate=@EndDate,");
			strSql.Append("Readme=@Readme,");
			strSql.Append("ShareTitle=@ShareTitle,");
			strSql.Append("ShareInfo=@ShareInfo,");
			strSql.Append("AppId=@AppId");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ActivityName", SqlDbType.NVarChar,50),
					new SqlParameter("@UsingData", SqlDbType.NVarChar,50),
					new SqlParameter("@UsingNumber", SqlDbType.Int,4),
					new SqlParameter("@OnlineNumber", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Allocation", SqlDbType.NVarChar,200),
					new SqlParameter("@Pid", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@SPid", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Sort", SqlDbType.Int,4),
					new SqlParameter("@InitTakeIn", SqlDbType.Int,4),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@Readme", SqlDbType.NVarChar,100),
					new SqlParameter("@ShareTitle", SqlDbType.NVarChar,200),
					new SqlParameter("@ShareInfo", SqlDbType.NVarChar,200),
					new SqlParameter("@AppId", SqlDbType.VarChar,50),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.ActivityName;
			parameters[1].Value = model.UsingData;
			parameters[2].Value = model.UsingNumber;
			parameters[3].Value = model.OnlineNumber;
			parameters[4].Value = model.Status;
			parameters[5].Value = model.Allocation;
			parameters[6].Value = model.Pid;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.SPid;
			parameters[9].Value = model.IsAct;
			parameters[10].Value = model.Sort;
			parameters[11].Value = model.InitTakeIn;
			parameters[12].Value = model.StartDate;
			parameters[13].Value = model.EndDate;
			parameters[14].Value = model.Readme;
			parameters[15].Value = model.ShareTitle;
			parameters[16].Value = model.ShareInfo;
			parameters[17].Value = model.AppId;
			parameters[18].Value = model.ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_TestQuestion_Activity ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		/// <summary>
		/// 批量删除数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_TestQuestion_Activity ");
			strSql.Append(" where ID in ("+IDlist + ")  ");
			int rows=DbHelperSQL.ExecuteSql(strSql.ToString());
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_TestQuestion_Activity GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,ActivityName,UsingData,UsingNumber,OnlineNumber,Status,Allocation,Pid,CreateDate,SPid,IsAct,Sort,InitTakeIn,StartDate,EndDate,Readme,ShareTitle,ShareInfo,AppId from WX_TestQuestion_Activity ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_TestQuestion_Activity model=new SfSoft.Model.WX_TestQuestion_Activity();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				return DataRowToModel(ds.Tables[0].Rows[0]);
			}
			else
			{
				return null;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_TestQuestion_Activity DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_TestQuestion_Activity model=new SfSoft.Model.WX_TestQuestion_Activity();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["ActivityName"]!=null)
				{
					model.ActivityName=row["ActivityName"].ToString();
				}
				if(row["UsingData"]!=null)
				{
					model.UsingData=row["UsingData"].ToString();
				}
				if(row["UsingNumber"]!=null && row["UsingNumber"].ToString()!="")
				{
					model.UsingNumber=int.Parse(row["UsingNumber"].ToString());
				}
				if(row["OnlineNumber"]!=null && row["OnlineNumber"].ToString()!="")
				{
					model.OnlineNumber=int.Parse(row["OnlineNumber"].ToString());
				}
				if(row["Status"]!=null && row["Status"].ToString()!="")
				{
					model.Status=int.Parse(row["Status"].ToString());
				}
				if(row["Allocation"]!=null)
				{
					model.Allocation=row["Allocation"].ToString();
				}
				if(row["Pid"]!=null && row["Pid"].ToString()!="")
				{
					model.Pid=int.Parse(row["Pid"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["SPid"]!=null)
				{
					model.SPid=row["SPid"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["Sort"]!=null && row["Sort"].ToString()!="")
				{
					model.Sort=int.Parse(row["Sort"].ToString());
				}
				if(row["InitTakeIn"]!=null && row["InitTakeIn"].ToString()!="")
				{
					model.InitTakeIn=int.Parse(row["InitTakeIn"].ToString());
				}
				if(row["StartDate"]!=null && row["StartDate"].ToString()!="")
				{
					model.StartDate=DateTime.Parse(row["StartDate"].ToString());
				}
				if(row["EndDate"]!=null && row["EndDate"].ToString()!="")
				{
					model.EndDate=DateTime.Parse(row["EndDate"].ToString());
				}
				if(row["Readme"]!=null)
				{
					model.Readme=row["Readme"].ToString();
				}
				if(row["ShareTitle"]!=null)
				{
					model.ShareTitle=row["ShareTitle"].ToString();
				}
				if(row["ShareInfo"]!=null)
				{
					model.ShareInfo=row["ShareInfo"].ToString();
				}
				if(row["AppId"]!=null)
				{
					model.AppId=row["AppId"].ToString();
				}
			}
			return model;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,ActivityName,UsingData,UsingNumber,OnlineNumber,Status,Allocation,Pid,CreateDate,SPid,IsAct,Sort,InitTakeIn,StartDate,EndDate,Readme,ShareTitle,ShareInfo,AppId ");
			strSql.Append(" FROM WX_TestQuestion_Activity ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获得前几行数据
		/// </summary>
		public DataSet GetList(int Top,string strWhere,string filedOrder)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ");
			if(Top>0)
			{
				strSql.Append(" top "+Top.ToString());
			}
			strSql.Append(" ID,ActivityName,UsingData,UsingNumber,OnlineNumber,Status,Allocation,Pid,CreateDate,SPid,IsAct,Sort,InitTakeIn,StartDate,EndDate,Readme,ShareTitle,ShareInfo,AppId ");
			strSql.Append(" FROM WX_TestQuestion_Activity ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			strSql.Append(" order by " + filedOrder);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获取记录总数
		/// </summary>
		public int GetRecordCount(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) FROM WX_TestQuestion_Activity ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			object obj = DbHelperSQL.GetSingle(strSql.ToString());
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("SELECT * FROM ( ");
			strSql.Append(" SELECT ROW_NUMBER() OVER (");
			if (!string.IsNullOrEmpty(orderby.Trim()))
			{
				strSql.Append("order by T." + orderby );
			}
			else
			{
				strSql.Append("order by T.ID desc");
			}
			strSql.Append(")AS Row, T.*  from WX_TestQuestion_Activity T ");
			if (!string.IsNullOrEmpty(strWhere.Trim()))
			{
				strSql.Append(" WHERE " + strWhere);
			}
			strSql.Append(" ) TT");
			strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/*
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		{
			SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@fldName", SqlDbType.VarChar, 255),
					new SqlParameter("@PageSize", SqlDbType.Int),
					new SqlParameter("@PageIndex", SqlDbType.Int),
					new SqlParameter("@IsReCount", SqlDbType.Bit),
					new SqlParameter("@OrderType", SqlDbType.Bit),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
					};
			parameters[0].Value = "WX_TestQuestion_Activity";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod
	}
}

