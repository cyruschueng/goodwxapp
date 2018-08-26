using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Emc_logs 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Emc_logs
    {
        public Emc_logs()
        { }
        #region Model
        private int _id;
        private DateTime? _logintime;
        private string _ipaddr;
        private string _computername;
        private DateTime? _logouttime;
        private string _sysflag;
        private string _othersflag;
        private string _funid;
        private string _funname;
        private int? _userid;
        private string _cnname;
        private string _username;
        private int? _deptid;
        private string _dept;
        private string _filialeid;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? LoginTime
        {
            set { _logintime = value; }
            get { return _logintime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IpAddr
        {
            set { _ipaddr = value; }
            get { return _ipaddr; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ComputerName
        {
            set { _computername = value; }
            get { return _computername; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? LogoutTime
        {
            set { _logouttime = value; }
            get { return _logouttime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysFlag
        {
            set { _sysflag = value; }
            get { return _sysflag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OthersFlag
        {
            set { _othersflag = value; }
            get { return _othersflag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunID
        {
            set { _funid = value; }
            get { return _funid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunName
        {
            set { _funname = value; }
            get { return _funname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CnName
        {
            set { _cnname = value; }
            get { return _cnname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserName
        {
            set { _username = value; }
            get { return _username; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DeptID
        {
            set { _deptid = value; }
            get { return _deptid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Dept
        {
            set { _dept = value; }
            get { return _dept; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        #endregion Model

    }
}

