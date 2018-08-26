using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_EmpInfo。


    /// </summary>
    public class Pub_EmpInfo : IPub_EmpInfo
    {
        public Pub_EmpInfo()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录


        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_EmpInfo");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

 
 
        /// <summary>
        /// 增加一条数据


        /// </summary>
        public int Add(SfSoft.Model.Pub_EmpInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_EmpInfo(");
            strSql.Append("UserID,UserName,CnName,EnName,EmpID,PositionsID,Positions,Fax,WorkPlace,Title,Grade,PYState,ZZState,Height,DGDate,ZZDate,TryDays,OrderID,Photo,Tel,PhoneExt,Email,Mobile,MSN,QQ,TemAddr,TemTel,Addr,AddrTel,OthersContact,OthersRel,OthersPhone,BirthDay,Age,Sex,Marriage,IDCard,DriveCharter,Nationality,NativePlace,Nation,HKPlace,ArcPlace,DocSubmit,HaveDoc,BestXL,ZC,ComputerLevel,FLKind,FirstSchool,FirstSpecialty,EnLevel,SecSchool,SecSpecialty,Tec,WorkCompanys,MySpec,MyLove,PrisePunsh,Resume,CBArea,CBStartDate,CBAmt,CBRemark,CBEndDate,ContractDate,LeaveDate,LeaveResign,SerYear,HolidayYear,ctime,mtime,conflictCtrlID,owner,creator,IsSysUser,Account)");
            strSql.Append(" values (");
            strSql.Append("@UserID,@UserName,@CnName,@EnName,@EmpID,@PositionsID,@Positions,@Fax,@WorkPlace,@Title,@Grade,@PYState,@ZZState,@Height,@DGDate,@ZZDate,@TryDays,@OrderID,@Photo,@Tel,@PhoneExt,@Email,@Mobile,@MSN,@QQ,@TemAddr,@TemTel,@Addr,@AddrTel,@OthersContact,@OthersRel,@OthersPhone,@BirthDay,@Age,@Sex,@Marriage,@IDCard,@DriveCharter,@Nationality,@NativePlace,@Nation,@HKPlace,@ArcPlace,@DocSubmit,@HaveDoc,@BestXL,@ZC,@ComputerLevel,@FLKind,@FirstSchool,@FirstSpecialty,@EnLevel,@SecSchool,@SecSpecialty,@Tec,@WorkCompanys,@MySpec,@MyLove,@PrisePunsh,@Resume,@CBArea,@CBStartDate,@CBAmt,@CBRemark,@CBEndDate,@ContractDate,@LeaveDate,@LeaveResign,@SerYear,@HolidayYear,@ctime,@mtime,@conflictCtrlID,@owner,@creator,@IsSysUser,@Account)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@UserName", SqlDbType.NVarChar,255),
					new SqlParameter("@CnName", SqlDbType.NVarChar,30),
					new SqlParameter("@EnName", SqlDbType.NVarChar,30),
					new SqlParameter("@EmpID", SqlDbType.NVarChar,30),
					new SqlParameter("@PositionsID", SqlDbType.NVarChar,10),
					new SqlParameter("@Positions", SqlDbType.NVarChar,30),
					new SqlParameter("@Fax", SqlDbType.NVarChar,30),
					new SqlParameter("@WorkPlace", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,15),
					new SqlParameter("@Grade", SqlDbType.NVarChar,5),
					new SqlParameter("@PYState", SqlDbType.NVarChar,10),
					new SqlParameter("@ZZState", SqlDbType.NVarChar,10),
					new SqlParameter("@Height", SqlDbType.NVarChar,10),
					new SqlParameter("@DGDate", SqlDbType.DateTime),
					new SqlParameter("@ZZDate", SqlDbType.DateTime),
					new SqlParameter("@TryDays", SqlDbType.Int,4),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@Photo", SqlDbType.NVarChar,255),
					new SqlParameter("@Tel", SqlDbType.NVarChar,50),
					new SqlParameter("@PhoneExt", SqlDbType.NVarChar,10),
					new SqlParameter("@Email", SqlDbType.NVarChar,90),
					new SqlParameter("@Mobile", SqlDbType.NVarChar,50),
					new SqlParameter("@MSN", SqlDbType.NVarChar,50),
					new SqlParameter("@QQ", SqlDbType.NVarChar,15),
					new SqlParameter("@TemAddr", SqlDbType.NVarChar,90),
					new SqlParameter("@TemTel", SqlDbType.NVarChar,30),
					new SqlParameter("@Addr", SqlDbType.NVarChar,90),
					new SqlParameter("@AddrTel", SqlDbType.NVarChar,30),
					new SqlParameter("@OthersContact", SqlDbType.NVarChar,30),
					new SqlParameter("@OthersRel", SqlDbType.NVarChar,15),
					new SqlParameter("@OthersPhone", SqlDbType.NVarChar,30),
					new SqlParameter("@BirthDay", SqlDbType.DateTime),
					new SqlParameter("@Age", SqlDbType.Int,4),
					new SqlParameter("@Sex", SqlDbType.NVarChar,5),
					new SqlParameter("@Marriage", SqlDbType.NVarChar,5),
					new SqlParameter("@IDCard", SqlDbType.NVarChar,20),
					new SqlParameter("@DriveCharter", SqlDbType.NVarChar,20),
					new SqlParameter("@Nationality", SqlDbType.NVarChar,80),
					new SqlParameter("@NativePlace", SqlDbType.NVarChar,20),
					new SqlParameter("@Nation", SqlDbType.NVarChar,20),
					new SqlParameter("@HKPlace", SqlDbType.NVarChar,90),
					new SqlParameter("@ArcPlace", SqlDbType.NVarChar,90),
					new SqlParameter("@DocSubmit", SqlDbType.NVarChar,10),
					new SqlParameter("@HaveDoc", SqlDbType.NVarChar,90),
					new SqlParameter("@BestXL", SqlDbType.NVarChar,20),
					new SqlParameter("@ZC", SqlDbType.NVarChar,20),
					new SqlParameter("@ComputerLevel", SqlDbType.NVarChar,20),
					new SqlParameter("@FLKind", SqlDbType.NVarChar,20),
					new SqlParameter("@FirstSchool", SqlDbType.NVarChar,50),
					new SqlParameter("@FirstSpecialty", SqlDbType.NVarChar,50),
					new SqlParameter("@EnLevel", SqlDbType.NVarChar,10),
					new SqlParameter("@SecSchool", SqlDbType.NVarChar,50),
					new SqlParameter("@SecSpecialty", SqlDbType.NVarChar,50),
					new SqlParameter("@Tec", SqlDbType.Text),
					new SqlParameter("@WorkCompanys", SqlDbType.Text),
					new SqlParameter("@MySpec", SqlDbType.Text),
					new SqlParameter("@MyLove", SqlDbType.Text),
					new SqlParameter("@PrisePunsh", SqlDbType.Text),
					new SqlParameter("@Resume", SqlDbType.Text),
					new SqlParameter("@CBArea", SqlDbType.NVarChar,50),
					new SqlParameter("@CBStartDate", SqlDbType.DateTime),
					new SqlParameter("@CBAmt", SqlDbType.Float,8),
					new SqlParameter("@CBRemark", SqlDbType.NVarChar,500),
					new SqlParameter("@CBEndDate", SqlDbType.DateTime),
					new SqlParameter("@ContractDate", SqlDbType.DateTime),
					new SqlParameter("@LeaveDate", SqlDbType.DateTime),
					new SqlParameter("@LeaveResign", SqlDbType.NVarChar,500),
					new SqlParameter("@SerYear", SqlDbType.Float,8),
					new SqlParameter("@HolidayYear", SqlDbType.Int,4),
					new SqlParameter("@ctime", SqlDbType.DateTime),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@conflictCtrlID", SqlDbType.NVarChar,10),
					new SqlParameter("@owner", SqlDbType.Int,4),
					new SqlParameter("@creator", SqlDbType.Int,4),
					new SqlParameter("@IsSysUser", SqlDbType.NVarChar,5),
					new SqlParameter("@Account", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.UserID;
            parameters[1].Value = model.UserName;
            parameters[2].Value = model.CnName;
            parameters[3].Value = model.EnName;
            parameters[4].Value = model.EmpID;
            parameters[5].Value = model.PositionsID;
            parameters[6].Value = model.Positions;
            parameters[7].Value = model.Fax;
            parameters[8].Value = model.WorkPlace;
            parameters[9].Value = model.Title;
            parameters[10].Value = model.Grade;
            parameters[11].Value = model.PYState;
            parameters[12].Value = model.ZZState;
            parameters[13].Value = model.Height;
            parameters[14].Value = model.DGDate;
            parameters[15].Value = model.ZZDate;
            parameters[16].Value = model.TryDays;
            parameters[17].Value = model.OrderID;
            parameters[18].Value = model.Photo;
            parameters[19].Value = model.Tel;
            parameters[20].Value = model.PhoneExt;
            parameters[21].Value = model.Email;
            parameters[22].Value = model.Mobile;
            parameters[23].Value = model.MSN;
            parameters[24].Value = model.QQ;
            parameters[25].Value = model.TemAddr;
            parameters[26].Value = model.TemTel;
            parameters[27].Value = model.Addr;
            parameters[28].Value = model.AddrTel;
            parameters[29].Value = model.OthersContact;
            parameters[30].Value = model.OthersRel;
            parameters[31].Value = model.OthersPhone;
            parameters[32].Value = model.BirthDay;
            parameters[33].Value = model.Age;
            parameters[34].Value = model.Sex;
            parameters[35].Value = model.Marriage;
            parameters[36].Value = model.IDCard;
            parameters[37].Value = model.DriveCharter;
            parameters[38].Value = model.Nationality;
            parameters[39].Value = model.NativePlace;
            parameters[40].Value = model.Nation;
            parameters[41].Value = model.HKPlace;
            parameters[42].Value = model.ArcPlace;
            parameters[43].Value = model.DocSubmit;
            parameters[44].Value = model.HaveDoc;
            parameters[45].Value = model.BestXL;
            parameters[46].Value = model.ZC;
            parameters[47].Value = model.ComputerLevel;
            parameters[48].Value = model.FLKind;
            parameters[49].Value = model.FirstSchool;
            parameters[50].Value = model.FirstSpecialty;
            parameters[51].Value = model.EnLevel;
            parameters[52].Value = model.SecSchool;
            parameters[53].Value = model.SecSpecialty;
            parameters[54].Value = model.Tec;
            parameters[55].Value = model.WorkCompanys;
            parameters[56].Value = model.MySpec;
            parameters[57].Value = model.MyLove;
            parameters[58].Value = model.PrisePunsh;
            parameters[59].Value = model.Resume;
            parameters[60].Value = model.CBArea;
            parameters[61].Value = model.CBStartDate;
            parameters[62].Value = model.CBAmt;
            parameters[63].Value = model.CBRemark;
            parameters[64].Value = model.CBEndDate;
            parameters[65].Value = model.ContractDate;
            parameters[66].Value = model.LeaveDate;
            parameters[67].Value = model.LeaveResign;
            parameters[68].Value = model.SerYear;
            parameters[69].Value = model.HolidayYear;
            parameters[70].Value = model.ctime;
            parameters[71].Value = model.mtime;
            parameters[72].Value = model.conflictCtrlID;
            parameters[73].Value = model.owner;
            parameters[74].Value = model.creator;
            parameters[75].Value = model.IsSysUser;
            parameters[76].Value = model.Account;

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
        public void Update(SfSoft.Model.Pub_EmpInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_EmpInfo set ");
            strSql.Append("UserID=@UserID,");
            strSql.Append("UserName=@UserName,");
            strSql.Append("CnName=@CnName,");
            strSql.Append("EnName=@EnName,");
            strSql.Append("EmpID=@EmpID,");
            strSql.Append("PositionsID=@PositionsID,");
            strSql.Append("Positions=@Positions,");
            strSql.Append("Fax=@Fax,");
            strSql.Append("WorkPlace=@WorkPlace,");
            strSql.Append("Title=@Title,");
            strSql.Append("Grade=@Grade,");
            strSql.Append("PYState=@PYState,");
            strSql.Append("ZZState=@ZZState,");
            strSql.Append("Height=@Height,");
            strSql.Append("DGDate=@DGDate,");
            strSql.Append("ZZDate=@ZZDate,");
            strSql.Append("TryDays=@TryDays,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("Photo=@Photo,");
            strSql.Append("Tel=@Tel,");
            strSql.Append("PhoneExt=@PhoneExt,");
            strSql.Append("Email=@Email,");
            strSql.Append("Mobile=@Mobile,");
            strSql.Append("MSN=@MSN,");
            strSql.Append("QQ=@QQ,");
            strSql.Append("TemAddr=@TemAddr,");
            strSql.Append("TemTel=@TemTel,");
            strSql.Append("Addr=@Addr,");
            strSql.Append("AddrTel=@AddrTel,");
            strSql.Append("OthersContact=@OthersContact,");
            strSql.Append("OthersRel=@OthersRel,");
            strSql.Append("OthersPhone=@OthersPhone,");
            strSql.Append("BirthDay=@BirthDay,");
            strSql.Append("Age=@Age,");
            strSql.Append("Sex=@Sex,");
            strSql.Append("Marriage=@Marriage,");
            strSql.Append("IDCard=@IDCard,");
            strSql.Append("DriveCharter=@DriveCharter,");
            strSql.Append("Nationality=@Nationality,");
            strSql.Append("NativePlace=@NativePlace,");
            strSql.Append("Nation=@Nation,");
            strSql.Append("HKPlace=@HKPlace,");
            strSql.Append("ArcPlace=@ArcPlace,");
            strSql.Append("DocSubmit=@DocSubmit,");
            strSql.Append("HaveDoc=@HaveDoc,");
            strSql.Append("BestXL=@BestXL,");
            strSql.Append("ZC=@ZC,");
            strSql.Append("ComputerLevel=@ComputerLevel,");
            strSql.Append("FLKind=@FLKind,");
            strSql.Append("FirstSchool=@FirstSchool,");
            strSql.Append("FirstSpecialty=@FirstSpecialty,");
            strSql.Append("EnLevel=@EnLevel,");
            strSql.Append("SecSchool=@SecSchool,");
            strSql.Append("SecSpecialty=@SecSpecialty,");
            strSql.Append("Tec=@Tec,");
            strSql.Append("WorkCompanys=@WorkCompanys,");
            strSql.Append("MySpec=@MySpec,");
            strSql.Append("MyLove=@MyLove,");
            strSql.Append("PrisePunsh=@PrisePunsh,");
            strSql.Append("Resume=@Resume,");
            strSql.Append("CBArea=@CBArea,");
            strSql.Append("CBStartDate=@CBStartDate,");
            strSql.Append("CBAmt=@CBAmt,");
            strSql.Append("CBRemark=@CBRemark,");
            strSql.Append("CBEndDate=@CBEndDate,");
            strSql.Append("ContractDate=@ContractDate,");
            strSql.Append("LeaveDate=@LeaveDate,");
            strSql.Append("LeaveResign=@LeaveResign,");
            strSql.Append("SerYear=@SerYear,");
            strSql.Append("HolidayYear=@HolidayYear,");
            strSql.Append("ctime=@ctime,");
            strSql.Append("mtime=@mtime,");
            strSql.Append("conflictCtrlID=@conflictCtrlID,");
            strSql.Append("owner=@owner,");
            strSql.Append("creator=@creator,");
            strSql.Append("IsSysUser=@IsSysUser,");
            strSql.Append("Account=@Account");
            strSql.Append(" where UserName=@UserName ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@UserName", SqlDbType.NVarChar,255),
					new SqlParameter("@CnName", SqlDbType.NVarChar,30),
					new SqlParameter("@EnName", SqlDbType.NVarChar,30),
					new SqlParameter("@EmpID", SqlDbType.NVarChar,30),
					new SqlParameter("@PositionsID", SqlDbType.NVarChar,10),
					new SqlParameter("@Positions", SqlDbType.NVarChar,30),
					new SqlParameter("@Fax", SqlDbType.NVarChar,30),
					new SqlParameter("@WorkPlace", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,15),
					new SqlParameter("@Grade", SqlDbType.NVarChar,5),
					new SqlParameter("@PYState", SqlDbType.NVarChar,10),
					new SqlParameter("@ZZState", SqlDbType.NVarChar,10),
					new SqlParameter("@Height", SqlDbType.NVarChar,10),
					new SqlParameter("@DGDate", SqlDbType.DateTime),
					new SqlParameter("@ZZDate", SqlDbType.DateTime),
					new SqlParameter("@TryDays", SqlDbType.Int,4),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@Photo", SqlDbType.NVarChar,255),
					new SqlParameter("@Tel", SqlDbType.NVarChar,50),
					new SqlParameter("@PhoneExt", SqlDbType.NVarChar,10),
					new SqlParameter("@Email", SqlDbType.NVarChar,90),
					new SqlParameter("@Mobile", SqlDbType.NVarChar,50),
					new SqlParameter("@MSN", SqlDbType.NVarChar,50),
					new SqlParameter("@QQ", SqlDbType.NVarChar,15),
					new SqlParameter("@TemAddr", SqlDbType.NVarChar,90),
					new SqlParameter("@TemTel", SqlDbType.NVarChar,30),
					new SqlParameter("@Addr", SqlDbType.NVarChar,90),
					new SqlParameter("@AddrTel", SqlDbType.NVarChar,30),
					new SqlParameter("@OthersContact", SqlDbType.NVarChar,30),
					new SqlParameter("@OthersRel", SqlDbType.NVarChar,15),
					new SqlParameter("@OthersPhone", SqlDbType.NVarChar,30),
					new SqlParameter("@BirthDay", SqlDbType.DateTime),
					new SqlParameter("@Age", SqlDbType.Int,4),
					new SqlParameter("@Sex", SqlDbType.NVarChar,5),
					new SqlParameter("@Marriage", SqlDbType.NVarChar,5),
					new SqlParameter("@IDCard", SqlDbType.NVarChar,20),
					new SqlParameter("@DriveCharter", SqlDbType.NVarChar,20),
					new SqlParameter("@Nationality", SqlDbType.NVarChar,80),
					new SqlParameter("@NativePlace", SqlDbType.NVarChar,20),
					new SqlParameter("@Nation", SqlDbType.NVarChar,20),
					new SqlParameter("@HKPlace", SqlDbType.NVarChar,90),
					new SqlParameter("@ArcPlace", SqlDbType.NVarChar,90),
					new SqlParameter("@DocSubmit", SqlDbType.NVarChar,10),
					new SqlParameter("@HaveDoc", SqlDbType.NVarChar,90),
					new SqlParameter("@BestXL", SqlDbType.NVarChar,20),
					new SqlParameter("@ZC", SqlDbType.NVarChar,20),
					new SqlParameter("@ComputerLevel", SqlDbType.NVarChar,20),
					new SqlParameter("@FLKind", SqlDbType.NVarChar,20),
					new SqlParameter("@FirstSchool", SqlDbType.NVarChar,50),
					new SqlParameter("@FirstSpecialty", SqlDbType.NVarChar,50),
					new SqlParameter("@EnLevel", SqlDbType.NVarChar,10),
					new SqlParameter("@SecSchool", SqlDbType.NVarChar,50),
					new SqlParameter("@SecSpecialty", SqlDbType.NVarChar,50),
					new SqlParameter("@Tec", SqlDbType.Text),
					new SqlParameter("@WorkCompanys", SqlDbType.Text),
					new SqlParameter("@MySpec", SqlDbType.Text),
					new SqlParameter("@MyLove", SqlDbType.Text),
					new SqlParameter("@PrisePunsh", SqlDbType.Text),
					new SqlParameter("@Resume", SqlDbType.Text),
					new SqlParameter("@CBArea", SqlDbType.NVarChar,50),
					new SqlParameter("@CBStartDate", SqlDbType.DateTime),
					new SqlParameter("@CBAmt", SqlDbType.Float,8),
					new SqlParameter("@CBRemark", SqlDbType.NVarChar,500),
					new SqlParameter("@CBEndDate", SqlDbType.DateTime),
					new SqlParameter("@ContractDate", SqlDbType.DateTime),
					new SqlParameter("@LeaveDate", SqlDbType.DateTime),
					new SqlParameter("@LeaveResign", SqlDbType.NVarChar,500),
					new SqlParameter("@SerYear", SqlDbType.Float,8),
					new SqlParameter("@HolidayYear", SqlDbType.Int,4),
					new SqlParameter("@ctime", SqlDbType.DateTime),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@conflictCtrlID", SqlDbType.NVarChar,10),
					new SqlParameter("@owner", SqlDbType.Int,4),
					new SqlParameter("@creator", SqlDbType.Int,4),
            		new SqlParameter("@IsSysUser", SqlDbType.NVarChar,5),
					new SqlParameter("@Account", SqlDbType.NVarChar,50) 

            };
            parameters[0].Value = model.ID;
            parameters[1].Value = model.UserID;
            parameters[2].Value = model.UserName;
            parameters[3].Value = model.CnName;
            parameters[4].Value = model.EnName;
            parameters[5].Value = model.EmpID;
            parameters[6].Value = model.PositionsID;
            parameters[7].Value = model.Positions;
            parameters[8].Value = model.Fax;
            parameters[9].Value = model.WorkPlace;
            parameters[10].Value = model.Title;
            parameters[11].Value = model.Grade;
            parameters[12].Value = model.PYState;
            parameters[13].Value = model.ZZState;
            parameters[14].Value = model.Height;
            parameters[15].Value = model.DGDate;
            parameters[16].Value = model.ZZDate;
            parameters[17].Value = model.TryDays;
            parameters[18].Value = model.OrderID;
            parameters[19].Value = model.Photo;
            parameters[20].Value = model.Tel;
            parameters[21].Value = model.PhoneExt;
            parameters[22].Value = model.Email;
            parameters[23].Value = model.Mobile;
            parameters[24].Value = model.MSN;
            parameters[25].Value = model.QQ;
            parameters[26].Value = model.TemAddr;
            parameters[27].Value = model.TemTel;
            parameters[28].Value = model.Addr;
            parameters[29].Value = model.AddrTel;
            parameters[30].Value = model.OthersContact;
            parameters[31].Value = model.OthersRel;
            parameters[32].Value = model.OthersPhone;
            parameters[33].Value = model.BirthDay;
            parameters[34].Value = model.Age;
            parameters[35].Value = model.Sex;
            parameters[36].Value = model.Marriage;
            parameters[37].Value = model.IDCard;
            parameters[38].Value = model.DriveCharter;
            parameters[39].Value = model.Nationality;
            parameters[40].Value = model.NativePlace;
            parameters[41].Value = model.Nation;
            parameters[42].Value = model.HKPlace;
            parameters[43].Value = model.ArcPlace;
            parameters[44].Value = model.DocSubmit;
            parameters[45].Value = model.HaveDoc;
            parameters[46].Value = model.BestXL;
            parameters[47].Value = model.ZC;
            parameters[48].Value = model.ComputerLevel;
            parameters[49].Value = model.FLKind;
            parameters[50].Value = model.FirstSchool;
            parameters[51].Value = model.FirstSpecialty;
            parameters[52].Value = model.EnLevel;
            parameters[53].Value = model.SecSchool;
            parameters[54].Value = model.SecSpecialty;
            parameters[55].Value = model.Tec;
            parameters[56].Value = model.WorkCompanys;
            parameters[57].Value = model.MySpec;
            parameters[58].Value = model.MyLove;
            parameters[59].Value = model.PrisePunsh;
            parameters[60].Value = model.Resume;
            parameters[61].Value = model.CBArea;
            parameters[62].Value = model.CBStartDate;
            parameters[63].Value = model.CBAmt;
            parameters[64].Value = model.CBRemark;
            parameters[65].Value = model.CBEndDate;
            parameters[66].Value = model.ContractDate;
            parameters[67].Value = model.LeaveDate;
            parameters[68].Value = model.LeaveResign;
            parameters[69].Value = model.SerYear;
            parameters[70].Value = model.HolidayYear;
            parameters[71].Value = model.ctime;
            parameters[72].Value = model.mtime;
            parameters[73].Value = model.conflictCtrlID;
            parameters[74].Value = model.owner;
            parameters[75].Value = model.creator;
            parameters[76].Value = model.IsSysUser;
            parameters[77].Value = model.Account;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

 

        /// <summary>
        /// 删除一条数据


        /// </summary>
        public void Delete(string UserName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_EmpInfo ");
            strSql.Append(" where UserName=@UserName ");
            SqlParameter[] parameters = {
					new SqlParameter("@UserName", SqlDbType.NVarChar,256)};
            parameters[0].Value = UserName;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,UserID,UserName,CnName,EnName,EmpID,PositionsID,Positions,Fax,WorkPlace,Title,Grade,PYState,ZZState,Height,DGDate,ZZDate,TryDays,OrderID,Photo,Tel,PhoneExt,Email,Mobile,MSN,QQ,TemAddr,TemTel,Addr,AddrTel,OthersContact,OthersRel,OthersPhone,BirthDay,Age,Sex,Marriage,IDCard,DriveCharter,Nationality,NativePlace,Nation,HKPlace,ArcPlace,DocSubmit,HaveDoc,BestXL,ZC,ComputerLevel,FLKind,FirstSchool,FirstSpecialty,EnLevel,SecSchool,SecSpecialty,Tec,WorkCompanys,MySpec,MyLove,PrisePunsh,Resume,CBArea,CBStartDate,CBAmt,CBRemark,CBEndDate,ContractDate,LeaveDate,LeaveResign,SerYear,HolidayYear,ctime,mtime,conflictCtrlID,owner,creator,IsSysUser,Account from Pub_EmpInfo ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_EmpInfo model = new SfSoft.Model.Pub_EmpInfo();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = new Guid(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.EnName = ds.Tables[0].Rows[0]["EnName"].ToString();
                model.EmpID = ds.Tables[0].Rows[0]["EmpID"].ToString();
                model.PositionsID = ds.Tables[0].Rows[0]["PositionsID"].ToString();
                model.Positions = ds.Tables[0].Rows[0]["Positions"].ToString();
                model.Fax = ds.Tables[0].Rows[0]["Fax"].ToString();
                model.WorkPlace = ds.Tables[0].Rows[0]["WorkPlace"].ToString();
                model.Title = ds.Tables[0].Rows[0]["Title"].ToString();
                model.Grade = ds.Tables[0].Rows[0]["Grade"].ToString();
                model.PYState = ds.Tables[0].Rows[0]["PYState"].ToString();
                model.ZZState = ds.Tables[0].Rows[0]["ZZState"].ToString();
                model.Height = ds.Tables[0].Rows[0]["Height"].ToString();
                if (ds.Tables[0].Rows[0]["DGDate"].ToString() != "")
                {
                    model.DGDate = DateTime.Parse(ds.Tables[0].Rows[0]["DGDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ZZDate"].ToString() != "")
                {
                    model.ZZDate = DateTime.Parse(ds.Tables[0].Rows[0]["ZZDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["TryDays"].ToString() != "")
                {
                    model.TryDays = int.Parse(ds.Tables[0].Rows[0]["TryDays"].ToString());
                }
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                model.Photo = ds.Tables[0].Rows[0]["Photo"].ToString();
                model.Tel = ds.Tables[0].Rows[0]["Tel"].ToString();
                model.PhoneExt = ds.Tables[0].Rows[0]["PhoneExt"].ToString();
                model.Email = ds.Tables[0].Rows[0]["Email"].ToString();
                model.Mobile = ds.Tables[0].Rows[0]["Mobile"].ToString();
                model.MSN = ds.Tables[0].Rows[0]["MSN"].ToString();
                model.QQ = ds.Tables[0].Rows[0]["QQ"].ToString();
                model.TemAddr = ds.Tables[0].Rows[0]["TemAddr"].ToString();
                model.TemTel = ds.Tables[0].Rows[0]["TemTel"].ToString();
                model.Addr = ds.Tables[0].Rows[0]["Addr"].ToString();
                model.AddrTel = ds.Tables[0].Rows[0]["AddrTel"].ToString();
                model.OthersContact = ds.Tables[0].Rows[0]["OthersContact"].ToString();
                model.OthersRel = ds.Tables[0].Rows[0]["OthersRel"].ToString();
                model.OthersPhone = ds.Tables[0].Rows[0]["OthersPhone"].ToString();
                if (ds.Tables[0].Rows[0]["BirthDay"].ToString() != "")
                {
                    model.BirthDay = DateTime.Parse(ds.Tables[0].Rows[0]["BirthDay"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Age"].ToString() != "")
                {
                    model.Age = int.Parse(ds.Tables[0].Rows[0]["Age"].ToString());
                }
                model.Sex = ds.Tables[0].Rows[0]["Sex"].ToString();
                model.Marriage = ds.Tables[0].Rows[0]["Marriage"].ToString();
                model.IDCard = ds.Tables[0].Rows[0]["IDCard"].ToString();
                model.DriveCharter = ds.Tables[0].Rows[0]["DriveCharter"].ToString();
                model.Nationality = ds.Tables[0].Rows[0]["Nationality"].ToString();
                model.NativePlace = ds.Tables[0].Rows[0]["NativePlace"].ToString();
                model.Nation = ds.Tables[0].Rows[0]["Nation"].ToString();
                model.HKPlace = ds.Tables[0].Rows[0]["HKPlace"].ToString();
                model.ArcPlace = ds.Tables[0].Rows[0]["ArcPlace"].ToString();
                model.DocSubmit = ds.Tables[0].Rows[0]["DocSubmit"].ToString();
                model.HaveDoc = ds.Tables[0].Rows[0]["HaveDoc"].ToString();
                model.BestXL = ds.Tables[0].Rows[0]["BestXL"].ToString();
                model.ZC = ds.Tables[0].Rows[0]["ZC"].ToString();
                model.ComputerLevel = ds.Tables[0].Rows[0]["ComputerLevel"].ToString();
                model.FLKind = ds.Tables[0].Rows[0]["FLKind"].ToString();
                model.FirstSchool = ds.Tables[0].Rows[0]["FirstSchool"].ToString();
                model.FirstSpecialty = ds.Tables[0].Rows[0]["FirstSpecialty"].ToString();
                model.EnLevel = ds.Tables[0].Rows[0]["EnLevel"].ToString();
                model.SecSchool = ds.Tables[0].Rows[0]["SecSchool"].ToString();
                model.SecSpecialty = ds.Tables[0].Rows[0]["SecSpecialty"].ToString();
                model.Tec = ds.Tables[0].Rows[0]["Tec"].ToString();
                model.WorkCompanys = ds.Tables[0].Rows[0]["WorkCompanys"].ToString();
                model.MySpec = ds.Tables[0].Rows[0]["MySpec"].ToString();
                model.MyLove = ds.Tables[0].Rows[0]["MyLove"].ToString();
                model.PrisePunsh = ds.Tables[0].Rows[0]["PrisePunsh"].ToString();
                model.Resume = ds.Tables[0].Rows[0]["Resume"].ToString();
                model.CBArea = ds.Tables[0].Rows[0]["CBArea"].ToString();
                if (ds.Tables[0].Rows[0]["CBStartDate"].ToString() != "")
                {
                    model.CBStartDate = DateTime.Parse(ds.Tables[0].Rows[0]["CBStartDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CBAmt"].ToString() != "")
                {
                    model.CBAmt = decimal.Parse(ds.Tables[0].Rows[0]["CBAmt"].ToString());
                }
                model.CBRemark = ds.Tables[0].Rows[0]["CBRemark"].ToString();
                if (ds.Tables[0].Rows[0]["CBEndDate"].ToString() != "")
                {
                    model.CBEndDate = DateTime.Parse(ds.Tables[0].Rows[0]["CBEndDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ContractDate"].ToString() != "")
                {
                    model.ContractDate = DateTime.Parse(ds.Tables[0].Rows[0]["ContractDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["LeaveDate"].ToString() != "")
                {
                    model.LeaveDate = DateTime.Parse(ds.Tables[0].Rows[0]["LeaveDate"].ToString());
                }
                model.LeaveResign = ds.Tables[0].Rows[0]["LeaveResign"].ToString();
                if (ds.Tables[0].Rows[0]["SerYear"].ToString() != "")
                {
                    model.SerYear = decimal.Parse(ds.Tables[0].Rows[0]["SerYear"].ToString());
                }
                if (ds.Tables[0].Rows[0]["HolidayYear"].ToString() != "")
                {
                    model.HolidayYear = int.Parse(ds.Tables[0].Rows[0]["HolidayYear"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ctime"].ToString() != "")
                {
                    model.ctime = DateTime.Parse(ds.Tables[0].Rows[0]["ctime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["mtime"].ToString() != "")
                {
                    model.mtime = DateTime.Parse(ds.Tables[0].Rows[0]["mtime"].ToString());
                }
                model.conflictCtrlID = ds.Tables[0].Rows[0]["conflictCtrlID"].ToString();
                if (ds.Tables[0].Rows[0]["owner"].ToString() != "")
                {
                    model.owner = int.Parse(ds.Tables[0].Rows[0]["owner"].ToString());
                }
                if (ds.Tables[0].Rows[0]["creator"].ToString() != "")
                {
                    model.creator = int.Parse(ds.Tables[0].Rows[0]["creator"].ToString());
                }
                model.IsSysUser = ds.Tables[0].Rows[0]["IsSysUser"].ToString();
                model.Account = ds.Tables[0].Rows[0]["Account"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetEmpModel(string UserName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UserID,UserName,CnName,EnName,EmpID,PositionsID,Positions,Fax,WorkPlace,Title,Grade,PYState,ZZState,Height,DGDate,ZZDate,TryDays,OrderID,Photo,Tel,PhoneExt,Email,Mobile,MSN,QQ,TemAddr,TemTel,Addr,AddrTel,OthersContact,OthersRel,OthersPhone,BirthDay,Age,Sex,Marriage,IDCard,DriveCharter,Nationality,NativePlace,Nation,HKPlace,ArcPlace,DocSubmit,HaveDoc,BestXL,ZC,ComputerLevel,FLKind,FirstSchool,FirstSpecialty,EnLevel,SecSchool,SecSpecialty,Tec,WorkCompanys,MySpec,MyLove,PrisePunsh,Resume,CBArea,CBStartDate,CBAmt,CBRemark,CBEndDate,ContractDate,LeaveDate,LeaveResign,SerYear,HolidayYear,ctime,mtime,conflictCtrlID,owner,creator,IsSysUser,Account from Pub_EmpInfo ");
            strSql.Append(" where UserName=@UserName ");
            SqlParameter[] parameters = {
					new SqlParameter("@UserName", SqlDbType.NVarChar,256)};
            parameters[0].Value = UserName;

            SfSoft.Model.Pub_EmpInfo model = new SfSoft.Model.Pub_EmpInfo();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = new Guid(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.EnName = ds.Tables[0].Rows[0]["EnName"].ToString();
                model.EmpID = ds.Tables[0].Rows[0]["EmpID"].ToString();
                model.PositionsID = ds.Tables[0].Rows[0]["PositionsID"].ToString();
                model.Positions = ds.Tables[0].Rows[0]["Positions"].ToString();
                model.Fax = ds.Tables[0].Rows[0]["Fax"].ToString();
                model.WorkPlace = ds.Tables[0].Rows[0]["WorkPlace"].ToString();
                model.Title = ds.Tables[0].Rows[0]["Title"].ToString();
                model.Grade = ds.Tables[0].Rows[0]["Grade"].ToString();
                model.PYState = ds.Tables[0].Rows[0]["PYState"].ToString();
                model.ZZState = ds.Tables[0].Rows[0]["ZZState"].ToString();
                model.Height = ds.Tables[0].Rows[0]["Height"].ToString();
                if (ds.Tables[0].Rows[0]["DGDate"].ToString() != "")
                {
                    model.DGDate = DateTime.Parse(ds.Tables[0].Rows[0]["DGDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ZZDate"].ToString() != "")
                {
                    model.ZZDate = DateTime.Parse(ds.Tables[0].Rows[0]["ZZDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["TryDays"].ToString() != "")
                {
                    model.TryDays = int.Parse(ds.Tables[0].Rows[0]["TryDays"].ToString());
                }
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                model.Photo = ds.Tables[0].Rows[0]["Photo"].ToString();
                model.Tel = ds.Tables[0].Rows[0]["Tel"].ToString();
                model.PhoneExt = ds.Tables[0].Rows[0]["PhoneExt"].ToString();
                model.Email = ds.Tables[0].Rows[0]["Email"].ToString();
                model.Mobile = ds.Tables[0].Rows[0]["Mobile"].ToString();
                model.MSN = ds.Tables[0].Rows[0]["MSN"].ToString();
                model.QQ = ds.Tables[0].Rows[0]["QQ"].ToString();
                model.TemAddr = ds.Tables[0].Rows[0]["TemAddr"].ToString();
                model.TemTel = ds.Tables[0].Rows[0]["TemTel"].ToString();
                model.Addr = ds.Tables[0].Rows[0]["Addr"].ToString();
                model.AddrTel = ds.Tables[0].Rows[0]["AddrTel"].ToString();
                model.OthersContact = ds.Tables[0].Rows[0]["OthersContact"].ToString();
                model.OthersRel = ds.Tables[0].Rows[0]["OthersRel"].ToString();
                model.OthersPhone = ds.Tables[0].Rows[0]["OthersPhone"].ToString();
                if (ds.Tables[0].Rows[0]["BirthDay"].ToString() != "")
                {
                    model.BirthDay = DateTime.Parse(ds.Tables[0].Rows[0]["BirthDay"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Age"].ToString() != "")
                {
                    model.Age = int.Parse(ds.Tables[0].Rows[0]["Age"].ToString());
                }
                model.Sex = ds.Tables[0].Rows[0]["Sex"].ToString();
                model.Marriage = ds.Tables[0].Rows[0]["Marriage"].ToString();
                model.IDCard = ds.Tables[0].Rows[0]["IDCard"].ToString();
                model.DriveCharter = ds.Tables[0].Rows[0]["DriveCharter"].ToString();
                model.Nationality = ds.Tables[0].Rows[0]["Nationality"].ToString();
                model.NativePlace = ds.Tables[0].Rows[0]["NativePlace"].ToString();
                model.Nation = ds.Tables[0].Rows[0]["Nation"].ToString();
                model.HKPlace = ds.Tables[0].Rows[0]["HKPlace"].ToString();
                model.ArcPlace = ds.Tables[0].Rows[0]["ArcPlace"].ToString();
                model.DocSubmit = ds.Tables[0].Rows[0]["DocSubmit"].ToString();
                model.HaveDoc = ds.Tables[0].Rows[0]["HaveDoc"].ToString();
                model.BestXL = ds.Tables[0].Rows[0]["BestXL"].ToString();
                model.ZC = ds.Tables[0].Rows[0]["ZC"].ToString();
                model.ComputerLevel = ds.Tables[0].Rows[0]["ComputerLevel"].ToString();
                model.FLKind = ds.Tables[0].Rows[0]["FLKind"].ToString();
                model.FirstSchool = ds.Tables[0].Rows[0]["FirstSchool"].ToString();
                model.FirstSpecialty = ds.Tables[0].Rows[0]["FirstSpecialty"].ToString();
                model.EnLevel = ds.Tables[0].Rows[0]["EnLevel"].ToString();
                model.SecSchool = ds.Tables[0].Rows[0]["SecSchool"].ToString();
                model.SecSpecialty = ds.Tables[0].Rows[0]["SecSpecialty"].ToString();
                model.Tec = ds.Tables[0].Rows[0]["Tec"].ToString();
                model.WorkCompanys = ds.Tables[0].Rows[0]["WorkCompanys"].ToString();
                model.MySpec = ds.Tables[0].Rows[0]["MySpec"].ToString();
                model.MyLove = ds.Tables[0].Rows[0]["MyLove"].ToString();
                model.PrisePunsh = ds.Tables[0].Rows[0]["PrisePunsh"].ToString();
                model.Resume = ds.Tables[0].Rows[0]["Resume"].ToString();
                model.CBArea = ds.Tables[0].Rows[0]["CBArea"].ToString();
                if (ds.Tables[0].Rows[0]["CBStartDate"].ToString() != "")
                {
                    model.CBStartDate = DateTime.Parse(ds.Tables[0].Rows[0]["CBStartDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["CBAmt"].ToString() != "")
                {
                    model.CBAmt = decimal.Parse(ds.Tables[0].Rows[0]["CBAmt"].ToString());
                }
                model.CBRemark = ds.Tables[0].Rows[0]["CBRemark"].ToString();
                if (ds.Tables[0].Rows[0]["CBEndDate"].ToString() != "")
                {
                    model.CBEndDate = DateTime.Parse(ds.Tables[0].Rows[0]["CBEndDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ContractDate"].ToString() != "")
                {
                    model.ContractDate = DateTime.Parse(ds.Tables[0].Rows[0]["ContractDate"].ToString());
                }
                if (ds.Tables[0].Rows[0]["LeaveDate"].ToString() != "")
                {
                    model.LeaveDate = DateTime.Parse(ds.Tables[0].Rows[0]["LeaveDate"].ToString());
                }
                model.LeaveResign = ds.Tables[0].Rows[0]["LeaveResign"].ToString();
                if (ds.Tables[0].Rows[0]["SerYear"].ToString() != "")
                {
                    model.SerYear = decimal.Parse(ds.Tables[0].Rows[0]["SerYear"].ToString());
                }
                if (ds.Tables[0].Rows[0]["HolidayYear"].ToString() != "")
                {
                    model.HolidayYear = int.Parse(ds.Tables[0].Rows[0]["HolidayYear"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ctime"].ToString() != "")
                {
                    model.ctime = DateTime.Parse(ds.Tables[0].Rows[0]["ctime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["mtime"].ToString() != "")
                {
                    model.mtime = DateTime.Parse(ds.Tables[0].Rows[0]["mtime"].ToString());
                }
                model.conflictCtrlID = ds.Tables[0].Rows[0]["conflictCtrlID"].ToString();
                if (ds.Tables[0].Rows[0]["owner"].ToString() != "")
                {
                    model.owner = int.Parse(ds.Tables[0].Rows[0]["owner"].ToString());
                }
                if (ds.Tables[0].Rows[0]["creator"].ToString() != "")
                {
                    model.creator = int.Parse(ds.Tables[0].Rows[0]["creator"].ToString());
                }
                model.IsSysUser = ds.Tables[0].Rows[0]["IsSysUser"].ToString();
                model.Account = ds.Tables[0].Rows[0]["Account"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_EmpInfo GetModel(string UserName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UserID,UserName,CnName,EnName,EmpID,PositionsID,Positions,Sex,IDCard,Nationality,Addr,Mobile,Tel,Email,Fax,IsSysUser,Account from Pub_EmpInfo ");
            strSql.Append(" where UserName=@UserName ");
            SqlParameter[] parameters = {
					new SqlParameter("@UserName", SqlDbType.NVarChar,256)};
            parameters[0].Value = UserName;

            SfSoft.Model.Pub_EmpInfo model = new SfSoft.Model.Pub_EmpInfo();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = new Guid(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = ds.Tables[0].Rows[0]["CnName"].ToString();
                model.EnName = ds.Tables[0].Rows[0]["EnName"].ToString();
                model.EmpID = ds.Tables[0].Rows[0]["EmpID"].ToString();
                model.PositionsID = ds.Tables[0].Rows[0]["PositionsID"].ToString();
                model.Positions = ds.Tables[0].Rows[0]["Positions"].ToString();
                model.Sex = ds.Tables[0].Rows[0]["Sex"].ToString();
                model.IDCard = ds.Tables[0].Rows[0]["IDCard"].ToString();
                model.Nationality = ds.Tables[0].Rows[0]["Nationality"].ToString();
                model.Addr = ds.Tables[0].Rows[0]["Addr"].ToString();
                model.Mobile = ds.Tables[0].Rows[0]["Mobile"].ToString();
                model.Tel = ds.Tables[0].Rows[0]["Tel"].ToString();
                model.Email = ds.Tables[0].Rows[0]["Email"].ToString();
                model.Fax = ds.Tables[0].Rows[0]["Fax"].ToString();
                model.IsSysUser = ds.Tables[0].Rows[0]["IsSysUser"].ToString();
                model.Account = ds.Tables[0].Rows[0]["Account"].ToString();
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
            strSql.Append("select ID,UserID,UserName,CnName,EnName,EmpID,PositionsID,Positions,Sex,IDCard,Nationality,Addr,Mobile,Tel,Email,Fax,IsSysUser,Account,ZZState ");
            strSql.Append(" FROM Pub_EmpInfo ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where ZZState<>'离职' and " + strWhere);
            }
            else
            {
                strSql.Append(" where ZZState<>'离职' ");
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 取的用户登录及用户基本信息


        /// </summary>
        /// 
        public DataSet GetUsersInfoList(string strWhere)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select d.Password,d.IsLockedOut, b.ID,a.UserID,a.UserName,b.CnName,b.EnName,b.EmpID,c.DeptID,c.DeptName,b.PositionsID,b.Positions,b.ZZState, ");
            strSql.Append("b.Sex,b.IDCard,b.Nationality,b.Addr,b.Mobile,b.Tel,b.Email,b.Fax,c.FilialeID,b.IsSysUser,b.Account,b.Grade,b.DGDate,b.ZZDate,c.PostID,c.PostName ");
            strSql.Append(" from aspnet_Users as a  ");
            strSql.Append("  LEFT OUTER JOIN  aspnet_Membership  d on a.userid=d.userid ");
            strSql.Append("  left join Pub_EmpInfo as b on a.UserID=b.UserID ");
            strSql.Append(" left join ");
            strSql.Append(" ( select a.UserID,a.DeptID,a.FilialeID,b.DeptName,a.UserDeptKind,a.PostID,a.PostName from Pub_DeptUsers as a left join Pub_Dept as b on a.DeptID=b.DeptID) as c on b.ID=c.UserID ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 取的用户信息及所属公司及部门
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        public DataSet GetUsersDeptIDList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.*,b.DeptID,b.FilialeID,b.PostID,b.PostName from Pub_EmpInfo as a left join Pub_DeptUsers as b on a.ID=b.UserID   LEFT OUTER JOIN  aspnet_Membership  d on a.userid=d.userid  ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where a.ZZState<>'离职' and  " + strWhere);
            }
            else
            {
                strSql.Append(" where a.ZZState<>'离职' ");
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
            parameters[0].Value = "Pub_EmpInfo";
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

