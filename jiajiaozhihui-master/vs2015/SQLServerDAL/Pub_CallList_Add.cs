using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Pub_CallList_Add
	/// </summary>
	public class Pub_CallList_Add:IPub_CallList_Add
	{
		public Pub_CallList_Add()
		{}
		#region  Method

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_CallList_Add"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_CallList_Add");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.Pub_CallList_Add model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Pub_CallList_Add(");
			strSql.Append("CallListID,CallType,CallAdd,CallName,CallUid,Status)");
			strSql.Append(" values (");
			strSql.Append("@CallListID,@CallType,@CallAdd,@CallName,@CallUid,@Status)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CallListID", SqlDbType.Int,4),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@CallAdd", SqlDbType.NVarChar,80),
					new SqlParameter("@CallName", SqlDbType.NVarChar,20),
					new SqlParameter("@CallUid", SqlDbType.NVarChar,20),
					new SqlParameter("@Status", SqlDbType.NVarChar,10)};
			parameters[0].Value = model.CallListID;
			parameters[1].Value = model.CallType;
			parameters[2].Value = model.CallAdd;
			parameters[3].Value = model.CallName;
			parameters[4].Value = model.CallUid;
			parameters[5].Value = model.Status;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
			if (obj == null)
			{
				return 1;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.Pub_CallList_Add model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Pub_CallList_Add set ");
			strSql.Append("CallListID=@CallListID,");
			strSql.Append("CallType=@CallType,");
			strSql.Append("CallAdd=@CallAdd,");
			strSql.Append("CallName=@CallName,");
			strSql.Append("CallUid=@CallUid,");
			strSql.Append("Status=@Status");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@CallListID", SqlDbType.Int,4),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@CallAdd", SqlDbType.NVarChar,80),
					new SqlParameter("@CallName", SqlDbType.NVarChar,20),
					new SqlParameter("@CallUid", SqlDbType.NVarChar,20),
					new SqlParameter("@Status", SqlDbType.NVarChar,10)};
			parameters[0].Value = model.ID;
			parameters[1].Value = model.CallListID;
			parameters[2].Value = model.CallType;
			parameters[3].Value = model.CallAdd;
			parameters[4].Value = model.CallName;
			parameters[5].Value = model.CallUid;
			parameters[6].Value = model.Status;

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
			strSql.Append("delete from Pub_CallList_Add ");
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
		/// 删除一条数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from Pub_CallList_Add ");
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
		public SfSoft.Model.Pub_CallList_Add GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,CallListID,CallType,CallAdd,CallName,CallUid,Status from Pub_CallList_Add ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
			parameters[0].Value = ID;

			SfSoft.Model.Pub_CallList_Add model=new SfSoft.Model.Pub_CallList_Add();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				if(ds.Tables[0].Rows[0]["CallListID"].ToString()!="")
				{
					model.CallListID=int.Parse(ds.Tables[0].Rows[0]["CallListID"].ToString());
				}
				if(ds.Tables[0].Rows[0]["CallType"].ToString()!="")
				{
					model.CallType=int.Parse(ds.Tables[0].Rows[0]["CallType"].ToString());
				}
				model.CallAdd=ds.Tables[0].Rows[0]["CallAdd"].ToString();
				model.CallName=ds.Tables[0].Rows[0]["CallName"].ToString();
				model.CallUid=ds.Tables[0].Rows[0]["CallUid"].ToString();
				model.Status=ds.Tables[0].Rows[0]["Status"].ToString();
				return model;
			}
			else
			{
				return null;
			}
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,CallListID,CallType,CallAdd,CallName,CallUid,Status ");
			strSql.Append(" FROM Pub_CallList_Add ");
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
			strSql.Append(" ID,CallListID,CallType,CallAdd,CallName,CallUid,Status ");
			strSql.Append(" FROM Pub_CallList_Add ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			strSql.Append(" order by " + filedOrder);
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
			parameters[0].Value = "Pub_CallList_Add";
			parameters[1].Value = "";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  Method
	}
}

