using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_SGroup_Tpl
	/// </summary>
	public partial class WX_SGroup_Tpl:IWX_SGroup_Tpl
	{
		public WX_SGroup_Tpl()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "WX_SGroup_Tpl"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_SGroup_Tpl");
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
		public int Add(SfSoft.Model.WX_SGroup_Tpl model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_SGroup_Tpl(");
			strSql.Append("title,src,tag,tagx,tagy,qrcodex,qrcodey,remark,is_act,sn,qrcodew,qrcodeh,catalogue)");
			strSql.Append(" values (");
			strSql.Append("@title,@src,@tag,@tagx,@tagy,@qrcodex,@qrcodey,@remark,@is_act,@sn,@qrcodew,@qrcodeh,@catalogue)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@title", SqlDbType.NVarChar,100),
					new SqlParameter("@src", SqlDbType.NVarChar,500),
					new SqlParameter("@tag", SqlDbType.NVarChar,300),
					new SqlParameter("@tagx", SqlDbType.Float,8),
					new SqlParameter("@tagy", SqlDbType.Float,8),
					new SqlParameter("@qrcodex", SqlDbType.Float,8),
					new SqlParameter("@qrcodey", SqlDbType.Float,8),
					new SqlParameter("@remark", SqlDbType.NVarChar,500),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@sn", SqlDbType.Int,4),
					new SqlParameter("@qrcodew", SqlDbType.Float,8),
					new SqlParameter("@qrcodeh", SqlDbType.Float,8),
					new SqlParameter("@catalogue", SqlDbType.Int,4)};
			parameters[0].Value = model.title;
			parameters[1].Value = model.src;
			parameters[2].Value = model.tag;
			parameters[3].Value = model.tagx;
			parameters[4].Value = model.tagy;
			parameters[5].Value = model.qrcodex;
			parameters[6].Value = model.qrcodey;
			parameters[7].Value = model.remark;
			parameters[8].Value = model.is_act;
			parameters[9].Value = model.sn;
			parameters[10].Value = model.qrcodew;
			parameters[11].Value = model.qrcodeh;
			parameters[12].Value = model.catalogue;

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
		public bool Update(SfSoft.Model.WX_SGroup_Tpl model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_SGroup_Tpl set ");
			strSql.Append("title=@title,");
			strSql.Append("src=@src,");
			strSql.Append("tag=@tag,");
			strSql.Append("tagx=@tagx,");
			strSql.Append("tagy=@tagy,");
			strSql.Append("qrcodex=@qrcodex,");
			strSql.Append("qrcodey=@qrcodey,");
			strSql.Append("remark=@remark,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("sn=@sn,");
			strSql.Append("qrcodew=@qrcodew,");
			strSql.Append("qrcodeh=@qrcodeh,");
			strSql.Append("catalogue=@catalogue");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@title", SqlDbType.NVarChar,100),
					new SqlParameter("@src", SqlDbType.NVarChar,500),
					new SqlParameter("@tag", SqlDbType.NVarChar,300),
					new SqlParameter("@tagx", SqlDbType.Float,8),
					new SqlParameter("@tagy", SqlDbType.Float,8),
					new SqlParameter("@qrcodex", SqlDbType.Float,8),
					new SqlParameter("@qrcodey", SqlDbType.Float,8),
					new SqlParameter("@remark", SqlDbType.NVarChar,500),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@sn", SqlDbType.Int,4),
					new SqlParameter("@qrcodew", SqlDbType.Float,8),
					new SqlParameter("@qrcodeh", SqlDbType.Float,8),
					new SqlParameter("@catalogue", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.title;
			parameters[1].Value = model.src;
			parameters[2].Value = model.tag;
			parameters[3].Value = model.tagx;
			parameters[4].Value = model.tagy;
			parameters[5].Value = model.qrcodex;
			parameters[6].Value = model.qrcodey;
			parameters[7].Value = model.remark;
			parameters[8].Value = model.is_act;
			parameters[9].Value = model.sn;
			parameters[10].Value = model.qrcodew;
			parameters[11].Value = model.qrcodeh;
			parameters[12].Value = model.catalogue;
			parameters[13].Value = model.id;

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
			strSql.Append("delete from WX_SGroup_Tpl ");
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
			strSql.Append("delete from WX_SGroup_Tpl ");
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
		public SfSoft.Model.WX_SGroup_Tpl GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,title,src,tag,tagx,tagy,qrcodex,qrcodey,remark,is_act,sn,qrcodew,qrcodeh,catalogue from WX_SGroup_Tpl ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.WX_SGroup_Tpl model=new SfSoft.Model.WX_SGroup_Tpl();
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
		public SfSoft.Model.WX_SGroup_Tpl DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_SGroup_Tpl model=new SfSoft.Model.WX_SGroup_Tpl();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["title"]!=null)
				{
					model.title=row["title"].ToString();
				}
				if(row["src"]!=null)
				{
					model.src=row["src"].ToString();
				}
				if(row["tag"]!=null)
				{
					model.tag=row["tag"].ToString();
				}
				if(row["tagx"]!=null && row["tagx"].ToString()!="")
				{
					model.tagx=decimal.Parse(row["tagx"].ToString());
				}
				if(row["tagy"]!=null && row["tagy"].ToString()!="")
				{
					model.tagy=decimal.Parse(row["tagy"].ToString());
				}
				if(row["qrcodex"]!=null && row["qrcodex"].ToString()!="")
				{
					model.qrcodex=decimal.Parse(row["qrcodex"].ToString());
				}
				if(row["qrcodey"]!=null && row["qrcodey"].ToString()!="")
				{
					model.qrcodey=decimal.Parse(row["qrcodey"].ToString());
				}
				if(row["remark"]!=null)
				{
					model.remark=row["remark"].ToString();
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["sn"]!=null && row["sn"].ToString()!="")
				{
					model.sn=int.Parse(row["sn"].ToString());
				}
				if(row["qrcodew"]!=null && row["qrcodew"].ToString()!="")
				{
					model.qrcodew=decimal.Parse(row["qrcodew"].ToString());
				}
				if(row["qrcodeh"]!=null && row["qrcodeh"].ToString()!="")
				{
					model.qrcodeh=decimal.Parse(row["qrcodeh"].ToString());
				}
				if(row["catalogue"]!=null && row["catalogue"].ToString()!="")
				{
					model.catalogue=int.Parse(row["catalogue"].ToString());
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
			strSql.Append("select id,title,src,tag,tagx,tagy,qrcodex,qrcodey,remark,is_act,sn,qrcodew,qrcodeh,catalogue ");
			strSql.Append(" FROM WX_SGroup_Tpl ");
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
			strSql.Append(" id,title,src,tag,tagx,tagy,qrcodex,qrcodey,remark,is_act,sn,qrcodew,qrcodeh,catalogue ");
			strSql.Append(" FROM WX_SGroup_Tpl ");
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
			strSql.Append("select count(1) FROM WX_SGroup_Tpl ");
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
			strSql.Append(")AS Row, T.*  from WX_SGroup_Tpl T ");
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
			parameters[0].Value = "WX_SGroup_Tpl";
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

