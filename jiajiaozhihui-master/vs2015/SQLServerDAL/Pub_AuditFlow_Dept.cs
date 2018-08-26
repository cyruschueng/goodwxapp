using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_AuditFlow_Dept。
    /// </summary>
    public class Pub_AuditFlow_Dept : IPub_AuditFlow_Dept
    {
        public Pub_AuditFlow_Dept()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_AuditFlow_Dept");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_AuditFlow_Dept model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_AuditFlow_Dept(");
            strSql.Append("AFID,DeptID,DeptName,Flag,MID,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@AFID,@DeptID,@DeptName,@Flag,@MID,@FilialeID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,80),
					new SqlParameter("@Flag", SqlDbType.NVarChar,5),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.AFID;
            parameters[1].Value = model.DeptID;
            parameters[2].Value = model.DeptName;
            parameters[3].Value = model.Flag;
            parameters[4].Value = model.MID;
            parameters[5].Value = model.FilialeID;

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
        public void Update(SfSoft.Model.Pub_AuditFlow_Dept model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AuditFlow_Dept set ");
            strSql.Append("AFID=@AFID,");
            strSql.Append("DeptID=@DeptID,");
            strSql.Append("DeptName=@DeptName,");
            strSql.Append("Flag=@Flag,");
            strSql.Append("MID=@MID,");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@AFID", SqlDbType.Int,4),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,80),
					new SqlParameter("@Flag", SqlDbType.NVarChar,5),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.AFID;
            parameters[2].Value = model.DeptID;
            parameters[3].Value = model.DeptName;
            parameters[4].Value = model.Flag;
            parameters[5].Value = model.MID;
            parameters[6].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int AFID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_AuditFlow_Dept ");
            strSql.Append(" where AFID=@AFID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AFID", SqlDbType.Int,4)};
            parameters[0].Value = AFID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_AuditFlow_Dept GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,AFID,DeptID,DeptName,Flag,MID,FilialeID from Pub_AuditFlow_Dept ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_AuditFlow_Dept model = new SfSoft.Model.Pub_AuditFlow_Dept();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["AFID"].ToString() != "")
                {
                    model.AFID = int.Parse(ds.Tables[0].Rows[0]["AFID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                model.DeptName = ds.Tables[0].Rows[0]["DeptName"].ToString();
                model.Flag = ds.Tables[0].Rows[0]["Flag"].ToString();
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
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
            strSql.Append("select ID,AFID,DeptID,DeptName,Flag,MID,FilialeID ");
            strSql.Append(" FROM Pub_AuditFlow_Dept ");
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
            parameters[0].Value = "Pub_AuditFlow_Dept";
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

