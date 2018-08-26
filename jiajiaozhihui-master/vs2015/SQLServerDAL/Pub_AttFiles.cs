using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_AttFiles。
    /// </summary>
    public class Pub_AttFiles : IPub_AttFiles
    {
        public Pub_AttFiles()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_AttFiles");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_AttFiles model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_AttFiles(");
            strSql.Append("FileName,FilePath,MID,DocID,ClassID)");
            strSql.Append(" values (");
            strSql.Append("@FileName,@FilePath,@MID,@DocID,@ClassID)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@FileName", SqlDbType.NVarChar,150),
					new SqlParameter("@FilePath", SqlDbType.NVarChar,150),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@DocID", SqlDbType.NVarChar,10),
					new SqlParameter("@ClassID", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.FileName;
            parameters[1].Value = model.FilePath;
            parameters[2].Value = model.MID;
            parameters[3].Value = model.DocID;
            parameters[4].Value = model.ClassID;

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
        public void Update(SfSoft.Model.Pub_AttFiles model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_AttFiles set ");
            strSql.Append("FileName=@FileName,");
            strSql.Append("FilePath=@FilePath,");
            strSql.Append("MID=@MID,");
            strSql.Append("DocID=@DocID,");
            strSql.Append("ClassID=@ClassID");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@FileName", SqlDbType.NVarChar,150),
					new SqlParameter("@FilePath", SqlDbType.NVarChar,150),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@DocID", SqlDbType.NVarChar,10),
					new SqlParameter("@ClassID", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.FileName;
            parameters[2].Value = model.FilePath;
            parameters[3].Value = model.MID;
            parameters[4].Value = model.DocID;
            parameters[5].Value = model.ClassID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_AttFiles ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_AttFiles GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,FileName,FilePath,MID,DocID,ClassID from Pub_AttFiles ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_AttFiles model = new SfSoft.Model.Pub_AttFiles();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.FileName = ds.Tables[0].Rows[0]["FileName"].ToString();
                model.FilePath = ds.Tables[0].Rows[0]["FilePath"].ToString();
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                model.DocID = ds.Tables[0].Rows[0]["DocID"].ToString();
                model.ClassID = ds.Tables[0].Rows[0]["ClassID"].ToString();
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
            strSql.Append("select ID,FileName,FilePath,MID,DocID,ClassID ");
            strSql.Append(" FROM Pub_AttFiles ");
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
            parameters[0].Value = "Pub_AttFiles";
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

