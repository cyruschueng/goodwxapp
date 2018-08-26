using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Pub_CallList
	/// </summary>
	public class Pub_CallList:IPub_CallList
	{
		public Pub_CallList()
		{}
		#region  Method

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_CallList"); 
		}


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_CallList");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_CallList model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_CallList(");
            strSql.Append("AppID,ModulesID,DocID,CallType,CallTypeTime,Price,num,Flag,UserID,CnName,UserContact,ContactIDs,ContactNames,Status,Msg,FlowID)");
            strSql.Append(" values (");
            strSql.Append("@AppID,@ModulesID,@DocID,@CallType,@CallTypeTime,@Price,@num,@Flag,@UserID,@CnName,@UserContact,@ContactIDs,@ContactNames,@Status,@Msg,@FlowID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@AppID", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,40),
					new SqlParameter("@DocID", SqlDbType.NVarChar,40),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@CallTypeTime", SqlDbType.DateTime),
					new SqlParameter("@Price", SqlDbType.Float,8),
					new SqlParameter("@num", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserContact", SqlDbType.NVarChar,80),
					new SqlParameter("@ContactIDs", SqlDbType.NText),
					new SqlParameter("@ContactNames", SqlDbType.NText),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Msg", SqlDbType.NVarChar,1000),
					new SqlParameter("@FlowID", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.AppID;
            parameters[1].Value = model.ModulesID;
            parameters[2].Value = model.DocID;
            parameters[3].Value = model.CallType;
            parameters[4].Value = model.CallTypeTime;
            parameters[5].Value = model.Price;
            parameters[6].Value = model.num;
            parameters[7].Value = model.Flag;
            parameters[8].Value = model.UserID;
            parameters[9].Value = model.CnName;
            parameters[10].Value = model.UserContact;
            parameters[11].Value = model.ContactIDs;
            parameters[12].Value = model.ContactNames;
            parameters[13].Value = model.Status;
            parameters[14].Value = model.Msg;
            parameters[15].Value = model.FlowID;

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
        public bool Update(SfSoft.Model.Pub_CallList model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_CallList set ");
            strSql.Append("AppID=@AppID,");
            strSql.Append("ModulesID=@ModulesID,");
            strSql.Append("DocID=@DocID,");
            strSql.Append("CallType=@CallType,");
            strSql.Append("CallTypeTime=@CallTypeTime,");
            strSql.Append("Price=@Price,");
            strSql.Append("num=@num,");
            strSql.Append("Flag=@Flag,");
            strSql.Append("UserID=@UserID,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("UserContact=@UserContact,");
            strSql.Append("ContactIDs=@ContactIDs,");
            strSql.Append("ContactNames=@ContactNames,");
            strSql.Append("Status=@Status,");
            strSql.Append("Msg=@Msg,");
            strSql.Append("FlowID=@FlowID");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@AppID", SqlDbType.NVarChar,20),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,40),
					new SqlParameter("@DocID", SqlDbType.NVarChar,40),
					new SqlParameter("@CallType", SqlDbType.Int,4),
					new SqlParameter("@CallTypeTime", SqlDbType.DateTime),
					new SqlParameter("@Price", SqlDbType.Float,8),
					new SqlParameter("@num", SqlDbType.Int,4),
					new SqlParameter("@Flag", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@CnName", SqlDbType.NVarChar,20),
					new SqlParameter("@UserContact", SqlDbType.NVarChar,80),
					new SqlParameter("@ContactIDs", SqlDbType.NText),
					new SqlParameter("@ContactNames", SqlDbType.NText),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Msg", SqlDbType.NVarChar,1000),
					new SqlParameter("@FlowID", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.AppID;
            parameters[2].Value = model.ModulesID;
            parameters[3].Value = model.DocID;
            parameters[4].Value = model.CallType;
            parameters[5].Value = model.CallTypeTime;
            parameters[6].Value = model.Price;
            parameters[7].Value = model.num;
            parameters[8].Value = model.Flag;
            parameters[9].Value = model.UserID;
            parameters[10].Value = model.CnName;
            parameters[11].Value = model.UserContact;
            parameters[12].Value = model.ContactIDs;
            parameters[13].Value = model.ContactNames;
            parameters[14].Value = model.Status;
            parameters[15].Value = model.Msg;
            parameters[16].Value = model.FlowID;

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
            strSql.Append("delete from Pub_CallList ");
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
            strSql.Append("delete from Pub_CallList ");
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
        public SfSoft.Model.Pub_CallList GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,AppID,ModulesID,DocID,CallType,CallTypeTime,Price,num,Flag,UserID,CnName,UserContact,ContactIDs,ContactNames,Status,Msg,FlowID from Pub_CallList ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_CallList model = new SfSoft.Model.Pub_CallList();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.AppID = ds.Tables[0].Rows[0]["AppID"].ToString();
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.DocID = ds.Tables[0].Rows[0]["DocID"].ToString();
                if (ds.Tables[0].Rows[0]["CallType"].ToString() != "")
                {
                    model.CallType = int.Parse(ds.Tables[0].Rows[0]["CallType"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CallTypeTime"].ToString() != "")
                {
                    model.CallTypeTime = DateTime.Parse(ds.Tables[0].Rows[0]["CallTypeTime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Price"].ToString() != "")
                {
                    model.Price = decimal.Parse(ds.Tables[0].Rows[0]["Price"].ToString());
                }
                if (ds.Tables[0].Rows[0]["num"].ToString() != "")
                {
                    model.num = int.Parse(ds.Tables[0].Rows[0]["num"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Flag"].ToString() != "")
                {
                    model.Flag = int.Parse(ds.Tables[0].Rows[0]["Flag"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.UserContact = ds.Tables[0].Rows[0]["UserContact"].ToString();
                model.ContactIDs = ds.Tables[0].Rows[0]["ContactIDs"].ToString();
                model.ContactNames = ds.Tables[0].Rows[0]["ContactNames"].ToString();
                if (ds.Tables[0].Rows[0]["Status"].ToString() != "")
                {
                    model.Status = int.Parse(ds.Tables[0].Rows[0]["Status"].ToString());
                }
                model.Msg = ds.Tables[0].Rows[0]["Msg"].ToString();
                model.FlowID = ds.Tables[0].Rows[0]["FlowID"].ToString();
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
            strSql.Append("select ID,AppID,ModulesID,DocID,CallType,CallTypeTime,Price,num,Flag,UserID,CnName,UserContact,ContactIDs,ContactNames,Status,Msg,FlowID ");
            strSql.Append(" FROM Pub_CallList ");
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
            strSql.Append(" ID,AppID,ModulesID,DocID,CallType,CallTypeTime,Price,num,Flag,UserID,CnName,UserContact,ContactIDs,ContactNames,Status,Msg,FlowID ");
            strSql.Append(" FROM Pub_CallList ");
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
            parameters[0].Value = "Pub_CallList";
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

