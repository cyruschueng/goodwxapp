using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_SGroup_Content
	/// </summary>
	public partial class WX_SGroup_Content:IWX_SGroup_Content
	{
		public WX_SGroup_Content()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "WX_SGroup_Content"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_SGroup_Content");
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
		public int Add(SfSoft.Model.WX_SGroup_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_SGroup_Content(");
			strSql.Append("group_type,img_url,title,introduce,is_act,create_date,valid_date,Quantity,IsDelete,UsingDate,catalogue,class_name)");
			strSql.Append(" values (");
			strSql.Append("@group_type,@img_url,@title,@introduce,@is_act,@create_date,@valid_date,@Quantity,@IsDelete,@UsingDate,@catalogue,@class_name)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@group_type", SqlDbType.Int,4),
					new SqlParameter("@img_url", SqlDbType.NVarChar,200),
					new SqlParameter("@title", SqlDbType.NVarChar,100),
					new SqlParameter("@introduce", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
                    new SqlParameter("@valid_date", SqlDbType.DateTime),
                    new SqlParameter("@Quantity", SqlDbType.Int,4),
                    new SqlParameter("@IsDelete", SqlDbType.Int,4),
                    new SqlParameter("@UsingDate", SqlDbType.DateTime),
                    new SqlParameter("@catalogue", SqlDbType.NVarChar,100),
                    new SqlParameter("@class_name", SqlDbType.NVarChar,100),};
			parameters[0].Value = model.group_type;
			parameters[1].Value = model.img_url;
			parameters[2].Value = model.title;
			parameters[3].Value = model.introduce;
			parameters[4].Value = model.is_act;
			parameters[5].Value = model.create_date;
            parameters[6].Value = model.valid_date;
            parameters[7].Value = model.Quantity;
            parameters[8].Value = model.IsDelete;
            parameters[9].Value = model.UsingDate;
            parameters[10].Value = model.catalogue;
            parameters[11].Value = model.class_name;

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
		public bool Update(SfSoft.Model.WX_SGroup_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_SGroup_Content set ");
			strSql.Append("group_type=@group_type,");
			strSql.Append("img_url=@img_url,");
			strSql.Append("title=@title,");
			strSql.Append("introduce=@introduce,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("create_date=@create_date,");
            strSql.Append("valid_date=@valid_date,");
            strSql.Append("Quantity=@Quantity,");
            strSql.Append("IsDelete=@IsDelete,");
            strSql.Append("UsingDate=@UsingDate,");
            strSql.Append("catalogue=@catalogue,");
            strSql.Append("class_name=@class_name");
            strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@group_type", SqlDbType.Int,4),
					new SqlParameter("@img_url", SqlDbType.NVarChar,200),
					new SqlParameter("@title", SqlDbType.NVarChar,100),
					new SqlParameter("@introduce", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
                    new SqlParameter("@valid_date", SqlDbType.DateTime),
                    new SqlParameter("@Quantity", SqlDbType.Int,4),
                    new SqlParameter("@IsDelete", SqlDbType.Int,4),
                    new SqlParameter("@UsingDate", SqlDbType.DateTime),
                    new SqlParameter("@catalogue", SqlDbType.NVarChar,100),
                    new SqlParameter("@class_name", SqlDbType.NVarChar,100),
                    new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.group_type;
			parameters[1].Value = model.img_url;
			parameters[2].Value = model.title;
			parameters[3].Value = model.introduce;
			parameters[4].Value = model.is_act;
			parameters[5].Value = model.create_date;
            parameters[6].Value = model.valid_date;
            parameters[7].Value = model.Quantity;
            parameters[8].Value = model.IsDelete;
            parameters[9].Value = model.UsingDate;
            parameters[10].Value = model.catalogue;
            parameters[11].Value = model.class_name;
            parameters[12].Value = model.id;

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
			strSql.Append("delete from WX_SGroup_Content ");
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
			strSql.Append("delete from WX_SGroup_Content ");
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
		public SfSoft.Model.WX_SGroup_Content GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,group_type,img_url,title,introduce,is_act,create_date,valid_date,Quantity,IsDelete,UsingDate,catalogue,class_name from WX_SGroup_Content ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.WX_SGroup_Content model=new SfSoft.Model.WX_SGroup_Content();
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
		public SfSoft.Model.WX_SGroup_Content DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_SGroup_Content model=new SfSoft.Model.WX_SGroup_Content();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["group_type"]!=null && row["group_type"].ToString()!="")
				{
					model.group_type=int.Parse(row["group_type"].ToString());
				}
				if(row["img_url"]!=null)
				{
					model.img_url=row["img_url"].ToString();
				}
				if(row["title"]!=null)
				{
					model.title=row["title"].ToString();
				}
				if(row["introduce"]!=null)
				{
					model.introduce=row["introduce"].ToString();
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
                if (row["valid_date"] != null && row["valid_date"].ToString() != "")
                {
                    model.valid_date = DateTime.Parse(row["valid_date"].ToString());
                }
                if (row["Quantity"] != null && row["Quantity"].ToString() != "")
                {
                    model.Quantity = int.Parse(row["Quantity"].ToString());
                }
                if (row["IsDelete"] != null && row["IsDelete"].ToString() != "")
                {
                    model.IsDelete = int.Parse(row["IsDelete"].ToString());
                }
                if (row["UsingDate"] != null && row["UsingDate"].ToString() != "")
                {
                    model.UsingDate = DateTime.Parse(row["UsingDate"].ToString());
                }
                if (row["catalogue"] != null)
                {
                    model.catalogue = row["catalogue"].ToString();
                }
                if (row["class_name"] != null)
                {
                    model.class_name = row["class_name"].ToString();
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
			strSql.Append("select id,group_type,img_url,title,introduce,is_act,create_date,valid_date,Quantity,IsDelete,UsingDate,catalogue,class_name ");
			strSql.Append(" FROM WX_SGroup_Content ");
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
			strSql.Append(" id,group_type,img_url,title,introduce,is_act,create_date,valid_date,Quantity,IsDelete,UsingDate,catalogue,class_name ");
			strSql.Append(" FROM WX_SGroup_Content ");
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
			strSql.Append("select count(1) FROM WX_SGroup_Content ");
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
			strSql.Append(")AS Row, T.*  from WX_SGroup_Content T ");
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
			parameters[0].Value = "WX_SGroup_Content";
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

