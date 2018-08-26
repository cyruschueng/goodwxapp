﻿using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Section
	/// </summary>
	public partial class WX_Course_Section:IWX_Course_Section
	{
		public WX_Course_Section()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Section"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Section");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_Course_Section model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Section(");
            strSql.Append("ClassifyId,SectionId,SectionName,Sn,PId,SectionType)");
			strSql.Append(" values (");
            strSql.Append("@ClassifyId,@SectionId,@SectionName,@Sn,@PId,@SectionType)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ClassifyId", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionId", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionName", SqlDbType.NVarChar,100),
					new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@PId", SqlDbType.Int,4),
                    new SqlParameter("@SectionType", SqlDbType.Int,4)};
			parameters[0].Value = model.ClassifyId;
			parameters[1].Value = model.SectionId;
			parameters[2].Value = model.SectionName;
			parameters[3].Value = model.Sn;
            parameters[4].Value = model.PId;
            parameters[5].Value = model.SectionType;

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
		public bool Update(SfSoft.Model.WX_Course_Section model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Section set ");
			strSql.Append("ClassifyId=@ClassifyId,");
			strSql.Append("SectionId=@SectionId,");
			strSql.Append("SectionName=@SectionName,");
			strSql.Append("Sn=@Sn,");
            strSql.Append("PId=@PId,");
            strSql.Append("SectionType=@SectionType");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@ClassifyId", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionId", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionName", SqlDbType.NVarChar,100),
					new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@PId", SqlDbType.Int,4),
                    new SqlParameter("@SectionType", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.ClassifyId;
			parameters[1].Value = model.SectionId;
			parameters[2].Value = model.SectionName;
			parameters[3].Value = model.Sn;
            parameters[4].Value = model.PId;
            parameters[5].Value = model.SectionType;
			parameters[6].Value = model.Id;

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
		public bool Delete(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Section ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

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
		public bool DeleteList(string Idlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Section ");
			strSql.Append(" where Id in ("+Idlist + ")  ");
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
		public SfSoft.Model.WX_Course_Section GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,ClassifyId,SectionId,SectionName,Sn,PId,SectionType from WX_Course_Section ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Section model=new SfSoft.Model.WX_Course_Section();
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
		public SfSoft.Model.WX_Course_Section DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Section model=new SfSoft.Model.WX_Course_Section();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["ClassifyId"]!=null)
				{
					model.ClassifyId=row["ClassifyId"].ToString();
				}
				if(row["SectionId"]!=null)
				{
					model.SectionId=row["SectionId"].ToString();
				}
				if(row["SectionName"]!=null)
				{
					model.SectionName=row["SectionName"].ToString();
				}
				if(row["Sn"]!=null && row["Sn"].ToString()!="")
				{
					model.Sn=int.Parse(row["Sn"].ToString());
				}
                if (row["PId"] != null && row["PId"].ToString() != "")
                {
                    model.PId = int.Parse(row["PId"].ToString());
                }
                if (row["SectionType"] != null && row["SectionType"].ToString() != "")
                {
                    model.SectionType = int.Parse(row["SectionType"].ToString());
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
            strSql.Append("select Id,ClassifyId,SectionId,SectionName,Sn,PId,SectionType ");
			strSql.Append(" FROM WX_Course_Section ");
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
            strSql.Append(" Id,ClassifyId,SectionId,SectionName,Sn,PId,SectionType ");
			strSql.Append(" FROM WX_Course_Section ");
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
			strSql.Append("select count(1) FROM WX_Course_Section ");
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
				strSql.Append("order by T.Id desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Course_Section T ");
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
			parameters[0].Value = "WX_Course_Section";
			parameters[1].Value = "Id";
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
