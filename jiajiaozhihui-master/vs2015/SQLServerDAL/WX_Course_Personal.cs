using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Personal
	/// </summary>
	public partial class WX_Course_Personal:IWX_Course_Personal
	{
		public WX_Course_Personal()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("CourseId", "WX_Course_Personal"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int CourseId,string OpenId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Personal");
			strSql.Append(" where CourseId=@CourseId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = CourseId;
			parameters[1].Value = OpenId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Course_Personal model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Personal(");
            strSql.Append("CourseId,OpenId,Tiem,CurrSection,LastDateTime,IsDele,BagId,OnlineId)");
			strSql.Append(" values (");
            strSql.Append("@CourseId,@OpenId,@Tiem,@CurrSection,@LastDateTime,@IsDele,@BagId,@OnlineId)");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@Tiem", SqlDbType.Int,4),
					new SqlParameter("@CurrSection", SqlDbType.Int,4),
					new SqlParameter("@LastDateTime", SqlDbType.DateTime),
                    new SqlParameter("@IsDele", SqlDbType.Int,4),
                    new SqlParameter("@BagId", SqlDbType.Int,4),
                    new SqlParameter("@OnlineId", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.Tiem;
			parameters[3].Value = model.CurrSection;
			parameters[4].Value = model.LastDateTime;
            parameters[5].Value = model.IsDele;
            parameters[6].Value = model.BagId;
            parameters[7].Value = model.OnlineId;

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
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_Course_Personal model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Personal set ");
			strSql.Append("Tiem=@Tiem,");
			strSql.Append("CurrSection=@CurrSection,");
			strSql.Append("LastDateTime=@LastDateTime,");
            strSql.Append("IsDele=@IsDele,");
            strSql.Append("BagId=@BagId,");
            strSql.Append("OnlineId=@OnlineId");
			strSql.Append(" where CourseId=@CourseId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@Tiem", SqlDbType.Int,4),
					new SqlParameter("@CurrSection", SqlDbType.Int,4),
					new SqlParameter("@LastDateTime", SqlDbType.DateTime),
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsDele", SqlDbType.Int,4),
                    new SqlParameter("@BagId", SqlDbType.Int,4),
                    new SqlParameter("@OnlineId", SqlDbType.Int,4)};
			parameters[0].Value = model.Tiem;
			parameters[1].Value = model.CurrSection;
			parameters[2].Value = model.LastDateTime;
			parameters[3].Value = model.CourseId;
			parameters[4].Value = model.OpenId;
            parameters[5].Value = model.IsDele;
            parameters[6].Value = model.BagId;
            parameters[7].Value = model.OnlineId;

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
		public bool Delete(int CourseId,string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Personal ");
			strSql.Append(" where CourseId=@CourseId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = CourseId;
			parameters[1].Value = OpenId;

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
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_Course_Personal GetModel(int CourseId,string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 CourseId,OpenId,Tiem,CurrSection,LastDateTime,IsDele,BagId,OnlineId from WX_Course_Personal ");
			strSql.Append(" where CourseId=@CourseId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = CourseId;
			parameters[1].Value = OpenId;

			SfSoft.Model.WX_Course_Personal model=new SfSoft.Model.WX_Course_Personal();
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
		public SfSoft.Model.WX_Course_Personal DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Personal model=new SfSoft.Model.WX_Course_Personal();
			if (row != null)
			{
				if(row["CourseId"]!=null && row["CourseId"].ToString()!="")
				{
					model.CourseId=int.Parse(row["CourseId"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["Tiem"]!=null && row["Tiem"].ToString()!="")
				{
					model.Tiem=int.Parse(row["Tiem"].ToString());
				}
				if(row["CurrSection"]!=null && row["CurrSection"].ToString()!="")
				{
					model.CurrSection=int.Parse(row["CurrSection"].ToString());
				}
				if(row["LastDateTime"]!=null && row["LastDateTime"].ToString()!="")
				{
					model.LastDateTime=DateTime.Parse(row["LastDateTime"].ToString());
				}
                if (row["IsDele"] != null && row["IsDele"].ToString() != "")
                {
                    model.IsDele = int.Parse(row["IsDele"].ToString());
                }
                if (row["BagId"] != null && row["BagId"].ToString() != "")
                {
                    model.BagId = int.Parse(row["BagId"].ToString());
                }
                if (row["OnlineId"] != null && row["OnlineId"].ToString() != "")
                {
                    model.OnlineId = int.Parse(row["OnlineId"].ToString());
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
            strSql.Append("select CourseId,OpenId,Tiem,CurrSection,LastDateTime,IsDele,BagId,OnlineId ");
			strSql.Append(" FROM WX_Course_Personal ");
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
            strSql.Append(" CourseId,OpenId,Tiem,CurrSection,LastDateTime,IsDele,BagId,OnlineId ");
			strSql.Append(" FROM WX_Course_Personal ");
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
			strSql.Append("select count(1) FROM WX_Course_Personal ");
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
				strSql.Append("order by T.OpenId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Course_Personal T ");
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
			parameters[0].Value = "WX_Course_Personal";
			parameters[1].Value = "OpenId";
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

