using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Pub_UnSystem
	/// </summary>
	public class Pub_UnSystem:IPub_UnSystem
	{
		public Pub_UnSystem()
		{}
		#region  Method

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_UnSystem"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_UnSystem");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_UnSystem model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_UnSystem(");
            strSql.Append("DbSrvAddr,DbName,DbUid,DbPwd,SysType,SysUrl,SysShortName,SysName,SysIcon,IsAct,OrderID,Flag,Uid,CnName,UserName,Password)");
            strSql.Append(" values (");
            strSql.Append("@DbSrvAddr,@DbName,@DbUid,@DbPwd,@SysType,@SysUrl,@SysShortName,@SysName,@SysIcon,@IsAct,@OrderID,@Flag,@Uid,@CnName,@UserName,@Password)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@DbSrvAddr", SqlDbType.NVarChar,100),
					new SqlParameter("@DbName", SqlDbType.NVarChar,100),
					new SqlParameter("@DbUid", SqlDbType.NVarChar,100),
					new SqlParameter("@DbPwd", SqlDbType.NVarChar,100),
					new SqlParameter("@SysType", SqlDbType.NVarChar,10),
					new SqlParameter("@SysUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@SysShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@SysName", SqlDbType.NVarChar,100),
					new SqlParameter("@SysIcon", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,10),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.NVarChar,10),
					new SqlParameter("@Uid", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Password", SqlDbType.NVarChar,80)};
            parameters[0].Value = model.DbSrvAddr;
            parameters[1].Value = model.DbName;
            parameters[2].Value = model.DbUid;
            parameters[3].Value = model.DbPwd;
            parameters[4].Value = model.SysType;
            parameters[5].Value = model.SysUrl;
            parameters[6].Value = model.SysShortName;
            parameters[7].Value = model.SysName;
            parameters[8].Value = model.SysIcon;
            parameters[9].Value = model.IsAct;
            parameters[10].Value = model.OrderID;
            parameters[11].Value = model.Flag;
            parameters[12].Value = model.Uid;
            parameters[13].Value = model.CnName;
            parameters[14].Value = model.UserName;
            parameters[15].Value = model.Password;

            object obj = DbHelperSQL.GetSingle(strSql.ToString(), parameters);
            if (obj == null)
            {
                return 1;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(SfSoft.Model.Pub_UnSystem model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_UnSystem set ");
            strSql.Append("DbSrvAddr=@DbSrvAddr,");
            strSql.Append("DbName=@DbName,");
            strSql.Append("DbUid=@DbUid,");
            strSql.Append("DbPwd=@DbPwd,");
            strSql.Append("SysType=@SysType,");
            strSql.Append("SysUrl=@SysUrl,");
            strSql.Append("SysShortName=@SysShortName,");
            strSql.Append("SysName=@SysName,");
            strSql.Append("SysIcon=@SysIcon,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("Flag=@Flag,");
            strSql.Append("Uid=@Uid,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("UserName=@UserName,");
            strSql.Append("Password=@Password");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@DbSrvAddr", SqlDbType.NVarChar,100),
					new SqlParameter("@DbName", SqlDbType.NVarChar,100),
					new SqlParameter("@DbUid", SqlDbType.NVarChar,100),
					new SqlParameter("@DbPwd", SqlDbType.NVarChar,100),
					new SqlParameter("@SysType", SqlDbType.NVarChar,10),
					new SqlParameter("@SysUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@SysShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@SysName", SqlDbType.NVarChar,100),
					new SqlParameter("@SysIcon", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.NVarChar,10),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.NVarChar,10),
					new SqlParameter("@Uid", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Password", SqlDbType.NVarChar,80)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.DbSrvAddr;
            parameters[2].Value = model.DbName;
            parameters[3].Value = model.DbUid;
            parameters[4].Value = model.DbPwd;
            parameters[5].Value = model.SysType;
            parameters[6].Value = model.SysUrl;
            parameters[7].Value = model.SysShortName;
            parameters[8].Value = model.SysName;
            parameters[9].Value = model.SysIcon;
            parameters[10].Value = model.IsAct;
            parameters[11].Value = model.OrderID;
            parameters[12].Value = model.Flag;
            parameters[13].Value = model.Uid;
            parameters[14].Value = model.CnName;
            parameters[15].Value = model.UserName;
            parameters[16].Value = model.Password;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
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

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Pub_UnSystem ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
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
        public bool DeleteList(string IDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Pub_UnSystem ");
            strSql.Append(" where ID in (" + IDlist + ")  ");
            int rows = DbHelperSQL.ExecuteSql(strSql.ToString());
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
        public SfSoft.Model.Pub_UnSystem GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,DbSrvAddr,DbName,DbUid,DbPwd,SysType,SysUrl,SysShortName,SysName,SysIcon,IsAct,OrderID,Flag,Uid,CnName,UserName,Password from Pub_UnSystem ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_UnSystem model = new SfSoft.Model.Pub_UnSystem();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.DbSrvAddr = ds.Tables[0].Rows[0]["DbSrvAddr"].ToString();
                model.DbName = ds.Tables[0].Rows[0]["DbName"].ToString();
                model.DbUid = ds.Tables[0].Rows[0]["DbUid"].ToString();
                model.DbPwd = ds.Tables[0].Rows[0]["DbPwd"].ToString();
                model.SysType = ds.Tables[0].Rows[0]["SysType"].ToString();
                model.SysUrl = ds.Tables[0].Rows[0]["SysUrl"].ToString();
                model.SysShortName = ds.Tables[0].Rows[0]["SysShortName"].ToString();
                model.SysName = ds.Tables[0].Rows[0]["SysName"].ToString();
                model.SysIcon = ds.Tables[0].Rows[0]["SysIcon"].ToString();
                model.IsAct = ds.Tables[0].Rows[0]["IsAct"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                model.Flag = ds.Tables[0].Rows[0]["Flag"].ToString();
                if (ds.Tables[0].Rows[0]["Uid"].ToString() != "")
                {
                    model.Uid = int.Parse(ds.Tables[0].Rows[0]["Uid"].ToString());
                }
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.Password = ds.Tables[0].Rows[0]["Password"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,DbSrvAddr,DbName,DbUid,DbPwd,SysType,SysUrl,SysShortName,SysName,SysIcon,IsAct,OrderID,Flag,Uid,CnName,UserName,Password ");
            strSql.Append(" FROM Pub_UnSystem ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 获得前几行数据
        /// </summary>
        public DataSet GetList(int Top, string strWhere, string filedOrder)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ");
            if (Top > 0)
            {
                strSql.Append(" top " + Top.ToString());
            }
            strSql.Append(" ID,DbSrvAddr,DbName,DbUid,DbPwd,SysType,SysUrl,SysShortName,SysName,SysIcon,IsAct,OrderID,Flag,Uid,CnName,UserName,Password ");
            strSql.Append(" FROM Pub_UnSystem ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" order by " + filedOrder);
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
			parameters[0].Value = "Pub_UnSystem";
			parameters[1].Value = "";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  Method
	}
}

