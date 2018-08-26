using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Parents_Plan
	/// </summary>
	public partial class WX_Parents_Plan:IWX_Parents_Plan
	{
		public WX_Parents_Plan()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Parents_Plan"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Parents_Plan");
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
		public int Add(SfSoft.Model.WX_Parents_Plan model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Parents_Plan(");
            strSql.Append("AppId,PlanName,Score,Contents,Intro,TestLibraryId,MedalName,CreateDate,IsAct,Sn,Quantity)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@PlanName,@Score,@Contents,@Intro,@TestLibraryId,@MedalName,@CreateDate,@IsAct,@Sn,@Quantity)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@PlanName", SqlDbType.NVarChar,50),
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@Contents", SqlDbType.Text),
					new SqlParameter("@Intro", SqlDbType.NVarChar,200),
					new SqlParameter("@TestLibraryId", SqlDbType.NVarChar,100),
					new SqlParameter("@MedalName", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@Quantity", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.PlanName;
			parameters[2].Value = model.Score;
			parameters[3].Value = model.Contents;
			parameters[4].Value = model.Intro;
			parameters[5].Value = model.TestLibraryId;
			parameters[6].Value = model.MedalName;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.IsAct;
			parameters[9].Value = model.Sn;
            parameters[10].Value = model.Quantity;

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
		public bool Update(SfSoft.Model.WX_Parents_Plan model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Parents_Plan set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("PlanName=@PlanName,");
			strSql.Append("Score=@Score,");
			strSql.Append("Contents=@Contents,");
			strSql.Append("Intro=@Intro,");
			strSql.Append("TestLibraryId=@TestLibraryId,");
			strSql.Append("MedalName=@MedalName,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("Sn=@Sn,");
            strSql.Append("Quantity=@Quantity");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@PlanName", SqlDbType.NVarChar,50),
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@Contents", SqlDbType.Text),
					new SqlParameter("@Intro", SqlDbType.NVarChar,200),
					new SqlParameter("@TestLibraryId", SqlDbType.NVarChar,100),
					new SqlParameter("@MedalName", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@Quantity", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.PlanName;
			parameters[2].Value = model.Score;
			parameters[3].Value = model.Contents;
			parameters[4].Value = model.Intro;
			parameters[5].Value = model.TestLibraryId;
			parameters[6].Value = model.MedalName;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.IsAct;
			parameters[9].Value = model.Sn;
            parameters[10].Value = model.Quantity;
			parameters[11].Value = model.Id;

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
			strSql.Append("delete from WX_Parents_Plan ");
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
			strSql.Append("delete from WX_Parents_Plan ");
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
		public SfSoft.Model.WX_Parents_Plan GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,PlanName,Score,Contents,Intro,TestLibraryId,MedalName,CreateDate,IsAct,Sn,Quantity from WX_Parents_Plan ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Parents_Plan model=new SfSoft.Model.WX_Parents_Plan();
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
		public SfSoft.Model.WX_Parents_Plan DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Parents_Plan model=new SfSoft.Model.WX_Parents_Plan();
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
				if(row["PlanName"]!=null)
				{
					model.PlanName=row["PlanName"].ToString();
				}
				if(row["Score"]!=null && row["Score"].ToString()!="")
				{
					model.Score=int.Parse(row["Score"].ToString());
				}
				if(row["Contents"]!=null)
				{
					model.Contents=row["Contents"].ToString();
				}
				if(row["Intro"]!=null)
				{
					model.Intro=row["Intro"].ToString();
				}
				if(row["TestLibraryId"]!=null )
				{
                    model.TestLibraryId = row["TestLibraryId"].ToString();
				}
				if(row["MedalName"]!=null)
				{
					model.MedalName=row["MedalName"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["Sn"]!=null && row["Sn"].ToString()!="")
				{
					model.Sn=int.Parse(row["Sn"].ToString());
				}
                if (row["Quantity"] != null && row["Quantity"].ToString() != "")
                {
                    model.Quantity = int.Parse(row["Quantity"].ToString());
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
            strSql.Append("select Id,AppId,PlanName,Score,Contents,Intro,TestLibraryId,MedalName,CreateDate,IsAct,Sn,Quantity ");
			strSql.Append(" FROM WX_Parents_Plan ");
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
            strSql.Append(" Id,AppId,PlanName,Score,Contents,Intro,TestLibraryId,MedalName,CreateDate,IsAct,Sn,Quantity ");
			strSql.Append(" FROM WX_Parents_Plan ");
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
			strSql.Append("select count(1) FROM WX_Parents_Plan ");
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
			strSql.Append(")AS Row, T.*  from WX_Parents_Plan T ");
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
			parameters[0].Value = "WX_Parents_Plan";
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

