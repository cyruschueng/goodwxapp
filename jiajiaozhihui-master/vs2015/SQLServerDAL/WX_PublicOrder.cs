using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_PublicOrder
	/// </summary>
	public partial class WX_PublicOrder:IWX_PublicOrder
	{
		public WX_PublicOrder()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_PublicOrder"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_PublicOrder");
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
		public int Add(SfSoft.Model.WX_PublicOrder model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_PublicOrder(");
            strSql.Append("OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN)");
			strSql.Append(" values (");
            strSql.Append("@OpenID,@GoodID,@Name,@Address,@TelePhone,@Province,@City,@Remark,@OrderDate,@GoodsType,@IsSend,@Post,@Logistics,@OddNumber,@Payment,@SendDate,@Paymode,@Price,@PayNumber,@ActivityID,@Tradeno,@IsPay,@District,@Unit,@LogisticsSN)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,50),
					new SqlParameter("@GoodID", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,20),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@TelePhone", SqlDbType.NVarChar,11),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200),
					new SqlParameter("@OrderDate", SqlDbType.DateTime),
                    new SqlParameter("@GoodsType", SqlDbType.Int,4),
                    new SqlParameter("@IsSend", SqlDbType.Int,4),
                    new SqlParameter("@Post", SqlDbType.NVarChar,50),
					new SqlParameter("@Logistics", SqlDbType.NVarChar,100),
                    new SqlParameter("@OddNumber", SqlDbType.NVarChar,50),
                    new SqlParameter("@Payment", SqlDbType.Float,14),
                    new SqlParameter("@SendDate", SqlDbType.DateTime),
                    new SqlParameter("@Paymode", SqlDbType.Int),
                    new SqlParameter("@Price", SqlDbType.Decimal,9),
                    new SqlParameter("@PayNumber", SqlDbType.Int,4),
                    new SqlParameter("@ActivityID", SqlDbType.Int,4),
                    new SqlParameter("@Tradeno", SqlDbType.NVarChar,50),
                    new SqlParameter("@IsPay", SqlDbType.Int,4),
                    new SqlParameter("@District", SqlDbType.NVarChar,100),
                    new SqlParameter("@Unit", SqlDbType.NVarChar,50),
                    new SqlParameter("@LogisticsSN", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.GoodID;
			parameters[2].Value = model.Name;
			parameters[3].Value = model.Address;
			parameters[4].Value = model.TelePhone;
			parameters[5].Value = model.Province;
			parameters[6].Value = model.City;
			parameters[7].Value = model.Remark;
			parameters[8].Value = model.OrderDate;
            parameters[9].Value = model.GoodsType;
            parameters[10].Value = model.IsSend;
            parameters[11].Value = model.Post;
            parameters[12].Value = model.Logistics;
            parameters[13].Value = model.OddNumber;
            parameters[14].Value = model.Payment;
            parameters[15].Value = model.SendDate;
            parameters[16].Value = model.Paymode;
            parameters[17].Value = model.Price;
            parameters[18].Value = model.PayNumber;
            parameters[19].Value = model.ActivityID;
            parameters[20].Value = model.Tradeno;
            parameters[21].Value = model.IsPay;
            parameters[22].Value = model.District;
            parameters[23].Value = model.Unit;
            parameters[24].Value = model.LogisticsSN;

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
		public bool Update(SfSoft.Model.WX_PublicOrder model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_PublicOrder set ");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("GoodID=@GoodID,");
			strSql.Append("Name=@Name,");
			strSql.Append("Address=@Address,");
			strSql.Append("TelePhone=@TelePhone,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("Remark=@Remark,");
			strSql.Append("OrderDate=@OrderDate,");
            strSql.Append("GoodsType=@GoodsType,");
            strSql.Append("IsSend=@IsSend,");
            strSql.Append("Post=@Post,");
            strSql.Append("Logistics=@Logistics,");
            strSql.Append("OddNumber=@OddNumber,");
            strSql.Append("Payment=@Payment,");
            strSql.Append("SendDate=@SendDate,");
            strSql.Append("Paymode=@Paymode,");
            strSql.Append("Price=@Price,");
            strSql.Append("PayNumber=@PayNumber,");
            strSql.Append("ActivityID=@ActivityID,");
            strSql.Append("Tradeno=@Tradeno,");
            strSql.Append("IsPay=@IsPay,");
            strSql.Append("District=@District,");
            strSql.Append("Unit=@Unit,");
            strSql.Append("LogisticsSN=@LogisticsSN");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,50),
					new SqlParameter("@GoodID", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,20),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@TelePhone", SqlDbType.NVarChar,11),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200),
					new SqlParameter("@OrderDate", SqlDbType.DateTime),
                    new SqlParameter("@GoodsType", SqlDbType.Int,4),
                    new SqlParameter("@IsSend", SqlDbType.Int,4),
                    new SqlParameter("@Post", SqlDbType.NVarChar,50),
                    new SqlParameter("@Logistics", SqlDbType.NVarChar,100),
                    new SqlParameter("@OddNumber", SqlDbType.NVarChar,50),
                    new SqlParameter("@Payment", SqlDbType.Float,14),
                    new SqlParameter("@SendDate", SqlDbType.DateTime),
                    new SqlParameter("@Paymode", SqlDbType.Int,4),
                    new SqlParameter("@Price", SqlDbType.Decimal,9),
                    new SqlParameter("@PayNumber", SqlDbType.Int,4),
                    new SqlParameter("@ActivityID", SqlDbType.Int,4),
                    new SqlParameter("@Tradeno", SqlDbType.NVarChar,50),
                    new SqlParameter("@IsPay", SqlDbType.Int,4),
                    new SqlParameter("@District", SqlDbType.NVarChar,100),
                    new SqlParameter("@Unit", SqlDbType.NVarChar,50),
                    new SqlParameter("@LogisticsSN", SqlDbType.NVarChar,100),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.GoodID;
			parameters[2].Value = model.Name;
			parameters[3].Value = model.Address;
			parameters[4].Value = model.TelePhone;
			parameters[5].Value = model.Province;
			parameters[6].Value = model.City;
			parameters[7].Value = model.Remark;
			parameters[8].Value = model.OrderDate;
            parameters[9].Value = model.GoodsType;
            parameters[10].Value = model.IsSend;
            parameters[11].Value = model.Post;
            parameters[12].Value = model.Logistics;
            parameters[13].Value = model.OddNumber;
            parameters[14].Value = model.Payment;
            parameters[15].Value = model.SendDate;
            parameters[16].Value = model.Paymode;
            parameters[17].Value = model.Price;
            parameters[18].Value = model.PayNumber;
            parameters[19].Value = model.ActivityID;
            parameters[20].Value = model.Tradeno;
            parameters[21].Value = model.IsPay;
            parameters[22].Value = model.District;
            parameters[23].Value = model.Unit;
            parameters[24].Value = model.LogisticsSN;
			parameters[25].Value = model.ID;

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
			strSql.Append("delete from WX_PublicOrder ");
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
			strSql.Append("delete from WX_PublicOrder ");
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
		public SfSoft.Model.WX_PublicOrder GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN from WX_PublicOrder ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_PublicOrder model=new SfSoft.Model.WX_PublicOrder();
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
		public SfSoft.Model.WX_PublicOrder DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_PublicOrder model=new SfSoft.Model.WX_PublicOrder();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["OpenID"]!=null)
				{
					model.OpenID=row["OpenID"].ToString();
				}
				if(row["GoodID"]!=null && row["GoodID"].ToString()!="")
				{
					model.GoodID=int.Parse(row["GoodID"].ToString());
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["TelePhone"]!=null)
				{
					model.TelePhone=row["TelePhone"].ToString();
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
				if(row["OrderDate"]!=null && row["OrderDate"].ToString()!="")
				{
					model.OrderDate=DateTime.Parse(row["OrderDate"].ToString());
				}
                if (row["GoodsType"] != null && row["GoodsType"].ToString() != "")
                {
                    model.GoodsType = int.Parse(row["GoodsType"].ToString());
                }
                if (row["IsSend"] != null && row["IsSend"].ToString() != "")
                {
                    model.IsSend = int.Parse(row["IsSend"].ToString());
                }

                if (row["Post"] != null)
                {
                    model.Post = row["Post"].ToString();
                }

                if (row["Logistics"] != null)
                {
                    model.Logistics = row["Logistics"].ToString();
                }

                if (row["OddNumber"] != null)
                {
                    model.OddNumber = row["OddNumber"].ToString();
                }
                if (row["Payment"] != null && row["Payment"].ToString() != "")
                {
                    model.Payment = float.Parse(row["Payment"].ToString());
                }
                if (row["SendDate"] != null && row["SendDate"].ToString() != "")
                {
                    model.SendDate = DateTime.Parse(row["SendDate"].ToString());
                }
                if (row["Paymode"] != null && row["Paymode"].ToString() != "")
                {
                    model.Paymode = int.Parse(row["Paymode"].ToString());
                }
                if (row["Price"] != null && row["Price"].ToString() != "")
                {
                    model.Price = decimal.Parse(row["Price"].ToString());
                }
                if (row["PayNumber"] != null && row["PayNumber"].ToString() != "")
                {
                    model.PayNumber = int.Parse(row["PayNumber"].ToString());
                }
                if (row["ActivityID"] != null && row["ActivityID"].ToString() != "")
                {
                    model.ActivityID = int.Parse(row["ActivityID"].ToString());
                }
                if (row["Tradeno"] != null)
                {
                    model.Tradeno = row["Tradeno"].ToString();
                }
                if (row["IsPay"] != null && row["IsPay"].ToString() != "")
                {
                    model.IsPay = int.Parse(row["IsPay"].ToString());
                }
                if (row["District"] != null)
                {
                    model.District = row["District"].ToString();
                }
                if (row["Unit"] != null)
                {
                    model.Unit = row["Unit"].ToString();
                }
                if (row["LogisticsSN"] != null)
                {
                    model.LogisticsSN = row["LogisticsSN"].ToString();
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
            strSql.Append("select ID,OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN ");
			strSql.Append(" FROM WX_PublicOrder ");
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
            strSql.Append(" ID,OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN ");
			strSql.Append(" FROM WX_PublicOrder ");
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
			strSql.Append("select count(1) FROM WX_PublicOrder ");
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
			strSql.Append(")AS Row, T.*  from WX_PublicOrder T ");
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
			parameters[0].Value = "WX_PublicOrder";
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


        public Model.WX_PublicOrder GetModel(string openid, int goodsid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN from WX_PublicOrder ");
            strSql.Append(" where Openid=@Openid");
            strSql.Append(" and  GoodID=@GoodID");
            SqlParameter[] parameters = {
					new SqlParameter("@Openid", SqlDbType.NVarChar,50),
                    new SqlParameter("@GoodID", SqlDbType.Int,4)
			};
            parameters[0].Value = openid;
            parameters[1].Value = goodsid;

            SfSoft.Model.WX_PublicOrder model = new SfSoft.Model.WX_PublicOrder();
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


        public bool Exists(string mobile, string id)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_PublicOrder");
            strSql.Append(" where TelePhone=@TelePhone");
            strSql.Append(" and GoodID=@GoodID");
            SqlParameter[] parameters = {
					new SqlParameter("@TelePhone", SqlDbType.NVarChar,11),
                    new SqlParameter("@GoodID", SqlDbType.Int,4)
			};
            parameters[0].Value = mobile;
            parameters[1].Value = id;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 通过支付订单查找订单
        /// </summary>
        /// <param name="tradeno"></param>
        /// <returns></returns>
        public Model.WX_PublicOrder GetModelByTradeno(string tradeno)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,GoodID,Name,Address,TelePhone,Province,City,Remark,OrderDate,GoodsType,IsSend,Post,Logistics,OddNumber,Payment,SendDate,Paymode,Price,PayNumber,ActivityID,Tradeno,IsPay,District,Unit,LogisticsSN from WX_PublicOrder ");
            strSql.Append(" where Tradeno=@Tradeno");
            SqlParameter[] parameters = {
					new SqlParameter("@Tradeno", SqlDbType.NVarChar,100)
			};
            parameters[0].Value = tradeno;

            SfSoft.Model.WX_PublicOrder model = new SfSoft.Model.WX_PublicOrder();
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

