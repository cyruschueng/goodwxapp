using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wxrrd_guider
	/// </summary>
	public partial class wxrrd_guider:Iwxrrd_guider
	{
		public wxrrd_guider()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wxrrd_guider"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wxrrd_guider");
			strSql.Append(" where id=@id ");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)			};
			parameters[0].Value = id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.wxrrd_guider model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wxrrd_guider(");
			strSql.Append("id,member_id,shop_name,nickname,team_size,level_id,level_expire_at,status,collect_fields,created_at,level_name,guider_level_type,total_comission,expect_comission,mobile,parent_id,order_ump,status_name,referral,is_partner,balance,wx_public_id,wx_name,wx_avatar,wx_address)");
			strSql.Append(" values (");
			strSql.Append("@id,@member_id,@shop_name,@nickname,@team_size,@level_id,@level_expire_at,@status,@collect_fields,@created_at,@level_name,@guider_level_type,@total_comission,@expect_comission,@mobile,@parent_id,@order_ump,@status_name,@referral,@is_partner,@balance,@wx_public_id,@wx_name,@wx_avatar,@wx_address)");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4),
					new SqlParameter("@member_id", SqlDbType.NVarChar,100),
					new SqlParameter("@shop_name", SqlDbType.NVarChar,100),
					new SqlParameter("@nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@team_size", SqlDbType.Int,4),
					new SqlParameter("@level_id", SqlDbType.Int,4),
					new SqlParameter("@level_expire_at", SqlDbType.DateTime),
					new SqlParameter("@status", SqlDbType.Int,4),
					new SqlParameter("@collect_fields", SqlDbType.NVarChar,100),
					new SqlParameter("@created_at", SqlDbType.DateTime),
					new SqlParameter("@level_name", SqlDbType.NVarChar,100),
					new SqlParameter("@guider_level_type", SqlDbType.NVarChar,100),
					new SqlParameter("@total_comission", SqlDbType.Decimal,9),
					new SqlParameter("@expect_comission", SqlDbType.Decimal,9),
					new SqlParameter("@mobile", SqlDbType.NVarChar,20),
					new SqlParameter("@parent_id", SqlDbType.Int,4),
					new SqlParameter("@order_ump", SqlDbType.Decimal,9),
					new SqlParameter("@status_name", SqlDbType.NVarChar,100),
					new SqlParameter("@referral", SqlDbType.NVarChar,100),
					new SqlParameter("@is_partner", SqlDbType.Int,4),
					new SqlParameter("@balance", SqlDbType.Decimal,9),
					new SqlParameter("@wx_public_id", SqlDbType.NVarChar,100),
					new SqlParameter("@wx_name", SqlDbType.NVarChar,200),
					new SqlParameter("@wx_avatar", SqlDbType.NVarChar,500),
					new SqlParameter("@wx_address", SqlDbType.NVarChar,1500)};
			parameters[0].Value = model.id;
			parameters[1].Value = model.member_id;
			parameters[2].Value = model.shop_name;
			parameters[3].Value = model.nickname;
			parameters[4].Value = model.team_size;
			parameters[5].Value = model.level_id;
			parameters[6].Value = model.level_expire_at;
			parameters[7].Value = model.status;
			parameters[8].Value = model.collect_fields;
			parameters[9].Value = model.created_at;
			parameters[10].Value = model.level_name;
			parameters[11].Value = model.guider_level_type;
			parameters[12].Value = model.total_comission;
			parameters[13].Value = model.expect_comission;
			parameters[14].Value = model.mobile;
			parameters[15].Value = model.parent_id;
			parameters[16].Value = model.order_ump;
			parameters[17].Value = model.status_name;
			parameters[18].Value = model.referral;
			parameters[19].Value = model.is_partner;
			parameters[20].Value = model.balance;
			parameters[21].Value = model.wx_public_id;
			parameters[22].Value = model.wx_name;
			parameters[23].Value = model.wx_avatar;
			parameters[24].Value = model.wx_address;

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
		public bool Update(SfSoft.Model.wxrrd_guider model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wxrrd_guider set ");
			strSql.Append("member_id=@member_id,");
			strSql.Append("shop_name=@shop_name,");
			strSql.Append("nickname=@nickname,");
			strSql.Append("team_size=@team_size,");
			strSql.Append("level_id=@level_id,");
			strSql.Append("level_expire_at=@level_expire_at,");
			strSql.Append("status=@status,");
			strSql.Append("collect_fields=@collect_fields,");
			strSql.Append("created_at=@created_at,");
			strSql.Append("level_name=@level_name,");
			strSql.Append("guider_level_type=@guider_level_type,");
			strSql.Append("total_comission=@total_comission,");
			strSql.Append("expect_comission=@expect_comission,");
			strSql.Append("mobile=@mobile,");
			strSql.Append("parent_id=@parent_id,");
			strSql.Append("order_ump=@order_ump,");
			strSql.Append("status_name=@status_name,");
			strSql.Append("referral=@referral,");
			strSql.Append("is_partner=@is_partner,");
			strSql.Append("balance=@balance,");
			strSql.Append("wx_public_id=@wx_public_id,");
			strSql.Append("wx_name=@wx_name,");
			strSql.Append("wx_avatar=@wx_avatar,");
			strSql.Append("wx_address=@wx_address");
			strSql.Append(" where id=@id ");
			SqlParameter[] parameters = {
					new SqlParameter("@member_id", SqlDbType.NVarChar,100),
					new SqlParameter("@shop_name", SqlDbType.NVarChar,100),
					new SqlParameter("@nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@team_size", SqlDbType.Int,4),
					new SqlParameter("@level_id", SqlDbType.Int,4),
					new SqlParameter("@level_expire_at", SqlDbType.DateTime),
					new SqlParameter("@status", SqlDbType.Int,4),
					new SqlParameter("@collect_fields", SqlDbType.NVarChar,100),
					new SqlParameter("@created_at", SqlDbType.DateTime),
					new SqlParameter("@level_name", SqlDbType.NVarChar,100),
					new SqlParameter("@guider_level_type", SqlDbType.NVarChar,100),
					new SqlParameter("@total_comission", SqlDbType.Decimal,9),
					new SqlParameter("@expect_comission", SqlDbType.Decimal,9),
					new SqlParameter("@mobile", SqlDbType.NVarChar,20),
					new SqlParameter("@parent_id", SqlDbType.Int,4),
					new SqlParameter("@order_ump", SqlDbType.Decimal,9),
					new SqlParameter("@status_name", SqlDbType.NVarChar,100),
					new SqlParameter("@referral", SqlDbType.NVarChar,100),
					new SqlParameter("@is_partner", SqlDbType.Int,4),
					new SqlParameter("@balance", SqlDbType.Decimal,9),
					new SqlParameter("@wx_public_id", SqlDbType.NVarChar,100),
					new SqlParameter("@wx_name", SqlDbType.NVarChar,200),
					new SqlParameter("@wx_avatar", SqlDbType.NVarChar,500),
					new SqlParameter("@wx_address", SqlDbType.NVarChar,1500),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.member_id;
			parameters[1].Value = model.shop_name;
			parameters[2].Value = model.nickname;
			parameters[3].Value = model.team_size;
			parameters[4].Value = model.level_id;
			parameters[5].Value = model.level_expire_at;
			parameters[6].Value = model.status;
			parameters[7].Value = model.collect_fields;
			parameters[8].Value = model.created_at;
			parameters[9].Value = model.level_name;
			parameters[10].Value = model.guider_level_type;
			parameters[11].Value = model.total_comission;
			parameters[12].Value = model.expect_comission;
			parameters[13].Value = model.mobile;
			parameters[14].Value = model.parent_id;
			parameters[15].Value = model.order_ump;
			parameters[16].Value = model.status_name;
			parameters[17].Value = model.referral;
			parameters[18].Value = model.is_partner;
			parameters[19].Value = model.balance;
			parameters[20].Value = model.wx_public_id;
			parameters[21].Value = model.wx_name;
			parameters[22].Value = model.wx_avatar;
			parameters[23].Value = model.wx_address;
			parameters[24].Value = model.id;

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
			strSql.Append("delete from wxrrd_guider ");
			strSql.Append(" where id=@id ");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)			};
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
			strSql.Append("delete from wxrrd_guider ");
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
		public SfSoft.Model.wxrrd_guider GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,member_id,shop_name,nickname,team_size,level_id,level_expire_at,status,collect_fields,created_at,level_name,guider_level_type,total_comission,expect_comission,mobile,parent_id,order_ump,status_name,referral,is_partner,balance,wx_public_id,wx_name,wx_avatar,wx_address from wxrrd_guider ");
			strSql.Append(" where id=@id ");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)			};
			parameters[0].Value = id;

			SfSoft.Model.wxrrd_guider model=new SfSoft.Model.wxrrd_guider();
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
		public SfSoft.Model.wxrrd_guider DataRowToModel(DataRow row)
		{
			SfSoft.Model.wxrrd_guider model=new SfSoft.Model.wxrrd_guider();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["member_id"]!=null)
				{
					model.member_id=row["member_id"].ToString();
				}
				if(row["shop_name"]!=null)
				{
					model.shop_name=row["shop_name"].ToString();
				}
				if(row["nickname"]!=null)
				{
					model.nickname=row["nickname"].ToString();
				}
				if(row["team_size"]!=null && row["team_size"].ToString()!="")
				{
					model.team_size=int.Parse(row["team_size"].ToString());
				}
				if(row["level_id"]!=null && row["level_id"].ToString()!="")
				{
					model.level_id=int.Parse(row["level_id"].ToString());
				}
				if(row["level_expire_at"]!=null && row["level_expire_at"].ToString()!="")
				{
					model.level_expire_at=DateTime.Parse(row["level_expire_at"].ToString());
				}
				if(row["status"]!=null && row["status"].ToString()!="")
				{
					model.status=int.Parse(row["status"].ToString());
				}
				if(row["collect_fields"]!=null)
				{
					model.collect_fields=row["collect_fields"].ToString();
				}
				if(row["created_at"]!=null && row["created_at"].ToString()!="")
				{
					model.created_at=DateTime.Parse(row["created_at"].ToString());
				}
				if(row["level_name"]!=null)
				{
					model.level_name=row["level_name"].ToString();
				}
				if(row["guider_level_type"]!=null)
				{
					model.guider_level_type=row["guider_level_type"].ToString();
				}
				if(row["total_comission"]!=null && row["total_comission"].ToString()!="")
				{
					model.total_comission=decimal.Parse(row["total_comission"].ToString());
				}
				if(row["expect_comission"]!=null && row["expect_comission"].ToString()!="")
				{
					model.expect_comission=decimal.Parse(row["expect_comission"].ToString());
				}
				if(row["mobile"]!=null)
				{
					model.mobile=row["mobile"].ToString();
				}
				if(row["parent_id"]!=null && row["parent_id"].ToString()!="")
				{
					model.parent_id=int.Parse(row["parent_id"].ToString());
				}
				if(row["order_ump"]!=null && row["order_ump"].ToString()!="")
				{
					model.order_ump=decimal.Parse(row["order_ump"].ToString());
				}
				if(row["status_name"]!=null)
				{
					model.status_name=row["status_name"].ToString();
				}
				if(row["referral"]!=null)
				{
					model.referral=row["referral"].ToString();
				}
				if(row["is_partner"]!=null && row["is_partner"].ToString()!="")
				{
					model.is_partner=int.Parse(row["is_partner"].ToString());
				}
				if(row["balance"]!=null && row["balance"].ToString()!="")
				{
					model.balance=decimal.Parse(row["balance"].ToString());
				}
				if(row["wx_public_id"]!=null)
				{
					model.wx_public_id=row["wx_public_id"].ToString();
				}
				if(row["wx_name"]!=null)
				{
					model.wx_name=row["wx_name"].ToString();
				}
				if(row["wx_avatar"]!=null)
				{
					model.wx_avatar=row["wx_avatar"].ToString();
				}
				if(row["wx_address"]!=null)
				{
					model.wx_address=row["wx_address"].ToString();
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
			strSql.Append("select id,member_id,shop_name,nickname,team_size,level_id,level_expire_at,status,collect_fields,created_at,level_name,guider_level_type,total_comission,expect_comission,mobile,parent_id,order_ump,status_name,referral,is_partner,balance,wx_public_id,wx_name,wx_avatar,wx_address ");
			strSql.Append(" FROM wxrrd_guider ");
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
			strSql.Append(" id,member_id,shop_name,nickname,team_size,level_id,level_expire_at,status,collect_fields,created_at,level_name,guider_level_type,total_comission,expect_comission,mobile,parent_id,order_ump,status_name,referral,is_partner,balance,wx_public_id,wx_name,wx_avatar,wx_address ");
			strSql.Append(" FROM wxrrd_guider ");
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
			strSql.Append("select count(1) FROM wxrrd_guider ");
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
			strSql.Append(")AS Row, T.*  from wxrrd_guider T ");
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
			parameters[0].Value = "wxrrd_guider";
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

