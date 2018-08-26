using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_ComputerKey。
    /// </summary>
    public class Pub_ComputerKey : IPub_ComputerKey
    {
        public Pub_ComputerKey()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_ComputerKey");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_ComputerKey model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_ComputerKey(");
            strSql.Append("UserID,UserName,CnName,DeptName,DeptID,IDCard,ComputerKind,ComputerID,Remark,Brand,ComputerType,ComputerSn,Status,SubmitDate,CancelDate,AppDate,Approval,AppRemark,Flag,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@UserID,@UserName,@CnName,@DeptName,@DeptID,@IDCard,@ComputerKind,@ComputerID,@Remark,@Brand,@ComputerType,@ComputerSn,@Status,@SubmitDate,@CancelDate,@AppDate,@Approval,@AppRemark,@Flag,@FilialeID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@UserName", SqlDbType.NVarChar,30),
					new SqlParameter("@CnName", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@IDCard", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerKind", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerID", SqlDbType.NVarChar,60),
					new SqlParameter("@Remark", SqlDbType.NVarChar,100),
					new SqlParameter("@Brand", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerType", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerSn", SqlDbType.NVarChar,30),
					new SqlParameter("@Status", SqlDbType.NVarChar,30),
					new SqlParameter("@SubmitDate", SqlDbType.DateTime),
					new SqlParameter("@CancelDate", SqlDbType.DateTime),
					new SqlParameter("@AppDate", SqlDbType.DateTime),
					new SqlParameter("@Approval", SqlDbType.NVarChar,30),
					new SqlParameter("@AppRemark", SqlDbType.NVarChar,100),
					new SqlParameter("@Flag", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.Int,4)};
            parameters[0].Value = model.UserID;
            parameters[1].Value = model.UserName;
            parameters[2].Value = model.CnName;
            parameters[3].Value = model.DeptName;
            parameters[4].Value = model.DeptID;
            parameters[5].Value = model.IDCard;
            parameters[6].Value = model.ComputerKind;
            parameters[7].Value = model.ComputerID;
            parameters[8].Value = model.Remark;
            parameters[9].Value = model.Brand;
            parameters[10].Value = model.ComputerType;
            parameters[11].Value = model.ComputerSn;
            parameters[12].Value = model.Status;
            parameters[13].Value = model.SubmitDate;
            parameters[14].Value = model.CancelDate;
            parameters[15].Value = model.AppDate;
            parameters[16].Value = model.Approval;
            parameters[17].Value = model.AppRemark;
            parameters[18].Value = model.Flag;
            parameters[19].Value = model.FilialeID;

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
        public void Update(SfSoft.Model.Pub_ComputerKey model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_ComputerKey set ");
            strSql.Append("UserID=@UserID,");
            strSql.Append("UserName=@UserName,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("DeptName=@DeptName,");
            strSql.Append("DeptID=@DeptID,");
            strSql.Append("IDCard=@IDCard,");
            strSql.Append("ComputerKind=@ComputerKind,");
            strSql.Append("ComputerID=@ComputerID,");
            strSql.Append("Remark=@Remark,");
            strSql.Append("Brand=@Brand,");
            strSql.Append("ComputerType=@ComputerType,");
            strSql.Append("ComputerSn=@ComputerSn,");
            strSql.Append("Status=@Status,");
            strSql.Append("SubmitDate=@SubmitDate,");
            strSql.Append("CancelDate=@CancelDate,");
            strSql.Append("AppDate=@AppDate,");
            strSql.Append("Approval=@Approval,");
            strSql.Append("AppRemark=@AppRemark,");
            strSql.Append("Flag=@Flag,");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@UserName", SqlDbType.NVarChar,30),
					new SqlParameter("@CnName", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@IDCard", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerKind", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerID", SqlDbType.NVarChar,60),
					new SqlParameter("@Remark", SqlDbType.NVarChar,100),
					new SqlParameter("@Brand", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerType", SqlDbType.NVarChar,30),
					new SqlParameter("@ComputerSn", SqlDbType.NVarChar,30),
					new SqlParameter("@Status", SqlDbType.NVarChar,30),
					new SqlParameter("@SubmitDate", SqlDbType.DateTime),
					new SqlParameter("@CancelDate", SqlDbType.DateTime),
					new SqlParameter("@AppDate", SqlDbType.DateTime),
					new SqlParameter("@Approval", SqlDbType.NVarChar,30),
					new SqlParameter("@AppRemark", SqlDbType.NVarChar,100),
					new SqlParameter("@Flag", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.Int,4)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.UserID;
            parameters[2].Value = model.UserName;
            parameters[3].Value = model.CnName;
            parameters[4].Value = model.DeptName;
            parameters[5].Value = model.DeptID;
            parameters[6].Value = model.IDCard;
            parameters[7].Value = model.ComputerKind;
            parameters[8].Value = model.ComputerID;
            parameters[9].Value = model.Remark;
            parameters[10].Value = model.Brand;
            parameters[11].Value = model.ComputerType;
            parameters[12].Value = model.ComputerSn;
            parameters[13].Value = model.Status;
            parameters[14].Value = model.SubmitDate;
            parameters[15].Value = model.CancelDate;
            parameters[16].Value = model.AppDate;
            parameters[17].Value = model.Approval;
            parameters[18].Value = model.AppRemark;
            parameters[19].Value = model.Flag;
            parameters[20].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Pub_ComputerKey ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_ComputerKey GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,UserID,UserName,CnName,DeptName,DeptID,IDCard,ComputerKind,ComputerID,Remark,Brand,ComputerType,ComputerSn,Status,SubmitDate,CancelDate,AppDate,Approval,AppRemark,Flag,FilialeID from Pub_ComputerKey ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_ComputerKey model = new SfSoft.Model.Pub_ComputerKey();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.DeptName = ds.Tables[0].Rows[0]["DeptName"].ToString();
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                model.IDCard = ds.Tables[0].Rows[0]["IDCard"].ToString();
                model.ComputerKind = ds.Tables[0].Rows[0]["ComputerKind"].ToString();
                model.ComputerID = ds.Tables[0].Rows[0]["ComputerID"].ToString();
                model.Remark = ds.Tables[0].Rows[0]["Remark"].ToString();
                model.Brand = ds.Tables[0].Rows[0]["Brand"].ToString();
                model.ComputerType = ds.Tables[0].Rows[0]["ComputerType"].ToString();
                model.ComputerSn = ds.Tables[0].Rows[0]["ComputerSn"].ToString();
                model.Status = ds.Tables[0].Rows[0]["Status"].ToString();
                if (ds.Tables[0].Rows[0]["SubmitDate"].ToString() != "")
                {
                    model.SubmitDate = DateTime.Parse(ds.Tables[0].Rows[0]["SubmitDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CancelDate"].ToString() != "")
                {
                    model.CancelDate = DateTime.Parse(ds.Tables[0].Rows[0]["CancelDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AppDate"].ToString() != "")
                {
                    model.AppDate = DateTime.Parse(ds.Tables[0].Rows[0]["AppDate"].ToString());
                }
                model.Approval = ds.Tables[0].Rows[0]["Approval"].ToString();
                model.AppRemark = ds.Tables[0].Rows[0]["AppRemark"].ToString();
                if (ds.Tables[0].Rows[0]["Flag"].ToString() != "")
                {
                    model.Flag = int.Parse(ds.Tables[0].Rows[0]["Flag"].ToString());
                }
                if (ds.Tables[0].Rows[0]["FilialeID"].ToString() != "")
                {
                    model.FilialeID = int.Parse(ds.Tables[0].Rows[0]["FilialeID"].ToString());
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
            strSql.Append("select ID,UserID,UserName,CnName,DeptName,DeptID,IDCard,ComputerKind,ComputerID,Remark,Brand,ComputerType,ComputerSn,Status,SubmitDate,CancelDate,AppDate,Approval,AppRemark,Flag,FilialeID ");
            strSql.Append(" FROM Pub_ComputerKey ");
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
            strSql.Append(" ID,UserID,UserName,CnName,DeptName,DeptID,IDCard,ComputerKind,ComputerID,Remark,Brand,ComputerType,ComputerSn,Status,SubmitDate,CancelDate,AppDate,Approval,AppRemark,Flag,FilialeID ");
            strSql.Append(" FROM Pub_ComputerKey ");
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
            parameters[0].Value = "Pub_ComputerKey";
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

