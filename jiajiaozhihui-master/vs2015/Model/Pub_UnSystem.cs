using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_UnSystem:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_UnSystem
    {
        public Pub_UnSystem()
        { }
        #region Model
        private int _id;
        private string _dbsrvaddr;
        private string _dbname;
        private string _dbuid;
        private string _dbpwd;
        private string _systype;
        private string _sysurl;
        private string _sysshortname;
        private string _sysname;
        private string _sysicon;
        private string _isact;
        private int? _orderid;
        private string _flag;
        private int? _uid;
        private string _cnname;
        private string _username;
        private string _password;
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
        public string DbSrvAddr
        {
            set { _dbsrvaddr = value; }
            get { return _dbsrvaddr; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DbName
        {
            set { _dbname = value; }
            get { return _dbname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DbUid
        {
            set { _dbuid = value; }
            get { return _dbuid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DbPwd
        {
            set { _dbpwd = value; }
            get { return _dbpwd; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysType
        {
            set { _systype = value; }
            get { return _systype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysUrl
        {
            set { _sysurl = value; }
            get { return _sysurl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysShortName
        {
            set { _sysshortname = value; }
            get { return _sysshortname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysName
        {
            set { _sysname = value; }
            get { return _sysname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysIcon
        {
            set { _sysicon = value; }
            get { return _sysicon; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? OrderID
        {
            set { _orderid = value; }
            get { return _orderid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Flag
        {
            set { _flag = value; }
            get { return _flag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Uid
        {
            set { _uid = value; }
            get { return _uid; }
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
        public string Password
        {
            set { _password = value; }
            get { return _password; }
        }
        #endregion Model

    }
}

