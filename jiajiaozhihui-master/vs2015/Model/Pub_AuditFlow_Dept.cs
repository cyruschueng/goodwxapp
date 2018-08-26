using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_AuditFlow_Dept 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_AuditFlow_Dept
    {
        public Pub_AuditFlow_Dept()
        { }
        #region Model
        private int _id;
        private int? _afid;
        private int? _deptid;
        private string _deptname;
        private string _flag;
        private string _mid;
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
        public int? AFID
        {
            set { _afid = value; }
            get { return _afid; }
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
        public string DeptName
        {
            set { _deptname = value; }
            get { return _deptname; }
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
        public string MID
        {
            set { _mid = value; }
            get { return _mid; }
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

