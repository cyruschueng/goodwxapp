using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_DeptUsers:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_DeptUsers
    {
        public Pub_DeptUsers()
        { }
        #region Model
        private int _id;
        private int? _deptid;
        private int? _userid;
        private int? _filialeid;
        private string _userdeptkind;
        private string _postid;
        private string _postname;
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
        public int? DeptID
        {
            set { _deptid = value; }
            get { return _deptid; }
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
        public int? FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserDeptKind
        {
            set { _userdeptkind = value; }
            get { return _userdeptkind; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string PostID
        {
            set { _postid = value; }
            get { return _postid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string PostName
        {
            set { _postname = value; }
            get { return _postname; }
        }
        #endregion Model

    }
}

