using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Audio
	/// </summary>
	public partial class WX_Audio:IWX_Audio
	{
		public WX_Audio()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Audio"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Audio");
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
		public int Add(SfSoft.Model.WX_Audio model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Audio(");
            strSql.Append("AppId,CategoryId,FullName,ShortName,SoundSource,Cover,PlayNumber,ShenerSn,Singer,Lyric,IsAct,CreateDate,CategoryPath,Duration)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@CategoryId,@FullName,@ShortName,@SoundSource,@Cover,@PlayNumber,@ShenerSn,@Singer,@Lyric,@IsAct,@CreateDate,@CategoryPath,@Duration)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@CategoryId", SqlDbType.Int,4),
					new SqlParameter("@FullName", SqlDbType.NVarChar,100),
					new SqlParameter("@ShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@SoundSource", SqlDbType.NVarChar,1000),
					new SqlParameter("@Cover", SqlDbType.NVarChar,200),
					new SqlParameter("@PlayNumber", SqlDbType.Int,4),
					new SqlParameter("@ShenerSn", SqlDbType.Int,4),
					new SqlParameter("@Singer", SqlDbType.NVarChar,500),
					new SqlParameter("@Lyric", SqlDbType.Text),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@CategoryPath", SqlDbType.NVarChar,200),
                    new SqlParameter("@Duration", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.CategoryId;
			parameters[2].Value = model.FullName;
			parameters[3].Value = model.ShortName;
			parameters[4].Value = model.SoundSource;
			parameters[5].Value = model.Cover;
			parameters[6].Value = model.PlayNumber;
			parameters[7].Value = model.ShenerSn;
			parameters[8].Value = model.Singer;
			parameters[9].Value = model.Lyric;
			parameters[10].Value = model.IsAct;
			parameters[11].Value = model.CreateDate;
            parameters[12].Value = model.CategoryPath;
            parameters[13].Value = model.Duration;

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
		public bool Update(SfSoft.Model.WX_Audio model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Audio set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("CategoryId=@CategoryId,");
			strSql.Append("FullName=@FullName,");
			strSql.Append("ShortName=@ShortName,");
			strSql.Append("SoundSource=@SoundSource,");
			strSql.Append("Cover=@Cover,");
			strSql.Append("PlayNumber=@PlayNumber,");
			strSql.Append("ShenerSn=@ShenerSn,");
			strSql.Append("Singer=@Singer,");
			strSql.Append("Lyric=@Lyric,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("CategoryPath=@CategoryPath,");
            strSql.Append("Duration=@Duration");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@CategoryId", SqlDbType.Int,4),
					new SqlParameter("@FullName", SqlDbType.NVarChar,100),
					new SqlParameter("@ShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@SoundSource", SqlDbType.NVarChar,1000),
					new SqlParameter("@Cover", SqlDbType.NVarChar,200),
					new SqlParameter("@PlayNumber", SqlDbType.Int,4),
					new SqlParameter("@ShenerSn", SqlDbType.Int,4),
					new SqlParameter("@Singer", SqlDbType.NVarChar,500),
					new SqlParameter("@Lyric", SqlDbType.Text),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@CategoryPath", SqlDbType.NVarChar,200),
                    new SqlParameter("@Duration", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.CategoryId;
			parameters[2].Value = model.FullName;
			parameters[3].Value = model.ShortName;
			parameters[4].Value = model.SoundSource;
			parameters[5].Value = model.Cover;
			parameters[6].Value = model.PlayNumber;
			parameters[7].Value = model.ShenerSn;
			parameters[8].Value = model.Singer;
			parameters[9].Value = model.Lyric;
			parameters[10].Value = model.IsAct;
			parameters[11].Value = model.CreateDate;
            parameters[12].Value = model.CategoryPath;
            parameters[13].Value = model.Duration;
			parameters[14].Value = model.Id;

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
			strSql.Append("delete from WX_Audio ");
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
			strSql.Append("delete from WX_Audio ");
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
		public SfSoft.Model.WX_Audio GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,CategoryId,FullName,ShortName,SoundSource,Cover,PlayNumber,ShenerSn,Singer,Lyric,IsAct,CreateDate,CategoryPath,Duration from WX_Audio ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Audio model=new SfSoft.Model.WX_Audio();
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
		public SfSoft.Model.WX_Audio DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Audio model=new SfSoft.Model.WX_Audio();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["AppId"]!=null)
				{
					model.AppId=row["AppId"].ToString();
				}
				if(row["CategoryId"]!=null && row["CategoryId"].ToString()!="")
				{
					model.CategoryId=int.Parse(row["CategoryId"].ToString());
				}
				if(row["FullName"]!=null)
				{
					model.FullName=row["FullName"].ToString();
				}
				if(row["ShortName"]!=null)
				{
					model.ShortName=row["ShortName"].ToString();
				}
				if(row["SoundSource"]!=null)
				{
					model.SoundSource=row["SoundSource"].ToString();
				}
				if(row["Cover"]!=null)
				{
					model.Cover=row["Cover"].ToString();
				}
				if(row["PlayNumber"]!=null && row["PlayNumber"].ToString()!="")
				{
					model.PlayNumber=int.Parse(row["PlayNumber"].ToString());
				}
				if(row["ShenerSn"]!=null && row["ShenerSn"].ToString()!="")
				{
					model.ShenerSn=int.Parse(row["ShenerSn"].ToString());
				}
				if(row["Singer"]!=null)
				{
					model.Singer=row["Singer"].ToString();
				}
				if(row["Lyric"]!=null)
				{
					model.Lyric=row["Lyric"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["CategoryPath"] != null)
                {
                    model.CategoryPath = row["CategoryPath"].ToString();
                }
                if (row["Duration"] != null && row["Duration"].ToString() != "")
                {
                    model.Duration = int.Parse(row["Duration"].ToString());
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
            strSql.Append("select Id,AppId,CategoryId,FullName,ShortName,SoundSource,Cover,PlayNumber,ShenerSn,Singer,Lyric,IsAct,CreateDate,CategoryPath,Duration ");
			strSql.Append(" FROM WX_Audio ");
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
            strSql.Append(" Id,AppId,CategoryId,FullName,ShortName,SoundSource,Cover,PlayNumber,ShenerSn,Singer,Lyric,IsAct,CreateDate,CategoryPath,Duration ");
			strSql.Append(" FROM WX_Audio ");
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
			strSql.Append("select count(1) FROM WX_Audio ");
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
			strSql.Append(")AS Row, T.*  from WX_Audio T ");
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
			parameters[0].Value = "WX_Audio";
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

