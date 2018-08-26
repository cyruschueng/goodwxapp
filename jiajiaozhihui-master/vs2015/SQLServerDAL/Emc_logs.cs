using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Emc_logs。
	/// </summary>
	public class Emc_logs:IEmc_logs
	{
		public Emc_logs()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Emc_logs"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Emc_logs");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Emc_logs model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Emc_logs(");
            strSql.Append("LoginTime,IpAddr,ComputerName,LogoutTime,SysFlag,OthersFlag,FunID,FunName,UserID,CnName,UserName,DeptID,Dept,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@LoginTime,@IpAddr,@ComputerName,@LogoutTime,@SysFlag,@OthersFlag,@FunID,@FunName,@UserID,@CnName,@UserName,@DeptID,@Dept,@FilialeID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@LoginTime", SqlDbType.DateTime),
					new SqlParameter("@IpAddr", SqlDbType.NVarChar,20),
					new SqlParameter("@ComputerName", SqlDbType.NVarChar,30),
					new SqlParameter("@LogoutTime", SqlDbType.DateTime),
					new SqlParameter("@SysFlag", SqlDbType.NVarChar,15),
					new SqlParameter("@OthersFlag", SqlDbType.NVarChar,15),
					new SqlParameter("@FunID", SqlDbType.NVarChar,50),
					new SqlParameter("@FunName", SqlDbType.NVarChar,80),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@Dept", SqlDbType.NVarChar,80),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,15)};
            parameters[0].Value = model.LoginTime;
            parameters[1].Value = model.IpAddr;
            parameters[2].Value = model.ComputerName;
            parameters[3].Value = model.LogoutTime;
            parameters[4].Value = model.SysFlag;
            parameters[5].Value = model.OthersFlag;
            parameters[6].Value = model.FunID;
            parameters[7].Value = model.FunName;
            parameters[8].Value = model.UserID;
            parameters[9].Value = model.CnName;
            parameters[10].Value = model.UserName;
            parameters[11].Value = model.DeptID;
            parameters[12].Value = model.Dept;
            parameters[13].Value = model.FilialeID;

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
        public void Update(SfSoft.Model.Emc_logs model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Emc_logs set ");
            strSql.Append("LoginTime=@LoginTime,");
            strSql.Append("IpAddr=@IpAddr,");
            strSql.Append("ComputerName=@ComputerName,");
            strSql.Append("LogoutTime=@LogoutTime,");
            strSql.Append("SysFlag=@SysFlag,");
            strSql.Append("OthersFlag=@OthersFlag,");
            strSql.Append("FunID=@FunID,");
            strSql.Append("FunName=@FunName,");
            strSql.Append("UserID=@UserID,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("UserName=@UserName,");
            strSql.Append("DeptID=@DeptID,");
            strSql.Append("Dept=@Dept,");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@LoginTime", SqlDbType.DateTime),
					new SqlParameter("@IpAddr", SqlDbType.NVarChar,20),
					new SqlParameter("@ComputerName", SqlDbType.NVarChar,30),
					new SqlParameter("@LogoutTime", SqlDbType.DateTime),
					new SqlParameter("@SysFlag", SqlDbType.NVarChar,15),
					new SqlParameter("@OthersFlag", SqlDbType.NVarChar,15),
					new SqlParameter("@FunID", SqlDbType.NVarChar,50),
					new SqlParameter("@FunName", SqlDbType.NVarChar,80),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@Dept", SqlDbType.NVarChar,80),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,15)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.LoginTime;
            parameters[2].Value = model.IpAddr;
            parameters[3].Value = model.ComputerName;
            parameters[4].Value = model.LogoutTime;
            parameters[5].Value = model.SysFlag;
            parameters[6].Value = model.OthersFlag;
            parameters[7].Value = model.FunID;
            parameters[8].Value = model.FunName;
            parameters[9].Value = model.UserID;
            parameters[10].Value = model.CnName;
            parameters[11].Value = model.UserName;
            parameters[12].Value = model.DeptID;
            parameters[13].Value = model.Dept;
            parameters[14].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Emc_logs ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Emc_logs GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,LoginTime,IpAddr,ComputerName,LogoutTime,SysFlag,OthersFlag,FunID,FunName,UserID,CnName,UserName,DeptID,Dept,FilialeID from Emc_logs ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Emc_logs model = new SfSoft.Model.Emc_logs();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["LoginTime"].ToString() != "")
                {
                    model.LoginTime = DateTime.Parse(ds.Tables[0].Rows[0]["LoginTime"].ToString());
                }
                model.IpAddr = ds.Tables[0].Rows[0]["IpAddr"].ToString();
                model.ComputerName = ds.Tables[0].Rows[0]["ComputerName"].ToString();
                if (ds.Tables[0].Rows[0]["LogoutTime"].ToString() != "")
                {
                    model.LogoutTime = DateTime.Parse(ds.Tables[0].Rows[0]["LogoutTime"].ToString());
                }
                model.SysFlag = ds.Tables[0].Rows[0]["SysFlag"].ToString();
                model.OthersFlag = ds.Tables[0].Rows[0]["OthersFlag"].ToString();
                model.FunID = ds.Tables[0].Rows[0]["FunID"].ToString();
                model.FunName = ds.Tables[0].Rows[0]["FunName"].ToString();
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                model.Dept = ds.Tables[0].Rows[0]["Dept"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
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
            strSql.Append("select ID,LoginTime,IpAddr,ComputerName,LogoutTime,SysFlag,OthersFlag,FunID,FunName,UserID,CnName,UserName,DeptID,Dept,FilialeID ");
            strSql.Append(" FROM Emc_logs ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
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
			parameters[0].Value = "Emc_logs";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  成员方法
	}
}

