using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Doublenovember_Invite
	/// </summary>
	public partial class WX_Doublenovember_Invite:IWX_Doublenovember_Invite
	{
		public WX_Doublenovember_Invite()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Doublenovember_Invite"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Doublenovember_Invite");
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
		public int Add(SfSoft.Model.WX_Doublenovember_Invite model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Doublenovember_Invite(");
			strSql.Append("FromOpenID,ToOpenID,Content,SendDate,ReplyDate,Status,IsRead)");
			strSql.Append(" values (");
			strSql.Append("@FromOpenID,@ToOpenID,@Content,@SendDate,@ReplyDate,@Status,@IsRead)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@FromOpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@ToOpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,100),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@ReplyDate", SqlDbType.DateTime),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@IsRead", SqlDbType.Int,4)};
			parameters[0].Value = model.FromOpenID;
			parameters[1].Value = model.ToOpenID;
			parameters[2].Value = model.Content;
			parameters[3].Value = model.SendDate;
			parameters[4].Value = model.ReplyDate;
			parameters[5].Value = model.Status;
			parameters[6].Value = model.IsRead;

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
		public bool Update(SfSoft.Model.WX_Doublenovember_Invite model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Doublenovember_Invite set ");
			strSql.Append("FromOpenID=@FromOpenID,");
			strSql.Append("ToOpenID=@ToOpenID,");
			strSql.Append("Content=@Content,");
			strSql.Append("SendDate=@SendDate,");
			strSql.Append("ReplyDate=@ReplyDate,");
			strSql.Append("Status=@Status,");
			strSql.Append("IsRead=@IsRead");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@FromOpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@ToOpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,100),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@ReplyDate", SqlDbType.DateTime),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@IsRead", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.FromOpenID;
			parameters[1].Value = model.ToOpenID;
			parameters[2].Value = model.Content;
			parameters[3].Value = model.SendDate;
			parameters[4].Value = model.ReplyDate;
			parameters[5].Value = model.Status;
			parameters[6].Value = model.IsRead;
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
			strSql.Append("delete from WX_Doublenovember_Invite ");
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
			strSql.Append("delete from WX_Doublenovember_Invite ");
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
		public SfSoft.Model.WX_Doublenovember_Invite GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,FromOpenID,ToOpenID,Content,SendDate,ReplyDate,Status,IsRead from WX_Doublenovember_Invite ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Doublenovember_Invite model=new SfSoft.Model.WX_Doublenovember_Invite();
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
		public SfSoft.Model.WX_Doublenovember_Invite DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Doublenovember_Invite model=new SfSoft.Model.WX_Doublenovember_Invite();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["FromOpenID"]!=null)
				{
					model.FromOpenID=row["FromOpenID"].ToString();
				}
				if(row["ToOpenID"]!=null)
				{
					model.ToOpenID=row["ToOpenID"].ToString();
				}
				if(row["Content"]!=null)
				{
					model.Content=row["Content"].ToString();
				}
				if(row["SendDate"]!=null && row["SendDate"].ToString()!="")
				{
					model.SendDate=DateTime.Parse(row["SendDate"].ToString());
				}
				if(row["ReplyDate"]!=null && row["ReplyDate"].ToString()!="")
				{
					model.ReplyDate=DateTime.Parse(row["ReplyDate"].ToString());
				}
				if(row["Status"]!=null && row["Status"].ToString()!="")
				{
					model.Status=int.Parse(row["Status"].ToString());
				}
				if(row["IsRead"]!=null && row["IsRead"].ToString()!="")
				{
					model.IsRead=int.Parse(row["IsRead"].ToString());
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
			strSql.Append("select ID,FromOpenID,ToOpenID,Content,SendDate,ReplyDate,Status,IsRead ");
			strSql.Append(" FROM WX_Doublenovember_Invite ");
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
			strSql.Append(" ID,FromOpenID,ToOpenID,Content,SendDate,ReplyDate,Status,IsRead ");
			strSql.Append(" FROM WX_Doublenovember_Invite ");
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
			strSql.Append("select count(1) FROM WX_Doublenovember_Invite ");
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
			strSql.Append(")AS Row, T.*  from WX_Doublenovember_Invite T ");
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
			parameters[0].Value = "WX_Doublenovember_Invite";
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


        public Model.WX_Doublenovember_Invite GetModel(string fromOpenid, string toOpenid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,FromOpenID,ToOpenID,Content,SendDate,ReplyDate,Status,IsRead from WX_Doublenovember_Invite ");
            strSql.Append(" where FromOpenID=@FromOpenID");
            strSql.Append(" And ToOpenID=@ToOpenID");
            SqlParameter[] parameters = {
					new SqlParameter("@FromOpenID", SqlDbType.NVarChar,100),
                    new SqlParameter("@ToOpenID", SqlDbType.NVarChar,100)
			};
            parameters[0].Value = fromOpenid;
            parameters[1].Value = toOpenid;

            SfSoft.Model.WX_Doublenovember_Invite model = new SfSoft.Model.WX_Doublenovember_Invite();
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

