using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_SubscribeActivity
	/// </summary>
	public partial class WX_SubscribeActivity:IWX_SubscribeActivity
	{
		public WX_SubscribeActivity()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_SubscribeActivity"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_SubscribeActivity");
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
		public int Add(SfSoft.Model.WX_SubscribeActivity model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_SubscribeActivity(");
			strSql.Append("ShareID,FriendID,HeadimgUrl,NickName,Subscribe_Time,IsSubscribe)");
			strSql.Append(" values (");
			strSql.Append("@ShareID,@FriendID,@HeadimgUrl,@NickName,@Subscribe_Time,@IsSubscribe)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.NVarChar,50),
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadimgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Subscribe_Time", SqlDbType.DateTime),
					new SqlParameter("@IsSubscribe", SqlDbType.Int,4)};
			parameters[0].Value = model.ShareID;
			parameters[1].Value = model.FriendID;
			parameters[2].Value = model.HeadimgUrl;
			parameters[3].Value = model.NickName;
			parameters[4].Value = model.Subscribe_Time;
			parameters[5].Value = model.IsSubscribe;

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
		public bool Update(SfSoft.Model.WX_SubscribeActivity model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_SubscribeActivity set ");
			strSql.Append("ShareID=@ShareID,");
			strSql.Append("FriendID=@FriendID,");
			strSql.Append("HeadimgUrl=@HeadimgUrl,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("Subscribe_Time=@Subscribe_Time,");
			strSql.Append("IsSubscribe=@IsSubscribe");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ShareID", SqlDbType.NVarChar,50),
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadimgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Subscribe_Time", SqlDbType.DateTime),
					new SqlParameter("@IsSubscribe", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.ShareID;
			parameters[1].Value = model.FriendID;
			parameters[2].Value = model.HeadimgUrl;
			parameters[3].Value = model.NickName;
			parameters[4].Value = model.Subscribe_Time;
			parameters[5].Value = model.IsSubscribe;
			parameters[6].Value = model.ID;

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
			strSql.Append("delete from WX_SubscribeActivity ");
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
			strSql.Append("delete from WX_SubscribeActivity ");
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
		public SfSoft.Model.WX_SubscribeActivity GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,ShareID,FriendID,HeadimgUrl,NickName,Subscribe_Time,IsSubscribe from WX_SubscribeActivity ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_SubscribeActivity model=new SfSoft.Model.WX_SubscribeActivity();
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
		public SfSoft.Model.WX_SubscribeActivity DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_SubscribeActivity model=new SfSoft.Model.WX_SubscribeActivity();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["ShareID"]!=null)
				{
					model.ShareID=row["ShareID"].ToString();
				}
				if(row["FriendID"]!=null)
				{
					model.FriendID=row["FriendID"].ToString();
				}
				if(row["HeadimgUrl"]!=null)
				{
					model.HeadimgUrl=row["HeadimgUrl"].ToString();
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["Subscribe_Time"]!=null && row["Subscribe_Time"].ToString()!="")
				{
					model.Subscribe_Time=DateTime.Parse(row["Subscribe_Time"].ToString());
				}
				if(row["IsSubscribe"]!=null && row["IsSubscribe"].ToString()!="")
				{
					model.IsSubscribe=int.Parse(row["IsSubscribe"].ToString());
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
			strSql.Append("select ID,ShareID,FriendID,HeadimgUrl,NickName,Subscribe_Time,IsSubscribe ");
			strSql.Append(" FROM WX_SubscribeActivity ");
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
			strSql.Append(" ID,ShareID,FriendID,HeadimgUrl,NickName,Subscribe_Time,IsSubscribe ");
			strSql.Append(" FROM WX_SubscribeActivity ");
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
			strSql.Append("select count(1) FROM WX_SubscribeActivity ");
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
			strSql.Append(")AS Row, T.*  from WX_SubscribeActivity T ");
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
			parameters[0].Value = "WX_SubscribeActivity";
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

        /// <summary>
        /// 获取实体
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public Model.WX_SubscribeActivity GetModel(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,ShareID,FriendID,HeadimgUrl,NickName,Subscribe_Time,IsSubscribe from WX_SubscribeActivity ");
            strSql.Append(" where FriendID=@FriendID");
            SqlParameter[] parameters = {
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_SubscribeActivity model = new SfSoft.Model.WX_SubscribeActivity();
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
        /// <summary>
        /// 是否存在FriendID
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public bool Exists(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_SubscribeActivity");
            strSql.Append(" where FriendID=@FriendID");
            SqlParameter[] parameters = {
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 按分享者分组排名统计邀约人数
        /// </summary>
        /// <returns></returns>
        public DataSet GetOrder(string where)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select dense_rank() over(order by number desc )as Sn,Week,Number,b.* from (");
            strSql.Append("select shareid,week,count(1) as Number from ( ");
            strSql.Append("select *,dbo.ChinaWeek(Subscribe_Time)as Week from WX_SubscribeActivity where isnull(issubscribe,0)=1 and DatePart(yy,Subscribe_Time)=DatePart(yy,getdate()) ");
            strSql.Append(")a group by week,shareid ");
            strSql.Append(")a left join dbo.WX_HomeCard b on a.shareid=b.userid ");
            strSql.Append(" where "+where);
            return DbHelperSQL.Query(strSql.ToString());
        }

        public Model.WX_Ranking GetMyOrder(string name)
        {
            StringBuilder strSql = new StringBuilder();
            Model.WX_Ranking model = new Model.WX_Ranking();
            strSql.Append("select top 1 dense_rank() over(order by number desc ) as sn,* from (");
            strSql.Append("select shareid,count(*) as number from WX_SubscribeActivity  where isnull(isSubscribe,0)=1 group by shareid)a");
            strSql.Append(" where shareid='" + name + "'");
            DataSet ds = DbHelperSQL.Query(strSql.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                
                model.SN = int.Parse(ds.Tables[0].Rows[0]["sn"].ToString());
                model.OrderName = ds.Tables[0].Rows[0]["shareid"].ToString();
                model.Number = int.Parse(ds.Tables[0].Rows[0]["number"].ToString());
            }
            return model;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="shareid"></param>
        /// <returns></returns>
        public DataSet GetFriendsList(string shareid)
        {
            return GetList("ShareID='" + shareid + "' and Isnull(IsSubscribe,0)=1");
        }

        /// <summary>
        /// 是否建立活动关系
        /// </summary>
        /// <param name="openid">本订阅号openid</param>
        /// <returns></returns>
        public bool IsRelationByOpenid(string openid)
        {
            WX_HomeCard bll = new WX_HomeCard();
            Model.WX_HomeCard model = bll.GetModel(openid);

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_SubscribeActivity");
            strSql.Append(" where FriendID=@FriendID");
            strSql.Append(" and IsSubscribe=@IsSubscribe");
            SqlParameter[] parameters = {
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50),
                    new SqlParameter("@IsSubscribe", SqlDbType.Int,4)
			};
            parameters[0].Value = model.OpenId;
            parameters[1].Value = 0;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 是否建立活动关系
        /// </summary>
        /// <param name="openid">代理的服务号openid</param>
        /// <returns></returns>
        public bool IsRelationByAgentOpenid(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_SubscribeActivity");
            strSql.Append(" where FriendID=@FriendID");
            strSql.Append(" and IsSubscribe=@IsSubscribe");
            SqlParameter[] parameters = {
					new SqlParameter("@FriendID", SqlDbType.NVarChar,50),
                    new SqlParameter("@IsSubscribe", SqlDbType.Int,4)
			};
            parameters[0].Value = openid;
            parameters[1].Value = 0;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }
    }
}

