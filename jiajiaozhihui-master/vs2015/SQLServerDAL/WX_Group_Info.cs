using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Group_Info
	/// </summary>
	public partial class WX_Group_Info:IWX_Group_Info
	{
		public WX_Group_Info()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Group_Info"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Group_Info");
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
		public int Add(SfSoft.Model.WX_Group_Info model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Group_Info(");
			strSql.Append("Coding,Type,Name,LogoUrl,Intro,Detail,Grule,UpperLimit,[Check],QRcodeUrl,RegisterQRcodeUrl,IsPremium,PremiumCondition,Premium,Balance,CreateDate,Status)");
			strSql.Append(" values (");
			strSql.Append("@Coding,@Type,@Name,@LogoUrl,@Intro,@Detail,@Grule,@UpperLimit,@Check,@QRcodeUrl,@RegisterQRcodeUrl,@IsPremium,@PremiumCondition,@Premium,@Balance,@CreateDate,@Status)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Coding", SqlDbType.NVarChar,50),
					new SqlParameter("@Type", SqlDbType.NVarChar,50),
					new SqlParameter("@Name", SqlDbType.NVarChar,50),
					new SqlParameter("@LogoUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@Intro", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@Grule", SqlDbType.NVarChar,500),
					new SqlParameter("@UpperLimit", SqlDbType.Int,4),
					new SqlParameter("@Check", SqlDbType.Int,4),
					new SqlParameter("@QRcodeUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@RegisterQRcodeUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@IsPremium", SqlDbType.Int,4),
					new SqlParameter("@PremiumCondition", SqlDbType.Int,4),
					new SqlParameter("@Premium", SqlDbType.Decimal,9),
					new SqlParameter("@Balance", SqlDbType.Decimal,9),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Status", SqlDbType.Int,4)};
			parameters[0].Value = model.Coding;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.Name;
			parameters[3].Value = model.LogoUrl;
			parameters[4].Value = model.Intro;
			parameters[5].Value = model.Detail;
			parameters[6].Value = model.Grule;
			parameters[7].Value = model.UpperLimit;
			parameters[8].Value = model.Check;
			parameters[9].Value = model.QRcodeUrl;
			parameters[10].Value = model.RegisterQRcodeUrl;
			parameters[11].Value = model.IsPremium;
			parameters[12].Value = model.PremiumCondition;
			parameters[13].Value = model.Premium;
			parameters[14].Value = model.Balance;
			parameters[15].Value = model.CreateDate;
			parameters[16].Value = model.Status;

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
		public bool Update(SfSoft.Model.WX_Group_Info model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Group_Info set ");
			strSql.Append("Coding=@Coding,");
			strSql.Append("Type=@Type,");
			strSql.Append("Name=@Name,");
			strSql.Append("LogoUrl=@LogoUrl,");
			strSql.Append("Intro=@Intro,");
			strSql.Append("Detail=@Detail,");
			strSql.Append("Grule=@Grule,");
			strSql.Append("UpperLimit=@UpperLimit,");
			strSql.Append("[Check]=@Check,");
			strSql.Append("QRcodeUrl=@QRcodeUrl,");
			strSql.Append("RegisterQRcodeUrl=@RegisterQRcodeUrl,");
			strSql.Append("IsPremium=@IsPremium,");
			strSql.Append("PremiumCondition=@PremiumCondition,");
			strSql.Append("Premium=@Premium,");
			strSql.Append("Balance=@Balance,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Status=@Status");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Coding", SqlDbType.NVarChar,50),
					new SqlParameter("@Type", SqlDbType.NVarChar,50),
					new SqlParameter("@Name", SqlDbType.NVarChar,50),
					new SqlParameter("@LogoUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@Intro", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@Grule", SqlDbType.NVarChar,500),
					new SqlParameter("@UpperLimit", SqlDbType.Int,4),
					new SqlParameter("@Check", SqlDbType.Int,4),
					new SqlParameter("@QRcodeUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@RegisterQRcodeUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@IsPremium", SqlDbType.Int,4),
					new SqlParameter("@PremiumCondition", SqlDbType.Int,4),
					new SqlParameter("@Premium", SqlDbType.Decimal,9),
					new SqlParameter("@Balance", SqlDbType.Decimal,9),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.Coding;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.Name;
			parameters[3].Value = model.LogoUrl;
			parameters[4].Value = model.Intro;
			parameters[5].Value = model.Detail;
			parameters[6].Value = model.Grule;
			parameters[7].Value = model.UpperLimit;
			parameters[8].Value = model.Check;
			parameters[9].Value = model.QRcodeUrl;
			parameters[10].Value = model.RegisterQRcodeUrl;
			parameters[11].Value = model.IsPremium;
			parameters[12].Value = model.PremiumCondition;
			parameters[13].Value = model.Premium;
			parameters[14].Value = model.Balance;
			parameters[15].Value = model.CreateDate;
			parameters[16].Value = model.Status;
			parameters[17].Value = model.Id;

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
			strSql.Append("delete from WX_Group_Info ");
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
			strSql.Append("delete from WX_Group_Info ");
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
		public SfSoft.Model.WX_Group_Info GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,Coding,Type,Name,LogoUrl,Intro,Detail,Grule,UpperLimit,[Check],QRcodeUrl,RegisterQRcodeUrl,IsPremium,PremiumCondition,Premium,Balance,CreateDate,Status from WX_Group_Info ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Group_Info model=new SfSoft.Model.WX_Group_Info();
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
		public SfSoft.Model.WX_Group_Info DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Group_Info model=new SfSoft.Model.WX_Group_Info();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["Coding"]!=null)
				{
					model.Coding=row["Coding"].ToString();
				}
				if(row["Type"]!=null )
				{
					model.Type=row["Type"].ToString();
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
				if(row["LogoUrl"]!=null)
				{
					model.LogoUrl=row["LogoUrl"].ToString();
				}
				if(row["Intro"]!=null)
				{
					model.Intro=row["Intro"].ToString();
				}
				if(row["Detail"]!=null)
				{
					model.Detail=row["Detail"].ToString();
				}
				if(row["Grule"]!=null)
				{
					model.Grule=row["Grule"].ToString();
				}
				if(row["UpperLimit"]!=null && row["UpperLimit"].ToString()!="")
				{
					model.UpperLimit=int.Parse(row["UpperLimit"].ToString());
				}
				if(row["Check"]!=null && row["Check"].ToString()!="")
				{
					model.Check=int.Parse(row["Check"].ToString());
				}
				if(row["QRcodeUrl"]!=null)
				{
					model.QRcodeUrl=row["QRcodeUrl"].ToString();
				}
				if(row["RegisterQRcodeUrl"]!=null)
				{
					model.RegisterQRcodeUrl=row["RegisterQRcodeUrl"].ToString();
				}
				if(row["IsPremium"]!=null && row["IsPremium"].ToString()!="")
				{
					model.IsPremium=int.Parse(row["IsPremium"].ToString());
				}
				if(row["PremiumCondition"]!=null && row["PremiumCondition"].ToString()!="")
				{
					model.PremiumCondition=int.Parse(row["PremiumCondition"].ToString());
				}
				if(row["Premium"]!=null && row["Premium"].ToString()!="")
				{
					model.Premium=decimal.Parse(row["Premium"].ToString());
				}
				if(row["Balance"]!=null && row["Balance"].ToString()!="")
				{
					model.Balance=decimal.Parse(row["Balance"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Status"]!=null && row["Status"].ToString()!="")
				{
					model.Status=int.Parse(row["Status"].ToString());
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
			strSql.Append("select Id,Coding,Type,Name,LogoUrl,Intro,Detail,Grule,UpperLimit,[Check],QRcodeUrl,RegisterQRcodeUrl,IsPremium,PremiumCondition,Premium,Balance,CreateDate,Status ");
			strSql.Append(" FROM WX_Group_Info ");
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
			strSql.Append(" Id,Coding,Type,Name,LogoUrl,Intro,Detail,Grule,UpperLimit,[Check],QRcodeUrl,RegisterQRcodeUrl,IsPremium,PremiumCondition,Premium,Balance,CreateDate,Status ");
			strSql.Append(" FROM WX_Group_Info ");
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
			strSql.Append("select count(1) FROM WX_Group_Info ");
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
			strSql.Append(")AS Row, T.*  from WX_Group_Info T ");
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
			parameters[0].Value = "WX_Group_Info";
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

