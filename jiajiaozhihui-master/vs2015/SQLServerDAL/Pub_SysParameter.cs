using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_SysParameter。
	/// </summary>
	public class Pub_SysParameter:IPub_SysParameter
	{
		public Pub_SysParameter()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_SysParameter"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_SysParameter");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_SysParameter model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_SysParameter(");
            strSql.Append("SysStartTimeAm,SysEndTimeAm,SysStartTimePm,SysDaySiesta,SysTotalHours,SysEndTimePm,SetDate,SysWeekRest0,SysWeekRest6,FilialeID,EMail,EmailPassword,Pop3Server,Pop3Port,SMSServer,SMSUserName,SMSPassword,SMSPrice,FAXPrice,CheckInEndDay)");
            strSql.Append(" values (");
            strSql.Append("@SysStartTimeAm,@SysEndTimeAm,@SysStartTimePm,@SysDaySiesta,@SysTotalHours,@SysEndTimePm,@SetDate,@SysWeekRest0,@SysWeekRest6,@FilialeID,@EMail,@EmailPassword,@Pop3Server,@Pop3Port,@SMSServer,@SMSUserName,@SMSPassword,@SMSPrice,@FAXPrice,@CheckInEndDay)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@SysStartTimeAm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysEndTimeAm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysStartTimePm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysDaySiesta", SqlDbType.Float,8),
					new SqlParameter("@SysTotalHours", SqlDbType.Float,8),
					new SqlParameter("@SysEndTimePm", SqlDbType.NVarChar,10),
					new SqlParameter("@SetDate", SqlDbType.DateTime),
					new SqlParameter("@SysWeekRest0", SqlDbType.NVarChar,10),
					new SqlParameter("@SysWeekRest6", SqlDbType.NVarChar,10),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@EMail", SqlDbType.NVarChar,80),
					new SqlParameter("@EmailPassword", SqlDbType.NVarChar,80),
					new SqlParameter("@Pop3Server", SqlDbType.NVarChar,80),
					new SqlParameter("@Pop3Port", SqlDbType.NVarChar,10),
					new SqlParameter("@SMSServer", SqlDbType.NVarChar,80),
					new SqlParameter("@SMSUserName", SqlDbType.NVarChar,20),
					new SqlParameter("@SMSPassword", SqlDbType.NVarChar,80),
					new SqlParameter("@SMSPrice", SqlDbType.Float,8),
					new SqlParameter("@FAXPrice", SqlDbType.Float,8),
                      new SqlParameter("@CheckInEndDay", SqlDbType.Int,4)                                     
                                        };
            parameters[0].Value = model.SysStartTimeAm;
            parameters[1].Value = model.SysEndTimeAm;
            parameters[2].Value = model.SysStartTimePm;
            parameters[3].Value = model.SysDaySiesta;
            parameters[4].Value = model.SysTotalHours;
            parameters[5].Value = model.SysEndTimePm;
            parameters[6].Value = model.SetDate;
            parameters[7].Value = model.SysWeekRest0;
            parameters[8].Value = model.SysWeekRest6;
            parameters[9].Value = model.FilialeID;
            parameters[10].Value = model.EMail;
            parameters[11].Value = model.EmailPassword;
            parameters[12].Value = model.Pop3Server;
            parameters[13].Value = model.Pop3Port;
            parameters[14].Value = model.SMSServer;
            parameters[15].Value = model.SMSUserName;
            parameters[16].Value = model.SMSPassword;
            parameters[17].Value = model.SMSPrice;
            parameters[18].Value = model.FAXPrice;
            parameters[19].Value = model.CheckInEndDay;
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
        public void Update(SfSoft.Model.Pub_SysParameter model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_SysParameter set ");
            strSql.Append("SysStartTimeAm=@SysStartTimeAm,");
            strSql.Append("SysEndTimeAm=@SysEndTimeAm,");
            strSql.Append("SysStartTimePm=@SysStartTimePm,");
            strSql.Append("SysDaySiesta=@SysDaySiesta,");
            strSql.Append("SysTotalHours=@SysTotalHours,");
            strSql.Append("SysEndTimePm=@SysEndTimePm,");
            strSql.Append("SetDate=@SetDate,");
            strSql.Append("SysWeekRest0=@SysWeekRest0,");
            strSql.Append("SysWeekRest6=@SysWeekRest6,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("EMail=@EMail,");
            strSql.Append("EmailPassword=@EmailPassword,");
            strSql.Append("Pop3Server=@Pop3Server,");
            strSql.Append("Pop3Port=@Pop3Port,");
            strSql.Append("SMSServer=@SMSServer,");
            strSql.Append("SMSUserName=@SMSUserName,");
            strSql.Append("SMSPassword=@SMSPassword,");
            strSql.Append("SMSPrice=@SMSPrice,");
            strSql.Append("FAXPrice=@FAXPrice,");
            strSql.Append("CheckInEndDay=@CheckInEndDay");
            
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@SysStartTimeAm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysEndTimeAm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysStartTimePm", SqlDbType.NVarChar,10),
					new SqlParameter("@SysDaySiesta", SqlDbType.Float,8),
					new SqlParameter("@SysTotalHours", SqlDbType.Float,8),
					new SqlParameter("@SysEndTimePm", SqlDbType.NVarChar,10),
					new SqlParameter("@SetDate", SqlDbType.DateTime),
					new SqlParameter("@SysWeekRest0", SqlDbType.NVarChar,10),
					new SqlParameter("@SysWeekRest6", SqlDbType.NVarChar,10),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@EMail", SqlDbType.NVarChar,80),
					new SqlParameter("@EmailPassword", SqlDbType.NVarChar,80),
					new SqlParameter("@Pop3Server", SqlDbType.NVarChar,80),
					new SqlParameter("@Pop3Port", SqlDbType.NVarChar,10),
					new SqlParameter("@SMSServer", SqlDbType.NVarChar,80),
					new SqlParameter("@SMSUserName", SqlDbType.NVarChar,20),
					new SqlParameter("@SMSPassword", SqlDbType.NVarChar,80),
					new SqlParameter("@SMSPrice", SqlDbType.Float,8),
					new SqlParameter("@FAXPrice", SqlDbType.Float,8),
                    new SqlParameter("@CheckInEndDay", SqlDbType.Int,4) };
            parameters[0].Value = model.ID;
            parameters[1].Value = model.SysStartTimeAm;
            parameters[2].Value = model.SysEndTimeAm;
            parameters[3].Value = model.SysStartTimePm;
            parameters[4].Value = model.SysDaySiesta;
            parameters[5].Value = model.SysTotalHours;
            parameters[6].Value = model.SysEndTimePm;
            parameters[7].Value = model.SetDate;
            parameters[8].Value = model.SysWeekRest0;
            parameters[9].Value = model.SysWeekRest6;
            parameters[10].Value = model.FilialeID;
            parameters[11].Value = model.EMail;
            parameters[12].Value = model.EmailPassword;
            parameters[13].Value = model.Pop3Server;
            parameters[14].Value = model.Pop3Port;
            parameters[15].Value = model.SMSServer;
            parameters[16].Value = model.SMSUserName;
            parameters[17].Value = model.SMSPassword;
            parameters[18].Value = model.SMSPrice;
            parameters[19].Value = model.FAXPrice;
            parameters[20].Value = model.CheckInEndDay;
            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
   
        }
		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete Pub_SysParameter ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_SysParameter GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,SysStartTimeAm,SysEndTimeAm,SysStartTimePm,SysDaySiesta,SysTotalHours,SysEndTimePm,SetDate,SysWeekRest0,SysWeekRest6,FilialeID,EMail,EmailPassword,Pop3Server,Pop3Port,SMSServer,SMSUserName,SMSPassword,SMSPrice,FAXPrice,CheckInEndDay from Pub_SysParameter ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_SysParameter model = new SfSoft.Model.Pub_SysParameter();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.SysStartTimeAm = ds.Tables[0].Rows[0]["SysStartTimeAm"].ToString();
                model.SysEndTimeAm = ds.Tables[0].Rows[0]["SysEndTimeAm"].ToString();
                model.SysStartTimePm = ds.Tables[0].Rows[0]["SysStartTimePm"].ToString();
                if (ds.Tables[0].Rows[0]["SysDaySiesta"].ToString() != "")
                {
                    model.SysDaySiesta = decimal.Parse(ds.Tables[0].Rows[0]["SysDaySiesta"].ToString());
                }
                if (ds.Tables[0].Rows[0]["SysTotalHours"].ToString() != "")
                {
                    model.SysTotalHours = decimal.Parse(ds.Tables[0].Rows[0]["SysTotalHours"].ToString());
                }
                model.SysEndTimePm = ds.Tables[0].Rows[0]["SysEndTimePm"].ToString();
                if (ds.Tables[0].Rows[0]["SetDate"].ToString() != "")
                {
                    model.SetDate = DateTime.Parse(ds.Tables[0].Rows[0]["SetDate"].ToString());
                }
                model.SysWeekRest0 = ds.Tables[0].Rows[0]["SysWeekRest0"].ToString();
                model.SysWeekRest6 = ds.Tables[0].Rows[0]["SysWeekRest6"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.EMail = ds.Tables[0].Rows[0]["EMail"].ToString();
                model.EmailPassword = ds.Tables[0].Rows[0]["EmailPassword"].ToString();
                model.Pop3Server = ds.Tables[0].Rows[0]["Pop3Server"].ToString();
                model.Pop3Port = ds.Tables[0].Rows[0]["Pop3Port"].ToString();
                model.SMSServer = ds.Tables[0].Rows[0]["SMSServer"].ToString();
                model.SMSUserName = ds.Tables[0].Rows[0]["SMSUserName"].ToString();
                model.SMSPassword = ds.Tables[0].Rows[0]["SMSPassword"].ToString();
                if (ds.Tables[0].Rows[0]["SMSPrice"].ToString() != "")
                {
                    model.SMSPrice = decimal.Parse(ds.Tables[0].Rows[0]["SMSPrice"].ToString());
                }
                if (ds.Tables[0].Rows[0]["FAXPrice"].ToString() != "")
                {
                    model.FAXPrice = decimal.Parse(ds.Tables[0].Rows[0]["FAXPrice"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CheckInEndDay"].ToString() != "")
                {
                    model.CheckInEndDay = int.Parse(ds.Tables[0].Rows[0]["CheckInEndDay"].ToString());
                }
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
            strSql.Append("select ID,SysStartTimeAm,SysEndTimeAm,SysStartTimePm,SysDaySiesta,SysTotalHours,SysEndTimePm,SetDate,SysWeekRest0,SysWeekRest6,FilialeID,EMail,EmailPassword,Pop3Server,Pop3Port,SMSServer,SMSUserName,SMSPassword,SMSPrice,FAXPrice,CheckInEndDay ");
            strSql.Append(" FROM Pub_SysParameter ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 得到一个对象实体   strSql.Append(" where FilialeID=@FilialeID ");
        /// </summary>
        public SfSoft.Model.Pub_SysParameter GetModel(string  FilialeID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,SysStartTimeAm,SysEndTimeAm,SysStartTimePm,SysDaySiesta,SysTotalHours,SysEndTimePm,SetDate,SysWeekRest0,SysWeekRest6,FilialeID,EMail,EmailPassword,Pop3Server,Pop3Port,SMSServer,SMSUserName,SMSPassword,SMSPrice,FAXPrice,CheckInEndDay from Pub_SysParameter ");
            strSql.Append(" where FilialeID=@FilialeID ");
            SqlParameter[] parameters = {
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)};
            parameters[0].Value = FilialeID;

            SfSoft.Model.Pub_SysParameter model = new SfSoft.Model.Pub_SysParameter();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.SysStartTimeAm = ds.Tables[0].Rows[0]["SysStartTimeAm"].ToString();
                model.SysEndTimeAm = ds.Tables[0].Rows[0]["SysEndTimeAm"].ToString();
                model.SysStartTimePm = ds.Tables[0].Rows[0]["SysStartTimePm"].ToString();
                if (ds.Tables[0].Rows[0]["SysDaySiesta"].ToString() != "")
                {
                    model.SysDaySiesta = decimal.Parse(ds.Tables[0].Rows[0]["SysDaySiesta"].ToString());
                }
                if (ds.Tables[0].Rows[0]["SysTotalHours"].ToString() != "")
                {
                    model.SysTotalHours = decimal.Parse(ds.Tables[0].Rows[0]["SysTotalHours"].ToString());
                }
                model.SysEndTimePm = ds.Tables[0].Rows[0]["SysEndTimePm"].ToString();
                if (ds.Tables[0].Rows[0]["SetDate"].ToString() != "")
                {
                    model.SetDate = DateTime.Parse(ds.Tables[0].Rows[0]["SetDate"].ToString());
                }
                model.SysWeekRest0 = ds.Tables[0].Rows[0]["SysWeekRest0"].ToString();
                model.SysWeekRest6 = ds.Tables[0].Rows[0]["SysWeekRest6"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.EMail = ds.Tables[0].Rows[0]["EMail"].ToString();
                model.EmailPassword = ds.Tables[0].Rows[0]["EmailPassword"].ToString();
                model.Pop3Server = ds.Tables[0].Rows[0]["Pop3Server"].ToString();
                model.Pop3Port = ds.Tables[0].Rows[0]["Pop3Port"].ToString();
                model.SMSServer = ds.Tables[0].Rows[0]["SMSServer"].ToString();
                model.SMSUserName = ds.Tables[0].Rows[0]["SMSUserName"].ToString();
                model.SMSPassword = ds.Tables[0].Rows[0]["SMSPassword"].ToString();
                if (ds.Tables[0].Rows[0]["SMSPrice"].ToString() != "")
                {
                    model.SMSPrice = decimal.Parse(ds.Tables[0].Rows[0]["SMSPrice"].ToString());
                }
                if (ds.Tables[0].Rows[0]["FAXPrice"].ToString() != "")
                {
                    model.FAXPrice = decimal.Parse(ds.Tables[0].Rows[0]["FAXPrice"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CheckInEndDay"].ToString() != "")
                {
                    model.CheckInEndDay =int.Parse ( ds.Tables[0].Rows[0]["CheckInEndDay"].ToString());
                }
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string FilialeID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_SysParameter ");
            strSql.Append(" where FilialeID=@FilialeID ");
            SqlParameter[] parameters = {
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,10)};
            parameters[0].Value = FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
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
			parameters[0].Value = "Pub_SysParameter";
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

