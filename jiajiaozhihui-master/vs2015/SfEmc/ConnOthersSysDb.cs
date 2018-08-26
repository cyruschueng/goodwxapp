using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.UI.WebControls;
namespace SfSoft.SfEmc
{
    public class ConnOthersSysDb
    {
        string _connectionString = "";

        /// <summary>
        /// 取的数据库连接串
        /// </summary>
        /// <param name="DbName"></param>
        public ConnOthersSysDb(string ID)
        {
            DataSet ds = DBTools.GetList("select * from Pub_UnSystem where Flag='sys' and ID='" + ID + "' and IsAct='1' and DbName<>''");
            if (ds.Tables[0].Rows.Count > 0)
            {
                string DbSrvAddr = ds.Tables[0].Rows[0]["DbSrvAddr"].ToString();
                string DbName = ds.Tables[0].Rows[0]["DbName"].ToString();
                string DbUid = ds.Tables[0].Rows[0]["DbUid"].ToString();
                string DbPwd = ds.Tables[0].Rows[0]["DbPwd"].ToString();
                _connectionString = "server=" + DbSrvAddr + ";database=" + DbName + ";uid=" + DbUid + ";pwd=" + DbPwd;
            }
        }

        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        /// <returns>DataSet</returns>
        public DataSet Query(string SQLString)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                DataSet ds = new DataSet();
                try
                {
                    connection.Open();
                    SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
                    command.Fill(ds, "ds");
                }
                catch (System.Data.SqlClient.SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                return ds;
            }
        }
        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        ///  <param name="tablename">dataset中的表名</param>
        /// <returns>DataSet</returns>
        public DataSet Query(string SQLString, string tablename)
        {
            if (tablename == "")
            {
                tablename = "ds";
            }
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                DataSet ds = new DataSet();
                try
                {
                    connection.Open();
                    SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
                    command.Fill(ds, tablename);
                }
                catch (System.Data.SqlClient.SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                return ds;
            }
        }
        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <param name="tableName">DataSet结果中的表名</param>
        /// <returns>DataSet</returns>
        public DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                DataSet dataSet = new DataSet();
                connection.Open();
                SqlDataAdapter sqlDA = new SqlDataAdapter();
                sqlDA.SelectCommand = BuildQueryCommand(connection, storedProcName, parameters);
                sqlDA.Fill(dataSet, tableName);
                connection.Close();
                return dataSet;
            }
        }

          /// <summary>
          /// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
          /// </summary>
          /// <param name="connection">数据库连接</param>
          /// <param name="storedProcName">存储过程名</param>
          /// <param name="parameters">存储过程参数</param>
          /// <returns>SqlCommand</returns>
        public SqlCommand BuildQueryCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
          {
              SqlCommand command = new SqlCommand(storedProcName, connection);
              command.CommandType = CommandType.StoredProcedure;
              foreach (SqlParameter parameter in parameters)
              {
                  if (parameter != null)
                  {
                      // 检查未分配值的输出参数,将其分配以DBNull.Value.
                      if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
                          (parameter.Value == null))
                      {
                          parameter.Value = DBNull.Value;
                      }
                      command.Parameters.Add(parameter);
                  }
              }

              return command;
          }

        /// <summary>
        /// 执行存储过程，返回影响的行数		
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
 
        /// <returns></returns>
        public   int RunProcedure(string storedProcName, IDataParameter[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                int result;
                connection.Open();
                SqlCommand command = BuildIntCommand(connection, storedProcName, parameters);
             int   rowsAffected = command.ExecuteNonQuery();
                result = (int)command.Parameters["ReturnValue"].Value;
                //Connection.Close();
                return result;
            }
        }
        /// <summary>
        /// 创建 SqlCommand 对象实例(用来返回一个整数值)	
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlCommand 对象实例</returns>
        private   SqlCommand BuildIntCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
        {
            SqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
            command.Parameters.Add(new SqlParameter("ReturnValue",
                SqlDbType.Int, 4, ParameterDirection.ReturnValue,
                false, 0, 0, string.Empty, DataRowVersion.Default, null));
            return command;
        }
    }

}
