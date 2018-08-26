using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Doublenovember_File_unscramble
	/// </summary>
	public partial class WX_Doublenovember_File_unscramble:IWX_Doublenovember_File_unscramble
	{
		public WX_Doublenovember_File_unscramble()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Doublenovember_File_unscramble"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Doublenovember_File_unscramble");
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
		public int Add(SfSoft.Model.WX_Doublenovember_File_unscramble model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Doublenovember_File_unscramble(");
			strSql.Append("BookName,PageIndex,MainWords,Original,Translation,CreateDate,IsAct)");
			strSql.Append(" values (");
            strSql.Append("@BookName,@PageIndex,@MainWords,@Original,@Translation,@CreateDate,@IsAct)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@BookName", SqlDbType.NVarChar,50),
					new SqlParameter("@PageIndex", SqlDbType.Int,4),
					new SqlParameter("@MainWords", SqlDbType.NVarChar,500),
					new SqlParameter("@Original", SqlDbType.Text),
					new SqlParameter("@Translation", SqlDbType.Text),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4)};
			parameters[0].Value = model.BookName;
			parameters[1].Value = model.PageIndex;
			parameters[2].Value = model.MainWords;
			parameters[3].Value = model.Original;
			parameters[4].Value = model.Translation;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsAct;

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
		public bool Update(SfSoft.Model.WX_Doublenovember_File_unscramble model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Doublenovember_File_unscramble set ");
			strSql.Append("BookName=@BookName,");
			strSql.Append("PageIndex=@PageIndex,");
			strSql.Append("MainWords=@MainWords,");
			strSql.Append("Original=@Original,");
			strSql.Append("Translation=@Translation,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("IsAct=@IsAct");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@BookName", SqlDbType.NVarChar,50),
					new SqlParameter("@PageIndex", SqlDbType.Int,4),
					new SqlParameter("@MainWords", SqlDbType.NVarChar,500),
					new SqlParameter("@Original", SqlDbType.Text),
					new SqlParameter("@Translation", SqlDbType.Text),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.BookName;
			parameters[1].Value = model.PageIndex;
			parameters[2].Value = model.MainWords;
			parameters[3].Value = model.Original;
			parameters[4].Value = model.Translation;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsAct;
			parameters[7].Value = model.ID;

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
			strSql.Append("delete from WX_Doublenovember_File_unscramble ");
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
			strSql.Append("delete from WX_Doublenovember_File_unscramble ");
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
		public SfSoft.Model.WX_Doublenovember_File_unscramble GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,BookName,PageIndex,MainWords,Original,Translation,CreateDate,IsAct from WX_Doublenovember_File_unscramble ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Doublenovember_File_unscramble model=new SfSoft.Model.WX_Doublenovember_File_unscramble();
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
		public SfSoft.Model.WX_Doublenovember_File_unscramble DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Doublenovember_File_unscramble model=new SfSoft.Model.WX_Doublenovember_File_unscramble();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["BookName"]!=null)
				{
					model.BookName=row["BookName"].ToString();
				}
				if(row["PageIndex"]!=null && row["PageIndex"].ToString()!="")
				{
					model.PageIndex=int.Parse(row["PageIndex"].ToString());
				}
				if(row["MainWords"]!=null)
				{
					model.MainWords=row["MainWords"].ToString();
				}
				if(row["Original"]!=null)
				{
					model.Original=row["Original"].ToString();
				}
				if(row["Translation"]!=null)
				{
					model.Translation=row["Translation"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
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
            strSql.Append("select ID,BookName,PageIndex,MainWords,Original,Translation,CreateDate,IsAct ");
			strSql.Append(" FROM WX_Doublenovember_File_unscramble ");
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
            strSql.Append(" ID,BookName,PageIndex,MainWords,Original,Translation,CreateDate,IsAct ");
			strSql.Append(" FROM WX_Doublenovember_File_unscramble ");
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
			strSql.Append("select count(1) FROM WX_Doublenovember_File_unscramble ");
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
			strSql.Append(")AS Row, T.*  from WX_Doublenovember_File_unscramble T ");
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
			parameters[0].Value = "WX_Doublenovember_File_unscramble";
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


        public Model.WX_Doublenovember_File_unscramble GetModel(string bookName, int pageIndex)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,BookName,PageIndex,MainWords,Original,Translation,CreateDate,IsAct from WX_Doublenovember_File_unscramble ");
            strSql.Append(" where BookName=@BookName");
            strSql.Append(" and PageIndex=@PageIndex");
            SqlParameter[] parameters = {
					new SqlParameter("@BookName", SqlDbType.NVarChar,50),
                    new SqlParameter("@PageIndex", SqlDbType.Int,4)
			};
            parameters[0].Value = bookName;
            parameters[1].Value = pageIndex;

            SfSoft.Model.WX_Doublenovember_File_unscramble model = new SfSoft.Model.WX_Doublenovember_File_unscramble();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }
    }
}

