using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_SGroup
	/// </summary>
	public partial class WX_SGroup:IWX_SGroup
	{
		public WX_SGroup()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "WX_SGroup"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_SGroup");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_SGroup model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_SGroup(");
			strSql.Append("group_name,introduce,img_url,is_act,create_date,Accounts,PassWord,Remark)");
			strSql.Append(" values (");
			strSql.Append("@group_name,@introduce,@img_url,@is_act,@create_date,@Accounts,@PassWord,@Remark)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@group_name", SqlDbType.NVarChar,100),
					new SqlParameter("@introduce", SqlDbType.Text),
					new SqlParameter("@img_url", SqlDbType.NVarChar,200),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
                    new SqlParameter("@Accounts", SqlDbType.NVarChar,200),
                    new SqlParameter("@PassWord", SqlDbType.NVarChar,30),
                    new SqlParameter("@Remark", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.group_name;
			parameters[1].Value = model.introduce;
			parameters[2].Value = model.img_url;
			parameters[3].Value = model.is_act;
			parameters[4].Value = model.create_date;
            parameters[5].Value = model.Accounts;
            parameters[6].Value = model.PassWord;
            parameters[7].Value = model.Remark;

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
		public bool Update(SfSoft.Model.WX_SGroup model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_SGroup set ");
			strSql.Append("group_name=@group_name,");
			strSql.Append("introduce=@introduce,");
			strSql.Append("img_url=@img_url,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("create_date=@create_date,");
            strSql.Append("Accounts=@Accounts,");
            strSql.Append("PassWord=@PassWord,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@group_name", SqlDbType.NVarChar,100),
					new SqlParameter("@introduce", SqlDbType.Text),
					new SqlParameter("@img_url", SqlDbType.NVarChar,200),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
                    new SqlParameter("@Accounts", SqlDbType.NVarChar,200),
                    new SqlParameter("@PassWord", SqlDbType.NVarChar,30),
                    new SqlParameter("@Remark", SqlDbType.NVarChar,200),
                    new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.group_name;
			parameters[1].Value = model.introduce;
			parameters[2].Value = model.img_url;
			parameters[3].Value = model.is_act;
			parameters[4].Value = model.create_date;
            parameters[5].Value = model.Accounts;
            parameters[6].Value = model.PassWord;
            parameters[7].Value = model.Remark;
            parameters[8].Value = model.id;

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
		public bool Delete(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_SGroup ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

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
		public bool DeleteList(string idlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_SGroup ");
			strSql.Append(" where id in ("+idlist + ")  ");
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
		public SfSoft.Model.WX_SGroup GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,group_name,introduce,img_url,is_act,create_date,Accounts,PassWord,Remark from WX_SGroup ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.WX_SGroup model=new SfSoft.Model.WX_SGroup();
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
		public SfSoft.Model.WX_SGroup DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_SGroup model=new SfSoft.Model.WX_SGroup();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["group_name"]!=null)
				{
					model.group_name=row["group_name"].ToString();
				}
				if(row["introduce"]!=null)
				{
					model.introduce=row["introduce"].ToString();
				}
				if(row["img_url"]!=null)
				{
					model.img_url=row["img_url"].ToString();
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
                if (row["Accounts"] != null)
                {
                    model.Accounts = row["Accounts"].ToString();
                }
                if (row["PassWord"] != null)
                {
                    model.PassWord = row["PassWord"].ToString();
                }
                if (row["Remark"] != null)
                {
                    model.Remark = row["Remark"].ToString();
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
			strSql.Append("select id,group_name,introduce,img_url,is_act,create_date,Accounts,PassWord,Remark ");
			strSql.Append(" FROM WX_SGroup ");
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
			strSql.Append(" id,group_name,introduce,img_url,is_act,create_date,Accounts,PassWord,Remark ");
			strSql.Append(" FROM WX_SGroup ");
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
			strSql.Append("select count(1) FROM WX_SGroup ");
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
				strSql.Append("order by T.id desc");
			}
			strSql.Append(")AS Row, T.*  from WX_SGroup T ");
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
			parameters[0].Value = "WX_SGroup";
			parameters[1].Value = "id";
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

