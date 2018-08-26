using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Provider
	/// </summary>
	public partial class WX_Course_Provider:IWX_Course_Provider
	{
		public WX_Course_Provider()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Provider"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Provider");
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
		public int Add(SfSoft.Model.WX_Course_Provider model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Provider(");
			strSql.Append("Name,Type,LinkMan,Mobile,Weixin,QQ,IsAct,CollDate,AccountNumber,BeneficiaryName,ReceivingBank,LastEditMan,LastEditDate)");
			strSql.Append(" values (");
			strSql.Append("@Name,@Type,@LinkMan,@Mobile,@Weixin,@QQ,@IsAct,@CollDate,@AccountNumber,@BeneficiaryName,@ReceivingBank,@LastEditMan,@LastEditDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@Type", SqlDbType.NVarChar,20),
					new SqlParameter("@LinkMan", SqlDbType.NVarChar,20),
					new SqlParameter("@Mobile", SqlDbType.NVarChar,20),
					new SqlParameter("@Weixin", SqlDbType.NVarChar,50),
					new SqlParameter("@QQ", SqlDbType.NVarChar,20),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CollDate", SqlDbType.DateTime),
					new SqlParameter("@AccountNumber", SqlDbType.NVarChar,50),
					new SqlParameter("@BeneficiaryName", SqlDbType.NVarChar,20),
					new SqlParameter("@ReceivingBank", SqlDbType.NVarChar,100),
					new SqlParameter("@LastEditMan", SqlDbType.NVarChar,20),
					new SqlParameter("@LastEditDate", SqlDbType.DateTime)};
			parameters[0].Value = model.Name;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.LinkMan;
			parameters[3].Value = model.Mobile;
			parameters[4].Value = model.Weixin;
			parameters[5].Value = model.QQ;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.CollDate;
			parameters[8].Value = model.AccountNumber;
			parameters[9].Value = model.BeneficiaryName;
			parameters[10].Value = model.ReceivingBank;
			parameters[11].Value = model.LastEditMan;
			parameters[12].Value = model.LastEditDate;

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
		public bool Update(SfSoft.Model.WX_Course_Provider model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Provider set ");
			strSql.Append("Name=@Name,");
			strSql.Append("Type=@Type,");
			strSql.Append("LinkMan=@LinkMan,");
			strSql.Append("Mobile=@Mobile,");
			strSql.Append("Weixin=@Weixin,");
			strSql.Append("QQ=@QQ,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CollDate=@CollDate,");
			strSql.Append("AccountNumber=@AccountNumber,");
			strSql.Append("BeneficiaryName=@BeneficiaryName,");
			strSql.Append("ReceivingBank=@ReceivingBank,");
			strSql.Append("LastEditMan=@LastEditMan,");
			strSql.Append("LastEditDate=@LastEditDate");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@Type", SqlDbType.NVarChar,20),
					new SqlParameter("@LinkMan", SqlDbType.NVarChar,20),
					new SqlParameter("@Mobile", SqlDbType.NVarChar,20),
					new SqlParameter("@Weixin", SqlDbType.NVarChar,50),
					new SqlParameter("@QQ", SqlDbType.NVarChar,20),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CollDate", SqlDbType.DateTime),
					new SqlParameter("@AccountNumber", SqlDbType.NVarChar,50),
					new SqlParameter("@BeneficiaryName", SqlDbType.NVarChar,20),
					new SqlParameter("@ReceivingBank", SqlDbType.NVarChar,100),
					new SqlParameter("@LastEditMan", SqlDbType.NVarChar,20),
					new SqlParameter("@LastEditDate", SqlDbType.DateTime),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.Name;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.LinkMan;
			parameters[3].Value = model.Mobile;
			parameters[4].Value = model.Weixin;
			parameters[5].Value = model.QQ;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.CollDate;
			parameters[8].Value = model.AccountNumber;
			parameters[9].Value = model.BeneficiaryName;
			parameters[10].Value = model.ReceivingBank;
			parameters[11].Value = model.LastEditMan;
			parameters[12].Value = model.LastEditDate;
			parameters[13].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Provider ");
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
			strSql.Append("delete from WX_Course_Provider ");
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
		public SfSoft.Model.WX_Course_Provider GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,Name,Type,LinkMan,Mobile,Weixin,QQ,IsAct,CollDate,AccountNumber,BeneficiaryName,ReceivingBank,LastEditMan,LastEditDate from WX_Course_Provider ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Provider model=new SfSoft.Model.WX_Course_Provider();
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
		public SfSoft.Model.WX_Course_Provider DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Provider model=new SfSoft.Model.WX_Course_Provider();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
				if(row["Type"]!=null)
				{
					model.Type=row["Type"].ToString();
				}
				if(row["LinkMan"]!=null)
				{
					model.LinkMan=row["LinkMan"].ToString();
				}
				if(row["Mobile"]!=null)
				{
					model.Mobile=row["Mobile"].ToString();
				}
				if(row["Weixin"]!=null)
				{
					model.Weixin=row["Weixin"].ToString();
				}
				if(row["QQ"]!=null)
				{
					model.QQ=row["QQ"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["CollDate"]!=null && row["CollDate"].ToString()!="")
				{
					model.CollDate=DateTime.Parse(row["CollDate"].ToString());
				}
				if(row["AccountNumber"]!=null)
				{
					model.AccountNumber=row["AccountNumber"].ToString();
				}
				if(row["BeneficiaryName"]!=null)
				{
					model.BeneficiaryName=row["BeneficiaryName"].ToString();
				}
				if(row["ReceivingBank"]!=null)
				{
					model.ReceivingBank=row["ReceivingBank"].ToString();
				}
				if(row["LastEditMan"]!=null)
				{
					model.LastEditMan=row["LastEditMan"].ToString();
				}
				if(row["LastEditDate"]!=null && row["LastEditDate"].ToString()!="")
				{
					model.LastEditDate=DateTime.Parse(row["LastEditDate"].ToString());
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
			strSql.Append("select Id,Name,Type,LinkMan,Mobile,Weixin,QQ,IsAct,CollDate,AccountNumber,BeneficiaryName,ReceivingBank,LastEditMan,LastEditDate ");
			strSql.Append(" FROM WX_Course_Provider ");
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
			strSql.Append(" Id,Name,Type,LinkMan,Mobile,Weixin,QQ,IsAct,CollDate,AccountNumber,BeneficiaryName,ReceivingBank,LastEditMan,LastEditDate ");
			strSql.Append(" FROM WX_Course_Provider ");
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
			strSql.Append("select count(1) FROM WX_Course_Provider ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Provider T ");
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
			parameters[0].Value = "WX_Course_Provider";
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

