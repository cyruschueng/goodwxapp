using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Surrogate 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Surrogate
    {
        public Pub_Surrogate()
        { }
        #region Model
        private int _id;
        private string _auditman;
        private int? _auditmanid;
        private string _surman;
        private int? _surmanid;
        private string _mid;
        private string _islimit;
        private DateTime? _startdate;
        private DateTime? _enddate;
        private DateTime? _ctime;
        private DateTime? _mtime;
        private string _conflictctrlid;
        private int? _owner;
        private int? _creator;
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
        public string AuditMan
        {
            set { _auditman = value; }
            get { return _auditman; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? AuditManID
        {
            set { _auditmanid = value; }
            get { return _auditmanid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SurMan
        {
            set { _surman = value; }
            get { return _surman; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SurManID
        {
            set { _surmanid = value; }
            get { return _surmanid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MID
        {
            set { _mid = value; }
            get { return _mid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsLimit
        {
            set { _islimit = value; }
            get { return _islimit; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? StartDate
        {
            set { _startdate = value; }
            get { return _startdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? EndDate
        {
            set { _enddate = value; }
            get { return _enddate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? ctime
        {
            set { _ctime = value; }
            get { return _ctime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? mtime
        {
            set { _mtime = value; }
            get { return _mtime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string conflictCtrlID
        {
            set { _conflictctrlid = value; }
            get { return _conflictctrlid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? owner
        {
            set { _owner = value; }
            get { return _owner; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? creator
        {
            set { _creator = value; }
            get { return _creator; }
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

