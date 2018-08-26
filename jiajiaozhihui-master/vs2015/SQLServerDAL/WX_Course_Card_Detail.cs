using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Card_Detail
	/// </summary>
	public partial class WX_Course_Card_Detail:IWX_Course_Card_Detail
	{
		public WX_Course_Card_Detail()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Card_Detail"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Card_Detail");
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
		public int Add(SfSoft.Model.WX_Course_Card_Detail model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Card_Detail(");
            strSql.Append("CardId,CardNo,Url,IsUsing,OpenId,RegistDate,QRPath,DownNumber,CreateDate,Scale,CheckCode,IpAddress)");
			strSql.Append(" values (");
            strSql.Append("@CardId,@CardNo,@Url,@IsUsing,@OpenId,@RegistDate,@QRPath,@DownNumber,@CreateDate,@Scale,@CheckCode,@IpAddress)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CardId", SqlDbType.Int,4),
					new SqlParameter("@CardNo", SqlDbType.NVarChar,100),
					new SqlParameter("@Url", SqlDbType.NVarChar,1000),
                    new SqlParameter("@IsUsing", SqlDbType.Int,4),
                    new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
                    new SqlParameter("@RegistDate", SqlDbType.DateTime),
                    new SqlParameter("@QRPath", SqlDbType.NVarChar,500),
                    new SqlParameter("@DownNumber", SqlDbType.Int,4),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Scale", SqlDbType.Int,4),
                    new SqlParameter("@CheckCode", SqlDbType.NVarChar,32),
                    new SqlParameter("@IpAddress", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.CardId;
			parameters[1].Value = model.CardNo;
			parameters[2].Value = model.Url;
            parameters[3].Value = model.IsUsing;
            parameters[4].Value = model.OpenId;
            parameters[5].Value = model.RegistDate;
            parameters[6].Value = model.QRPath;
            parameters[7].Value = model.DownNumber;
            parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.Scale;
            parameters[10].Value = model.CheckCode;
            parameters[11].Value = model.IpAddress;

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
		public bool Update(SfSoft.Model.WX_Course_Card_Detail model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Card_Detail set ");
			strSql.Append("CardId=@CardId,");
			strSql.Append("CardNo=@CardNo,");
			strSql.Append("Url=@Url,");
            strSql.Append("IsUsing=@IsUsing,");
            strSql.Append("OpenId=@OpenId,");
            strSql.Append("RegistDate=@RegistDate,");
            strSql.Append("QRPath=@QRPath,");
            strSql.Append("DownNumber=@DownNumber,");
            strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("Scale=@Scale,");
            strSql.Append("CheckCode=@CheckCode,");
            strSql.Append("IpAddress=@IpAddress");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@CardId", SqlDbType.Int,4),
					new SqlParameter("@CardNo", SqlDbType.NVarChar,100),
					new SqlParameter("@Url", SqlDbType.NVarChar,1000),
                    new SqlParameter("@IsUsing", SqlDbType.Int,4),
                    new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
                    new SqlParameter("@RegistDate", SqlDbType.DateTime),
                    new SqlParameter("@QRPath", SqlDbType.NVarChar,500),
                    new SqlParameter("@DownNumber", SqlDbType.Int,4),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Scale", SqlDbType.Int,4),
                    new SqlParameter("@CheckCode", SqlDbType.NVarChar,32),
                    new SqlParameter("@IpAddress", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.CardId;
			parameters[1].Value = model.CardNo;
			parameters[2].Value = model.Url;
            parameters[3].Value = model.IsUsing;
            parameters[4].Value = model.OpenId;
            parameters[5].Value = model.RegistDate;
            parameters[6].Value = model.QRPath;
            parameters[7].Value = model.DownNumber;
            parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.Scale;
            parameters[10].Value = model.CheckCode;
            parameters[11].Value = model.IpAddress;
			parameters[12].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Card_Detail ");
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
			strSql.Append("delete from WX_Course_Card_Detail ");
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
		public SfSoft.Model.WX_Course_Card_Detail GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,CardId,CardNo,Url,IsUsing,OpenId,RegistDate,QRPath,DownNumber,CreateDate,Scale,CheckCode,IpAddress from WX_Course_Card_Detail ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Card_Detail model=new SfSoft.Model.WX_Course_Card_Detail();
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
		public SfSoft.Model.WX_Course_Card_Detail DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Card_Detail model=new SfSoft.Model.WX_Course_Card_Detail();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["CardId"]!=null && row["CardId"].ToString()!="")
				{
					model.CardId=int.Parse(row["CardId"].ToString());
				}
				if(row["CardNo"]!=null)
				{
					model.CardNo=row["CardNo"].ToString();
				}
				if(row["Url"]!=null)
				{
					model.Url=row["Url"].ToString();
				}
                if (row["IsUsing"] != null && row["IsUsing"].ToString() != "")
                {
                    model.IsUsing = int.Parse(row["IsUsing"].ToString());
                }
                if (row["OpenId"] != null)
                {
                    model.OpenId = row["OpenId"].ToString();
                }
                if (row["RegistDate"] != null && row["RegistDate"].ToString() != "")
                {
                    model.RegistDate = DateTime.Parse(row["RegistDate"].ToString());
                }
                if (row["QRPath"] != null)
                {
                    model.QRPath = row["QRPath"].ToString();
                }
                if (row["DownNumber"] != null && row["DownNumber"].ToString() != "")
                {
                    model.DownNumber = int.Parse(row["DownNumber"].ToString());
                }
                if (row["CreateDate"] != null && row["CreateDate"].ToString() != "")
                {
                    model.CreateDate = DateTime.Parse(row["CreateDate"].ToString());
                }
                if (row["Scale"] != null && row["Scale"].ToString() != "")
                {
                    model.Scale = int.Parse(row["Scale"].ToString());
                }
                if (row["CheckCode"] != null)
                {
                    model.CheckCode = row["CheckCode"].ToString();
                }
                if (row["IpAddress"] != null)
                {
                    model.IpAddress = row["IpAddress"].ToString();
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
            strSql.Append("select Id,CardId,CardNo,Url,IsUsing,OpenId,RegistDate,QRPath,DownNumber,CreateDate,Scale,CheckCode,IpAddress ");
			strSql.Append(" FROM WX_Course_Card_Detail ");
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
            strSql.Append(" Id,CardId,CardNo,Url,IsUsing,OpenId,RegistDate,QRPath,DownNumber,CreateDate,Scale,CheckCode,IpAddress ");
			strSql.Append(" FROM WX_Course_Card_Detail ");
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
			strSql.Append("select count(1) FROM WX_Course_Card_Detail ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Card_Detail T ");
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
			parameters[0].Value = "WX_Course_Card_Detail";
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

