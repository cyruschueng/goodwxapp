using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_gardenia_user
	/// </summary>
	public partial class wx_gardenia_user:Iwx_gardenia_user
	{
		public wx_gardenia_user()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_gardenia_user"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_gardenia_user");
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
		public int Add(SfSoft.Model.wx_gardenia_user model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_gardenia_user(");
			strSql.Append("openid,nick_name,real_name,telephone,order_sn,class_id,user_role,is_act,create_date,parent_age,profession,city,child_sex,child_age,child_grade,class_no,class_name,class_type,learn_quantity)");
			strSql.Append(" values (");
			strSql.Append("@openid,@nick_name,@real_name,@telephone,@order_sn,@class_id,@user_role,@is_act,@create_date,@parent_age,@profession,@city,@child_sex,@child_age,@child_grade,@class_no,@class_name,@class_type,@learn_quantity)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100),
					new SqlParameter("@nick_name", SqlDbType.NVarChar,50),
					new SqlParameter("@real_name", SqlDbType.NVarChar,50),
					new SqlParameter("@telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@order_sn", SqlDbType.NVarChar,100),
					new SqlParameter("@class_id", SqlDbType.Int,4),
					new SqlParameter("@user_role", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@parent_age", SqlDbType.Int,4),
					new SqlParameter("@profession", SqlDbType.NVarChar,100),
					new SqlParameter("@city", SqlDbType.NVarChar,100),
					new SqlParameter("@child_sex", SqlDbType.NVarChar,10),
					new SqlParameter("@child_age", SqlDbType.Int,4),
					new SqlParameter("@child_grade", SqlDbType.NVarChar,100),
					new SqlParameter("@class_no", SqlDbType.NVarChar,100),
					new SqlParameter("@class_name", SqlDbType.NVarChar,100),
					new SqlParameter("@class_type", SqlDbType.NVarChar,50),
					new SqlParameter("@learn_quantity", SqlDbType.Int,4)};
			parameters[0].Value = model.openid;
			parameters[1].Value = model.nick_name;
			parameters[2].Value = model.real_name;
			parameters[3].Value = model.telephone;
			parameters[4].Value = model.order_sn;
			parameters[5].Value = model.class_id;
			parameters[6].Value = model.user_role;
			parameters[7].Value = model.is_act;
			parameters[8].Value = model.create_date;
			parameters[9].Value = model.parent_age;
			parameters[10].Value = model.profession;
			parameters[11].Value = model.city;
			parameters[12].Value = model.child_sex;
			parameters[13].Value = model.child_age;
			parameters[14].Value = model.child_grade;
			parameters[15].Value = model.class_no;
			parameters[16].Value = model.class_name;
			parameters[17].Value = model.class_type;
			parameters[18].Value = model.learn_quantity;

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
		public bool Update(SfSoft.Model.wx_gardenia_user model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_gardenia_user set ");
			strSql.Append("openid=@openid,");
			strSql.Append("nick_name=@nick_name,");
			strSql.Append("real_name=@real_name,");
			strSql.Append("telephone=@telephone,");
			strSql.Append("order_sn=@order_sn,");
			strSql.Append("class_id=@class_id,");
			strSql.Append("user_role=@user_role,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("parent_age=@parent_age,");
			strSql.Append("profession=@profession,");
			strSql.Append("city=@city,");
			strSql.Append("child_sex=@child_sex,");
			strSql.Append("child_age=@child_age,");
			strSql.Append("child_grade=@child_grade,");
			strSql.Append("class_no=@class_no,");
			strSql.Append("class_name=@class_name,");
			strSql.Append("class_type=@class_type,");
			strSql.Append("learn_quantity=@learn_quantity");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100),
					new SqlParameter("@nick_name", SqlDbType.NVarChar,50),
					new SqlParameter("@real_name", SqlDbType.NVarChar,50),
					new SqlParameter("@telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@order_sn", SqlDbType.NVarChar,100),
					new SqlParameter("@class_id", SqlDbType.Int,4),
					new SqlParameter("@user_role", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@parent_age", SqlDbType.Int,4),
					new SqlParameter("@profession", SqlDbType.NVarChar,100),
					new SqlParameter("@city", SqlDbType.NVarChar,100),
					new SqlParameter("@child_sex", SqlDbType.NVarChar,10),
					new SqlParameter("@child_age", SqlDbType.Int,4),
					new SqlParameter("@child_grade", SqlDbType.NVarChar,100),
					new SqlParameter("@class_no", SqlDbType.NVarChar,100),
					new SqlParameter("@class_name", SqlDbType.NVarChar,100),
					new SqlParameter("@class_type", SqlDbType.NVarChar,50),
					new SqlParameter("@learn_quantity", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.openid;
			parameters[1].Value = model.nick_name;
			parameters[2].Value = model.real_name;
			parameters[3].Value = model.telephone;
			parameters[4].Value = model.order_sn;
			parameters[5].Value = model.class_id;
			parameters[6].Value = model.user_role;
			parameters[7].Value = model.is_act;
			parameters[8].Value = model.create_date;
			parameters[9].Value = model.parent_age;
			parameters[10].Value = model.profession;
			parameters[11].Value = model.city;
			parameters[12].Value = model.child_sex;
			parameters[13].Value = model.child_age;
			parameters[14].Value = model.child_grade;
			parameters[15].Value = model.class_no;
			parameters[16].Value = model.class_name;
			parameters[17].Value = model.class_type;
			parameters[18].Value = model.learn_quantity;
			parameters[19].Value = model.id;

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
			strSql.Append("delete from wx_gardenia_user ");
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
			strSql.Append("delete from wx_gardenia_user ");
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
		public SfSoft.Model.wx_gardenia_user GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,openid,nick_name,real_name,telephone,order_sn,class_id,user_role,is_act,create_date,parent_age,profession,city,child_sex,child_age,child_grade,class_no,class_name,class_type,learn_quantity from wx_gardenia_user ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_gardenia_user model=new SfSoft.Model.wx_gardenia_user();
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
		public SfSoft.Model.wx_gardenia_user DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_gardenia_user model=new SfSoft.Model.wx_gardenia_user();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["openid"]!=null)
				{
					model.openid=row["openid"].ToString();
				}
				if(row["nick_name"]!=null)
				{
					model.nick_name=row["nick_name"].ToString();
				}
				if(row["real_name"]!=null)
				{
					model.real_name=row["real_name"].ToString();
				}
				if(row["telephone"]!=null)
				{
					model.telephone=row["telephone"].ToString();
				}
				if(row["order_sn"]!=null)
				{
					model.order_sn=row["order_sn"].ToString();
				}
				if(row["class_id"]!=null && row["class_id"].ToString()!="")
				{
					model.class_id=int.Parse(row["class_id"].ToString());
				}
				if(row["user_role"]!=null && row["user_role"].ToString()!="")
				{
					model.user_role=int.Parse(row["user_role"].ToString());
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["parent_age"]!=null && row["parent_age"].ToString()!="")
				{
					model.parent_age=int.Parse(row["parent_age"].ToString());
				}
				if(row["profession"]!=null)
				{
					model.profession=row["profession"].ToString();
				}
				if(row["city"]!=null)
				{
					model.city=row["city"].ToString();
				}
				if(row["child_sex"]!=null)
				{
					model.child_sex=row["child_sex"].ToString();
				}
				if(row["child_age"]!=null && row["child_age"].ToString()!="")
				{
					model.child_age=int.Parse(row["child_age"].ToString());
				}
				if(row["child_grade"]!=null)
				{
					model.child_grade=row["child_grade"].ToString();
				}
				if(row["class_no"]!=null)
				{
					model.class_no=row["class_no"].ToString();
				}
				if(row["class_name"]!=null)
				{
					model.class_name=row["class_name"].ToString();
				}
				if(row["class_type"]!=null)
				{
					model.class_type=row["class_type"].ToString();
				}
				if(row["learn_quantity"]!=null && row["learn_quantity"].ToString()!="")
				{
					model.learn_quantity=int.Parse(row["learn_quantity"].ToString());
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
			strSql.Append("select id,openid,nick_name,real_name,telephone,order_sn,class_id,user_role,is_act,create_date,parent_age,profession,city,child_sex,child_age,child_grade,class_no,class_name,class_type,learn_quantity ");
			strSql.Append(" FROM wx_gardenia_user ");
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
			strSql.Append(" id,openid,nick_name,real_name,telephone,order_sn,class_id,user_role,is_act,create_date,parent_age,profession,city,child_sex,child_age,child_grade,class_no,class_name,class_type,learn_quantity ");
			strSql.Append(" FROM wx_gardenia_user ");
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
			strSql.Append("select count(1) FROM wx_gardenia_user ");
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
			strSql.Append(")AS Row, T.*  from wx_gardenia_user T ");
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
			parameters[0].Value = "wx_gardenia_user";
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

